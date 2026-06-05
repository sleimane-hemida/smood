import fs from 'fs';
import pg from 'pg';

const { Pool } = pg;

// Strip query params to avoid SSL override bug
let connectionUrl = "postgres://postgres.sidujtemnxjbfffduvbx:15oSuNgc0OKtDaYo@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x";
connectionUrl = connectionUrl.split('?')[0];

const pool = new Pool({
  connectionString: connectionUrl,
  ssl: { rejectUnauthorized: false }
});

async function initDB() {
  try {
    const sql = fs.readFileSync('./sql/init.sql', 'utf8');
    await pool.query(sql);
    console.log("TABLES CREATED SUCCESSFULLY!");
  } catch(e) {
    console.error("ERROR CREATING TABLES:", e.message);
  } finally {
    pool.end();
  }
}

initDB();
