import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Chatbot from '../components/Chatbot'

/* ─────────────────────────────────────────
   TRUST BAR
───────────────────────────────────────── */
function TrustBar() {
  const logos = [
    {icon:'☁️',name:'Microsoft Azure'},{icon:'🟠',name:'AWS'},{icon:'🔵',name:'Google Cloud'},
    {icon:'🤖',name:'OpenAI'},{icon:'⚡',name:'Claude'},{icon:'🐙',name:'GitHub Copilot'},
    {icon:'📞',name:'Twilio'},{icon:'🎙️',name:'ElevenLabs'},{icon:'📊',name:'HubSpot'},
    {icon:'⚛️',name:'React / Next.js'},{icon:'🔷',name:'.NET Core'},{icon:'🐳',name:'Docker / K8s'},
    {icon:'🗄️',name:'Supabase'},{icon:'🎨',name:'Figma'},
  ]
  const badges = [
    {icon:'🔷',name:'Microsoft Azure',level:'Cloud Partner'},
    {icon:'🟠',name:'AWS Partner',level:'Network Member'},
    {icon:'🔵',name:'Google Cloud',level:'Partner'},
    {icon:'🤖',name:'OpenAI',level:'API Partner'},
    {icon:'🏥',name:'HIPAA Compliant',level:'Healthcare Ready'},
  ]
  return (
    <section style={{background:'#060f1d',padding:'28px 0',borderBottom:'1px solid rgba(46,158,214,.08)'}}>
      <style>{`@keyframes scrollLogos{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:18}}>
          <p style={{fontSize:11,color:'rgba(255,255,255,.35)',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',whiteSpace:'nowrap'}}>Trusted Technology Ecosystem</p>
          <div style={{flex:1,height:1,background:'rgba(255,255,255,.07)'}}/>
        </div>
        <div style={{overflow:'hidden',position:'relative'}}>
          <div style={{position:'absolute',top:0,bottom:0,left:0,width:70,background:'linear-gradient(to right,#060f1d,transparent)',zIndex:2}}/>
          <div style={{position:'absolute',top:0,bottom:0,right:0,width:70,background:'linear-gradient(to left,#060f1d,transparent)',zIndex:2}}/>
          <div style={{display:'flex',alignItems:'center',gap:36,animation:'scrollLogos 28s linear infinite',width:'max-content'}}>
            {[...logos,...logos].map((l,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:7,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',borderRadius:8,padding:'9px 14px',whiteSpace:'nowrap'}}>
                <span style={{fontSize:16}}>{l.icon}</span>
                <span style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,.55)'}}>{l.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginTop:18,paddingTop:16,borderTop:'1px solid rgba(255,255,255,.05)',flexWrap:'wrap'}}>
          {badges.map(b=>(
            <div key={b.name} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 16px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:9}}>
              <span style={{fontSize:18}}>{b.icon}</span>
              <div><div style={{fontSize:11,fontWeight:700,color:'#fff'}}>{b.name}</div><div style={{fontSize:10,color:'rgba(255,255,255,.35)'}}>{b.level}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */
const SERVICES = [
  {icon:'🧠',title:'AI Integration & Automation',desc:'Embed AI into your workflows — intelligent document processing, medical scribes and full business automation.',tags:['OpenAI','Claude','Azure AI','LangChain']},
  {icon:'🎙️',title:'AI Voice Agents',desc:'Inbound & outbound voice AI, SMS, appointment setters and lead qualifiers — powered by ElevenLabs, VAPI & Twilio.',tags:['ElevenLabs','VAPI','Twilio']},
  {icon:'📱',title:'Web & Mobile Development',desc:'Full-stack web and mobile apps using React, Next.js, React Native, .NET Core and Blazor.',tags:['React','Next.js','React Native','.NET']},
  {icon:'☁️',title:'Cloud Infrastructure & DevOps',desc:'Azure, AWS & GCP architecture, Docker, Kubernetes, CI/CD pipelines and multi-cloud deployments.',tags:['Azure','AWS','Kubernetes','DevOps']},
  {icon:'🚀',title:'MVP & Vibe Coding',desc:'Launch your idea in 4–8 weeks using AI-assisted vibe coding with Cursor, Lovable and Base44.',tags:['Cursor','Lovable','Replit','Vercel']},
  {icon:'🛒',title:'Marketplace Publishing',desc:'We publish production-ready software on Azure, AWS and Google Marketplaces — all offer types, enterprise-ready.',tags:['Azure Marketplace','AWS','GCP']},
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
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,gridTemplateRows:'auto'}}>
          {SERVICES.map((s,i)=>(
            <ServiceCard key={s.title} s={s} delay={i}/>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48}} className="reveal">
          <a href="/services" className="btn-outline">View All 9 Services →</a>
        </div>
      </div>
    </section>
  )
}
function ServiceCard({s,delay}) {
  const [hov,setHov]=useState(false)
  return (
    <div className={`reveal rd${(delay%6)+1}`}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:'#fff',border:`1px solid ${hov?'rgba(46,158,214,.3)':'rgba(21,101,168,.1)'}`,borderRadius:16,padding:'30px 26px',transition:'all .3s',cursor:'pointer',transform:hov?'translateY(-6px)':'none',boxShadow:hov?'0 24px 56px rgba(21,101,168,.12)':'none'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div style={{width:50,height:50,borderRadius:13,background:hov?'linear-gradient(135deg,#1565A8,#2E9ED6)':'rgba(21,101,168,.08)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:23,transition:'background .3s'}}>{s.icon}</div>
        <span style={{fontSize:16,color:'#2E9ED6',opacity:hov?1:0,transform:hov?'translate(2px,-2px)':'none',transition:'all .3s'}}>↗</span>
      </div>
      <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,fontWeight:700,color:'#0A1628',marginBottom:9}}>{s.title}</h3>
      <p style={{fontSize:13,color:'rgba(10,22,40,.52)',lineHeight:1.67}}>{s.desc}</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:15}}>
        {s.tags.map(t=><span key={t} style={{fontSize:10,fontWeight:700,color:'#1565A8',background:'rgba(21,101,168,.07)',borderRadius:5,padding:'3px 9px'}}>{t}</span>)}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   INDUSTRIES
───────────────────────────────────────── */
const INDUSTRIES = [
  {icon:'🏥',name:'Healthcare',desc:'HIPAA, EHR/FHIR, Epic, Medical Scribe',tags:['HIPAA','FHIR','Epic'],bg:'linear-gradient(135deg,#0D2B45,#1565A8)'},
  {icon:'🌸',name:'Wellness & Fertility',desc:'IVF, Fertility Clinics, Women\'s Wellness',tags:['IVF','Fertility'],bg:'linear-gradient(135deg,#0a2a1e,#0f6e56)'},
  {icon:'🎓',name:'Education & EdTech',desc:'K-12, Internships, AI Evaluation',tags:['K-12','AI Eval'],bg:'linear-gradient(135deg,#1a1a0a,#7a5a0a)'},
  {icon:'🤖',name:'Marketing & Automation',desc:'HubSpot, GoHighLevel, Apollo',tags:['HubSpot','Apollo'],bg:'linear-gradient(135deg,#1a0a1a,#6b2fa0)'},
  {icon:'🛒',name:'Service Marketplaces',desc:'Multi-vendor, Bookings, Payments',tags:['Multi-vendor','Payments'],bg:'linear-gradient(135deg,#0a1a1a,#0a5a5a)'},
  {icon:'🐾',name:'Pet Care & Wellness',desc:'Vaccination Kiosk, RFID, Pet Tech',tags:['Kiosk','RFID'],bg:'linear-gradient(135deg,#0a1a0a,#3a6a0a)'},
  {icon:'⚙️',name:'CRM & Productivity',desc:'Custom CRMs, Internal Tools',tags:['CRM','Dashboards'],bg:'linear-gradient(135deg,#1a0a0a,#8B2a2a)'},
]
function IndCard({ind,delay}) {
  const [hov,setHov]=useState(false)
  return (
    <div className={`reveal rd${delay+1}`} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{borderRadius:16,overflow:'hidden',cursor:'pointer',aspectRatio:'3/4',position:'relative',transition:'transform .3s',transform:hov?'translateY(-6px)':'none'}}>
      <div style={{position:'absolute',inset:0,background:ind.bg,transition:'transform .4s',transform:hov?'scale(1.06)':'scale(1)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,22,40,.95) 0%,rgba(10,22,40,.45) 55%,rgba(10,22,40,.15) 100%)'}}/>
      {hov && <div style={{position:'absolute',inset:0,border:'2px solid rgba(46,158,214,.5)',borderRadius:16}}/>}
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'22px 18px'}}>
        <div style={{width:42,height:42,borderRadius:11,background:hov?'rgba(255,107,43,.9)':'rgba(46,158,214,.22)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:11,fontSize:21,transition:'background .3s'}}>{ind.icon}</div>
        <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:700,color:'#fff',marginBottom:5}}>{ind.name}</div>
        <div style={{fontSize:11,color:'rgba(255,255,255,.55)',lineHeight:1.45,marginBottom:8}}>{ind.desc}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
          {ind.tags.map(t=><span key={t} style={{fontSize:9,fontWeight:700,color:'rgba(255,255,255,.65)',background:'rgba(255,255,255,.1)',borderRadius:4,padding:'2px 7px'}}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}
function Industries() {
  return (
    <section style={{background:'#0D2B45',padding:'96px 0',position:'relative',overflow:'hidden'}} id="industries">
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div className="reveal" style={{textAlign:'center',marginBottom:52}}>
          <div className="section-label" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="dot"/>Industries We Serve</div>
          <h2 className="section-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:14}}>Built for Your Specific Industry</h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.5)',maxWidth:500,margin:'0 auto'}}>Every solution is designed around the compliance, workflows and unique challenges of your sector.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18}}>
          {INDUSTRIES.slice(0,4).map((ind,i)=><IndCard key={ind.name} ind={ind} delay={i}/>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginTop:18}}>
          {INDUSTRIES.slice(4).map((ind,i)=><IndCard key={ind.name} ind={ind} delay={i+3}/>)}
        </div>
        <div style={{textAlign:'center',marginTop:44}} className="reveal">
          <a href="/industries" className="btn-ghost">Explore All Industries →</a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   WHY CSHARPTEK
───────────────────────────────────────── */
function useCountUp(target,duration=1600,start=false){
  const [count,setCount]=useState(0)
  useEffect(()=>{
    if(!start)return
    let st=null
    const step=ts=>{if(!st)st=ts;const p=Math.min((ts-st)/duration,1);const e=1-Math.pow(1-p,3);setCount(Math.floor(e*target));if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step)
  },[target,duration,start])
  return count
}
function StatBox({val,suf,lbl,go}){
  const c=useCountUp(val,1600,go)
  return(
    <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(46,158,214,.1)',borderRadius:13,padding:'20px 18px'}}>
      <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(30px,3.5vw,42px)',fontWeight:800,background:'linear-gradient(135deg,#FF6B2B,#ffaa80)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,marginBottom:5}}>{c}{suf}</div>
      <div style={{fontSize:11,color:'rgba(255,255,255,.38)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em'}}>{lbl}</div>
    </div>
  )
}
function Why() {
  const [go,setGo]=useState(false)
  const [bars,setBars]=useState(false)
  const ref=useRef(null)
  const bref=useRef(null)
  useEffect(()=>{
    const o1=new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:.3})
    const o2=new IntersectionObserver(([e])=>{if(e.isIntersecting)setBars(true)},{threshold:.3})
    if(ref.current)o1.observe(ref.current)
    if(bref.current)o2.observe(bref.current)
    return()=>{o1.disconnect();o2.disconnect()}
  },[])
  const diffs=[
    {i:'🧠',t:'AI-First Mindset',d:'Every solution is designed with AI at the core — not bolted on as an afterthought.'},
    {i:'☁️',t:'Multi-Cloud Expertise',d:'Certified across Azure, AWS and Google Cloud with Marketplace publishing on all three.'},
    {i:'🏥',t:'Compliance-Ready',d:'HIPAA-compliant architectures, FHIR/EHR integrations and secure data handling built-in.'},
    {i:'🔄',t:'End-to-End Delivery',d:'From discovery through to deployment, support and ongoing optimisation.'},
  ]
  return(
    <section style={{background:'#0A1628',padding:'96px 0'}} id="about">
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:72,alignItems:'center'}}>
          <div>
            <div className="reveal">
              <div className="section-label" style={{color:'#7EC8E3'}}><span className="dot"/>Why CSharpTek</div>
              <h2 className="section-title" style={{fontSize:'clamp(28px,3.5vw,48px)',color:'#fff',marginBottom:18}}>AI-First Since Before It Was Trendy</h2>
              <p style={{fontSize:16,color:'rgba(255,255,255,.5)',marginBottom:28}}>A decade of delivery, five industries, three cloud marketplaces — and counting.</p>
            </div>
            <div ref={ref} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:28}} className="reveal rd1">
              <StatBox val={10} suf="+" lbl="Years Experience" go={go}/>
              <StatBox val={50} suf="+" lbl="Projects Delivered" go={go}/>
              <StatBox val={7}  suf=""  lbl="Industries Served" go={go}/>
              <StatBox val={3}  suf=""  lbl="Cloud Marketplaces" go={go}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}} className="reveal rd2">
              {diffs.map(d=>(
                <DiffItem key={d.t} d={d}/>
              ))}
            </div>
          </div>
          <div className="reveal rd3">
            <div style={{background:'linear-gradient(135deg,#0D2B45,#1565A8)',border:'1px solid rgba(46,158,214,.18)',borderRadius:18,padding:'30px 26px',marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:700,color:'#7EC8E3',letterSpacing:'.12em',textTransform:'uppercase',marginBottom:6}}>Delivery Track Record</div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:24,fontWeight:800,color:'#fff',marginBottom:4}}>Consistent. Reliable. Fast.</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.45)',marginBottom:22}}>Measured across 50+ projects and 10+ years</div>
              <div ref={bref}>
                {[{l:'On-time delivery',p:96},{l:'Client retention',p:92},{l:'AI integrations',p:100}].map(m=>(
                  <div key={m.l} style={{display:'flex',alignItems:'center',gap:13,marginBottom:13}}>
                    <span style={{fontSize:11,color:'rgba(255,255,255,.55)',fontWeight:600,minWidth:90}}>{m.l}</span>
                    <div style={{flex:1,height:5,background:'rgba(255,255,255,.07)',borderRadius:3,overflow:'hidden'}}>
                      <div style={{height:'100%',borderRadius:3,background:'linear-gradient(90deg,#2E9ED6,#7EC8E3)',width:bars?`${m.p}%`:'0%',transition:'width 1.4s ease'}}/>
                    </div>
                    <span style={{fontSize:11,color:'#7EC8E3',fontWeight:700,minWidth:32,textAlign:'right'}}>{m.p}%</span>
                  </div>
                ))}
              </div>
            </div>
            {[{i:'⚡',t:'24/7 Support Available',s:'SLA-backed support across all time zones',b:'Always On'},{i:'🚀',t:'MVP in 4–8 Weeks',s:'From idea to live product at startup speed',b:'Vibe Coding'}].map(c=>(
              <div key={c.t} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(46,158,214,.12)',borderRadius:13,padding:17,display:'flex',alignItems:'center',gap:13,marginBottom:11}}>
                <span style={{fontSize:25}}>{c.i}</span>
                <div><h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:700,color:'#fff',marginBottom:2}}>{c.t}</h4><p style={{fontSize:11,color:'rgba(255,255,255,.38)'}}>{c.s}</p></div>
                <span style={{marginLeft:'auto',background:'rgba(255,107,43,.14)',border:'1px solid rgba(255,107,43,.28)',borderRadius:5,padding:'3px 9px',fontSize:10,fontWeight:700,color:'#FF6B2B',whiteSpace:'nowrap'}}>{c.b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
function DiffItem({d}){
  const [hov,setHov]=useState(false)
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{display:'flex',alignItems:'flex-start',gap:13,padding:'16px 18px',background:'rgba(255,255,255,.03)',border:`1px solid ${hov?'rgba(46,158,214,.22)':'rgba(46,158,214,.08)'}`,borderRadius:11,transition:'all .3s',transform:hov?'translateX(4px)':'none'}}>
      <div style={{width:38,height:38,borderRadius:10,background:hov?'rgba(255,107,43,.17)':'rgba(46,158,214,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,flexShrink:0,transition:'background .3s'}}>{d.i}</div>
      <div><h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,fontWeight:700,color:'#fff',marginBottom:3}}>{d.t}</h4><p style={{fontSize:13,color:'rgba(255,255,255,.45)',lineHeight:1.55}}>{d.d}</p></div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PORTFOLIO
───────────────────────────────────────── */
const PROJECTS=[
  {icon:'🩺',title:'Medical Scribe AI',desc:'Real-time clinical transcription with FHIR integration and Epic EHR compatibility.',stack:['Azure OpenAI','FHIR','Epic','.NET Core'],outcome:'⚡ 70% faster note-taking',cat:'healthcare',bg:'linear-gradient(135deg,#0D2B45,#1565A8)',tagBg:'rgba(46,158,214,.22)',tagColor:'#7EC8E3',tagLabel:'Healthcare'},
  {icon:'🌸',title:'IVF & Fertility Platform',desc:'Patient journey management and HIPAA-compliant records for fertility clinics.',stack:['React Native','Azure','HIPAA','Supabase'],outcome:'📈 3x patient engagement',cat:'wellness',bg:'linear-gradient(135deg,#1a0a2a,#6b1fa0)',tagBg:'rgba(180,80,220,.22)',tagColor:'#e0a0ff',tagLabel:'Wellness'},
  {icon:'🎓',title:'Student Internship Portal',desc:'AI-based matching and evaluation for students, educators and institutes.',stack:['Next.js','Claude API','PostgreSQL','Vercel'],outcome:'🏫 10k+ students onboarded',cat:'education',bg:'linear-gradient(135deg,#1a1a0a,#7a5a0a)',tagBg:'rgba(200,160,20,.22)',tagColor:'#f0d060',tagLabel:'Education'},
  {icon:'📞',title:'AI Voice Lead Qualifier',desc:'24/7 inbound/outbound voice AI that qualifies leads and books appointments automatically.',stack:['VAPI','ElevenLabs','Twilio','GoHighLevel'],outcome:'🤖 60% cost reduction',cat:'automation',bg:'linear-gradient(135deg,#1a0a0a,#8B2a0a)',tagBg:'rgba(255,107,43,.22)',tagColor:'#ffaa80',tagLabel:'Automation'},
  {icon:'🐾',title:'Pet Vaccination Kiosk',desc:'Self-service kiosk with RFID pet ID integration for instant check-in and records.',stack:['React','RFID','Azure IoT','Node.js'],outcome:'🐕 5 min avg check-in',cat:'other',bg:'linear-gradient(135deg,#0a1a0a,#2a6a0a)',tagBg:'rgba(60,160,60,.22)',tagColor:'#90e090',tagLabel:'Pet Care'},
  {icon:'📲',title:'Social Media Automation',desc:'AI content generation, scheduling and image-to-video pipeline for LinkedIn, Instagram and X.',stack:['OpenAI','Instantly.ai','Apollo.io','LinkedIn API'],outcome:'📊 5x content output',cat:'automation',bg:'linear-gradient(135deg,#0a0a1a,#1a2a8a)',tagBg:'rgba(80,120,255,.22)',tagColor:'#a0c0ff',tagLabel:'Automation'},
]
function PortCard({p}){
  const [hov,setHov]=useState(false)
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:'#fff',border:`1px solid ${hov?'rgba(46,158,214,.3)':'rgba(21,101,168,.1)'}`,borderRadius:16,overflow:'hidden',transition:'all .3s',cursor:'pointer',display:'flex',flexDirection:'column',transform:hov?'translateY(-6px)':'none',boxShadow:hov?'0 22px 52px rgba(21,101,168,.13)':'none'}}>
      <div style={{height:168,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',background:p.bg}}>
        <span style={{fontSize:50,filter:'drop-shadow(0 3px 12px rgba(0,0,0,.15))' }}>{p.icon}</span>
        <span style={{position:'absolute',top:13,left:13,fontSize:9,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',padding:'3px 10px',borderRadius:100,background:p.tagBg,color:p.tagColor}}>{p.tagLabel}</span>
      </div>
      <div style={{padding:'22px 20px',flex:1}}>
        <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#0A1628',marginBottom:7}}>{p.title}</div>
        <div style={{fontSize:13,color:'rgba(10,22,40,.5)',lineHeight:1.64}}>{p.desc}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:5,marginTop:13}}>
          {p.stack.map(t=><span key={t} style={{fontSize:10,fontWeight:700,color:'#1565A8',background:'rgba(21,101,168,.07)',borderRadius:4,padding:'2px 8px'}}>{t}</span>)}
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'13px 20px',borderTop:'1px solid rgba(21,101,168,.07)'}}>
        <span style={{fontSize:11,fontWeight:700,color:'#FF6B2B'}}>{p.outcome}</span>
        <a href="#" style={{fontSize:11,fontWeight:700,color:'#1565A8',textDecoration:'none'}}>Case Study →</a>
      </div>
    </div>
  )
}
function Portfolio(){
  const [filter,setFilter]=useState('all')
  const filters=[{v:'all',l:'All Projects'},{v:'healthcare',l:'Healthcare'},{v:'education',l:'Education'},{v:'automation',l:'Automation'},{v:'wellness',l:'Wellness'},{v:'other',l:'Other'}]
  const shown=PROJECTS.filter(p=>filter==='all'||p.cat===filter)
  return(
    <section style={{background:'#F0F8FF',padding:'96px 0'}} id="portfolio">
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div className="reveal" style={{textAlign:'center',marginBottom:44}}>
          <div className="section-label" style={{color:'#1565A8',justifyContent:'center'}}><span className="dot"/>Featured Work</div>
          <h2 className="section-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#0A1628',marginBottom:14}}>Projects That Speak for Themselves</h2>
          <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:480,margin:'0 auto'}}>Real solutions built for real industries.</p>
        </div>
        <div style={{display:'flex',gap:9,justifyContent:'center',flexWrap:'wrap',marginBottom:40}} className="reveal">
          {filters.map(f=>(
            <button key={f.v} onClick={()=>setFilter(f.v)}
              style={{padding:'9px 20px',borderRadius:100,border:'1.5px solid rgba(21,101,168,.2)',background:filter===f.v?'#1565A8':'transparent',color:filter===f.v?'#fff':'rgba(10,22,40,.5)',fontSize:13,fontWeight:700,cursor:'pointer',transition:'all .2s',fontFamily:"'Mulish',sans-serif"}}>
              {f.l}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
          {shown.map(p=><PortCard key={p.title} p={p}/>)}
        </div>
        <div style={{textAlign:'center',marginTop:44}} className="reveal">
          <a href="/portfolio" className="btn-orange">View All 10+ Case Studies →</a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   TECH ECOSYSTEM
───────────────────────────────────────── */
const TECH_GROUPS=[
  {label:'Cloud Platforms',pills:[{i:'☁️',n:'Microsoft Azure',f:true},{i:'🟠',n:'AWS',f:true},{i:'🔵',n:'Google Cloud',f:true},{i:'🏪',n:'Azure Marketplace'},{i:'🏪',n:'AWS Marketplace'},{i:'🏪',n:'Google Marketplace'}]},
  {label:'AI & LLMs',pills:[{i:'🤖',n:'OpenAI / ChatGPT',f:true},{i:'⚡',n:'Claude (Anthropic)',f:true},{i:'🔷',n:'Azure OpenAI'},{i:'🌐',n:'Google Gemini'},{i:'🐙',n:'GitHub Copilot'},{i:'🖼️',n:'AI Image Gen'},{i:'🎬',n:'AI Video Gen'},{i:'🔍',n:'Azure AI Search'}]},
  {label:'AI Voice & Comms',pills:[{i:'🎙️',n:'ElevenLabs',f:true},{i:'📞',n:'Twilio',f:true},{i:'🎤',n:'VAPI'},{i:'💬',n:'AI SMS / IVR'},{i:'📅',n:'Appointment Setter'},{i:'🔔',n:'Reminder Agent'}]},
  {label:'Frontend & Mobile',pills:[{i:'⚛️',n:'React',f:true},{i:'▲',n:'Next.js',f:true},{i:'📱',n:'React Native'},{i:'📦',n:'Expo'},{i:'🔌',n:'Capacitor'},{i:'🔷',n:'Blazor'},{i:'🍎',n:'Swift / iOS'},{i:'🤖',n:'Kotlin / Android'}]},
  {label:'Backend & Database',pills:[{i:'🔷',n:'.NET Core / C#',f:true},{i:'🟢',n:'Node.js',f:true},{i:'🗄️',n:'Supabase'},{i:'🐘',n:'PostgreSQL'},{i:'🚂',n:'Railway'},{i:'▲',n:'Vercel'},{i:'🔷',n:'Azure Functions'},{i:'🔗',n:'Azure Logic Apps'}]},
  {label:'DevOps & Vibe Coding',pills:[{i:'🐳',n:'Docker'},{i:'☸️',n:'Kubernetes'},{i:'🔄',n:'Azure DevOps'},{i:'🐙',n:'GitHub Actions'},{i:'⚡',n:'Cursor',f:true},{i:'💜',n:'Lovable',f:true},{i:'🔁',n:'Replit'},{i:'4️⃣',n:'Base44'},{i:'🎨',n:'Figma + Claude'}]},
]
function TechPill({p}){
  const [hov,setHov]=useState(false)
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{display:'flex',alignItems:'center',gap:7,padding:'9px 15px',background:hov?'rgba(46,158,214,.1)':(p.f?'rgba(46,158,214,.07)':'rgba(255,255,255,.04)'),border:`1px solid ${hov?'rgba(46,158,214,.28)':(p.f?'rgba(46,158,214,.18)':'rgba(255,255,255,.07)')}`,borderRadius:9,transition:'all .22s',cursor:'default',transform:hov?'translateY(-2px)':'none'}}>
      <span style={{fontSize:16}}>{p.i}</span>
      <span style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,.65)',whiteSpace:'nowrap'}}>{p.n}</span>
    </div>
  )
}
function Tech(){
  return(
    <section style={{background:'#0A1628',padding:'96px 0'}} id="tech">
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div className="reveal" style={{textAlign:'center',marginBottom:52}}>
          <div className="section-label" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="dot"/>Technology Ecosystem</div>
          <h2 className="section-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:14}}>We Build With the Best Stack</h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.45)',maxWidth:500,margin:'0 auto'}}>Battle-tested across production projects in every industry we serve.</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:32}}>
          {TECH_GROUPS.map((g,i)=>(
            <div key={g.label} className={`reveal rd${(i%6)+1}`}>
              <div style={{display:'flex',alignItems:'center',gap:10,fontSize:11,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(255,255,255,.3)',marginBottom:13}}>
                {g.label}
                <div style={{flex:1,height:1,background:'rgba(255,255,255,.05)'}}/>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:9}}>
                {g.pills.map(p=><TechPill key={p.n} p={p}/>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */
const TESTIMONIALS=[
  {industry:'Healthcare',industryColor:'#1565A8',quote:'CSharpTek built our AI medical scribe in record time. The FHIR integration with Epic was flawless — our physicians save hours every single day.',name:'Dr. Rachel Simmons',role:'CMO, NovaCare Health',initials:'DR',avatarBg:'linear-gradient(135deg,#1565A8,#2E9ED6)'},
  {industry:'Automation',industryColor:'#FF6B2B',quote:'Their AI voice agent replaced our entire inbound call centre. From 12-hour response times to instant 24/7 AI conversations. ROI was immediate.',name:'Marcus Klein',role:'CEO, Elevate Marketing Group',initials:'MK',avatarBg:'linear-gradient(135deg,#FF6B2B,#ffaa80)'},
  {industry:'Education',industryColor:'#2a8a2a',quote:'The internship portal onboarded 10,000+ students. The AI evaluation system is a game-changer. Delivered on time, on budget — no drama.',name:'Prof. Priya Joshi',role:'Dean of Technology, Apex University',initials:'PJ',avatarBg:'linear-gradient(135deg,#2a8a2a,#5aba5a)'},
]
function Testimonials(){
  return(
    <section style={{background:'#F0F8FF',padding:'96px 0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div className="reveal" style={{textAlign:'center',marginBottom:48}}>
          <div className="section-label" style={{color:'#1565A8',justifyContent:'center'}}><span className="dot"/>Client Stories</div>
          <h2 className="section-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#0A1628',marginBottom:14}}>What Our Clients Say</h2>
          <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:460,margin:'0 auto'}}>Trusted across 7 industries and counting.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
          {TESTIMONIALS.map((t,i)=>(
            <TestiCard key={t.name} t={t} delay={i}/>
          ))}
        </div>
      </div>
    </section>
  )
}
function TestiCard({t,delay}){
  const [hov,setHov]=useState(false)
  return(
    <div className={`reveal rd${delay+1}`} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:'#fff',border:'1px solid rgba(21,101,168,.1)',borderRadius:16,padding:'30px 26px',transition:'all .3s',position:'relative',transform:hov?'translateY(-4px)':'none',boxShadow:hov?'0 20px 48px rgba(21,101,168,.1)':'none'}}>
      <span style={{position:'absolute',top:18,right:18,fontSize:10,fontWeight:700,padding:'3px 10px',borderRadius:100,background:`rgba(0,0,0,.06)`,color:t.industryColor}}>{t.industry}</span>
      <div style={{fontSize:38,color:'#2E9ED6',lineHeight:1,marginBottom:13,fontFamily:'Georgia,serif'}}>"</div>
      <div style={{display:'flex',gap:3,marginBottom:15}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:'#FF6B2B',fontSize:13}}>★</span>)}</div>
      <p style={{fontSize:13.5,color:'rgba(10,22,40,.6)',lineHeight:1.72,marginBottom:22,fontStyle:'italic'}}>{t.quote}</p>
      <div style={{display:'flex',alignItems:'center',gap:13}}>
        <div style={{width:44,height:44,borderRadius:'50%',background:t.avatarBg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:15,color:'#fff',flexShrink:0}}>{t.initials}</div>
        <div>
          <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:700,color:'#0A1628',marginBottom:2}}>{t.name}</div>
          <div style={{fontSize:11,color:'rgba(10,22,40,.4)'}}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   BLOG
───────────────────────────────────────── */
const POSTS=[
  {icon:'🤖',cat:'AI & Automation',read:'8 min read',date:'Mar 2025',title:'How We Built a Medical Scribe AI on Azure OpenAI — From Scratch',excerpt:'A behind-the-scenes look at architecting a real-time clinical transcription system with FHIR integration, HIPAA compliance and sub-2-second latency.',bg:'linear-gradient(135deg,#0D2B45,#1565A8)',featured:true},
  {icon:'⚡',cat:'Vibe Coding',read:'5 min read',date:'Feb 2025',title:'What is Vibe Coding and Why It\'s Changing MVP Development',excerpt:'AI-assisted development with Cursor, Lovable and Base44 is letting us ship MVPs in 4 weeks that used to take 4 months.',bg:'linear-gradient(135deg,#1a0a1a,#6b1fa0)',featured:true},
  {icon:'🏥',cat:'Healthcare',read:'6 min',date:'Jan 2025',title:'HIPAA-Compliant AI: What Healthcare Startups Need to Know',bg:'linear-gradient(135deg,#0a1a0a,#1a5a1a)',featured:false},
  {icon:'🎙️',cat:'AI Voice',read:'4 min',date:'Jan 2025',title:'AI Voice Agents: Replacing Phone Trees Forever',bg:'linear-gradient(135deg,#1a0a0a,#8B2a0a)',featured:false},
  {icon:'☁️',cat:'Cloud',read:'7 min',date:'Dec 2024',title:'From Azure Migration to AI-First: Our Company Evolution',bg:'linear-gradient(135deg,#0a0a1a,#1a2a8a)',featured:false},
]
function Blog(){
  const featured=POSTS.filter(p=>p.featured)
  const rest=POSTS.filter(p=>!p.featured)
  return(
    <section style={{background:'#0D2B45',padding:'96px 0',position:'relative',overflow:'hidden'}} id="blog">
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div className="reveal" style={{textAlign:'center',marginBottom:48}}>
          <div className="section-label" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="dot"/>The AI Edge</div>
          <h2 className="section-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:14}}>Insights From Our Team</h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.45)',maxWidth:460,margin:'0 auto'}}>Practical AI, cloud and development insights for builders and decision-makers.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:22,marginBottom:22}} className="reveal rd1">
          {featured.map(p=><BlogCard key={p.title} p={p} big/>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}} className="reveal rd2">
          {rest.map(p=><BlogCard key={p.title} p={p}/>)}
        </div>
        <div style={{textAlign:'center',marginTop:42}} className="reveal">
          <a href="/blog" className="btn-ghost">Visit The AI Edge Blog →</a>
        </div>
      </div>
    </section>
  )
}
function BlogCard({p,big}){
  const [hov,setHov]=useState(false)
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:'rgba(255,255,255,.04)',border:`1px solid ${hov?'rgba(46,158,214,.28)':'rgba(46,158,214,.1)'}`,borderRadius:16,overflow:'hidden',transition:'all .3s',cursor:'pointer',transform:hov?'translateY(-4px)':'none'}}>
      <div style={{height:big?190:130,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',background:p.bg}}>
        <span style={{fontSize:big?50:38}}>{p.icon}</span>
        <span style={{position:'absolute',top:13,left:13,fontSize:9,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',padding:'3px 10px',borderRadius:100,background:'rgba(46,158,214,.22)',color:'#7EC8E3'}}>{p.cat}</span>
      </div>
      <div style={{padding:'22px 22px 26px'}}>
        <div style={{fontSize:11,color:'rgba(255,255,255,.32)',fontWeight:600,marginBottom:9}}>{p.read} · {p.date}</div>
        <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:big?17:14,fontWeight:700,color:'#fff',marginBottom:big?9:0,lineHeight:1.3}}>{p.title}</div>
        {big && p.excerpt && <p style={{fontSize:13,color:'rgba(255,255,255,.45)',lineHeight:1.64,marginBottom:0}}>{p.excerpt}</p>}
        <a href="#" style={{display:'inline-flex',alignItems:'center',gap:5,marginTop:14,fontSize:12,fontWeight:700,color:'#FF6B2B',textDecoration:'none'}}>Read {big?'Article':''}→</a>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   AI READINESS QUIZ
───────────────────────────────────────── */
const QUIZ_STEPS=[
  {q:'1. What industry are you in?',opts:[{l:'🏥 Healthcare / Medical',v:30},{l:'🎓 Education / EdTech',v:28},{l:'💼 Marketing / Automation',v:25},{l:'🛒 Marketplace / E-commerce',v:20},{l:'🔧 Other',v:18}]},
  {q:'2. Where are you with AI today?',opts:[{l:'🤷 Never tried it',v:5},{l:'🔍 Exploring / researching',v:10},{l:'⚙️ Using basic tools (ChatGPT etc.)',v:18},{l:'🚀 Already have some AI integrated',v:25}]},
  {q:'3. Biggest operational pain point?',opts:[{l:'⏱️ Too many manual processes',v:20},{l:'💰 High operational costs',v:18},{l:'📉 Slow growth / lead generation',v:15},{l:'📊 Poor data use / insights',v:12}]},
  {q:'4. Company size?',opts:[{l:'👤 1–10 (Startup)',v:8},{l:'👥 11–50 (Growing)',v:15},{l:'🏢 51–200 (Mid-market)',v:20},{l:'🏗️ 200+ (Enterprise)',v:25}]},
  {q:'5. Timeline to act?',opts:[{l:'🔥 ASAP — we need this now',v:25},{l:'📅 3–6 months',v:18},{l:'🗓️ 6–12 months',v:10},{l:'🤔 Just exploring',v:5}]},
]
function Quiz(){
  const [step,setStep]=useState(0)
  const [scores,setScores]=useState([])
  const [sel,setSel]=useState(null)
  const [result,setResult]=useState(null)
  const choose=(v)=>setSel(v)
  const next=()=>{
    if(sel===null)return
    const ns=[...scores,sel]
    if(step<QUIZ_STEPS.length-1){setScores(ns);setSel(null);setStep(s=>s+1)}
    else{
      const total=ns.reduce((a,b)=>a+b,0)
      const pct=Math.round(total/125*100)
      let tier,icon,msg,color
      if(pct<40){tier='AI Curious';icon='🟡';msg='You\'re at the starting line. Here\'s your AI roadmap — let\'s explore the quick wins.';color:'#f59e0b'}
      else if(pct<70){tier='AI Ready';icon='🟠';msg='You\'re primed for quick wins. A few integrations could transform your operations.';color='#FF6B2B'}
      else{tier='AI Accelerator';icon='🟢';msg='You\'re ready to go big. Let\'s build a comprehensive AI strategy for your business.';color='#22c55e'}
      setResult({pct,tier,icon,msg,color:'#22c55e'})
    }
  }
  const back=()=>{if(step>0){setStep(s=>s-1);setScores(scores.slice(0,-1));setSel(null)}}
  const restart=()=>{setStep(0);setScores([]);setSel(null);setResult(null)}
  const pct=(step+1)/QUIZ_STEPS.length*100
  return(
    <section style={{background:'#F0F8FF',padding:'96px 0'}} id="assessment">
      <div style={{maxWidth:840,margin:'0 auto',padding:'0 28px',textAlign:'center'}}>
        <div className="reveal">
          <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(255,107,43,.08)',border:'1px solid rgba(255,107,43,.2)',borderRadius:100,padding:'5px 16px',fontSize:10,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'#FF6B2B',marginBottom:20}}>🧠 Free Assessment</div>
          <h2 className="section-title" style={{fontSize:'clamp(26px,4vw,46px)',color:'#0A1628',marginBottom:13}}>Is Your Business Ready for AI?</h2>
          <p style={{fontSize:16,color:'rgba(10,22,40,.5)',lineHeight:1.65,maxWidth:540,margin:'0 auto 36px'}}>Answer 5 quick questions and get an instant AI Readiness Score — plus personalised recommendations.</p>
        </div>
        <div className="reveal rd1" style={{background:'#fff',border:'1px solid rgba(21,101,168,.1)',borderRadius:18,padding:36,boxShadow:'0 6px 32px rgba(21,101,168,.07)'}}>
          {!result?(
            <>
              <div style={{height:4,background:'rgba(21,101,168,.08)',borderRadius:2,marginBottom:26,overflow:'hidden'}}>
                <div style={{height:'100%',background:'linear-gradient(90deg,#1565A8,#2E9ED6)',borderRadius:2,width:`${pct}%`,transition:'width .4s ease'}}/>
              </div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:19,fontWeight:700,color:'#0A1628',marginBottom:22,lineHeight:1.3,textAlign:'left'}}>{QUIZ_STEPS[step].q}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:26}}>
                {QUIZ_STEPS[step].opts.map(o=>(
                  <button key={o.l} onClick={()=>choose(o.v)}
                    style={{padding:'13px 17px',border:`1.5px solid ${sel===o.v?'#1565A8':'rgba(21,101,168,.14)'}`,borderRadius:9,background:sel===o.v?'rgba(21,101,168,.05)':'#fff',fontSize:14,fontWeight:600,color:sel===o.v?'#1565A8':'#0A1628',cursor:'pointer',transition:'all .2s',textAlign:'left',fontFamily:"'Mulish',sans-serif"}}>
                    {o.l}
                  </button>
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                {step>0?<button onClick={back} style={{background:'transparent',color:'rgba(10,22,40,.38)',padding:'10px 14px',borderRadius:8,border:'1.5px solid rgba(10,22,40,.1)',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:"'Mulish',sans-serif"}}>← Back</button>:<span/>}
                <span style={{fontSize:12,color:'rgba(10,22,40,.38)',fontWeight:600}}>Step {step+1} of {QUIZ_STEPS.length}</span>
                <button onClick={next} disabled={sel===null}
                  style={{background:sel===null?'#ccc':'#1565A8',color:'#fff',padding:'10px 26px',borderRadius:8,border:'none',fontSize:14,fontWeight:700,cursor:sel===null?'not-allowed':'pointer',fontFamily:"'Mulish',sans-serif",transition:'background .2s'}}>
                  {step===QUIZ_STEPS.length-1?'Get My Score →':'Next →'}
                </button>
              </div>
            </>
          ):(
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:54,marginBottom:14}}>{result.icon}</div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:21,fontWeight:800,color:result.color,marginBottom:7}}>{result.tier} — {result.pct}% Score</div>
              <div style={{height:7,background:'rgba(21,101,168,.09)',borderRadius:4,margin:'16px 0',overflow:'hidden'}}>
                <div style={{height:'100%',borderRadius:4,background:`linear-gradient(90deg,${result.color},${result.color}88)`,width:`${result.pct}%`,transition:'width 1.2s ease'}}/>
              </div>
              <p style={{fontSize:15,color:'rgba(10,22,40,.55)',lineHeight:1.6,maxWidth:420,margin:'0 auto 26px'}}>{result.msg}</p>
              <button style={{display:'inline-flex',alignItems:'center',gap:7,padding:'14px 30px',borderRadius:10,background:'#FF6B2B',color:'#fff',fontWeight:700,fontSize:14,fontFamily:"'Mulish',sans-serif",border:'none',cursor:'pointer'}}>Book a Free Strategy Call →</button>
              <div onClick={restart} style={{marginTop:13,fontSize:12,color:'rgba(10,22,40,.38)',cursor:'pointer',textDecoration:'underline'}}>Retake the assessment</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CTABanner(){
  return(
    <section style={{background:'linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%)',padding:'96px 28px',textAlign:'center',position:'relative',overflow:'hidden'}} id="contact">
      <div style={{position:'absolute',top:-80,left:'50%',transform:'translateX(-50%)',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div className="reveal" style={{maxWidth:680,margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.14)',borderRadius:100,padding:'6px 18px',fontSize:10,fontWeight:700,letterSpacing:'.13em',textTransform:'uppercase',color:'rgba(255,255,255,.65)',marginBottom:22}}>⚡ Let&apos;s Build Something Smarter</div>
        <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(30px,5vw,56px)',fontWeight:800,color:'#fff',marginBottom:16,lineHeight:1.08,letterSpacing:'-.025em'}}>
          Ready to Transform Your Business<br/>with <span style={{background:'linear-gradient(90deg,#FF6B2B,#ffaa80)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>AI?</span>
        </h2>
        <p style={{fontSize:17,color:'rgba(255,255,255,.56)',lineHeight:1.7,marginBottom:38}}>From a quick MVP to a full enterprise AI rollout — we&apos;ll scope it, build it and support it. Your first consultation is completely free.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:36}}>
          <a href="mailto:hello@csharptek.com" className="btn-primary">Book a Free Consultation →</a>
          <a href="#portfolio" style={{background:'rgba(255,255,255,.07)',color:'#fff',padding:'15px 34px',borderRadius:10,textDecoration:'none',fontWeight:600,fontSize:15,border:'1.5px solid rgba(255,255,255,.18)',transition:'all .2s',display:'inline-block'}}>View Our Work</a>
        </div>
        <div style={{display:'flex',gap:22,justifyContent:'center',flexWrap:'wrap'}}>
          {['No obligation','Reply within 24 hours','HIPAA-ready','24/7 support'].map(t=>(
            <span key={t} style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,.45)',fontWeight:600}}>
              <span style={{color:'#7EC8E3'}}>✓</span>{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer(){
  const [email,setEmail]=useState('')
  const [subbed,setSubbed]=useState(false)
  const sub=()=>{if(email.includes('@')){setSubbed(true);setEmail('')}}
  return(
    <footer style={{background:'#060f1d',padding:'72px 0 0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:44,paddingBottom:52,borderBottom:'1px solid rgba(255,255,255,.05)'}}>
          <div>
            <a href="/" style={{display:'flex',alignItems:'center',gap:3,marginBottom:14,textDecoration:'none'}}>
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:19,background:'linear-gradient(135deg,#2E9ED6,#7EC8E3)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>C#</span>
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:19,color:'#fff'}}>harpTek</span>
            </a>
            <p style={{fontSize:13,color:'rgba(255,255,255,.36)',lineHeight:1.68,marginBottom:20,maxWidth:270}}>AI-first software development across healthcare, education, wellness, automation and more. Building the future, one deployment at a time.</p>
            <div style={{display:'flex',gap:9,marginBottom:18}}>
              {['💼','🐙','🐦','▶️'].map(i=><a key={i} href="#" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,textDecoration:'none'}}>{i}</a>)}
            </div>
            <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(46,158,214,.1)',borderRadius:13,padding:18}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:'#fff',marginBottom:4}}>📧 The AI Edge Newsletter</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.36)',marginBottom:13}}>Bi-weekly AI insights. No spam.</div>
              {subbed?<div style={{fontSize:12,color:'#4ade80',fontWeight:600}}>✅ Subscribed! Welcome to The AI Edge.</div>:(
                <div style={{display:'flex',gap:7}}>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                    style={{flex:1,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.09)',borderRadius:7,padding:'9px 12px',fontSize:12,color:'#fff',fontFamily:"'Mulish',sans-serif",outline:'none'}}/>
                  <button onClick={sub} style={{background:'#FF6B2B',color:'#fff',border:'none',padding:'9px 14px',borderRadius:7,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:"'Mulish',sans-serif"}}>Subscribe</button>
                </div>
              )}
            </div>
          </div>
          {[
            {title:'Services',links:['AI Integration','AI Voice Agents','Web & Mobile Dev','Cloud & DevOps','MVP & Vibe Coding','Prompt Engineering','24/7 Support']},
            {title:'Industries',links:['Healthcare','Wellness & Fertility','Education','Marketing','Marketplaces','Pet Care','CRM & Productivity']},
            {title:'Company',links:['About Us','Portfolio','Blog','Careers','Partners','Marketplace','Contact']},
          ].map(col=>(
            <div key={col.title}>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>{col.title}</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {col.links.map(l=><li key={l}><a href="#" style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{l}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Contact</h4>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
              {['📧 hello@csharptek.com','💬 WhatsApp Us','📅 Book a Call','🔒 HIPAA Policy','📄 Privacy Policy'].map(l=><li key={l}><a href="#" style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{l}</a></li>)}
            </ul>
            <div style={{marginTop:18,padding:'11px 13px',background:'rgba(255,107,43,.07)',border:'1px solid rgba(255,107,43,.17)',borderRadius:9}}>
              <div style={{fontSize:10,fontWeight:700,color:'#FF6B2B',marginBottom:3}}>🕐 Response Time</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.38)'}}>We reply within 24 hours.</div>
            </div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0',flexWrap:'wrap',gap:10}}>
          <span style={{fontSize:11,color:'rgba(255,255,255,.28)'}}>© 2025 CSharpTek. All rights reserved.</span>
          <div style={{display:'flex',gap:18}}>{['Privacy','HIPAA','Terms','Sitemap'].map(l=><a key={l} href="#" style={{fontSize:11,color:'rgba(255,255,255,.28)',textDecoration:'none'}}>{l}</a>)}</div>
          <span style={{fontSize:10,color:'rgba(255,255,255,.22)',fontWeight:600}}>⚡ Built with AI · CSharpTek</span>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────
   RESPONSIVE STYLES
───────────────────────────────────────── */
const responsiveCSS = `
  @media(max-width:1024px){
    .why-layout{grid-template-columns:1fr!important;gap:48px!important;}
  }
  @media(max-width:900px){
    .srv-grid{grid-template-columns:repeat(2,1fr)!important;}
    .ind-grid-r1{grid-template-columns:repeat(2,1fr)!important;}
    .ind-grid-r2{grid-template-columns:repeat(2,1fr)!important;}
    .testi-grid{grid-template-columns:1fr!important;}
    .port-grid{grid-template-columns:repeat(2,1fr)!important;}
    .blog-feat{grid-template-columns:1fr!important;}
    .blog-row{grid-template-columns:repeat(2,1fr)!important;}
    .ft-top{grid-template-columns:1fr 1fr!important;}
  }
  @media(max-width:580px){
    .srv-grid,.port-grid,.blog-row,.testi-grid{grid-template-columns:1fr!important;}
    .ind-grid-r1,.ind-grid-r2{grid-template-columns:1fr!important;}
    .ft-top{grid-template-columns:1fr!important;}
    .ft-bottom{flex-direction:column!important;text-align:center!important;}
  }
`

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
export default function Home() {
  useEffect(()=>{
    const els=document.querySelectorAll('.reveal')
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
    },{threshold:0.08})
    els.forEach(el=>obs.observe(el))
    return()=>obs.disconnect()
  },[])

  return(
    <>
      <Head><title>CSharpTek — AI-First Software Development</title></Head>
      <style>{responsiveCSS}</style>
      <Nav/>
      <Hero/>
      <TrustBar/>
      <Services/>
      <Industries/>
      <Why/>
      <Portfolio/>
      <Tech/>
      <Testimonials/>
      <Blog/>
      <Quiz/>
      <CTABanner/>
      <Footer/>
      <Chatbot/>
    </>
  )
}
