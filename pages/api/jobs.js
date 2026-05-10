// pages/api/jobs.js
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

// Strip HTML tags and decode HTML entities
function clean(str) {
  if (!str) return ''
  return str
    .replace(/\\u003C/gi, '<').replace(/\\u003E/gi, '>') // unescape unicode
    .replace(/\\u0026/gi, '&').replace(/\\u0022/gi, '"')
    .replace(/<\/p>/gi, '\n').replace(/<\/li>/gi, '\n') // block endings → newline
    .replace(/<li>/gi, '• ')                             // list items → bullet
    .replace(/<br\s*\/?>/gi, '\n')                       // line breaks
    .replace(/<[^>]+>/g, '')                             // strip remaining tags
    .replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"')
    .replace(/&nbsp;/gi, ' ').replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, '\n\n')                          // collapse excess newlines
    .trim()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false })
  try {
    const { rows } = await pool.query(`
      SELECT
        job_id        AS "jobId",
        job_title     AS "jobTitle",
        job_summary   AS "jobSummary",
        key_responsibility AS "keyResponsibility",
        required_skills_qualifications AS "requiredSkills",
        preferred_skills AS "preferredSkills",
        key_skills    AS "keySkills",
        location,
        experience,
        created_on    AS "createdOn"
      FROM job_post
      WHERE is_deleted = false
        AND status = true
      ORDER BY created_on DESC
    `)
    // Clean HTML from all text fields
    const jobs = rows.map(j => ({
      ...j,
      jobSummary:        clean(j.jobSummary),
      keyResponsibility: clean(j.keyResponsibility),
      requiredSkills:    clean(j.requiredSkills),
      preferredSkills:   clean(j.preferredSkills),
    }))
    return res.status(200).json({ success: true, jobs })
  } catch (err) {
    console.error('DB error:', err.message)
    return res.status(500).json({ success: false, jobs: [], message: 'Could not load jobs' })
  }
}
