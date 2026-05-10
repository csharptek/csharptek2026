import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import dynamic from 'next/dynamic'
const ScrollToTop = dynamic(() => import('../../components/ScrollToTop'), { ssr: false })
import { INDUSTRIES_LIST } from '../../data/industries'

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Mulish',-apple-system,sans-serif;color:#0A1628;background:#0A1628;overflow-x:hidden;}
  a{text-decoration:none;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}
  .d4{transition-delay:.28s;}.d5{transition-delay:.35s;}.d6{transition-delay:.42s;}
  .d7{transition-delay:.49s;}.d8{transition-delay:.56s;}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

  /* HERO */
  .hero{position:relative;padding:120px 28px 96px;overflow:hidden;text-align:center;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 55%,#091422 100%);}
  .orb1{position:absolute;top:-80px;left:-150px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);animation:orbFloat 9s ease-in-out infinite;pointer-events:none;}
  .orb2{position:absolute;bottom:-80px;right:-150px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);animation:orbFloat 11s ease-in-out infinite reverse;pointer-events:none;}
  .hi{max-width:820px;margin:0 auto;position:relative;z-index:1;}
  .eye{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7EC8E3;margin-bottom:20px;}
  .eye-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;}
  .hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,5.5vw,66px);font-weight:800;line-height:1.08;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .grad{background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite;}
  .hero-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.6);line-height:1.78;max-width:600px;margin:0 auto 36px;}
  .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
  .btn-p{background:#FF6B2B;color:#fff;padding:14px 28px;border-radius:10px;font-size:14px;font-weight:700;transition:all .2s;display:inline-flex;align-items:center;gap:8px;}
  .btn-p:hover{background:#e55a1f;box-shadow:0 6px 24px rgba(255,107,43,.4);transform:translateY(-2px);}
  .btn-s{background:rgba(255,255,255,.08);color:#fff;padding:14px 28px;border-radius:10px;font-size:14px;font-weight:700;border:1px solid rgba(255,255,255,.15);transition:all .2s;display:inline-flex;align-items:center;}
  .btn-s:hover{background:rgba(255,255,255,.14);transform:translateY(-2px);}

  /* SECTION COMMON */
  .sec{padding:96px 0;}
  .in{max-width:1200px;margin:0 auto;padding:0 28px;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;}
  .sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}

  /* INDUSTRY CARDS GRID */
  .ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
  .ind-card{position:relative;border-radius:20px;overflow:hidden;min-height:220px;display:flex;align-items:flex-end;border:1px solid rgba(255,255,255,.08);transition:all .35s;cursor:pointer;}
  .ind-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,.4);border-color:rgba(255,255,255,.2);}
  .ind-bg{position:absolute;inset:0;background:linear-gradient(135deg,#0D2B45,#1565A8);transition:transform .4s;}
  .ind-card:hover .ind-bg{transform:scale(1.04);}
  .ind-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.1) 60%);}
  .ind-glow{position:absolute;inset:0;opacity:0;background:radial-gradient(circle at 50% 50%,rgba(255,107,43,.15),transparent 70%);transition:opacity .3s;}
  .ind-card:hover .ind-glow{opacity:1;}
  .ind-body{position:relative;z-index:1;padding:22px 20px;width:100%;}
  .ind-icon{font-size:32px;margin-bottom:10px;}
  .ind-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;color:#fff;margin-bottom:6px;}
  .ind-desc{font-size:12px;color:rgba(255,255,255,.55);line-height:1.55;margin-bottom:12px;}
  .ind-link{font-size:12px;font-weight:700;color:#FF6B2B;display:inline-flex;align-items:center;gap:4px;}
  .ind-card:hover .ind-link{gap:8px;}

  /* WHY GRID */
  .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:48px;}
  .why-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .why-card:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.06);transform:translateY(-3px);}
  .why-ic{font-size:28px;margin-bottom:14px;}
  .why-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:8px;}
  .why-d{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;}

  .cta-sec{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;}
  .cta-in{max-width:640px;margin:0 auto;}
  .cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4.5vw,50px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .cta-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}

  @media(max-width:1000px){.ind-grid{grid-template-columns:repeat(2,1fr)!important;}.why-grid{grid-template-columns:repeat(2,1fr)!important;}}
  @media(max-width:600px){.ind-grid,.why-grid{grid-template-columns:1fr!important;}.hero-ctas{flex-direction:column;align-items:center;}}
