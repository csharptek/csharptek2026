import { query } from '../../../lib/db'
import { isAuthenticated } from '../../../lib/auth'

const ALLOWED_KEYS = [
  'azure_storage_account', 'azure_storage_key', 'azure_container_name',
  'microsoft_tenant_id', 'microsoft_client_id', 'microsoft_client_secret',
  'microsoft_sender_email', 'comment_notify_email'
]

export default async function handler(req, res) {
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const result = await query('SELECT key, value FROM admin_settings WHERE key = ANY($1)', [ALLOWED_KEYS])
    const map = {}
    ALLOWED_KEYS.forEach(k => { map[k] = '' })
    result.rows.forEach(r => { map[r.key] = r.value || '' })
    // Mask secrets partially
    const masked = { ...map }
    const secretKeys = ['azure_storage_key', 'microsoft_client_secret']
    secretKeys.forEach(k => {
      if (masked[k] && masked[k].length > 6) {
        masked[k] = masked[k].slice(0, 4) + '••••••••' + masked[k].slice(-4)
      }
    })
    return res.status(200).json({ settings: masked, keys: ALLOWED_KEYS })
  }

  if (req.method === 'POST') {
    const { settings } = req.body
    if (!settings) return res.status(400).json({ error: 'No settings' })

    for (const [key, value] of Object.entries(settings)) {
      if (!ALLOWED_KEYS.includes(key)) continue
      // Don't overwrite secrets if they contain mask characters
      if (typeof value === 'string' && value.includes('••••')) continue
      await query(
        'INSERT INTO admin_settings (key, value, updated_at) VALUES ($1,$2,NOW()) ON CONFLICT (key) DO UPDATE SET value=$2, updated_at=NOW()',
        [key, value]
      )
    }
    return res.status(200).json({ ok: true })
  }

  return res.status(405).end()
}
