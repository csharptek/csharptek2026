import { query } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { slug } = req.query

  const result = await query(
    `SELECT p.*,
            a.name as author_name, a.role as author_role, a.avatar_url as author_avatar, a.bio as author_bio
     FROM blog_posts p
     LEFT JOIN blog_authors a ON a.id = p.author_id
     WHERE p.slug = $1 AND p.status = 'published'`,
    [slug]
  )

  if (!result.rows.length) return res.status(404).json({ error: 'Not found' })

  const post = result.rows[0]
  post.published_at = post.published_at?.toISOString() || null
  post.created_at = post.created_at?.toISOString() || null
  post.updated_at = post.updated_at?.toISOString() || null

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  return res.status(200).json(post)
}
