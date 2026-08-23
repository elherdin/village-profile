const { Pool } = require('pg');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || '';
const pgHost = process.env.PGHOST || process.env.POSTGRES_HOST || '';
const pgPort = parseInt(process.env.PGPORT || process.env.POSTGRES_PORT || '5432', 10);
const pgDatabase = process.env.PGDATABASE || process.env.POSTGRES_DB || '';
const pgUser = process.env.PGUSER || process.env.POSTGRES_USER || '';
const pgPassword = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD || '';
const pgSsl = process.env.PGSSLMODE === 'require' || process.env.DATABASE_SSL === 'true';

const isPostgresConfigured = Boolean(databaseUrl || (pgHost && pgDatabase));

let pool = null;

if (isPostgresConfigured) {
  const config = databaseUrl
    ? {
        connectionString: databaseUrl,
        ssl: pgSsl ? { rejectUnauthorized: false } : false
      }
    : {
        host: pgHost,
        port: pgPort,
        database: pgDatabase,
        user: pgUser,
        password: pgPassword,
        ssl: pgSsl ? { rejectUnauthorized: false } : false
      };

  pool = new Pool({
    ...config,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });

  pool.on('error', (err) => {
    console.error('[PostgreSQL] Unexpected error on idle client:', err.message);
  });
}

async function query(text, params) {
  if (!pool) {
    throw new Error('PostgreSQL is not configured. Set DATABASE_URL or PGHOST/PGDATABASE in .env');
  }
  return await pool.query(text, params);
}

module.exports = {
  isPostgresConfigured,
  pool,
  query,
  databaseUrl,
  pgHost,
  pgPort,
  pgDatabase,
  pgUser
};
