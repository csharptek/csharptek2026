import { query } from '../../../lib/db'
import { isAuthenticated } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const { status, search } = req.query
    let sql = `
      SELECT p.id, p.slug, p.title, p.category, p.status, p.featured,
             p.published_at, p.created_at, p.updated_at, p.og_image_url, p.icon,
             a.name as author_name,
             (SELECT COUNT(*) FROM blog_comments c WHERE c.post_id = p.id AND c.approved = false) as pending_comments
      FROM blog_posts p
      LEFT JOIN blog_authors a ON a.id = p.author_id
    `
    const params = []
    const conditions = []
    if (status && status !== 'all') { params.push(status); conditions.push(`p.status = $${params.length}`) }
    if (search) { params.push(`%${search}%`); conditions.push(`p.title ILIKE $${params.length}`) }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ')
    sql += ' ORDER BY p.updated_at DESC'

    const result = await query(sql, params)
    return res.status(200).json(result.rows)
  }

  if (req.method === 'POST') {
    const { slug, title, meta_title, meta_description, excerpt, category, category_color,
            read_time, icon, tags, body, author_id, og_image_url, featured, status } = req.body

    if (!slug || !title) return res.status(400).json({ error: 'slug and title required' })

    const published_at = status === 'published' ? new Date() : null

    const result = await query(
      `INSERT INTO blog_posts
        (slug, title, meta_title, meta_description, excerpt, category, category_color,
         read_time, icon, tags, body, author_id, og_image_url, featured, status, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
       RETURNING id`,
      [slug, title, meta_title, meta_description, excerpt, category, category_color || '#FF6B2B',
       read_time, icon || '📝', tags || [], JSON.stringify(body || []),
       author_id || null, og_image_url || null, featured || false, status || 'draft', published_at]
    )
    return res.status(201).json({ id: result.rows[0].id })
  }

  return res.status(405).end()
}
