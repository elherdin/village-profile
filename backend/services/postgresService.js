const { isPostgresConfigured, pool, query } = require("../config/postgresClient");

async function initPostgres(seedData = null) {
  if (!isPostgresConfigured) return false;

  try {
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

    const countRes = await query("SELECT COUNT(*) AS count FROM desa_collections;");
    const count = parseInt(countRes.rows[0].count, 10);

    if (count === 0 && seedData && typeof seedData === "object") {
      console.log("[PostgreSQL] Database kosong. Memulai migrasi data awal dari data-store.json...");
      const keys = Object.keys(seedData);
      for (const key of keys) {
        await query(
          `INSERT INTO desa_collections (collection_name, data_json, updated_at)
             VALUES ($1, $2, NOW())
             ON CONFLICT (collection_name) 
             DO UPDATE SET data_json = EXCLUDED.data_json, updated_at = NOW();`,
          [key, JSON.stringify(seedData[key])]
        );
      }
      console.log("[PostgreSQL] Migrasi awal berhasil! " + keys.length + " koleksi tersimpan ke PostgreSQL.");
    }

    return true;
  } catch (err) {
    console.error("[PostgreSQL] Inisialisasi error:", err.message);
    return false;
  }
}

async function loadAllFromPostgres() {
  if (!isPostgresConfigured) return null;

  try {
    const res = await query("SELECT collection_name, data_json FROM desa_collections;");
    if (!res || !res.rows) return null;

    const data = {};
    res.rows.forEach(row => {
      data[row.collection_name] = row.data_json;
    });
    return data;
  } catch (err) {
    console.error("[PostgreSQL] Gagal memuat data dari PostgreSQL:", err.message);
    return null;
  }
}

async function saveCollectionToPostgres(collectionName, data) {
  if (!isPostgresConfigured) return false;

  try {
    await query(
      `INSERT INTO desa_collections (collection_name, data_json, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (collection_name) 
         DO UPDATE SET data_json = EXCLUDED.data_json, updated_at = NOW();`,
      [collectionName, JSON.stringify(data)]
    );
    return true;
  } catch (err) {
    console.error("[PostgreSQL] Gagal menyimpan koleksi " + collectionName + ":", err.message);
    return false;
  }
}

async function saveAllToPostgres(fullDbState) {
  if (!isPostgresConfigured || !fullDbState) return false;

  try {
    const keys = Object.keys(fullDbState);
    for (const key of keys) {
      await query(
        `INSERT INTO desa_collections (collection_name, data_json, updated_at)
           VALUES ($1, $2, NOW())
           ON CONFLICT (collection_name) 
           DO UPDATE SET data_json = EXCLUDED.data_json, updated_at = NOW();`,
        [key, JSON.stringify(fullDbState[key])]
      );
    }
    return true;
  } catch (err) {
    console.error("[PostgreSQL] Gagal menyimpan seluruh koleksi ke PostgreSQL:", err.message);
    return false;
  }
}

module.exports = {
  isPostgresConfigured,
  initPostgres,
  loadAllFromPostgres,
  saveCollectionToPostgres,
  saveAllToPostgres
};
