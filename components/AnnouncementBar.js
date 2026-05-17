import Link from 'next/link'
import { useState } from 'react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div style={{
      background: 'linear-gradient(90deg,#0D2B45,#1565A8,#0D2B45)',
      borderBottom: '1px solid rgba(46,158,214,.25)',
      padding: '9px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
      position: 'relative', zIndex: 101,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>🚀 Introducing</span>
        <Link href="/products/tekdial" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(46,158,214,.15)', border: '1px solid rgba(46,158,214,.35)',
          borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700, color: '#7EC8E3',
          textDecoration: 'none', transition: 'all .2s',
        }}>📞 TekDial</Link>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>·</span>
        <Link href="/products/teksocial" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,107,43,.12)', border: '1px solid rgba(255,107,43,.3)',
          borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700, color: '#FF6B2B',
          textDecoration: 'none', transition: 'all .2s',
        }}>✨ TekSocial</Link>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>— AI products built by CSharpTek</span>
        <Link href="/products/tekdial" style={{ fontSize: 12, fontWeight: 700, color: '#FF6B2B', textDecoration: 'none' }}>Learn More →</Link>
      </div>
      <button onClick={() => setVisible(false)} style={{
        position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: 'none', color: 'rgba(255,255,255,.4)', cursor: 'pointer',
        fontSize: 16, lineHeight: 1, padding: 4,
      }}>×</button>
    </div>
  )
}
