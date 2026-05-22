import Head from 'next/head'
import Layout from '../components/Layout'

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | CSharpTek</title>
        <meta name="description" content="CSharpTek Privacy Policy — how we collect, use and protect your personal information." />
        <link rel="canonical" href="https://www.csharptek.com/privacy-policy" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy | CSharpTek" />
        <meta property="og:url" content="https://www.csharptek.com/privacy-policy" />
        <meta property="og:type" content="website" />
      </Head>

      <section style={{background:'#060f1d',minHeight:'100vh',padding:'120px 0 80px'}}>
        <div style={{maxWidth:860,margin:'0 auto',padding:'0 28px'}}>

          <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:42,fontWeight:800,color:'#fff',marginBottom:8}}>
            Privacy <span style={{color:'#2E9ED6'}}>Policy</span>
          </h1>
          <div style={{width:48,height:3,background:'linear-gradient(90deg,#2E9ED6,#7EC8E3)',borderRadius:2,marginBottom:40}} />

          {[
            {
              title:'What information do we collect?',
              content:'In general, you may browse our website without providing any personal information about yourself. However, you may be asked to enter your name or e-mail address. CSharpTek uses this information to measure the use of our site and to understand which parts of the website are visited and how frequently.'
            },
            {
              title:'What do we use your information for?',
              content:null,
              list:[
                'To provide you with custom information about CSharpTek\'s offerings in support of your business needs.',
                'To provide products or services you\'ve requested.',
                'Your information, whether public or private, will not be exchanged or shared with other companies.',
                'The email address you provide may be used to send you information and updates pertaining to your request, in addition to receiving occasional company news, updates, and related product or service information. Note: If you choose not to provide mandatory information, we may not be able to provide the corresponding service.',
                'To improve our services, contact you, conduct research, and provide anonymous reporting for internal and external clients.',
              ]
            },
            {
              title:'How do we protect your information?',
              content:'CSharpTek protects both personal and non-personal information from loss, misuse and unauthorized access, disclosure, alteration or destruction.'
            },
            {
              title:'Do we use cookies?',
              content:'Cookies are small data files that a website you visit may save on your computer or handheld device that usually includes an anonymous unique identifier. This anonymous information is used and analyzed in order to provide a better user experience. When you use some of the social share features, a cookie may be set by the widget to share content. If you access those links through the CSharpTek site, you will leave our site. We do not control these cookies or make any representations about third-party websites.'
            },
            {
              title:'Data Deletion and Retention',
              content:null,
              deletion: true
            },
            {
              title:'Contacting Us',
              content:null,
              contact: true
            },
            {
              title:'Changes to our privacy policy',
              content:'Please note that this policy may change from time to time. If we decide to change our privacy policy, we will post those changes on this page. You are required to periodically check this website to know of any changes.'
            },
          ].map((section, i) => (
            <div key={i} style={{marginBottom:40,padding:32,background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:16}}>
              <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:20,fontWeight:700,color:'#7EC8E3',marginBottom:16}}>{section.title}</h2>
              {section.content && <p style={{fontSize:15,color:'rgba(255,255,255,.6)',lineHeight:1.8,margin:0}}>{section.content}</p>}
              {section.list && (
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:12,margin:0,padding:0}}>
                  {section.list.map((item,j)=>(
                    <li key={j} style={{display:'flex',gap:10,fontSize:15,color:'rgba(255,255,255,.6)',lineHeight:1.7}}>
                      <span style={{color:'#2E9ED6',marginTop:2,flexShrink:0}}>›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.contact && (
                <div style={{fontSize:15,color:'rgba(255,255,255,.6)',lineHeight:2}}>
                  <p style={{margin:'0 0 8px'}}>If there are any questions regarding this privacy policy you may contact us:</p>
                  <strong style={{color:'#fff'}}>CSharpTek</strong><br/>
                  199/A Mandaliya Nagar, Bariatu, Ranchi, Jharkhand - 834009<br/>
                  Telephone: <a href="tel:18008902630" style={{color:'#2E9ED6',textDecoration:'none'}}>1800 890 2630</a><br/>
                  Email: <a href="mailto:info@csharptek.com" style={{color:'#2E9ED6',textDecoration:'none'}}>info@csharptek.com</a>
                </div>
              )}
              {section.deletion && (
                <div style={{fontSize:15,color:'rgba(255,255,255,.6)',lineHeight:1.9}}>
                  <p style={{margin:'0 0 16px'}}>We respect your right to control your personal data. You may request deletion of your data from TEKLead AI (operated by CSharpTek) at any time.</p>

                  <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#fff',marginBottom:8,marginTop:20}}>How to request deletion</h3>
                  <p style={{margin:'0 0 16px'}}>To delete your data, send an email to <a href="mailto:info@csharptek.in" style={{color:'#2E9ED6',textDecoration:'none'}}>info@csharptek.in</a> with the subject line <strong style={{color:'#fff'}}>&quot;Data Deletion Request&quot;</strong>. Include the phone number, email address, or name associated with your data so we can identify your records.</p>

                  <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#fff',marginBottom:8,marginTop:20}}>What we delete</h3>
                  <p style={{margin:'0 0 16px'}}>Upon a valid request, we permanently delete all personal data associated with you, including contact details, message and conversation history, and any lead or proposal records linked to your identifier.</p>

                  <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#fff',marginBottom:8,marginTop:20}}>Timeline</h3>
                  <p style={{margin:'0 0 16px'}}>We process all deletion requests and permanently remove the associated data within 30 days of receiving your request. We will confirm completion by email.</p>

                  <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:'#fff',marginBottom:8,marginTop:20}}>Data we collect</h3>
                  <p style={{margin:0}}>We collect and process contact information (name, email, phone number), communication records (messages sent and received through WhatsApp and email), and business-related details you or your organization provide. This data is used solely to provide outreach, communication, and lead-management services.</p>
                </div>
              )}
            </div>
          ))}

        </div>
      </section>
    </Layout>
  )
}
