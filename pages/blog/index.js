import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
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
  .hero{position:relative;padding:130px 0 80px;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#0A1628 100%);overflow:hidden;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:16px;}
  .ldot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;}
  .hero-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(40px,6vw,68px);font-weight:800;line-height:1.08;letter-spacing:-.03em;margin-bottom:20px;}
  .hero-sub{font-size:17px;color:rgba(255,255,255,.5);max-width:560px;line-height:1.7;}
  .grid-section{padding:80px 0 120px;}
  .featured{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-bottom:48px;}
  @media(max-width:800px){.featured{grid-template-columns:1fr;}}
  .card-feat{position:relative;border-radius:20px;background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);padding:36px;transition:transform .3s ease,border-color .3s ease;cursor:pointer;overflow:hidden;display:block;}
  .card-feat:hover{transform:translateY(-4px);border-color:rgba(255,107,43,.3);}
  .card-feat::before{content:'';position:absolute;inset:0;border-radius:20px;background:radial-gradient(ellipse at top left,rgba(255,107,43,.06) 0%,transparent 60%);opacity:0;transition:opacity .3s;}
  .card-feat:hover::before{opacity:1;}
  .card-icon{font-size:36px;margin-bottom:16px;display:block;}
  .card-cat{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:20px;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);margin-bottom:16px;}
  .card-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:700;line-height:1.3;letter-spacing:-.02em;color:#fff;margin-bottom:12px;}
  .card-excerpt{font-size:14px;color:rgba(255,255,255,.45);line-height:1.7;margin-bottom:20px;}
  .card-meta{display:flex;align-items:center;gap:16px;font-size:12px;color:rgba(255,255,255,.3);}
  .card-arrow{position:absolute;top:28px;right:28px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .25s;}
  .card-feat:hover .card-arrow{background:#FF6B2B;border-color:#FF6B2B;transform:translate(2px,-2px);}
  .list-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;}
  .card-sm{position:relative;border-radius:16px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);padding:24px;transition:all .25s;cursor:pointer;display:block;}
  .card-sm:hover{background:rgba(255,255,255,.04);border-color:rgba(255,107,43,.25);transform:translateY(-2px);}
  .card-sm .card-title{font-size:16px;margin-bottom:8px;}
  .card-sm .card-excerpt{font-size:13px;margin-bottom:14px;}
  .card-sm .card-icon{font-size:24px;margin-bottom:12px;}
  .section-label{font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:24px;}
  .divider{border:none;border-top:1px solid rgba(255,255,255,.06);margin:48px 0;}
  .empty{text-align:center;padding:80px 24px;color:rgba(255,255,255,.3);}
  .empty-icon{font-size:48px;margin-bottom:16px;}
  .empty-text{font-size:16px;}
  @media(max-width:640px){.card-feat{padding:24px;}.card-title{font-size:18px;}.hero{padding:110px 0 60px;}}
`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'CSharpTek Blog',
  description: 'AI engineering insights, healthcare tech, and software development expertise from the CSharpTek team.',
  url: 'https://www.csharptek.com/blog',
  publisher: { '@type': 'Organization', name: 'CSharpTek', url: 'https://www.csharptek.com' }
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function BlogCard({ post, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={featured ? 'card-feat' : 'card-sm'}
      onClick={() => track.ctaClick(`Blog: ${post.title}`, '/blog')}
    >
      {featured && <div className="card-arrow">→</div>}
      <span className="card-icon">{post.icon || '📝'}</span>
      <div className="card-cat">{post.category}</div>
      <div className="card-title">{post.title}</div>
      <div className="card-excerpt">{post.excerpt}</div>
      <div className="card-meta">
        <span>📅 {formatDate(post.published_at)}</span>
        {post.read_time && <span>⏱ {post.read_time}</span>}
      </div>
    </Link>
  )
}

export default function BlogIndex({ posts }) {
  const featured = posts.slice(0, 2)
  const rest = posts.slice(2)

  return (
    <Layout>
      <style>{S}</style>
      <PageSEO
        title="Blog — AI Engineering & Healthcare Tech Insights"
        description="Deep dives into AI medical scribes, RAG pipelines, HIPAA compliance, voice agents, and building software for regulated industries. From the CSharpTek engineering team."
        canonical="/blog"
        jsonLd={jsonLd}
      />

      <section className="hero">
        <div style={{position:'absolute',top:-60,right:'10%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,107,43,.07) 0%,transparent 70%)',pointerEvents:'none'}} />
        <div className="in">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
            <div className="lbl"><span className="ldot" />Insights & Engineering</div>
            <h1 className="hero-title">The CSharpTek<br /><span style={{color:'#FF6B2B'}}>Blog</span></h1>
            <p className="hero-sub">AI engineering deep dives, healthcare tech, and practical lessons from shipping 300+ products across regulated industries.</p>
          </motion.div>
        </div>
      </section>

      <section className="grid-section">
        <div className="in">
          {posts.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📝</div>
              <div className="empty-text">Posts coming soon.</div>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <>
                  <div className="section-label">Featured Posts</div>
                  <div className="featured">
                    {featured.map((post, i) => (
                      <motion.div key={post.slug} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:i*0.1}}>
                        <BlogCard post={post} featured />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
              {rest.length > 0 && (
                <>
                  <hr className="divider" />
                  <div className="section-label">All Posts</div>
                  <div className="list-grid">
                    {rest.map((post, i) => (
                      <motion.div key={post.slug} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.4,delay:0.2+i*0.07}}>
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const result = await query(
      `SELECT p.id, p.slug, p.title, p.excerpt, p.category, p.category_color,
              p.read_time, p.icon, p.og_image_url, p.featured, p.published_at
       FROM blog_posts p
       WHERE p.status = 'published'
       ORDER BY p.featured DESC, p.published_at DESC`,
      []
    )
    const posts = result.rows.map(p => ({
      ...p,
      published_at: p.published_at?.toISOString() || null,
    }))
    return { props: { posts } }
  } catch {
    return { props: { posts: [] } }
  }
}
