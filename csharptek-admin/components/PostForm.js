import { useState, useEffect } from 'react'

const BLOCK_TYPES = [
  { value: 'intro', label: '📋 Intro (highlighted)' },
  { value: 'h2', label: '📌 Heading H2' },
  { value: 'p', label: '📄 Paragraph' },
  { value: 'cta', label: '🔗 CTA Block' },
]

const CATEGORIES = [
  'Healthcare AI', 'AI Engineering', 'AI Voice', 'Education AI',
  'Pet Care Tech', 'Engineering', 'Business Automation', 'General'
]

function BlockEditor({ block, index, onChange, onDelete, onMove, total }) {
  const S = `
    .block-card{background:#0d1117;border:1px solid #30363d;border-radius:8px;padding:16px;margin-bottom:12px;}
    .block-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
    .block-type{font-size:11px;font-weight:700;color:#58a6ff;text-transform:uppercase;letter-spacing:.05em;flex:1;}
    .block-actions{display:flex;gap:4px;}
    .block-btn{padding:3px 8px;border-radius:4px;border:1px solid #30363d;background:none;color:#8b949e;font-size:11px;cursor:pointer;}
    .block-btn:hover{color:#e6edf3;border-color:#8b949e;}
    .block-btn.del{color:#f85149;border-color:#da3633;}
    .fi{width:100%;background:#161b22;border:1px solid #30363d;border-radius:5px;padding:7px 10px;font-size:13px;color:#e6edf3;outline:none;margin-bottom:8px;}
    .fi:focus{border-color:#58a6ff;}
    .fi:last-child{margin-bottom:0;}
  `

  return (
    <div className="block-card">
      <style>{S}</style>
      <div className="block-header">
        <span className="block-type">{BLOCK_TYPES.find(b => b.value === block.type)?.label || block.type}</span>
        <div className="block-actions">
          {index > 0 && <button className="block-btn" onClick={() => onMove(index, -1)}>↑</button>}
          {index < total - 1 && <button className="block-btn" onClick={() => onMove(index, 1)}>↓</button>}
          <button className="block-btn del" onClick={() => onDelete(index)}>✕</button>
        </div>
      </div>

      {block.type === 'intro' && (
        <textarea className="fi" rows={4} value={block.text || ''} placeholder="Intro text..."
          onChange={e => onChange(index, { ...block, text: e.target.value })} />
      )}
      {block.type === 'h2' && (
        <input className="fi" type="text" value={block.text || ''} placeholder="Heading text..."
          onChange={e => onChange(index, { ...block, text: e.target.value })} />
      )}
      {block.type === 'p' && (
        <textarea className="fi" rows={4} value={block.text || ''} placeholder="Paragraph text..."
          onChange={e => onChange(index, { ...block, text: e.target.value })} />
      )}
      {block.type === 'cta' && (
        <>
          <input className="fi" type="text" value={block.text || ''} placeholder="CTA description text..."
            onChange={e => onChange(index, { ...block, text: e.target.value })} />
          <input className="fi" type="text" value={block.label || ''} placeholder="Button label (e.g. Talk to Our Team)"
            onChange={e => onChange(index, { ...block, label: e.target.value })} />
          <input className="fi" type="text" value={block.href || ''} placeholder="Button URL (e.g. /contact)"
            onChange={e => onChange(index, { ...block, href: e.target.value })} />
        </>
      )}
    </div>
  )
}

