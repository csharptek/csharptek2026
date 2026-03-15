import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import ScrollToTop from '../../components/ScrollToTop'
import { SERVICES_LIST } from '../../data/services'

const STYLES = `
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Mulish',-apple-system,sans-serif;color:#0A1628;background:#0A1628;overflow-x:hidden;}
  a{text-decoration:none;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.06s;}.d2{transition-delay:.12s;}.d3{transition-delay:.18s;}
  .d4{transition-delay:.24s;}.d5{transition-delay:.30s;}.d6{transition-delay:.36s;}
  .d7{transition-delay:.42s;}.d8{transition-delay:.48s;}.d9{transition-delay:.54s;}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

  /* HERO */
  .hero{position:relative;padding:130px 28px 100px;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%);overflow:hidden;text-align:center;}
  .orb1{position:absolute;top:-120px;left:-160px;width:540px;height:540px;border-radius:50%;background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);pointer-events:none;animation:orbFloat 9s ease-in-out infinite;}
  .orb2{position:absolute;bottom:-120px;right:-160px;width:540px;height:540px;border-radius:50%;background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);pointer-events:none;animation:orbFloat 11s ease-in-out infinite reverse;}
  .hero-inner{max-width:760px;margin:0 auto;position:relative;z-index:1;}
  .eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(46,158,214,.07);border:1px solid rgba(46,158,214,.2);border-radius:100px;padding:7px 18px;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#7EC8E3;margin-bottom:24px;}
  .hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,5.5vw,64px);font-weight:800;line-height:1.08;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .grad{color:#2E9ED6;background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite;}
  .hero-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.6);line-height:1.75;max-width:600px;margin:0 auto 36px;}
  .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:40px;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,43,.38);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);display:inline-block;transition:all .2s;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}
  .hero-stats{display:flex;gap:32px;justify-content:center;flex-wrap:wrap;}
  .hs{text-align:center;}
  .hs-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:800;color:#FF6B2B;line-height:1;}
  .hs-l{font-size:12px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-top:4px;}

  /* SERVICES GRID */
  .svc-section{background:#F0F8FF;padding:96px 0;}
  .svc-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .svc-hd{text-align:center;margin-bottom:60px;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .lbl-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;flex-shrink:0;}
  .sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;}
  .scard{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:18px;padding:34px 28px;transition:all .3s;position:relative;overflow:hidden;display:flex;flex-direction:column;}
  .scard::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#1565A8,#2E9ED6);opacity:0;transition:opacity .3s;}
  .scard:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(21,101,168,.13);border-color:rgba(46,158,214,.3);}
  .scard:hover::before{opacity:1;}
  .sc-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px;}
  .sc-ico{width:56px;height:56px;border-radius:15px;background:rgba(21,101,168,.07);display:flex;align-items:center;justify-content:center;font-size:26px;transition:background .3s;}
  .scard:hover .sc-ico{background:linear-gradient(135deg,#1565A8,#2E9ED6);}
  .sc-num{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;color:rgba(21,101,168,.3);}
  .sc-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#0A1628;margin-bottom:10px;letter-spacing:-.01em;}
  .sc-desc{font-size:14px;color:rgba(10,22,40,.55);line-height:1.68;flex:1;margin-bottom:20px;}
  .sc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px;}
  .sc-tag{font-size:10px;font-weight:700;color:#1565A8;background:rgba(21,101,168,.07);border-radius:5px;padding:3px 10px;}
  .sc-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#FF6B2B;transition:gap .2s;margin-top:auto;}
  .scard:hover .sc-link{gap:10px;}

  /* PROCESS STRIP */
  .process{background:#0A1628;padding:80px 0;}
  .process-inner{max-width:1100px;margin:0 auto;padding:0 28px;}
  .proc-hd{text-align:center;margin-bottom:52px;}
  .proc-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:rgba(46,158,214,.08);border-radius:16px;overflow:hidden;border:1px solid rgba(46,158,214,.12);}
  .proc-step{padding:32px 26px;background:#0A1628;position:relative;}
  .proc-step:not(:last-child)::after{content:'→';position:absolute;top:50%;right:-12px;transform:translateY(-50%);width:24px;height:24px;background:#1565A8;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;z-index:1;}
  .proc-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:38px;font-weight:800;color:rgba(46,158,214,.12);line-height:1;margin-bottom:14px;}
  .proc-ic{width:44px;height:44px;border-radius:12px;background:rgba(46,158,214,.1);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px;}
  .proc-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:8px;}
  .proc-d{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;}

  /* WHY STRIP */
  .why-strip{background:#0D2B45;padding:80px 0;}
  .why-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:52px;}
  .why-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .why-card:hover{border-color:rgba(46,158,214,.28);background:rgba(46,158,214,.06);transform:translateY(-3px);}
  .why-ic{font-size:28px;margin-bottom:14px;}
  .why-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:8px;}
  .why-d{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;}

  /* CTA */
  .cta{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;}
  .cta-inner{max-width:640px;margin:0 auto;}
  .cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4.5vw,50px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .cta-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}
  .cta-acts{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}

  @media(max-width:900px){
    .svc-grid{grid-template-columns:repeat(2,1fr);}
    .proc-steps,.why-grid{grid-template-columns:repeat(2,1fr);}
    .proc-step:not(:last-child)::after{display:none;}
  }
  @media(max-width:560px){
    .svc-grid,.proc-steps,.why-grid{grid-template-columns:1fr;}
    .hero-ctas,.cta-acts{flex-direction:column;align-items:center;}
    .hero-stats{gap:20px;}
  }
`