`

function getDesc(slug) {
  const m = {
    healthcare:  'HIPAA-compliant AI scribes, EHR integrations, patient portals and voice receptionists.',
    wellness:    'IVF portals, fertility tracking, wellness apps and HIPAA-compliant telehealth.',
    education:   'AI evaluation, mobile LMS, internship portals and student analytics platforms.',
    realestate:  'AI property concierge, video-first discovery, investor comms and Web3 integration.',
    automation:  'AI voice agents, n8n workflows, HubSpot, GoHighLevel and lead qualification.',
    marketplace: 'Two-sided platforms with AI matching, Stripe Connect and seller dashboards.',
    petcare:     'Vaccination kiosks, RFID pet ID, vet management and pet owner apps.',
    crm:         'Custom CRMs, HubSpot, GoHighLevel, Apollo and AI lead scoring.',
  }
  return m[slug] || ''
}

export default function IndustriesPage() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }) }, { threshold: 0.07 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <Layout>
      <Head>
        <title>AI Industry Solutions | CSharpTek — Healthcare, Education, Real Estate & More</title>
        <meta name="description" content="CSharpTek builds AI-first software for Healthcare, Education, Real Estate, Wellness, Marketplace, Pet Care and CRM industries. Industry-specific AI solutions with compliance built in." />
        <link rel="canonical" href="https://www.csharptek.com/industries" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: S }} />

      {/* HERO */}
      <section className="hero">
        <div className="orb1" /><div className="orb2" />
        <div className="hi">
          <div className="eye rv"><span className="eye-dot" />8 Industries. One AI-First Team.</div>
          <h1 className="rv">AI Built for<br /><span className="grad">Your Industry</span></h1>
          <p className="hero-sub rv">Every solution we build is designed around the compliance requirements, workflows and unique challenges of your sector. Not generic software — industry-specific AI intelligence.</p>
          <div className="hero-ctas rv">
            <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
            <Link href="/services" className="btn-s">View Our Services</Link>
          </div>
        </div>
      </section>

      {/* INDUSTRY CARDS */}
      <section className="sec" style={{ background: '#0D2B45' }}>
        <div className="in">
          <div className="rv" style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B2B', display: 'inline-block' }} />
              8 Industries
            </div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(28px,4vw,46px)', color: '#fff', marginBottom: 14 }}>Deep AI Expertise Across Every Sector</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 520, margin: '0 auto' }}>Click any industry to see AI solutions, case studies and how we help your specific business.</p>
          </div>
          <div className="ind-grid" id="industries">
            {INDUSTRIES_LIST.map((ind, i) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className={`ind-card rv d${i + 1}`}>
                <div className="ind-bg" style={{ background: ind.grad }} />
                <div className="ind-overlay" />
                <div className="ind-glow" />
                <div className="ind-body">
                  <div className="ind-icon">{ind.icon}</div>
                  <div className="ind-name">{ind.name}</div>
                  <div className="ind-desc">{getDesc(ind.slug)}</div>
                  <span className="ind-link">Explore AI solutions →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INDUSTRY SPECIFIC */}
      <section className="sec" style={{ background: '#0A1628' }}>
        <div className="in">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B2B', display: 'inline-block' }} />
              Why Industry-Specific AI
            </div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Generic Software Doesn&apos;t Cut It</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 500, margin: '0 auto' }}>Every industry has unique compliance requirements, workflows and terminology. We understand yours.</p>
          </div>
          <div className="why-grid">
            {[
              { icon: '🔒', t: 'Compliance Built In', d: 'HIPAA for healthcare, FERPA for education, PCI DSS for payments — not added as an afterthought.' },
              { icon: '🧠', t: 'Domain Knowledge', d: 'We\'ve built AI for each industry. We understand the jargon, workflows and stakeholders from day one.' },
              { icon: '🔌', t: 'Right Integrations', d: 'Epic for healthcare, HubSpot for marketing, Stripe for marketplaces — we know the right tools.' },
              { icon: '⚡', t: 'Faster Delivery', d: 'Industry experience means less discovery time and faster, more accurate AI builds.' },
            ].map((w, i) => (
              <div key={w.t} className={`why-card rv d${i + 1}`}>
                <div className="why-ic">{w.icon}</div>
                <div className="why-t">{w.t}</div>
                <div className="why-d">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-in rv">
          <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B2B', display: 'inline-block' }} />
            Don&apos;t See Your Industry?
          </div>
          <h2 className="cta-t">We Build AI for Any Sector</h2>
          <p className="cta-s">If your industry isn&apos;t listed, talk to us anyway. We&apos;ve built for 15+ sectors and our AI-first approach adapts to any domain.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-p">Book a Free Discovery Call →</Link>
            <Link href="/portfolio" className="btn-s">See Our Work</Link>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </Layout>
  )
}
