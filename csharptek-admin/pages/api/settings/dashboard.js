import { query } from '../../../lib/db'
import { isAuthenticated } from '../../../lib/auth'

export default async function handler(req, res) {
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  const [posts, comments, pending, images] = await Promise.all([
    query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status=\'published\') as published FROM blog_posts'),
    query('SELECT COUNT(*) as total FROM blog_comments'),
    query('SELECT COUNT(*) as total FROM blog_comments WHERE approved = false'),
    query('SELECT COUNT(*) as total FROM blog_images'),
  ])

  const recentPosts = await query(
    'SELECT id, slug, title, status, updated_at FROM blog_posts ORDER BY updated_at DESC LIMIT 5'
  )
  const recentComments = await query(
    `SELECT c.id, c.name, c.comment, c.approved, c.created_at, p.title as post_title, p.slug as post_slug
     FROM blog_comments c LEFT JOIN blog_posts p ON p.id = c.post_id
     ORDER BY c.created_at DESC LIMIT 5`
  )

  return res.status(200).json({
    stats: {
      totalPosts: Number(posts.rows[0].total),
      publishedPosts: Number(posts.rows[0].published),
      totalComments: Number(comments.rows[0].total),
      pendingComments: Number(pending.rows[0].total),
      totalImages: Number(images.rows[0].total),
    },
    recentPosts: recentPosts.rows,
    recentComments: recentComments.rows,
  })
}
