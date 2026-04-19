/* ================================================================
   PATCH FILE — pages/index.js
   
   STEP 1: Add import at top of pages/index.js
   After the existing imports, add:
   
     import { motion, AnimatePresence } from 'framer-motion'
   
   ================================================================
   
   STEP 2: Find this in GLOBAL_STYLES (the big CSS string):
   
     @keyframes heroUp{from{transform:translateY(28px)}to{transform:translateY(0)}}
   
   Add these lines RIGHT AFTER it:
   
     @keyframes waveBar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
     @keyframes pulseGlow{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
     @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
     .hero-new{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 55%,#091422 100%);padding:100px 0 60px;}
     .hero-new canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
     .hero-new .orb1{position:absolute;top:4%;left:-8%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);pointer-events:none;animation:orbFloat 9s ease-in-out infinite;}
     .hero-new .orb2{position:absolute;bottom:0;right:-12%;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);pointer-events:none;animation:orbFloat 11s ease-in-out infinite reverse;}
     .hero-grid{max-width:1200px;margin:0 auto;padding:0 28px;width:100%;position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
     .hero-left{display:flex;flex-direction:column;}
     .hero-eyebrow-new{display:inline-flex;align-items:center;gap:8px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.25);border-radius:100px;padding:7px 16px;margin-bottom:24px;width:fit-content;}
     .hero-eyebrow-new span{font-size:12px;font-weight:700;color:#FF6B2B;letter-spacing:.1em;text-transform:uppercase;}
     .hero-h1-new{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-weight:800;font-size:clamp(36px,4.5vw,62px);color:#fff;line-height:1.08;letter-spacing:-.03em;margin-bottom:20px;}
     .hero-grad-blue{background:linear-gradient(135deg,#2E9ED6,#7EC8E3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
     .hero-sub-new{font-size:clamp(14px,1.4vw,17px);color:rgba(255,255,255,.55);line-height:1.75;margin-bottom:36px;max-width:480px;}
     .hero-ctas-new{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:32px;}
     .btn-primary-new{background:linear-gradient(135deg,#FF6B2B,#e55a1f);color:#fff;padding:15px 32px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;display:inline-block;box-shadow:0 8px 28px rgba(255,107,43,.35);letter-spacing:.02em;transition:transform .2s,box-shadow .2s;}
     .btn-primary-new:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(255,107,43,.45);}
     .btn-secondary-new{background:rgba(46,158,214,.08);color:#7EC8E3;padding:15px 32px;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;display:inline-block;border:1.5px solid rgba(46,158,214,.3);letter-spacing:.02em;transition:all .2s;}
     .btn-secondary-new:hover{border-color:rgba(46,158,214,.6);background:rgba(46,158,214,.13);}
     .hero-pills-new{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:40px;}
     .hero-pill-new{font-size:11px;font-weight:700;color:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.1);border-radius:100px;padding:5px 13px;letter-spacing:.06em;cursor:default;}
     .stats-row-new{display:flex;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.12);border-radius:16px;overflow:hidden;}
     .stat-cell-new{flex:1;padding:20px 12px;border-right:1px solid rgba(46,158,214,.1);display:flex;flex-direction:column;align-items:center;}
     .stat-cell-new:last-child{border-right:none;}
     .stat-num-new{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(24px,3vw,38px);font-weight:800;background:linear-gradient(135deg,#FF6B2B,#ffaa80);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;}
     .stat-lbl-new{font-size:10px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.1em;font-weight:700;margin-top:5px;text-align:center;}
     .hero-right-new{position:relative;}
     .scribe-card{background:rgba(13,27,52,.92);border:1px solid rgba(46,158,214,.25);border-radius:20px;padding:22px 24px;backdrop-filter:blur(24px);box-shadow:0 32px 80px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.06);min-height:340px;position:relative;overflow:hidden;animation:heroFloat 5s ease-in-out infinite;}
     .card-hdr{display:flex;align-items:center;gap:10px;margin-bottom:18px;border-bottom:1px solid rgba(46,158,214,.1);padding-bottom:14px;}
     .card-dots-row{display:flex;gap:6px;}
     .card-dot-new{width:10px;height:10px;border-radius:50%;}
     .card-ttl{flex:1;text-align:center;font-size:12px;color:rgba(255,255,255,.4);font-weight:600;}
     .card-live-row{display:flex;align-items:center;gap:5px;}
     .live-dot-new{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulseGlow 2s infinite;}
     .live-txt-new{font-size:10px;color:#22c55e;font-weight:700;}
     .waveform-row{display:flex;align-items:center;gap:3px;margin-bottom:18px;height:32px;}
     .wave-lbl-new{font-size:11px;color:rgba(255,255,255,.35);margin-right:6px;}
     .wave-bar-new{width:3px;border-radius:2px;}
     .transcript-new{display:flex;flex-direction:column;gap:12px;}
     .t-line-new{border-radius:10px;padding:10px 13px;}
     .t-role-new{font-size:10px;font-weight:700;letter-spacing:.08em;margin-bottom:4px;}
     .t-txt-new{font-size:12.5px;color:rgba(255,255,255,.78);line-height:1.5;}
     .metrics-row-new{display:flex;gap:10px;margin-top:18px;}
     .metric-cell-new{flex:1;background:rgba(255,107,43,.07);border:1px solid rgba(255,107,43,.15);border-radius:8px;padding:8px 10px;text-align:center;}
     .metric-val-new{font-size:15px;font-weight:800;color:#FF6B2B;font-family:'Plus Jakarta Sans',sans-serif;}
     .metric-lbl-new{font-size:9px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.08em;margin-top:2px;}
     .float-badge-new{position:absolute;background:rgba(10,22,40,.9);border-radius:100px;padding:6px 13px;font-size:11px;font-weight:700;white-space:nowrap;backdrop-filter:blur(12px);}
     .card-glow-new{position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(46,158,214,.12) 0%,transparent 70%);pointer-events:none;}
     .scroll-ind-new{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;}
     .scroll-txt-new{font-size:10px;color:rgba(255,255,255,.22);letter-spacing:.12em;text-transform:uppercase;}
     .scroll-dot-new{width:4px;height:4px;border-radius:50%;background:#FF6B2B;animation:bounce 1.8s ease-in-out infinite;}
     @media(max-width:900px){.hero-grid{grid-template-columns:1fr;}.hero-right-new{display:none;}}
     @media(max-width:580px){.hero-ctas-new{flex-direction:column;}.stats-row-new{flex-wrap:wrap;}.stat-cell-new{min-width:50%;}}
   
   ================================================================
   
   STEP 3: Find the entire Hero() function in pages/index.js.
   It starts with:
     function Hero(){
   and ends after the closing brace of the function.
   
   REPLACE the entire Hero() function with the code below.
   
   ================================================================ */

