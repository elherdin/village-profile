const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command
} = require('@aws-sdk/client-s3');
const {
  r2AccountId,
  r2AccessKeyId,
  r2SecretAccessKey,
  r2Endpoint
} = require('./env');

const isR2Configured = Boolean(r2AccessKeyId && r2SecretAccessKey && (r2AccountId || r2Endpoint));

let s3Client = null;
if (isR2Configured) {
  try {
    s3Client = new S3Client({
      region: 'auto',
      endpoint: r2Endpoint,
      forcePathStyle: true, // Crucial for Cloudflare R2 compatibility
      credentials: {
        accessKeyId: r2AccessKeyId,
        secretAccessKey: r2SecretAccessKey,
      },
    });
    console.log('☁️  Cloudflare R2 Storage: Terkonfigurasi & Aktif.');
  } catch (err) {
    console.warn('⚠️  Cloudflare R2 Init Error:', err.message);
  }
} else {
  console.log('📁 Cloudflare R2: Belum diisi kredensial di .env. Menggunakan Local Storage Fallback (/uploads/).');
}

module.exports = {
  s3Client,
  isR2Configured,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command
};
