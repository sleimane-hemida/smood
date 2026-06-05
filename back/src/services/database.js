import pg from 'pg'

const { Pool } = pg

function buildPoolConfig() {
  const connectionUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.smood_POSTGRES_URL;

  if (connectionUrl) {
    return {
      connectionString: connectionUrl,
      ssl: { rejectUnauthorized: false }, // Indispensable pour Vercel Postgres / Supabase
    }
  }

  if (process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE) {
    return {
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT || 5432),
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    }
  }

  return null
}

const poolConfig = buildPoolConfig()
const pool = poolConfig ? new Pool(poolConfig) : null

export async function checkDatabaseConnection() {
  if (!pool) {
    return {
      configured: false,
      connected: false,
      name: 'smood',
      message: 'Base PostgreSQL non configuree.',
    }
  }

  try {
    await pool.query('SELECT 1')

    return {
      configured: true,
      connected: true,
      name: process.env.PGDATABASE || 'smood',
      message: 'Connexion PostgreSQL active.',
    }
  } catch (error) {
    return {
      configured: true,
      connected: false,
      name: process.env.PGDATABASE || 'smood',
      message: error.message,
    }
  }
}

export async function query(text, params = []) {
  if (!pool) {
    throw new Error('La base PostgreSQL n est pas configuree. Renseigne DATABASE_URL ou les variables PGHOST/PGUSER/PGDATABASE dans .env.')
  }

  return pool.query(text, params)
}