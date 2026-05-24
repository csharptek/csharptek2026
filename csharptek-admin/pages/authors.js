import Head from 'next/head'
import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { S_SHARED, EmptyState } from '../components/UI'

function AuthorModal({ author, onSave, onClose }) {
  const [form, setForm] = useState({ name: '', role: '', bio: '', avatar_url: '', ...author })
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    const method = author?.id ? 'PUT' : 'POST'
    await fetch('/api/authors', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    onSave()
  }

  const S = `
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:200;display:flex;align-items:center;justify-content:center;}
    .modal{background:#161b22;border:1px solid #21262d;border-radius:10px;padding:28px;width:100%;max-width:480px;}
    .modal-title{font-size:15px;font-weight:600;margin-bottom:20px;}
    .modal-actions{display:flex;gap:10px;margin-top:20px;}
  `

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{S}{S_SHARED}</style>
      <div className="modal">
        <div className="modal-title">{author?.id ? 'Edit Author' : 'New Author'}</div>
        <div className="form-group">
          <label className="form-label">Name *</label>
          <input className="form-input" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <input className="form-input" value={form.role || ''} onChange={e => setForm(f => ({...f, role: e.target.value}))} placeholder="e.g. AI Engineer" />
        </div>
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea className="form-textarea" rows={3} value={form.bio || ''} onChange={e => setForm(f => ({...f, bio: e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="form-label">Avatar URL</label>
          <input className="form-input" value={form.avatar_url || ''} onChange={e => setForm(f => ({...f, avatar_url: e.target.value}))} placeholder="https://..." />
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function Authors() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/authors')
    setAuthors(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function deleteAuthor(id, name) {
    if (!confirm(`Delete "${name}"?`)) return
    await fetch(`/api/authors?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <AdminLayout title="Authors" actions={
      <button className="btn btn-primary btn-sm" onClick={() => setModal({})}>+ New Author</button>
    }>
      <Head><title>Authors — CSharpTek Admin</title></Head>
      <style>{S_SHARED}</style>

      {modal !== null && (
        <AuthorModal author={modal} onSave={() => { setModal(null); load() }} onClose={() => setModal(null)} />
      )}

      <div className="card" style={{padding:0}}>
        {loading ? (
          <div style={{padding:24,color:'#8b949e'}}>Loading...</div>
        ) : authors.length === 0 ? (
          <EmptyState icon="👤" text="No authors yet" />
        ) : (
          <table className="table">
            <thead>
              <tr><th>Author</th><th>Role</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {authors.map(a => (
                <tr key={a.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      {a.avatar_url ? (
                        <img src={a.avatar_url} alt={a.name} style={{width:32,height:32,borderRadius:'50%',objectFit:'cover'}} />
                      ) : (
                        <div style={{width:32,height:32,borderRadius:'50%',background:'#21262d',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>
                          {a.name[0]}
                        </div>
                      )}
                      <div>
                        <div style={{fontWeight:600,fontSize:13}}>{a.name}</div>
                        {a.bio && <div style={{fontSize:11,color:'#8b949e'}}>{a.bio.slice(0,60)}...</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{fontSize:12,color:'#8b949e'}}>{a.role || '—'}</td>
                  <td>
                    <div style={{display:'flex',gap:6}}>
                      <button onClick={() => setModal(a)} style={{padding:'4px 10px',borderRadius:5,background:'#21262d',color:'#e6edf3',border:'none',fontSize:12,fontWeight:600,cursor:'pointer'}}>Edit</button>
                      <button onClick={() => deleteAuthor(a.id, a.name)} style={{padding:'4px 10px',borderRadius:5,background:'#da363322',color:'#f85149',border:'none',fontSize:12,fontWeight:600,cursor:'pointer'}}>Delete</button>
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
