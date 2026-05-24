import { query } from '../../../lib/db'
import { isAuthenticated } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const { post_id, approved } = req.query
    let sql = `
      SELECT c.*, p.title as post_title, p.slug as post_slug
      FROM blog_comments c
      LEFT JOIN blog_posts p ON p.id = c.post_id
    `
    const params = []
    const conditions = []
    if (post_id) { params.push(post_id); conditions.push(`c.post_id = $${params.length}`) }
    if (approved !== undefined) { params.push(approved === 'true'); conditions.push(`c.approved = $${params.length}`) }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ')
    sql += ' ORDER BY c.created_at DESC'

    const result = await query(sql, params)
    return res.status(200).json(result.rows)
  }

  if (req.method === 'PATCH') {
    const { id, approved } = req.body
    await query('UPDATE blog_comments SET approved = $1 WHERE id = $2', [approved, id])
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    await query('DELETE FROM blog_comments WHERE id = $1', [id])
    return res.status(200).json({ ok: true })
  }

  return res.status(405).end()
}
