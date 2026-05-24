import { Pool } from 'pg'

let pool

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
    })
  }
  return pool
}

export async function query(text, params) {
  const client = await getPool().connect()
  try {
    const res = await client.query(text, params)
    return res
  } finally {
    client.release()
  }
}

export async function getSetting(key) {
  const res = await query('SELECT value FROM admin_settings WHERE key = $1', [key])
  return res.rows[0]?.value || ''
}

export async function getSettings(keys) {
  const res = await query('SELECT key, value FROM admin_settings WHERE key = ANY($1)', [keys])
  const map = {}
  res.rows.forEach(r => { map[r.key] = r.value })
  return map
}
