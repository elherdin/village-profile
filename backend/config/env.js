require('dotenv').config();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 1337;

// Persistent Database storage file & Upload cache directory
const DB_FILE = path.join(__dirname, '..', 'data-store.json');
const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'uploads');

// Ensure local upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Cloudflare R2 Credentials & Configuration
const r2AccountId = process.env.R2_ACCOUNT_ID || '';
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID || '';
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY || '';
const r2BucketName = process.env.R2_BUCKET_NAME || 'desa-plantungan-media';
const r2PublicUrl = process.env.R2_PUBLIC_URL || '';
const r2Endpoint = process.env.R2_ENDPOINT || (r2AccountId ? `https://${r2AccountId}.r2.cloudflarestorage.com` : '');

const BACKEND_URL = process.env.BACKEND_URL || process.env.PUBLIC_URL || process.env.APP_URL || '';

module.exports = {
  PORT,
  BACKEND_URL,
  DB_FILE,
  UPLOAD_DIR,
  r2AccountId,
  r2AccessKeyId,
  r2SecretAccessKey,
  r2BucketName,
  r2PublicUrl,
  r2Endpoint
};
