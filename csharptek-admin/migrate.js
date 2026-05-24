const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

async function migrate() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })

  try {
    const sql = fs.readFileSync(path.join(__dirname, 'migration.sql'), 'utf8')
    await pool.query(sql)
    console.log('✓ Migration complete')
  } catch (e) {
    console.error('Migration error:', e.message)
    // Don't exit — tables may already exist
  } finally {
    await pool.end()
  }
}

migrate()
