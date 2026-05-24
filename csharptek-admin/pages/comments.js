import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../components/AdminLayout'
import { S_SHARED, StatusBadge, EmptyState } from '../components/UI'

export default function Comments() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const router = useRouter()

  async function load() {
    setLoading(true)
    const params = new URLSearchParams()
    if (filter === 'pending') params.set('approved', 'false')
    if (filter === 'approved') params.set('approved', 'true')
    const res = await fetch(`/api/comments?${params}`)
    const data = await res.json()
    setComments(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  useEffect(() => {
    if (router.query.filter) setFilter(router.query.filter)
  }, [router.query.filter])

  async function approve(id) {
    await fetch('/api/comments', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, approved: true }) })
    load()
  }

  async function reject(id) {
    await fetch('/api/comments', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, approved: false }) })
    load()
  }

  async function deleteComment(id) {
    if (!confirm('Delete this comment permanently?')) return
    await fetch(`/api/comments?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <AdminLayout title="Comments">
      <Head><title>Comments — CSharpTek Admin</title></Head>
      <style>{`${S_SHARED}
        .filters{display:flex;gap:10px;margin-bottom:20px;}
        .filter-btn{padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid #30363d;background:none;color:#8b949e;cursor:pointer;}
        .filter-btn.active{background:#1f6feb22;border-color:#58a6ff;color:#58a6ff;}
        .comment-text{font-size:13px;color:#e6edf3;line-height:1.5;margin:6px 0;}
        .comment-meta{font-size:11px;color:#8b949e;}
        .actions{display:flex;gap:6px;}
      `}</style>

      <div className="filters">
        {['all','pending','approved'].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="card" style={{padding:0}}>
        {loading ? (
          <div style={{padding:24,color:'#8b949e'}}>Loading...</div>
        ) : comments.length === 0 ? (
          <EmptyState icon="💬" text="No comments found" />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Comment</th>
                <th>Post</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{fontWeight:600,fontSize:13}}>{c.name} <span style={{color:'#8b949e',fontWeight:400}}>({c.email})</span></div>
                    <div className="comment-text">{c.comment}</div>
                  </td>
                  <td style={{fontSize:12,color:'#8b949e'}}>{c.post_title || '—'}</td>
                  <td><StatusBadge status={c.approved ? 'approved' : 'pending'} /></td>
                  <td style={{fontSize:12,color:'#8b949e'}}>{new Date(c.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      {!c.approved && (
                        <button onClick={() => approve(c.id)} style={{padding:'4px 10px',borderRadius:5,background:'#23863622',color:'#2ea043',border:'none',fontSize:12,fontWeight:600,cursor:'pointer'}}>
                          ✓ Approve
                        </button>
                      )}
                      {c.approved && (
                        <button onClick={() => reject(c.id)} style={{padding:'4px 10px',borderRadius:5,background:'#9e6a0322',color:'#bb8009',border:'none',fontSize:12,fontWeight:600,cursor:'pointer'}}>
                          Unpublish
                        </button>
                      )}
                      <button onClick={() => deleteComment(c.id)} style={{padding:'4px 10px',borderRadius:5,background:'#da363322',color:'#f85149',border:'none',fontSize:12,fontWeight:600,cursor:'pointer'}}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  )
}

export async function getServerSideProps({ req }) {
  const { isAuthenticated } = await import('../lib/auth')
  if (!isAuthenticated(req)) return { redirect: { destination: '/login', permanent: false } }
  return { props: {} }
}
