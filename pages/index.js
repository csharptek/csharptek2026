import Head from 'next/head'
import { useEffect } from 'react'
import Nav      from '../components/Nav'
import Hero     from '../components/Hero'
import Chatbot  from '../components/Chatbot'

/* ── Inline section components (kept in one file for simplicity) ──
   You can extract each into its own file in /components as the project grows. */

// ── Trust Bar ──
function TrustBar() {
  const logos = [
    { icon:'☁️', name:'Microsoft Azure' }, { icon:'🟠', name:'AWS' },
    { icon:'🔵', name:'Google Cloud' },    { icon:'🤖', name:'OpenAI' },
    { icon:'⚡', name:'Claude' },           { icon:'🐙', name:'GitHub Copilot' },
    { icon:'📞', name:'Twilio' },           { icon:'🎙️', name:'ElevenLabs' },
    { icon:'📊', name:'HubSpot' },          { icon:'⚛️', name:'React / Next.js' },
    { icon:'🔷', name:'.NET Core' },        { icon:'🐳', name:'Docker / K8s' },
    { icon:'🗄️', name:'Supabase' },         { icon:'🎨', name:'Figma' },
  ]
  const badges = [
    { icon:'🔷', name:'Microsoft Azure', level:'Cloud Partner' },
    { icon:'🟠', name:'AWS Partner',     level:'Network Member' },
    { icon:'🔵', name:'Google Cloud',    level:'Partner' },
    { icon:'🤖', name:'OpenAI',          level:'API Partner' },
    { icon:'🏥', name:'HIPAA Compliant', level:'Healthcare Ready' },
  ]
  return (
    <section style={{background:'#060f1d',padding:'28px 0',borderBottom:'1px solid rgba(46,158,214,.08)'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div className="reveal" style={{display:'flex',alignItems:'center',gap:16,marginBottom:18}}>
          <p style={{fontSize:11,color:'rgba(255,255,255,.35)',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',whiteSpace:'nowrap'}}>Trusted Technology Ecosystem</p>
          <div style={{flex:1,height:1,background:'rgba(255,255,255,.07)'}} />
        </div>
        <div className="reveal" style={{overflow:'hidden',position:'relative'}}>
          <div style={{position:'absolute',top:0,bottom:0,left:0,width:70,background:'linear-gradient(to right,#060f1d,transparent)',zIndex:2}} />
          <div style={{position:'absolute',top:0,bottom:0,right:0,width:70,background:'linear-gradient(to left,#060f1d,transparent)',zIndex:2}} />
          <div style={{display:'flex',alignItems:'center',gap:36,animation:'scrollLogos 28s linear infinite',width:'max-content'}}>
            {[...logos,...logos].map((l,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:7,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',borderRadius:8,padding:'9px 14px',whiteSpace:'nowrap'}}>
                <span style={{fontSize:16}}>{l.icon}</span>
                <span style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,.55)',letterSpacing:'.03em'}}>{l.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginTop:16,paddingTop:16,borderTop:'1px solid rgba(255,255,255,.05)',flexWrap:'wrap'}}>
          {badges.map(b => (
            <div key={b.name} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 16px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:9}}>
              <span style={{fontSize:18}}>{b.icon}</span>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:'#fff'}}>{b.name}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,.35)'}}>{b.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Services ──
const SERVICES = [
  { icon:'🧠', title:'AI Integration & Automation',  desc:'Embed AI into your workflows — intelligent document processing, medical scribes and full business automation.',          tags:['OpenAI','Claude','Azure AI','LangChain'] },
  { icon:'🎙️', title:'AI Voice Agents',               desc:'Inbound & outbound voice AI, SMS, appointment setters and lead qualifiers — powered by ElevenLabs, VAPI & Twilio.', tags:['ElevenLabs','VAPI','Twilio'] },
  { icon:'📱', title:'Web & Mobile Development',      desc:'Full-stack web and mobile apps using React, Next.js, React Native, .NET Core and Blazor — built for performance.',    tags:['React','Next.js','React Native','.NET'] },
  { icon:'☁️', title:'Cloud Infrastructure & DevOps', desc:'Azure, AWS & GCP architecture, Docker, Kubernetes, CI/CD pipelines and multi-cloud deployments.',                     tags:['Azure','AWS','Kubernetes','DevOps'] },
  { icon:'🚀', title:'MVP & Vibe Coding',             desc:'Launch your idea in 4–8 weeks using AI-assisted vibe coding with Cursor, Lovable and Base44.',                        tags:['Cursor','Lovable','Replit','Vercel'] },
  { icon:'🛒', title:'Marketplace Publishing',        desc:'We publish production-ready software on Azure, AWS and Google Marketplaces — all offer types, enterprise-ready.',     tags:['Azure Marketplace','AWS','GCP'] },
]
function Services() {
  return (
    <section style={{background:'#F0F8FF',padding:'96px 0'}} id="services">
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div className="reveal" style={{textAlign:'center',marginBottom:52}}>
          <div className="section-label" style={{color:'#1565A8',justifyContent:'center'}}><span className="dot"/>What We Do</div>
          <h2 className="section-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#0A1628',marginBottom:14}}>End-to-End Software &amp; AI Services</h2>
          <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:500,margin:'0 auto'}}>From MVP to enterprise — we build, integrate and scale intelligent software across every layer of your business.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
          {SERVICES.map((s,i) => (
            <div key={s.title} className={`reveal rd${(i%6)+1}`} style={{background:'#fff',border:'1px solid rgba(21,101,168,.1)',borderRadius:16,padding:'30px 26px',transition:'all .3s',cursor:'pointer'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 24px 56px rgba(21,101,168,.12)';e.currentTarget.style.borderColor='rgba(46,158,214,.3)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='';e.currentTarget.style.borderColor='rgba(21,101,168,.1)'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
                <div style={{width:50,height:50,borderRadius:13,background:'rgba(21,101,168,.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:23}}>{s.icon}</div>
              </div>
              <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,fontWeight:700,color:'#0A1628',marginBottom:9}}>{s.title}</h3>
              <p style={{fontSize:13,color:'rgba(10,22,40,.52)',lineHeight:1.67}}>{s.desc}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:15}}>
                {s.tags.map(t => <span key={t} style={{fontSize:10,fontWeight:700,color:'#1565A8',background:'rgba(21,101,168,.07)',borderRadius:5,padding:'3px 9px'}}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48}} className="reveal">
          <a href="/services" className="btn-outline">View All 9 Services →</a>
        </div>
      </div>
    </section>
  )
}

// ── Industries ──
const INDUSTRIES = [
  { icon:'🏥', name:'Healthcare',           desc:'HIPAA, EHR/FHIR, Epic, Medical Scribe', bg:'linear-gradient(135deg,#0D2B45,#1565A8)' },
  { icon:'🌸', name:'Wellness & Fertility', desc:'IVF, Fertility Clinics, Women\'s Wellness', bg:'linear-gradient(135deg,#0a2a1e,#0f6e56)' },
  { icon:'🎓', name:'Education & EdTech',   desc:'K-12, Internships, AI Evaluation', bg:'linear-gradient(135deg,#1a1a0a,#7a5a0a)' },
  { icon:'🤖', name:'Marketing & Automation', desc:'HubSpot, GoHighLevel, Apollo', bg:'linear-gradient(135deg,#1a0a1a,#6b2fa0)' },
  { icon:'🛒', name:'Service Marketplaces', desc:'Multi-vendor, Bookings, Payments', bg:'linear-gradient(135deg,#0a1a1a,#0a5a5a)' },
  { icon:'🐾', name:'Pet Care & Wellness',  desc:'Vaccination Kiosk, RFID, Pet Tech', bg:'linear-gradient(135deg,#0a1a0a,#3a6a0a)' },
  { icon:'⚙️', name:'CRM & Productivity',   desc:'Custom CRMs, Internal Tools', bg:'linear-gradient(135deg,#1a0a0a,#8B2a2a)' },
]
function Industries() {
  const cardStyle = {borderRadius:16,overflow:'hidden',cursor:'pointer',aspectRatio:'3/4',position:'relative',transition:'transform .3s'}
  return (
    <section style={{background:'#0D2B45',padding:'96px 0'}} id="industries">
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div className="reveal" style={{textAlign:'center',marginBottom:52}}>
          <div className="section-label" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="dot"/>Industries We Serve</div>
          <h2 className="section-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:14}}>Built for Your Specific Industry</h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.5)',maxWidth:500,margin:'0 auto'}}>Every solution is designed around the compliance, workflows and unique challenges of your sector.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18}}>
          {INDUSTRIES.slice(0,4).map((ind,i) => (
            <div key={ind.name} className={`reveal rd${i+1}`} style={cardStyle}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-6px)'}
              onMouseLeave={e=>e.currentTarget.style.transform=''}>
              <div style={{position:'absolute',inset:0,background:ind.bg}} />
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,22,40,.95) 0%,rgba(10,22,40,.4) 55%,rgba(10,22,40,.15) 100%)'}} />
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'22px 18px'}}>
                <div style={{width:42,height:42,borderRadius:11,background:'rgba(46,158,214,.22)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:11,fontSize:21}}>{ind.icon}</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#fff',marginBottom:5}}>{ind.name}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,.55)',lineHeight:1.45}}>{ind.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginTop:18}}>
          {INDUSTRIES.slice(4).map((ind,i) => (
            <div key={ind.name} className={`reveal rd${i+3}`} style={cardStyle}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-6px)'}
              onMouseLeave={e=>e.currentTarget.style.transform=''}>
              <div style={{position:'absolute',inset:0,background:ind.bg}} />
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,22,40,.95) 0%,rgba(10,22,40,.4) 55%,rgba(10,22,40,.15) 100%)'}} />
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'22px 18px'}}>
                <div style={{width:42,height:42,borderRadius:11,background:'rgba(46,158,214,.22)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:11,fontSize:21}}>{ind.icon}</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#fff',marginBottom:5}}>{ind.name}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,.55)',lineHeight:1.45}}>{ind.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:44}} className="reveal">
          <a href="/industries" className="btn-ghost">Explore All Industries →</a>
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ──
function CTABanner() {
  return (
    <section style={{background:'linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%)',padding:'96px 28px',textAlign:'center',position:'relative',overflow:'hidden'}} id="contact">
      <div style={{position:'absolute',top:-80,left:'50%',transform:'translateX(-50%)',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%)',pointerEvents:'none'}} />
      <div className="reveal" style={{maxWidth:680,margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.14)',borderRadius:100,padding:'6px 18px',fontSize:10,fontWeight:700,letterSpacing:'.13em',textTransform:'uppercase',color:'rgba(255,255,255,.65)',marginBottom:22}}>⚡ Let's Build Something Smarter</div>
        <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(30px,5vw,56px)',fontWeight:800,color:'#fff',marginBottom:16,lineHeight:1.08,letterSpacing:'-.025em'}}>
          Ready to Transform Your Business<br />with <span style={{background:'linear-gradient(90deg,#FF6B2B,#ffaa80)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>AI?</span>
        </h2>
        <p style={{fontSize:17,color:'rgba(255,255,255,.56)',lineHeight:1.7,marginBottom:38}}>From a quick MVP to a full enterprise AI rollout — we'll scope it, build it and support it. Your first consultation is completely free.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:36}}>
          <a href="mailto:hello@csharptek.com" className="btn-primary">Book a Free Consultation →</a>
          <a href="#portfolio" style={{background:'rgba(255,255,255,.07)',color:'#fff',padding:'15px 34px',borderRadius:10,textDecoration:'none',fontWeight:600,fontSize:15,border:'1.5px solid rgba(255,255,255,.18)',transition:'all .2s',display:'inline-block'}}>View Our Work</a>
        </div>
        <div style={{display:'flex',gap:22,justifyContent:'center',flexWrap:'wrap'}}>
          {['No obligation','Reply within 24 hours','HIPAA-ready','24/7 support'].map(t => (
            <span key={t} style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,.45)',fontWeight:600}}>
              <span style={{color:'#7EC8E3'}}>✓</span>{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Footer ──
function Footer() {
  const handleSubscribe = () => {
    const el = document.getElementById('footerEmail')
    if (el?.value?.includes('@')) { el.value=''; el.placeholder='✅ Subscribed! Welcome to The AI Edge.'; setTimeout(()=>el.placeholder='your@email.com',3000) }
  }
  return (
    <footer style={{background:'#060f1d',padding:'72px 0 0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:44,paddingBottom:52,borderBottom:'1px solid rgba(255,255,255,.05)'}}>
          <div>
            <a href="/" style={{display:'flex',alignItems:'center',gap:3,marginBottom:14,textDecoration:'none'}}>
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:19,background:'linear-gradient(135deg,#2E9ED6,#7EC8E3)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>C#</span>
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:19,color:'#fff'}}>harpTek</span>
            </a>
            <p style={{fontSize:13,color:'rgba(255,255,255,.36)',lineHeight:1.68,marginBottom:20,maxWidth:270}}>AI-first software development across healthcare, education, wellness, automation and more.</p>
            <div style={{display:'flex',gap:9,marginBottom:18}}>
              {['💼','🐙','🐦','▶️'].map(i => <a key={i} href="#" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,textDecoration:'none'}}>{i}</a>)}
            </div>
            <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(46,158,214,.1)',borderRadius:13,padding:18}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:'#fff',marginBottom:4}}>📧 The AI Edge Newsletter</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.36)',marginBottom:13}}>Bi-weekly AI insights. No spam.</div>
              <div style={{display:'flex',gap:7}}>
                <input id="footerEmail" type="email" placeholder="your@email.com" style={{flex:1,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.09)',borderRadius:7,padding:'9px 12px',fontSize:12,color:'#fff',fontFamily:"'Mulish',sans-serif",outline:'none'}} />
                <button onClick={handleSubscribe} style={{background:'#FF6B2B',color:'#fff',border:'none',padding:'9px 14px',borderRadius:7,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:"'Mulish',sans-serif"}}>Subscribe</button>
              </div>
            </div>
          </div>
          {[
            { title:'Services',   links:['AI Integration','AI Voice Agents','Web & Mobile Dev','Cloud & DevOps','MVP & Vibe Coding','Prompt Engineering','24/7 Support'] },
            { title:'Industries', links:['Healthcare','Wellness & Fertility','Education','Marketing','Marketplaces','Pet Care','CRM & Productivity'] },
            { title:'Company',    links:['About Us','Portfolio','Blog','Careers','Partners','Marketplace','Contact'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>{col.title}</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {col.links.map(l => <li key={l}><a href="#" style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{l}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Contact</h4>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
              {['📧 hello@csharptek.com','💬 WhatsApp Us','📅 Book a Call','🔒 HIPAA Policy','📄 Privacy Policy'].map(l => <li key={l}><a href="#" style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{l}</a></li>)}
            </ul>
            <div style={{marginTop:18,padding:'11px 13px',background:'rgba(255,107,43,.07)',border:'1px solid rgba(255,107,43,.17)',borderRadius:9}}>
              <div style={{fontSize:10,fontWeight:700,color:'#FF6B2B',marginBottom:3}}>🕐 Response Time</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.38)'}}>We reply within 24 hours.</div>
            </div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0',flexWrap:'wrap',gap:10}}>
          <span style={{fontSize:11,color:'rgba(255,255,255,.28)'}}>© 2025 CSharpTek. All rights reserved.</span>
          <div style={{display:'flex',gap:18}}>
            {['Privacy','HIPAA','Terms','Sitemap'].map(l => <a key={l} href="#" style={{fontSize:11,color:'rgba(255,255,255,.28)',textDecoration:'none'}}>{l}</a>)}
          </div>
          <span style={{fontSize:10,color:'rgba(255,255,255,.22)',fontWeight:600}}>⚡ Built with AI · CSharpTek</span>
        </div>
      </div>
    </footer>
  )
}

// ── Main Page ──
export default function Home() {
  // Scroll reveal observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, {threshold: 0.08})
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>CSharpTek — AI-First Software Development</title>
      </Head>

      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <Industries />

      {/* ── Why CSharpTek, Portfolio, Tech, Testimonials, Blog, Quiz ──
          These sections are included from the static HTML for now.
          Extract each into its own component as the project grows.
          The full markup is in /public/homepage-sections.html for reference. */}

      <CTABanner />
      <Footer />
      <Chatbot />
    </>
  )
}
