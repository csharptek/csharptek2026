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
              <Link href="/" style={{display:'flex',alignItems:'center',gap:3,marginBottom:14,textDecoration:'none'}}>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:19,background:'linear-gradient(135deg,#2E9ED6,#7EC8E3)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>C#</span>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:19,color:'#fff'}}>harpTek</span>
              </Link>
              <p style={{fontSize:13,color:'rgba(255,255,255,.36)',lineHeight:1.68,marginBottom:20,maxWidth:270}}>AI-first software development across healthcare, education, wellness, automation and more.</p>
              <div style={{display:'flex',gap:9,marginBottom:20}}>
                {['💼','🐙','🐦','▶️'].map(i=><a key={i} href="#" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,textDecoration:'none'}}>{i}</a>)}
              </div>
            </div>

            {/* Services col */}
            <div>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Services</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {[['AI Integration','/services/ai-integration'],['AI Voice Agents','/services/ai-voice'],['Web & Mobile','/services/web-mobile'],['Cloud & DevOps','/services/cloud-devops'],['MVP & Vibe Coding','/services/mvp-vibe'],['Marketplace','/services/marketplace'],['CRM & Productivity','/services/crm-productivity'],['24/7 Support','/services/support']].map(([label,href])=>(
                  <li key={label}><Link href={href} style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500,transition:'color .2s'}}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company col */}
            <div>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Company</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {[['About Us','/about'],['Portfolio','/portfolio'],['Blog','/blog'],['Careers','/careers'],['Contact','/contact']].map(([label,href])=>(
                  <li key={label}><Link href={href} style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Products col — highlighted */}
            <div>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'#FF6B2B',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Our Products</h4>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <Link href="/products/tekdial" style={{textDecoration:'none',display:'block',padding:'12px 14px',background:'rgba(46,158,214,.06)',border:'1px solid rgba(46,158,214,.18)',borderRadius:10,transition:'all .2s'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                    <span style={{fontSize:18}}>📞</span>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:800,color:'#7EC8E3'}}>TekDial</span>
                  </div>
                  <p style={{fontSize:11,color:'rgba(255,255,255,.4)',lineHeight:1.5,margin:0}}>AI Voice Receptionist · Outbound Calls · IVR</p>
                </Link>
                <Link href="/products/teksocial" style={{textDecoration:'none',display:'block',padding:'12px 14px',background:'rgba(255,107,43,.06)',border:'1px solid rgba(255,107,43,.18)',borderRadius:10,transition:'all .2s'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                    <span style={{fontSize:18}}>✨</span>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:800,color:'#FF6B2B'}}>TekSocial</span>
                  </div>
                  <p style={{fontSize:11,color:'rgba(255,255,255,.4)',lineHeight:1.5,margin:0}}>Social Content · AI Images · Video · Scheduler</p>
                </Link>
              </div>
            </div>

            {/* Contact col */}
            <div>
              <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>Contact</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {[['📧 info@csharptek.com','mailto:info@csharptek.com'],['📅 Book a Call','/contact'],['🔒 HIPAA Policy','/hipaa'],['📄 Privacy Policy','/privacy']].map(([label,href])=>(
                  <li key={label}><Link href={href} style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{label}</Link></li>
                ))}
              </ul>
            </div>

          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0',flexWrap:'wrap',gap:10}}>
            <span style={{fontSize:11,color:'rgba(255,255,255,.28)'}}>© 2025 CSharpTek. All rights reserved.</span>
            <span style={{fontSize:10,color:'rgba(255,255,255,.22)',fontWeight:600}}>⚡ Built with AI · CSharpTek</span>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </>
  )
}
