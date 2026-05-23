import Head from 'next/head'
import { useState, useRef } from 'react'
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'
import { track } from '../lib/analytics'
const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), { ssr: false })

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Mulish',-apple-system,sans-serif;background:#0A1628;color:#fff;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;}
  .lbl-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;flex-shrink:0;display:inline-block;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}.d4{transition-delay:.28s;}

  .ct-hero{background:linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%);padding:100px 28px 72px;text-align:center;position:relative;overflow:hidden;}
  .ct-hero-orb{position:absolute;border-radius:50%;pointer-events:none;}
  .ct-inner{max-width:1100px;margin:0 auto;}
  .ct-eye{display:inline-flex;align-items:center;gap:8px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.25);border-radius:100px;padding:7px 16px;margin-bottom:22px;}
  .ct-eye span{font-size:12px;font-weight:700;color:#FF6B2B;letter-spacing:.1em;text-transform:uppercase;}
  .ct-h1{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-weight:800;font-size:clamp(34px,5vw,60px);color:#fff;line-height:1.1;letter-spacing:-.03em;margin-bottom:16px;}
  .ct-sub{font-size:clamp(15px,1.5vw,18px);color:rgba(255,255,255,.5);line-height:1.75;max-width:520px;margin:0 auto;}

  .ct-main{max-width:1100px;margin:0 auto;padding:72px 28px 96px;display:grid;grid-template-columns:1fr 1.35fr;gap:56px;align-items:start;}
  @media(max-width:860px){.ct-main{grid-template-columns:1fr;gap:44px;}}

  .ct-info-lbl{font-size:11px;font-weight:700;color:#7EC8E3;letter-spacing:.12em;text-transform:uppercase;margin-bottom:22px;}
  .ct-info-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:800;color:#fff;line-height:1.2;margin-bottom:28px;}

  .ct-channels{display:flex;flex-direction:column;gap:14px;margin-bottom:36px;}
  .ct-ch{display:flex;align-items:flex-start;gap:16px;padding:18px 20px;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.12);border-radius:14px;transition:all .25s;text-decoration:none;}
  .ct-ch:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.05);transform:translateX(4px);}
  .ct-ch-ic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
  .ct-ch-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;}
  .ct-ch-s{font-size:12px;color:rgba(255,255,255,.4);line-height:1.5;}
  .ct-ch-v{font-size:13px;font-weight:600;color:#7EC8E3;margin-top:4px;}

  .ct-resp{background:rgba(46,158,214,.06);border:1px solid rgba(46,158,214,.14);border-radius:14px;padding:18px 20px;margin-bottom:32px;}
  .ct-resp-t{font-size:13px;font-weight:700;color:#7EC8E3;margin-bottom:4px;}
  .ct-resp-s{font-size:12px;color:rgba(255,255,255,.4);line-height:1.55;}

  .ct-badges{display:flex;flex-wrap:wrap;gap:9px;}
  .ct-badge{display:flex;align-items:center;gap:7px;padding:7px 13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:8px;font-size:11px;font-weight:700;color:rgba(255,255,255,.55);}

  .ct-form-wrap{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.14);border-radius:20px;padding:36px 32px;}
  @media(max-width:580px){.ct-form-wrap{padding:24px 18px;}}
  .ct-form-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#fff;margin-bottom:4px;}
  .ct-form-s{font-size:13px;color:rgba(255,255,255,.38);margin-bottom:28px;}

  .ct-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  @media(max-width:580px){.ct-row{grid-template-columns:1fr;}}
  .ct-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
  .ct-lbl{font-size:11px;font-weight:700;color:rgba(255,255,255,.5);letter-spacing:.05em;text-transform:uppercase;}
  .ct-inp{background:rgba(255,255,255,.05);border:1.5px solid rgba(46,158,214,.15);border-radius:10px;padding:12px 15px;font-size:14px;color:#fff;font-family:'Mulish',sans-serif;outline:none;transition:border-color .2s;}
  .ct-inp:focus{border-color:rgba(46,158,214,.5);}
  .ct-inp::placeholder{color:rgba(255,255,255,.22);}
  .ct-ta{resize:vertical;min-height:110px;}
  .ct-sel{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237EC8E3' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:38px;cursor:pointer;}
  .ct-sel option{background:#0D2B45;color:#fff;}

  .ct-submit{width:100%;padding:15px;background:linear-gradient(135deg,#FF6B2B,#e55a1f);border:none;border-radius:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#fff;cursor:pointer;transition:all .2s;margin-top:8px;box-shadow:0 8px 24px rgba(255,107,43,.3);}
  .ct-submit:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(255,107,43,.4);}
  .ct-submit:disabled{opacity:.5;cursor:not-allowed;transform:none;}
  .ct-note{font-size:11px;color:rgba(255,255,255,.28);text-align:center;margin-top:12px;line-height:1.6;}

  .ct-success{text-align:center;padding:32px 16px;}
  .ct-suc-ic{font-size:52px;margin-bottom:14px;}
  .ct-suc-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#22c55e;margin-bottom:10px;}
  .ct-suc-s{font-size:14px;color:rgba(255,255,255,.5);line-height:1.7;}

  .ct-faq{background:#060f1d;padding:72px 28px;}
  .ct-faq-inner{max-width:720px;margin:0 auto;}
  .ct-faq-hd{text-align:center;margin-bottom:40px;}
  .ct-faq-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(24px,3vw,36px);font-weight:800;color:#fff;margin-bottom:10px;}
  .faq-item{border-bottom:1px solid rgba(46,158,214,.1);padding:20px 0;}
  .faq-q{display:flex;align-items:center;justify-content:space-between;cursor:pointer;gap:12px;}
  .faq-qt{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;}
  .faq-icon{font-size:18px;color:#7EC8E3;flex-shrink:0;transition:transform .2s;}
  .faq-icon.open{transform:rotate(45deg);}
  .faq-a{font-size:13px;color:rgba(255,255,255,.5);line-height:1.75;margin-top:12px;display:none;}
  .faq-a.open{display:block;}
`

const CHANNELS = [
  { ic: '📧', bg: 'rgba(46,158,214,.12)', t: 'Email Us', s: 'Best for project briefs and detailed queries', v: 'info@csharptek.com', href: 'mailto:info@csharptek.com' },
  { ic: '💬', bg: 'rgba(34,197,94,.1)', t: 'WhatsApp', s: 'Quick questions and fast responses', v: '+91 92290 69558', href: 'https://wa.me/919229069558' },
  { ic: '📅', bg: 'rgba(255,107,43,.1)', t: 'Book a Call', s: 'Free 30-min discovery call — no obligation', v: 'Schedule via Microsoft Bookings', href: 'https://outlook.office.com/book/BookMeetingwithBhanuGupta@csharptek.com' },
  { ic: '💼', bg: 'rgba(139,92,246,.1)', t: 'LinkedIn', s: 'Connect professionally', v: 'linkedin.com/company/csharptek', href: 'https://in.linkedin.com/company/csharptek' },
  { ic: '📘', bg: 'rgba(24,119,242,.1)', t: 'Facebook', s: 'Follow us for updates', v: 'facebook.com/csharptek', href: 'https://www.facebook.com/csharptek/' },
  { ic: '📸', bg: 'rgba(225,48,108,.1)', t: 'Instagram', s: 'Behind the scenes & team culture', v: '@csharptekofficial', href: 'https://instagram.com/csharptekofficial' },
]

const FAQS = [
  { q: 'How quickly do you respond?', a: 'We respond to all inquiries within 24 hours on business days. For urgent matters, WhatsApp is fastest.' },
  { q: 'Do you work with clients outside India?', a: 'Yes — we work with clients across the US, UK, Australia and the Middle East. Most of our client relationships are fully remote.' },
  { q: 'What information should I include in my message?', a: 'A brief description of your project, your industry, rough timeline and budget range helps us give you a useful first response.' },
  { q: 'Is the first consultation really free?', a: 'Yes, completely. We spend 30 minutes understanding your goals and give you an honest assessment — no sales pressure.' },
  { q: 'Do you sign NDAs before discussing project details?', a: 'Absolutely. We sign NDAs before any detailed technical or business discussions. Just ask.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', service: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const formStarted = useRef(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleFocus = () => {
    if (!formStarted.current) {
      formStarted.current = true
      track.formStart()
    }
  }

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        track.formSubmit(form.service || 'not selected')
      } else {
        alert('Failed to send. Please email info@csharptek.com directly.')
      }
    } catch {
      alert('Network error. Please email info@csharptek.com directly.')
    }
    setSending(false)
  }

  return (
    <Layout>
      <Head>
        <title>Contact CSharpTek — AI Software Development Inquiry</title>
        <meta name="description" content="Get in touch with CSharpTek. Free consultation for AI integration, web & mobile development, cloud architecture and automation projects." />
        <link rel="canonical" href="https://www.csharptek.com/contact" />
        <meta property="og:title" content="Contact CSharpTek — Start Your AI Project" />
        <meta property="og:description" content="Free consultation for AI, cloud and software development projects. Reply within 24 hours." />
        <meta property="og:url" content="https://www.csharptek.com/contact" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact CSharpTek',
          url: 'https://www.csharptek.com/contact',
          description: 'Contact CSharpTek for AI software development, cloud architecture and automation projects.',
          mainEntity: {
            '@type': 'Organization',
            name: 'CSharpTek',
            email: 'info@csharptek.com',
            url: 'https://www.csharptek.com',
            areaServed: ['IN', 'US', 'GB', 'AU'],
          }
        })}} />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: S }} />

      <section className="ct-hero">
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(21,101,168,.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,43,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div className="ct-inner">
          <div className="ct-eye rv"><span>Let&apos;s Talk</span></div>
          <h1 className="ct-h1 rv">Start a <span style={{ background: 'linear-gradient(135deg,#FF6B2B,#ffaa80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Conversation</span></h1>
          <p className="ct-sub rv">Tell us what you&apos;re building. We&apos;ll tell you exactly how we can help — and give you an honest assessment, for free.</p>
        </div>
      </section>

      <div style={{ background: '#0A1628' }}>
        <div className="ct-main">

          {/* LEFT */}
          <div>
            <div className="ct-info-lbl rv">Get in Touch</div>
            <h2 className="ct-info-t rv">We reply within<br /><span style={{ color: '#FF6B2B' }}>24 hours.</span></h2>

            <div className="ct-channels rv d1">
              {CHANNELS.map(c => (
                <a key={c.t} href={c.href} className="ct-ch" target="_blank" rel="noopener noreferrer"
                  onClick={() => track.contactChannel(c.t)}>
                  <div className="ct-ch-ic" style={{ background: c.bg }}>{c.ic}</div>
                  <div>
                    <div className="ct-ch-t">{c.t}</div>
                    <div className="ct-ch-s">{c.s}</div>
                    <div className="ct-ch-v">{c.v}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="ct-resp rv d2">
              <div className="ct-resp-t">🕐 Response Commitment</div>
              <div className="ct-resp-s">All project inquiries get a detailed, personalised response — not a template. We&apos;ll ask the right questions to understand your goals before suggesting anything.</div>
            </div>

            <div className="ct-badges rv d3">
              {['HIPAA Ready', 'NDA on Request', 'US/UK Clients', 'NASSCOM Member', 'Microsoft Partner'].map(b => (
                <div key={b} className="ct-badge">✓ {b}</div>
              ))}
            </div>

            <div style={{ marginTop: 28, padding: '18px 20px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(46,158,214,.1)', borderRadius: 14 }} className="rv d4">
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.35)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Office</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', lineHeight: 1.7 }}>
                <strong style={{ color: '#fff' }}>Ranchi, India</strong><br />
                Headquarters &amp; Engineering<br />
                <span style={{ color: 'rgba(255,255,255,.35)' }}>Jharkhand 834001</span>
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="ct-form-wrap rv d2">
            {sent ? (
              <div className="ct-success">
                <div className="ct-suc-ic">✅</div>
                <div className="ct-suc-t">Message Sent!</div>
                <p className="ct-suc-s">Thank you for reaching out. We&apos;ll review your message and get back to you within 24 hours with a detailed response.</p>
              </div>
            ) : (
              <>
                <div className="ct-form-t">Send Us a Message</div>
                <div className="ct-form-s">Fill in the details below and we&apos;ll be in touch shortly.</div>

                <div className="ct-row">
                  <div className="ct-field">
                    <label className="ct-lbl">Name *</label>
                    <input className="ct-inp" placeholder="Your full name" value={form.name}
                      onChange={e => set('name', e.target.value)} onFocus={handleFocus} />
                  </div>
                  <div className="ct-field">
                    <label className="ct-lbl">Email *</label>
                    <input className="ct-inp" type="email" placeholder="you@company.com" value={form.email}
                      onChange={e => set('email', e.target.value)} onFocus={handleFocus} />
                  </div>
                </div>

                <div className="ct-row">
                  <div className="ct-field">
                    <label className="ct-lbl">Company</label>
                    <input className="ct-inp" placeholder="Company name" value={form.company}
                      onChange={e => set('company', e.target.value)} onFocus={handleFocus} />
                  </div>
                  <div className="ct-field">
                    <label className="ct-lbl">Phone</label>
                    <input className="ct-inp" placeholder="+1 (555) 000-0000" value={form.phone}
                      onChange={e => set('phone', e.target.value)} onFocus={handleFocus} />
                  </div>
                </div>

                <div className="ct-row">
                  <div className="ct-field">
                    <label className="ct-lbl">Reason for Contact</label>
                    <select className="ct-inp ct-sel" value={form.service}
                      onChange={e => set('service', e.target.value)} onFocus={handleFocus}>
                      <option value="">Select a reason</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Project Consultation">Project Consultation (Free)</option>
                      <option value="Career / Job Application">Career / Job Application</option>
                      <option value="Partnership">Partnership / Collaboration</option>
                      <option value="Support / Existing Client">Support / Existing Client</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-lbl">Tell Us About Your Project *</label>
                  <textarea className="ct-inp ct-ta" placeholder="Describe your project, goals, timeline and any specific requirements…"
                    value={form.message} onChange={e => set('message', e.target.value)} onFocus={handleFocus} />
                </div>

                <button className="ct-submit" disabled={sending || !form.name || !form.email || !form.message} onClick={submit}>
                  {sending ? 'Sending…' : 'Send Message →'}
                </button>
                <p className="ct-note">By submitting you agree to our Privacy Policy. We never share your data with third parties.</p>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="ct-faq">
        <div className="ct-faq-inner">
          <div className="ct-faq-hd rv">
            <div className="lbl" style={{ color: '#7EC8E3', justifyContent: 'center' }}><span className="lbl-dot" />Common Questions</div>
            <div className="ct-faq-t">Before You Reach Out</div>
          </div>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item rv">
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="faq-qt">{f.q}</span>
                <span className={`faq-icon${openFaq === i ? ' open' : ''}`}>+</span>
              </div>
              <div className={`faq-a${openFaq === i ? ' open' : ''}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <ScrollToTop />
    </Layout>
  )
}
