require('dotenv').config();
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const { PORT, DB_FILE, UPLOAD_DIR, r2BucketName } = require('./config/env');
const { s3Client, isR2Configured } = require('./config/s3Client');
const { isPostgresConfigured } = require('./config/postgresClient');
const { db, saveDb, fixR2Url, formatStrapiSingle, formatStrapiCollection } = require('./services/databaseService');
const { getObjectBufferFromR2, uploadFileToStorage, deleteFileFromStorage, syncMediaWithR2 } = require('./services/storageService');
const { renderAdminDashboardHtml } = require('./views/adminView');

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }

  const sendJson = (status, data) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // Serve direct media file from R2 or local disk
  if (pathname === '/api/media-file') {
    const key = parsedUrl.query.key;
    if (!key) {
      return sendJson(400, { error: 'Param key diperlukan' });
    }

    const r2Result = await getObjectBufferFromR2(key);
    if (r2Result && r2Result.buffer) {
      res.writeHead(200, {
        'Content-Type': r2Result.contentType || 'image/jpeg',
        'Content-Length': r2Result.contentLength,
        'Cache-Control': 'public, max-age=86400'
      });
      return res.end(r2Result.buffer);
    }

    const localFileName = path.basename(key);
    const localFilePath = path.join(UPLOAD_DIR, localFileName);
    if (fs.existsSync(localFilePath)) {
      const stat = fs.statSync(localFilePath);
      let mime = 'image/jpeg';
      if (localFileName.match(/\.(png)$/i)) mime = 'image/png';
      else if (localFileName.match(/\.(webp)$/i)) mime = 'image/webp';
      else if (localFileName.match(/\.(svg)$/i)) mime = 'image/svg+xml';
      else if (localFileName.match(/\.(pdf)$/i)) mime = 'application/pdf';

      res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': stat.size,
        'Cache-Control': 'public, max-age=86400'
      });
      return fs.createReadStream(localFilePath).pipe(res);
    }

    return sendJson(404, { error: 'File tidak ditemukan di Cloudflare R2 maupun lokal' });
  }

  // Serve static files from /uploads/
  if (pathname.startsWith('/uploads/')) {
    const fileName = path.basename(pathname);
    const filePath = path.join(UPLOAD_DIR, fileName);

    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      let mime = 'application/octet-stream';
      if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) mime = 'image/jpeg';
      else if (fileName.endsWith('.png')) mime = 'image/png';
      else if (fileName.endsWith('.webp')) mime = 'image/webp';
      else if (fileName.endsWith('.svg')) mime = 'image/svg+xml';
      else if (fileName.endsWith('.pdf')) mime = 'application/pdf';

      res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': stat.size,
        'Cache-Control': 'public, max-age=86400'
      });
      return fs.createReadStream(filePath).pipe(res);
    } else {
      const r2Result = await getObjectBufferFromR2(fileName);
      if (r2Result && r2Result.buffer) {
        res.writeHead(200, {
          'Content-Type': r2Result.contentType || 'image/jpeg',
          'Content-Length': r2Result.contentLength,
          'Cache-Control': 'public, max-age=86400'
        });
        return res.end(r2Result.buffer);
      }
      return sendJson(404, { error: 'File not found' });
    }
  }

  // API CMS: Get all internal data for Admin Panel
  if (pathname === '/api/cms-data' && req.method === 'GET') {
    return sendJson(200, db);
  }

  // API CMS: Save / Update CMS data from Admin Panel
  if (pathname === '/api/cms-save' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        Object.keys(parsed).forEach(key => {
          db[key] = parsed[key];
        });
        saveDb();
        return sendJson(200, { success: true, message: 'Data berhasil disimpan!', data: db });
      } catch (err) {
        return sendJson(400, { error: 'Gagal parse body JSON' });
      }
    });
    return;
  }

  // API: File Upload (Supports JSON Base64 and Multipart/form-data)
  if (pathname === '/api/upload' && req.method === 'POST') {
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('application/json')) {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', async () => {
        try {
          const { fileName, mimeType, base64 } = JSON.parse(body);
          if (!base64) return sendJson(400, { error: 'Base64 data tidak ditemukan' });
          const base64Clean = base64.replace(/^data:[^;]+;base64,/, '');
          const buffer = Buffer.from(base64Clean, 'base64');
          const uploadedItem = await uploadFileToStorage(buffer, fileName || 'upload_' + Date.now() + '.jpg', mimeType || 'image/jpeg');
          
          if (!db.mediaLibrary) db.mediaLibrary = [];
          db.mediaLibrary.unshift(uploadedItem);
          saveDb();

          return sendJson(200, uploadedItem);
        } catch (err) {
          console.error('Upload JSON Error:', err);
          return sendJson(500, { error: 'Gagal memproses upload: ' + err.message });
        }
      });
      return;
    }

    if (contentType.includes('multipart/form-data')) {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
          if (!boundaryMatch) {
            return sendJson(400, { error: 'Invalid multipart boundary' });
          }
          const boundary = boundaryMatch[1] || boundaryMatch[2];
          const parts = buffer.toString('binary').split('--' + boundary);

          let fileData = null;
          let originalFileName = 'upload_' + Date.now() + '.jpg';
          let fileMime = 'image/jpeg';

          for (const part of parts) {
            if (part.includes('filename="')) {
              const filenameMatch = part.match(/filename="([^"]+)"/);
              if (filenameMatch) originalFileName = filenameMatch[1];

              const typeMatch = part.match(/Content-Type:\s*([^\r\n]+)/i);
              if (typeMatch) fileMime = typeMatch[1].trim();

              const headerEndIndex = part.indexOf('\r\n\r\n');
              if (headerEndIndex !== -1) {
                const bodyBinary = part.substring(headerEndIndex + 4, part.length - 2);
                fileData = Buffer.from(bodyBinary, 'binary');
                break;
              }
            }
          }

          if (!fileData || fileData.length === 0) {
            return sendJson(400, { error: 'Tidak ada file yang terkirim' });
          }

          const uploadedItem = await uploadFileToStorage(fileData, originalFileName, fileMime);
          
          if (!db.mediaLibrary) db.mediaLibrary = [];
          db.mediaLibrary.unshift(uploadedItem);
          saveDb();

          return sendJson(200, uploadedItem);
        } catch (err) {
          console.error('Upload Error:', err);
          return sendJson(500, { error: 'Gagal memproses upload: ' + err.message });
        }
      });
      return;
    }

    return sendJson(400, { error: 'Format Content-Type tidak didukung' });
  }

  // API: Media Library List
  if (pathname === '/api/media-library' && req.method === 'GET') {
    if (parsedUrl.query.sync === 'true' || !db.mediaLibrary || db.mediaLibrary.length === 0) {
      const synced = await syncMediaWithR2();
      return sendJson(200, synced);
    }
    return sendJson(200, db.mediaLibrary || []);
  }

  // API: Explicit Media Sync from Cloudflare R2
  if (pathname === '/api/media-sync') {
    try {
      const synced = await syncMediaWithR2();
      return sendJson(200, { success: true, count: synced.length, list: synced });
    } catch (err) {
      return sendJson(500, { error: 'Gagal sinkronisasi R2: ' + err.message });
    }
  }

  // API: Set Profile Photo Directly (Logo, Kades, etc)
  if (pathname === '/api/set-profile-photo' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { field, url } = JSON.parse(body);
        if (!db.profilDesa) db.profilDesa = {};
        db.profilDesa[field] = url;
        saveDb();
        return sendJson(200, { success: true, message: 'Foto profil berhasil ditetapkan', profilDesa: db.profilDesa });
      } catch (err) {
        return sendJson(400, { error: 'Invalid JSON body' });
      }
    });
    return;
  }

  // API: Delete Media File
  if (pathname === '/api/media-delete' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const { key } = JSON.parse(body);
        if (!key) return sendJson(400, { error: 'Key media diperlukan' });

        await deleteFileFromStorage(key);
        return sendJson(200, { success: true, message: 'File berhasil dihapus dari storage.' });
      } catch (err) {
        return sendJson(500, { error: 'Gagal menghapus file: ' + err.message });
      }
    });
    return;
  }

  // -------------------------------------------------------------
  // Strapi Compatible REST API Endpoints (Frontend Consumes)
  // -------------------------------------------------------------
  if (pathname === '/api/profil-desa') {
    const p = db.profilDesa || {};
    const item = {
      ...p,
      logo: fixR2Url(p.logo),
      foto_desa: fixR2Url(p.foto_desa),
      foto_kades: fixR2Url(p.foto_kades),
      foto_kantor: fixR2Url(p.foto_kantor)
    };
    return sendJson(200, formatStrapiSingle(item));
  }

  if (pathname === '/api/data-kependudukan') {
    return sendJson(200, formatStrapiSingle(db.dataKependudukan || {}));
  }

  if (pathname === '/api/perangkat-desas' || pathname === '/api/perangkat-desa') {
    const list = (db.perangkatDesa || []).map(p => ({ ...p, foto: fixR2Url(p.foto) }));
    return sendJson(200, formatStrapiCollection(list));
  }

  if (pathname === '/api/potensi-desas' || pathname === '/api/potensi-desa') {
    const list = (db.potensiDesa || []).map(p => ({ ...p, foto: fixR2Url(p.foto) }));
    return sendJson(200, formatStrapiCollection(list));
  }

  if (pathname === '/api/beritas' || pathname === '/api/berita') {
    const list = (db.berita || []).map(b => ({ ...b, thumbnail: fixR2Url(b.thumbnail) }));
    return sendJson(200, formatStrapiCollection(list));
  }

  if (pathname === '/api/program-kkns' || pathname === '/api/program-kkn') {
    const list = (db.programKKN || []).map(k => ({ ...k, dokumentasi: fixR2Url(k.dokumentasi) }));
    return sendJson(200, formatStrapiCollection(list));
  }

  if (pathname === '/api/apbdes-records' || pathname === '/api/apbdes') {
    const list = (db.apbdes || []).map(a => ({ ...a, file_pdf: fixR2Url(a.file_pdf) }));
    return sendJson(200, formatStrapiCollection(list));
  }

  if (pathname === '/api/infrastruktur-desas' || pathname === '/api/infrastruktur-desa') {
    const list = db.infrastrukturDesa || [];
    return sendJson(200, formatStrapiCollection(list));
  }

  if (pathname === '/api/pesan-masyarakats' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const data = parsed.data || parsed;
        const newRecord = {
          id: ((db.pesanMasyarakat || []).length > 0 ? Math.max(...db.pesanMasyarakat.map(x => x.id || 0)) : 0) + 1,
          ...data,
          status: data.status || 'Baru',
          createdAt: new Date().toISOString()
        };
        if (!db.pesanMasyarakat) db.pesanMasyarakat = [];
        db.pesanMasyarakat.unshift(newRecord);
        saveDb();
        return sendJson(201, formatStrapiSingle(newRecord));
      } catch (err) {
        return sendJson(400, { error: { message: 'Invalid JSON body' } });
      }
    });
    return;
  }

  // Admin Dashboard UI
  if (pathname === '/' || pathname === '/admin') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(renderAdminDashboardHtml());
  }

  sendJson(404, { error: 'Endpoint tidak ditemukan' });
});

// Auto sync Cloudflare R2 media library on startup
if (isR2Configured) {
  setTimeout(() => {
    syncMediaWithR2();
  }, 1000);
}

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`Strapi Headless CMS Desa Plantungan Berjalan!`);
  console.log(`PostgreSQL:   ${isPostgresConfigured ? 'Terkoneksi (Database Aktif)' : 'Lokal Mode (data-store.json)'}`);
  console.log(`Cloudflare R2: ${isR2Configured ? 'Terkoneksi' : 'Lokal (Uploads)'}`);
  console.log(`Admin Panel:  http://localhost:${PORT}/admin`);
  console.log(`REST API:     http://localhost:${PORT}/api/`);
  console.log(`======================================================\n`);
});
