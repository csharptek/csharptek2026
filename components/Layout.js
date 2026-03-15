import Nav from './Nav'
import dynamic from 'next/dynamic'
const ScrollToTop = dynamic(() => import('./ScrollToTop'), { ssr: false })
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <footer style={{background:'#060f1d',padding:'48px 0 0'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 28px'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:44,paddingBottom:48,borderBottom:'1px solid rgba(255,255,255,.05)'}}>
            <div>
              <Link href="/" style={{display:'flex',alignItems:'center',gap:3,marginBottom:14,textDecoration:'none'}}>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:19,background:'linear-gradient(135deg,#2E9ED6,#7EC8E3)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>C#</span>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:19,color:'#fff'}}>harpTek</span>
              </Link>
              <p style={{fontSize:13,color:'rgba(255,255,255,.36)',lineHeight:1.68,marginBottom:20,maxWidth:270}}>AI-first software development across healthcare, education, wellness, automation and more.</p>
              <div style={{display:'flex',gap:9}}>
                {['💼','🐙','🐦','▶️'].map(i=><a key={i} href="#" style={{width:34,height:34,borderRadius:7,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,textDecoration:'none'}}>{i}</a>)}
              </div>
            </div>
            {[
              {t:'Services',l:[['AI Integration','/services/ai-integration'],['AI Voice Agents','/services/ai-voice'],['Web & Mobile','/services/web-mobile'],['Cloud & DevOps','/services/cloud-devops'],['MVP & Vibe Coding','/services/mvp-vibe'],['Marketplace','/services/marketplace'],['Prompt Engineering','/services/prompt-engineering'],['CRM & Productivity','/services/crm-productivity'],['24/7 Support','/services/support']]},
              {t:'Company',l:[['About Us','/about'],['Portfolio','/portfolio'],['Blog','/blog'],['Careers','/careers'],['Contact','/contact']]},
              {t:'Contact',l:[['📧 hello@csharptek.com','mailto:hello@csharptek.com'],['📅 Book a Call','/contact'],['🔒 HIPAA Policy','/hipaa'],['📄 Privacy Policy','/privacy']]},
            ].map(col=>(
              <div key={col.t}>
                <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:'rgba(255,255,255,.85)',letterSpacing:'.05em',textTransform:'uppercase',marginBottom:16}}>{col.t}</h4>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                  {col.l.map(([label,href])=><li key={label}><Link href={href} style={{fontSize:12,color:'rgba(255,255,255,.36)',textDecoration:'none',fontWeight:500}}>{label}</Link></li>)}
                </ul>
              </div>
            ))}
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
