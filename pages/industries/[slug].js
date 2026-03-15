import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import { INDUSTRIES_DATA, INDUSTRIES_LIST } from '../../data/industries'
const ScrollToTop = dynamic(() => import('../../components/ScrollToTop'), { ssr: false })

export async function getStaticPaths() {
  return { paths: Object.keys(INDUSTRIES_DATA).map(slug => ({ params: { slug } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const ind = INDUSTRIES_DATA[params.slug] || null
  if (!ind) return { notFound: true }
  const idx  = INDUSTRIES_LIST.findIndex(i => i.slug === params.slug)
  const prev = idx > 0 ? INDUSTRIES_LIST[idx - 1] : null
  const next = idx < INDUSTRIES_LIST.length - 1 ? INDUSTRIES_LIST[idx + 1] : null
  return { props: { ind, slug: params.slug, prev, next, allInds: INDUSTRIES_LIST } }
}

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

  /* HERO */
  .hero{position:relative;padding:110px 28px 88px;overflow:hidden;text-align:center;}
  .orb{position:absolute;border-radius:50%;pointer-events:none;}
  .hi{max-width:820px;margin:0 auto;position:relative;z-index:1;}
  .back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.5);font-size:13px;font-weight:600;margin-bottom:28px;transition:color .2s;}
  .back:hover{color:#7EC8E3;}
  .ico-wrap{width:80px;height:80px;border-radius:22px;display:flex;align-items:center;justify-content:center;font-size:38px;margin:0 auto 24px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .ldot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;}
  .sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  .h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(34px,5.5vw,64px);font-weight:800;line-height:1.08;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .grad{color:#2E9ED6;background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite;}
  .sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.62);line-height:1.78;max-width:660px;margin:0 auto 36px;}
  .ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:36px;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,43,.38);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);display:inline-block;transition:all .2s;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}
  .htags{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}
  .htag{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:100px;padding:5px 16px;font-size:12px;color:rgba(255,255,255,.6);font-weight:600;}

  /* PAIN POINTS */
  .pain{background:#F0F8FF;padding:88px 0;}
  .in{max-width:1200px;margin:0 auto;padding:0 28px;}
  .pain-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px;}
  .pain-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .pain-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(21,101,168,.1);border-color:rgba(46,158,214,.28);}
  .pain-ic{font-size:28px;margin-bottom:14px;}
  .pain-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#0A1628;margin-bottom:8px;}
  .pain-d{font-size:13px;color:rgba(10,22,40,.55);line-height:1.65;}

  /* SOLUTIONS */
  .sol{background:#0A1628;padding:88px 0;}
  .sol-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px;}
  .sol-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:16px;padding:28px 24px;transition:all .3s;}
  .sol-card:hover{background:rgba(46,158,214,.08);border-color:rgba(46,158,214,.3);transform:translateY(-4px);}
  .sol-ic{font-size:30px;margin-bottom:14px;}
  .sol-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:9px;}
  .sol-d{font-size:13px;color:rgba(255,255,255,.55);line-height:1.65;margin-bottom:14px;}
  .sol-tags{display:flex;flex-wrap:wrap;gap:5px;}
  .sol-tag{font-size:10px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.1);border-radius:4px;padding:2px 8px;}

  /* COMPLIANCE / TRUST */
  .trust{background:#0D2B45;padding:80px 0;}
  .trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:44px;}
  .trust-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:13px;padding:22px 18px;transition:all .25s;}
  .trust-card:hover{border-color:rgba(46,158,214,.28);background:rgba(46,158,214,.06);}
  .trust-ic{font-size:26px;margin-bottom:12px;}
  .trust-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:6px;}
  .trust-d{font-size:12px;color:rgba(255,255,255,.5);line-height:1.6;}

  /* CASE STUDY */
  .case{background:#0A1628;padding:88px 0;}
  .case-in{max-width:1000px;margin:0 auto;padding:0 28px;}
  .case-card{border-radius:20px;padding:48px;display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;border:1px solid rgba(46,158,214,.2);}
  .case-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,107,43,.15);border:1px solid rgba(255,107,43,.3);border-radius:100px;padding:5px 14px;font-size:10px;font-weight:700;color:#FF6B2B;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;}
  .case-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:800;color:#fff;margin-bottom:14px;line-height:1.25;}
  .case-d{font-size:15px;color:rgba(255,255,255,.6);line-height:1.72;margin-bottom:22px;}
  .case-stk{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:26px;}
  .case-tk{font-size:11px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.12);border-radius:5px;padding:3px 10px;}
  .metrics{display:flex;flex-direction:column;gap:14px;}
  .metric{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.06);border-radius:12px;padding:16px 18px;}
  .metric-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;color:#FF6B2B;min-width:72px;line-height:1;}
  .metric-l{font-size:13px;color:rgba(255,255,255,.6);}

  /* SERVICES */
  .svcs{background:#F0F8FF;padding:80px 0;}
  .svcs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px;}
  .svc-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:14px;padding:22px 18px;transition:all .3s;display:block;}
  .svc-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(21,101,168,.1);border-color:rgba(46,158,214,.3);}
  .svc-ic{font-size:26px;margin-bottom:12px;}
  .svc-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#0A1628;margin-bottom:6px;}
  .svc-d{font-size:12px;color:rgba(10,22,40,.55);line-height:1.6;margin-bottom:14px;}
  .svc-lnk{font-size:12px;font-weight:700;color:#FF6B2B;display:inline-flex;align-items:center;gap:4px;transition:gap .2s;}
  .svc-card:hover .svc-lnk{gap:8px;}

  /* BOTTOM CTA */
  .cta-sec{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;}
  .cta-in{max-width:640px;margin:0 auto;}
  .cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4.5vw,50px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .cta-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}
  .trust-items{display:flex;gap:22px;justify-content:center;flex-wrap:wrap;margin-top:28px;}
  .ti{display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,.45);font-weight:600;}

  /* OTHER INDUSTRIES */
  .other{background:#060f1d;padding:64px 0;border-top:1px solid rgba(46,158,214,.08);}
  .other-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:32px;}
  .other-card{display:flex;align-items:center;gap:12px;padding:14px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.08);border-radius:12px;transition:all .2s;}
  .other-card:hover{background:rgba(46,158,214,.08);border-color:rgba(46,158,214,.25);}
  .other-ic{font-size:22px;flex-shrink:0;}
  .other-t{font-size:13px;font-weight:700;color:#fff;}
  .other-arr{margin-left:auto;color:rgba(255,255,255,.3);font-size:14px;}
  .other-card:hover .other-arr{color:#FF6B2B;}

  /* PREV / NEXT */
  .pn{background:#0A1628;border-top:1px solid rgba(46,158,214,.1);padding:24px 0;}
  .pn-in{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
  .pn-btn{display:flex;align-items:center;gap:12px;padding:14px 20px;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.1);border-radius:12px;flex:0 1 320px;transition:all .2s;}
  .pn-btn:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,168,.06);}
  .pn-arr{font-size:20px;color:rgba(255,255,255,.5);}
  .pn-lbl{font-size:10px;font-weight:700;color:rgba(255,255,255,.32);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px;}
  .pn-name{font-size:14px;font-weight:700;color:#fff;display:flex;align-items:center;gap:7px;}
  .pn-all{display:flex;align-items:center;gap:6px;padding:12px 20px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.25);border-radius:10px;font-size:13px;font-weight:700;color:#FF6B2B;white-space:nowrap;transition:all .2s;}
  .pn-all:hover{background:rgba(255,107,43,.2);}

  @media(max-width:1000px){.sol-grid,.svcs-grid{grid-template-columns:repeat(2,1fr)!important;}}
  @media(max-width:860px){.pain-grid,.trust-grid{grid-template-columns:repeat(2,1fr)!important;}.case-card{grid-template-columns:1fr!important;gap:32px!important;}.other-grid{grid-template-columns:1fr 1fr!important;}}
  @media(max-width:560px){.pain-grid,.trust-grid,.sol-grid,.svcs-grid,.other-grid{grid-template-columns:1fr!important;}.ctas{flex-direction:column;align-items:center;}}
`

export default function IndustryPage({ ind, slug, prev, next, allInds }) {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }) }, { threshold: 0.07 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <Layout>
      <Head>
        <title>{ind.name} Software — CSharpTek</title>
        <meta name="description" content={ind.metaDesc} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: S }} />

      {/* ── HERO ── */}
      <section className="hero" style={{ background: `linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%)` }}>
        <div className="orb" style={{ top: -100, left: -150, width: 500, height: 500, background: `radial-gradient(circle,${ind.color}30 0%,transparent 70%)`, animation: 'orbFloat 9s ease-in-out infinite' }} />
        <div className="orb" style={{ bottom: -100, right: -150, width: 500, height: 500, background: 'radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%)', animation: 'orbFloat 11s ease-in-out infinite reverse' }} />
        <div className="hi">
          <Link href="/industries" className="back rv">← All Industries</Link>
          <div className="ico-wrap rv" style={{ borderColor: `${ind.color}44`, background: `${ind.color}22` }}>{ind.icon}</div>
          <div className="lbl rv" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="ldot" />{ind.tagline}</div>
          <h1 className="h1 rv">{ind.headline}<br /><span className="grad">{ind.headlineAccent}</span></h1>
          <p className="sub rv">{ind.subline}</p>
          <div className="ctas rv">
            <Link href="/contact" className="btn-p">Get a Free Consultation →</Link>
            <Link href="/portfolio" className="btn-s">View Case Studies</Link>
          </div>
          <div className="htags rv">
            {ind.heroTags.map(t => <span key={t} className="htag">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="pain">
        <div className="in">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#1565A8', justifyContent: 'center' }}><span className="ldot" />The Challenges</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#0A1628', marginBottom: 14 }}>We Know Your Pain Points</h2>
            <p style={{ fontSize: 16, color: 'rgba(10,22,40,.55)', maxWidth: 500, margin: '0 auto' }}>Deep domain experience means we understand your specific challenges — and we&apos;ve already built solutions for them.</p>
          </div>
          <div className="pain-grid">
            {ind.painPoints.map((p, i) => (
              <div key={p.title} className={`pain-card rv d${i + 1}`}>
                <div className="pain-ic">{p.icon}</div>
                <div className="pain-t">{p.title}</div>
                <div className="pain-d">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="sol">
        <div className="in">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="ldot" />Our Solutions</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Built for {ind.name}</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 500, margin: '0 auto' }}>Production-grade solutions we&apos;ve delivered for {ind.name.toLowerCase()} clients — ready to adapt to your specific needs.</p>
          </div>
          <div className="sol-grid">
            {ind.solutions.map((s, i) => (
              <div key={s.title} className={`sol-card rv d${(i % 6) + 1}`}>
                <div className="sol-ic">{s.icon}</div>
                <div className="sol-t">{s.title}</div>
                <div className="sol-d">{s.desc}</div>
                <div className="sol-tags">{s.tags.map(t => <span key={t} className="sol-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE / TRUST ── */}
      <section className="trust">
        <div className="in">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="ldot" />Why Choose Us</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Built with {ind.name} in Mind</h2>
          </div>
          <div className="trust-grid">
            {ind.compliance.map((c, i) => (
              <div key={c.title} className={`trust-card rv d${i + 1}`}>
                <div className="trust-ic">{c.icon}</div>
                <div className="trust-t">{c.title}</div>
                <div className="trust-d">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="case">
        <div className="case-in">
          <div className="rv" style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="ldot" />Case Study</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', marginBottom: 14 }}>Real Project. Real Results.</h2>
          </div>
          <div className="case-card rv" style={{ background: `linear-gradient(135deg,#0D2B45,${ind.color}99)` }}>
            <div>
              <div className="case-badge">📁 {ind.caseStudy.client}</div>
              <h3 className="case-t">{ind.caseStudy.title}</h3>
              <p className="case-d">{ind.caseStudy.desc}</p>
              <div className="case-stk">{ind.caseStudy.stack.map(s => <span key={s} className="case-tk">{s}</span>)}</div>
              <Link href="/portfolio" className="btn-p" style={{ display: 'inline-block' }}>View Full Case Study →</Link>
            </div>
            <div className="metrics">
              {ind.caseStudy.metrics.map(m => (
                <div key={m.l} className="metric">
                  <div className="metric-n">{m.v}</div>
                  <div className="metric-l">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELEVANT SERVICES ── */}
      <section className="svcs">
        <div className="in">
          <div className="rv" style={{ textAlign: 'center' }}>
            <div className="lbl" style={{ color: '#1565A8', justifyContent: 'center' }}><span className="ldot" />How We Help</div>
            <h2 className="sec-t" style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: '#0A1628', marginBottom: 14 }}>Services We Use for {ind.name}</h2>
          </div>
          <div className="svcs-grid">
            {ind.services.map((s, i) => (
              <Link key={s.href} href={s.href} className={`svc-card rv d${i + 1}`}>
                <div className="svc-ic">{s.icon}</div>
                <div className="svc-t">{s.title}</div>
                <div className="svc-d">{s.desc}</div>
                <span className="svc-lnk">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="cta-sec">
        <div className="cta-in rv">
          <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="ldot" />Ready to Start?</div>
          <h2 className="cta-t">{ind.ctaHeadline}</h2>
          <p className="cta-s">{ind.ctaDesc}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
            <Link href="/services" className="btn-s">View All Services</Link>
          </div>
          <div className="trust-items">
            {['No obligation','Reply within 24 hours','HIPAA-ready','10+ years experience'].map(t => (
              <span key={t} className="ti"><span style={{ color: '#7EC8E3' }}>✓</span>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER INDUSTRIES ── */}
      <section className="other">
        <div className="in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.32)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4 }}>Explore More</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: '#fff' }}>Other Industries We Serve</h3>
            </div>
            <Link href="/industries#industries" style={{ fontSize: 13, fontWeight: 700, color: '#FF6B2B' }}>View All Industries →</Link>
          </div>
          <div className="other-grid">
            {allInds.filter(i => i.slug !== slug).map(i => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="other-card">
                <span className="other-ic">{i.icon}</span>
                <span className="other-t">{i.name}</span>
                <span className="other-arr">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT ── */}
      <nav className="pn">
        <div className="pn-in">
          {prev ? (
            <Link href={`/industries/${prev.slug}`} className="pn-btn">
              <span className="pn-arr">←</span>
              <div><div className="pn-lbl">Previous</div><div className="pn-name"><span>{prev.icon}</span>{prev.name}</div></div>
            </Link>
          ) : <div />}
          <Link href="/industries#industries" className="pn-all">⊞ All Industries</Link>
          {next ? (
            <Link href={`/industries/${next.slug}`} className="pn-btn" style={{ justifyContent: 'flex-end' }}>
              <div style={{ textAlign: 'right' }}><div className="pn-lbl">Next</div><div className="pn-name" style={{ justifyContent: 'flex-end' }}>{next.name}<span>{next.icon}</span></div></div>
              <span className="pn-arr">→</span>
            </Link>
          ) : <div />}
        </div>
      </nav>

      <ScrollToTop />
    </Layout>
  )
}
