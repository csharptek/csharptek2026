export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false })

  const { name, email, company, phone, service, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Missing required fields.' })

  // Get Microsoft Graph token
  let accessToken
  try {
    const tokenRes = await fetch(
      `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.MICROSOFT_CLIENT_ID,
          client_secret: process.env.MICROSOFT_CLIENT_SECRET,
          scope: 'https://graph.microsoft.com/.default',
          grant_type: 'client_credentials',
        }),
      }
    )
    const tokenData = await tokenRes.json()
    accessToken = tokenData.access_token
    if (!accessToken) throw new Error('No token')
  } catch {
    return res.status(500).json({ success: false, message: 'Auth error.' })
  }

  const emailBody = {
    message: {
      subject: `New Contact Form Submission — ${name}${company ? ` (${company})` : ''}`,
      body: {
        contentType: 'HTML',
        content: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:8px;">
            <div style="background:#0A1628;padding:20px 24px;border-radius:6px 6px 0 0;margin-bottom:0;">
              <span style="font-size:20px;font-weight:800;color:#fff;">C#<span style="color:#7EC8E3">harpTek</span></span>
              <span style="float:right;font-size:11px;color:rgba(255,255,255,.5);margin-top:4px;">Contact Form</span>
            </div>
            <div style="background:#fff;padding:28px;border-radius:0 0 6px 6px;border:1px solid #e5e7eb;border-top:none;">
              <h2 style="font-size:18px;color:#0A1628;margin:0 0 20px;">New Inquiry from ${name}</h2>
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr><td style="padding:8px 0;color:#6b7280;width:130px;">Name</td><td style="padding:8px 0;color:#111827;font-weight:600;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#1565A8;">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;color:#111827;">${phone}</td></tr>` : ''}
                ${company ? `<tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;color:#111827;">${company}</td></tr>` : ''}
                ${service ? `<tr><td style="padding:8px 0;color:#6b7280;">Service</td><td style="padding:8px 0;color:#111827;">${service}</td></tr>` : ''}
              </table>
              <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e5e7eb;">
                <p style="font-weight:600;color:#374151;margin:0 0 8px;">Message</p>
                <div style="background:#f9fafb;padding:16px;border-radius:6px;color:#374151;line-height:1.7;white-space:pre-wrap;">${message}</div>
              </div>
              <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Submitted via csharptek.com/contact</p>
            </div>
          </div>
        `,
      },
      toRecipients: [{ emailAddress: { address: 'info@csharptek.com' } }],
      replyTo: [{ emailAddress: { address: email, name } }],
    },
    saveToSentItems: true,
  }

  try {
    const sendRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${process.env.MICROSOFT_SENDER_EMAIL}/sendMail`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(emailBody),
      }
    )
    if (sendRes.status === 202) return res.status(200).json({ success: true })
    return res.status(500).json({ success: false, message: 'Failed to send email.' })
  } catch {
    return res.status(500).json({ success: false, message: 'Network error.' })
  }
}
