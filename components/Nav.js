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

const INDUSTRIES_DROPDOWN = [
  { icon:'🏥', label:'Healthcare',             href:'/industries/healthcare' },
  { icon:'🌸', label:'Wellness & Fertility',   href:'/industries/wellness' },
  { icon:'🎓', label:'Education & EdTech',     href:'/industries/education' },
  { icon:'🤖', label:'Marketing & Automation', href:'/industries/automation' },
  { icon:'🛒', label:'Service Marketplaces',   href:'/industries/marketplace' },
  { icon:'🐾', label:'Pet Care & Wellness',    href:'/industries/petcare' },
  { icon:'⚙️', label:'CRM & Productivity',     href:'/industries/crm' },
]

function NavDropdown({ label, items, viewAllHref, viewAllLabel }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const show = () => { clearTimeout(closeTimer.current); setOpen(true) }
  const hide = () => { closeTimer.current = setTimeout(() => setOpen(false), 180) }
  const stay = () => clearTimeout(closeTimer.current)

  return (
    <div className={styles.dropWrap} onMouseEnter={show} onMouseLeave={hide}>
      <button className={`${styles.link} ${styles.linkBtn} ${open ? styles.linkActive : ''}`}>
        {label} <span className={styles.chevron}>{open ? '▲' : '▾'}</span>
      </button>
      {open && (
        <div className={styles.dropdown} onMouseEnter={stay} onMouseLeave={hide}>
          <div className={styles.dropHeader}>{label}</div>
          {items.map(s => (
            <Link key={s.href} href={s.href} className={styles.dropItem} onClick={() => setOpen(false)}>
              <span className={styles.dropIcon}>{s.icon}</span>
              <span className={styles.dropLabel}>{s.label}</span>
            </Link>
          ))}
          <div className={styles.dropFooter}>
            <Link href={viewAllHref} className={styles.dropAll} onClick={() => setOpen(false)}>
              ⊞ {viewAllLabel} →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobSvc,   setMobSvc]   = useState(false)
  const [mobInd,   setMobInd]   = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const closeAll = () => { setMenuOpen(false); setMobSvc(false); setMobInd(false) }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        {/* LOGO */}
        <Link href="/" className={styles.logo} onClick={closeAll}>
          <span className={styles.logoCs}>C#</span>
          <span className={styles.logoRest}>harpTek</span>
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>
          <Link href="/" className={styles.link}>Home</Link>

          <NavDropdown
            label="Services"
            items={SERVICES_DROPDOWN}
            viewAllHref="/services"
            viewAllLabel="View All 9 Services"
          />

          <NavDropdown
            label="Industries"
            items={INDUSTRIES_DROPDOWN}
            viewAllHref="/industries"
            viewAllLabel="View All 7 Industries"
          />

          <Link href="/#tech"      className={styles.link}>Technologies</Link>
          <Link href="/portfolio"  className={styles.link}>Portfolio</Link>
          <Link href="/blog"       className={styles.link}>Blog</Link>
          <Link href="/about"      className={styles.link}>About</Link>
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
          <Link href="/" className={styles.mobileLink} onClick={closeAll}>🏠 Home</Link>

          {/* Services accordion */}
          <div>
            <button className={styles.mobileSvcBtn} onClick={() => setMobSvc(!mobSvc)}>
              Services <span>{mobSvc ? '▲' : '▾'}</span>
            </button>
            {mobSvc && (
              <div className={styles.mobileSvcList}>
                {SERVICES_DROPDOWN.map(s => (
                  <Link key={s.href} href={s.href} className={styles.mobileSubLink} onClick={closeAll}>
                    <span>{s.icon}</span>{s.label}
                  </Link>
                ))}
                <Link href="/services" className={styles.mobileSubAll} onClick={closeAll}>⊞ All Services</Link>
              </div>
            )}
          </div>

          {/* Industries accordion */}
          <div>
            <button className={styles.mobileSvcBtn} onClick={() => setMobInd(!mobInd)}>
              Industries <span>{mobInd ? '▲' : '▾'}</span>
            </button>
            {mobInd && (
              <div className={styles.mobileSvcList}>
                {INDUSTRIES_DROPDOWN.map(i => (
                  <Link key={i.href} href={i.href} className={styles.mobileSubLink} onClick={closeAll}>
                    <span>{i.icon}</span>{i.label}
                  </Link>
                ))}
                <Link href="/industries" className={styles.mobileSubAll} onClick={closeAll}>⊞ All Industries</Link>
              </div>
            )}
          </div>

          <Link href="/#tech"     className={styles.mobileLink} onClick={closeAll}>Technologies</Link>
          <Link href="/portfolio" className={styles.mobileLink} onClick={closeAll}>Portfolio</Link>
          <Link href="/blog"      className={styles.mobileLink} onClick={closeAll}>Blog</Link>
          <Link href="/about"     className={styles.mobileLink} onClick={closeAll}>About</Link>
          <Link href="/contact"   className={styles.mobileCta}  onClick={closeAll}>Free Consultation</Link>
        </div>
      )}
    </nav>
  )
}
