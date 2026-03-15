import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const WORDS = ['Healthcare','Education','Wellness','Automation','Marketplaces','Pet Care','Fertility & IVF']
const STATS  = [
  { id:'s1', target:10, suffix:'+', label:'Years Experience'   },
  { id:'s2', target:50, suffix:'+', label:'Projects Delivered' },
  { id:'s3', target:7,  suffix:'',  label:'Industries Served'  },
  { id:'s4', target:3,  suffix:'',  label:'Cloud Marketplaces' },
]

function useTypewriter(words, speed=85, pause=1900) {
  const [display, setDisplay] = useState('')
  const [wIdx, setWIdx] = useState(0)
  const [cIdx, setCIdx] = useState(0)
  const [del,  setDel]  = useState(false)
  useEffect(() => {
    const cur = words[wIdx]
    let t
    if (!del && cIdx < cur.length)        t = setTimeout(() => setCIdx(c=>c+1), speed)
    else if (!del && cIdx === cur.length) t = setTimeout(() => setDel(true), pause)
    else if (del  && cIdx > 0)            t = setTimeout(() => setCIdx(c=>c-1), speed/2)
    else { setDel(false); setWIdx(w=>(w+1)%words.length) }
    setDisplay(cur.slice(0, cIdx))
    return () => clearTimeout(t)
  }, [cIdx, del, wIdx, words, speed, pause])
  return display
}

function useCountUp(target, duration=1600, start=false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = ts => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1-p, 3)
      setCount(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatItem({ target, suffix, label, animate }) {
  const count = useCountUp(target, 1600, animate)
  return (
    <div className={styles.statItem}>
      <span className={styles.statNum}>{count}{suffix}</span>
      <span className={styles.statLbl}>{label}</span>
    </div>
  )
}

export default function Hero() {
  const canvasRef  = useRef(null)
  const statsRef   = useRef(null)
  const [animate, setAnimate] = useState(false)
  const word = useTypewriter(WORDS)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, W, H
    const setSize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    setSize()
    const pts = Array.from({length:60}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.5+.4,
      dx: (Math.random()-.5)*.38, dy: (Math.random()-.5)*.38,
      a: Math.random()*.4+.1,
    }))
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle = `rgba(46,158,214,${p.a})`; ctx.fill()
        p.x+=p.dx; p.y+=p.dy
        if (p.x<0||p.x>W) p.dx*=-1
        if (p.y<0||p.y>H) p.dy*=-1
      })
      for (let i=0;i<pts.length;i++) for (let j=i+1;j<pts.length;j++) {
        const d = Math.hypot(pts[i].x-pts[j].x, pts[i].y-pts[j].y)
        if (d < 115) {
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y)
          ctx.strokeStyle=`rgba(46,158,214,${.07*(1-d/115)})`; ctx.lineWidth=.5; ctx.stroke()
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', setSize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize) }
  }, [])

  // Stats counter trigger
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true) }, {threshold:.3})
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={styles.hero} id="home">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className="dot" />
          AI-First Software Development
        </div>

        <h1 className={styles.headline}>
          We Build AI-Powered Software
          <br />
          <span className={styles.grad}>Your Industry Needs</span>
        </h1>

        <div className={styles.typeRow}>
          <span className={styles.muted}>Transforming</span>
          <span className={styles.twWord}>{word}</span>
          <span className={styles.cursor}>|</span>
          <span className={styles.muted}>with AI</span>
        </div>

        <p className={styles.sub}>
          From Azure cloud infrastructure to cutting-edge AI integrations — we design,
          build and deploy intelligent software that drives real business outcomes across
          healthcare, education, wellness and beyond.
        </p>

        <div className={styles.ctaRow}>
          <a href="#portfolio" className="btn-primary">Explore Our Work →</a>
          <a href="#contact"   className="btn-secondary">Start a Project</a>
        </div>

        <div className={styles.badges}>
          {['Microsoft Azure','AWS','Google Cloud','OpenAI Partner','Anthropic Claude'].map(b => (
            <span key={b} className={styles.badge}>{b}</span>
          ))}
        </div>
      </div>

      <div ref={statsRef} className={styles.statsBar}>
        {STATS.map(s => <StatItem key={s.id} {...s} animate={animate} />)}
      </div>

      <div className={styles.scrollInd}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  )
}
