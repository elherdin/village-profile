const fs = require('fs');
const { DB_FILE, PORT } = require('../config/env');

let db = {};

// Load or initialize DB from disk
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    db = JSON.parse(raw);
    if (!db.mediaLibrary) db.mediaLibrary = [];
  }
} catch (e) {
  console.error('Error loading db:', e);
}

function getDb() {
  return db;
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

// Helper to auto-proxy r2.dev URLs to prevent broken images on client
function fixR2Url(urlStr) {
  if (!urlStr || typeof urlStr !== 'string') return urlStr;
  if (urlStr.includes('r2.dev/')) {
    const key = urlStr.split('r2.dev/')[1];
    return `http://localhost:${PORT}/api/media-file?key=${encodeURIComponent(key)}`;
  }
  return urlStr;
}

// Formatters for Strapi v4 / v5 compatible responses
function formatStrapiSingle(entity) {
  if (!entity) return { data: null };
  const { id, ...attributes } = entity;
  return { data: { id, attributes }, meta: {} };
}

function formatStrapiCollection(entities) {
  return {
    data: (entities || []).map((item) => {
      const { id, ...attributes } = item;
      return { id, attributes };
    }),
    meta: {
      pagination: {
        page: 1,
        pageSize: (entities || []).length,
        pageCount: 1,
        total: (entities || []).length
      }
    }
  };
}

module.exports = {
  db,
  getDb,
  saveDb,
  fixR2Url,
  formatStrapiSingle,
  formatStrapiCollection
};