export default function PostForm({ initial, onSave, saving }) {
  const [form, setForm] = useState({
    slug: '', title: '', meta_title: '', meta_description: '',
    excerpt: '', category: '', category_color: '#FF6B2B',
    read_time: '', icon: '📝', tags: '', body: [],
    author_id: '', og_image_url: '', featured: false, status: 'draft',
    ...initial
  })
  const [authors, setAuthors] = useState([])
  const [images, setImages] = useState([])
  const [addingBlock, setAddingBlock] = useState(false)

  useEffect(() => {
    fetch('/api/authors').then(r => r.json()).then(setAuthors)
    fetch('/api/images').then(r => r.json()).then(setImages)
  }, [])

  useEffect(() => {
    if (initial) setForm(f => ({ ...f, ...initial, tags: Array.isArray(initial.tags) ? initial.tags.join(', ') : initial.tags || '' }))
  }, [initial])

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  function slugify(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function addBlock(type) {
    const block = type === 'cta' ? { type, text: '', label: '', href: '' } : { type, text: '' }
    setForm(f => ({ ...f, body: [...f.body, block] }))
    setAddingBlock(false)
  }

  function updateBlock(i, updated) {
    setForm(f => { const b = [...f.body]; b[i] = updated; return { ...f, body: b } })
  }

  function deleteBlock(i) {
    setForm(f => ({ ...f, body: f.body.filter((_, idx) => idx !== i) }))
  }

  function moveBlock(i, dir) {
    setForm(f => {
      const b = [...f.body]
      const j = i + dir
      if (j < 0 || j >= b.length) return f
      ;[b[i], b[j]] = [b[j], b[i]]
      return { ...f, body: b }
    })
  }

  function handleSave(status) {
    const payload = {
      ...form,
      tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags,
      status,
      body: form.body,
    }
    onSave(payload)
  }

  const S = `
    .editor{display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start;}
    .main-col{}
    .side-col{position:sticky;top:80px;}
    .section{background:#161b22;border:1px solid #21262d;border-radius:8px;padding:20px;margin-bottom:16px;}
    .section-title{font-size:11px;font-weight:700;color:#8b949e;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px;}
    .form-group{margin-bottom:14px;}
    .form-label{display:block;font-size:11px;font-weight:600;color:#8b949e;margin-bottom:5px;text-transform:uppercase;letter-spacing:.04em;}
    .form-input{width:100%;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:8px 11px;font-size:13px;color:#e6edf3;outline:none;}
    .form-input:focus{border-color:#58a6ff;}
    .form-textarea{width:100%;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:8px 11px;font-size:13px;color:#e6edf3;outline:none;resize:vertical;}
    .form-textarea:focus{border-color:#58a6ff;}
    .form-select{width:100%;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:8px 11px;font-size:13px;color:#e6edf3;outline:none;}
    .char-count{font-size:10px;color:#6e7681;text-align:right;margin-top:3px;}
    .add-block{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px;}
    .add-btn{padding:5px 12px;border-radius:5px;border:1px dashed #30363d;background:none;color:#8b949e;font-size:12px;cursor:pointer;transition:all .15s;}
    .add-btn:hover{border-color:#58a6ff;color:#58a6ff;}
    .save-btns{display:flex;gap:10px;margin-top:16px;}
    .btn-publish{background:#238636;color:#fff;border:none;border-radius:6px;padding:10px 20px;font-size:13px;font-weight:600;cursor:pointer;}
    .btn-publish:hover{background:#2ea043;}
    .btn-draft{background:#21262d;color:#e6edf3;border:1px solid #30363d;border-radius:6px;padding:10px 20px;font-size:13px;font-weight:600;cursor:pointer;}
    .btn-draft:hover{background:#30363d;}
    .btn:disabled{opacity:.5;cursor:not-allowed;}
    .img-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-height:200px;overflow-y:auto;}
    .img-thumb{width:100%;aspect-ratio:1;object-fit:cover;border-radius:4px;cursor:pointer;border:2px solid transparent;transition:border .15s;}
    .img-thumb:hover,.img-thumb.selected{border-color:#58a6ff;}
    .og-preview{width:100%;height:60px;object-fit:cover;border-radius:6px;margin-bottom:8px;}
    .hint{font-size:11px;color:#6e7681;margin-top:4px;}
    @media(max-width:900px){.editor{grid-template-columns:1fr;}}
  `

  return (
    <>
      <style>{S}</style>
      <div className="editor">
        {/* Main column */}
        <div className="main-col">
          <div className="section">
            <div className="section-title">Post Details</div>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="form-input" value={form.title} onChange={e => {
                set('title', e.target.value)
                if (!initial?.slug) set('slug', slugify(e.target.value))
              }} placeholder="Post title..." />
            </div>
            <div className="form-group">
              <label className="form-label">Slug *</label>
              <input className="form-input" value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="url-friendly-slug" />
              <div className="hint">URL: /blog/{form.slug || 'your-slug'}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Excerpt</label>
              <textarea className="form-textarea" rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Short summary shown in blog listing..." />
              <div className="char-count">{(form.excerpt || '').length}/200</div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">SEO</div>
            <div className="form-group">
              <label className="form-label">Meta Title</label>
              <input className="form-input" value={form.meta_title} onChange={e => set('meta_title', e.target.value)} placeholder="SEO title..." />
              <div className="char-count">{(form.meta_title || '').length}/70</div>
            </div>
            <div className="form-group">
              <label className="form-label">Meta Description</label>
              <textarea className="form-textarea" rows={3} value={form.meta_description} onChange={e => set('meta_description', e.target.value)} placeholder="SEO description..." />
              <div className="char-count">{(form.meta_description || '').length}/160</div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Body Content</div>
            {form.body.map((block, i) => (
              <BlockEditor key={i} block={block} index={i} total={form.body.length}
                onChange={updateBlock} onDelete={deleteBlock} onMove={moveBlock} />
            ))}
            <div style={{marginTop:12}}>
              <div style={{fontSize:12,color:'#8b949e',marginBottom:8}}>Add Block:</div>
              <div className="add-block">
                {BLOCK_TYPES.map(bt => (
                  <button key={bt.value} className="add-btn" onClick={() => addBlock(bt.value)}>
                    {bt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="side-col">
          <div className="section">
            <div className="section-title">Publish</div>
            <div className="save-btns">
              <button className="btn-publish" onClick={() => handleSave('published')} disabled={saving}>
                {saving ? '...' : '🚀 Publish'}
              </button>
              <button className="btn-draft" onClick={() => handleSave('draft')} disabled={saving}>
                💾 Draft
              </button>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Post Settings</div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category Colour</label>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <input type="color" value={form.category_color || '#FF6B2B'} onChange={e => set('category_color', e.target.value)} style={{width:40,height:32,border:'none',background:'none',cursor:'pointer'}} />
                <input className="form-input" value={form.category_color} onChange={e => set('category_color', e.target.value)} style={{flex:1}} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Icon (emoji)</label>
              <input className="form-input" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="📝" style={{fontSize:20}} />
            </div>
            <div className="form-group">
              <label className="form-label">Read Time</label>
              <input className="form-input" value={form.read_time} onChange={e => set('read_time', e.target.value)} placeholder="5 min read" />
            </div>
            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input className="form-input" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="AI, Healthcare, Azure" />
            </div>
            <div className="form-group">
              <label className="form-label">Author</label>
              <select className="form-select" value={form.author_id || ''} onChange={e => set('author_id', e.target.value)}>
                <option value="">Select author</option>
                {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" style={{display:'flex',alignItems:'center',gap:8}}>
                <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
                Featured post
              </label>
            </div>
          </div>

          <div className="section">
            <div className="section-title">OG Image</div>
            {form.og_image_url && (
              <img src={form.og_image_url} alt="OG" className="og-preview" />
            )}
            <input className="form-input" value={form.og_image_url || ''} onChange={e => set('og_image_url', e.target.value)} placeholder="Paste image URL or pick below" style={{marginBottom:10}} />
            <div style={{fontSize:11,color:'#8b949e',marginBottom:8}}>From image library:</div>
            <div className="img-grid">
              {images.slice(0, 9).map(img => (
                <img key={img.id} src={img.url} alt={img.alt} className={`img-thumb ${form.og_image_url === img.url ? 'selected' : ''}`}
                  onClick={() => set('og_image_url', img.url)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