const INDUSTRIES_R = ['Healthcare','Education','Wellness','Automation','Pet Care','Marketplaces']

const SCRIBE_LINES_R = [
  { role:'Patient',   color:'rgba(255,255,255,.35)', bg:'rgba(255,255,255,.04)', border:'rgba(255,255,255,.08)', text:'I have had sharp chest pain since this morning…' },
  { role:'AI Scribe', color:'#2E9ED6',               bg:'rgba(46,158,214,.08)',  border:'rgba(46,158,214,.18)',  text:'CC: Acute chest pain onset 0800. SOAP note generating…' },
  { role:'FHIR ✓',   color:'#22c55e',               bg:'rgba(34,197,94,.07)',   border:'rgba(34,197,94,.2)',    text:'Synced to Epic EHR — Encounter #48291' },
]

const FLOAT_BADGES_R = [
  { label:'Azure OpenAI', color:'#0078D4', top:'8%',    left:'-10%'   },
  { label:'Claude AI',    color:'#D4A843', top:'18%',   right:'-8%'   },
  { label:'HIPAA ✓',     color:'#22c55e', bottom:'30%', left:'-12%'  },
  { label:'FHIR',         color:'#8B5CF6', bottom:'14%', right:'-6%' },
  { label:'VAPI',         color:'#FF6B2B', top:'52%',   left:'-14%'   },
  { label:'ElevenLabs',   color:'#2E9ED6', top:'68%',   right:'-12%'  },
]

const WAVE_BARS_R = Array.from({length:28},(_,i)=>({ h:Math.floor(6+((i*7+13)%24)), active:i<20, delay:(i%5)*0.1 }))

