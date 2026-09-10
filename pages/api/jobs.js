// pages/api/jobs.js

const BASE_URL = (process.env.DOTNET_API_BASE_URL || process.env.NEXT_PUBLIC_DOTNET_API_BASE_URL || 'https://pleasing-balance-production-708f.up.railway.app').replace(/\/$/, '')
const JOBS_URL = `${BASE_URL}/api/JobPost/List`

function clean(str) {
  if (!str) return ''
  return String(str)
    .replace(/\u003C/gi, '<')
    .replace(/\u003E/gi, '>')
    .replace(/\u0026/gi, '&')
    .replace(/\u0022/gi, '"')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function normalizeJobs(payload) {
  const possibleArrays = []

  if (Array.isArray(payload)) possibleArrays.push(payload)
  if (payload && Array.isArray(payload.jobs)) possibleArrays.push(payload.jobs)
  if (payload && Array.isArray(payload.data)) possibleArrays.push(payload.data)
  if (payload && Array.isArray(payload.result)) possibleArrays.push(payload.result)
  if (payload && Array.isArray(payload.items)) possibleArrays.push(payload.items)
  if (payload && Array.isArray(payload.value)) possibleArrays.push(payload.value)

  const list = possibleArrays.find(arr => arr && arr.length) || []

  return list.map(item => {
    const job = item || {}

    const jobId = job.jobId ?? job.job_id ?? job.id ?? job.JobId ?? job.Job_ID ?? ''
    const jobTitle = job.jobTitle ?? job.job_title ?? job.title ?? job.JobTitle ?? ''
    const jobSummary = job.jobSummary ?? job.job_summary ?? job.summary ?? job.JobSummary ?? ''
    const keyResponsibility = job.keyResponsibility ?? job.key_responsibility ?? job.keyResponsibilities ?? job.KeyResponsibility ?? ''
    const requiredSkills = job.requiredSkills ?? job.required_skills ?? job.requiredSkillsQualifications ?? job.required_skills_qualifications ?? job.RequiredSkills ?? ''
    const preferredSkills = job.preferredSkills ?? job.preferred_skills ?? job.preferredSkill ?? job.PreferredSkills ?? ''
    const keySkills = job.keySkills ?? job.key_skills ?? job.KeySkills ?? ''
    const location = job.location ?? job.Location ?? ''
    const experience = job.experience ?? job.Experience ?? ''
    const createdOn = job.createdOn ?? job.created_on ?? job.CreatedOn ?? ''

    return {
      jobId: String(jobId),
      jobTitle: clean(jobTitle),
      jobSummary: clean(jobSummary),
      keyResponsibility: clean(keyResponsibility),
      requiredSkills: clean(requiredSkills),
      preferredSkills: clean(preferredSkills),
      keySkills: clean(keySkills),
      location: clean(location),
      experience: clean(experience),
      createdOn: createdOn || null,
    }
  })
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false })

  try {
    const dotnetRes = await fetch(JOBS_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'CSharpTek-NewSite/1.0',
      },
    })

    const rawText = await dotnetRes.text()
    let payload = {}

    if (rawText) {
      try {
        payload = JSON.parse(rawText)
      } catch {
        payload = { raw: rawText }
      }
    }

    const jobs = normalizeJobs(payload)

    if (!dotnetRes.ok) {
      return res.status(dotnetRes.status || 500).json({
        success: false,
        jobs: [],
        message: payload.message || 'Failed to load job openings.',
      })
    }

    return res.status(200).json({ success: true, jobs })
  } catch (err) {
    console.error('Jobs fetch error:', err.message)
    return res.status(500).json({ success: false, jobs: [], message: err.message })
  }
}
