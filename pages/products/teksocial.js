import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'

const FEATURES = [
  { icon:'✍️', title:'AI Content Generation', desc:'Generate platform-optimised posts for LinkedIn, Instagram, Twitter/X and Facebook in seconds.' },
  { icon:'🎨', title:'AI Image Creation', desc:'Generate stunning visuals for every post using AI — branded, on-topic and ready to publish.' },
  { icon:'🎬', title:'AI Video Generation', desc:'Turn scripts or prompts into short-form videos for Reels, TikTok and LinkedIn — automatically.' },
  { icon:'📅', title:'Content Scheduler', desc:'Schedule posts across all platforms from one calendar. Set it and forget it.' },
  { icon:'🔁', title:'Bulk Content Creation', desc:'Generate a week or month of content in one session — across all platforms simultaneously.' },
  { icon:'📊', title:'Analytics & Insights', desc:'Track engagement, reach and performance across platforms in a unified dashboard.' },
  { icon:'🎯', title:'Brand Voice Control', desc:'Train TekSocial on your tone, style and industry — every post sounds like you.' },
  { icon:'🌐', title:'Multi-Account Management', desc:'Manage multiple brands, clients or locations from a single workspace.' },
]

const PLATFORMS = [
  { icon:'💼', name:'LinkedIn', color:'#0A66C2' },
  { icon:'📸', name:'Instagram', color:'#E1306C' },
  { icon:'🐦', name:'Twitter / X', color:'#1DA1F2' },
  { icon:'📘', name:'Facebook', color:'#1877F2' },
]

const USE_CASES = [
  { icon:'🏢', label:'Marketing Agencies', desc:'Manage 10+ client accounts, generate content at scale, never miss a post.' },
  { icon:'🏥', label:'Healthcare Brands', desc:'HIPAA-aware content generation for clinics, hospitals and health-tech companies.' },
  { icon:'🛍️', label:'E-Commerce Brands', desc:'Product launches, promotions and seasonal campaigns — automated.' },
  { icon:'🎓', label:'EdTech Platforms', desc:'Thought leadership and course promotion content across all platforms.' },
  { icon:'🏠', label:'Real Estate Agencies', desc:'Listing promotions, market updates and brand building at scale.' },
  { icon:'🚀', label:'Startups & Founders', desc:'Build a strong social presence without a dedicated content team.' },
]

const STATS = [
  { v:'4', l:'Platforms supported' },
  { v:'10x', l:'Faster content creation' },
  { v:'∞', l:'Content variations' },
  { v:'1', l:'Dashboard for all' },
]

