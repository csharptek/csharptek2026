// pages/api/jobs.js
import { Pool } from 'pg'
import { parse } from 'pg-connection-string'

const isDev = process.env.NODE_ENV !== 'production';

let dbConfig = {};
let useSSL = !isDev; // Default to SSL in production, no SSL in development

if (process.env.DATABASE_URL) {
  dbConfig = parse(process.env.DATABASE_URL);
  
  const host = dbConfig.host || '';
  const isLocalHost = host.includes('localhost') || host.includes('127.0.0.1') || host === '';
  
  if (isLocalHost) {
    useSSL = false;
  } else {
    useSSL = true; // Remote database, enforce SSL
  }
  
  if (dbConfig.password === undefined || dbConfig.password === null) {
    dbConfig.password = '';
  }
} else {
  // Relying on environment variables. Default to no SSL in development.
  useSSL = false;
}

if (!useSSL) {
  process.env.PGSSLMODE = 'disable';
  if (!process.env.PGPASSWORD) {
    process.env.PGPASSWORD = '';
  }
} else {
  // Let the PG driver decide or use connection parameters for SSL
  delete process.env.PGSSLMODE;
}

const pool = new Pool({
  ...dbConfig,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
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
    return res.status(500).json({ success: false, jobs: [], message: err.message })
  }
}
