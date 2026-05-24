import { query } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const result = await query(
    `SELECT p.id, p.slug, p.title, p.meta_title, p.meta_description, p.excerpt,
            p.category, p.category_color, p.read_time, p.icon, p.tags,
            p.og_image_url, p.featured, p.published_at,
            a.name as author_name, a.role as author_role, a.avatar_url as author_avatar
     FROM blog_posts p
     LEFT JOIN blog_authors a ON a.id = p.author_id
     WHERE p.status = 'published'
     ORDER BY p.published_at DESC, p.created_at DESC`,
    []
  )

  const posts = result.rows.map(p => ({
    ...p,
    published_at: p.published_at?.toISOString() || null,
  }))

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  return res.status(200).json(posts)
}
