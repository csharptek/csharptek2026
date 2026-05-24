import { getSettings } from './db'

async function getGraphToken(settings) {
  const res = await fetch(
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
  const data = await res.json()
  if (!data.access_token) throw new Error('Graph auth failed')
  return data.access_token
}

export async function sendCommentNotification({ postTitle, postSlug, commenterName, commenterEmail, comment, commentId }) {
  const settings = await getSettings([
    'microsoft_tenant_id', 'microsoft_client_id', 'microsoft_client_secret',
    'microsoft_sender_email', 'comment_notify_email'
  ])

  if (!settings.microsoft_tenant_id || !settings.microsoft_sender_email) {
    console.warn('Email not configured — skipping notification')
    return
  }

  const token = await getGraphToken(settings)
  const adminUrl = process.env.ADMIN_URL || 'https://your-admin.railway.app'

  await fetch(
    `https://graph.microsoft.com/v1.0/users/${settings.microsoft_sender_email}/sendMail`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: {
          subject: `New Blog Comment — "${postTitle}"`,
          body: {
            contentType: 'HTML',
            content: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:8px;">
                <div style="background:#0A1628;padding:20px 24px;border-radius:6px 6px 0 0;">
                  <span style="font-size:18px;font-weight:800;color:#fff;">CSharpTek <span style="color:#FF6B2B">Admin</span></span>
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
}
