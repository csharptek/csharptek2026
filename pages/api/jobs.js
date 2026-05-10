// pages/api/jobs.js
// Env vars needed on Railway:
//   DATABASE_URL=postgresql://csharptek:Test105*@interviewschedulerdbserver.postgres.database.azure.com/interviewdatabaseProd?sslmode=require

import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

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
    return res.status(200).json({ success: true, jobs: rows })
  } catch (err) {
    console.error('DB error:', err.message)
    return res.status(500).json({ success: false, jobs: [], message: 'Could not load jobs' })
  }
}
