import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import PostForm from '../../components/PostForm'
import { S_SHARED } from '../../components/UI'

export default function EditPost({ post }) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  async function handleSave(payload) {
    setSaving(true)
    setError('')
    setSuccess('')
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (res.ok) {
      setSuccess('Saved!')
      setTimeout(() => setSuccess(''), 3000)
    } else {
      setError(data.error || 'Failed to save')
    }
    setSaving(false)
  }

  const initial = {
    ...post,
    body: typeof post.body === 'string' ? JSON.parse(post.body) : (post.body || []),
    tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '')
  }

  return (
    <AdminLayout title={`Edit: ${post.title}`}>
      <Head><title>Edit Post — CSharpTek Admin</title></Head>
      <style>{S_SHARED}</style>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <PostForm initial={initial} onSave={handleSave} saving={saving} />
    </AdminLayout>
  )
}

export async function getServerSideProps({ req, params }) {
  const { isAuthenticated } = await import('../../lib/auth')
  if (!isAuthenticated(req)) return { redirect: { destination: '/login', permanent: false } }

  const { query: dbQuery } = await import('../../lib/db')
  const result = await dbQuery('SELECT * FROM blog_posts WHERE id = $1', [params.id])
  if (!result.rows.length) return { notFound: true }

  const post = result.rows[0]
  post.created_at = post.created_at?.toISOString() || null
  post.updated_at = post.updated_at?.toISOString() || null
  post.published_at = post.published_at?.toISOString() || null

  return { props: { post } }
}
