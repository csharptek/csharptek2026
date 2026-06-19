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

    // Verify reCAPTCHA (only if secret key is configured)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA token missing.' })
      }

      const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      })
      const captchaData = await captchaRes.json()
      if (!captchaData.success || captchaData.score < 0.5) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA failed. Please try again.' })
      }
    }

    // Proxy to new Azure backend
    const dotnetRes = await fetch('https://interviewschedulerprodapi.azurewebsites.net/api/Career/apply', {
      method: 'POST',
      headers: {
        'Content-Type': req.headers['content-type'],
        'User-Agent': 'CSharpTek-NewSite/1.0',
      },
      body: rawBody,
    })

    if (dotnetRes.ok) {
      const data = await dotnetRes.json()
      if (data.success) {
        return res.status(200).json({ success: true })
      } else {
        return res.status(400).json({ success: false, message: data.message || 'Submission failed.' })
      }
    } else {
      let errMsg = 'Submission failed. Please try again.'
      try {
        const data = await dotnetRes.json()
        if (data.message) errMsg = data.message
      } catch (e) {
        // response may not be JSON
      }
      return res.status(dotnetRes.status || 500).json({ success: false, message: errMsg })
    }
  } catch (err) {
    console.error('Apply error:', err.message)
    return res.status(500).json({ success: false, message: 'Network error. Please email hr@csharptek.com directly.' })
  }
}
