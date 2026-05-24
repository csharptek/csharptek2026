import { query } from '../../../lib/db'
import { isAuthenticated } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.query

  if (req.method === 'GET') {
    const result = await query(
      `SELECT p.*, a.name as author_name
       FROM blog_posts p
       LEFT JOIN blog_authors a ON a.id = p.author_id
       WHERE p.id = $1`, [id]
    )
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(result.rows[0])
  }

  if (req.method === 'PUT') {
    const { slug, title, meta_title, meta_description, excerpt, category, category_color,
            read_time, icon, tags, body, author_id, og_image_url, featured, status } = req.body

    const existing = await query('SELECT status FROM blog_posts WHERE id = $1', [id])
    if (!existing.rows.length) return res.status(404).json({ error: 'Not found' })

    const wasPublished = existing.rows[0].status === 'published'
    const nowPublished = status === 'published'
    const published_at = (!wasPublished && nowPublished) ? new Date() : undefined

    const setParts = [
      'slug=$2','title=$3','meta_title=$4','meta_description=$5','excerpt=$6',
      'category=$7','category_color=$8','read_time=$9','icon=$10','tags=$11',
      'body=$12','author_id=$13','og_image_url=$14','featured=$15','status=$16'
    ]
    const params = [
      id, slug, title, meta_title, meta_description, excerpt,
      category, category_color || '#FF6B2B', read_time, icon || '📝',
      tags || [], JSON.stringify(body || []),
      author_id || null, og_image_url || null, featured || false, status || 'draft'
    ]

    if (published_at !== undefined) {
      setParts.push(`published_at=$${params.length + 1}`)
      params.push(published_at)
    }

    await query(
      `UPDATE blog_posts SET ${setParts.join(',')} WHERE id=$1`,
      params
    )
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    await query('DELETE FROM blog_posts WHERE id = $1', [id])
    return res.status(200).json({ ok: true })
  }

  return res.status(405).end()
}
