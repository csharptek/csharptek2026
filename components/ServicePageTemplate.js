import Head from 'next/head'
import Link from 'next/link'
import Layout from './Layout'
import { useEffect, useRef, useState } from 'react'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Mulish',-apple-system,sans-serif;color:#0A1628;background:#0A1628;overflow-x:hidden;}
  a{text-decoration:none;}
  .rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease;}
  .rv.on{opacity:1;transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}.d4{transition-delay:.28s;}.d5{transition-delay:.35s;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .lbl-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;flex-shrink:0;display:inline-block;}
  .sec-t{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

  /* ── HERO ── */
  .sp-hero{position:relative;padding:120px 28px 96px;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%);overflow:hidden;text-align:center;}
  .sp-orb1{position:absolute;top:-100px;left:-150px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);pointer-events:none;animation:orbFloat 9s ease-in-out infinite;}
  .sp-orb2{position:absolute;bottom:-100px;right:-150px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);pointer-events:none;animation:orbFloat 11s ease-in-out infinite reverse;}
  .sp-hero-inner{max-width:800px;margin:0 auto;position:relative;z-index:1;}
  .sp-back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.5);font-size:13px;font-weight:600;margin-bottom:28px;transition:color .2s;}
  .sp-back:hover{color:#7EC8E3;}
  .sp-icon{width:72px;height:72px;border-radius:20px;background:linear-gradient(135deg,rgba(21,101,168,.3),rgba(46,158,214,.2));border:1px solid rgba(46,158,214,.25);display:flex;align-items:center;justify-content:center;font-size:34px;margin:0 auto 24px;}
  .sp-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(32px,5vw,58px);font-weight:800;line-height:1.08;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .sp-grad{background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3.5s linear infinite;}
  .sp-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.6);line-height:1.75;max-width:620px;margin:0 auto 36px;}
  .sp-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:40px;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,43,.38);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);display:inline-block;transition:all .2s;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}
  .sp-tags{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}
  .sp-tag{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:5px 16px;font-size:12px;color:rgba(255,255,255,.55);font-weight:600;}

  /* ── WHAT WE DO ── */
  .sp-what{background:#F0F8FF;padding:96px 0;}
  .sp-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .sp-what-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
  .sp-what-img{background:linear-gradient(135deg,#0D2B45,#1565A8);border-radius:20px;padding:40px;display:flex;flex-direction:column;gap:16px;border:1px solid rgba(46,158,214,.18);}
  .sp-what-feat{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.05);border-radius:12px;padding:16px 18px;}
  .sp-what-feat-ic{width:40px;height:40px;border-radius:10px;background:rgba(46,158,214,.2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
  .sp-what-feat h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;}
  .sp-what-feat p{font-size:12px;color:rgba(255,255,255,.5);line-height:1.5;}

  /* ── PROCESS ── */
  .sp-process{background:#0A1628;padding:96px 0;}
  .sp-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:52px;}
  .sp-step{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.1);border-radius:16px;padding:28px 24px;position:relative;transition:all .3s;}
  .sp-step:hover{border-color:rgba(46,158,214,.28);background:rgba(46,158,214,.04);}
  .sp-step-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:42px;font-weight:800;color:rgba(46,158,214,.15);line-height:1;margin-bottom:16px;}
  .sp-step-ic{width:44px;height:44px;border-radius:12px;background:rgba(46,158,214,.12);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px;}
  .sp-step h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:8px;}
  .sp-step p{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;}
  .sp-step-arrow{position:absolute;top:50%;right:-12px;transform:translateY(-50%);width:24px;height:24px;border-radius:50%;background:#1565A8;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;z-index:1;}

  /* ── TECH ── */
  .sp-tech{background:#0D2B45;padding:96px 0;}
  .sp-tech-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px;}
  .sp-tech-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:22px 20px;transition:all .25s;}
  .sp-tech-card:hover{background:rgba(46,158,214,.08);border-color:rgba(46,158,214,.3);transform:translateY(-3px);}
  .sp-tech-card-ic{font-size:28px;margin-bottom:12px;}
  .sp-tech-card h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:6px;}
  .sp-tech-card p{font-size:12px;color:rgba(255,255,255,.5);line-height:1.6;}
  .sp-tech-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px;}
  .sp-tech-tag{font-size:10px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.1);border-radius:4px;padding:2px 8px;}

  /* ── INDUSTRIES ── */
  .sp-inds{background:#F0F8FF;padding:96px 0;}
  .sp-inds-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px;}
  .sp-ind-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:14px;padding:24px 20px;transition:all .3s;}
  .sp-ind-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(21,101,168,.1);border-color:rgba(46,158,214,.3);}
  .sp-ind-ic{font-size:28px;margin-bottom:12px;}
  .sp-ind-card h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#0A1628;margin-bottom:7px;}
  .sp-ind-card p{font-size:13px;color:rgba(10,22,40,.55);line-height:1.6;}

  /* ── CASE STUDY ── */
  .sp-case{background:#0A1628;padding:96px 0;}
  .sp-case-inner{max-width:1000px;margin:0 auto;padding:0 28px;}
  .sp-case-card{background:linear-gradient(135deg,#0D2B45,#1565A8);border:1px solid rgba(46,158,214,.2);border-radius:20px;padding:48px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
  .sp-case-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(255,107,43,.15);border:1px solid rgba(255,107,43,.3);border-radius:100px;padding:5px 14px;font-size:10px;font-weight:700;color:#FF6B2B;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;}
  .sp-case-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:800;color:#fff;margin-bottom:14px;line-height:1.25;}
  .sp-case-desc{font-size:15px;color:rgba(255,255,255,.6);line-height:1.72;margin-bottom:24px;}
  .sp-case-metrics{display:flex;flex-direction:column;gap:14px;}
  .sp-case-metric{display:flex;align-items:center;gap:12px;}
  .sp-case-metric-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:800;color:#FF6B2B;min-width:80px;}
  .sp-case-metric-l{font-size:13px;color:rgba(255,255,255,.55);}

  /* ── PRICING TIER ── */
  .sp-price{background:#F0F8FF;padding:96px 0;}
  .sp-price-inner{max-width:900px;margin:0 auto;padding:0 28px;}
  .sp-price-card{background:#fff;border:2px solid rgba(21,101,168,.15);border-radius:20px;padding:40px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;overflow:hidden;box-shadow:0 8px 40px rgba(21,101,168,.08);}
  .sp-tier{padding:32px 28px;position:relative;}
  .sp-tier:not(:last-child){border-right:1px solid rgba(21,101,168,.1);}
  .sp-tier.highlight{background:linear-gradient(135deg,#0D2B45,#1565A8);border-radius:0;}
  .sp-tier-badge{display:inline-block;font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;margin-bottom:14px;letter-spacing:.06em;text-transform:uppercase;}
  .sp-tier-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;margin-bottom:8px;}
  .sp-tier-desc{font-size:13px;line-height:1.6;margin-bottom:20px;}
  .sp-tier-feats{display:flex;flex-direction:column;gap:9px;}
  .sp-tier-feat{display:flex;align-items:flex-start;gap:8px;font-size:13px;}
  .sp-tier-feat-ic{color:#FF6B2B;font-size:12px;flex-shrink:0;margin-top:1px;}

  /* ── RELATED ── */
  .sp-related{background:#0D2B45;padding:96px 0;}
  .sp-related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .sp-rel-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .sp-rel-card:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.06);transform:translateY(-4px);}
  .sp-rel-ic{font-size:28px;margin-bottom:12px;}
  .sp-rel-card h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:7px;}
  .sp-rel-card p{font-size:13px;color:rgba(255,255,255,.5);line-height:1.6;margin-bottom:16px;}
  .sp-rel-link{font-size:13px;font-weight:700;color:#FF6B2B;display:inline-flex;align-items:center;gap:5px;transition:gap .2s;}
  .sp-rel-link:hover{gap:9px;}

  /* ── CTA ── */
  .sp-cta{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;}
  .sp-cta-inner{max-width:640px;margin:0 auto;}
  .sp-cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4vw,48px);font-weight:800;color:#fff;margin-bottom:16px;line-height:1.1;}
  .sp-cta-s{font-size:17px;color:rgba(255,255,255,.56);line-height:1.7;margin-bottom:36px;}
  .sp-cta-acts{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}

  @media(max-width:900px){
    .sp-what-grid,.sp-case-card{grid-template-columns:1fr!important;gap:36px!important;}
    .sp-process-grid{grid-template-columns:repeat(2,1fr)!important;}
    .sp-tech-grid,.sp-inds-grid,.sp-related-grid{grid-template-columns:repeat(2,1fr)!important;}
    .sp-price-card{grid-template-columns:1fr!important;}
    .sp-tier:not(:last-child){border-right:none!important;border-bottom:1px solid rgba(21,101,168,.1)!important;}
    .sp-step-arrow{display:none!important;}
  }
  @media(max-width:580px){
    .sp-process-grid,.sp-tech-grid,.sp-inds-grid,.sp-related-grid{grid-template-columns:1fr!important;}
    .sp-ctas,.sp-cta-acts{flex-direction:column!important;align-items:center!important;}
  }
`

export default function ServicePageTemplate({ service }) {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <Layout>
      <Head>
        <title>{service.title} — CSharpTek</title>
        <meta name="description" content={service.metaDesc} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── HERO ── */}
      <section className="sp-hero">
        <div className="sp-orb1" /><div className="sp-orb2" />
        <div className="sp-hero-inner">
          <Link href="/services" className="sp-back">← All Services</Link>
          <div className="sp-icon">{service.icon}</div>
          <div className="lbl rv" style={{ color: '#7EC8E3', justifyContent: 'center' }}>
            <span className="lbl-dot" />{service.category}
          </div>
          <h1 className="sp-title rv">{service.headline}<br /><span className="sp-grad">{service.headlineAccent}</span></h1>
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
        <div className="sp-inner">
          <div className="sp-what-grid">
            <div className="rv">
              <div className="lbl" style={{ color: '#1565A8' }}><span className="lbl-dot" />What We Do</div>
              <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#0A1628', marginBottom: 16 }}>{service.whatTitle}</h2>
              <p style={{ fontSize: 16, color: 'rgba(10,22,40,.58)', lineHeight: 1.78, marginBottom: 28 }}>{service.whatDesc}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {service.whatPoints.map(pt => (
                  <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#0A1628', fontWeight: 500 }}>
                    <span style={{ color: '#FF6B2B', fontSize: 16, flexShrink: 0 }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sp-what-img rv d2">
              {service.whatFeatures.map(f => (
                <div key={f.title} className="sp-what-feat">
                  <div className="sp-what-feat-ic">{f.icon}</div>
                  <div><h4>{f.title}</h4><p>{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sp-process">
        <div className="sp-inner">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="lbl-dot" />How We Work</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Our Proven Process</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 500, margin: '0 auto' }}>A clear, transparent process from first conversation to live deployment.</p>
          </div>
          <div className="sp-process-grid">
            {service.process.map((step, i) => (
              <div key={step.title} className={`sp-step rv d${i + 1}`}>
                <div className="sp-step-n">0{i + 1}</div>
                <div className="sp-step-ic">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < service.process.length - 1 && <div className="sp-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="sp-tech">
        <div className="sp-inner">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="lbl-dot" />Tech Stack</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Technologies We Use</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 500, margin: '0 auto' }}>Best-in-class tools chosen for reliability, scalability and AI-readiness.</p>
          </div>
          <div className="sp-tech-grid">
            {service.techStack.map((t, i) => (
              <div key={t.name} className={`sp-tech-card rv d${(i % 5) + 1}`}>
                <div className="sp-tech-card-ic">{t.icon}</div>
                <h4>{t.name}</h4>
                <p>{t.desc}</p>
                <div className="sp-tech-tags">{t.tags.map(tg => <span key={tg} className="sp-tech-tag">{tg}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY USE CASES ── */}
      <section className="sp-inds">
        <div className="sp-inner">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#1565A8', justifyContent: 'center' }}><span className="lbl-dot" />Industry Use Cases</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#0A1628', marginBottom: 14 }}>Built for Your Sector</h2>
            <p style={{ fontSize: 16, color: 'rgba(10,22,40,.5)', maxWidth: 500, margin: '0 auto' }}>We adapt our approach to the specific needs, compliance requirements and workflows of your industry.</p>
          </div>
          <div className="sp-inds-grid">
            {service.industries.map((ind, i) => (
              <div key={ind.name} className={`sp-ind-card rv d${(i % 5) + 1}`}>
                <div className="sp-ind-ic">{ind.icon}</div>
                <h4>{ind.name}</h4>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MINI CASE STUDY ── */}
      <section className="sp-case">
        <div className="sp-case-inner">
          <div className="rv" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="lbl-dot" />Case Study</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Real Project. Real Results.</h2>
          </div>
          <div className="sp-case-card rv">
            <div>
              <div className="sp-case-tag">📁 {service.caseStudy.industry}</div>
              <h3 className="sp-case-title">{service.caseStudy.title}</h3>
              <p className="sp-case-desc">{service.caseStudy.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {service.caseStudy.stack.map(s => (
                  <span key={s} style={{ fontSize: 11, fontWeight: 700, color: '#7EC8E3', background: 'rgba(46,158,214,.12)', borderRadius: 5, padding: '3px 10px' }}>{s}</span>
                ))}
              </div>
              <Link href="/portfolio" className="btn-p" style={{ display: 'inline-block' }}>View Full Case Study →</Link>
            </div>
            <div className="sp-case-metrics">
              {service.caseStudy.metrics.map(m => (
                <div key={m.label} className="sp-case-metric">
                  <div className="sp-case-metric-n">{m.value}</div>
                  <div className="sp-case-metric-l">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING TIER ── */}
      <section className="sp-price">
        <div className="sp-price-inner">
          <div className="rv" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="lbl" style={{ color: '#1565A8', justifyContent: 'center' }}><span className="lbl-dot" />Engagement Model</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#0A1628', marginBottom: 14 }}>Choose Your Package</h2>
            <p style={{ fontSize: 16, color: 'rgba(10,22,40,.5)', maxWidth: 500, margin: '0 auto' }}>Flexible engagement options for startups, growing businesses and enterprise organisations.</p>
          </div>
          <div className="sp-price-card rv">
            {[
              { name: '🚀 Spark', badge: 'Starter', badgeBg: 'rgba(46,158,214,.1)', badgeColor: '#1565A8', nameColor: '#0A1628', descColor: 'rgba(10,22,40,.6)', desc: 'Perfect for MVPs, pilots and proof-of-concepts. Fast delivery, core features.', feats: service.pricingTiers.spark, highlight: false },
              { name: '⚡ Scale', badge: 'Most Popular', badgeBg: 'rgba(255,107,43,.15)', badgeColor: '#FF6B2B', nameColor: '#fff', descColor: 'rgba(255,255,255,.65)', desc: 'Full-featured product build with advanced AI, cloud deployment and integrations.', feats: service.pricingTiers.scale, highlight: true },
              { name: '🏢 Enterprise', badge: 'Custom', badgeBg: 'rgba(126,200,227,.1)', badgeColor: '#7EC8E3', nameColor: '#0A1628', descColor: 'rgba(10,22,40,.6)', desc: 'Dedicated team, SLA-backed support, compliance-ready and fully bespoke.', feats: service.pricingTiers.enterprise, highlight: false },
            ].map(tier => (
              <div key={tier.name} className={`sp-tier${tier.highlight ? ' highlight' : ''}`}>
                <span className="sp-tier-badge" style={{ background: tier.badgeBg, color: tier.badgeColor }}>{tier.badge}</span>
                <div className="sp-tier-name" style={{ color: tier.nameColor }}>{tier.name}</div>
                <p className="sp-tier-desc" style={{ color: tier.descColor }}>{tier.desc}</p>
                <div className="sp-tier-feats">
                  {tier.feats.map(f => (
                    <div key={f} className="sp-tier-feat">
                      <span className="sp-tier-feat-ic">✓</span>
                      <span style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,.75)' : 'rgba(10,22,40,.65)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rv" style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: 14, color: 'rgba(10,22,40,.45)', marginBottom: 18 }}>All packages include a free scoping consultation. No hidden fees.</p>
            <Link href="/contact" className="btn-p" style={{ display: 'inline-block' }}>Get a Free Quote →</Link>
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="sp-related">
        <div className="sp-inner">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="lbl-dot" />Related Services</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Often Paired Together</h2>
          </div>
          <div className="sp-related-grid">
            {service.related.map((r, i) => (
              <Link key={r.title} href={r.href} className={`sp-rel-card rv d${i + 1}`} style={{ display: 'block' }}>
                <div className="sp-rel-ic">{r.icon}</div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
                <span className="sp-rel-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="sp-cta">
        <div className="sp-cta-inner rv">
          <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="lbl-dot" />Ready to Start?</div>
          <h2 className="sp-cta-t">Let&apos;s Build Your<br /><span style={{ color: '#FF6B2B' }}>{service.ctaAccent}</span></h2>
          <p className="sp-cta-s">{service.ctaDesc}</p>
          <div className="sp-cta-acts">
            <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
            <Link href="/portfolio" className="btn-s">See Our Work</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
