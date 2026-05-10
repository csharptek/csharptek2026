// pages/api/apply.js
// Env vars needed on Railway:
//   RECAPTCHA_SECRET_KEY

export const config = {
  api: { bodyParser: false },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false })

  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const rawBody = Buffer.concat(chunks)
    const bodyStr = rawBody.toString('binary')

    // Extract recaptcha token
    const tokenMatch = bodyStr.match(/name="recaptchaToken"\r\n\r\n([^\r\n]+)/)
    const recaptchaToken = tokenMatch ? tokenMatch[1].trim() : null

    if (!recaptchaToken) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA token missing.' })
    }

    // Verify reCAPTCHA
    const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    })
    const captchaData = await captchaRes.json()
    if (!captchaData.success || captchaData.score < 0.5) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA failed. Please try again.' })
    }

    // Proxy to old .NET backend
    const dotnetRes = await fetch('https://www.csharptek.com/Recruitment/Contact', {
      method: 'POST',
      headers: {
        'Content-Type': req.headers['content-type'],
        'User-Agent': 'CSharpTek-NewSite/1.0',
      },
      body: rawBody,
      redirect: 'manual',
    })

    const location = dotnetRes.headers.get('location') || ''

    if (dotnetRes.status === 302 || dotnetRes.ok) {
      if (location.includes('already applied')) {
        return res.status(409).json({ success: false, message: 'You have already applied for this job within the last 6 months.' })
      }
      if (location.includes('Mail not send') || location.includes('problem')) {
        return res.status(500).json({ success: false, message: 'Something went wrong. Please email hr@csharptek.com directly.' })
      }
      return res.status(200).json({ success: true })
    }

    return res.status(500).json({ success: false, message: 'Submission failed. Please try again.' })
  } catch (err) {
    console.error('Apply error:', err.message)
    return res.status(500).json({ success: false, message: 'Network error. Please email hr@csharptek.com directly.' })
  }
}