export default function TekSocial() {
  return (
    <Layout>
      <Head>
        <title>TekSocial — AI Social Media Content Generator & Scheduler | CSharpTek</title>
        <meta name="description" content="TekSocial generates AI-powered social media posts, images and videos for LinkedIn, Instagram, Twitter and Facebook — then schedules them automatically." />
      </Head>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Mulish', sans-serif; }

        .hero {
          background: linear-gradient(155deg,#120A28 0%,#1a0a30 60%,#0a0820 100%);
          padding: 100px 28px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .hero::before {
          content:''; position:absolute; top:-20%; left:-10%; width:600px; height:600px;
          background:radial-gradient(circle,rgba(255,107,43,.12) 0%,transparent 70%);
          border-radius:50%; pointer-events:none;
        }
        .hero::after {
          content:''; position:absolute; bottom:-10%; right:-10%; width:500px; height:500px;
          background:radial-gradient(circle,rgba(150,100,255,.1) 0%,transparent 70%);
          border-radius:50%; pointer-events:none;
        }
        .hero-inner { max-width:800px; margin:0 auto; position:relative; z-index:2; }
        .product-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,107,43,.12); border:1px solid rgba(255,107,43,.3);
          border-radius:20px; padding:6px 16px; font-size:12px; font-weight:700;
          color:#FF6B2B; letter-spacing:.06em; text-transform:uppercase; margin-bottom:24px;
        }
        .hero h1 {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(38px,6vw,68px);
          font-weight:800; color:#fff; line-height:1.1; margin-bottom:12px;
        }
        .hero h1 span {
          background:linear-gradient(135deg,#FF6B2B,#ff9a5c);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .hero-sub { font-size:clamp(16px,2vw,20px); color:rgba(255,255,255,.6); line-height:1.6; max-width:600px; margin:0 auto 36px; }
        .hero-tags { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-bottom:36px; }
        .hero-tag { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:5px 14px; font-size:12px; font-weight:600; color:rgba(255,255,255,.65); }
        .hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
        .btn-primary { background:#FF6B2B; color:#fff; padding:14px 32px; border-radius:10px; font-size:15px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all .2s; }
        .btn-primary:hover { background:#e55a1f; transform:translateY(-2px); box-shadow:0 8px 28px rgba(255,107,43,.35); }
        .btn-ghost { border:2px solid rgba(255,107,43,.35); color:#FF6B2B; padding:14px 32px; border-radius:10px; font-size:15px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all .2s; }
        .btn-ghost:hover { border-color:#FF6B2B; color:#fff; background:rgba(255,107,43,.1); }

        .platforms-bar { background:#0f0a1f; border-top:1px solid rgba(255,107,43,.1); border-bottom:1px solid rgba(255,107,43,.1); padding:24px 28px; }
        .platforms-inner { max-width:700px; margin:0 auto; display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; }
        .plat-label { font-size:12px; color:rgba(255,255,255,.35); font-weight:600; margin-right:8px; }
        .plat-pill { display:inline-flex; align-items:center; gap:7px; padding:8px 16px; border-radius:20px; font-size:13px; font-weight:700; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.75); }

        .stats-bar { background:#0f0a1f; padding:32px 28px; border-bottom:1px solid rgba(255,107,43,.08); }
        .stats-inner { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .stat-item { text-align:center; padding:0 20px; border-right:1px solid rgba(255,107,43,.12); }
        .stat-item:last-child { border-right:none; }
        .stat-v { font-family:'Plus Jakarta Sans',sans-serif; font-size:36px; font-weight:800; color:#FF6B2B; }
        .stat-l { font-size:13px; color:rgba(255,255,255,.45); font-weight:600; margin-top:4px; }

        .section { padding:80px 28px; }
        .section-dark { background:#08060f; }
        .section-mid { background:#0f0a1f; }
        .sec-inner { max-width:1100px; margin:0 auto; }
        .sec-label { display:inline-flex; align-items:center; gap:7px; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#FF6B2B; margin-bottom:12px; }
        .sec-label-dot { width:6px; height:6px; border-radius:50%; background:#FF6B2B; display:inline-block; }
        .sec-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(26px,3.5vw,40px); font-weight:800; color:#fff; margin-bottom:14px; }
        .sec-sub { font-size:16px; color:rgba(255,255,255,.45); max-width:560px; }

        .feat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:48px; }
        .feat-card {
          background:rgba(255,255,255,.03); border:1px solid rgba(255,107,43,.1);
          border-radius:14px; padding:24px 20px; transition:all .2s;
        }
        .feat-card:hover { border-color:rgba(255,107,43,.35); background:rgba(255,107,43,.05); transform:translateY(-3px); }
        .feat-icon { font-size:28px; margin-bottom:14px; }
        .feat-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:800; color:#fff; margin-bottom:8px; }
        .feat-desc { font-size:13px; color:rgba(255,255,255,.45); line-height:1.6; }

        .uc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:48px; }
        .uc-card {
          background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07);
          border-radius:14px; padding:24px 20px; transition:all .2s;
        }
        .uc-card:hover { border-color:rgba(255,107,43,.3); background:rgba(255,107,43,.05); }
        .uc-icon { font-size:28px; margin-bottom:12px; }
        .uc-label { font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:800; color:#fff; margin-bottom:6px; }
        .uc-desc { font-size:13px; color:rgba(255,255,255,.45); line-height:1.6; }

        .cta-sec {
          background:linear-gradient(135deg,#1a0828,#FF6B2B33,#1a0828);
          padding:80px 28px; text-align:center;
          border-top:1px solid rgba(255,107,43,.2);
        }
        .cta-inner { max-width:700px; margin:0 auto; }
        .cta-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(28px,4vw,44px); font-weight:800; color:#fff; margin-bottom:14px; }
        .cta-sub { font-size:17px; color:rgba(255,255,255,.6); margin-bottom:36px; }

        .built-by {
          background:rgba(255,255,255,.04); border:1px solid rgba(255,107,43,.12);
          border-radius:14px; padding:20px 24px; margin-top:48px;
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px;
        }
        .built-by-text { font-size:13px; color:rgba(255,255,255,.45); }
        .built-by-text strong { color:#FF6B2B; }

        @media(max-width:900px) {
          .feat-grid { grid-template-columns:repeat(2,1fr); }
          .uc-grid { grid-template-columns:repeat(2,1fr); }
          .stats-inner { grid-template-columns:repeat(2,1fr); }
          .stat-item { border-right:none; border-bottom:1px solid rgba(255,107,43,.1); padding:16px 0; }
          .stat-item:last-child { border-bottom:none; }
        }
        @media(max-width:580px) {
          .feat-grid, .uc-grid { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="product-badge">✨ TekSocial · AI Content Platform</div>
          <h1>Social Content<br/><span>On Autopilot</span></h1>
          <p className="hero-sub">Generate posts, images and videos for LinkedIn, Instagram, Twitter/X and Facebook — then schedule them automatically. One platform, all channels.</p>
          <div className="hero-tags">
            {['AI Post Generation','AI Image Creation','AI Video Generation','Auto-Scheduler','Multi-Platform','Brand Voice'].map(t=>(
              <span key={t} className="hero-tag">{t}</span>
            ))}
          </div>
          <div className="hero-btns">
            <a href="https://teksocial.csharptek.com" target="_blank" rel="noopener noreferrer" className="btn-primary">Visit TekSocial →</a>
            <Link href="/contact" className="btn-ghost">Book a Demo</Link>
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <div className="platforms-bar">
        <div className="platforms-inner">
          <span className="plat-label">Works with:</span>
          {PLATFORMS.map(p=>(
            <span key={p.name} className="plat-pill">{p.icon} {p.name}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats-bar">
        <div className="stats-inner">
          {STATS.map(s=>(
            <div key={s.l} className="stat-item">
              <div className="stat-v">{s.v}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="section section-mid">
        <div className="sec-inner">
          <div className="sec-label"><span className="sec-label-dot"/>Everything TekSocial Does</div>
          <h2 className="sec-title">From Idea to Published Post<br/>in Minutes</h2>
          <p className="sec-sub">AI generates the copy, the image, the video — then posts it for you.</p>
          <div className="feat-grid">
            {FEATURES.map(f=>(
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="section section-dark">
        <div className="sec-inner">
          <div className="sec-label"><span className="sec-label-dot"/>Who Uses TekSocial</div>
          <h2 className="sec-title">Built for Teams Who Need<br/>Content, Fast</h2>
          <p className="sec-sub">From solo founders to marketing agencies managing 20+ clients.</p>
          <div className="uc-grid">
            {USE_CASES.map(u=>(
              <div key={u.label} className="uc-card">
                <div className="uc-icon">{u.icon}</div>
                <div className="uc-label">{u.label}</div>
                <div className="uc-desc">{u.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec">
        <div className="cta-inner">
          <div style={{fontSize:40,marginBottom:16}}>✨</div>
          <h2 className="cta-title">Start Creating Content with AI</h2>
          <p className="cta-sub">Visit TekSocial and generate your first week of social content in under 10 minutes.</p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://teksocial.csharptek.com" target="_blank" rel="noopener noreferrer" className="btn-primary">Visit TekSocial →</a>
            <Link href="/contact" className="btn-ghost">Talk to Us</Link>
          </div>
          <div className="built-by">
            <span className="built-by-text">Built by <strong>CSharpTek</strong> — AI-first software development since 2016</span>
            <div style={{display:'flex',gap:10}}>
              <Link href="/services/ai-integration" style={{fontSize:12,fontWeight:700,color:'#FF6B2B',textDecoration:'none'}}>AI Integration →</Link>
              <Link href="/products/tekdial" style={{fontSize:12,fontWeight:700,color:'#FF6B2B',textDecoration:'none'}}>TekDial →</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
