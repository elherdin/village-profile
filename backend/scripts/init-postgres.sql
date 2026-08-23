-- ==========================================================
-- SKEMA DATABASE POSTGRESQL - DESA PLANTUNGAN BACKEND CMS
-- ==========================================================

-- 1. Buat Tabel Utama Koleksi Dokumen (JSONB Storage)
CREATE TABLE IF NOT EXISTS desa_collections (
    collection_name VARCHAR(100) PRIMARY KEY,
    data_json JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Buat Indeks untuk Kecepatan Query
CREATE INDEX IF NOT EXISTS idx_desa_collections_updated_at 
ON desa_collections (updated_at);

-- 3. Trigger Otomatis Update Kolom updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_desa_collections_updated_at ON desa_collections;
CREATE TRIGGER trg_desa_collections_updated_at
    BEFORE UPDATE ON desa_collections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