export default function ServicesPage() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') })
    }, { threshold: 0.07 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Services — CSharpTek AI-First Software Development</title>
        <meta name="description" content="9 AI-first services from CSharpTek — AI Integration, Voice Agents, Web & Mobile, Cloud DevOps, MVP Vibe Coding, Marketplace Publishing, Prompt Engineering, CRM Tools and 24/7 Support." />
</Head>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="orb1" /><div className="orb2" />
        <div className="hero-inner">
          <div className="eyebrow rv">
            <span style={{width:6,height:6,borderRadius:'50%',background:'#FF6B2B',display:'inline-block',flexShrink:0}}/>
            What We Do
          </div>
          <h1 className="rv">Everything You Need to<br/><span className="grad">Build, Launch & Scale</span></h1>
          <p className="hero-sub rv">9 end-to-end services — from AI integration and voice agents to cloud infrastructure, MVPs and 24/7 support. One team, every layer of your stack.</p>
          <div className="hero-ctas rv">
            <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
            <Link href="/portfolio" className="btn-s">View Our Work</Link>
          </div>
          <div className="hero-stats rv">
            {[['9','Services'],['10+','Years Experience'],['50+','Projects Delivered'],['3','Cloud Marketplaces']].map(([n,l]) => (
              <div key={l} className="hs"><div className="hs-n">{n}</div><div className="hs-l">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 SERVICE CARDS ── */}
      <section className="svc-section">
        <div className="svc-inner">
          <div className="svc-hd rv">
            <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="lbl-dot"/>Our Services</div>
            <h2 className="sec-t" style={{fontSize:'clamp(28px,4vw,46px)',color:'#0A1628',marginBottom:14}}>Everything From AI to Infrastructure</h2>
            <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:520,margin:'0 auto'}}>Each service is a full end-to-end offering — strategy, build, deploy and ongoing support included.</p>
          </div>
          <div className="svc-grid">
            {SERVICES_LIST.map((svc, i) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className={`scard rv d${(i % 9) + 1}`}>
                <div className="sc-head">
                  <div className="sc-ico">{svc.icon}</div>
                  <span className="sc-num">0{i + 1}</span>
                </div>
                <div className="sc-title">{svc.title}</div>
                <div className="sc-desc">{svc.desc}</div>
                <div className="sc-tags">
                  {svc.tags.map(t => <span key={t} className="sc-tag">{t}</span>)}
                </div>
                <span className="sc-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="process">
        <div className="process-inner">
          <div className="proc-hd rv">
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Our Approach</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>How Every Engagement Works</h2>
            <p style={{fontSize:16,color:'rgba(255,255,255,.5)',maxWidth:480,margin:'0 auto'}}>A clear, consistent process across every service we deliver — from first conversation to live deployment.</p>
          </div>
          <div className="proc-steps rv">
            {[
              {icon:'🔍',n:'01',t:'Discovery Call',d:'Free 30-minute session. We understand your goals, constraints and timeline before recommending anything.'},
              {icon:'📐',n:'02',t:'Scoping & Proposal',d:'A clear fixed-scope proposal with timeline, deliverables and cost — no surprises.'},
              {icon:'🏗️',n:'03',t:'Build & Deliver',d:'Weekly updates, live staging environment. You see progress every step of the way.'},
              {icon:'🚀',n:'04',t:'Launch & Support',d:'Deployment, knowledge transfer and ongoing support — we stay with you after go-live.'},
            ].map(s => (
              <div key={s.t} className="proc-step">
                <div className="proc-n">{s.n}</div>
                <div className="proc-ic">{s.icon}</div>
                <div className="proc-t">{s.t}</div>
                <div className="proc-d">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CSHARPTEK ── */}
      <section className="why-strip">
        <div className="why-inner">
          <div className="rv" style={{textAlign:'center'}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Why CSharpTek</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>We're Not Your Average Dev Agency</h2>
            <p style={{fontSize:16,color:'rgba(255,255,255,.5)',maxWidth:480,margin:'0 auto'}}>We're an AI-first engineering team with deep specialisation in every service we offer.</p>
          </div>
          <div className="why-grid">
            {[
              {icon:'🧠',t:'AI-First by Default',d:'Every project we build is designed for AI integration from day one — not retrofitted later.'},
              {icon:'☁️',t:'Multi-Cloud Certified',d:'Certified across Azure, AWS and Google Cloud. Published on all three Marketplaces.'},
              {icon:'🏥',t:'Compliance-Ready',d:'HIPAA, GDPR and SOC2-ready architectures. Healthcare and regulated industries welcome.'},
              {icon:'⚡',t:'Speed Without Compromise',d:'We ship faster than traditional agencies using vibe coding — without cutting corners on quality.'},
            ].map(w => (
              <div key={w.t} className="why-card rv">
                <div className="why-ic">{w.icon}</div>
                <div className="why-t">{w.t}</div>
                <div className="why-d">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="cta-inner rv">
          <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Ready to Start?</div>
          <h2 className="cta-t">Not Sure Which Service<br/>You Need?</h2>
          <p className="cta-s">Tell us what you're trying to build or fix. We'll recommend the right combination of services and give you a clear plan — completely free.</p>
          <div className="cta-acts">
            <Link href="/contact" className="btn-p">Book a Free Discovery Call →</Link>
            <Link href="/portfolio" className="btn-s">See What We've Built</Link>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </Layout>
  )
}
