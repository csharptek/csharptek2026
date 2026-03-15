import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 90, right: 26, zIndex: 998,
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(21,101,168,.9)',
        border: '1px solid rgba(46,158,214,.4)',
        backdropFilter: 'blur(12px)',
        color: '#fff', fontSize: 18, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(21,101,168,.4)',
        transition: 'all .2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1565A8'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(21,101,168,.9)'; e.currentTarget.style.transform = 'none' }}
    >
      ↑
    </button>
  )
}
