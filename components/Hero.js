'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ── CONSTANTS ── */
const INDUSTRIES = ['Healthcare', 'Education', 'Wellness', 'Automation', 'Pet Care', 'Marketplaces']

const STATS = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 7,  suffix: '',  label: 'Industries Served' },
  { value: 3,  suffix: '',  label: 'Cloud Marketplaces' },
]

const BADGES = [
  { label: 'Azure OpenAI', color: '#0078D4', top: '8%',  left: '-12%' },
  { label: 'Claude AI',    color: '#D4A843', top: '20%', right: '-10%' },
  { label: 'HIPAA',        color: '#22c55e', bottom: '28%', left: '-14%' },
  { label: 'FHIR',         color: '#8B5CF6', bottom: '12%', right: '-8%' },
  { label: 'VAPI',         color: '#FF6B2B', top: '55%', left: '-16%' },
  { label: 'ElevenLabs',   color: '#2E9ED6', top: '70%', right: '-14%' },
]

const SCRIBE_LINES = [
  { role: 'Patient', text: 'I have had a sharp chest pain since this morning…', delay: 0 },
  { role: 'AI Scribe', text: 'CC: Acute chest pain, onset 0800. SOAP note generating…', delay: 1.4 },
  { role: 'FHIR', text: '✓ Synced to Epic EHR — Encounter #48291', delay: 2.8 },
]

/* ── COUNTER ── */
function Counter({ value, suffix, label, animate }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!animate) return
    let start = 0
    const step = Math.ceil(value / 40)
    const t = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(t) }
      else setCount(start)
    }, 35)
    return () => clearInterval(t)
  }, [animate, value])
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(26px,3.2vw,40px)',
        fontWeight: 800,
        background: 'linear-gradient(135deg,#FF6B2B,#ffaa80)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
      }}>{count}{suffix}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.42)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginTop: 6 }}>{label}</div>
    </div>
  )
}

