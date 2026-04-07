import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
const ScrollToTop = dynamic(() => import('../../components/ScrollToTop'), { ssr: false })

const CASE_STUDIES = [
  {
    id: 'ai-medical-scribe',
    emoji: '🩺',
    bg: 'linear-gradient(135deg,#0A2540,#1565A8)',
    cat: 'healthcare',
    label: 'Healthcare AI',
    labelColor: '#7EC8E3',
    labelBg: 'rgba(126,200,227,.12)',
    t: 'AI Medical Scribe Platform',
    d: 'Voice-to-SOAP documentation with real-time clinical knowledge engine. Multi-channel encounter support, ICD-10/CPT coding, EHR integration, and automated referral letters. HIPAA & GDPR compliant.',
    stk: ['Azure OpenAI', 'React', 'React Native', 'Node.js', '.NET', 'Azure AI'],
    metrics: [
      { value: '70%', label: 'Less time on documentation' },
      { value: 'Real-time', label: 'Speech-to-SOAP generation' },
      { value: 'HIPAA', label: 'GDPR compliant architecture' },
      { value: 'Multi-channel', label: 'In-person, video & phone' },
    ],
    tags: ['ICD-10 & CPT coding', 'Referral automation', 'EHR integration', 'Dot phrase support', 'Magic Edit AI'],
    featured: true,
  },
  {
    id: 'multilingual-scribe',
    emoji: '🌍',
    bg: 'linear-gradient(135deg,#1a0a2e,#6B2FA0)',
    cat: 'healthcare',
    label: 'Healthcare AI',
    labelColor: '#e0a0ff',
    labelBg: 'rgba(180,80,220,.12)',
    t: 'Bilingual AI Scribe — Middle East',
    d: 'Arabic + English mixed-language clinical documentation for Saudi healthcare providers. Supports Najdi, Hijazi and Khaleeji dialects. PDPL & SeHE compliant with HIPAA-grade security.',
    stk: ['Azure AI', 'React', '.NET', 'Node.js', 'Azure OpenAI'],
    metrics: [
      { value: '70%', label: 'Reduction in documentation time' },
      { value: 'PDPL', label: 'Saudi & SeHE compliant' },
      { value: '3+', label: 'Arabic dialect support' },
      { value: '6', label: 'Specialty template groups' },
    ],
    tags: ['Bilingual NLP', 'Specialty templates', 'End-to-end encryption', 'PDPL compliant', 'Dialect-aware AI'],
    featured: true,
  },
  {
    id: 'ai-receptionist',
    emoji: '📞',
    bg: 'linear-gradient(135deg,#0A2A1A,#1A6B3A)',
    cat: 'automation',
    label: 'Healthcare Automation',
    labelColor: '#90e0a0',
    labelBg: 'rgba(60,160,80,.12)',
    t: 'AI Receptionist for Healthcare Clinics',
    d: 'Full-stack AI agent replacing front-desk operations entirely. Handles unlimited concurrent calls, books and cancels appointments, sends automated SMS/voice reminders, and routes complex cases to staff — HIPAA compliant.',
    stk: ['Twilio', 'LLMs', 'STT / TTS', 'Node.js', 'Python', 'AWS / Azure'],
    metrics: [
      { value: '60–90%', label: 'Cost reduction vs in-house staff' },
      { value: 'Unlimited', label: 'Concurrent calls handled' },
      { value: 'HIPAA', label: 'Certified architecture' },
      { value: '24/7', label: 'Coverage — no gaps' },
    ],
    tags: ['Voice AI', 'EHR / CRM integration', 'Automated reminders', 'Multilingual', 'Analytics dashboard'],
    featured: true,
  },
  {
    id: 'fax-to-ai',
    emoji: '⚡',
    bg: 'linear-gradient(135deg,#2A1A00,#A05A00)',
    cat: 'automation',
    label: 'Healthcare Automation',
    labelColor: '#ffcc80',
    labelBg: 'rgba(255,180,0,.12)',
    t: 'Fax-to-AI Healthcare Automation',
    d: 'Transformed a fax-driven wound care business into a fully automated AI platform. OCR extracts patient referral data, AI matches and dispatches nurses, QR-tracked inventory, and automated billing documentation.',
    stk: ['Next.js', 'Django', 'PostgreSQL', 'Claude API', 'OCR', 'AWS', 'Redis'],
    metrics: [
      { value: '90%', label: 'Faster dispatch (25 min → <3 min)' },
      { value: '70%', label: 'Faster staff onboarding' },
      { value: '100%', label: 'Inventory visibility' },
      { value: '0', label: 'HIPAA violations since go-live' },
    ],
    tags: ['OCR + AI', 'Smart nurse matching', 'Billing automation', 'QR inventory', 'Slack notifications'],
    featured: false,
  },
  {
    id: 'pet-health-platform',
    emoji: '🐾',
    bg: 'linear-gradient(135deg,#0A1A2A,#2E6EA6)',
    cat: 'other',
    label: 'Veterinary',
    labelColor: '#7EC8E3',
    labelBg: 'rgba(46,158,214,.12)',
    t: 'Cloud-Native Pet Vaccine Camp Platform',
    d: 'Azure-powered dual-app platform for weekend pet vaccination camps. Pet owner app for appointment scheduling, medical history and virtual consultations. Workforce app for real-time inventory, internal messaging and task coordination.',
    stk: ['Blazor', '.NET Core', 'Azure SQL', 'SignalR', 'Azure Functions', 'Azure AD'],
    metrics: [
      { value: 'Real-time', label: 'Inventory via SignalR' },
      { value: 'WebRTC', label: 'Virtual vet consultations' },
      { value: '2 apps', label: 'Pet owner + staff platform' },
      { value: 'Azure', label: 'Fully cloud-native' },
    ],
    tags: ['Dual-app platform', 'Automated reminders', 'Role-based access', 'Multi-location', 'Virtual consults'],
    featured: false,
  },
]

