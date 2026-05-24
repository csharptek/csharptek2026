import { signToken, setCookieHeader } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body
  const correct = process.env.ADMIN_PASSWORD

  if (!correct) return res.status(500).json({ error: 'ADMIN_PASSWORD env var not set' })
  if (password !== correct) return res.status(401).json({ error: 'Invalid password' })

  const token = signToken()
  res.setHeader('Set-Cookie', setCookieHeader(token))
  return res.status(200).json({ ok: true })
}
