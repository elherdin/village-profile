const fs = require("fs");
const { DB_FILE, PORT, BACKEND_URL, r2PublicUrl } = require("../config/env");
const { 
  isPostgresConfigured, 
  initPostgres, 
  loadAllFromPostgres, 
  saveCollectionToPostgres, 
  saveAllToPostgres 
} = require("./postgresService");

let db = {};

// Helper to normalize localhost URLs to relative or public R2 CDN URLs
function normalizeMediaUrls(dataObj) {
  if (!dataObj) return dataObj;
  try {
    let jsonStr = JSON.stringify(dataObj);
    let changed = false;

    if (jsonStr.includes("http://localhost:")) {
      jsonStr = jsonStr.replace(/http:\/\/localhost:[0-9]+/g, "");
      changed = true;
    }

    if (!r2PublicUrl || r2PublicUrl.includes("r2.dev") || r2PublicUrl.includes("r2.cloudflarestorage.com")) {
      if (jsonStr.includes(".r2.dev/") || jsonStr.includes("r2.cloudflarestorage.com/")) {
        jsonStr = jsonStr.replace(/https:\/\/[^"'\\]*(?:\.r2\.dev|r2\.cloudflarestorage\.com)\/([^"'\\]+)/g, (match, key) => {
          return `/api/media-file?key=${encodeURIComponent(key)}`;
        });
        changed = true;
      }
    }

    if (changed) {
      return JSON.parse(jsonStr);
    }
  } catch (_) {}
  return dataObj;
}

// 1. Initial load from local data-store.json disk cache
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    db = JSON.parse(raw);
    db = normalizeMediaUrls(db);
    if (!db.mediaLibrary) db.mediaLibrary = [];
  }
} catch (e) {
  console.error("Error loading db from file:", e);
}

// 2. If PostgreSQL is configured, initialize & sync on startup
if (isPostgresConfigured) {
  (async () => {
    try {
      const initialized = await initPostgres(db);
      if (initialized) {
        const pgData = await loadAllFromPostgres();
        if (pgData && Object.keys(pgData).length > 0) {
          const cleanedPgData = normalizeMediaUrls(pgData);
          Object.assign(db, cleanedPgData);
          if (!db.mediaLibrary) db.mediaLibrary = [];
          
          // update local cache file
          try {
            fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
          } catch (_) {}

          // If there were old localhost URLs in Postgres, update Postgres as well
          if (JSON.stringify(pgData).includes("http://localhost:")) {
            saveAllToPostgres(db).catch(() => {});
          }

          console.log("[PostgreSQL] Data berhasil disinkronkan ke memori server!");
        }
      }
    } catch (err) {
      console.error("[PostgreSQL] Error startup sync:", err.message);
    }
  })();
}

function getDb() {
  return db;
}

function saveDb() {
  db = normalizeMediaUrls(db);
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error("Error saving database file:", err);
  }

  if (isPostgresConfigured) {
    saveAllToPostgres(db).catch(err => {
      console.error("[PostgreSQL] Background save error:", err.message);
    });
  }
}

async function saveCollection(collectionName, data) {
  db[collectionName] = normalizeMediaUrls(data);
  saveDb();
  if (isPostgresConfigured) {
    await saveCollectionToPostgres(collectionName, db[collectionName]);
  }
}

// Helper to auto-proxy r2.dev URLs to prevent broken images on client
function fixR2Url(urlStr) {
  if (!urlStr || typeof urlStr !== "string") return urlStr;
  if (urlStr.includes("r2.dev/")) {
    const key = urlStr.split("r2.dev/")[1];
    if (r2PublicUrl) {
      return `${r2PublicUrl.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}`;
    }
    return `/api/media-file?key=${encodeURIComponent(key)}`;
  }
  if (urlStr.includes("http://localhost:")) {
    return urlStr.replace(/http:\/\/localhost:[0-9]+/g, "");
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
  saveCollection,
  fixR2Url,
  formatStrapiSingle,
  formatStrapiCollection
};
