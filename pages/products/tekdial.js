import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'

const FEATURES = [
  { icon:'🎙️', title:'AI Inbound Receptionist', desc:'Answers every call instantly. Handles FAQs, routing, and patient queries — 24/7, no hold times.' },
  { icon:'📞', title:'Outbound Calling', desc:'Automated outbound campaigns for reminders, follow-ups, and lead qualification at scale.' },
  { icon:'📅', title:'Appointment Setting & Rescheduling', desc:'Books, confirms and reschedules appointments directly into your calendar or EHR system.' },
  { icon:'🔀', title:'IVR Flow Builder', desc:'Custom interactive voice response flows — built visually, deployed in minutes.' },
  { icon:'🌐', title:'Multilingual Support', desc:'Supports English, Arabic, Spanish and more — serve patients in their preferred language.' },
  { icon:'🔗', title:'EHR & CRM Integration', desc:'Connects with Epic, Athena, HubSpot, and any system via API or webhook.' },
  { icon:'📊', title:'Call Analytics Dashboard', desc:'Track call volume, resolution rate, patient sentiment and agent performance in real time.' },
  { icon:'🔒', title:'HIPAA Compliant', desc:'End-to-end encryption, BAA available, audit logs — built for healthcare from day one.' },
]

const USE_CASES = [
  { icon:'🏥', label:'Healthcare Clinics', desc:'Never miss a patient call. AI handles intake, FAQs and scheduling.' },
  { icon:'🦷', label:'Dental Practices', desc:'Appointment reminders and rescheduling automated completely.' },
  { icon:'🌸', label:'Wellness & IVF Centres', desc:'Sensitive patient calls handled with care and compliance.' },
  { icon:'🏢', label:'Enterprise Call Centres', desc:'Replace IVR menus with intelligent conversational AI.' },
  { icon:'🐾', label:'Veterinary Clinics', desc:'Booking and reminder calls automated, staff freed up.' },
  { icon:'🏠', label:'Real Estate Agencies', desc:'Qualify leads and book viewings with outbound AI calls.' },
]

const STATS = [
  { v:'< 1s', l:'Answer time' },
  { v:'24/7', l:'Availability' },
  { v:'95%+', l:'Call resolution rate' },
  { v:'60%', l:'Reduction in missed calls' },
]

