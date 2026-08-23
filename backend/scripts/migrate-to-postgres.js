/**
 * Standalone Migration Script: data-store.json -> PostgreSQL
 * Usage: node scripts/migrate-to-postgres.js
 */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { isPostgresConfigured, pool, query } = require("../config/postgresClient");

async function runMigration() {
  console.log("==================================================");
  console.log("🚀 Memulai Migrasi Database ke PostgreSQL");
  console.log("==================================================");

  if (!isPostgresConfigured) {
    console.error("❌ PostgreSQL tidak terkonfigurasi!");
    console.error("Pastikan DATABASE_URL atau PGHOST, PGDATABASE, PGUSER, PGPASSWORD telah diisi di .env");
    process.exit(1);
  }

  const dbFile = path.join(__dirname, "..", "data-store.json");
  if (!fs.existsSync(dbFile)) {
    console.error("❌ File data-store.json tidak ditemukan di:", dbFile);
    process.exit(1);
  }

  let localData = {};
  try {
    localData = JSON.parse(fs.readFileSync(dbFile, "utf8"));
  } catch (err) {
    console.error("❌ Gagal membaca data-store.json:", err.message);
    process.exit(1);
  }

  try {
    console.log("📡 Menghubungkan ke PostgreSQL...");
    const client = await pool.connect();
    console.log("✅ Berhasil terhubung ke PostgreSQL!");
    client.release();

    // 1. Create table & index
    console.log("🛠️  Menyiapkan tabel desa_collections...");
    await query(`
      CREATE TABLE IF NOT EXISTS desa_collections (
        collection_name VARCHAR(100) PRIMARY KEY,
        data_json JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_desa_collections_updated_at 
      ON desa_collections (updated_at);
    `);

    // 2. Migrate each collection
    const keys = Object.keys(localData);
    console.log(`📦 Memigrasikan ${keys.length} koleksi data...`);

    for (const key of keys) {
      const data = localData[key];
      const count = Array.isArray(data) ? data.length : (typeof data === "object" ? "1 objek" : "1 entri");
      
      await query(
        `INSERT INTO desa_collections (collection_name, data_json, updated_at)
           VALUES ($1, $2, NOW())
           ON CONFLICT (collection_name) 
           DO UPDATE SET data_json = EXCLUDED.data_json, updated_at = NOW();`,
        [key, JSON.stringify(data)]
      );

      console.log(`   ✓ Koleksi "${key}" (${count}) berhasil disimpan.`);
    }

    console.log("==================================================");
    console.log("🎉 MIGRASI SUKSES! Seluruh data kini ada di PostgreSQL.");
    console.log("==================================================");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error saat migrasi:", err.message);
    process.exit(1);
  }
}

runMigration();
