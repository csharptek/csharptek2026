import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), { ssr: false })

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
  @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulseGlow{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
  @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .ldot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;flex-shrink:0;}
  .sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  .in{max-width:1200px;margin:0 auto;padding:0 28px;}

  /* ── HERO NEW ── */
  .hero{position:relative;min-height:100vh;display:flex;align-items:center;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 55%,#091422 100%);overflow:hidden;padding:100px 0 60px;}
  .hero canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
  .h-orb1{position:absolute;top:4%;left:-8%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,43,.12) 0%,transparent 70%);pointer-events:none;animation:orbFloat 9s ease-in-out infinite;}
  .h-orb2{position:absolute;bottom:0;right:-12%;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle,rgba(46,158,214,.08) 0%,transparent 70%);pointer-events:none;animation:orbFloat 11s ease-in-out infinite reverse;}
  .h-grid{max-width:1200px;margin:0 auto;padding:0 28px;width:100%;position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .h-left{display:flex;flex-direction:column;}
  .h-eye{display:inline-flex;align-items:center;gap:8px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.25);border-radius:100px;padding:7px 16px;margin-bottom:24px;width:fit-content;}
  .h-eye span{font-size:12px;font-weight:700;color:#FF6B2B;letter-spacing:.1em;text-transform:uppercase;}
  .h-h1{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:clamp(34px,4.2vw,58px);color:#fff;line-height:1.08;letter-spacing:-.03em;margin-bottom:20px;}
  .h-grad{background:linear-gradient(135deg,#FF6B2B,#ffaa80);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .h-sub{font-size:clamp(14px,1.4vw,17px);color:rgba(255,255,255,.55);line-height:1.75;margin-bottom:36px;max-width:480px;}
  .h-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
  .h-btn-p{background:linear-gradient(135deg,#FF6B2B,#e55a1f);color:#fff;padding:15px 32px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;display:inline-block;box-shadow:0 8px 28px rgba(255,107,43,.35);}
  .h-btn-s{background:rgba(46,158,214,.08);color:#7EC8E3;padding:15px 32px;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;display:inline-block;border:1.5px solid rgba(46,158,214,.3);}
  .h-stats{display:flex;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.12);border-radius:16px;overflow:hidden;}
  .h-stat{flex:1;padding:18px 12px;border-right:1px solid rgba(46,158,214,.1);display:flex;flex-direction:column;align-items:center;}
  .h-stat:last-child{border-right:none;}
  .h-stat-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(22px,2.8vw,36px);font-weight:800;background:linear-gradient(135deg,#FF6B2B,#ffaa80);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;}
  .h-stat-l{font-size:10px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.1em;font-weight:700;margin-top:5px;text-align:center;}

  /* about card */
  .about-card{background:rgba(13,27,52,.92);border:1px solid rgba(46,158,214,.2);border-radius:20px;padding:24px;backdrop-filter:blur(24px);box-shadow:0 32px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.06);animation:heroFloat 5s ease-in-out infinite;}
  .ac-hdr{display:flex;align-items:center;gap:10px;margin-bottom:18px;border-bottom:1px solid rgba(46,158,214,.1);padding-bottom:14px;}
  .ac-dots{display:flex;gap:6px;}
  .ac-dot{width:10px;height:10px;border-radius:50%;}
  .ac-ttl{flex:1;text-align:center;font-size:13px;color:rgba(255,255,255,.85);font-weight:700;}
  .h-fbadge{position:absolute;background:rgba(10,22,40,.9);border-radius:100px;padding:6px 13px;font-size:11px;font-weight:700;white-space:nowrap;backdrop-filter:blur(12px);}

  /* STORY */
  .story{background:#F0F8FF;padding:96px 0;}
  .story-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
  .story-timeline{display:flex;flex-direction:column;gap:0;}
  .tl-item{display:flex;gap:20px;padding-bottom:32px;position:relative;}
  .tl-item:not(:last-child)::after{content:'';position:absolute;left:19px;top:40px;bottom:0;width:2px;background:linear-gradient(to bottom,#1565A8,rgba(21,101,168,.1));}
  .tl-dot{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#1565A8,#2E9ED6);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;font-weight:800;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 14px rgba(21,101,168,.35);}
  .tl-year{font-size:11px;font-weight:700;color:#1565A8;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px;}
  .tl-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#0A1628;margin-bottom:4px;}
  .tl-d{font-size:13px;color:rgba(10,22,40,.55);line-height:1.6;}

  /* VALUES */
  .values{background:#0A1628;padding:88px 0;}
  .vals-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .val-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .val-card:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.06);transform:translateY(-3px);}
  .val-ic{font-size:28px;margin-bottom:14px;}
  .val-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:8px;}
  .val-d{font-size:13px;color:rgba(255,255,255,.45);line-height:1.65;}

  /* CEO */
  .ceo{background:#F0F8FF;padding:88px 0;}
  .ceo-wrap{display:grid;grid-template-columns:1fr 2fr;gap:60px;align-items:center;}
  .ceo-img{width:100%;aspect-ratio:1;border-radius:24px;background:linear-gradient(135deg,#1565A8,#2E9ED6);display:flex;align-items:center;justify-content:center;font-size:80px;}
  .ceo-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;color:#0A1628;margin-bottom:4px;}
  .ceo-role{font-size:14px;font-weight:700;color:#1565A8;margin-bottom:20px;}
  .ceo-q{font-size:17px;color:rgba(10,22,40,.65);line-height:1.78;font-style:italic;margin-bottom:20px;border-left:3px solid #FF6B2B;padding-left:20px;}

  /* TEAM */
  .team{background:#0A1628;padding:88px 0;}
  .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px;}
  .tm-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:16px;padding:24px 20px;text-align:center;transition:all .3s;}
  .tm-card:hover{transform:translateY(-4px);border-color:rgba(46,158,214,.28);}
  .tm-av{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;margin:0 auto 14px;}
  .tm-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;}
  .tm-role{font-size:11px;color:#7EC8E3;font-weight:600;margin-bottom:10px;}
  .tm-bio{font-size:12px;color:rgba(255,255,255,.4);line-height:1.6;}

  /* OFFICES */
  .offices{background:#0D2B45;padding:88px 0;}
  .off-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px;}
  .off-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.12);border-radius:14px;padding:26px 22px;}
  .off-flag{font-size:32px;margin-bottom:12px;}
  .off-city{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:700;color:#fff;margin-bottom:3px;}
  .off-type{font-size:11px;font-weight:700;color:#7EC8E3;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;}
  .off-addr{font-size:13px;color:rgba(255,255,255,.45);line-height:1.6;}

  /* PARTNERS */
  .partners{background:#0A1628;padding:88px 0;}
  .part-intro{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:60px;}
  .part-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
  .part-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:22px 18px;transition:all .3s;}
  .part-card:hover{border-color:rgba(46,158,214,.3);transform:translateY(-3px);}
  .part-ic{font-size:36px;margin-bottom:12px;}
  .part-nm{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;color:#fff;}
  .part-type{font-size:11px;font-weight:700;color:rgba(255,255,255,.35);letter-spacing:.06em;text-transform:uppercase;}
  .part-desc{font-size:12px;color:rgba(255,255,255,.45);line-height:1.6;}
  .part-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.22);border-radius:100px;padding:3px 10px;font-size:10px;font-weight:700;color:#FF6B2B;}

  /* WHY JOIN */
  .join{background:#F0F8FF;padding:88px 0;}
  .join-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .join-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .join-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(21,101,168,.1);border-color:rgba(46,158,214,.25);}
  .join-ic{font-size:28px;margin-bottom:14px;}
  .join-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#0A1628;margin-bottom:8px;}
  .join-d{font-size:13px;color:rgba(10,22,40,.55);line-height:1.65;}

  /* CTA */
  .cta-sec{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;}
  .cta-in{max-width:640px;margin:0 auto;}
  .cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4.5vw,50px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .cta-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);display:inline-block;transition:all .2s;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}
  .btn-gh{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:10px;border:2px solid rgba(46,158,214,.35);color:#7EC8E3;font-weight:700;font-size:15px;transition:all .2s;}

  @media(max-width:900px){
    .h-grid{grid-template-columns:1fr!important;}
    .h-right-wrap{display:none;}
    .story-grid,.ceo-wrap,.part-intro{grid-template-columns:1fr!important;gap:44px!important;}
    .vals-grid,.team-grid,.part-grid,.off-grid,.join-grid{grid-template-columns:repeat(2,1fr)!important;}
  }
  @media(max-width:560px){
    .vals-grid,.team-grid,.part-grid,.off-grid,.join-grid{grid-template-columns:1fr!important;}
    .h-ctas{flex-direction:column;}
    .h-stats{flex-wrap:wrap;}
    .h-stat{min-width:50%;}
  }
`

const TIMELINE = [
  {year:'2016',t:'Founded in Ranchi',d:'Started as a 4-person .NET and Azure development shop serving local enterprises.'},
  {year:'2018',t:'Microsoft Partnership',d:'Became a Microsoft Solutions Partner. First enterprise cloud migration projects.'},
  {year:'2020',t:'Healthcare Vertical',d:'First HIPAA-compliant EHR integration. Medical software became a core specialisation.'},
  {year:'2022',t:'AI Integration Launch',d:'First AI products — document intelligence and GPT-powered automation for clients.'},
  {year:'2023',t:'Dubai Office + Global Clients',d:'Opened Meydan Hotel office. Now serving clients across UK, UAE and India.'},
  {year:'2024',t:'AI Medical Scribe',d:'Shipped real-time clinical transcription with FHIR & Epic. 70% doc time reduction.'},
  {year:'2025',t:'AI-First by Design',d:'Launched AI Voice Agents, pgvector search and multi-cloud marketplace publishing.'},
]

const TEAM = [
  {name:'Bhanu Gupta',    role:'CEO & Founder',          bio:'10+ years building enterprise software. Drives company vision and client strategy.',initials:'BG',bg:'linear-gradient(135deg,#FF6B2B,#e55a1f)'},
  {name:'Mukesh Barik',   role:'Product Manager',         bio:'Drives product vision and delivery across all client engagements.',             initials:'MB',bg:'linear-gradient(135deg,#1565A8,#2E9ED6)'},
  {name:'Nippu Kumar',    role:'Solutions Architect',      bio:'Azure certified. Designs cloud and AI architectures for enterprise clients.',   initials:'NK',bg:'linear-gradient(135deg,#0f6e56,#2E9ED6)'},
  {name:'Ashwika Agarwal',role:'Head of Human Resources',  bio:'Leads talent acquisition and champions our people-first philosophy.',          initials:'AA',bg:'linear-gradient(135deg,#6b2fa0,#9b5fd0)'},
  {name:'Manjika Tantia', role:'Business Development',     bio:'Builds client relationships and drives partnerships across global markets.',    initials:'MT',bg:'linear-gradient(135deg,#0a7a7a,#2E9ED6)'},
]

const OFFICES = [
  {flag:'🇮🇳',city:'Ranchi',type:'Headquarters',addr:'Jharkhand, India\nFull engineering & delivery team'},
  {flag:'🇦🇪',city:'Dubai',type:'Middle East Office',addr:'Meydan Hotel, Dubai, UAE\nBusiness development & client success'},
  {flag:'🌍',city:'Remote',type:'Global Delivery',addr:'UK · USA · Europe\nRemote-first for global clients'},
]

const PARTNERS = [
  {i:'🔷',n:'Microsoft',t:'Solutions Partner',d:'Azure, Microsoft 365 and AI services.', badge:'Cloud Partner'},
  {i:'🟠',n:'AWS',t:'Partner Network',d:'EC2, Lambda, S3 and managed services.',badge:'AWS Partner'},
  {i:'🔵',n:'Google Cloud',t:'Partner',d:'GKE, BigQuery and Vertex AI.',badge:'GCP Partner'},
  {i:'🤖',n:'OpenAI',t:'API Partner',d:'GPT-4o, Whisper and Embeddings API.',badge:'API Partner'},
  {i:'⚡',n:'Anthropic',t:'Claude Partner',d:'Claude 3.5 for enterprise AI products.',badge:'Claude API'},
  {i:'🏢',n:'NASSCOM',t:'Member',d:'India\'s premier IT industry body.',badge:'Member'},
  {i:'🛡️',n:'Acronis',t:'Partner',d:'Backup, DR and cybersecurity solutions.',badge:'Partner'},
  {i:'🌐',n:'IAMCP',t:'Member',d:'International Microsoft Channel community.',badge:'Member'},
]

/* ── STATS COUNTER ── */
function HeroCounter({value,suffix,label,go}){
  const [n,setN]=useState(0)
  useEffect(()=>{
    if(!go)return;let v=0;const step=Math.ceil(value/60)
    const t=setInterval(()=>{v+=step;if(v>=value){setN(value);clearInterval(t)}else setN(v)},30)
    return()=>clearInterval(t)
  },[go,value])
  return(
    <div className="h-stat">
      <div className="h-stat-n">{n}{suffix}</div>
      <div className="h-stat-l">{label}</div>
    </div>
  )
}

/* ── ABOUT HERO CARD ── */
function AboutCard(){
  const [locIdx,setLocIdx]=useState(0)
  const [memberIdx,setMemberIdx]=useState(0)
  const locs=['Ranchi 🇮🇳','Dubai 🇦🇪','Remote 🌍']
  const partners=['Microsoft','AWS','Google Cloud','OpenAI','Anthropic']

  useEffect(()=>{
    const t1=setInterval(()=>setLocIdx(i=>(i+1)%locs.length),2200)
    const t2=setInterval(()=>setMemberIdx(i=>(i+1)%TEAM.length),1800)
    return()=>{clearInterval(t1);clearInterval(t2)}
  },[])

  return(
    <div className="about-card">
      <div className="ac-hdr">
        <div className="ac-dots">{['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="ac-dot" style={{background:c}}/>)}</div>
        <div className="ac-ttl">CSharpTek — Company Profile</div>
        <div style={{display:'flex',alignItems:'center',gap:5}}>
          <div style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',animation:'pulseGlow 2s infinite'}}/>
          <span style={{fontSize:10,color:'#22c55e',fontWeight:700}}>2016–2025</span>
        </div>
      </div>

      {/* Founded badge */}
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18,padding:'10px 14px',background:'rgba(255,107,43,.07)',border:'1px solid rgba(255,107,43,.18)',borderRadius:12}}>
        <span style={{fontSize:22}}>🚀</span>
        <div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.4)',fontWeight:700,letterSpacing:'.06em'}}>FOUNDED</div>
          <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>2016 · Ranchi, India</div>
        </div>
        <div style={{marginLeft:'auto',textAlign:'right'}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,.4)',fontWeight:700,letterSpacing:'.06em'}}>OFFICE</div>
          <AnimatePresence mode="wait">
            <motion.div key={locIdx} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.3}}
              style={{fontSize:13,fontWeight:700,color:'#7EC8E3'}}
            >{locs[locIdx]}</motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Team members */}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:10,color:'rgba(255,255,255,.3)',fontWeight:700,letterSpacing:'.08em',marginBottom:10}}>CORE TEAM</div>
        <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
          {TEAM.map((m,i)=>(
            <motion.div key={m.name} initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{delay:i*.1}}
              style={{display:'flex',alignItems:'center',gap:7,padding:'6px 10px',background:memberIdx===i?`${m.bg.match(/#[0-9a-fA-F]{6}/)[0]}22`:'rgba(255,255,255,.04)',border:`1px solid ${memberIdx===i?m.bg.match(/#[0-9a-fA-F]{6}/)[0]+'44':'rgba(255,255,255,.08)'}`,borderRadius:100,transition:'all .3s'}}
            >
              <div style={{width:24,height:24,borderRadius:'50%',background:m.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'#fff',flexShrink:0}}>{m.initials}</div>
              <span style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,.75)',whiteSpace:'nowrap'}}>{m.name.split(' ')[0]}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partner logos */}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:10,color:'rgba(255,255,255,.3)',fontWeight:700,letterSpacing:'.08em',marginBottom:10}}>PARTNERS</div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {['🔷 Microsoft','🟠 AWS','🔵 Google','🤖 OpenAI','⚡ Anthropic'].map(p=>(
            <span key={p} style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,.55)',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,padding:'4px 10px'}}>{p}</span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div style={{display:'flex',gap:8}}>
        {[{v:'10+',l:'Years'},{v:'300+',l:'Projects'},{v:'7',l:'Industries'},{v:'3',l:'Cloud MPs'}].map(m=>(
          <div key={m.l} style={{flex:1,background:'rgba(255,107,43,.07)',border:'1px solid rgba(255,107,43,.15)',borderRadius:8,padding:'8px 6px',textAlign:'center'}}>
            <div style={{fontSize:14,fontWeight:800,color:'#FF6B2B',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{m.v}</div>
            <div style={{fontSize:9,color:'rgba(255,255,255,.35)',textTransform:'uppercase',letterSpacing:'.06em',marginTop:2}}>{m.l}</div>
          </div>
        ))}
      </div>

      <div style={{position:'absolute',top:-60,right:-60,width:180,height:180,background:'radial-gradient(circle,rgba(255,107,43,.08) 0%,transparent 70%)',pointerEvents:'none'}}/>
    </div>
  )
}

/* ── STATS (used in old sections) ── */
function Stats(){
  const ref=useRef(null);const [go,setGo]=useState(false)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:.3})
    if(ref.current)obs.observe(ref.current);return()=>obs.disconnect()
  },[])
  return(
    <div ref={ref} style={{display:'flex',background:'rgba(255,255,255,.03)',border:'1px solid rgba(46,158,214,.12)',borderRadius:16,overflow:'hidden',width:'100%',maxWidth:640,marginTop:40}}>
      {[{v:10,s:'+',l:'Years'},{v:300,s:'+',l:'Projects'},{v:7,s:'',l:'Industries'},{v:3,s:'',l:'Cloud MPs'}].map((s,i)=>{
        const [n,setN]=useState(0)
        useEffect(()=>{
          if(!go)return;let v=0;const step=Math.ceil(s.v/50)
          const t=setInterval(()=>{v+=step;if(v>=s.v){setN(s.v);clearInterval(t)}else setN(v)},30)
          return()=>clearInterval(t)
        },[go])
        return(
          <div key={s.l} style={{flex:1,padding:'20px 12px',borderRight:i<3?'1px solid rgba(46,158,214,.1)':'none',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:'clamp(22px,2.8vw,36px)',fontWeight:800,background:'linear-gradient(135deg,#FF6B2B,#ffaa80)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1}}>{n}{s.s}</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,.38)',textTransform:'uppercase',letterSpacing:'.1em',fontWeight:700,marginTop:5,textAlign:'center'}}>{s.l}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function AboutPage(){
  const [go,setGo]=useState(false)
  const statsRef=useRef(null)
  const canvasRef=useRef(null)

  useEffect(()=>{
    const els=document.querySelectorAll('.rv')
    const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')})},{threshold:0.06})
    els.forEach(el=>obs.observe(el));return()=>obs.disconnect()
  },[])

  useEffect(()=>{
    const el=statsRef.current;if(!el)return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:.3})
    obs.observe(el);return()=>obs.disconnect()
  },[])

  useEffect(()=>{
    const cv=canvasRef.current;if(!cv)return
    const ctx=cv.getContext('2d');let id
    const sz=()=>{cv.width=cv.offsetWidth;cv.height=cv.offsetHeight};sz()
    const pts=Array.from({length:45},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.3+.3,dx:(Math.random()-.5)*.3,dy:(Math.random()-.5)*.3,a:Math.random()*.25+.06}))
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height)
      pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,107,43,${p.a})`;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>cv.width)p.dx*=-1;if(p.y<0||p.y>cv.height)p.dy*=-1})
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<100){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(255,107,43,${.04*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke()}}
      id=requestAnimationFrame(draw)
    }
    draw();window.addEventListener('resize',sz)
    return()=>{cancelAnimationFrame(id);window.removeEventListener('resize',sz)}
  },[])

  const fadeUp={hidden:{opacity:0,y:28},show:{opacity:1,y:0,transition:{duration:.65,ease:[.22,1,.36,1]}}}
  const stagger={hidden:{},show:{transition:{staggerChildren:.1}}}

  const FLOAT_BADGES=[
    {label:'Microsoft Partner',color:'#0078D4',top:'6%',left:'-12%'},
    {label:'HIPAA Certified',color:'#22c55e',top:'20%',right:'-10%'},
    {label:'10+ Years',color:'#FF6B2B',bottom:'28%',left:'-10%'},
    {label:'Dubai · Ranchi',color:'#7EC8E3',bottom:'12%',right:'-8%'},
  ]

  return(
    <Layout>
      <Head>
        <title>About Us — CSharpTek AI-First Software Development</title>
        <meta name="description" content="CSharpTek — AI-first software company founded 2016. Healthcare, EdTech, Wellness and enterprise software across UK, UAE and India."/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet"/>
      </Head>
      <style dangerouslySetInnerHTML={{__html:S}}/>

      {/* ── HERO ── */}
      <section className="hero">
        <canvas ref={canvasRef}/>
        <div className="h-orb1"/><div className="h-orb2"/>
        <div className="h-grid">
          {/* LEFT */}
          <motion.div className="h-left" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <div className="h-eye">
                <div style={{width:6,height:6,borderRadius:'50%',background:'#FF6B2B',animation:'pulseGlow 2s infinite',flexShrink:0}}/>
                <span>Our Story</span>
              </div>
            </motion.div>
            <motion.h1 className="h-h1" variants={fadeUp}>
              Building the Future.<br/>
              <span className="h-grad">One Deployment at a Time.</span>
            </motion.h1>
            <motion.p className="h-sub" variants={fadeUp}>
              Founded in 2016 in Ranchi with 4 people and a big ambition — CSharpTek has grown into an AI-first software company trusted by healthcare providers, EdTech startups and enterprise clients across UK, UAE and India.
            </motion.p>
            <motion.div className="h-ctas" variants={fadeUp}>
              <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
                <Link href="/contact" className="h-btn-p">Work With Us →</Link>
              </motion.div>
              <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
                <Link href="/portfolio" className="h-btn-s">View Our Work</Link>
              </motion.div>
            </motion.div>
            <motion.div ref={statsRef} className="h-stats" variants={fadeUp}>
              {[{value:10,suffix:'+',label:'Years Experience'},{value:300,suffix:'+',label:'Projects Delivered'},{value:7,suffix:'',label:'Industries Served'},{value:3,suffix:'',label:'Cloud Marketplaces'}].map(s=>(
                <HeroCounter key={s.label} {...s} go={go}/>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div className="h-right-wrap" initial={{opacity:0,x:60}} animate={{opacity:1,x:0}} transition={{duration:.9,delay:.3,ease:[.22,1,.36,1]}} style={{position:'relative'}}>
            {FLOAT_BADGES.map((b,i)=>(
              <motion.div key={b.label} className="h-fbadge"
                style={{top:b.top,bottom:b.bottom,left:b.left,right:b.right,border:`1px solid ${b.color}44`,color:b.color,boxShadow:`0 4px 20px ${b.color}22`}}
                initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}} transition={{delay:1+i*.15,type:'spring',stiffness:160}}
                whileHover={{scale:1.1}}
              >{b.label}</motion.div>
            ))}
            <div style={{position:'absolute',inset:-2,background:'linear-gradient(135deg,rgba(255,107,43,.12),rgba(46,158,214,.08))',borderRadius:24,filter:'blur(20px)',zIndex:-1}}/>
            <AboutCard/>
          </motion.div>
        </div>
      </section>

      {/* ── COMPANY STORY ── */}
      <section className="story">
        <div className="in">
          <div className="story-grid">
            <div className="rv">
              <div className="lbl" style={{color:'#1565A8'}}><span className="ldot"/>Our Journey</div>
              <h2 className="sec-t" style={{fontSize:'clamp(28px,3.5vw,44px)',color:'#0A1628',marginBottom:16}}>From 4 People to<br/>AI-First Pioneers</h2>
              <p style={{fontSize:16,color:'rgba(10,22,40,.58)',lineHeight:1.78,marginBottom:20}}>We started as a cloud and .NET development shop. Over nine years, we evolved with the technology — from Azure migration specialists to a team that ships AI medical scribes, voice agents and intelligent marketplaces.</p>
              <p style={{fontSize:16,color:'rgba(10,22,40,.58)',lineHeight:1.78,marginBottom:28}}>Today we operate across Ranchi, Dubai and remote-first — serving clients who need software that is fast, compliant, AI-ready and built to last.</p>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                {['Microsoft Solutions Partner','NASSCOM Member','HIPAA Certified Builds','Azure Marketplace Published'].map(b=>(
                  <span key={b} style={{background:'rgba(21,101,168,.07)',border:'1px solid rgba(21,101,168,.15)',borderRadius:8,padding:'6px 14px',fontSize:12,fontWeight:700,color:'#1565A8'}}>{b}</span>
                ))}
              </div>
            </div>
            <div className="story-timeline rv d2">
              {TIMELINE.map(t=>(
                <div key={t.year} className="tl-item">
                  <div className="tl-dot">{t.year.slice(2)}</div>
                  <div className="tl-body">
                    <div className="tl-year">{t.year}</div>
                    <div className="tl-t">{t.t}</div>
                    <div className="tl-d">{t.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="values">
        <div className="in">
          <div className="rv" style={{textAlign:'center',marginBottom:48}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>What We Stand For</div>
            <h2 className="sec-t" style={{fontSize:'clamp(28px,3.5vw,44px)',color:'#fff',marginBottom:14}}>Our Values</h2>
          </div>
          <div className="vals-grid">
            {[
              {i:'🧠',t:'AI-First by Design',d:'Every project we build is AI-ready from day one — not retrofitted later.'},
              {i:'🔒',t:'Compliance by Default',d:'HIPAA, GDPR and SOC2-ready architectures. Regulated industries welcome.'},
              {i:'🤝',t:'Partnership Not Vendor',d:'We embed with your team. Your success metrics are our success metrics.'},
              {i:'⚡',t:'Speed Without Compromise',d:'We ship fast using vibe coding — without cutting corners on quality.'},
              {i:'🌍',t:'Global Mindset',d:'Built across three continents. We understand global compliance and cultural nuance.'},
              {i:'📈',t:'Outcomes Over Output',d:'We measure success in business impact — not lines of code or tickets closed.'},
            ].map(v=>(
              <div key={v.t} className="val-card rv">
                <div className="val-ic">{v.i}</div>
                <div className="val-t">{v.t}</div>
                <div className="val-d">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEO QUOTE ── */}
      <section className="ceo">
        <div className="in">
          <div className="ceo-wrap rv">
            <div className="ceo-img">👨‍💼</div>
            <div>
              <div className="ceo-name">Bhanu Gupta</div>
              <div className="ceo-role">CEO & Founder, CSharpTek</div>
              <p className="ceo-q">We started CSharpTek because we believed software development could be faster, smarter and more aligned with business outcomes. Nine years later, AI has proven us right. Today, every client we work with gets the benefit of a decade of delivery experience combined with the most powerful AI tools available.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                {['10+ Years Building','AI-First Since 2022','Microsoft Partner','NASSCOM Member'].map(b=>(
                  <span key={b} style={{background:'rgba(21,101,168,.07)',border:'1px solid rgba(21,101,168,.15)',borderRadius:8,padding:'5px 13px',fontSize:12,fontWeight:700,color:'#1565A8'}}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="team">
        <div className="in">
          <div className="rv" style={{textAlign:'center',marginBottom:48}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>The People</div>
            <h2 className="sec-t" style={{fontSize:'clamp(28px,3.5vw,44px)',color:'#fff',marginBottom:14}}>Meet the Team</h2>
            <p style={{fontSize:16,color:'rgba(255,255,255,.45)',maxWidth:480,margin:'0 auto'}}>A small, senior team with deep expertise across AI, cloud, mobile and enterprise software.</p>
          </div>
          <div className="team-grid">
            {TEAM.map((m,i)=>(
              <div key={m.name} className={`tm-card rv d${i+1}`}>
                <div className="tm-av" style={{background:m.bg}}>{m.initials}</div>
                <div className="tm-name">{m.name}</div>
                <div className="tm-role">{m.role}</div>
                <div className="tm-bio">{m.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICES ── */}
      <section className="offices">
        <div className="in">
          <div className="rv" style={{textAlign:'center',marginBottom:44}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>Where We Are</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Global Offices</h2>
          </div>
          <div className="off-grid">
            {OFFICES.map(o=>(
              <div key={o.city} className="off-card rv">
                <div className="off-flag">{o.flag}</div>
                <div className="off-city">{o.city}</div>
                <div className="off-type">{o.type}</div>
                <div className="off-addr" style={{whiteSpace:'pre-line'}}>{o.addr}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="partners">
        <div className="in">
          <div className="part-intro">
            <div className="rv">
              <div className="lbl" style={{color:'#7EC8E3'}}><span className="ldot"/>Our Ecosystem</div>
              <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Partners &amp; Certifications</h2>
              <p style={{fontSize:16,color:'rgba(255,255,255,.5)',lineHeight:1.75}}>We hold formal partnerships and certifications with the platforms our clients depend on — giving you confidence in our capabilities and access to premium support.</p>
            </div>
            <div className="rv d2">
              {[{v:'3',l:'Cloud Marketplaces Published'},{v:'8+',l:'Active Partnerships'},{v:'HIPAA',l:'Compliant Architectures'}].map(s=>(
                <div key={s.l} style={{padding:'16px 20px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(46,158,214,.1)',borderRadius:12,marginBottom:12}}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:26,fontWeight:800,color:'#FF6B2B'}}>{s.v}</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,.45)',fontWeight:600}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="part-grid">
            {PARTNERS.map((p,i)=>(
              <div key={p.n} className={`part-card rv d${(i%4)+1}`}>
                <div className="part-ic">{p.i}</div>
                <div className="part-nm">{p.n}</div>
                <div className="part-type">{p.t}</div>
                <div className="part-desc">{p.d}</div>
                <span className="part-badge">✓ {p.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JOIN ── */}
      <section className="join">
        <div className="in">
          <div className="rv" style={{textAlign:'center',marginBottom:48}}>
            <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="ldot"/>Careers</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#0A1628',marginBottom:14}}>Why Join CSharpTek?</h2>
            <p style={{fontSize:16,color:'rgba(10,22,40,.55)',maxWidth:480,margin:'0 auto'}}>We are a small, high-impact team. Every person matters. Every project ships.</p>
          </div>
          <div className="join-grid">
            {[
              {i:'🚀',t:'Ship Real AI Products',d:'Work on actual AI voice agents, medical scribes and intelligent platforms — not toy projects.'},
              {i:'🌍',t:'Global Exposure',d:'Clients across UK, UAE and India. Remote-friendly culture with offices in Ranchi and Dubai.'},
              {i:'📈',t:'Grow Fast',d:'Small team means big impact. You will own features, lead modules and grow your skills rapidly.'},
              {i:'🧠',t:'Learn Cutting-Edge Tech',d:'Azure OpenAI, pgvector, VAPI, n8n, LangChain — you work with the best tools available.'},
              {i:'🤝',t:'Collaborative Culture',d:'No bureaucracy. Direct access to leadership. Ideas are heard and actioned.'},
              {i:'💰',t:'Competitive Compensation',d:'Market-rate salaries, performance bonuses and recognition for exceptional work.'},
            ].map(j=>(
              <div key={j.t} className="join-card rv">
                <div className="join-ic">{j.i}</div>
                <div className="join-t">{j.t}</div>
                <div className="join-d">{j.d}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:44}} className="rv">
            <Link href="/careers" className="btn-p">View Open Positions →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec">
        <div className="cta-in rv">
          <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>Let&apos;s Work Together</div>
          <h2 className="cta-t">Ready to Build Something<br/><span style={{background:'linear-gradient(135deg,#FF6B2B,#ffaa80)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Exceptional?</span></h2>
          <p className="cta-s">Tell us what you&apos;re building. We&apos;ll tell you exactly how we can help — free consultation, no obligation.</p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
            <Link href="/portfolio" className="btn-gh">View Our Work</Link>
          </div>
        </div>
      </section>

      <ScrollToTop/>
    </Layout>
  )
}