const FILTERS = [
  ['all', 'All Projects'],
  ['healthcare', 'Healthcare AI'],
  ['automation', 'Automation'],
  ['other', 'Veterinary'],
]

const STYLES = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Mulish',-apple-system,sans-serif;color:#0A1628;background:#0A1628;}
  a{text-decoration:none;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}
  .d4{transition-delay:.28s;}.d5{transition-delay:.35s;}.d6{transition-delay:.42s;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;}
  .lbl-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;flex-shrink:0;display:inline-block;}

  /* HERO */
  .port-hero{background:#0A1628;padding:100px 0 72px;text-align:center;}
  .port-hero-in{max-width:800px;margin:0 auto;padding:0 28px;}
  .port-h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(34px,5vw,60px);font-weight:800;color:#fff;letter-spacing:-.02em;line-height:1.1;margin-bottom:18px;}
  .port-h1 span{background:linear-gradient(135deg,#2E9ED6,#7EC8E3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .port-sub{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;max-width:580px;margin:0 auto 40px;}
  .port-stats{display:flex;gap:40px;justify-content:center;flex-wrap:wrap;margin-top:48px;padding-top:40px;border-top:1px solid rgba(46,158,214,.12);}
  .ps{text-align:center;}
  .ps-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:800;color:#FF6B2B;}
  .ps-l{font-size:12px;color:rgba(255,255,255,.4);font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-top:4px;}

  /* FILTERS */
  .port-filts{background:#0D2B45;padding:28px 0;border-bottom:1px solid rgba(46,158,214,.1);}
  .port-filts-in{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;gap:10px;flex-wrap:wrap;}
  .pfb{padding:10px 22px;border-radius:100px;border:1.5px solid rgba(46,158,214,.2);background:transparent;font-size:13px;font-weight:700;color:rgba(255,255,255,.5);cursor:pointer;transition:all .2s;font-family:'Mulish',sans-serif;}
  .pfb.act,.pfb:hover{background:#1565A8;color:#fff;border-color:#1565A8;}

  /* GRID */
  .port-grid-sec{background:#0D2B45;padding:72px 0 96px;}
  .port-grid-in{max-width:1200px;margin:0 auto;padding:0 28px;}

  /* FEATURED cards (wider) */
  .feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-bottom:28px;}
  .feat-card{border-radius:20px;overflow:hidden;border:1px solid rgba(46,158,214,.15);transition:all .35s;display:flex;flex-direction:column;}
  .feat-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(0,0,0,.4);border-color:rgba(46,158,214,.35);}
  .feat-cover{height:200px;display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0;}
  .feat-emoji{font-size:52px;z-index:1;}
  .feat-badge{position:absolute;top:16px;left:16px;font-size:10px;font-weight:700;padding:4px 12px;border-radius:100px;letter-spacing:.06em;text-transform:uppercase;}
  .feat-body{background:#0A1628;padding:28px;flex:1;display:flex;flex-direction:column;}
  .feat-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#fff;margin-bottom:10px;line-height:1.25;}
  .feat-d{font-size:14px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:20px;flex:1;}
  .feat-stk{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;}
  .feat-tk{font-size:11px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.1);border-radius:5px;padding:3px 9px;}
  .feat-metrics{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:22px;}
  .feat-m{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:10px;padding:12px 14px;}
  .feat-mv{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#FF6B2B;line-height:1;}
  .feat-ml{font-size:11px;color:rgba(255,255,255,.45);margin-top:3px;}
  .feat-tags{display:flex;flex-wrap:wrap;gap:6px;}
  .feat-tag{font-size:10px;color:rgba(255,255,255,.4);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:5px;padding:2px 8px;}

  /* STANDARD cards */
  .std-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
  .std-card{background:#0A1628;border:1px solid rgba(46,158,214,.15);border-radius:16px;overflow:hidden;transition:all .3s;display:flex;flex-direction:column;}
  .std-card:hover{transform:translateY(-5px);box-shadow:0 18px 44px rgba(0,0,0,.35);border-color:rgba(46,158,214,.3);}
  .std-cover{height:140px;display:flex;align-items:center;justify-content:center;position:relative;}
  .std-emoji{font-size:40px;z-index:1;}
  .std-badge{position:absolute;top:12px;left:12px;font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;letter-spacing:.06em;text-transform:uppercase;}
  .std-body{padding:22px;flex:1;display:flex;flex-direction:column;}
  .std-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#fff;margin-bottom:8px;line-height:1.3;}
  .std-d{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:16px;flex:1;}
  .std-stk{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px;}
  .std-tk{font-size:10px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.1);border-radius:4px;padding:2px 8px;}
  .std-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  .std-m{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.08);border-radius:8px;padding:10px 12px;}
  .std-mv{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:800;color:#FF6B2B;}
  .std-ml{font-size:10px;color:rgba(255,255,255,.4);margin-top:2px;}

  /* EMPTY */
  .empty{text-align:center;padding:80px 0;color:rgba(255,255,255,.3);font-size:16px;}

  /* CTA */
  .port-cta{background:#0A1628;padding:96px 0;text-align:center;}
  .port-cta-in{max-width:680px;margin:0 auto;padding:0 28px;}
  .port-cta h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4vw,46px);font-weight:800;color:#fff;margin-bottom:16px;}
  .port-cta h2 span{color:#FF6B2B;}
  .port-cta p{font-size:16px;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:36px;}
  .btn-p{display:inline-block;background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);}
  .btn-s{display:inline-block;background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.35);transition:all .2s;margin-left:12px;}
  .btn-s:hover{border-color:#7EC8E3;transform:translateY(-2px);}

  @media(max-width:900px){
    .feat-grid{grid-template-columns:1fr;}
    .std-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:600px){
    .std-grid{grid-template-columns:1fr;}
    .feat-metrics{grid-template-columns:1fr 1fr;}
  }
`

export default function Portfolio() {
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') })
    }, { threshold: 0.06 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const visible = CASE_STUDIES.filter(c => filter === 'all' || c.cat === filter)
  const featured = visible.filter(c => c.featured)
  const standard = visible.filter(c => !c.featured)

  return (
    <Layout>
      <Head>
        <title>Portfolio & Case Studies — CSharpTek</title>
        <meta name="description" content="Real projects delivered by CSharpTek — AI medical scribes, healthcare automation, voice AI and cloud-native platforms." />
        <style>{STYLES}</style>
      </Head>

      {/* HERO */}
      <section className="port-hero">
        <div className="port-hero-in">
          <div className="rv">
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}>
              <span className="lbl-dot" />Case Studies
            </div>
            <h1 className="port-h1">Real Projects.<br /><span>Measurable Results.</span></h1>
            <p className="port-sub">Production-grade AI and software solutions we have designed, built and deployed — with real metrics from real clients.</p>
          </div>
          <div className="port-stats rv">
            {[
              ['50+', 'Projects Delivered'],
              ['10+', 'Years Experience'],
              ['HIPAA', 'Compliant Builds'],
              ['4', 'Cloud Platforms'],
            ].map(([n, l]) => (
              <div key={l} className="ps">
                <div className="ps-n">{n}</div>
                <div className="ps-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="port-filts">
        <div className="port-filts-in">
          {FILTERS.map(([v, l]) => (
            <button key={v} className={`pfb${filter === v ? ' act' : ''}`} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="port-grid-sec">
        <div className="port-grid-in">
          {visible.length === 0 ? (
            <div className="empty">No projects in this category yet.</div>
          ) : (
            <>
              {featured.length > 0 && (
                <div className="feat-grid">
                  {featured.map((c, i) => (
                    <div key={c.id} className={`feat-card rv d${i + 1}`}>
                      <div className="feat-cover" style={{ background: c.bg }}>
                        <span className="feat-emoji">{c.emoji}</span>
                        <span className="feat-badge" style={{ color: c.labelColor, background: c.labelBg }}>{c.label}</span>
                      </div>
                      <div className="feat-body">
                        <h3 className="feat-t">{c.t}</h3>
                        <p className="feat-d">{c.d}</p>
                        <div className="feat-stk">{c.stk.map(s => <span key={s} className="feat-tk">{s}</span>)}</div>
                        <div className="feat-metrics">
                          {c.metrics.map(m => (
                            <div key={m.label} className="feat-m">
                              <div className="feat-mv">{m.value}</div>
                              <div className="feat-ml">{m.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="feat-tags">{c.tags.map(t => <span key={t} className="feat-tag">{t}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {standard.length > 0 && (
                <div className="std-grid">
                  {standard.map((c, i) => (
                    <div key={c.id} className={`std-card rv d${i + 1}`}>
                      <div className="std-cover" style={{ background: c.bg }}>
                        <span className="std-emoji">{c.emoji}</span>
                        <span className="std-badge" style={{ color: c.labelColor, background: c.labelBg }}>{c.label}</span>
                      </div>
                      <div className="std-body">
                        <h3 className="std-t">{c.t}</h3>
                        <p className="std-d">{c.d}</p>
                        <div className="std-stk">{c.stk.map(s => <span key={s} className="std-tk">{s}</span>)}</div>
                        <div className="std-metrics">
                          {c.metrics.slice(0, 4).map(m => (
                            <div key={m.label} className="std-m">
                              <div className="std-mv">{m.value}</div>
                              <div className="std-ml">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="port-cta">
        <div className="port-cta-in rv">
          <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}>
            <span className="lbl-dot" />Start Your Project
          </div>
          <h2>Ready to Build Something <span>Real?</span></h2>
          <p>Tell us what you need to automate, build or scale. Free discovery call — no obligation.</p>
          <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
          <Link href="/services" className="btn-s">View All Services</Link>
        </div>
      </section>

      <ScrollToTop />
    </Layout>
  )
}
