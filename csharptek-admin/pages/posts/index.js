import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { S_SHARED, StatusBadge, EmptyState } from '../../components/UI'

export default function PostsList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const router = useRouter()

  async function load() {
    setLoading(true)
    const params = new URLSearchParams()
    if (filter !== 'all') params.set('status', filter)
    if (search) params.set('search', search)
    const res = await fetch(`/api/posts?${params}`)
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [filter, search])

  async function deletePost(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    load()
  }

  async function toggleStatus(post) {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, status: newStatus })
    })
    load()
  }

  return (
    <AdminLayout
      title="Blog Posts"
      actions={
        <Link href="/posts/new" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'7px 14px',borderRadius:6,background:'#238636',color:'#fff',fontWeight:600,fontSize:13}}>
          + New Post
        </Link>
      }
    >
      <Head><title>Posts — CSharpTek Admin</title></Head>
      <style>{`${S_SHARED}
        .filters{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center;}
        .filter-btn{padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid #30363d;background:none;color:#8b949e;cursor:pointer;transition:all .15s;}
        .filter-btn.active{background:#1f6feb22;border-color:#58a6ff;color:#58a6ff;}
        .search{flex:1;min-width:200px;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:7px 12px;font-size:13px;color:#e6edf3;outline:none;}
        .search:focus{border-color:#58a6ff;}
        .post-title-cell{font-weight:600;color:#e6edf3;}
        .post-slug{font-size:11px;color:#8b949e;margin-top:2px;font-family:monospace;}
        .actions{display:flex;gap:6px;}
        .pending-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#f85149;margin-left:5px;}
      `}</style>

      <div className="filters">
        {['all','published','draft'].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <input className="search" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card" style={{padding:0}}>
        {loading ? (
          <div style={{padding:24,color:'#8b949e'}}>Loading...</div>
        ) : posts.length === 0 ? (
          <EmptyState icon="📝" text="No posts found" />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Post</th>
                <th>Category</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="post-title-cell">{p.icon} {p.title}</div>
                    <div className="post-slug">/blog/{p.slug}</div>
                  </td>
                  <td style={{color:'#8b949e',fontSize:12}}>{p.category || '—'}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <span style={{fontSize:12,color:'#8b949e'}}>
                      {Number(p.pending_comments) > 0 && (
                        <span style={{color:'#f85149',fontWeight:700}}>{p.pending_comments} pending</span>
                      )}
                    </span>
                  </td>
                  <td style={{fontSize:12,color:'#8b949e'}}>{new Date(p.updated_at).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      <Link href={`/posts/${p.id}`} style={{padding:'4px 10px',borderRadius:5,background:'#21262d',color:'#e6edf3',fontSize:12,fontWeight:600}}>Edit</Link>
                      <button
                        onClick={() => toggleStatus(p)}
                        style={{padding:'4px 10px',borderRadius:5,background:p.status==='published'?'#9e6a0322':'#23863622',color:p.status==='published'?'#bb8009':'#2ea043',border:'none',fontSize:12,fontWeight:600}}
                      >
                        {p.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => deletePost(p.id, p.title)}
                        style={{padding:'4px 10px',borderRadius:5,background:'#da363322',color:'#f85149',border:'none',fontSize:12,fontWeight:600}}
                      >
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
  const { isAuthenticated } = await import('../../lib/auth')
  if (!isAuthenticated(req)) return { redirect: { destination: '/login', permanent: false } }
  return { props: {} }
}
