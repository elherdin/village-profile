const fs = require('fs');
const path = require('path');
const { PORT, BACKEND_URL, UPLOAD_DIR, r2BucketName, r2PublicUrl } = require('../config/env');
const {
  s3Client,
  isR2Configured,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command
} = require('../config/s3Client');
const { db, saveDb } = require('./databaseService');

// Helper to fetch buffer from R2 with candidate key fallbacks
async function getObjectBufferFromR2(key) {
  if (!isR2Configured || !s3Client) return null;

  const candidateKeys = [
    key,
    key.replace(/^desa-plantungan\//, ''),
    `desa-plantungan/${key.replace(/^desa-plantungan\//, '')}`,
    path.basename(key)
  ];

  for (const candidate of candidateKeys) {
    try {
      const command = new GetObjectCommand({
        Bucket: r2BucketName,
        Key: candidate,
      });
      const response = await s3Client.send(command);
      if (response && response.Body) {
        let buffer;
        if (typeof response.Body.transformToByteArray === 'function') {
          const bytes = await response.Body.transformToByteArray();
          buffer = Buffer.from(bytes);
        } else if (Buffer.isBuffer(response.Body)) {
          buffer = response.Body;
        } else {
          buffer = await new Promise((resolve, reject) => {
            const chunks = [];
            response.Body.on('data', chunk => chunks.push(chunk));
            response.Body.on('end', () => resolve(Buffer.concat(chunks)));
            response.Body.on('error', reject);
          });
        }

        // Cache locally for fast subsequent loads
        const fileName = path.basename(candidate);
        fs.writeFileSync(path.join(UPLOAD_DIR, fileName), buffer);

        return {
          buffer,
          contentType: response.ContentType || 'image/jpeg',
          contentLength: buffer.length
        };
      }
    } catch (e) {
      // Try next candidate key
    }
  }

  return null;
}

// Upload Handler to R2 + Local Cache (Supports both argument orders safely)
async function uploadFileToStorage(arg1, arg2, mimeType) {
  let fileBuffer, originalName;
  if (Buffer.isBuffer(arg1)) {
    fileBuffer = arg1;
    originalName = typeof arg2 === 'string' ? arg2 : 'upload_' + Date.now() + '.jpg';
  } else if (Buffer.isBuffer(arg2)) {
    fileBuffer = arg2;
    originalName = typeof arg1 === 'string' ? arg1 : 'upload_' + Date.now() + '.jpg';
  } else {
    if (typeof arg2 === 'string') {
      const base64Clean = arg2.replace(/^data:[^;]+;base64,/, '');
      fileBuffer = Buffer.from(base64Clean, 'base64');
      originalName = typeof arg1 === 'string' ? arg1 : 'upload_' + Date.now() + '.jpg';
    } else {
      throw new Error('Buffer file tidak valid untuk proses upload.');
    }
  }

  const ext = path.extname(originalName) || '.jpg';
  const cleanName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `${Date.now()}_${cleanName}${ext}`;

  // Always save local cache copy
  const targetPath = path.join(UPLOAD_DIR, fileName);
  fs.writeFileSync(targetPath, fileBuffer);

  const key = `desa-plantungan/${fileName}`;
  let publicUrl = `/api/media-file?key=${encodeURIComponent(key)}`;
  if (r2PublicUrl) {
    publicUrl = `${r2PublicUrl.replace(/\/+$/, '')}/${key.replace(/^\/+/, '')}`;
  } else if (BACKEND_URL) {
    publicUrl = `${BACKEND_URL.replace(/\/+$/, '')}/api/media-file?key=${encodeURIComponent(key)}`;
  }

  if (isR2Configured && s3Client) {
    try {
      const command = new PutObjectCommand({
        Bucket: r2BucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType || 'image/jpeg',
        CacheControl: 'public, max-age=31536000',
      });
      await s3Client.send(command);
    } catch (err) {
      console.error('R2 PutObject error:', err.message);
    }
  }

  return {
    name: originalName,
    key,
    url: publicUrl,
    size: fileBuffer.length,
    mimeType: mimeType || 'image/jpeg',
    storage: isR2Configured ? 'Cloudflare R2' : 'Local Storage',
    createdAt: new Date().toISOString()
  };
}

// Delete Handler from R2 + Local Cache
async function deleteFileFromStorage(rawKey) {
  if (!rawKey) return false;
  let key = rawKey;
  if (key.includes('key=')) {
    try {
      const u = new URL(key, 'http://localhost');
      key = u.searchParams.get('key') || key;
    } catch (e) { }
  }

  const fileName = path.basename(key);
  const localPath = path.join(UPLOAD_DIR, fileName);

  // 1. Delete from local cache if exists
  if (fs.existsSync(localPath)) {
    try {
      fs.unlinkSync(localPath);
    } catch (e) {
      console.warn('Local unlink error:', e.message);
    }
  }

  // 2. Delete from Cloudflare R2
  if (isR2Configured && s3Client) {
    const candidateKeys = [
      key,
      key.replace(/^desa-plantungan\//, ''),
      `desa-plantungan/${key.replace(/^desa-plantungan\//, '')}`,
      fileName,
      `desa-plantungan/${fileName}`
    ];
    const uniqueKeys = Array.from(new Set(candidateKeys));

    for (const k of uniqueKeys) {
      try {
        const command = new DeleteObjectCommand({
          Bucket: r2BucketName,
          Key: k,
        });
        await s3Client.send(command);
      } catch (err) {
        console.warn('R2 DeleteObject attempt error for key ' + k + ':', err.message);
      }
    }
  }

  return true;
}

// Synchronize Media Library with actual objects in Cloudflare R2
async function syncMediaWithR2() {
  if (!isR2Configured || !s3Client) return db.mediaLibrary || [];
  try {
    const command = new ListObjectsV2Command({
      Bucket: r2BucketName,
    });
    const response = await s3Client.send(command);
    const objects = response.Contents || [];

    const existingMap = new Map();
    (db.mediaLibrary || []).forEach(m => {
      if (m.key) existingMap.set(m.key, m);
      if (m.key) existingMap.set(path.basename(m.key), m);
    });

    const syncedList = objects.map(item => {
      const fileName = path.basename(item.Key);
      const existing = existingMap.get(item.Key) || existingMap.get(fileName);
      let mime = 'image/jpeg';
      if (fileName.match(/\.(png)$/i)) mime = 'image/png';
      else if (fileName.match(/\.(webp)$/i)) mime = 'image/webp';
      else if (fileName.match(/\.(avif)$/i)) mime = 'image/avif';
      else if (fileName.match(/\.(pdf)$/i)) mime = 'application/pdf';
      else if (fileName.match(/\.(svg)$/i)) mime = 'image/svg+xml';
      else if (fileName.match(/\.(gif)$/i)) mime = 'image/gif';

      let publicUrl = `/api/media-file?key=${encodeURIComponent(item.Key)}`;
      if (r2PublicUrl) {
        publicUrl = `${r2PublicUrl.replace(/\/+$/, '')}/${item.Key.replace(/^\/+/, '')}`;
      } else if (BACKEND_URL) {
        publicUrl = `${BACKEND_URL.replace(/\/+$/, '')}/api/media-file?key=${encodeURIComponent(item.Key)}`;
      }

      return {
        name: existing?.name || fileName,
        key: item.Key,
        url: publicUrl,
        size: item.Size || existing?.size || 0,
        mimeType: existing?.mimeType || mime,
        storage: 'Cloudflare R2',
        createdAt: item.LastModified ? new Date(item.LastModified).toISOString() : (existing?.createdAt || new Date().toISOString())
      };
    });

    db.mediaLibrary = syncedList;
    saveDb();
    console.log(`🔄 Media Library tersinkronisasi: ${syncedList.length} file di Cloudflare R2.`);
    return db.mediaLibrary;
  } catch (err) {
    console.warn('Sync media with R2 error:', err.message);
    return db.mediaLibrary || [];
  }
}

module.exports = {
  getObjectBufferFromR2,
  uploadFileToStorage,
  deleteFileFromStorage,
  syncMediaWithR2
};
