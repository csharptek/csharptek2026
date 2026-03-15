import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Nav.module.css'

const SERVICES_DROPDOWN = [
  { icon:'🧠', label:'AI Integration & Automation', href:'/services/ai-integration' },
  { icon:'🎙️', label:'AI Voice Agents',             href:'/services/ai-voice' },
  { icon:'📱', label:'Web & Mobile Development',    href:'/services/web-mobile' },
  { icon:'☁️', label:'Cloud Infrastructure & DevOps',href:'/services/cloud-devops' },
  { icon:'🚀', label:'MVP & Vibe Coding',           href:'/services/mvp-vibe' },
  { icon:'🛒', label:'Marketplace Publishing',      href:'/services/marketplace' },
  { icon:'💬', label:'Prompt Engineering',          href:'/services/prompt-engineering' },
  { icon:'⚙️', label:'CRM & Productivity Tools',    href:'/services/crm-productivity' },
  { icon:'🛠️', label:'24/7 Support & Maintenance',  href:'/services/support' },
]

const NAV_LINKS = [
  { label:'Services',     href:'/services',   hasDropdown: true },
  { label:'Industries',   href:'/industries' },
  { label:'Technologies', href:'/#tech' },
  { label:'Portfolio',    href:'/portfolio' },
  { label:'Blog',         href:'/blog' },
  { label:'Careers',      href:'/careers' },
  { label:'About',        href:'/about' },
]

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [dropdown,  setDropdown]  = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const dropRef = useRef(null)
  const router  = useRouter()
  const isHome  = router.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Services link: on homepage scroll to #services, elsewhere go to /services
  const servicesHref = isHome ? '#services' : '/services'

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoCs}>C#</span>
          <span className={styles.logoRest}>harpTek</span>
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>
          {NAV_LINKS.map(l => {
            if (l.hasDropdown) {
              return (
                <div key="services" className={styles.dropWrap} ref={dropRef}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}>
                  <Link href={servicesHref} className={`${styles.link} ${dropdown ? styles.linkActive : ''}`}>
                    Services <span className={styles.chevron}>{dropdown ? '▲' : '▾'}</span>
                  </Link>
                  {dropdown && (
                    <div className={styles.dropdown}>
                      <div className={styles.dropHeader}>All Services</div>
                      {SERVICES_DROPDOWN.map(s => (
                        <Link key={s.href} href={s.href} className={styles.dropItem}
                          onClick={() => setDropdown(false)}>
                          <span className={styles.dropIcon}>{s.icon}</span>
                          <span className={styles.dropLabel}>{s.label}</span>
                        </Link>
                      ))}
                      <div className={styles.dropFooter}>
                        <Link href="/services" className={styles.dropAll} onClick={() => setDropdown(false)}>
                          View All Services →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link key={l.label} href={l.href} className={styles.link}>{l.label}</Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <Link href="/contact" className={styles.cta}>Free Consultation</Link>
        </div>

        {/* Hamburger */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {/* Services with sub-items */}
          <div>
            <button className={styles.mobileLink} style={{width:'100%',background:'none',border:'none',textAlign:'left',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',color:'rgba(255,255,255,.82)',fontSize:16,fontWeight:600,padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,.05)',fontFamily:"'Mulish',sans-serif"}}
              onClick={() => setMobileServices(!mobileServices)}>
              Services <span>{mobileServices ? '▲' : '▾'}</span>
            </button>
            {mobileServices && (
              <div style={{background:'rgba(255,255,255,.03)',borderRadius:8,margin:'4px 0 8px',padding:'6px 0'}}>
                {SERVICES_DROPDOWN.map(s => (
                  <Link key={s.href} href={s.href} className={styles.mobileSubLink}
                    onClick={() => { setMenuOpen(false); setMobileServices(false) }}>
                    <span>{s.icon}</span> {s.label}
                  </Link>
                ))}
                <Link href="/services" style={{display:'block',padding:'8px 16px',color:'#FF6B2B',fontWeight:700,fontSize:13}}
                  onClick={() => { setMenuOpen(false); setMobileServices(false) }}>
                  → View All Services
                </Link>
              </div>
            )}
          </div>
          {NAV_LINKS.filter(l => !l.hasDropdown).map(l => (
            <Link key={l.label} href={l.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>Free Consultation</Link>
        </div>
      )}
    </nav>
  )
}
