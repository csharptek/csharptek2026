import Nav from './Nav'
import AnnouncementBar from './AnnouncementBar'
import dynamic from 'next/dynamic'
const ScrollToTop = dynamic(() => import('./ScrollToTop'), { ssr: false })
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>{children}</main>
      <footer style={{background:'#060f1d',padding:'48px 0 0'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:36,paddingBottom:48,borderBottom:'1px solid rgba(255,255,255,.05)'}}>

            {/* Brand col */}
            <div>
              <Link href="/" style={{display:'flex',alignItems:'center',marginBottom:14,textDecoration:'none'}}>
                <img src="/logo-white.png" alt="CSharpTek" style={{height:44,width:'auto',objectFit:'contain'}} />
              </Link>
              <p style={{fontSize:13,color:'rgba(255,255,255,.36)',lineHeight:1.68,marginBottom:20,maxWidth:270}}>AI-first software development across healthcare, education, wellness, automation and more.</p>
              <div style={{display:'flex',gap:9,marginBottom:20}}>
                <a href="https://linkedin.com/company/csharptek" target="_blank" rel="noopener noreferrer" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,.6)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://twitter.com/csharptek" target="_blank" rel="noopener noreferrer" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,.6)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://instagram.com/csharptekofficial" target="_blank" rel="noopener noreferrer" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="rgba(255,255,255,.6)" stroke="none"/></svg>
                </a>
                <a href="https://github.com/csharptek" target="_blank" rel="noopener noreferrer" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,.6)"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </a>
                <a href="https://www.youtube.com/@csharptek" target="_blank" rel="noopener noreferrer" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,.6)"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#060f1d"/></svg>
                </a>
              </div>
              <div style={{background:'#fff',borderRadius:10,padding:'12px 14px',display:'inline-block',minWidth:160}}>
                <div style={{fontFamily:'serif',fontWeight:700,fontSize:15,color:'#17313b',letterSpacing:1,marginBottom:6}}>Clutch</div>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <div style={{display:'flex',gap:2}}>{[1,2,3,4,5].map(s=><svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#e62415"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
                  <span style={{fontSize:11,color:'#333',fontWeight:600}}>5.0 · 4 Reviews</span>
                </div>
                <a href="https://clutch.co/profile/csharptek" target="_blank" rel="noopener noreferrer" style={{fontSize:10,color:'#e62415',fontWeight:600,textDecoration:'none',display:'block',marginTop:4}}>See Reviews →</a>
              </div>
            </div>

            {/* Services col */}
            <div>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Services</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {[['AI Integration','/services/ai-integration'],['AI Voice Agents','/services/ai-voice'],['Web & Mobile','/services/web-mobile'],['Cloud & DevOps','/services/cloud-devops'],['MVP & Vibe Coding','/services/mvp-vibe'],['Prompt Engineering','/services/prompt-engineering'],['24/7 Support','/services/support']].map(([label,href])=>(
                  <li key={label}><Link href={href} style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Industries col */}
            <div>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Industries</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {[['Healthcare','/industries/healthcare'],['Wellness & Fertility','/industries/wellness'],['Education','/industries/education'],['Marketing','/industries/marketing'],['Marketplaces','/industries/marketplace'],['Pet Care','/industries/pet-care'],['CRM & Productivity','/industries/crm']].map(([label,href])=>(
                  <li key={label}><Link href={href} style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company col */}
            <div>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Company</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {[['About Us','/about'],['Portfolio','/portfolio'],['Careers','/careers'],['Partners','/about#partners'],['Contact','/contact']].map(([label,href])=>(
                  <li key={label}><Link href={href} style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact col */}
            <div>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Contact</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                <li><a href="mailto:info@csharptek.com" style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>📧 info@csharptek.com</a></li>
                <li><a href="/contact" style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>💬 WhatsApp Us</a></li>
                <li><a href="/contact" style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>📅 Book a Call</a></li>
                <li><a href="https://www.csharptek.com/privacy-policy" target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>📄 Privacy Policy</a></li>
              </ul>
              <div style={{marginTop:16,padding:'12px 14px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:10}}>
                <div style={{fontSize:12,color:'rgba(255,255,255,.5)',fontWeight:600,marginBottom:4}}>🕐 Response Time</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,.28)'}}>We reply within 24 hours.</div>
              </div>
            </div>

          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0',flexWrap:'wrap',gap:10}}>
            <span style={{fontSize:11,color:'rgba(255,255,255,.28)'}}>© 2026 CSharpTek. All rights reserved.</span>
            <div style={{display:'flex',gap:16}}>
              <a href="https://www.csharptek.com/privacy-policy" target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:'rgba(255,255,255,.28)',textDecoration:'none'}}>Privacy</a>
              <a href="#" style={{fontSize:11,color:'rgba(255,255,255,.28)',textDecoration:'none'}}>Terms</a>
              <a href="/sitemap.xml" style={{fontSize:11,color:'rgba(255,255,255,.28)',textDecoration:'none'}}>Sitemap</a>
            </div>
            <span style={{fontSize:10,color:'rgba(255,255,255,.22)',fontWeight:600}}>⚡ Built with AI · CSharpTek</span>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </>
  )
}