function HeroCounterR({ value, suffix, label, go }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    let v = 0; const step = Math.ceil(value / 40)
    const t = setInterval(() => { v += step; if (v >= value){ setN(value); clearInterval(t) } else setN(v) }, 35)
    return () => clearInterval(t)
  }, [go, value])
  return (
    <div className="stat-cell-new">
      <div className="stat-num-new">{n}{suffix}</div>
      <div className="stat-lbl-new">{label}</div>
    </div>
  )
}

function ScribeCardR() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const delays = [800, 2200, 3600]
    const timers = delays.map((d,i) => setTimeout(()=>setShown(i+1), d))
    const loop = setInterval(()=>{
      setShown(0)
      delays.forEach((d,i) => setTimeout(()=>setShown(i+1), d))
    }, 8000)
    return () => { timers.forEach(clearTimeout); clearInterval(loop) }
  }, [])
  return (
    <div className="scribe-card">
      <div className="card-hdr">
        <div className="card-dots-row">
          {['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="card-dot-new" style={{background:c}}/>)}
        </div>
        <div className="card-ttl">CSharpTek AI Medical Scribe</div>
        <div className="card-live-row">
          <div className="live-dot-new"/><span className="live-txt-new">LIVE</span>
        </div>
      </div>
      <div className="waveform-row">
        <span className="wave-lbl-new">Audio</span>
        {WAVE_BARS_R.map((b,i)=>(
          <div key={i} className="wave-bar-new" style={{
            height:b.h,
            background:b.active?'linear-gradient(to top,#1565A8,#2E9ED6)':'rgba(255,255,255,.1)',
            animationName:b.active?'waveBar':'none',
            animationDuration:`${0.4+b.delay}s`,
            animationIterationCount:'infinite',
            animationTimingFunction:'ease-in-out',
            animationDirection:'alternate',
          }}/>
        ))}
      </div>
      <div className="transcript-new">
        {SCRIBE_LINES_R.map((line,i)=> shown > i && (
          <motion.div key={i} className="t-line-new"
            style={{background:line.bg, border:`1px solid ${line.border}`}}
            initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{duration:.4}}
          >
            <div className="t-role-new" style={{color:line.color}}>{line.role.toUpperCase()}</div>
            <div className="t-txt-new">{line.text}</div>
          </motion.div>
        ))}
      </div>
      <div className="metrics-row-new">
        {[{v:'70%',l:'Time Saved'},{v:'98.4%',l:'Accuracy'},{v:'< 2s',l:'EHR Sync'}].map(m=>(
          <div key={m.l} className="metric-cell-new">
            <div className="metric-val-new">{m.v}</div>
            <div className="metric-lbl-new">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="card-glow-new"/>
    </div>
  )
}

function Hero(){
  const [ind, setInd]   = useState(0)
  const [go, setGo]     = useState(false)
  const statsRef         = useRef(null)
  const canvasRef        = useRef(null)

  useEffect(()=>{
    const t = setInterval(()=>setInd(i=>(i+1)%INDUSTRIES_R.length), 2500)
    return ()=>clearInterval(t)
  },[])

  useEffect(()=>{
    const el=statsRef.current; if(!el) return
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setGo(true) },{threshold:.3})
    obs.observe(el); return ()=>obs.disconnect()
  },[])

  useEffect(()=>{
    const cv=canvasRef.current; if(!cv) return
    const ctx=cv.getContext('2d'); let id
    const sz=()=>{ cv.width=cv.offsetWidth; cv.height=cv.offsetHeight }
    sz()
    const pts=Array.from({length:55},()=>({
      x:Math.random()*cv.width, y:Math.random()*cv.height,
      r:Math.random()*1.4+.3, dx:(Math.random()-.5)*.35, dy:(Math.random()-.5)*.35,
      a:Math.random()*.3+.08,
    }))
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height)
      pts.forEach(p=>{
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(46,158,214,${p.a})`;ctx.fill()
        p.x+=p.dx;p.y+=p.dy
        if(p.x<0||p.x>cv.width)p.dx*=-1
        if(p.y<0||p.y>cv.height)p.dy*=-1
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y)
        if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y)
          ctx.strokeStyle=`rgba(46,158,214,${.06*(1-d/110)})`;ctx.lineWidth=.5;ctx.stroke()}
      }
      id=requestAnimationFrame(draw)
    }
    draw(); window.addEventListener('resize',sz)
    return ()=>{ cancelAnimationFrame(id); window.removeEventListener('resize',sz) }
  },[])

  const fadeUp  = { hidden:{opacity:0,y:28}, show:{opacity:1,y:0,transition:{duration:.65,ease:[.22,1,.36,1]}} }
  const stagger = { hidden:{}, show:{transition:{staggerChildren:.1}} }

  return (
    <section className="hero-new" id="home">
      <canvas ref={canvasRef}/>
      <div className="orb1"/><div className="orb2"/>

      <div className="hero-grid">
        {/* LEFT */}
        <motion.div className="hero-left" variants={stagger} initial="hidden" animate="show">

          <motion.div variants={fadeUp}>
            <div className="hero-eyebrow-new">
              <div style={{width:6,height:6,borderRadius:'50%',background:'#FF6B2B',animation:'pulseGlow 2s infinite',flexShrink:0}}/>
              <span>AI-First Software Development</span>
            </div>
          </motion.div>

          <motion.h1 className="hero-h1-new" variants={fadeUp}>
            We Build <span className="hero-grad-blue">AI-Powered</span>
            <br/>Software for{' '}
            <span style={{display:'inline-block',minWidth:220}}>
              <AnimatePresence mode="wait">
                <motion.span key={ind}
                  initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
                  transition={{duration:.4,ease:[.22,1,.36,1]}}
                  style={{display:'inline-block',background:'linear-gradient(135deg,#FF6B2B,#ffaa80)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}
                >{INDUSTRIES_R[ind]}</motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p className="hero-sub-new" variants={fadeUp}>
            From Azure cloud infrastructure to cutting-edge AI integrations — we design, build and deploy intelligent software that drives real business outcomes.
          </motion.p>

          <motion.div className="hero-ctas-new" variants={fadeUp}>
            <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
              <a href="/contact" className="btn-primary-new">Start a Project →</a>
            </motion.div>
            <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
              <a href="/portfolio" className="btn-secondary-new">View Our Work</a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-pills-new" variants={fadeUp}>
            {['Microsoft Azure','AWS','Google Cloud','OpenAI','Anthropic'].map((p,i)=>(
              <motion.span key={p} className="hero-pill-new"
                initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}}
                transition={{delay:.8+i*.08}}
              >{p}</motion.span>
            ))}
          </motion.div>

          <motion.div ref={statsRef} className="stats-row-new" variants={fadeUp}>
            {[{value:10,suffix:'+',label:'Years Experience'},{value:50,suffix:'+',label:'Projects Delivered'},{value:7,suffix:'',label:'Industries Served'},{value:3,suffix:'',label:'Cloud Marketplaces'}].map(s=>(
              <HeroCounterR key={s.label} {...s} go={go}/>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div className="hero-right-new"
          initial={{opacity:0,x:60}} animate={{opacity:1,x:0}}
          transition={{duration:.9,delay:.3,ease:[.22,1,.36,1]}}
        >
          {FLOAT_BADGES_R.map((b,i)=>(
            <motion.div key={b.label} className="float-badge-new"
              style={{top:b.top,bottom:b.bottom,left:b.left,right:b.right,border:`1px solid ${b.color}44`,color:b.color,boxShadow:`0 4px 20px ${b.color}22`}}
              initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}}
              transition={{delay:1+i*.15,type:'spring',stiffness:160}}
            >{b.label}</motion.div>
          ))}
          <div style={{position:'absolute',inset:-2,background:'linear-gradient(135deg,rgba(46,158,214,.15),rgba(255,107,43,.1))',borderRadius:24,filter:'blur(20px)',zIndex:-1}}/>
          <ScribeCardR/>
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.2}}
            style={{marginTop:14,display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontSize:12,color:'rgba(255,255,255,.3)',fontWeight:600}}
          >
            <div style={{width:4,height:4,borderRadius:'50%',background:'#22c55e'}}/>
            Live demo — AI Medical Scribe · Healthcare
            <div style={{width:4,height:4,borderRadius:'50%',background:'#22c55e'}}/>
          </motion.div>
        </motion.div>
      </div>

      <div className="scroll-ind-new">
        <span className="scroll-txt-new">Scroll</span>
        <div className="scroll-dot-new"/>
      </div>
    </section>
  )
}
