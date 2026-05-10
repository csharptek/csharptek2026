import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), { ssr: false })

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Mulish',-apple-system,sans-serif;background:#0A1628;color:#0A1628;overflow-x:hidden;}
  a{text-decoration:none;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}
  .d4{transition-delay:.28s;}.d5{transition-delay:.35s;}.d6{transition-delay:.42s;}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes spin{to{transform:rotate(360deg)}}

  .hero{position:relative;padding:110px 28px 80px;overflow:hidden;text-align:center;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 60%,#091422 100%);}
  .orb{position:absolute;border-radius:50%;pointer-events:none;}
  .hero-in{max-width:820px;margin:0 auto;position:relative;z-index:1;}
  .eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(46,158,214,.08);border:1px solid rgba(46,158,214,.2);border-radius:100px;padding:7px 18px;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#7EC8E3;margin-bottom:28px;}
  .edot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;}
  h1.hero-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(34px,5.5vw,62px);font-weight:800;line-height:1.09;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .grad{background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite;}
  .hero-sub{font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,.6);line-height:1.78;max-width:600px;margin:0 auto 36px;}
  .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:48px;}
  .btn-p{background:#FF6B2B;color:#fff;padding:14px 32px;border-radius:10px;font-weight:700;font-size:15px;transition:all .2s;display:inline-block;border:none;cursor:pointer;font-family:'Mulish',sans-serif;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,43,.38);}
  .btn-s{background:transparent;color:#7EC8E3;padding:14px 32px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);transition:all .2s;display:inline-block;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}
  .stats{display:flex;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.14);border-radius:16px;overflow:hidden;max-width:580px;margin:0 auto;}
  .stat{flex:1;padding:22px 16px;text-align:center;border-right:1px solid rgba(46,158,214,.1);}
  .stat:last-child{border-right:none;}
  .stat-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:800;color:#FF6B2B;}
  .stat-l{font-size:10px;color:rgba(255,255,255,.42);text-transform:uppercase;letter-spacing:.1em;font-weight:700;margin-top:4px;}

  .why{background:#F0F8FF;padding:80px 28px;}
  .why-in{max-width:1100px;margin:0 auto;}
  .sec-hd{text-align:center;margin-bottom:48px;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
  .ldot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;}
  h2.sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(26px,3.5vw,40px);font-weight:800;color:#0A1628;line-height:1.1;letter-spacing:-.02em;}
  .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .why-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:16px;padding:28px 24px;transition:all .3s;}
  .why-card:hover{border-color:rgba(21,101,168,.3);transform:translateY(-4px);box-shadow:0 12px 40px rgba(21,101,168,.1);}
  .why-ic{font-size:30px;margin-bottom:14px;}
  .why-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#0A1628;margin-bottom:8px;}
  .why-d{font-size:13px;color:rgba(10,22,40,.55);line-height:1.68;}

  .jobs{background:#0A1628;padding:80px 28px;}
  .jobs-in{max-width:1100px;margin:0 auto;}
  .jobs-hd{text-align:center;margin-bottom:48px;}
  .job-list{display:flex;flex-direction:column;gap:16px;}
  .jobs-loading{text-align:center;padding:60px;color:rgba(255,255,255,.4);}
  .spinner{width:28px;height:28px;border:3px solid rgba(46,158,214,.2);border-top-color:#2E9ED6;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 14px;}
  .jobs-empty{text-align:center;padding:60px;color:rgba(255,255,255,.4);border:1px dashed rgba(46,158,214,.2);border-radius:16px;}

  .jcard{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.12);border-radius:18px;overflow:hidden;transition:border-color .2s;}
  .jcard:hover{border-color:rgba(46,158,214,.3);}
  .jcard.open{border-color:rgba(46,158,214,.4);}
  .jcard-head{display:flex;align-items:center;gap:18px;padding:24px 28px;cursor:pointer;}
  .jcard-num{width:52px;height:52px;border-radius:14px;background:rgba(46,158,214,.1);border:1px solid rgba(46,158,214,.2);display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#2E9ED6;flex-shrink:0;}
  .jcard-meta{flex:1;min-width:0;}
  .jcard-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:700;color:#fff;margin-bottom:8px;}
  .jcard-pills{display:flex;gap:8px;flex-wrap:wrap;}
  .jpill{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:3px 10px;font-size:11px;color:rgba(255,255,255,.55);font-weight:600;}
  .jcard-info{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;}
  .jinfo-row{font-size:12px;color:rgba(255,255,255,.4);font-weight:600;white-space:nowrap;}
  .jcard-chevron{font-size:18px;color:rgba(255,255,255,.3);transition:transform .3s;}
  .jcard.open .jcard-chevron{transform:rotate(180deg);}
  .jcard-body{padding:0 28px 28px;display:none;}
  .jcard.open .jcard-body{display:block;}
  .jcard-summary{font-size:14px;color:rgba(255,255,255,.65);line-height:1.75;margin-bottom:24px;padding:16px 20px;background:rgba(46,158,214,.05);border-left:3px solid #2E9ED6;border-radius:0 8px 8px 0;}
  .jd-sec{margin-bottom:20px;}
  .jd-ttl{font-size:11px;font-weight:700;color:#7EC8E3;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;}
  .jd-txt{font-size:13px;color:rgba(255,255,255,.6);line-height:1.75;white-space:pre-wrap;}
  .jcard-footer{display:flex;align-items:center;justify-content:space-between;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,.06);flex-wrap:wrap;gap:12px;}
  .jcard-loc{font-size:12px;color:rgba(255,255,255,.35);font-weight:600;}
  .apply-btn{background:#FF6B2B;color:#fff;padding:11px 26px;border-radius:9px;font-weight:700;font-size:13px;transition:all .2s;cursor:pointer;border:none;font-family:'Mulish',sans-serif;}
  .apply-btn:hover{background:#e55a1f;transform:translateY(-1px);}

  .form-sec{background:#F0F8FF;padding:80px 28px;}
  .form-in{max-width:800px;margin:0 auto;}
  .form-hd{text-align:center;margin-bottom:40px;}
  .steps{display:flex;align-items:center;justify-content:center;margin-bottom:36px;}
  .step{display:flex;align-items:center;gap:10px;}
  .step-num{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:14px;transition:all .3s;flex-shrink:0;}
  .step.done .step-num{background:#10b981;color:#fff;}
  .step.active .step-num{background:#FF6B2B;color:#fff;}
  .step.inactive .step-num{background:rgba(21,101,168,.1);color:rgba(10,22,40,.3);}
  .step-lbl{font-size:12px;font-weight:700;}
  .step.active .step-lbl{color:#FF6B2B;}
  .step.done .step-lbl{color:#10b981;}
  .step.inactive .step-lbl{color:rgba(10,22,40,.3);}
  .step-line{width:60px;height:2px;background:rgba(21,101,168,.15);margin:0 10px;flex-shrink:0;}
  .step-line.done{background:#10b981;}
  .form-card{background:#fff;border-radius:20px;padding:48px;box-shadow:0 4px 40px rgba(21,101,168,.08);}
  .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .fg{display:flex;flex-direction:column;gap:7px;}
  .fg.full{grid-column:1/-1;}
  .fl{font-size:12px;font-weight:700;color:rgba(10,22,40,.6);text-transform:uppercase;letter-spacing:.06em;}
  .fl span{color:#FF6B2B;margin-left:2px;}
  .fi,.fs,.ft{width:100%;padding:12px 16px;border:1.5px solid rgba(21,101,168,.15);border-radius:10px;font-size:14px;font-family:'Mulish',sans-serif;color:#0A1628;background:#fff;transition:border-color .2s;outline:none;}
  .fi:focus,.fs:focus,.ft:focus{border-color:#1565A8;box-shadow:0 0 0 3px rgba(21,101,168,.08);}
  .ft{resize:vertical;min-height:110px;}
  .fs{cursor:pointer;}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .file-wrap{position:relative;}
  .file-inp{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}
  .file-box{border:2px dashed rgba(21,101,168,.25);border-radius:10px;padding:24px;text-align:center;transition:all .2s;background:rgba(21,101,168,.02);}
  .file-box:hover{border-color:#1565A8;background:rgba(21,101,168,.05);}
  .file-box.ok{border-color:#10b981;background:rgba(16,185,129,.05);}
  .file-ic{font-size:28px;margin-bottom:8px;}
  .file-txt{font-size:13px;color:rgba(10,22,40,.5);font-weight:600;}
  .file-nm{font-size:12px;color:#10b981;font-weight:700;margin-top:4px;}
  .tog-wrap{display:flex;align-items:center;gap:14px;padding:14px 16px;border:1.5px solid rgba(21,101,168,.15);border-radius:10px;}
  .tog-lbl{font-size:14px;color:#0A1628;flex:1;line-height:1.5;}
  .tog{position:relative;width:44px;height:24px;flex-shrink:0;}
  .tog input{opacity:0;width:0;height:0;}
  .tog-sl{position:absolute;inset:0;background:rgba(21,101,168,.15);border-radius:12px;cursor:pointer;transition:.3s;}
  .tog-sl::before{content:'';position:absolute;width:18px;height:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.3s;box-shadow:0 1px 4px rgba(0,0,0,.2);}
  .tog input:checked + .tog-sl{background:#FF6B2B;}
  .tog input:checked + .tog-sl::before{transform:translateX(20px);}
  .form-nav{display:flex;gap:12px;margin-top:24px;grid-column:1/-1;}
  .btn-back{background:transparent;border:1.5px solid rgba(21,101,168,.2);color:rgba(10,22,40,.5);padding:14px 28px;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;font-family:'Mulish',sans-serif;transition:all .2s;}
  .btn-back:hover{border-color:#1565A8;color:#1565A8;}
  .btn-next{flex:1;padding:14px;background:#1565A8;color:#fff;border:none;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;}
  .btn-next:hover{background:#0d4a8a;transform:translateY(-1px);}
  .btn-sub{flex:1;padding:14px;background:#FF6B2B;color:#fff;border:none;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;}
  .btn-sub:hover:not(:disabled){background:#e55a1f;transform:translateY(-1px);box-shadow:0 8px 28px rgba(255,107,43,.35);}
  .btn-sub:disabled{opacity:.6;cursor:not-allowed;}
  .form-note{font-size:11px;color:rgba(10,22,40,.35);text-align:center;margin-top:14px;grid-column:1/-1;}
  .err-msg{background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);border-radius:10px;padding:12px 16px;color:#dc2626;font-size:13px;grid-column:1/-1;}
  .success-box{text-align:center;padding:48px 32px;background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.2);border-radius:16px;}
  .success-ic{font-size:52px;margin-bottom:16px;}
  .success-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#065f46;margin-bottom:10px;}
  .success-s{font-size:14px;color:rgba(6,95,70,.7);line-height:1.7;}

  @media(max-width:860px){.why-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:640px){
    .why-grid{grid-template-columns:1fr;}
    .hero-ctas{flex-direction:column;align-items:center;}
    .stats{flex-direction:column;}
    .stat{border-right:none;border-bottom:1px solid rgba(46,158,214,.1);}
    .stat:last-child{border-bottom:none;}
    .form-card{padding:24px 16px;}
    .form-grid,.two-col{grid-template-columns:1fr;}
    .fg.full,.form-nav,.err-msg,.form-note{grid-column:1;}
    .jcard-head{flex-wrap:wrap;}
    .jcard-info{flex-direction:row;flex-wrap:wrap;}
    .step-lbl{display:none;}
    .step-line{width:32px;}
  }
`

const NOTICE_OPTS = ['Immediate','15 Days','30 Days','45 Days','60 Days','90 Days','Serving Notice Period']
const QUAL_OPTS   = ['High School','Diploma','B.Tech / B.E.','BCA / BSc IT','MBA','MCA / MSc IT','M.Tech','Other']
const STATUS_OPTS = ['Currently Employed','Serving Notice Period','Not Currently Working']
const EXP_YRS    = Array.from({length:21},(_,i)=>i)
const EXP_MTHS   = Array.from({length:12},(_,i)=>i)

export default function CareersPage() {
  const [jobs,       setJobs]       = useState([])
  const [loading,    setLoading]    = useState(true)
  const [openJob,    setOpenJob]    = useState(null)
  const [step,       setStep]       = useState(1)
  const [submitSt,   setSubmitSt]   = useState(null)
  const [errMsg,     setErrMsg]     = useState('')
  const [fileName,   setFileName]   = useState('')
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    Firstname:'', Lastname:'', Email:'', Number:'',
    CurrentLocation:'', City:'', State:'', Country:'India',
    JobId:'', AppliedFor:'',
    ExperienceYears:'', ExperienceMonths:'',
    CurrentCtc:'', ExpectedCtc:'',
    NoticePeriod:'', StatusOfWorking:'',
    HighestQualification:'',
    WillingToWorkInRanchi: false,
    LinkedInUrl:'', message:'',
  })

  useEffect(() => {
    fetch('/api/jobs')
      .then(r => r.json())
      .then(d => { setJobs(d.jobs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') })
    }, { threshold: 0.07 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [jobs])

  useEffect(() => {
    if (document.getElementById('rc-script') || !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) return
    const s = document.createElement('script')
    s.id = 'rc-script'
    s.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
    document.head.appendChild(s)
  }, [])

  const hc = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const pickJob = j => {
    setForm(f => ({ ...f, JobId: String(j.jobId), AppliedFor: j.jobTitle }))
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  const step1Valid = () => {
    if (!form.Firstname.trim()) return 'First name required.'
    if (!form.Lastname.trim())  return 'Last name required.'
    if (!form.Email.trim() || !/\S+@\S+\.\S+/.test(form.Email)) return 'Valid email required.'
    if (!form.Number.trim() || !/^[0-9]{10,12}$/.test(form.Number)) return 'Valid phone (10–12 digits) required.'
    if (!form.CurrentLocation.trim()) return 'Current location required.'
    if (!form.JobId) return 'Please select a role.'
    return null
  }

  const step2Valid = () => {
    if (!fileRef.current?.files?.[0]) return 'Please upload your resume (PDF or Word).'
    if (form.ExperienceYears === '') return 'Please enter years of experience.'
    return null
  }

  const goNext = () => {
    const err = step1Valid()
    if (err) { setErrMsg(err); return }
    setErrMsg(''); setStep(2)
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const err = step2Valid()
    if (err) { setErrMsg(err); return }
    setErrMsg(''); setSubmitSt('sending')
    try {
      const token = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        ? await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'apply' })
        : 'no-recaptcha'

      const fd = new FormData()
      Object.entries({
        Firstname: form.Firstname, Lastname: form.Lastname,
        Email: form.Email, Number: form.Number,
        CurrentLocation: form.CurrentLocation, City: form.City,
        State: form.State, Country: form.Country || 'India',
        JobId: form.JobId, AppliedFor: form.AppliedFor,
        ExperienceYears: form.ExperienceYears || '0',
        ExperienceMonths: form.ExperienceMonths || '0',
        CurrentCtc: form.CurrentCtc || '0',
        ExpectedCtc: form.ExpectedCtc || '0',
        NoticePeriod: form.NoticePeriod || '',
        StatusOfWorking: form.StatusOfWorking || '',
        HighestQualification: form.HighestQualification || '',
        WillingToWorkInRanchi: form.WillingToWorkInRanchi ? 'true' : 'false',
        message: form.message || '',
        DateofBirth: '2000-01-01',
        AdharNumber: '', PanNumber: '',
        recaptchaToken: token,
      }).forEach(([k,v]) => fd.append(k, v))
      fd.append('FormFile', fileRef.current.files[0])

      const res  = await fetch('/api/apply', { method: 'POST', body: fd })
      const data = await res.json()

      if (res.ok && data.success) {
        setSubmitSt('success')
      } else if (res.status === 409) {
        setSubmitSt('error'); setErrMsg(data.message)
      } else {
        setSubmitSt('error'); setErrMsg(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitSt('error'); setErrMsg('Network error. Please email hr@csharptek.com directly.')
    }
  }

  const jobSchema = jobs.length > 0 ? {
    '@context':'https://schema.org','@graph': jobs.map(j => ({
      '@type':'JobPosting', title: j.jobTitle, description: j.jobSummary,
      hiringOrganization:{ '@type':'Organization', name:'CSharpTek', sameAs:'https://www.csharptek.com' },
      jobLocation:{ '@type':'Place', address:{ '@type':'PostalAddress', addressLocality: j.location||'Ranchi', addressRegion:'Jharkhand', addressCountry:'IN' }},
      employmentType:'FULL_TIME', experienceRequirements: j.experience||'',
      datePosted: j.createdOn ? j.createdOn.split('T')[0] : '2026-01-01',
      validThrough:'2026-12-31', url:'https://www.csharptek.com/careers',
    }))
  } : null

  return (
    <Layout>
      <Head>
        <title>Careers at CSharpTek — AI & Software Development Jobs in Ranchi, India</title>
        <meta name="description" content="Join CSharpTek — hiring React Node.js, .NET Azure developers, UI/UX designers, Business Development and Marketing roles in Ranchi, India. Remote-friendly AI-first company." />
        <link rel="canonical" href="https://www.csharptek.com/careers" />
        <meta property="og:title" content="Careers at CSharpTek — AI & Software Jobs Ranchi India" />
        <meta property="og:description" content="Join our AI-first software development team. Engineering, design, sales and marketing roles. Ranchi, India — remote-friendly." />
        <meta property="og:url" content="https://www.csharptek.com/careers" />
        <meta property="og:image" content="https://www.csharptek.com/og-image.jpg" />
        {jobSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@type':'BreadcrumbList',
          itemListElement:[
            { '@type':'ListItem', position:1, name:'Home', item:'https://www.csharptek.com' },
            { '@type':'ListItem', position:2, name:'Careers', item:'https://www.csharptek.com/careers' },
          ],
        })}} />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: S }} />

      {/* HERO */}
      <section className="hero">
        <div className="orb" style={{top:-120,left:-160,width:500,height:500,background:'radial-gradient(circle,rgba(46,158,214,.12) 0%,transparent 70%)',animation:'orbFloat 9s ease-in-out infinite'}} />
        <div className="orb" style={{bottom:-80,right:-120,width:400,height:400,background:'radial-gradient(circle,rgba(255,107,43,.08) 0%,transparent 70%)',animation:'orbFloat 11s ease-in-out infinite reverse'}} />
        <div className="hero-in">
          <div className="eyebrow rv"><span className="edot"/>We&apos;re Hiring</div>
          <h1 className="hero-t rv">Build the Future of<br/><span className="grad">AI Together</span></h1>
          <p className="hero-sub rv">Join a fast-growing AI-first software company. Work on real products used by healthcare providers, enterprise clients and startups across the US, UK and UAE.</p>
          <div className="hero-ctas rv">
            <a href="#openings" className="btn-p">View Open Roles ↓</a>
            <a href="#apply" className="btn-s">Apply Now</a>
          </div>
          <div className="stats rv">
            {[[loading?'...':jobs.length+'+','Open Roles'],['50+','Team Members'],['10+','Countries Served']].map(([n,l])=>(
              <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="why-in">
          <div className="sec-hd rv">
            <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="ldot"/>Why Work With Us</div>
            <h2 className="sec-t">A Place Where You Actually Grow</h2>
            <p style={{fontSize:16,color:'rgba(10,22,40,.55)',marginTop:12}}>We hire smart people and get out of their way.</p>
          </div>
          <div className="why-grid">
            {[
              {ic:'🚀',t:'Ship Real AI Products',d:'Work on production AI voice agents, medical scribes and intelligent platforms — not toy projects.'},
              {ic:'🌍',t:'Global Client Exposure',d:'Work with clients across the US, UK and Australia. International communication from day one.'},
              {ic:'📈',t:'Grow Fast',d:'Small senior team means big impact. Own features, lead modules, grow your skills rapidly.'},
              {ic:'🧠',t:'Cutting-Edge Stack',d:'Azure OpenAI, Claude, GitHub Copilot, pgvector, VAPI, LangChain, n8n, Make — tools shaping the future of AI.'},
              {ic:'🤝',t:'No Bureaucracy',d:'Direct access to leadership. Ideas heard and actioned quickly. We ship constantly.'},
              {ic:'🏆',t:'Recognition & Growth',d:'Performance matters here. Strong contributors get real responsibility, fast progression and compensation that reflects the value they create.'},
            ].map((w,i)=>(
              <div key={w.t} className={`why-card rv d${i+1}`}>
                <div className="why-ic">{w.ic}</div>
                <div className="why-t">{w.t}</div>
                <div className="why-d">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className="jobs" id="openings">
        <div className="jobs-in">
          <div className="jobs-hd rv">
            <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="ldot"/>Current Openings</div>
            <h2 className="sec-t" style={{color:'#fff'}}>We Are Looking For</h2>
            <p style={{fontSize:16,color:'rgba(255,255,255,.45)',marginTop:12}}>
              {loading ? 'Loading positions...' : `${jobs.length} open position${jobs.length!==1?'s':''}`}
            </p>
          </div>
          {loading ? (
            <div className="jobs-loading"><div className="spinner"/><p>Loading open positions...</p></div>
          ) : jobs.length === 0 ? (
            <div className="jobs-empty">
              <p style={{fontSize:16,marginBottom:8}}>No open positions right now.</p>
              <p style={{fontSize:13,color:'rgba(255,255,255,.3)'}}>Send an open application below — we&apos;d love to hear from you.</p>
            </div>
          ) : (
            <div className="job-list">
              {jobs.map((j,i)=>{
                const skills = j.keySkills ? j.keySkills.split(',').map(s=>s.trim()).filter(Boolean).slice(0,5) : []
                const isOpen = openJob === j.jobId
                return (
                  <div key={j.jobId} className={`jcard rv d${(i%3)+1}${isOpen?' open':''}`}>
                    <div className="jcard-head" onClick={()=>setOpenJob(isOpen?null:j.jobId)}>
                      <div className="jcard-num">{String(i+1).padStart(2,'0')}</div>
                      <div className="jcard-meta">
                        <div className="jcard-title">{j.jobTitle}</div>
                        <div className="jcard-pills">{skills.map(s=><span key={s} className="jpill">{s}</span>)}</div>
                      </div>
                      <div className="jcard-info">
                        {j.experience && <div className="jinfo-row">⏱ {j.experience}</div>}
                        {j.location   && <div className="jinfo-row">📍 {j.location}</div>}
                        <div className="jinfo-row">💼 Full-time</div>
                        <div className="jcard-chevron">▾</div>
                      </div>
                    </div>
                    <div className="jcard-body">
                      {j.jobSummary      && <div className="jcard-summary">{j.jobSummary}</div>}
                      {j.keyResponsibility && <div className="jd-sec"><div className="jd-ttl">Key Responsibilities</div><div className="jd-txt">{j.keyResponsibility}</div></div>}
                      {j.requiredSkills   && <div className="jd-sec"><div className="jd-ttl">Required Skills & Qualifications</div><div className="jd-txt">{j.requiredSkills}</div></div>}
                      {j.preferredSkills  && <div className="jd-sec"><div className="jd-ttl">Preferred Skills</div><div className="jd-txt">{j.preferredSkills}</div></div>}
                      <div className="jcard-footer">
                        <span className="jcard-loc">📧 hr@csharptek.com</span>
                        <button className="apply-btn" onClick={()=>pickJob(j)}>Apply for this Role →</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* FORM */}
      <section className="form-sec" id="apply">
        <div className="form-in">
          <div className="form-hd rv">
            <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="ldot"/>Apply Now</div>
            <h2 className="sec-t">Tell Us About Yourself</h2>
            <p style={{fontSize:16,color:'rgba(10,22,40,.55)',marginTop:12}}>We reply within 48 hours — straight to the team, no recruiters.</p>
          </div>

          {submitSt !== 'success' && (
            <div className="steps rv">
              <div className={`step ${step===1?'active':'done'}`}>
                <div className="step-num">{step>1?'✓':'1'}</div>
                <div className="step-lbl">Basic Info</div>
              </div>
              <div className={`step-line ${step>1?'done':''}`}/>
              <div className={`step ${step===2?'active':'inactive'}`}>
                <div className="step-num">2</div>
                <div className="step-lbl">Experience & Resume</div>
              </div>
            </div>
          )}

          <div className="form-card rv">
            {submitSt === 'success' ? (
              <div className="success-box">
                <div className="success-ic">🎉</div>
                <div className="success-t">Application Received!</div>
                <p className="success-s">Thank you for applying to CSharpTek. We&apos;ll review your profile and get back to you within 48 hours at <strong>{form.Email}</strong>.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="form-grid">
                    <div className="fg"><label className="fl">First Name <span>*</span></label><input className="fi" name="Firstname" value={form.Firstname} onChange={hc} placeholder="Rahul"/></div>
                    <div className="fg"><label className="fl">Last Name <span>*</span></label><input className="fi" name="Lastname" value={form.Lastname} onChange={hc} placeholder="Sharma"/></div>
                    <div className="fg"><label className="fl">Email <span>*</span></label><input className="fi" type="email" name="Email" value={form.Email} onChange={hc} placeholder="rahul@email.com"/></div>
                    <div className="fg"><label className="fl">Phone <span>*</span></label><input className="fi" name="Number" value={form.Number} onChange={hc} placeholder="9xxxxxxxxx"/></div>
                    <div className="fg"><label className="fl">Current Location <span>*</span></label><input className="fi" name="CurrentLocation" value={form.CurrentLocation} onChange={hc} placeholder="e.g. Bangalore"/></div>
                    <div className="fg"><label className="fl">City</label><input className="fi" name="City" value={form.City} onChange={hc} placeholder="City"/></div>
                    <div className="fg"><label className="fl">State</label><input className="fi" name="State" value={form.State} onChange={hc} placeholder="State"/></div>
                    <div className="fg"><label className="fl">Country</label><input className="fi" name="Country" value={form.Country} onChange={hc} placeholder="India"/></div>
                    <div className="fg full">
                      <label className="fl">Role Applying For <span>*</span></label>
                      <select className="fs" name="JobId" value={form.JobId} onChange={e=>{
                        const job = jobs.find(j=>String(j.jobId)===e.target.value)
                        setForm(f=>({...f, JobId:e.target.value, AppliedFor:job?.jobTitle||'Open Application'}))
                      }}>
                        <option value="">Select a position...</option>
                        <option value="0">Open Application</option>
                        {jobs.map(j=><option key={j.jobId} value={j.jobId}>{j.jobTitle}</option>)}
                      </select>
                    </div>
                    <div className="fg full"><label className="fl">LinkedIn / Portfolio / GitHub URL</label><input className="fi" name="LinkedInUrl" value={form.LinkedInUrl} onChange={hc} placeholder="https://linkedin.com/in/yourprofile"/></div>
                    {errMsg && <div className="err-msg">{errMsg}</div>}
                    <div className="form-nav"><button type="button" className="btn-next" onClick={goNext}>Next — Experience & Resume →</button></div>
                  </div>
                )}

                {step === 2 && (
                  <div className="form-grid">
                    <div className="fg full">
                      <label className="fl">Experience <span>*</span></label>
                      <div className="two-col">
                        <select className="fs" name="ExperienceYears" value={form.ExperienceYears} onChange={hc}>
                          <option value="">Years</option>
                          {EXP_YRS.map(y=><option key={y} value={y}>{y} {y===1?'Year':'Years'}</option>)}
                        </select>
                        <select className="fs" name="ExperienceMonths" value={form.ExperienceMonths} onChange={hc}>
                          <option value="">Months</option>
                          {EXP_MTHS.map(m=><option key={m} value={m}>{m} {m===1?'Month':'Months'}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="fg"><label className="fl">Current CTC (LPA)</label><input className="fi" type="number" name="CurrentCtc" value={form.CurrentCtc} onChange={hc} placeholder="e.g. 6.5" step="0.1" min="0"/></div>
                    <div className="fg"><label className="fl">Expected CTC (LPA)</label><input className="fi" type="number" name="ExpectedCtc" value={form.ExpectedCtc} onChange={hc} placeholder="e.g. 9.0" step="0.1" min="0"/></div>
                    <div className="fg"><label className="fl">Notice Period</label><select className="fs" name="NoticePeriod" value={form.NoticePeriod} onChange={hc}><option value="">Select...</option>{NOTICE_OPTS.map(n=><option key={n} value={n}>{n}</option>)}</select></div>
                    <div className="fg"><label className="fl">Current Status</label><select className="fs" name="StatusOfWorking" value={form.StatusOfWorking} onChange={hc}><option value="">Select...</option>{STATUS_OPTS.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
                    <div className="fg full"><label className="fl">Highest Qualification</label><select className="fs" name="HighestQualification" value={form.HighestQualification} onChange={hc}><option value="">Select...</option>{QUAL_OPTS.map(q=><option key={q} value={q}>{q}</option>)}</select></div>
                    <div className="fg full">
                      <label className="fl">Willing to Work from Ranchi Office</label>
                      <div className="tog-wrap">
                        <span className="tog-lbl">{form.WillingToWorkInRanchi ? 'Yes — I am willing to work from Ranchi' : 'No — prefer remote / other location'}</span>
                        <label className="tog">
                          <input type="checkbox" name="WillingToWorkInRanchi" checked={form.WillingToWorkInRanchi} onChange={hc}/>
                          <span className="tog-sl"/>
                        </label>
                      </div>
                    </div>
                    <div className="fg full">
                      <label className="fl">Resume <span>*</span></label>
                      <div className="file-wrap">
                        <div className={`file-box${fileName?' ok':''}`}>
                          <input ref={fileRef} type="file" className="file-inp" accept=".pdf,.doc,.docx" onChange={e=>setFileName(e.target.files?.[0]?.name||'')}/>
                          <div className="file-ic">{fileName?'✅':'📄'}</div>
                          <div className="file-txt">{fileName?'File selected':'Click to upload PDF or Word document'}</div>
                          {fileName && <div className="file-nm">{fileName}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="fg full"><label className="fl">Cover Note</label><textarea className="ft" name="message" value={form.message} onChange={hc} placeholder="Tell us about yourself, your experience and why you want to join CSharpTek..."/></div>
                    {errMsg && <div className="err-msg">{errMsg}</div>}
                    <div className="form-nav">
                      <button type="button" className="btn-back" onClick={()=>{setStep(1);setErrMsg('')}}>← Back</button>
                      <button type="submit" className="btn-sub" disabled={submitSt==='sending'}>{submitSt==='sending'?'Submitting...':'Submit Application →'}</button>
                    </div>
                    <p className="form-note">🔒 Your details are private and never shared. Protected by Google reCAPTCHA v3.</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <ScrollToTop/>
    </Layout>
  )
}
