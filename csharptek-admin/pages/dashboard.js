import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { S_SHARED, StatusBadge } from '../components/UI'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/settings/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [])

  return (
    <AdminLayout title="Dashboard">
      <Head><title>Dashboard — CSharpTek Admin</title></Head>
      <style>{S_SHARED}</style>

      {loading ? <div className="text-muted">Loading...</div> : (
        <>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-val">{data.stats.totalPosts}</div>
              <div className="stat-lbl">Total Posts</div>
            </div>
            <div className="stat-card">
              <div className="stat-val" style={{color:'#2ea043'}}>{data.stats.publishedPosts}</div>
              <div className="stat-lbl">Published</div>
            </div>
            <div className="stat-card">
              <div className="stat-val" style={{color: data.stats.pendingComments > 0 ? '#f85149' : '#e6edf3'}}>
                {data.stats.pendingComments}
              </div>
              <div className="stat-lbl">Pending Comments</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{data.stats.totalImages}</div>
              <div className="stat-lbl">Images</div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div className="card">
              <div className="card-title">Recent Posts</div>
              {data.recentPosts.length === 0 ? (
                <div className="text-muted text-sm">No posts yet. <Link href="/posts/new" style={{color:'#58a6ff'}}>Create one →</Link></div>
              ) : (
                <table className="table">
                  <tbody>
                    {data.recentPosts.map(p => (
                      <tr key={p.id}>
                        <td>
                          <Link href={`/posts/${p.id}`} style={{color:'#e6edf3',fontWeight:600}}>{p.title}</Link>
                        </td>
                        <td><StatusBadge status={p.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="card">
              <div className="card-title">Recent Comments</div>
              {data.recentComments.length === 0 ? (
                <div className="text-muted text-sm">No comments yet.</div>
              ) : (
                <table className="table">
                  <tbody>
                    {data.recentComments.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div style={{fontWeight:600,fontSize:13}}>{c.name}</div>
                          <div style={{fontSize:11,color:'#8b949e'}}>{c.post_title}</div>
                          <div style={{fontSize:12,color:'#8b949e',marginTop:3}}>{c.comment.slice(0,60)}...</div>
                        </td>
                        <td><StatusBadge status={c.approved ? 'approved' : 'pending'} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div style={{display:'flex',gap:12,marginTop:20}}>
            <Link href="/posts/new" style={{display:'inline-flex',alignItems:'center',gap:7,padding:'9px 18px',borderRadius:6,background:'#238636',color:'#fff',fontWeight:600,fontSize:13}}>
              + New Post
            </Link>
            {data.stats.pendingComments > 0 && (
              <Link href="/comments?filter=pending" style={{display:'inline-flex',alignItems:'center',gap:7,padding:'9px 18px',borderRadius:6,background:'#9e6a03',color:'#fff',fontWeight:600,fontSize:13}}>
                Review {data.stats.pendingComments} Pending Comment{data.stats.pendingComments > 1 ? 's' : ''}
              </Link>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export async function getServerSideProps({ req }) {
  const { isAuthenticated } = await import('../lib/auth')
  if (!isAuthenticated(req)) return { redirect: { destination: '/login', permanent: false } }
  return { props: {} }
}
