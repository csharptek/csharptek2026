import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import dynamic from 'next/dynamic'
const ScrollToTop = dynamic(() => import('../../components/ScrollToTop'), { ssr: false })
import { SERVICES_DATA, SERVICES_LIST } from '../../data/services'

const STYLES = `
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Mulish',-apple-system,sans-serif;color:#0A1628;background:#0A1628;overflow-x:hidden;}
  a{text-decoration:none;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}.d4{transition-delay:.28s;}.d5{transition-delay:.35s;}.d6{transition-delay:.42s;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .lbl-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;flex-shrink:0;display:inline-block;}
  .sec-t{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

  /* HERO */
  .sp-hero{position:relative;padding:110px 28px 88px;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%);overflow:hidden;text-align:center;}
  .sp-orb1{position:absolute;top:-100px;left:-150px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);pointer-events:none;animation:orbFloat 9s ease-in-out infinite;}
  .sp-orb2{position:absolute;bottom:-100px;right:-150px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);pointer-events:none;animation:orbFloat 11s ease-in-out infinite reverse;}
  .sp-hero-in{max-width:800px;margin:0 auto;position:relative;z-index:1;}
  .sp-back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.5);font-size:13px;font-weight:600;margin-bottom:28px;transition:color .2s;}
  .sp-back:hover{color:#7EC8E3;}
  .sp-icon{width:76px;height:76px;border-radius:20px;background:linear-gradient(135deg,rgba(21,101,168,.3),rgba(46,158,214,.2));border:1px solid rgba(46,158,214,.25);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 24px;}
  .sp-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(32px,5vw,60px);font-weight:800;line-height:1.08;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .sp-grad{color:#2E9ED6;background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite;}
  .sp-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.6);line-height:1.75;max-width:620px;margin:0 auto 36px;}
  .sp-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:36px;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,43,.38);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);display:inline-block;transition:all .2s;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}
  .sp-tags{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}
  .sp-tag{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:5px 16px;font-size:12px;color:rgba(255,255,255,.55);font-weight:600;}

  /* WHAT WE DO */
  .sp-what{background:#F0F8FF;padding:96px 0;}
  .sp-in{max-width:1200px;margin:0 auto;padding:0 28px;}
  .sp-what-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
  .sp-what-img{background:linear-gradient(135deg,#0D2B45,#1565A8);border-radius:20px;padding:36px;display:flex;flex-direction:column;gap:14px;border:1px solid rgba(46,158,214,.18);}
  .sp-feat{display:flex;align-items:flex-start;gap:14px;background:rgba(255,255,255,.06);border-radius:12px;padding:16px 18px;}
  .sp-feat-ic{width:42px;height:42px;border-radius:10px;background:rgba(46,158,214,.2);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;}
  .sp-feat h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;}
  .sp-feat p{font-size:12px;color:rgba(255,255,255,.5);line-height:1.55;}

  /* PROCESS */
  .sp-process{background:#0A1628;padding:96px 0;}
  .sp-proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:52px;}
  .sp-step{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.1);border-radius:16px;padding:28px 24px;transition:all .3s;position:relative;}
  .sp-step:hover{border-color:rgba(46,158,214,.28);background:rgba(46,158,214,.04);}
  .sp-step-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:42px;font-weight:800;color:rgba(46,158,214,.13);line-height:1;margin-bottom:14px;}
  .sp-step-ic{width:44px;height:44px;border-radius:12px;background:rgba(46,158,214,.12);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px;}
  .sp-step h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:8px;}
  .sp-step p{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;}
  .sp-arrow{position:absolute;top:50%;right:-13px;transform:translateY(-50%);width:26px;height:26px;border-radius:50%;background:#1565A8;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;z-index:1;}

  /* TECH */
  .sp-tech{background:#0D2B45;padding:96px 0;}
  .sp-tech-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px;}
  .sp-tc{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:22px 20px;transition:all .25s;}
  .sp-tc:hover{background:rgba(46,158,214,.08);border-color:rgba(46,158,214,.3);transform:translateY(-3px);}
  .sp-tc-ic{font-size:28px;margin-bottom:12px;}
  .sp-tc h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:6px;}
  .sp-tc p{font-size:12px;color:rgba(255,255,255,.5);line-height:1.6;}
  .sp-tc-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px;}
  .sp-tc-tag{font-size:10px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.1);border-radius:4px;padding:2px 8px;}

  /* INDUSTRIES */
  .sp-inds{background:#F0F8FF;padding:96px 0;}
  .sp-ind-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px;}
  .sp-ic{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:14px;padding:24px 20px;transition:all .3s;}
  .sp-ic:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(21,101,168,.1);border-color:rgba(46,158,214,.3);}
  .sp-ic-em{font-size:28px;margin-bottom:12px;}
  .sp-ic h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#0A1628;margin-bottom:7px;}
  .sp-ic p{font-size:13px;color:rgba(10,22,40,.55);line-height:1.6;}

  /* CASE STUDY */
  .sp-case{background:#0A1628;padding:96px 0;}
  .sp-case-in{max-width:1000px;margin:0 auto;padding:0 28px;}
  .sp-case-card{background:linear-gradient(135deg,#0D2B45,#1565A8);border:1px solid rgba(46,158,214,.2);border-radius:20px;padding:48px;display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;}
  .sp-case-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(255,107,43,.15);border:1px solid rgba(255,107,43,.3);border-radius:100px;padding:5px 14px;font-size:10px;font-weight:700;color:#FF6B2B;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;}
  .sp-case-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:800;color:#fff;margin-bottom:14px;line-height:1.25;}
  .sp-case-d{font-size:15px;color:rgba(255,255,255,.6);line-height:1.72;margin-bottom:22px;}
  .sp-case-stk{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:26px;}
  .sp-case-tk{font-size:11px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.12);border-radius:5px;padding:3px 10px;}
  .sp-metrics{display:flex;flex-direction:column;gap:16px;}
  .sp-metric{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.06);border-radius:12px;padding:16px 18px;}
  .sp-metric-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;color:#FF6B2B;min-width:70px;line-height:1;}
  .sp-metric-l{font-size:13px;color:rgba(255,255,255,.6);}

  /* PRICING */
  .sp-price{background:#F0F8FF;padding:96px 0;}
  .sp-price-in{max-width:960px;margin:0 auto;padding:0 28px;}
  .sp-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:0;background:#fff;border:1.5px solid rgba(21,101,168,.12);border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(21,101,168,.08);}
  .sp-tier{padding:34px 28px;border-right:1px solid rgba(21,101,168,.1);}
  .sp-tier:last-child{border-right:none;}
  .sp-tier.hl{background:linear-gradient(135deg,#0D2B45,#1565A8);border-right-color:rgba(46,158,214,.2);}
  .sp-tier-badge{display:inline-block;font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;margin-bottom:14px;letter-spacing:.06em;text-transform:uppercase;}
  .sp-tier-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;margin-bottom:8px;}
  .sp-tier-desc{font-size:13px;line-height:1.6;margin-bottom:22px;}
  .sp-tier-feats{display:flex;flex-direction:column;gap:10px;}
  .sp-tier-feat{display:flex;align-items:flex-start;gap:8px;font-size:13px;}
  .sp-tier-feat-dot{color:#FF6B2B;font-size:12px;flex-shrink:0;margin-top:1px;}

  /* RELATED */
  .sp-rel{background:#0D2B45;padding:88px 0;}
  .sp-rel-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .sp-rc{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:26px 22px;transition:all .3s;display:block;}
  .sp-rc:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.06);transform:translateY(-4px);}
  .sp-rc-ic{font-size:28px;margin-bottom:12px;}
  .sp-rc h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:7px;}
  .sp-rc p{font-size:13px;color:rgba(255,255,255,.5);line-height:1.6;margin-bottom:16px;}
  .sp-rc-lnk{font-size:13px;font-weight:700;color:#FF6B2B;display:inline-flex;align-items:center;gap:5px;transition:gap .2s;}
  .sp-rc:hover .sp-rc-lnk{gap:9px;}

  /* BOTTOM CTA */
  .sp-cta{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;}
  .sp-cta-in{max-width:640px;margin:0 auto;}
  .sp-cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4.5vw,50px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .sp-cta-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}
  .sp-cta-acts{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}

  @media(max-width:960px){.sp-what-grid,.sp-case-card{grid-template-columns:1fr!important;gap:36px!important;}}
  @media(max-width:860px){.sp-proc-grid{grid-template-columns:repeat(2,1fr)!important;}.sp-arrow{display:none!important;}}
  @media(max-width:720px){.sp-tech-grid,.sp-ind-grid,.sp-rel-grid{grid-template-columns:repeat(2,1fr)!important;}.sp-tiers{grid-template-columns:1fr!important;}.sp-tier:not(:last-child){border-right:none!important;border-bottom:1px solid rgba(21,101,168,.12)!important;}.sp-tier.hl{border-bottom-color:rgba(46,158,214,.2)!important;}}
  @media(max-width:520px){.sp-proc-grid,.sp-tech-grid,.sp-ind-grid,.sp-rel-grid{grid-template-columns:1fr!important;}.sp-ctas,.sp-cta-acts{flex-direction:column!important;align-items:center!important;}}
`

