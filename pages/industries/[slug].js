import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  @keyframes waveBar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
  @keyframes pulseGlow{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
  @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .ldot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;}
  .sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  .in{max-width:1200px;margin:0 auto;padding:0 28px;}

  /* ── HERO ── */
  .hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;padding:100px 0 60px;}
  .hero canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
  .h-orb{position:absolute;border-radius:50%;pointer-events:none;}
  .h-grid{max-width:1200px;margin:0 auto;padding:0 28px;width:100%;position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .h-left{display:flex;flex-direction:column;}
  .h-back{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,.45);font-size:13px;font-weight:600;margin-bottom:20px;transition:color .2s;text-decoration:none;}
  .h-back:hover{color:#7EC8E3;}
  .h-eye{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:100px;padding:7px 16px;margin-bottom:20px;width:fit-content;}
  .h-eye span{font-size:12px;font-weight:700;color:rgba(255,255,255,.85);letter-spacing:.08em;text-transform:uppercase;}
  .h-h1{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:clamp(34px,4.2vw,58px);color:#fff;line-height:1.08;letter-spacing:-.03em;margin-bottom:20px;}
  .h-sub{font-size:clamp(14px,1.4vw,17px);color:rgba(255,255,255,.55);line-height:1.75;margin-bottom:36px;max-width:480px;}
  .h-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:32px;}
  .h-btn-p{background:linear-gradient(135deg,#FF6B2B,#e55a1f);color:#fff;padding:15px 32px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;display:inline-block;box-shadow:0 8px 28px rgba(255,107,43,.35);}
  .h-btn-s{background:rgba(255,255,255,.06);color:rgba(255,255,255,.8);padding:15px 32px;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;display:inline-block;border:1.5px solid rgba(255,255,255,.15);}
  .h-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px;}
  .h-tag{font-size:11px;font-weight:700;color:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:5px 13px;}
  .h-stats{display:flex;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;}
  .h-stat{flex:1;padding:18px 12px;border-right:1px solid rgba(255,255,255,.07);display:flex;flex-direction:column;align-items:center;}
  .h-stat:last-child{border-right:none;}
  .h-stat-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(20px,2.5vw,32px);font-weight:800;line-height:1;}
  .h-stat-l{font-size:10px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-top:4px;text-align:center;}
  .h-right{position:relative;}
  .h-fbadge{position:absolute;background:rgba(10,22,40,.9);border-radius:100px;padding:6px 13px;font-size:11px;font-weight:700;white-space:nowrap;backdrop-filter:blur(12px);}

  /* ind card shared */
  .ind-card{background:rgba(13,27,52,.92);border-radius:20px;padding:22px 24px;backdrop-filter:blur(24px);box-shadow:0 32px 80px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.06);position:relative;overflow:hidden;animation:heroFloat 5s ease-in-out infinite;}
  .ic-hdr{display:flex;align-items:center;gap:10px;margin-bottom:16px;border-bottom:1px solid rgba(255,255,255,.07);padding-bottom:12px;}
  .ic-dots{display:flex;gap:6px;}
  .ic-dot{width:10px;height:10px;border-radius:50%;}
  .ic-ttl{flex:1;text-align:center;font-size:13px;color:rgba(255,255,255,.85);font-weight:700;}
  .ic-live{display:flex;align-items:center;gap:5px;}
  .ic-live-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulseGlow 2s infinite;}
  .ic-live-txt{font-size:10px;color:#22c55e;font-weight:700;}
  .ic-metrics{display:flex;gap:8px;margin-top:16px;}
  .ic-metric{flex:1;border-radius:8px;padding:8px 8px;text-align:center;}
  .ic-mv{font-size:14px;font-weight:800;font-family:'Plus Jakarta Sans',sans-serif;}
  .ic-ml{font-size:9px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.06em;margin-top:2px;}
  .ic-glow{position:absolute;top:-60px;right:-60px;width:180px;height:180px;pointer-events:none;}

  /* PAIN POINTS */
  .pain{background:#F0F8FF;padding:88px 0;}
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

  /* TRUST */
  .trust-sec{background:#F0F8FF;padding:88px 0;}
  .trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px;}
  .trust-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:14px;padding:24px 20px;}
  .trust-ic{font-size:28px;margin-bottom:12px;}
  .trust-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#0A1628;margin-bottom:6px;}
  .trust-d{font-size:12px;color:rgba(10,22,40,.5);line-height:1.6;}

  /* CASE STUDY */
  .case-sec{background:#0A1628;padding:88px 0;}
  .case-card{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.12);border-radius:22px;padding:48px;}
  .case-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(20px,2.5vw,30px);font-weight:800;color:#fff;margin-bottom:8px;}
  .case-cl{font-size:12px;font-weight:700;color:#7EC8E3;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;}
  .case-d{font-size:14px;color:rgba(255,255,255,.55);line-height:1.75;margin-bottom:24px;}
  .case-stk{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:24px;}
  .case-tk{font-size:11px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.1);border-radius:5px;padding:3px 10px;}
  .case-mets{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .case-met{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:12px;padding:16px;}
  .case-met-v{font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:800;color:#FF6B2B;line-height:1;margin-bottom:4px;}
  .case-met-l{font-size:11px;color:rgba(255,255,255,.45);font-weight:600;}

  /* SERVICES */
  .svcs-sec{background:#0D2B45;padding:88px 0;}
  .svcs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .svc-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:26px 22px;transition:all .3s;text-decoration:none;}
  .svc-card:hover{border-color:rgba(46,158,214,.3);transform:translateY(-3px);}
  .svc-ic{font-size:26px;margin-bottom:12px;}
  .svc-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:6px;}
  .svc-d{font-size:13px;color:rgba(255,255,255,.45);line-height:1.6;}

  /* CTA */
  .cta-sec{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;position:relative;overflow:hidden;}
  .cta-in{max-width:640px;margin:0 auto;position:relative;z-index:1;}
  .cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,4.5vw,50px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .cta-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}
  .ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);display:inline-block;transition:all .2s;}

  /* OTHER */
  .other{background:#060f1d;padding:60px 0;}
  .other-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px;}
  .other-card{display:flex;align-items:center;gap:10px;padding:14px 18px;background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:12px;transition:all .2s;text-decoration:none;}
  .other-card:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.07);}
  .other-ic{font-size:20px;}
  .other-t{font-size:13px;font-weight:700;color:rgba(255,255,255,.75);flex:1;}
  .other-arr{font-size:13px;color:rgba(255,255,255,.3);}

  /* PREV/NEXT */
  .pn{background:#060f1d;border-top:1px solid rgba(46,158,214,.08);padding:28px 0;}
  .pn-in{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
  .pn-btn{display:flex;align-items:center;gap:12px;text-decoration:none;padding:12px 16px;border-radius:11px;border:1px solid rgba(46,158,214,.12);background:rgba(255,255,255,.03);transition:all .2s;}
  .pn-btn:hover{border-color:rgba(46,158,214,.3);}
  .pn-arr{font-size:18px;color:rgba(255,255,255,.4);}
  .pn-lbl{font-size:10px;font-weight:700;color:rgba(255,255,255,.32);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px;}
  .pn-name{font-size:14px;font-weight:700;color:#fff;display:flex;align-items:center;gap:7px;}
  .pn-all{display:flex;align-items:center;gap:6px;padding:12px 20px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.25);border-radius:10px;font-size:13px;font-weight:700;color:#FF6B2B;white-space:nowrap;transition:all .2s;}
  .pn-all:hover{background:rgba(255,107,43,.2);}

  @media(max-width:900px){
    .h-grid{grid-template-columns:1fr!important;}
    .h-right{display:none;}
    .pain-grid{grid-template-columns:repeat(2,1fr)!important;}
    .sol-grid,.svcs-grid{grid-template-columns:repeat(2,1fr)!important;}
    .trust-grid{grid-template-columns:repeat(2,1fr)!important;}
    .case-card{grid-template-columns:1fr!important;gap:32px!important;}
    .other-grid{grid-template-columns:1fr 1fr!important;}
  }
  @media(max-width:560px){
    .pain-grid,.trust-grid,.sol-grid,.svcs-grid,.other-grid{grid-template-columns:1fr!important;}
    .h-ctas{flex-direction:column;}
    .h-stats{flex-wrap:wrap;}
    .h-stat{min-width:50%;}
    .case-mets{grid-template-columns:1fr 1fr!important;}
    .ctas{flex-direction:column;align-items:center;}
  }
`

/* ── WAVE BARS (reused in healthcare) ── */
const WAVE_BARS = Array.from({length:24},(_,i)=>({h:6+(i*7+13)%20,active:i<16,delay:(i%4)*0.1}))

/* ── HEALTHCARE CARD ── */
function HealthcareCard({shown,color}){
  const lines=[
    {role:'Patient',  c:'rgba(255,255,255,.5)', bg:'rgba(255,255,255,.04)',bd:'rgba(255,255,255,.08)',t:'Chest pain since this morning, gets worse with movement…'},
    {role:'AI Scribe',c:'#2E9ED6',              bg:'rgba(46,158,214,.08)', bd:'rgba(46,158,214,.2)',  t:'CC: Chest pain onset 0800. SOAP note generating…'},
    {role:'FHIR ✓',  c:'#22c55e',              bg:'rgba(34,197,94,.07)',  bd:'rgba(34,197,94,.2)',   t:'Synced to Epic EHR — Encounter #48291'},
  ]
  return(
    <div className="ind-card" style={{border:`1px solid ${color}33`}}>
      <div className="ic-hdr">
        <div className="ic-dots">{['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="ic-dot" style={{background:c}}/>)}</div>
        <div className="ic-ttl">AI Clinical Documentation</div>
        <div className="ic-live"><div className="ic-live-dot"/><span className="ic-live-txt">LIVE</span></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:3,marginBottom:14,height:26}}>
        <span style={{fontSize:10,color:'rgba(255,255,255,.35)',marginRight:4}}>Audio</span>
        {WAVE_BARS.map((b,i)=>(
          <div key={i} style={{width:2.5,borderRadius:2,height:b.h,background:b.active?`linear-gradient(to top,${color}88,${color})`:'rgba(255,255,255,.1)',animationName:b.active?'waveBar':'none',animationDuration:`${0.4+b.delay}s`,animationIterationCount:'infinite',animationTimingFunction:'ease-in-out',animationDirection:'alternate'}}/>
        ))}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:9}}>
        {lines.map((l,i)=>shown>i&&(
          <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{duration:.35}}
            style={{background:l.bg,border:`1px solid ${l.bd}`,borderRadius:9,padding:'9px 12px'}}
          >
            <div style={{fontSize:9,fontWeight:700,color:l.c,letterSpacing:'.08em',marginBottom:3}}>{l.role.toUpperCase()}</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,.78)'}}>{l.t}</div>
          </motion.div>
        ))}
      </div>
      <div className="ic-metrics">
        {[{v:'70%',l:'Doc Time Saved',c:color},{v:'98%',l:'Accuracy',c:'#22c55e'},{v:'HIPAA',l:'Compliant',c:'#8B5CF6'}].map(m=>(
          <div key={m.l} className="ic-metric" style={{background:`${m.c}11`,border:`1px solid ${m.c}33`}}>
            <div className="ic-mv" style={{color:m.c}}>{m.v}</div>
            <div className="ic-ml">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="ic-glow" style={{background:`radial-gradient(circle,${color}18 0%,transparent 70%)`}}/>
    </div>
  )
}

/* ── GENERIC INDUSTRY CARD ── */
function GenericCard({ind,shown}){
  const configs = {
    wellness:  {title:'IVF Patient Portal',  lines:[{r:'Patient',t:'Cycle day 8 — scan scheduled for tomorrow',c:'rgba(255,255,255,.5)'},{r:'AI Alert',t:'Medication reminder sent — Gonal-F 150IU tonight',c:'#0f7a5a'},{r:'Portal ✓',t:'Appointment confirmed — Dr. Sharma 09:00 AM',c:'#22c55e'}], metrics:[{v:'3×',l:'Patient Engagement'},{v:'HIPAA',l:'Compliant'},{v:'24/7',l:'Portal Access'}]},
    education: {title:'Student Internship Portal', lines:[{r:'Student',t:'Looking for a software engineering placement…',c:'rgba(255,255,255,.5)'},{r:'AI Match',t:'3 matches found — 96%, 91%, 88% compatibility',c:'#7a5a0a'},{r:'Placed ✓',t:'Internship confirmed at TechCorp · Start: June 2025',c:'#22c55e'}], metrics:[{v:'10k+',l:'Students'},{v:'96%',l:'Match Rate'},{v:'AI',l:'Powered'}]},
    automation:{title:'AI Lead Qualification', lines:[{r:'Inbound',t:'New call received — Marketing campaign lead',c:'rgba(255,255,255,.5)'},{r:'AI Voice',t:'Qualified: Budget $50k · Intent: High · Booked',c:'#6b2fa0'},{r:'CRM ✓',t:'HubSpot updated — Follow-up scheduled 10 AM',c:'#22c55e'}], metrics:[{v:'24/7',l:'Available'},{v:'60%',l:'Cost Saved'},{v:'< 3s',l:'Response'}]},
    marketplace:{title:'Service Marketplace', lines:[{r:'User',t:'Searching: "plumber available this evening London"',c:'rgba(255,255,255,.5)'},{r:'AI Match',t:'4 verified providers found · Avg rating 4.8★',c:'#0a7a7a'},{r:'Booked ✓',t:'John\'s Plumbing · 7PM · Payment secured',c:'#22c55e'}], metrics:[{v:'4.8★',l:'Avg Rating'},{v:'< 30s',l:'Booking Time'},{v:'Stripe',l:'Payments'}]},
    petcare:   {title:'Pet Vaccination Kiosk', lines:[{r:'Pet ID',t:'RFID tag scanned — Buddy (Golden Retriever)',c:'rgba(255,255,255,.5)'},{r:'Records',t:'Vaccination due: Rabies booster — overdue 14 days',c:'#3a7a0a'},{r:'Logged ✓',t:'Vaccination administered · Record updated · Owner notified',c:'#22c55e'}], metrics:[{v:'< 2min',l:'Check-in'},{v:'RFID',l:'Powered'},{v:'100%',l:'Digital'}]},
    crm:       {title:'CRM Pipeline', lines:[{r:'Lead',t:'Inbound demo request — Enterprise client, 200 seats',c:'rgba(255,255,255,.5)'},{r:'AI Score',t:'Lead score: 94/100 — High intent · Assign to senior rep',c:'#8B2a2a'},{r:'CRM ✓',t:'HubSpot deal created · Follow-up task set for 9 AM',c:'#22c55e'}], metrics:[{v:'94',l:'AI Lead Score'},{v:'2×',l:'Close Rate'},{v:'Auto',l:'Enriched'}]},
  }
  const cfg = configs[ind.slug] || configs.crm
  const color = ind.color

  return(
    <div className="ind-card" style={{border:`1px solid ${color}33`}}>
      <div className="ic-hdr">
        <div className="ic-dots">{['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="ic-dot" style={{background:c}}/>)}</div>
        <div className="ic-ttl">{cfg.title}</div>
        <div className="ic-live"><div className="ic-live-dot" style={{background:color}}/><span className="ic-live-txt" style={{color}}>LIVE</span></div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:9,marginBottom:0}}>
        {cfg.lines.map((l,i)=>shown>i&&(
          <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{duration:.35}}
            style={{background:`${color}0d`,border:`1px solid ${color}28`,borderRadius:9,padding:'10px 13px'}}
          >
            <div style={{fontSize:9,fontWeight:700,color:l.c,letterSpacing:'.08em',marginBottom:3}}>{l.r.toUpperCase()}</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,.78)',lineHeight:1.45}}>{l.t}</div>
          </motion.div>
        ))}
      </div>
      <div className="ic-metrics">
        {cfg.metrics.map(m=>(
          <div key={m.l} className="ic-metric" style={{background:`${color}11`,border:`1px solid ${color}33`}}>
            <div className="ic-mv" style={{color}}>{m.v}</div>
            <div className="ic-ml">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="ic-glow" style={{background:`radial-gradient(circle,${color}18 0%,transparent 70%)`}}/>
    </div>
  )
}

/* ── HERO COUNTER ── */
function HeroCounter({value,suffix,label,color,go}){
  const [n,setN]=useState(0)
  useEffect(()=>{
    if(!go)return;let v=0;const step=Math.ceil(value/60)
    const t=setInterval(()=>{v+=step;if(v>=value){setN(value);clearInterval(t)}else setN(v)},30)
    return()=>clearInterval(t)
  },[go,value])
  return(
    <div className="h-stat">
      <div className="h-stat-n" style={{color}}>{n}{suffix}</div>
      <div className="h-stat-l">{label}</div>
    </div>
  )
}

/* ── BADGE CONFIGS PER INDUSTRY ── */
const BADGE_CONFIG = {
  healthcare: [{label:'HIPAA ✓',color:'#22c55e',top:'8%',left:'-10%'},{label:'FHIR R4',color:'#8B5CF6',top:'20%',right:'-8%'},{label:'Epic EHR',color:'#1565A8',bottom:'28%',left:'-12%'},{label:'Azure OpenAI',color:'#0078D4',bottom:'12%',right:'-6%'}],
  wellness:   [{label:'HIPAA ✓',color:'#22c55e',top:'8%',left:'-10%'},{label:'IVF Portal',color:'#0f7a5a',top:'20%',right:'-8%'},{label:'React Native',color:'#2E9ED6',bottom:'28%',left:'-12%'},{label:'Telehealth',color:'#8B5CF6',bottom:'12%',right:'-6%'}],
  education:  [{label:'Claude API',color:'#D4A843',top:'8%',left:'-10%'},{label:'AI Matching',color:'#7a5a0a',top:'20%',right:'-8%'},{label:'Next.js',color:'#2E9ED6',bottom:'28%',left:'-12%'},{label:'PostgreSQL',color:'#336791',bottom:'12%',right:'-6%'}],
  automation: [{label:'VAPI',color:'#FF6B2B',top:'8%',left:'-10%'},{label:'ElevenLabs',color:'#2E9ED6',top:'20%',right:'-8%'},{label:'HubSpot',color:'#FF7A59',bottom:'28%',left:'-12%'},{label:'GoHighLevel',color:'#6b2fa0',bottom:'12%',right:'-6%'}],
  marketplace:[{label:'Stripe',color:'#635BFF',top:'8%',left:'-10%'},{label:'Multi-vendor',color:'#0a7a7a',top:'20%',right:'-8%'},{label:'Next.js',color:'#2E9ED6',bottom:'28%',left:'-12%'},{label:'Supabase',color:'#22c55e',bottom:'12%',right:'-6%'}],
  petcare:    [{label:'RFID',color:'#3a7a0a',top:'8%',left:'-10%'},{label:'Azure IoT',color:'#0078D4',top:'20%',right:'-8%'},{label:'React Native',color:'#2E9ED6',bottom:'28%',left:'-12%'},{label:'Kiosk',color:'#FF6B2B',bottom:'12%',right:'-6%'}],
  crm:        [{label:'HubSpot',color:'#FF7A59',top:'8%',left:'-10%'},{label:'Apollo.io',color:'#6b2fa0',top:'20%',right:'-8%'},{label:'GoHighLevel',color:'#FF6B2B',bottom:'28%',left:'-12%'},{label:'AI Scoring',color:'#22c55e',bottom:'12%',right:'-6%'}],
}

const STAT_CONFIG = {
  healthcare:  [{v:70,s:'%',l:'Doc Time Saved'},{v:0,s:'HIPAA',l:'Compliant'},{v:98,s:'%',l:'AI Accuracy'},{v:0,s:'FHIR',l:'Native'}],
  wellness:    [{v:3,s:'×',l:'Patient Engagement'},{v:0,s:'HIPAA',l:'Compliant'},{v:40,s:'%',l:'Admin Reduced'},{v:0,s:'24/7',l:'Portal Access'}],
  education:   [{v:10,s:'k+',l:'Students Placed'},{v:96,s:'%',l:'Match Accuracy'},{v:8,s:'wks',l:'Avg Delivery'},{v:0,s:'AI',l:'Powered'}],
  automation:  [{v:60,s:'%',l:'Cost Reduction'},{v:3,s:'s',l:'AI Response'},{v:0,s:'24/7',l:'Always On'},{v:5,s:'×',l:'Lead Capacity'}],
  marketplace: [{v:30,s:'s',l:'Booking Time'},{v:4.8,s:'★',l:'Avg Rating'},{v:0,s:'Multi',l:'Vendor'},{v:0,s:'Stripe',l:'Payments'}],
  petcare:     [{v:2,s:'min',l:'Check-in Time'},{v:0,s:'RFID',l:'Powered'},{v:100,s:'%',l:'Digital Records'},{v:0,s:'IoT',l:'Connected'}],
  crm:         [{v:2,s:'×',l:'Close Rate'},{v:94,s:'',l:'AI Lead Score'},{v:30,s:'%',l:'Admin Saved'},{v:0,s:'Auto',l:'Enriched'}],
}

export default function IndustryPage({ ind, slug, prev, next, allInds }){
  const [go,setGo]=useState(false)
  const [shown,setShown]=useState(0)
  const statsRef=useRef(null)
  const canvasRef=useRef(null)

  useEffect(()=>{
    const els=document.querySelectorAll('.rv')
    const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')})},{threshold:0.07})
    els.forEach(el=>obs.observe(el));return()=>obs.disconnect()
  },[])

  useEffect(()=>{
    const el=statsRef.current;if(!el)return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:.3})
    obs.observe(el);return()=>obs.disconnect()
  },[])

  // animate card lines
  useEffect(()=>{
    const delays=[800,2000,3400]
    const timers=delays.map((d,i)=>setTimeout(()=>setShown(i+1),d))
    const loop=setInterval(()=>{setShown(0);delays.forEach((d,i)=>setTimeout(()=>setShown(i+1),d))},8000)
    return()=>{timers.forEach(clearTimeout);clearInterval(loop)}
  },[])

  // particle canvas
  useEffect(()=>{
    const cv=canvasRef.current;if(!cv)return
    const ctx=cv.getContext('2d');let id
    const sz=()=>{cv.width=cv.offsetWidth;cv.height=cv.offsetHeight};sz()
    const col=ind.color
    const pts=Array.from({length:40},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.3+.3,dx:(Math.random()-.5)*.3,dy:(Math.random()-.5)*.3,a:Math.random()*.2+.05}))
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height)
      pts.forEach(p=>{
        const r=parseInt(col.slice(1,3),16),g=parseInt(col.slice(3,5),16),b=parseInt(col.slice(5,7),16)
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${r},${g},${b},${p.a})`;ctx.fill()
        p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>cv.width)p.dx*=-1;if(p.y<0||p.y>cv.height)p.dy*=-1
      })
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<90){const r=parseInt(col.slice(1,3),16),g=parseInt(col.slice(3,5),16),b=parseInt(col.slice(5,7),16);ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(${r},${g},${b},${.05*(1-d/90)})`;ctx.lineWidth=.5;ctx.stroke()}}
      id=requestAnimationFrame(draw)
    }
    draw();window.addEventListener('resize',sz)
    return()=>{cancelAnimationFrame(id);window.removeEventListener('resize',sz)}
  },[ind.color])

  const fadeUp={hidden:{opacity:0,y:28},show:{opacity:1,y:0,transition:{duration:.65,ease:[.22,1,.36,1]}}}
  const stagger={hidden:{},show:{transition:{staggerChildren:.1}}}
  const badges=BADGE_CONFIG[slug]||BADGE_CONFIG.healthcare
  const stats=STAT_CONFIG[slug]||STAT_CONFIG.healthcare

  return(
    <Layout>
      <Head>
        <title>{ind.name} Software — CSharpTek</title>
        <meta name="description" content={ind.metaDesc}/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet"/>
      </Head>
      <style dangerouslySetInnerHTML={{__html:S}}/>

      {/* ── HERO ── */}
      <section className="hero" style={{background:`linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%)`}}>
        <canvas ref={canvasRef}/>
        <div className="h-orb" style={{top:-100,left:-150,width:500,height:500,background:`radial-gradient(circle,${ind.color}25 0%,transparent 70%)`,animation:'orbFloat 9s ease-in-out infinite'}}/>
        <div className="h-orb" style={{bottom:-100,right:-150,width:500,height:500,background:'radial-gradient(circle,rgba(46,158,214,.08) 0%,transparent 70%)',animation:'orbFloat 11s ease-in-out infinite reverse'}}/>

        <div className="h-grid">
          {/* LEFT */}
          <motion.div className="h-left" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Link href="/industries" className="h-back">← All Industries</Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="h-eye">
                <span style={{fontSize:18}}>{ind.icon}</span>
                <span>{ind.tagline}</span>
              </div>
            </motion.div>
            <motion.h1 className="h-h1" variants={fadeUp}>
              {ind.headline}<br/>
              <span style={{background:`linear-gradient(135deg,${ind.color},${ind.color}bb)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{ind.headlineAccent}</span>
            </motion.h1>
            <motion.p className="h-sub" variants={fadeUp}>{ind.subline}</motion.p>
            <motion.div className="h-ctas" variants={fadeUp}>
              <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
                <Link href="/contact" className="h-btn-p">Get a Free Consultation →</Link>
              </motion.div>
              <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
                <Link href="/portfolio" className="h-btn-s">View Case Studies</Link>
              </motion.div>
            </motion.div>
            <motion.div className="h-tags" variants={fadeUp}>
              {ind.heroTags.map(t=>(
                <motion.span key={t} className="h-tag" whileHover={{scale:1.05,borderColor:`${ind.color}66`,color:'rgba(255,255,255,.85)'}}>{t}</motion.span>
              ))}
            </motion.div>
            <motion.div ref={statsRef} className="h-stats" variants={fadeUp}>
              {stats.map((s,i)=>(
                <HeroCounter key={s.l} value={s.v} suffix={s.s} label={s.l} color={ind.color} go={go}/>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div className="h-right" initial={{opacity:0,x:60}} animate={{opacity:1,x:0}} transition={{duration:.9,delay:.3,ease:[.22,1,.36,1]}} style={{position:'relative'}}>
            {badges.map((b,i)=>(
              <motion.div key={b.label} className="h-fbadge"
                style={{top:b.top,bottom:b.bottom,left:b.left,right:b.right,border:`1px solid ${b.color}44`,color:b.color,boxShadow:`0 4px 20px ${b.color}22`}}
                initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}} transition={{delay:1+i*.15,type:'spring',stiffness:160}}
                whileHover={{scale:1.1}}
              >{b.label}</motion.div>
            ))}
            <div style={{position:'absolute',inset:-2,background:`linear-gradient(135deg,${ind.color}18,rgba(46,158,214,.06))`,borderRadius:24,filter:'blur(20px)',zIndex:-1}}/>
            {slug==='healthcare'
              ? <HealthcareCard shown={shown} color={ind.color}/>
              : <GenericCard ind={ind} shown={shown}/>
            }
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.3}}
              style={{marginTop:12,display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontSize:11,color:'rgba(255,255,255,.3)',fontWeight:600}}
            >
              <div style={{width:4,height:4,borderRadius:'50%',background:ind.color}}/>
              Live demo — {ind.name} vertical
              <div style={{width:4,height:4,borderRadius:'50%',background:ind.color}}/>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="pain">
        <div className="in">
          <div className="rv" style={{textAlign:'center'}}>
            <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="ldot"/>The Challenges</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#0A1628',marginBottom:14}}>We Know Your Pain Points</h2>
            <p style={{fontSize:16,color:'rgba(10,22,40,.55)',maxWidth:500,margin:'0 auto'}}>Deep domain experience means we understand your specific challenges — and we&apos;ve already built solutions for them.</p>
          </div>
          <div className="pain-grid">
            {ind.painPoints.map((p,i)=>(
              <div key={p.title} className={`pain-card rv d${i+1}`}>
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
          <div className="rv" style={{textAlign:'center'}}>
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>What We Build</div>
            <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Solutions for {ind.name}</h2>
            <p style={{fontSize:16,color:'rgba(255,255,255,.5)',maxWidth:500,margin:'0 auto'}}>Purpose-built for your sector — not generic software with an industry label.</p>
          </div>
          <div className="sol-grid">
            {ind.solutions.map((s,i)=>(
              <div key={s.title} className={`sol-card rv d${(i%6)+1}`}>
                <div className="sol-ic">{s.icon}</div>
                <div className="sol-t">{s.title}</div>
                <div className="sol-d">{s.desc}</div>
                <div className="sol-tags">{s.tags.map(t=><span key={t} className="sol-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE / TRUST ── */}
      {ind.compliance&&(
        <section className="trust-sec">
          <div className="in">
            <div className="rv" style={{textAlign:'center'}}>
              <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="ldot"/>Compliance &amp; Trust</div>
              <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#0A1628',marginBottom:14}}>Built to the Highest Standard</h2>
            </div>
            <div className="trust-grid">
              {ind.compliance.map((c,i)=>(
                <div key={c.title} className={`trust-card rv d${i+1}`}>
                  <div className="trust-ic">{c.icon}</div>
                  <div className="trust-t">{c.title}</div>
                  <div className="trust-d">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CASE STUDY ── */}
      {ind.caseStudy&&(
        <section className="case-sec">
          <div className="in">
            <div className="rv" style={{textAlign:'center',marginBottom:44}}>
              <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>Case Study</div>
              <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Real Results. Real Clients.</h2>
            </div>
            <div className="case-card rv">
              <div>
                <div className="case-cl">{ind.caseStudy.client}</div>
                <div className="case-t">{ind.caseStudy.title}</div>
                <div className="case-d">{ind.caseStudy.desc}</div>
                <div className="case-stk">{ind.caseStudy.stack.map(t=><span key={t} className="case-tk">{t}</span>)}</div>
                <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:14,fontWeight:700,color:'#FF6B2B'}}>Discuss a Similar Project →</Link>
              </div>
              <div className="case-mets">
                {ind.caseStudy.metrics.map(m=>(
                  <div key={m.l} className="case-met">
                    <div className="case-met-v">{m.v}</div>
                    <div className="case-met-l">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICES ── */}
      {ind.services&&(
        <section className="svcs-sec">
          <div className="in">
            <div className="rv" style={{textAlign:'center'}}>
              <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>Related Services</div>
              <h2 className="sec-t" style={{fontSize:'clamp(26px,3.5vw,42px)',color:'#fff',marginBottom:14}}>Services We Apply</h2>
            </div>
            <div className="svcs-grid">
              {ind.services.map((s,i)=>(
                <Link key={s.title} href={s.href} className={`svc-card rv d${(i%6)+1}`}>
                  <div className="svc-ic">{s.icon}</div>
                  <div className="svc-t">{s.title}</div>
                  <div className="svc-d">{s.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="cta-sec">
        <div style={{position:'absolute',top:-80,left:'50%',transform:'translateX(-50%)',width:600,height:600,borderRadius:'50%',background:`radial-gradient(circle,${ind.color}18 0%,transparent 70%)`,pointerEvents:'none'}}/>
        <div className="cta-in rv">
          <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>{ind.ctaHeadline||`Your ${ind.name} Partner`}</div>
          <h2 className="cta-t">Ready to Build?<br/><span style={{background:'linear-gradient(135deg,#FF6B2B,#ffaa80)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Let&apos;s Talk.</span></h2>
          <p className="cta-s">{ind.ctaDesc||`Book a free discovery call. We'll assess your requirements and propose a solution within 48 hours.`}</p>
          <div className="ctas">
            <Link href="/contact" className="btn-p">Book a Free Consultation →</Link>
            <Link href="/portfolio" className="btn-s">View Case Studies</Link>
          </div>
        </div>
      </section>

      {/* ── OTHER INDUSTRIES ── */}
      <section className="other">
        <div className="in">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap',gap:12}}>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,.32)',letterSpacing:'.12em',textTransform:'uppercase',marginBottom:4}}>Explore More</div>
              <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:800,color:'#fff'}}>Other Industries We Serve</h3>
            </div>
            <Link href="/industries" style={{fontSize:13,fontWeight:700,color:'#FF6B2B'}}>View All →</Link>
          </div>
          <div className="other-grid">
            {allInds.filter(i=>i.slug!==slug).map(i=>(
              <Link key={i.slug} href={`/industries/${i.slug}`} className="other-card">
                <span className="other-ic">{i.icon}</span>
                <span className="other-t">{i.name}</span>
                <span className="other-arr">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREV/NEXT ── */}
      <nav className="pn">
        <div className="pn-in">
          {prev?(<Link href={`/industries/${prev.slug}`} className="pn-btn"><span className="pn-arr">←</span><div><div className="pn-lbl">Previous</div><div className="pn-name"><span>{prev.icon}</span>{prev.name}</div></div></Link>):<div/>}
          <Link href="/industries" className="pn-all">⊞ All Industries</Link>
          {next?(<Link href={`/industries/${next.slug}`} className="pn-btn" style={{justifyContent:'flex-end'}}><div style={{textAlign:'right'}}><div className="pn-lbl">Next</div><div className="pn-name" style={{justifyContent:'flex-end'}}>{next.name}<span>{next.icon}</span></div></div><span className="pn-arr">→</span></Link>):<div/>}
        </div>
      </nav>

      <ScrollToTop/>
    </Layout>
  )
}
