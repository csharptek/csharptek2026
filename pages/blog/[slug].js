import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/Layout'
import PageSEO from '../../components/PageSEO'
import { track } from '../../lib/analytics'
import { query } from '../../lib/db'

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Mulish',-apple-system,sans-serif;background:#0A1628;color:#fff;overflow-x:hidden;}
  a{text-decoration:none;}
  .in{max-width:1200px;margin:0 auto;padding:0 28px;}
  .narrow{max-width:760px;margin:0 auto;padding:0 28px;}
  .hero{position:relative;padding:120px 0 60px;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 65%,#0A1628 100%);overflow:hidden;}
  .back{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:rgba(255,255,255,.4);margin-bottom:32px;transition:color .2s;}
  .back:hover{color:#FF6B2B;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:20px;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);margin-bottom:20px;}
  .post-icon{font-size:56px;margin-bottom:20px;display:block;}
  .post-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,5vw,52px);font-weight:800;line-height:1.1;letter-spacing:-.03em;margin-bottom:20px;}
  .post-meta{display:flex;align-items:center;gap:20px;font-size:13px;color:rgba(255,255,255,.35);flex-wrap:wrap;}
  .tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:20px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.2);color:#FF6B2B;margin:3px;}
  .body-section{padding:64px 0 60px;}
  .post-intro{font-size:18px;line-height:1.75;color:rgba(255,255,255,.7);margin-bottom:44px;padding:28px 32px;border-left:3px solid #FF6B2B;background:rgba(255,107,43,.04);border-radius:0 12px 12px 0;}
  .post-h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:700;letter-spacing:-.02em;color:#fff;margin:40px 0 16px;}
  .post-p{font-size:16px;line-height:1.78;color:rgba(255,255,255,.55);margin-bottom:20px;}
  .post-cta-box{margin:48px 0;padding:32px;border-radius:16px;background:linear-gradient(135deg,rgba(255,107,43,.1),rgba(255,107,43,.04));border:1px solid rgba(255,107,43,.2);text-align:center;}
  .post-cta-text{font-size:16px;color:rgba(255,255,255,.6);margin-bottom:20px;}
  .post-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#FF6B2B;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;padding:12px 28px;border-radius:10px;transition:all .25s;}
  .post-cta-btn:hover{background:#e55a1f;transform:translateY(-1px);}
  .tags-row{display:flex;flex-wrap:wrap;gap:4px;margin:40px 0;}
  .divider{border:none;border-top:1px solid rgba(255,255,255,.06);margin:60px 0;}
  .author-box{display:flex;align-items:center;gap:16px;padding:24px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;margin:40px 0;}
  .author-avatar{width:52px;height:52px;border-radius:50%;object-fit:cover;background:rgba(255,107,43,.2);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
  .author-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:2px;}
  .author-role{font-size:12px;color:rgba(255,255,255,.4);}

  /* Comments */
  .comments-section{padding:0 0 100px;}
  .comments-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:700;color:#fff;margin-bottom:28px;}
  .comment-item{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:20px;margin-bottom:14px;}
  .comment-header{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
  .comment-avatar{width:32px;height:32px;border-radius:50%;background:rgba(255,107,43,.15);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#FF6B2B;flex-shrink:0;}
  .comment-name{font-size:13px;font-weight:600;color:#fff;}
  .comment-date{font-size:11px;color:rgba(255,255,255,.3);}
  .comment-text{font-size:14px;color:rgba(255,255,255,.55);line-height:1.65;}
  .comment-form{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:28px;margin-top:32px;}
  .comment-form-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:20px;}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
  @media(max-width:580px){.form-row{grid-template-columns:1fr;}}
  .cf-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:11px 14px;font-size:14px;color:#fff;outline:none;transition:border .2s;}
  .cf-input:focus{border-color:#FF6B2B;}
  .cf-input::placeholder{color:rgba(255,255,255,.25);}
  .cf-textarea{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:11px 14px;font-size:14px;color:#fff;outline:none;resize:vertical;min-height:100px;transition:border .2s;margin-bottom:14px;}
  .cf-textarea:focus{border-color:#FF6B2B;}
  .cf-textarea::placeholder{color:rgba(255,255,255,.25);}
  .cf-submit{background:#FF6B2B;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;}
  .cf-submit:hover{background:#e55a1f;}
  .cf-submit:disabled{opacity:.5;cursor:not-allowed;}
  .cf-note{font-size:12px;color:rgba(255,255,255,.3);margin-top:10px;}
  .cf-success{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);border-radius:8px;padding:14px;font-size:14px;color:#4ade80;margin-bottom:16px;}
  .cf-error{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);border-radius:8px;padding:14px;font-size:14px;color:#f87171;margin-bottom:16px;}

  .related-section{padding-bottom:100px;}
  .related-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:28px;}
  .related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}
  .rel-card{border-radius:14px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);padding:22px;transition:all .25s;display:block;}
  .rel-card:hover{background:rgba(255,255,255,.04);border-color:rgba(255,107,43,.25);transform:translateY(-2px);}
  .rel-icon{font-size:22px;margin-bottom:10px;display:block;}
  .rel-cat{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:8px;}
  .rel-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;line-height:1.35;margin-bottom:8px;}
  .rel-meta{font-size:11px;color:rgba(255,255,255,.28);}
  @media(max-width:640px){.hero{padding:100px 0 48px;}.post-intro{padding:20px;font-size:16px;}.post-title{font-size:28px;}.post-h2{font-size:19px;}.post-p{font-size:15px;}}
`

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function buildJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description,
    author: { '@type': 'Person', name: post.author_name || 'CSharpTek Team' },
    publisher: { '@type': 'Organization', name: 'CSharpTek', logo: { '@type': 'ImageObject', url: 'https://www.csharptek.com/logo.png' } },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    url: `https://www.csharptek.com/blog/${post.slug}`,
    ...(post.og_image_url && { image: post.og_image_url }),
    keywords: Array.isArray(post.tags) ? post.tags.join(', ') : ''
  }
}

function BodyBlock({ block }) {
  if (block.type === 'intro') return <div className="post-intro">{block.text}</div>
  if (block.type === 'h2') return <h2 className="post-h2">{block.text}</h2>
  if (block.type === 'p') return <p className="post-p">{block.text}</p>
  if (block.type === 'cta') return (
    <div className="post-cta-box">
      <p className="post-cta-text">{block.text}</p>
      <Link href={block.href} className="post-cta-btn"
        onClick={() => track.ctaClick(block.label, window?.location?.pathname)}>
        {block.label} →
      </Link>
    </div>
  )
  return null
}

function CommentForm({ slug }) {
  const [form, setForm] = useState({ name: '', email: '', comment: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slug })
    })
    const data = await res.json()
    if (res.ok) {
      setStatus('success')
      setForm({ name: '', email: '', comment: '' })
      track.ctaClick('Comment Submitted', `/blog/${slug}`)
    } else {
      setStatus(data.error || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="comment-form">
      <div className="comment-form-title">💬 Leave a Comment</div>
      {status === 'success' && (
        <div className="cf-success">✓ Comment submitted! It will appear after review.</div>
      )}
      {status && status !== 'success' && (
        <div className="cf-error">{status}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input className="cf-input" type="text" placeholder="Your name *" required value={form.name}
            onChange={e => setForm(f => ({...f, name: e.target.value}))} />
          <input className="cf-input" type="email" placeholder="Your email *" required value={form.email}
            onChange={e => setForm(f => ({...f, email: e.target.value}))} />
        </div>
        <textarea className="cf-textarea" placeholder="Your comment *" required value={form.comment}
          onChange={e => setForm(f => ({...f, comment: e.target.value}))} />
        <button className="cf-submit" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Post Comment'}
        </button>
        <div className="cf-note">Comments are reviewed before publishing. Email not shown publicly.</div>
      </form>
    </div>
  )
}

export default function BlogPost({ post, related }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    track.ctaClick(`Blog View: ${post.title}`, `/blog/${post.slug}`)
    fetch(`/api/comments?slug=${post.slug}`)
      .then(r => r.json())
      .then(data => Array.isArray(data) && setComments(data))
  }, [post.slug, post.title])

  const body = typeof post.body === 'string' ? JSON.parse(post.body) : (post.body || [])
  const tags = Array.isArray(post.tags) ? post.tags : []

  return (
    <Layout>
      <style>{S}</style>
      <PageSEO
        title={post.meta_title || post.title}
        description={post.meta_description}
        canonical={`/blog/${post.slug}`}
        jsonLd={buildJsonLd(post)}
      />

      <section className="hero">
        <div style={{position:'absolute',top:-80,right:'8%',width:420,height:420,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,107,43,.07) 0%,transparent 70%)',pointerEvents:'none'}} />
        <div className="narrow">
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
            <Link href="/blog" className="back">← Back to Blog</Link>
            <div><div className="lbl">{post.category} {post.read_time && `· ${post.read_time}`}</div></div>
            <span className="post-icon">{post.icon || '📝'}</span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              {post.published_at && <span>📅 {formatDate(post.published_at)}</span>}
              {post.read_time && <span>⏱ {post.read_time}</span>}
              {post.author_name && <span>✍️ {post.author_name}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="body-section">
        <div className="narrow">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.15}}>
            {body.map((block, i) => <BodyBlock key={i} block={block} />)}
            {tags.length > 0 && (
              <div className="tags-row">{tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
            )}
            {(post.author_name) && (
              <div className="author-box">
                <div className="author-avatar">
                  {post.author_avatar
                    ? <img src={post.author_avatar} alt={post.author_name} style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'}} />
                    : post.author_name[0]
                  }
                </div>
                <div>
                  <div className="author-name">{post.author_name}</div>
                  {post.author_role && <div className="author-role">{post.author_role}</div>}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="comments-section">
        <div className="narrow">
          <div className="comments-title">
            {comments.length > 0 ? `${comments.length} Comment${comments.length > 1 ? 's' : ''}` : 'Comments'}
          </div>
          {comments.map(c => (
            <div key={c.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-avatar">{c.name[0]}</div>
                <div>
                  <div className="comment-name">{c.name}</div>
                  <div className="comment-date">{formatDate(c.created_at)}</div>
                </div>
              </div>
              <div className="comment-text">{c.comment}</div>
            </div>
          ))}
          <CommentForm slug={post.slug} />
        </div>
      </section>

      {related.length > 0 && (
        <section style={{paddingBottom:100}}>
          <div className="in">
            <hr className="divider" />
            <div className="related-title">More from CSharpTek</div>
            <div className="related-grid">
              {related.map((r, i) => (
                <motion.div key={r.slug} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.4,delay:.3+i*0.08}}>
                  <Link href={`/blog/${r.slug}`} className="rel-card"
                    onClick={() => track.ctaClick(`Related Blog: ${r.title}`, `/blog/${post.slug}`)}>
                    <span className="rel-icon">{r.icon || '📝'}</span>
                    <div className="rel-cat">{r.category}</div>
                    <div className="rel-title">{r.title}</div>
                    <div className="rel-meta">{formatDate(r.published_at)} {r.read_time && `· ${r.read_time}`}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const postRes = await query(
      `SELECT p.*, a.name as author_name, a.role as author_role, a.avatar_url as author_avatar
       FROM blog_posts p
       LEFT JOIN blog_authors a ON a.id = p.author_id
       WHERE p.slug = $1 AND p.status = 'published'`,
      [params.slug]
    )
    if (!postRes.rows.length) return { notFound: true }

    const post = postRes.rows[0]
    post.published_at = post.published_at?.toISOString() || null
    post.created_at = post.created_at?.toISOString() || null
    post.updated_at = post.updated_at?.toISOString() || null

    const relatedRes = await query(
      `SELECT slug, title, category, icon, read_time, published_at
       FROM blog_posts
       WHERE status = 'published' AND slug != $1
       ORDER BY published_at DESC LIMIT 3`,
      [params.slug]
    )
    const related = relatedRes.rows.map(r => ({
      ...r,
      published_at: r.published_at?.toISOString() || null
    }))

    return { props: { post, related } }
  } catch (e) {
    console.error(e)
    return { notFound: true }
  }
}
