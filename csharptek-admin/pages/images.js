import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { S_SHARED, EmptyState } from '../components/UI'

export default function Images() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(null)
  const fileRef = useRef()

  async function load() {
    setLoading(true)
    const res = await fetch('/api/images')
    setImages(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e) {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    setError('')
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('alt', file.name.replace(/\.[^.]+$/, ''))
      const res = await fetch('/api/images', { method: 'POST', body: fd })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Upload failed')
      }
    }
    setUploading(false)
    load()
    fileRef.current.value = ''
  }

  async function deleteImage(id, filename) {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/images?id=${id}&filename=${encodeURIComponent(filename)}`, { method: 'DELETE' })
    load()
  }

  function copyUrl(url, id) {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  function formatSize(bytes) {
    if (!bytes) return '—'
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  }

  return (
    <AdminLayout title="Image Library" actions={
      <>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{display:'none'}} onChange={handleUpload} />
        <button className="btn btn-primary btn-sm" onClick={() => fileRef.current.click()} disabled={uploading}>
          {uploading ? 'Uploading...' : '+ Upload Images'}
        </button>
      </>
    }>
      <Head><title>Images — CSharpTek Admin</title></Head>
      <style>{`${S_SHARED}
        .img-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;}
        .img-card{background:#161b22;border:1px solid #21262d;border-radius:8px;overflow:hidden;}
        .img-preview{width:100%;height:140px;object-fit:cover;display:block;}
        .img-info{padding:12px;}
        .img-name{font-size:12px;color:#e6edf3;font-weight:500;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .img-size{font-size:11px;color:#8b949e;margin-bottom:8px;}
        .img-actions{display:flex;gap:6px;}
        .img-btn{padding:4px 10px;border-radius:4px;font-size:11px;font-weight:600;border:none;cursor:pointer;}
        .drop-zone{border:2px dashed #30363d;border-radius:8px;padding:40px;text-align:center;color:#8b949e;margin-bottom:20px;cursor:pointer;transition:all .15s;}
        .drop-zone:hover{border-color:#58a6ff;color:#58a6ff;}
      `}</style>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="drop-zone" onClick={() => fileRef.current.click()}>
        <div style={{fontSize:32,marginBottom:8}}>🖼️</div>
        <div style={{fontSize:14,fontWeight:600}}>Click to upload images</div>
        <div style={{fontSize:12,marginTop:4}}>PNG, JPG, WebP, GIF supported</div>
      </div>

      {loading ? (
        <div style={{color:'#8b949e'}}>Loading...</div>
      ) : images.length === 0 ? (
        <EmptyState icon="🖼️" text="No images yet. Upload your first one." />
      ) : (
        <div className="img-grid">
          {images.map(img => (
            <div key={img.id} className="img-card">
              <img src={img.url} alt={img.alt || img.filename} className="img-preview" />
              <div className="img-info">
                <div className="img-name" title={img.original_name || img.filename}>{img.original_name || img.filename}</div>
                <div className="img-size">{formatSize(img.size_bytes)}</div>
                <div className="img-actions">
                  <button className="img-btn" onClick={() => copyUrl(img.url, img.id)}
                    style={{background: copied === img.id ? '#238636' : '#21262d', color: copied === img.id ? '#fff' : '#e6edf3'}}>
                    {copied === img.id ? '✓ Copied' : 'Copy URL'}
                  </button>
                  <button className="img-btn" onClick={() => deleteImage(img.id, img.filename)}
                    style={{background:'#da363322',color:'#f85149'}}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export async function getServerSideProps({ req }) {
  const { isAuthenticated } = await import('../lib/auth')
  if (!isAuthenticated(req)) return { redirect: { destination: '/login', permanent: false } }
  return { props: {} }
}
