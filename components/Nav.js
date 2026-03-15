import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { label: 'Services',     href: '#services'    },
  { label: 'Industries',   href: '#industries'  },
  { label: 'Technologies', href: '#tech'        },
  { label: 'Portfolio',    href: '#portfolio'   },
  { label: 'Blog',         href: '#blog'        },
  { label: 'Careers',      href: '#careers'     },
  { label: 'About',        href: '#about'       },
]

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        {/* LOGO — swap the span block for <img src="/logo.png" ... /> when ready */}
        <a href="/" className={styles.logo}>
          <span className={styles.logoCs}>C#</span>
          <span className={styles.logoRest}>harpTek</span>
        </a>

        {/* Desktop links */}
        <div className={styles.links}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className={styles.link}>{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <a href="#contact" className={styles.cta}>Free Consultation</a>
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
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className={styles.mobileLink}
               onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className={styles.mobileCta}
             onClick={() => setMenuOpen(false)}>
            Free Consultation
          </a>
        </div>
      )}
    </nav>
  )
}