export async function getStaticPaths() {
  const paths = Object.keys(SERVICES_DATA).map(slug => ({ params: { slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const service = SERVICES_DATA[params.slug] || null
  if (!service) return { notFound: true }
  const idx = SERVICES_LIST.findIndex(s => s.slug === params.slug)
  const prev = idx > 0 ? SERVICES_LIST[idx - 1] : null
  const next = idx < SERVICES_LIST.length - 1 ? SERVICES_LIST[idx + 1] : null
  return { props: { service, slug: params.slug, prev, next, allServices: SERVICES_LIST } }
}

export default function ServicePage({ service, slug, prev, next, allServices }) {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') })
    }, { threshold: 0.07 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const TIERS = [
    { key:'spark',   name:'🚀 Spark',    badge:'Starter',     hl:false, badgeBg:'rgba(46,158,214,.1)',    badgeCol:'#1565A8', nameCol:'#0A1628', descCol:'rgba(10,22,40,.6)',   desc:'Perfect for MVPs, pilots and proof-of-concepts. Fast delivery, core features.' },
    { key:'scale',   name:'⚡ Scale',    badge:'Most Popular', hl:true,  badgeBg:'rgba(255,107,43,.15)',  badgeCol:'#FF6B2B', nameCol:'#fff',     descCol:'rgba(255,255,255,.65)',desc:'Full-featured build with advanced AI, cloud deployment and integrations.' },
    { key:'enterprise', name:'🏢 Enterprise', badge:'Custom',  hl:false, badgeBg:'rgba(126,200,227,.1)', badgeCol:'#7EC8E3', nameCol:'#0A1628', descCol:'rgba(10,22,40,.6)',   desc:'Dedicated team, SLA-backed support, compliance-ready and fully bespoke.' },
  ]

  return (
    <Layout>
      <Head>
        <title>{service.title} — CSharpTek</title>
        <meta name="description" content={service.metaDesc} />
</Head>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── HERO ── */}
      <section className="sp-hero">
        <div className="sp-orb1" /><div className="sp-orb2" />
        <div className="sp-hero-in">
          <Link href="/services" className="sp-back rv">← All Services</Link>
          <div className="sp-icon rv">{service.icon}</div>
          <div className="lbl rv" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>{service.category}</div>
          <h1 className="sp-title rv">{service.headline}<br/><span className="sp-grad">{service.headlineAccent}</span></h1>
          <p className="sp-sub rv">{service.subline}</p>
          <div className="sp-ctas rv">
            <Link href="/contact" className="btn-p">Start a Project →</Link>
            <Link href="/portfolio" className="btn-s">View Case Studies</Link>
          </div>
          <div className="sp-tags rv">
            {service.topTags.map(t => <span key={t} className="sp-tag">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="sp-what">
        <div className="sp-in">
          <div className="sp-what-grid">
            <div className="rv">
              <div className="lbl" style={{color:'#1565A8'}}><span className="lbl-dot"/>What We Do</div>
              <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#0A1628',marginBottom:16}}>{service.whatTitle}</h2>
              <p style={{fontSize:16,color:'rgba(10,22,40,.58)',lineHeight:1.78,marginBottom:26}}>{service.whatDesc}</p>
              <ul style={{display:'flex',flexDirection:'column',gap:11}}>
                {service.whatPoints.map(pt => (
                  <li key={pt} style={{display:'flex',alignItems:'flex-start',gap:10,fontSize:14,color:'#0A1628',fontWeight:500}}>
                    <span style={{color:'#FF6B2B',fontSize:16,flexShrink:0,marginTop:1}}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sp-what-img rv d2">
              {service.whatFeatures.map(f => (
                <div key={f.title} className="sp-feat">
                  <div className="sp-feat-ic">{f.icon}</div>
                  <div><h4>{f.title}</h4><p>{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sp-process">
        <div className="sp-in">
          <div className="rv" style={{textAlign:'center'}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>How We Work</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Our Proven Process</h2>
            <p style={{fontSize:16,color:'rgba(255,255,255,.5)',maxWidth:500,margin:'0 auto'}}>A clear, transparent process from first conversation to live deployment.</p>
          </div>
          <div className="sp-proc-grid">
            {service.process.map((step, i) => (
              <div key={step.title} className={`sp-step rv d${i+1}`}>
                <div className="sp-step-n">0{i+1}</div>
                <div className="sp-step-ic">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < service.process.length - 1 && <div className="sp-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="sp-tech">
        <div className="sp-in">
          <div className="rv" style={{textAlign:'center'}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Tech Stack</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Technologies We Use</h2>
            <p style={{fontSize:16,color:'rgba(255,255,255,.5)',maxWidth:500,margin:'0 auto'}}>Best-in-class tools chosen for reliability, scalability and AI-readiness.</p>
          </div>
          <div className="sp-tech-grid">
            {service.techStack.map((t, i) => (
              <div key={t.name} className={`sp-tc rv d${(i%6)+1}`}>
                <div className="sp-tc-ic">{t.icon}</div>
                <h4>{t.name}</h4>
                <p>{t.desc}</p>
                <div className="sp-tc-tags">{t.tags.map(tg => <span key={tg} className="sp-tc-tag">{tg}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY USE CASES ── */}
      <section className="sp-inds">
        <div className="sp-in">
          <div className="rv" style={{textAlign:'center'}}>
            <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="lbl-dot"/>Industry Use Cases</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#0A1628',marginBottom:14}}>Built for Your Sector</h2>
            <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:500,margin:'0 auto'}}>We adapt our approach to the specific needs, compliance requirements and workflows of your industry.</p>
          </div>
          <div className="sp-ind-grid">
            {service.industries.map((ind, i) => (
              <div key={ind.name} className={`sp-ic rv d${(i%6)+1}`}>
                <div className="sp-ic-em">{ind.icon}</div>
                <h4>{ind.name}</h4>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="sp-case">
        <div className="sp-case-in">
          <div className="rv" style={{textAlign:'center',marginBottom:44}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Case Study</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Real Project. Real Results.</h2>
          </div>
          <div className="sp-case-card rv">
            <div>
              <div className="sp-case-tag">📁 {service.caseStudy.industry}</div>
              <h3 className="sp-case-t">{service.caseStudy.title}</h3>
              <p className="sp-case-d">{service.caseStudy.desc}</p>
              <div className="sp-case-stk">
                {service.caseStudy.stack.map(s => <span key={s} className="sp-case-tk">{s}</span>)}
              </div>
              <Link href="/portfolio" className="btn-p" style={{display:'inline-block'}}>View Full Case Study →</Link>
            </div>
            <div className="sp-metrics">
              {service.caseStudy.metrics.map(m => (
                <div key={m.label} className="sp-metric">
                  <div className="sp-metric-n">{m.value}</div>
                  <div className="sp-metric-l">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="sp-price">
        <div className="sp-price-in">
          <div className="rv" style={{textAlign:'center',marginBottom:44}}>
            <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="lbl-dot"/>Engagement Model</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#0A1628',marginBottom:14}}>Choose Your Package</h2>
            <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:500,margin:'0 auto'}}>Flexible engagement options for startups, growing businesses and enterprise organisations. All packages include a free scoping consultation.</p>
          </div>
          <div className="sp-tiers rv">
            {TIERS.map(tier => (
              <div key={tier.key} className={`sp-tier${tier.hl?' hl':''}`}>
                <span className="sp-tier-badge" style={{background:tier.badgeBg,color:tier.badgeCol}}>{tier.badge}</span>
                <div className="sp-tier-name" style={{color:tier.nameCol}}>{tier.name}</div>
                <p className="sp-tier-desc" style={{color:tier.descCol}}>{tier.desc}</p>
                <div className="sp-tier-feats">
                  {(service.pricingTiers[tier.key]||[]).map(f => (
                    <div key={f} className="sp-tier-feat">
                      <span className="sp-tier-feat-dot">✓</span>
                      <span style={{fontSize:13,color:tier.hl?'rgba(255,255,255,.75)':'rgba(10,22,40,.65)'}}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rv" style={{textAlign:'center',marginTop:32}}>
            <Link href="/contact" className="btn-p" style={{display:'inline-block'}}>Get a Free Quote →</Link>
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="sp-rel">
        <div className="sp-in">
          <div className="rv" style={{textAlign:'center'}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Related Services</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Often Paired Together</h2>
          </div>
          <div className="sp-rel-grid">
            {service.related.map((r, i) => (
              <Link key={r.title} href={r.href} className={`sp-rc rv d${i+1}`}>
                <div className="sp-rc-ic">{r.icon}</div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
                <span className="sp-rc-lnk">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="sp-cta">
        <div className="sp-cta-in rv">
          <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Ready to Start?</div>
          <h2 className="sp-cta-t">Let&apos;s Build Your<br/><span style={{color:'#FF6B2B'}}>{service.ctaAccent}</span></h2>
          <p className="sp-cta-s">{service.ctaDesc}</p>
          <div className="sp-cta-acts">
            <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
            <Link href="/portfolio" className="btn-s">See Our Work</Link>
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES STRIP ── */}
      <section style={{background:'#060f1d',padding:'52px 0',borderTop:'1px solid rgba(46,158,214,.08)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28,flexWrap:'wrap',gap:12}}>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,.35)',letterSpacing:'.12em',textTransform:'uppercase',marginBottom:5}}>Explore Our Services</div>
              <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:20,fontWeight:800,color:'#fff'}}>More From CSharpTek</h3>
            </div>
            <Link href="/services#services" style={{fontSize:13,fontWeight:700,color:'#FF6B2B',display:'inline-flex',alignItems:'center',gap:6}}>View All Services →</Link>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {allServices.filter(s => s.slug !== slug).slice(0,6).map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`}
                style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',background:'rgba(255,255,255,.03)',border:`1px solid ${s.slug===slug?'rgba(255,107,43,.4)':'rgba(46,158,214,.08)'}`,borderRadius:12,transition:'all .2s',textDecoration:'none'}}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(46,158,214,.08)';e.currentTarget.style.borderColor='rgba(46,158,214,.25)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.03)';e.currentTarget.style.borderColor='rgba(46,158,214,.08)'}}>
                <span style={{fontSize:22,flexShrink:0}}>{s.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'#fff',lineHeight:1.3}}>{s.title}</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,.35)',marginTop:2}}>{s.tags.join(' · ')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT NAV ── */}
      <nav style={{background:'#0A1628',borderTop:'1px solid rgba(46,158,214,.1)',padding:'28px 0'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
          {prev ? (
            <Link href={`/services/${prev.slug}`}
              style={{display:'flex',alignItems:'center',gap:12,padding:'14px 20px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(46,158,214,.1)',borderRadius:12,flex:'0 1 320px',transition:'all .2s',textDecoration:'none'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(46,158,214,.3)';e.currentTarget.style.background='rgba(46,158,214,.06)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(46,158,214,.1)';e.currentTarget.style.background='rgba(255,255,255,.03)'}}>
              <span style={{fontSize:22,color:'rgba(255,255,255,.5)'}}>←</span>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,.35)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:3}}>Previous</div>
                <div style={{fontSize:14,fontWeight:700,color:'#fff',display:'flex',alignItems:'center',gap:7}}><span>{prev.icon}</span>{prev.title}</div>
              </div>
            </Link>
          ) : <div/>}

          <Link href="/services#services"
            style={{display:'flex',alignItems:'center',gap:6,padding:'12px 20px',background:'rgba(255,107,43,.1)',border:'1px solid rgba(255,107,43,.25)',borderRadius:10,fontSize:13,fontWeight:700,color:'#FF6B2B',whiteSpace:'nowrap',transition:'all .2s',textDecoration:'none'}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,107,43,.2)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,107,43,.1)'}}>
            ⊞ All Services
          </Link>

          {next ? (
            <Link href={`/services/${next.slug}`}
              style={{display:'flex',alignItems:'center',gap:12,padding:'14px 20px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(46,158,214,.1)',borderRadius:12,flex:'0 1 320px',justifyContent:'flex-end',transition:'all .2s',textDecoration:'none'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(46,158,214,.3)';e.currentTarget.style.background='rgba(46,158,214,.06)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(46,158,214,.1)';e.currentTarget.style.background='rgba(255,255,255,.03)'}}>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,.35)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:3}}>Next</div>
                <div style={{fontSize:14,fontWeight:700,color:'#fff',display:'flex',alignItems:'center',gap:7,justifyContent:'flex-end'}}>{next.title}<span>{next.icon}</span></div>
              </div>
              <span style={{fontSize:22,color:'rgba(255,255,255,.5)'}}>→</span>
            </Link>
          ) : <div/>}
        </div>
      </nav>
      <ScrollToTop />
    </Layout>
  )
}
