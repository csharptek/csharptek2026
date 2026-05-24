import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import PostForm from '../../components/PostForm'
import { S_SHARED } from '../../components/UI'

export default function NewPost() {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSave(payload) {
    setSaving(true)
    setError('')
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (res.ok) {
      router.push(`/posts/${data.id}`)
    } else {
      setError(data.error || 'Failed to save')
      setSaving(false)
    }
  }

  return (
    <AdminLayout title="New Blog Post">
      <Head><title>New Post — CSharpTek Admin</title></Head>
      <style>{S_SHARED}</style>
      {error && <div className="alert alert-error" style={{marginBottom:16}}>{error}</div>}
      <PostForm onSave={handleSave} saving={saving} />
    </AdminLayout>
  )
}

export async function getServerSideProps({ req }) {
  const { isAuthenticated } = await import('../../lib/auth')
  if (!isAuthenticated(req)) return { redirect: { destination: '/login', permanent: false } }
  return { props: {} }
}
