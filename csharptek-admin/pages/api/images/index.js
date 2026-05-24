import { uploadBlob, deleteBlob } from '../../../lib/azure'
import { query } from '../../../lib/db'
import { isAuthenticated } from '../../../lib/auth'

export const config = { api: { bodyParser: false } }

async function parseMultipart(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const buf = Buffer.concat(chunks)
  const boundary = req.headers['content-type'].split('boundary=')[1]
  const parts = []
  const boundaryBuf = Buffer.from(`--${boundary}`)
  let start = buf.indexOf(boundaryBuf) + boundaryBuf.length + 2
  while (start < buf.length) {
    const end = buf.indexOf(boundaryBuf, start)
    if (end === -1) break
    const part = buf.slice(start, end - 2)
    const headerEnd = part.indexOf('\r\n\r\n')
    const headers = part.slice(0, headerEnd).toString()
    const data = part.slice(headerEnd + 4)
    const nameMatch = headers.match(/name="([^"]+)"/)
    const filenameMatch = headers.match(/filename="([^"]+)"/)
    const ctMatch = headers.match(/Content-Type: (.+)/)
    if (nameMatch) {
      parts.push({
        name: nameMatch[1],
        filename: filenameMatch?.[1],
        contentType: ctMatch?.[1]?.trim(),
        data: filenameMatch ? data : data.toString().trim()
      })
    }
    start = end + boundaryBuf.length + 2
  }
  return parts
}

export default async function handler(req, res) {
  if (!isAuthenticated(req)) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const result = await query('SELECT * FROM blog_images ORDER BY created_at DESC LIMIT 100')
    return res.status(200).json(result.rows)
  }

  if (req.method === 'POST') {
    try {
      const parts = await parseMultipart(req)
      const filePart = parts.find(p => p.filename)
      const altPart = parts.find(p => p.name === 'alt')
      if (!filePart) return res.status(400).json({ error: 'No file' })

      const { filename, originalName, url } = await uploadBlob(
        filePart.data, filePart.filename, filePart.contentType
      )
      const result = await query(
        'INSERT INTO blog_images (filename, original_name, url, alt, size_bytes) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [filename, originalName, url, altPart?.data || '', filePart.data.length]
      )
      return res.status(201).json(result.rows[0])
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  }

  if (req.method === 'DELETE') {
    const { id, filename } = req.query
    try {
      await deleteBlob(filename)
      await query('DELETE FROM blog_images WHERE id = $1', [id])
      return res.status(200).json({ ok: true })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  }

  return res.status(405).end()
}