export default function TekDial() {
  return (
    <Layout>
      <Head>
        <title>TekDial — AI Voice Receptionist & Call Automation | CSharpTek</title>
        <meta name="description" content="TekDial is an AI-powered voice receptionist that handles inbound calls, outbound campaigns, appointment setting and IVR flows — 24/7, HIPAA compliant." />
      </Head>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Mulish', sans-serif; }

        .hero {
          background: linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%);
          padding: 100px 28px 80px; text-align: center; position: relative; overflow: hidden;
        }
        .hero::before {
          content:''; position:absolute; top:-20%; left:-10%; width:600px; height:600px;
          background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);
          border-radius:50%; pointer-events:none;
        }
        .hero::after {
          content:''; position:absolute; bottom:-10%; right:-10%; width:500px; height:500px;
          background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);
          border-radius:50%; pointer-events:none;
        }
        .hero-inner { max-width:800px; margin:0 auto; position:relative; z-index:2; }
        .product-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(46,158,214,.12); border:1px solid rgba(46,158,214,.3);
          border-radius:20px; padding:6px 16px; font-size:12px; font-weight:700;
          color:#7EC8E3; letter-spacing:.06em; text-transform:uppercase; margin-bottom:24px;
        }
        .hero h1 {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(38px,6vw,68px);
          font-weight:800; color:#fff; line-height:1.1; margin-bottom:12px;
        }
        .hero h1 span { background:linear-gradient(135deg,#2E9ED6,#7EC8E3); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .hero-sub { font-size:clamp(16px,2vw,20px); color:rgba(255,255,255,.6); line-height:1.6; max-width:600px; margin:0 auto 36px; }
        .hero-tags { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-bottom:36px; }
        .hero-tag { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:20px; padding:5px 14px; font-size:12px; font-weight:600; color:rgba(255,255,255,.65); }
        .hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
        .btn-primary { background:#FF6B2B; color:#fff; padding:14px 32px; border-radius:10px; font-size:15px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all .2s; }
        .btn-primary:hover { background:#e55a1f; transform:translateY(-2px); box-shadow:0 8px 28px rgba(255,107,43,.35); }
        .btn-ghost { border:2px solid rgba(46,158,214,.35); color:#7EC8E3; padding:14px 32px; border-radius:10px; font-size:15px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all .2s; }
        .btn-ghost:hover { border-color:#7EC8E3; color:#fff; }

        .stats-bar { background:#0D2B45; border-top:1px solid rgba(46,158,214,.15); border-bottom:1px solid rgba(46,158,214,.15); padding:32px 28px; }
        .stats-inner { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .stat-item { text-align:center; padding:0 20px; border-right:1px solid rgba(46,158,214,.12); }
        .stat-item:last-child { border-right:none; }
        .stat-v { font-family:'Plus Jakarta Sans',sans-serif; font-size:36px; font-weight:800; color:#7EC8E3; }
        .stat-l { font-size:13px; color:rgba(255,255,255,.45); font-weight:600; margin-top:4px; }

        .section { padding:80px 28px; }
        .section-dark { background:#060f1d; }
        .section-mid { background:#0A1628; }
        .sec-inner { max-width:1100px; margin:0 auto; }
        .sec-label { display:inline-flex; align-items:center; gap:7px; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#1565A8; margin-bottom:12px; }
        .sec-label-dot { width:6px; height:6px; border-radius:50%; background:#FF6B2B; display:inline-block; }
        .sec-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(26px,3.5vw,40px); font-weight:800; color:#0A1628; margin-bottom:14px; }
        .sec-title-light { color:#fff; }
        .sec-sub { font-size:16px; color:rgba(10,22,40,.5); max-width:560px; }
        .sec-sub-light { color:rgba(255,255,255,.5); }

        .feat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:48px; }
        .feat-card {
          background:#fff; border:1px solid rgba(10,22,40,.08); border-radius:14px;
          padding:24px 20px; transition:all .2s;
        }
        .feat-card:hover { border-color:rgba(21,101,168,.25); box-shadow:0 8px 32px rgba(10,22,40,.08); transform:translateY(-3px); }
        .feat-icon { font-size:28px; margin-bottom:14px; }
        .feat-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:800; color:#0A1628; margin-bottom:8px; }
        .feat-desc { font-size:13px; color:rgba(10,22,40,.55); line-height:1.6; }

        .uc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:48px; }
        .uc-card {
          background:rgba(255,255,255,.04); border:1px solid rgba(46,158,214,.1);
          border-radius:14px; padding:24px 20px; transition:all .2s;
        }
        .uc-card:hover { border-color:rgba(46,158,214,.3); background:rgba(46,158,214,.06); }
        .uc-icon { font-size:28px; margin-bottom:12px; }
        .uc-label { font-family:'Plus Jakarta Sans',sans-serif; font-size:15px; font-weight:800; color:#fff; margin-bottom:6px; }
        .uc-desc { font-size:13px; color:rgba(255,255,255,.45); line-height:1.6; }

        .cta-sec {
          background:linear-gradient(135deg,#0D2B45,#1565A8);
          padding:80px 28px; text-align:center;
          border-top:1px solid rgba(46,158,214,.2);
        }
        .cta-inner { max-width:700px; margin:0 auto; }
        .cta-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(28px,4vw,44px); font-weight:800; color:#fff; margin-bottom:14px; }
        .cta-sub { font-size:17px; color:rgba(255,255,255,.6); margin-bottom:36px; }

        .built-by {
          background:#0A1628; border:1px solid rgba(46,158,214,.12);
          border-radius:14px; padding:20px 24px; margin-top:48px;
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px;
        }
        .built-by-text { font-size:13px; color:rgba(255,255,255,.45); }
        .built-by-text strong { color:#7EC8E3; }

        @media(max-width:900px) {
          .feat-grid { grid-template-columns:repeat(2,1fr); }
          .uc-grid { grid-template-columns:repeat(2,1fr); }
          .stats-inner { grid-template-columns:repeat(2,1fr); }
          .stat-item { border-right:none; border-bottom:1px solid rgba(46,158,214,.12); padding:16px 0; }
          .stat-item:last-child { border-bottom:none; }
        }
        @media(max-width:580px) {
          .feat-grid, .uc-grid { grid-template-columns:1fr; }
          .stats-inner { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="product-badge">📞 TekDial · AI Voice Platform</div>
          <h1>Never Miss<br/><span>Another Call</span></h1>
          <p className="hero-sub">AI-powered voice receptionist that answers every call, books appointments, runs outbound campaigns and handles IVR flows — 24/7, HIPAA compliant.</p>
          <div className="hero-tags">
            {['Inbound AI Receptionist','Outbound Calling','Appointment Setting','IVR Flows','HIPAA Compliant','EHR Integration'].map(t=>(
              <span key={t} className="hero-tag">{t}</span>
            ))}
          </div>
          <div className="hero-btns">
            <a href="https://tekdial.csharptek.com" target="_blank" rel="noopener noreferrer" className="btn-primary">Visit TekDial →</a>
            <Link href="/contact" className="btn-ghost">Book a Demo</Link>
          </div>
        </div>
      </section>

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
      <section className="section">
        <div className="sec-inner">
          <div className="sec-label"><span className="sec-label-dot"/>Everything TekDial Does</div>
          <h2 className="sec-title">Built for High-Volume<br/>Healthcare & Business Calls</h2>
          <p className="sec-sub">Every feature designed to reduce staff burden and improve caller experience.</p>
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
          <div className="sec-label" style={{color:'#7EC8E3'}}><span className="sec-label-dot"/>Who Uses TekDial</div>
          <h2 className="sec-title sec-title-light">Works Across Every<br/>Customer-Facing Business</h2>
          <p className="sec-sub sec-sub-light">From single-location clinics to enterprise call centres.</p>
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
          <div style={{fontSize:40,marginBottom:16}}>📞</div>
          <h2 className="cta-title">Ready to Automate Your Calls?</h2>
          <p className="cta-sub">Visit TekDial and see how your clinic or business can run on AI voice — 24/7, zero missed calls.</p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://tekdial.csharptek.com" target="_blank" rel="noopener noreferrer" className="btn-primary">Visit TekDial →</a>
            <Link href="/contact" className="btn-ghost">Talk to Us</Link>
          </div>
          <div className="built-by">
            <span className="built-by-text">Built by <strong>CSharpTek</strong> — AI-first software development since 2016</span>
            <div style={{display:'flex',gap:10}}>
              <Link href="/industries/healthcare" style={{fontSize:12,fontWeight:700,color:'#FF6B2B',textDecoration:'none'}}>Healthcare AI →</Link>
              <Link href="/services/ai-voice" style={{fontSize:12,fontWeight:700,color:'#FF6B2B',textDecoration:'none'}}>AI Voice Services →</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
