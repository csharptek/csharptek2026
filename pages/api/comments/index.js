import { query } from '../../../lib/db'

async function sendCommentEmail({ postTitle, postSlug, commenterName, commenterEmail, comment }) {
  try {
    // Get settings from DB
    const settingsRes = await query(
      `SELECT key, value FROM admin_settings WHERE key = ANY($1)`,
      [['microsoft_tenant_id','microsoft_client_id','microsoft_client_secret','microsoft_sender_email','comment_notify_email']]
    )
    const settings = {}
    settingsRes.rows.forEach(r => { settings[r.key] = r.value })

    if (!settings.microsoft_tenant_id || !settings.microsoft_sender_email) return

    const tokenRes = await fetch(
      `https://login.microsoftonline.com/${settings.microsoft_tenant_id}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: settings.microsoft_client_id,
          client_secret: settings.microsoft_client_secret,
          scope: 'https://graph.microsoft.com/.default',
          grant_type: 'client_credentials',
        })
      }
    )
    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) return

    const adminUrl = process.env.ADMIN_URL || 'https://your-admin.railway.app'

    await fetch(
      `https://graph.microsoft.com/v1.0/users/${settings.microsoft_sender_email}/sendMail`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokenData.access_token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: {
            subject: `New Blog Comment — "${postTitle}"`,
            body: {
              contentType: 'HTML',
              content: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:8px;">
                  <div style="background:#0A1628;padding:20px 24px;border-radius:6px 6px 0 0;">
                    <span style="font-size:18px;font-weight:800;color:#fff;">CSharpTek <span style="color:#FF6B2B">Blog</span></span>
                  </div>
                  <div style="background:#fff;padding:28px;border-radius:0 0 6px 6px;border:1px solid #e5e7eb;border-top:none;">
                    <h2 style="color:#0A1628;font-size:18px;margin-bottom:16px;">New comment awaiting approval</h2>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Post</td><td style="padding:8px 0;font-size:13px;font-weight:600;color:#0A1628;">${postTitle}</td></tr>
                      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">From</td><td style="padding:8px 0;font-size:13px;font-weight:600;color:#0A1628;">${commenterName} &lt;${commenterEmail}&gt;</td></tr>
                    </table>
                    <div style="background:#f3f4f6;border-left:3px solid #FF6B2B;padding:16px;border-radius:0 6px 6px 0;margin-bottom:24px;">
                      <p style="font-size:14px;color:#374151;line-height:1.6;margin:0;">${comment}</p>
                    </div>
                    <a href="${adminUrl}/comments?post=${postSlug}" style="display:inline-block;background:#FF6B2B;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Review Comment →</a>
                  </div>
                </div>
              `
            },
            toRecipients: [{ emailAddress: { address: settings.comment_notify_email || 'info@csharptek.com' } }]
          }
        })
      }
    )
  } catch (e) {
    console.error('Comment email failed:', e.message)
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { slug } = req.query
    if (!slug) return res.status(400).json({ error: 'slug required' })

    const result = await query(
      `SELECT c.id, c.name, c.comment, c.created_at
       FROM blog_comments c
       JOIN blog_posts p ON p.id = c.post_id
       WHERE p.slug = $1 AND c.approved = true
       ORDER BY c.created_at DESC`,
      [slug]
    )

    const comments = result.rows.map(c => ({
      ...c,
      created_at: c.created_at?.toISOString() || null
    }))

    return res.status(200).json(comments)
  }

  if (req.method === 'POST') {
    const { slug, name, email, comment } = req.body

    if (!slug || !name || !email || !comment) {
      return res.status(400).json({ error: 'All fields required' })
    }
    if (name.length > 120 || email.length > 255 || comment.length > 2000) {
      return res.status(400).json({ error: 'Input too long' })
    }

    // Get post
    const postRes = await query('SELECT id, title FROM blog_posts WHERE slug = $1 AND status = $2', [slug, 'published'])
    if (!postRes.rows.length) return res.status(404).json({ error: 'Post not found' })
    const post = postRes.rows[0]

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || ''

    await query(
      'INSERT INTO blog_comments (post_id, name, email, comment, approved, ip_address) VALUES ($1,$2,$3,$4,false,$5)',
      [post.id, name.trim(), email.trim(), comment.trim(), ip]
    )

    // Send email async - don't block response
    sendCommentEmail({ postTitle: post.title, postSlug: slug, commenterName: name, commenterEmail: email, comment })

    return res.status(201).json({ ok: true, message: 'Comment submitted for review.' })
  }

  return res.status(405).end()
}
