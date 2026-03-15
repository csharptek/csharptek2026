import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), { ssr: false })

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Mulish',-apple-system,sans-serif;color:#0A1628;background:#0A1628;overflow-x:hidden;}
  a{text-decoration:none;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}
  .d4{transition-delay:.28s;}.d5{transition-delay:.35s;}.d6{transition-delay:.42s;}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .ldot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;flex-shrink:0;}
  .sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  .in{max-width:1200px;margin:0 auto;padding:0 28px;}

  /* HERO */
  .hero{position:relative;padding:120px 28px 96px;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%);overflow:hidden;text-align:center;}
  .orb{position:absolute;border-radius:50%;pointer-events:none;}
  .hi{max-width:800px;margin:0 auto;position:relative;z-index:1;}
  .eye{display:inline-flex;align-items:center;gap:8px;background:rgba(46,158,214,.07);border:1px solid rgba(46,158,214,.2);border-radius:100px;padding:7px 18px;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#7EC8E3;margin-bottom:24px;}
  .h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,5.5vw,64px);font-weight:800;line-height:1.08;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .grad{color:#2E9ED6;background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite;}
  .hero-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.6);line-height:1.78;max-width:660px;margin:0 auto 36px;}
  .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,43,.38);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);display:inline-block;transition:all .2s;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}

  /* STATS BAR */
  .stats-bar{display:flex;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.14);border-radius:18px;margin-top:50px;width:100%;max-width:800px;overflow:hidden;}
  .stat-it{flex:1;display:flex;flex-direction:column;align-items:center;padding:26px 16px;gap:7px;border-right:1px solid rgba(46,158,214,.1);}
  .stat-it:last-child{border-right:none;}
  .stat-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(26px,3.5vw,42px);font-weight:800;color:#FF6B2B;line-height:1;}
  .stat-l{font-size:11px;color:rgba(255,255,255,.42);text-transform:uppercase;letter-spacing:.1em;font-weight:700;text-align:center;}

  /* STORY */
  .story{background:#F0F8FF;padding:96px 0;}
  .story-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
  .story-timeline{display:flex;flex-direction:column;gap:0;}
  .tl-item{display:flex;gap:20px;padding-bottom:32px;position:relative;}
  .tl-item:not(:last-child)::after{content:'';position:absolute;left:19px;top:40px;bottom:0;width:2px;background:linear-gradient(to bottom,#1565A8,rgba(21,101,168,.1));}
  .tl-dot{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#1565A8,#2E9ED6);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;font-weight:800;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 14px rgba(21,101,168,.35);}
  .tl-body{}
  .tl-year{font-size:11px;font-weight:700;color:#1565A8;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;}
  .tl-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#0A1628;margin-bottom:5px;}
  .tl-d{font-size:13px;color:rgba(10,22,40,.55);line-height:1.65;}

  /* MISSION / VALUES */
  .values{background:#0A1628;padding:96px 0;}
  .vals-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:52px;}
  .val-card{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.1);border-radius:16px;padding:30px 26px;transition:all .3s;}
  .val-card:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.06);transform:translateY(-4px);}
  .val-ic{font-size:32px;margin-bottom:16px;}
  .val-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:700;color:#fff;margin-bottom:9px;}
  .val-d{font-size:14px;color:rgba(255,255,255,.52);line-height:1.7;}

  /* LEADERSHIP */
  .leadership{background:#F0F8FF;padding:96px 0;}
  .ceo-wrap{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;margin-bottom:72px;}
  .ceo-card{background:linear-gradient(135deg,#0D2B45,#1565A8);border-radius:20px;overflow:hidden;position:relative;}
  .ceo-img-wrap{height:340px;display:flex;align-items:flex-end;justify-content:center;background:linear-gradient(to bottom,rgba(21,101,168,.2),rgba(10,22,40,.9));position:relative;}
  .ceo-avatar{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#1565A8,#2E9ED6);display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;font-size:40px;font-weight:800;color:#fff;margin-bottom:24px;border:4px solid rgba(255,255,255,.2);box-shadow:0 8px 32px rgba(0,0,0,.3);}
  .ceo-info{padding:28px 32px;}
  .ceo-role-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(255,107,43,.15);border:1px solid rgba(255,107,43,.3);border-radius:100px;padding:4px 12px;font-size:10px;font-weight:700;color:#FF6B2B;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px;}
  .ceo-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;color:#fff;margin-bottom:4px;}
  .ceo-title{font-size:14px;color:rgba(255,255,255,.6);margin-bottom:20px;font-weight:600;}
  .ceo-bio{font-size:14px;color:rgba(255,255,255,.55);line-height:1.78;}
  .ceo-socials{display:flex;gap:10px;margin-top:20px;}
  .social-btn{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .2s;}
  .social-btn:hover{background:rgba(46,158,214,.2);border-color:rgba(46,158,214,.4);}

  .ceo-right{}
  .ceo-right-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(24px,3vw,36px);font-weight:800;color:#0A1628;margin-bottom:16px;line-height:1.2;}
  .ceo-right-sub{font-size:16px;color:rgba(10,22,40,.6);line-height:1.78;margin-bottom:28px;}
  .ceo-right-quote{background:linear-gradient(135deg,#0D2B45,#1565A8);border-radius:14px;padding:24px 26px;margin-bottom:28px;border-left:4px solid #FF6B2B;}
  .quote-text{font-size:16px;color:rgba(255,255,255,.8);line-height:1.7;font-style:italic;margin-bottom:12px;}
  .quote-sig{font-size:13px;color:rgba(255,255,255,.45);font-weight:600;}
  .ceo-badges{display:flex;flex-wrap:wrap;gap:10px;}
  .ceo-badge{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#F0F8FF;border:1px solid rgba(21,101,168,.15);border-radius:9px;}
  .ceo-badge span:first-child{font-size:16px;}
  .ceo-badge span:last-child{font-size:12px;font-weight:700;color:#1565A8;}

  .team-section-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#0A1628;margin-bottom:28px;display:flex;align-items:center;gap:12px;}
  .team-section-title::after{content:'';flex:1;height:2px;background:linear-gradient(to right,rgba(21,101,168,.2),transparent);}
  .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
  .team-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:16px;overflow:hidden;transition:all .3s;}
  .team-card:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(21,101,168,.12);border-color:rgba(46,158,214,.3);}
  .tc-top{height:140px;display:flex;align-items:center;justify-content:center;}
  .tc-av{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:26px;color:#fff;border:3px solid rgba(255,255,255,.3);}
  .tc-body{padding:18px 16px;}
  .tc-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#0A1628;margin-bottom:4px;}
  .tc-role{font-size:12px;color:#1565A8;font-weight:700;letter-spacing:.03em;margin-bottom:8px;}
  .tc-bio{font-size:12px;color:rgba(10,22,40,.5);line-height:1.6;margin-bottom:12px;}
  .tc-socials{display:flex;gap:7px;}
  .tc-social{width:28px;height:28px;border-radius:6px;background:rgba(21,101,168,.06);border:1px solid rgba(21,101,168,.1);display:flex;align-items:center;justify-content:center;font-size:12px;transition:all .2s;}
  .tc-social:hover{background:rgba(21,101,168,.12);border-color:rgba(21,101,168,.25);}

  /* OFFICES */
  .offices{background:#0D2B45;padding:88px 0;}
  .off-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:52px;}
  .off-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.12);border-radius:16px;padding:28px 24px;transition:all .3s;}
  .off-card:hover{border-color:rgba(46,158,214,.28);background:rgba(46,158,214,.06);}
  .off-flag{font-size:32px;margin-bottom:14px;}
  .off-city{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#fff;margin-bottom:4px;}
  .off-country{font-size:12px;font-weight:700;color:#7EC8E3;letter-spacing:.06em;text-transform:uppercase;margin-bottom:14px;}
  .off-addr{font-size:13px;color:rgba(255,255,255,.5);line-height:1.7;}
  .off-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.2);border-radius:100px;padding:4px 12px;font-size:10px;font-weight:700;color:#FF6B2B;margin-top:14px;}

  /* PARTNERS */
  .partners{background:#0A1628;padding:96px 0;}
  .part-intro{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;margin-bottom:64px;}
  .part-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
  .part-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.08);border-radius:14px;padding:28px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;transition:all .3s;gap:14px;}
  .part-card:hover{border-color:rgba(46,158,214,.25);background:rgba(46,158,214,.07);transform:translateY(-3px);}
  .part-logo{font-size:36px;}
  .part-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;color:#fff;}
  .part-type{font-size:11px;font-weight:700;color:rgba(255,255,255,.35);letter-spacing:.06em;text-transform:uppercase;}
  .part-desc{font-size:12px;color:rgba(255,255,255,.45);line-height:1.6;}
  .part-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.22);border-radius:100px;padding:3px 10px;font-size:10px;font-weight:700;color:#FF6B2B;}

  /* WHY JOIN */
  .join{background:#F0F8FF;padding:88px 0;}
  .join-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .join-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .join-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(21,101,168,.1);border-color:rgba(46,158,214,.25);}
  .join-ic{font-size:28px;margin-bottom:14px;}
  .join-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#0A1628;margin-bottom:8px;}
  .join-d{font-size:13px;color:rgba(10,22,40,.55);line-height:1.65;}

  /* CTA */
  .cta-sec{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;}
  .cta-in{max-width:640px;margin:0 auto;}
  .cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4.5vw,50px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .cta-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}

  @media(max-width:1024px){.story-grid,.ceo-wrap,.part-intro{grid-template-columns:1fr!important;gap:44px!important;}}
  @media(max-width:900px){.vals-grid,.team-grid,.part-grid,.off-grid,.join-grid{grid-template-columns:repeat(2,1fr)!important;}}
  @media(max-width:560px){.vals-grid,.team-grid,.part-grid,.off-grid,.join-grid,.hero-ctas{grid-template-columns:1fr!important;flex-direction:column;align-items:center;}}
  @media(max-width:580px){.stats-bar{flex-direction:column;}.stat-it{border-right:none!important;border-bottom:1px solid rgba(46,158,214,.1)!important;}.stat-it:last-child{border-bottom:none!important;}}
`

const TEAM = [
  { name:'Mukesh Barik',    role:'Product Manager',             bio:'Drives product vision and delivery across all client engagements. Expert in agile methodology and sprint management.',        initials:'MB', bg:'linear-gradient(135deg,#1565A8,#2E9ED6)' },
  { name:'Nippu Kumar',     role:'Solutions Architect',         bio:'Designs cloud and AI architectures for enterprise clients. Azure certified with deep .NET and DevOps expertise.',             initials:'NK', bg:'linear-gradient(135deg,#0f6e56,#2E9ED6)' },
  { name:'Ashwika Agarwal', role:'Head of Human Resources',     bio:'Leads talent acquisition, culture building and employee experience. Champions our people-first philosophy.',                 initials:'AA', bg:'linear-gradient(135deg,#7a5a0a,#c4970a)' },
  { name:'Manjika Tantia',  role:'Strategic Partner Manager',   bio:'Manages our Microsoft, AWS and Google Cloud partnerships. Drives co-sell and marketplace listing strategy.',                  initials:'MT', bg:'linear-gradient(135deg,#6b2fa0,#9b5fd0)' },
]

const PARTNERS = [
  { logo:'🔷', name:'Microsoft',     type:'Solutions Partner',    desc:'Microsoft Solutions Partner for Digital & App Innovation on Azure. Co-sell eligible across Azure Marketplace.',              badge:'Premier Partner' },
  { logo:'🟠', name:'AWS',           type:'Network Partner',      desc:'AWS Partner Network member. ISV solutions published on AWS Marketplace for global enterprise reach.',                        badge:'Marketplace Listed' },
  { logo:'🔵', name:'Google Cloud',  type:'Technology Partner',   desc:'Google Cloud technology partner. GKE and Cloud Run deployments with Marketplace listing capabilities.',                      badge:'Marketplace Listed' },
  { logo:'🤖', name:'OpenAI',        type:'API Partner',          desc:'OpenAI API partner building production AI integrations. Early access to new models and enterprise support.',                  badge:'API Partner' },
  { logo:'⚡', name:'Anthropic',     type:'Claude Partner',       desc:'Building with Claude for safety-critical AI applications including healthcare and compliance-sensitive workflows.',           badge:'Claude Builder' },
  { logo:'🏢', name:'NASSCOM',       type:'Industry Member',      desc:'Member of NASSCOM, India\'s premier IT industry association. Recognised as a credible technology services provider.',        badge:'Member' },
  { logo:'🔐', name:'Acronis',       type:'Technology Partner',   desc:'Authorised Acronis partner for backup, disaster recovery and cybersecurity solutions.',                                       badge:'Authorised Reseller' },
  { logo:'📊', name:'IAMCP',        type:'Community Member',     desc:'Member of the International Association of Microsoft Channel Partners. Part of a global network of Microsoft-focused firms.', badge:'Member' },
]

const VALUES = [
  { ic:'🧠', t:'AI-First Thinking',    d:'We design every solution with AI at the centre — not as a feature, but as the foundation. Every client engagement starts with asking how AI can create real advantage.' },
  { ic:'🏗️', t:'Engineering Excellence', d:'We take pride in clean code, robust architecture and thorough testing. Quality is non-negotiable — every deployment is production-grade from day one.' },
  { ic:'🤝', t:'Client Partnership',    d:'We don\'t just build software and disappear. We invest in understanding your business and become a long-term partner in your success.' },
  { ic:'🔒', t:'Compliance by Default', d:'Security, HIPAA compliance and data protection aren\'t afterthoughts. They\'re built into every architecture we design, especially in healthcare and regulated industries.' },
  { ic:'⚡', t:'Shipping Fast',         d:'Using AI-assisted development and our vibe coding approach, we move faster than any traditional agency — without sacrificing quality or reliability.' },
  { ic:'🌍', t:'Global & Inclusive',    d:'Our team spans India, UAE and beyond. Diverse perspectives make us better engineers, better communicators and better partners for global clients.' },
]

const TIMELINE = [
  { year:'2016', t:'Founded in Ranchi',        d:'CSharpTek was founded with 4 people and a vision to build world-class software from India. First client: a UK-based logistics company.' },
  { year:'2018', t:'Microsoft Partnership',    d:'Became a Microsoft Cloud Partner, unlocking enterprise-grade Azure capabilities and opening doors to global enterprise clients.' },
  { year:'2020', t:'Cloud & DevOps Focus',     d:'Pivoted to deep Azure specialisation. Built our first HIPAA-compliant healthcare platform — a turning point for our industry focus.' },
  { year:'2022', t:'AI Integration Pioneer',   d:'Started building AI-powered products before it was mainstream. Medical scribe AI, intelligent document processing and voice agents.' },
  { year:'2023', t:'Marketplace Publishing',   d:'Published on Azure, AWS and Google Cloud Marketplaces. Now reaching millions of enterprise buyers through established cloud channels.' },
  { year:'2025', t:'AI-First Transformation',  d:'Fully pivoted to AI-first software development. Launched vibe coding practice. Team of 20+ across India and UAE. 50+ projects delivered.' },
]

export default function AboutPage() {
  const statsRef = useRef(null)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }) }, { threshold: 0.07 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true) }, { threshold: 0.3 })
    o.observe(statsRef.current)
    return () => o.disconnect()
  }, [])

  function useCount(target, start) {
    const [v, setV] = useState(0)
    useEffect(() => {
      if (!start) return
      let st = null
      const s = ts => { if (!st) st = ts; const p = Math.min((ts - st) / 1600, 1); setV(Math.floor((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(s) }
      requestAnimationFrame(s)
    }, [target, start])
    return v
  }

  const Stats = () => {
    const y = useCount(10, go), p = useCount(50, go), i = useCount(7, go), c = useCount(3, go)
    return (
      <div ref={statsRef} className="stats-bar rv" style={{ margin: '50px auto 0', display: 'flex', maxWidth: 800, width: '100%' }}>
        {[[y + '+', 'Years Experience'], [p + '+', 'Projects Delivered'], [i, 'Industries Served'], [c, 'Cloud Marketplaces']].map(([n, l]) => (
          <div key={l} className="stat-it"><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
        ))}
      </div>
    )
  }

  return (
    <Layout>
      <Head>
        <title>About Us — CSharpTek AI-First Software Development</title>
        <meta name="description" content="CSharpTek is an AI-first software development company founded in 2016. Learn about our story, leadership team, values and global partnerships with Microsoft, AWS and Google Cloud." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: S }} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="orb" style={{ top: -100, left: -150, width: 500, height: 500, background: 'radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%)', animation: 'orbFloat 9s ease-in-out infinite' }} />
        <div className="orb" style={{ bottom: -100, right: -150, width: 500, height: 500, background: 'radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%)', animation: 'orbFloat 11s ease-in-out infinite reverse' }} />
        <div className="hi" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="eye rv"><span className="ldot" />Our Story</div>
          <h1 className="h1 rv">Building the Future.<br /><span className="grad">One Deployment at a Time.</span></h1>
          <p className="hero-sub rv">Founded in 2016 in Ranchi, India with 4 people and a big ambition — CSharpTek has grown into an AI-first software company trusted by healthcare providers, EdTech startups and enterprise clients across the UK, UAE and India.</p>
          <div className="hero-ctas rv">
            <Link href="/contact" className="btn-p">Work With Us →</Link>
            <Link href="/portfolio" className="btn-s">View Our Work</Link>
          </div>
          <Stats />
        </div>
      </section>

      {/* ── COMPANY STORY ── */}
      <section className="story">
        <div className="in">
          <div className="story-grid">
            <div className="rv">
              <div className="lbl" style={{ color: '#1565A8' }}><span className="ldot" />Our Journey</div>
              <h2 className="sec-t" style={{ fontSize: 'clamp(28px,3.5vw,44px)', color: '#0A1628', marginBottom: 16 }}>From 4 People to<br />AI-First Pioneers</h2>
              <p style={{ fontSize: 16, color: 'rgba(10,22,40,.58)', lineHeight: 1.78, marginBottom: 24 }}>We started as a cloud and .NET development shop. Over nine years, we evolved with the technology — from Azure migration specialists to a team that ships AI medical scribes, voice agents and intelligent marketplaces.</p>
              <p style={{ fontSize: 16, color: 'rgba(10,22,40,.58)', lineHeight: 1.78, marginBottom: 28 }}>Today we operate across Ranchi, Dubai and remote-first — serving clients who need software that is fast, compliant, AI-ready and built to last.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {['Microsoft Solutions Partner', 'NASSCOM Member', 'HIPAA Certified Builds', 'Azure Marketplace Published'].map(b => (
                  <span key={b} style={{ background: 'rgba(21,101,168,.07)', border: '1px solid rgba(21,101,168,.15)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: '#1565A8' }}>{b}</span>
                ))}
              </div>
            </div>
            <div className="story-timeline rv d2">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="tl-item">
                  <div className="tl-dot">{t.year.slice(2)}</div>
                  <div className="tl-body">
                    <div className="tl-year">{t.year}</div>
                    <div className="tl-t">{t.t}</div>
                    <div className="tl-d">{t.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VALUES ── */}
      <section className="values">
        <div className="in">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="ldot" />What We Stand For</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(28px,3.5vw,44px)', color: '#fff', marginBottom: 14 }}>Our Values</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 520, margin: '0 auto' }}>The principles that guide every project, every hire and every client interaction.</p>
          </div>
          <div className="vals-grid">
            {VALUES.map((v, i) => (
              <div key={v.t} className={`val-card rv d${(i % 6) + 1}`}>
                <div className="val-ic">{v.ic}</div>
                <div className="val-t">{v.t}</div>
                <div className="val-d">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP — CEO FEATURED ── */}
      <section className="leadership">
        <div className="in">
          <div className="rv" style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="lbl" style={{ color: '#1565A8', justifyContent: 'center' }}><span className="ldot" />The People Behind the Work</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(28px,3.5vw,44px)', color: '#0A1628', marginBottom: 14 }}>Our Leadership Team</h2>
            <p style={{ fontSize: 16, color: 'rgba(10,22,40,.5)', maxWidth: 500, margin: '0 auto' }}>Experienced engineers, product thinkers and client champions — united by a shared passion for AI-first technology.</p>
          </div>

          {/* CEO Featured */}
          <div className="ceo-wrap rv">
            <div className="ceo-card">
              <div className="ceo-img-wrap">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 28 }}>
                  <div className="ceo-avatar">BG</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Bhanu Gupta</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>Chief Executive Officer</div>
                  </div>
                </div>
              </div>
              <div className="ceo-info">
                <div className="ceo-socials">
                  <a href="#" className="social-btn">💼</a>
                  <a href="#" className="social-btn">🐦</a>
                  <a href="mailto:info@csharptek.com" className="social-btn">✉️</a>
                </div>
              </div>
            </div>

            <div className="ceo-right rv d2">
              <div className="ceo-role-tag">👤 Founder & CEO</div>
              <h3 className="ceo-right-title">Bhanu Gupta — Leading with Vision and Integrity</h3>
              <p className="ceo-right-sub">Bhanu Gupta founded CSharpTek in 2016 with a clear vision: to build world-class AI and cloud software from India, for the world. With deep expertise in Azure, enterprise software and AI product development, Bhanu has led the company through its transformation from a .NET development shop to an AI-first software powerhouse.</p>
              <div className="ceo-right-quote">
                <p className="quote-text">"We started with four people and a belief that great technology should be accessible to every business, not just those with Fortune 500 budgets. Nine years later, that belief still drives every decision we make."</p>
                <div className="quote-sig">— Bhanu Gupta, Founder & CEO</div>
              </div>
              <div className="ceo-badges">
                {['Microsoft Solutions Partner', '10+ Years Leadership', 'Azure Expert', 'AI Product Builder', '50+ Projects Delivered'].map(b => (
                  <div key={b} className="ceo-badge">
                    <span>✓</span><span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rest of team */}
          <div className="team-section-title rv">Core Team</div>
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <div key={t.name} className={`team-card rv d${i + 1}`}>
                <div className="tc-top" style={{ background: `${t.bg.replace('linear-gradient', 'linear-gradient').split(')')[0]})22` }}>
                  <div className="tc-av" style={{ background: t.bg }}>{t.initials}</div>
                </div>
                <div className="tc-body">
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-role">{t.role}</div>
                  <div className="tc-bio">{t.bio}</div>
                  <div className="tc-socials">
                    <a href="#" className="tc-social">💼</a>
                    <a href="#" className="tc-social">✉️</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICES ── */}
      <section className="offices">
        <div className="in">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="ldot" />Where We Are</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Global Presence</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 480, margin: '0 auto' }}>Headquartered in India with a presence in the UAE — and serving clients across the UK, US, Europe and beyond.</p>
          </div>
          <div className="off-grid">
            {[
              { flag: '🇮🇳', city: 'Ranchi', country: 'India (HQ)', addr: 'Mandaliya Nagar, Behind CN Honda, Bariatu, Ranchi, Jharkhand — 834009', badge: '🏠 Headquarters', phone: '+91-9334646668' },
              { flag: '🇦🇪', city: 'Dubai', country: 'United Arab Emirates', addr: 'Business Center-1, M Floor, The Meydan Hotel, Nad Al Sheba, Dubai, UAE', badge: '🌍 Middle East Office', phone: 'Available on request' },
              { flag: '🌐', city: 'Remote-First', country: 'Worldwide', addr: 'We work with clients across the UK, US, Europe, India and the Middle East — fully remote-capable with async communication.', badge: '⚡ 24/7 Coverage' },
            ].map((o, i) => (
              <div key={o.city} className={`off-card rv d${i + 1}`}>
                <div className="off-flag">{o.flag}</div>
                <div className="off-city">{o.city}</div>
                <div className="off-country">{o.country}</div>
                <div className="off-addr">{o.addr}</div>
                {o.phone && <div style={{ fontSize: 13, color: '#7EC8E3', fontWeight: 600, marginTop: 10 }}>{o.phone}</div>}
                <div className="off-badge">{o.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="partners">
        <div className="in">
          <div className="part-intro rv">
            <div>
              <div className="lbl" style={{ color: '#7EC8E3' }}><span className="ldot" />Technology Partners</div>
              <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 16 }}>Built on Best-in-Class Partnerships</h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,.55)', lineHeight: 1.78 }}>Our partner ecosystem gives you the best of every platform — enterprise licensing, co-sell access, technical support and marketplace distribution across Azure, AWS and Google Cloud.</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg,#0D2B45,#1565A8)', border: '1px solid rgba(46,158,214,.2)', borderRadius: 18, padding: '28px 26px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7EC8E3', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Partner Highlights</div>
              {[
                '✓ Microsoft Solutions Partner — Digital & App Innovation',
                '✓ Published on all 3 major cloud marketplaces',
                '✓ NASSCOM member since 2018',
                '✓ OpenAI & Anthropic API partner',
                '✓ IAMCP global member network',
              ].map(p => (
                <div key={p} style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 8 }}>{p}</div>
              ))}
            </div>
          </div>
          <div className="part-grid">
            {PARTNERS.map((p, i) => (
              <div key={p.name} className={`part-card rv d${(i % 4) + 1}`}>
                <div className="part-logo">{p.logo}</div>
                <div>
                  <div className="part-name">{p.name}</div>
                  <div className="part-type">{p.type}</div>
                </div>
                <div className="part-desc">{p.desc}</div>
                <div className="part-badge">⭐ {p.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JOIN US ── */}
      <section className="join">
        <div className="in">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#1565A8', justifyContent: 'center' }}><span className="ldot" />Careers</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#0A1628', marginBottom: 14 }}>Why Join CSharpTek?</h2>
            <p style={{ fontSize: 16, color: 'rgba(10,22,40,.5)', maxWidth: 480, margin: '0 auto' }}>We&apos;re a small team doing big things. If you love building AI-first software and working with great clients — we want to hear from you.</p>
          </div>
          <div className="join-grid">
            {[
              { ic: '🧠', t: 'Work on Real AI', d: 'Not AI demos — production AI products used by real hospitals, clinics and businesses. Meaningful, challenging work.' },
              { ic: '🚀', t: 'Ship Fast', d: 'Vibe coding, lean processes, no corporate bureaucracy. You\'ll ship real features every week.' },
              { ic: '🌍', t: 'Remote-Friendly', d: 'Headquarters in Ranchi with remote options. Work from India, UAE or anywhere you do your best work.' },
              { ic: '📈', t: 'Grow Fast', d: 'We\'re a growing team. Early joiners take on real responsibility and grow with the company.' },
              { ic: '🤝', t: 'Great Clients', d: 'We work with healthcare providers, EdTech startups and enterprise businesses — interesting problems, real impact.' },
              { ic: '⚡', t: 'Cutting Edge Stack', d: 'Claude, GPT-4, Azure, Cursor, Lovable — we use the best tools available. You\'ll never be bored.' },
            ].map((j, i) => (
              <div key={j.t} className={`join-card rv d${(i % 6) + 1}`}>
                <div className="join-ic">{j.ic}</div>
                <div className="join-t">{j.t}</div>
                <div className="join-d">{j.d}</div>
              </div>
            ))}
          </div>
          <div className="rv" style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/careers" className="btn-p" style={{ display: 'inline-block' }}>View Open Positions →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec">
        <div className="cta-in rv">
          <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="ldot" />Let&apos;s Talk</div>
          <h2 className="cta-t">Ready to Build Something<br /><span style={{ color: '#FF6B2B' }}>Extraordinary?</span></h2>
          <p className="cta-s">Whether you&apos;re a startup validating an idea or an enterprise scaling AI — we&apos;d love to be your technology partner.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
            <Link href="/services" className="btn-s">View Our Services</Link>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </Layout>
  )
}
