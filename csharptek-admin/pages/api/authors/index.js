import { query } from '../../../lib/db'
import { isAuthenticated } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const result = await query('SELECT * FROM blog_authors ORDER BY created_at DESC')
    return res.status(200).json(result.rows)
  }

  if (req.method === 'POST') {
    const { name, role, bio, avatar_url } = req.body
    if (!name) return res.status(400).json({ error: 'name required' })
    const result = await query(
      'INSERT INTO blog_authors (name, role, bio, avatar_url) VALUES ($1,$2,$3,$4) RETURNING id',
      [name, role, bio, avatar_url]
    )
    return res.status(201).json({ id: result.rows[0].id })
  }

  if (req.method === 'PUT') {
    const { id, name, role, bio, avatar_url } = req.body
    await query(
      'UPDATE blog_authors SET name=$2, role=$3, bio=$4, avatar_url=$5 WHERE id=$1',
      [id, name, role, bio, avatar_url]
    )
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    await query('DELETE FROM blog_authors WHERE id = $1', [id])
    return res.status(200).json({ ok: true })
  }

  return res.status(405).end()
}
