import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Nav.module.css'

const SERVICES_DROPDOWN = [
  { icon:'🧠', label:'AI Integration & Automation', href:'/services/ai-integration' },
  { icon:'🎙️', label:'AI Voice Agents',              href:'/services/ai-voice' },
  { icon:'📱', label:'Web & Mobile Development',     href:'/services/web-mobile' },
  { icon:'☁️', label:'Cloud Infrastructure & DevOps',href:'/services/cloud-devops' },
  { icon:'🚀', label:'MVP & Vibe Coding',            href:'/services/mvp-vibe' },
  { icon:'🛒', label:'Marketplace Publishing',       href:'/services/marketplace' },
  { icon:'💬', label:'Prompt Engineering',           href:'/services/prompt-engineering' },
  { icon:'⚙️', label:'CRM & Productivity Tools',     href:'/services/crm-productivity' },
  { icon:'🛠️', label:'24/7 Support & Maintenance',   href:'/services/support' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const dropRef   = useRef(null)
  const closeTimer = useRef(null)
  const router = useRouter()
  const isHome = router.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Delayed close — gives user time to move mouse into dropdown
  const openDropdown  = () => { clearTimeout(closeTimer.current); setDropdown(true) }
  const startClose    = () => { closeTimer.current = setTimeout(() => setDropdown(false), 180) }
  const cancelClose   = () => { clearTimeout(closeTimer.current) }

  const closeAll = () => { setDropdown(false); setMenuOpen(false); setMobileServices(false) }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        {/* HOME LOGO */}
        <Link href="/" className={styles.logo} onClick={closeAll}>
          <span className={styles.logoCs}>C#</span>
          <span className={styles.logoRest}>harpTek</span>
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>

          {/* HOME */}
          <Link href="/" className={styles.link}>Home</Link>

          {/* SERVICES — dropdown only, no click-through */}
          <div
            className={styles.dropWrap}
            ref={dropRef}
            onMouseEnter={openDropdown}
            onMouseLeave={startClose}
          >
            <button className={`${styles.link} ${styles.linkBtn} ${dropdown ? styles.linkActive : ''}`}>
              Services <span className={styles.chevron}>{dropdown ? '▲' : '▾'}</span>
            </button>

            {dropdown && (
              <div
                className={styles.dropdown}
                onMouseEnter={cancelClose}
                onMouseLeave={startClose}
              >
                <div className={styles.dropHeader}>Our Services</div>
                {SERVICES_DROPDOWN.map(s => (
                  <Link key={s.href} href={s.href} className={styles.dropItem} onClick={closeAll}>
                    <span className={styles.dropIcon}>{s.icon}</span>
                    <span className={styles.dropLabel}>{s.label}</span>
                  </Link>
                ))}
                <div className={styles.dropFooter}>
                  <Link href="/services" className={styles.dropAll} onClick={closeAll}>
                    ⊞ View All 9 Services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Other links */}
          <Link href="/industries"  className={styles.link}>Industries</Link>
          <Link href="/#tech"       className={styles.link}>Technologies</Link>
          <Link href="/portfolio"   className={styles.link}>Portfolio</Link>
          <Link href="/blog"        className={styles.link}>Blog</Link>
          <Link href="/about"       className={styles.link}>About</Link>
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <Link href="/contact" className={styles.cta}>Free Consultation</Link>
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileLink} onClick={closeAll}>🏠 Home</Link>

          {/* Mobile Services accordion */}
          <div>
            <button
              className={styles.mobileSvcBtn}
              onClick={() => setMobileServices(!mobileServices)}
            >
              Services <span>{mobileServices ? '▲' : '▾'}</span>
            </button>
            {mobileServices && (
              <div className={styles.mobileSvcList}>
                {SERVICES_DROPDOWN.map(s => (
                  <Link key={s.href} href={s.href} className={styles.mobileSubLink} onClick={closeAll}>
                    <span>{s.icon}</span>{s.label}
                  </Link>
                ))}
                <Link href="/services" className={styles.mobileSubAll} onClick={closeAll}>
                  ⊞ View All Services
                </Link>
              </div>
            )}
          </div>

          <Link href="/industries" className={styles.mobileLink} onClick={closeAll}>Industries</Link>
          <Link href="/#tech"      className={styles.mobileLink} onClick={closeAll}>Technologies</Link>
          <Link href="/portfolio"  className={styles.mobileLink} onClick={closeAll}>Portfolio</Link>
          <Link href="/blog"       className={styles.mobileLink} onClick={closeAll}>Blog</Link>
          <Link href="/about"      className={styles.mobileLink} onClick={closeAll}>About</Link>
          <Link href="/contact"    className={styles.mobileCta}  onClick={closeAll}>Free Consultation</Link>
        </div>
      )}
    </nav>
  )
}