/* ── SCRIBE CARD ── */
function ScribeCard() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [pulsing, setPulsing] = useState(true)

  useEffect(() => {
    const timers = SCRIBE_LINES.map((l, i) =>
      setTimeout(() => setVisibleLines(i + 1), l.delay * 1000 + 800)
    )
    const reset = setTimeout(() => {
      setVisibleLines(0)
      setTimeout(() => setVisibleLines(0), 200)
    }, 7000)
    const loop = setInterval(() => {
      setVisibleLines(0)
      SCRIBE_LINES.forEach((l, i) =>
        setTimeout(() => setVisibleLines(i + 1), l.delay * 1000 + 400)
      )
    }, 8000)
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); clearInterval(loop) }
  }, [])

  return (
    <div style={{
      background: 'rgba(13,27,52,0.92)',
      border: '1px solid rgba(46,158,214,.25)',
      borderRadius: 20,
      padding: '22px 24px',
      backdropFilter: 'blur(24px)',
      boxShadow: '0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(46,158,214,.08), inset 0 1px 0 rgba(255,255,255,.06)',
      minHeight: 340,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, borderBottom: '1px solid rgba(46,158,214,.1)', paddingBottom: 14 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57','#ffbd2e','#28c840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.4)', fontWeight: 600 }}>
          CSharpTek AI Medical Scribe
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>

      {/* Waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 18, height: 32 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginRight: 6 }}>Audio</span>
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} style={{
            width: 3,
            height: `${Math.random() * 24 + 6}px`,
            background: i < 20 ? 'linear-gradient(to top,#1565A8,#2E9ED6)' : 'rgba(255,255,255,.1)',
            borderRadius: 2,
            animation: i < 20 ? `wave ${0.4 + (i % 5) * 0.1}s ease-in-out infinite alternate` : 'none',
          }} />
        ))}
      </div>

      {/* Transcript lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SCRIBE_LINES.map((line, i) => (
          <AnimatePresence key={i}>
            {visibleLines > i && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: line.role === 'AI Scribe'
                    ? 'rgba(46,158,214,.08)'
                    : line.role === 'FHIR'
                    ? 'rgba(34,197,94,.07)'
                    : 'rgba(255,255,255,.04)',
                  border: `1px solid ${
                    line.role === 'AI Scribe' ? 'rgba(46,158,214,.18)'
                    : line.role === 'FHIR' ? 'rgba(34,197,94,.2)'
                    : 'rgba(255,255,255,.06)'
                  }`,
                  borderRadius: 10,
                  padding: '10px 13px',
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', color: line.role === 'AI Scribe' ? '#2E9ED6' : line.role === 'FHIR' ? '#22c55e' : 'rgba(255,255,255,.35)', marginBottom: 4 }}>
                  {line.role.toUpperCase()}
                </div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.78)', lineHeight: 1.5 }}>
                  {line.text}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Bottom metrics */}
      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        {[{ label: 'Time Saved', value: '70%' }, { label: 'Accuracy', value: '98.4%' }, { label: 'EHR Sync', value: '< 2s' }].map(m => (
          <div key={m.label} style={{
            flex: 1, background: 'rgba(255,107,43,.07)', border: '1px solid rgba(255,107,43,.15)',
            borderRadius: 8, padding: '8px 10px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#FF6B2B', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{m.value}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(46,158,214,.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ── MAIN HERO ── */
export default function Hero() {
  const [industryIndex, setIndustryIndex] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const cardRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [6, -6]), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-6, 6]), { stiffness: 100, damping: 20 })

  /* Industry rotation */
  useEffect(() => {
    const t = setInterval(() => setIndustryIndex(i => (i + 1) % INDUSTRIES.length), 2500)
    return () => clearInterval(t)
  }, [])

  /* Stats intersection */
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Mouse parallax on card */
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(e.clientX - cx)
    mouseY.set(e.clientY - cy)
  }

  /* Particle canvas */
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const setSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    setSize()
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35, dy: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.3 + 0.08,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(46,158,214,${p.a})`; ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(46,158,214,${0.06 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', setSize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize) }
  }, [])

  /* Stagger variants */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(155deg,#0A1628 0%,#0D2B45 55%,#091422 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '100px 0 60px',
      }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Orbs */}
      <div style={{ position: 'absolute', top: '4%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%)', pointerEvents: 'none', animation: 'orbFloat 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: 0, right: '-12%', width: 720, height: 720, borderRadius: '50%', background: 'radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%)', pointerEvents: 'none', animation: 'orbFloat 11s ease-in-out infinite reverse' }} />

      {/* Inner */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* ── LEFT ── */}
          <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Eyebrow badge */}
            <motion.div variants={fadeUp}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,107,43,.1)', border: '1px solid rgba(255,107,43,.25)',
                borderRadius: 100, padding: '7px 16px', marginBottom: 24,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B2B', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FF6B2B', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  AI-First Software Development
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(36px,4.5vw,62px)',
              color: '#fff',
              lineHeight: 1.08,
              letterSpacing: '-.03em',
              marginBottom: 20,
            }}>
              We Build{' '}
              <span style={{
                background: 'linear-gradient(135deg,#2E9ED6,#7EC8E3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                AI-Powered
              </span>
              <br />Software for{' '}
              <span style={{ display: 'inline-block', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={industryIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: 'linear-gradient(135deg,#FF6B2B,#ffaa80)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'inline-block',
                    }}
                  >
                    {INDUSTRIES[industryIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p variants={fadeUp} style={{
              fontSize: 'clamp(14px,1.4vw,17px)',
              color: 'rgba(255,255,255,.55)',
              lineHeight: 1.75,
              marginBottom: 36,
              maxWidth: 480,
            }}>
              From Azure cloud infrastructure to cutting-edge AI integrations — we design, build and deploy intelligent software that drives real business outcomes.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" style={{
                  background: 'linear-gradient(135deg,#FF6B2B,#e55a1f)',
                  color: '#fff',
                  padding: '15px 32px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 8px 28px rgba(255,107,43,.35)',
                  letterSpacing: '.02em',
                }}>
                  Start a Project →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/portfolio" style={{
                  background: 'rgba(46,158,214,.08)',
                  color: '#7EC8E3',
                  padding: '15px 32px',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-block',
                  border: '1.5px solid rgba(46,158,214,.3)',
                  letterSpacing: '.02em',
                }}>
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>

            {/* Partner pills */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
              {['Microsoft Azure', 'AWS', 'Google Cloud', 'OpenAI', 'Anthropic'].map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(46,158,214,.5)' }}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,.5)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: 100,
                    padding: '5px 13px',
                    letterSpacing: '.06em',
                    cursor: 'default',
                  }}
                >
                  {p}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats bar */}
            <motion.div
              ref={statsRef}
              variants={fadeUp}
              style={{
                display: 'flex',
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(46,158,214,.12)',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  flex: 1,
                  padding: '20px 12px',
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(46,158,214,.1)' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}>
                  <Counter {...s} animate={statsVisible} />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Card ── */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Floating badges */}
              {BADGES.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.15, type: 'spring', stiffness: 160 }}
                  whileHover={{ scale: 1.12 }}
                  style={{
                    position: 'absolute',
                    top: b.top, bottom: b.bottom,
                    left: b.left, right: b.right,
                    background: 'rgba(10,22,40,.9)',
                    border: `1px solid ${b.color}44`,
                    borderRadius: 100,
                    padding: '6px 13px',
                    fontSize: 11,
                    fontWeight: 700,
                    color: b.color,
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(12px)',
                    boxShadow: `0 4px 20px ${b.color}22`,
                    zIndex: 10,
                  }}
                >
                  {b.label}
                </motion.div>
              ))}

              {/* Card glow */}
              <div style={{
                position: 'absolute', inset: -2,
                background: 'linear-gradient(135deg,rgba(46,158,214,.15),rgba(255,107,43,.1))',
                borderRadius: 24, filter: 'blur(20px)', zIndex: -1,
              }} />

              <ScribeCard />

              {/* Industry tag below card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                style={{
                  marginTop: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: 12, color: 'rgba(255,255,255,.35)', fontWeight: 600,
                }}
              >
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
                Live demo — AI Medical Scribe · Healthcare vertical
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF6B2B' }}
        />
      </motion.div>

      <style>{`
        @keyframes orbFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.2)} }
        @keyframes wave { from{transform:scaleY(1)} to{transform:scaleY(0.3)} }
        @media (max-width:900px) {
          #hero-grid { grid-template-columns: 1fr !important; }
          #hero-right { display: none; }
        }
      `}</style>
    </section>
  )
}
