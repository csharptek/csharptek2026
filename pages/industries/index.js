import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import { INDUSTRIES_LIST } from '../../data/industries'
const ScrollToTop = dynamic(() => import('../../components/ScrollToTop'), { ssr: false })

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Mulish',-apple-system,sans-serif;color:#0A1628;background:#0A1628;overflow-x:hidden;}
  a{text-decoration:none;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}
  .d4{transition-delay:.28s;}.d5{transition-delay:.35s;}.d6{transition-delay:.42s;}.d7{transition-delay:.49s;}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

  .hero{position:relative;padding:130px 28px 100px;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%);overflow:hidden;text-align:center;}
  .orb1{position:absolute;top:-100px;left:-150px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);pointer-events:none;animation:orbFloat 9s ease-in-out infinite;}
  .orb2{position:absolute;bottom:-100px;right:-150px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);pointer-events:none;animation:orbFloat 11s ease-in-out infinite reverse;}
  .hi{max-width:760px;margin:0 auto;position:relative;z-index:1;}
  .eye{display:inline-flex;align-items:center;gap:8px;background:rgba(46,158,214,.07);border:1px solid rgba(46,158,214,.2);border-radius:100px;padding:7px 18px;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#7EC8E3;margin-bottom:24px;}
  .eye-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;}
  .hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,5.5vw,64px);font-weight:800;line-height:1.08;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .grad{color:#2E9ED6;background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite;}
  .hero-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.6);line-height:1.75;max-width:600px;margin:0 auto 36px;}
  .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,43,.38);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);display:inline-block;transition:all .2s;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}

  .sec{padding:96px 0;}
  .in{max-width:1200px;margin:0 auto;padding:0 28px;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}

  .ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
  .ind-card{border-radius:20px;overflow:hidden;position:relative;cursor:pointer;min-height:320px;display:flex;flex-direction:column;justify-content:flex-end;transition:transform .3s,box-shadow .3s;}
  .ind-card:hover{transform:translateY(-6px);box-shadow:0 28px 60px rgba(0,0,0,.4);}
  .ind-bg{position:absolute;inset:0;transition:transform .4s;}
  .ind-card:hover .ind-bg{transform:scale(1.05);}
  .ind-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,10,20,.95) 0%,rgba(5,10,20,.5) 55%,rgba(5,10,20,.15) 100%);}
  .ind-glow{position:absolute;inset:0;border:2px solid transparent;border-radius:20px;transition:border-color .3s;}
  .ind-card:hover .ind-glow{border-color:rgba(46,158,214,.5);}
  .ind-body{position:relative;z-index:1;padding:26px 22px;}
  .ind-icon{width:48px;height:48px;border-radius:13px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:14px;transition:background .3s;}
  .ind-card:hover .ind-icon{background:rgba(255,107,43,.8);}
  .ind-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#fff;margin-bottom:6px;}
  .ind-desc{font-size:12px;color:rgba(255,255,255,.6);line-height:1.5;margin-bottom:14px;}
  .ind-link{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;color:#FF6B2B;transition:gap .2s;}
  .ind-card:hover .ind-link{gap:9px;}

  .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:52px;}
  .why-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .why-card:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.06);transform:translateY(-3px);}
  .why-ic{font-size:28px;margin-bottom:14px;}
  .why-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:8px;}
  .why-d{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;}

  .cta-sec{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;}
  .cta-in{max-width:640px;margin:0 auto;}
  .cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4.5vw,50px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .cta-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}

  @media(max-width:1000px){.ind-grid{grid-template-columns:repeat(2,1fr)!important;}}
  @media(max-width:600px){.ind-grid,.why-grid{grid-template-columns:1fr!important;}.hero-ctas{flex-direction:column;align-items:center;}}
`

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
        <title>Industries — CSharpTek AI Software Development</title>
        <meta name="description" content="CSharpTek builds AI-first software for Healthcare, Education, Wellness, Marketing, Marketplaces, Pet Care and CRM. Industry-specific solutions with compliance built in." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: S }} />

      {/* HERO */}
      <section className="hero">
        <div className="orb1" /><div className="orb2" />
        <div className="hi">
          <div className="eye rv"><span className="eye-dot" />Industries We Serve</div>
          <h1 className="rv">Software Built for<br /><span className="grad">Your Industry</span></h1>
          <p className="hero-sub rv">Every solution we build is designed around the compliance requirements, workflows and unique challenges of your sector. Not generic software — industry-specific intelligence.</p>
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
              7 Industries
            </div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(28px,4vw,46px)', color: '#fff', marginBottom: 14 }}>Deep Expertise Across Every Sector</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 520, margin: '0 auto' }}>Click any industry to see solutions, case studies and how we can help your specific business.</p>
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
                  <span className="ind-link">Explore solutions →</span>
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
              Why Industry-Specific
            </div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Generic Software Doesn&apos;t Cut It</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 500, margin: '0 auto' }}>Every industry has unique compliance requirements, workflows and terminology. We understand yours.</p>
          </div>
          <div className="why-grid">
            {[
              { icon: '🔒', t: 'Compliance Built In', d: 'HIPAA for healthcare, FERPA for education, PCI DSS for payments — not added as an afterthought.' },
              { icon: '🧠', t: 'Domain Knowledge', d: 'We\'ve built for each industry. We understand the jargon, workflows and stakeholders from day one.' },
              { icon: '🔌', t: 'Right Integrations', d: 'Epic for healthcare, HubSpot for marketing, Stripe for marketplaces — we know the right tools.' },
              { icon: '⚡', t: 'Faster Delivery', d: 'Industry-specific experience means less discovery time and faster, more accurate builds.' },
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
          <h2 className="cta-t">We Build for Any Sector</h2>
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

function getDesc(slug) {
  const m = {
    healthcare:  'HIPAA-compliant AI, EHR integrations, medical scribes and patient portals.',
    wellness:    'IVF portals, patient tracking, clinic management and wellness apps.',
    education:   'LMS platforms, AI evaluation, student portals and internship management.',
    automation:  'AI voice agents, CRM automation, lead qualification and social media pipelines.',
    marketplace: 'Two-sided platforms with AI matching, payments, bookings and seller dashboards.',
    petcare:     'Vaccination kiosks, RFID pet ID, vet management and pet owner apps.',
    crm:         'Custom CRMs, HubSpot, GoHighLevel, Apollo and internal productivity tools.',
  }
  return m[slug] || ''
}
