import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import { INDUSTRIES_DATA, INDUSTRIES_LIST } from '../../data/industries'
import { track } from '../../lib/analytics'
const ScrollToTop = dynamic(() => import('../../components/ScrollToTop'), { ssr: false })

export async function getStaticPaths() {
  return { paths: Object.keys(INDUSTRIES_DATA).map(slug => ({ params: { slug } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const ind = INDUSTRIES_DATA[params.slug] || null
  if (!ind) return { notFound: true }
  const idx  = INDUSTRIES_LIST.findIndex(i => i.slug === params.slug)
  const prev = idx > 0 ? INDUSTRIES_LIST[idx - 1] : null
  const next = idx < INDUSTRIES_LIST.length - 1 ? INDUSTRIES_LIST[idx + 1] : null
  const allInds = INDUSTRIES_LIST
  return { props: { slug: params.slug, ind, prev, next, allInds } }
}

const STYLES = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Mulish',sans-serif;}
  a{text-decoration:none;color:inherit;}

  /* scroll reveal */
  .rv{opacity:0;transform:translateY(22px);transition:opacity .55s ease,transform .55s ease;}
  .rv.on{opacity:1;transform:none;}
  .d1{transition-delay:.05s;}.d2{transition-delay:.1s;}.d3{transition-delay:.15s;}
  .d4{transition-delay:.2s;}.d5{transition-delay:.25s;}.d6{transition-delay:.3s;}

  /* layout */
  .in{max-width:1100px;margin:0 auto;padding:0 28px;}

  /* label */
  .lbl{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;}
  .ldot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;display:inline-block;}

  /* shared buttons */
  .btn-p{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:9px;background:#FF6B2B;color:#fff;font-weight:700;font-size:14px;transition:all .2s;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 6px 22px rgba(255,107,43,.35);}
  .btn-s{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:9px;border:2px solid rgba(46,158,214,.35);color:#7EC8E3;font-weight:700;font-size:14px;transition:all .2s;}
  .btn-s:hover{border-color:#7EC8E3;color:#fff;}

  /* section title */
  .sec-t{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;line-height:1.18;}

  /* HERO */
  .hero-sec{position:relative;padding:100px 28px 80px;overflow:hidden;}
  .hero-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
  .hero-back{font-size:13px;font-weight:700;color:rgba(255,255,255,.45);display:inline-flex;align-items:center;gap:6px;margin-bottom:28px;transition:color .2s;}
  .hero-back:hover{color:#7EC8E3;}
  .hero-eye{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7EC8E3;margin-bottom:16px;}
  .hero-h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(34px,5vw,56px);font-weight:800;color:#fff;line-height:1.1;margin-bottom:6px;}
  .hero-h1 span{display:block;}
  .hero-sub{font-size:16px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:28px;max-width:480px;}
  .hero-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;}
  .hero-tag{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:5px 13px;font-size:12px;font-weight:600;color:rgba(255,255,255,.65);}
  .hero-btns{display:flex;gap:12px;flex-wrap:wrap;}

  /* hero card */
  .hcard{border-radius:20px;padding:32px;position:relative;overflow:hidden;}
  .hcard-glow{position:absolute;top:-30%;right:-20%;width:280px;height:280px;border-radius:50%;opacity:.25;pointer-events:none;}
  .hcard-lbl{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:16px;}
  .hcard-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#fff;margin-bottom:6px;}
  .hcard-sub{font-size:13px;color:rgba(255,255,255,.5);margin-bottom:20px;line-height:1.5;}
  .hcard-metrics{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
  .hcard-m{background:rgba(0,0,0,.2);border-radius:10px;padding:12px 14px;}
  .hcard-mv{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#fff;}
  .hcard-ml{font-size:11px;color:rgba(255,255,255,.45);margin-top:2px;}
  .hcard-badges{display:flex;flex-wrap:wrap;gap:6px;}
  .hcard-b{background:rgba(255,255,255,.1);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;color:rgba(255,255,255,.7);}

  /* pain points */
  .pain{padding:80px 28px;background:#f8fafd;}
  .pain-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px;}
  .pain-card{background:#fff;border:1px solid rgba(10,22,40,.07);border-radius:14px;padding:24px 20px;transition:all .2s;}
  .pain-card:hover{border-color:rgba(21,101,168,.2);box-shadow:0 6px 24px rgba(10,22,40,.06);transform:translateY(-2px);}
  .pain-ic{font-size:26px;margin-bottom:12px;}
  .pain-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:800;color:#0A1628;margin-bottom:7px;}
  .pain-d{font-size:13px;color:rgba(10,22,40,.55);line-height:1.6;}

  /* solutions */
  .sol{padding:80px 28px;background:#0A1628;}
  .sol-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .sol-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:26px 22px;transition:all .3s;}
  .sol-card:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.07);transform:translateY(-3px);}
  .sol-ic{font-size:28px;margin-bottom:14px;}
  .sol-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;color:rgba(255,255,255,.85);margin-bottom:8px;}
  .sol-d{font-size:13px;color:rgba(255,255,255,.45);line-height:1.65;margin-bottom:14px;}
  .sol-tags{display:flex;flex-wrap:wrap;gap:5px;}
  .sol-tag{background:rgba(46,158,214,.1);border:1px solid rgba(46,158,214,.2);border-radius:5px;padding:3px 8px;font-size:10px;font-weight:700;color:#7EC8E3;letter-spacing:.04em;}

  /* HEALTHCARE SERVICES — new section */
  .hc-svcs{padding:80px 28px;background:#fff;}
  .hc-svcs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .hc-svc-card{
    border:1px solid rgba(10,22,40,.09);border-radius:16px;padding:28px 24px;
    transition:all .25s;position:relative;overflow:hidden;background:#fff;
  }
  .hc-svc-card:hover{border-color:rgba(21,101,168,.3);box-shadow:0 8px 32px rgba(10,22,40,.09);transform:translateY(-3px);}
  .hc-svc-card.highlight{border-color:rgba(21,101,168,.25);background:linear-gradient(135deg,#f0f7ff,#fff);}
  .hc-svc-badge{
    position:absolute;top:16px;right:16px;
    background:rgba(21,101,168,.1);border:1px solid rgba(21,101,168,.2);
    border-radius:6px;padding:3px 9px;font-size:9px;font-weight:700;
    letter-spacing:.08em;text-transform:uppercase;color:#1565A8;
  }
  .hc-svc-ic{font-size:30px;margin-bottom:14px;}
  .hc-svc-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:800;color:#0A1628;margin-bottom:9px;}
  .hc-svc-d{font-size:13px;color:rgba(10,22,40,.55);line-height:1.65;margin-bottom:14px;}
  .hc-svc-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;}
  .hc-svc-tag{background:rgba(21,101,168,.07);border:1px solid rgba(21,101,168,.15);border-radius:5px;padding:3px 8px;font-size:10px;font-weight:700;color:#1565A8;letter-spacing:.04em;}
  .hc-svc-link{
    display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;
    color:#FF6B2B;transition:gap .2s;
  }
  .hc-svc-link:hover{gap:10px;}

  /* PRODUCTS SECTION */
  .products-sec{padding:80px 28px;background:linear-gradient(135deg,#0A1628,#0D2B45);}
  .products-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px;}
  .prod-card{
    border-radius:20px;padding:36px 32px;position:relative;overflow:hidden;
    border:1px solid rgba(255,255,255,.08);transition:all .25s;
  }
  .prod-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.3);}
  .prod-card-glow{position:absolute;top:-40%;right:-20%;width:300px;height:300px;border-radius:50%;opacity:.15;pointer-events:none;}
  .prod-icon{font-size:40px;margin-bottom:16px;}
  .prod-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;color:#fff;margin-bottom:4px;}
  .prod-tagline{font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;margin-bottom:14px;opacity:.7;}
  .prod-desc{font-size:14px;color:rgba(255,255,255,.55);line-height:1.65;margin-bottom:20px;}
  .prod-feats{display:flex;flex-direction:column;gap:7px;margin-bottom:24px;}
  .prod-feat{display:flex;align-items:center;gap:9px;font-size:13px;color:rgba(255,255,255,.7);font-weight:600;}
  .prod-feat::before{content:'✓';color:#7EC8E3;font-weight:800;font-size:12px;flex-shrink:0;}
  .prod-btns{display:flex;gap:10px;flex-wrap:wrap;}
  .prod-btn-primary{
    display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:9px;
    background:#FF6B2B;color:#fff;font-weight:700;font-size:13px;transition:all .2s;
  }
  .prod-btn-primary:hover{background:#e55a1f;transform:translateY(-1px);}
  .prod-btn-ghost{
    display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:9px;
    border:2px solid rgba(255,255,255,.2);color:rgba(255,255,255,.75);font-weight:700;font-size:13px;transition:all .2s;
  }
  .prod-btn-ghost:hover{border-color:rgba(255,255,255,.5);color:#fff;}

  /* trust */
  .trust{padding:80px 28px;background:#0D2B45;}
  .trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:48px;}
  .trust-card{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:14px;padding:24px 20px;text-align:center;transition:all .2s;}
  .trust-card:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.07);}
  .trust-ic{font-size:26px;margin-bottom:12px;}
  .trust-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:800;color:#fff;margin-bottom:7px;}
  .trust-d{font-size:12px;color:rgba(255,255,255,.42);line-height:1.6;}

  /* case study */
  .case{padding:80px 28px;background:#060f1d;}
  .case-in{max-width:1100px;margin:0 auto;}
  .case-card{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.12);border-radius:20px;padding:40px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:44px;}
  .case-badge{display:inline-block;background:rgba(46,158,214,.1);border:1px solid rgba(46,158,214,.25);border-radius:8px;padding:5px 12px;font-size:11px;font-weight:700;color:#7EC8E3;letter-spacing:.06em;margin-bottom:14px;}
  .case-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#fff;margin-bottom:10px;line-height:1.25;}
  .case-d{font-size:14px;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:16px;}
  .case-stk{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;}
  .case-tk{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:700;color:rgba(255,255,255,.6);}
  .metrics{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .metric{background:rgba(46,158,214,.08);border:1px solid rgba(46,158,214,.15);border-radius:12px;padding:20px 18px;text-align:center;}
  .metric-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;color:#7EC8E3;}
  .metric-l{font-size:12px;color:rgba(255,255,255,.42);margin-top:4px;line-height:1.4;}

  /* relevant services */
  .svcs{padding:80px 28px;background:#f8fafd;}
  .svcs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px;}
  .svc-card{background:#fff;border:1px solid rgba(10,22,40,.07);border-radius:14px;padding:24px 20px;transition:all .2s;display:flex;flex-direction:column;gap:8px;}
  .svc-card:hover{border-color:rgba(21,101,168,.25);box-shadow:0 6px 24px rgba(10,22,40,.07);transform:translateY(-2px);}
  .svc-ic{font-size:26px;}
  .svc-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:800;color:#0A1628;}
  .svc-d{font-size:12px;color:rgba(10,22,40,.5);line-height:1.6;flex:1;}
  .svc-lnk{font-size:12px;font-weight:700;color:#1565A8;}

  /* product banner for non-healthcare */
  .prod-banner{
    background:linear-gradient(135deg,#0D2B45,#1565A8);
    border-radius:16px;padding:32px 36px;
    display:flex;align-items:center;justify-content:space-between;
    gap:24px;flex-wrap:wrap;margin-top:48px;
    border:1px solid rgba(46,158,214,.2);
  }
  .prod-banner-left h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#fff;margin-bottom:6px;}
  .prod-banner-left p{font-size:13px;color:rgba(255,255,255,.5);max-width:400px;}
  .prod-banner-pills{display:flex;gap:10px;flex-wrap:wrap;}
  .prod-pill{
    display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:9px;
    border:1px solid rgba(255,255,255,.15);color:#fff;font-size:13px;font-weight:700;transition:all .2s;
  }
  .prod-pill:hover{background:rgba(255,255,255,.1);}

  /* CTA */
  .cta-sec{background:linear-gradient(135deg,#0A1628,#1565A8 50%,#0D2B45);padding:80px 28px;text-align:center;}
  .cta-in{max-width:640px;margin:0 auto;}
  .cta-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(26px,4vw,44px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;}
  .cta-s{font-size:16px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}
  .trust-items{display:flex;flex-wrap:wrap;justify-content:center;gap:16px;margin-top:28px;}
  .ti{display:flex;align-items:center;gap:7px;font-size:13px;color:rgba(255,255,255,.55);font-weight:600;}

  /* other industries */
  .other{padding:60px 28px;background:#060f1d;}
  .other-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:20px;}
  .other-card{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;transition:all .2s;}
  .other-card:hover{background:rgba(46,158,214,.08);border-color:rgba(46,158,214,.2);}
  .other-ic{font-size:22px;}
  .other-t{font-size:12px;font-weight:700;color:rgba(255,255,255,.6);text-align:center;}
  .other-arr{font-size:12px;color:#FF6B2B;}

  /* prev/next */
  .pn{background:#0A1628;border-top:1px solid rgba(46,158,214,.1);padding:24px 0;}
  .pn-in{max-width:1100px;margin:0 auto;padding:0 28px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
  .pn-btn{display:flex;align-items:center;gap:12px;padding:14px 20px;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.1);border-radius:12px;flex:0 1 280px;transition:all .2s;}
  .pn-btn:hover{border-color:rgba(46,158,214,.3);background:rgba(46,158,214,.06);}
  .pn-arr{font-size:20px;color:rgba(255,255,255,.4);}
  .pn-lbl{font-size:10px;font-weight:700;color:rgba(255,255,255,.3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px;}
  .pn-name{font-size:14px;font-weight:700;color:#fff;display:flex;align-items:center;gap:7px;}
  .pn-all{display:flex;align-items:center;gap:6px;padding:10px 18px;background:rgba(255,107,43,.08);border:1px solid rgba(255,107,43,.2);border-radius:9px;font-size:13px;font-weight:700;color:#FF6B2B;transition:background .15s;}
  .pn-all:hover{background:rgba(255,107,43,.16);}

  /* FAQ */
  .faq-sec{background:#0A1628;padding:80px 28px;}
  .faq-list{max-width:760px;margin:0 auto;margin-top:40px;display:flex;flex-direction:column;gap:12px;}
  .faq-item{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.12);border-radius:12px;overflow:hidden;transition:border-color .2s;}
  .faq-item.open{border-color:rgba(46,158,214,.35);}
  .faq-q{width:100%;background:none;border:none;text-align:left;padding:18px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px;cursor:pointer;font-family:'Mulish',sans-serif;}
  .faq-qt{font-size:15px;font-weight:700;color:#fff;line-height:1.4;}
  .faq-arr{font-size:18px;color:#7EC8E3;flex-shrink:0;transition:transform .25s;}
  .faq-item.open .faq-arr{transform:rotate(45deg);}
  .faq-a{font-size:14px;color:rgba(255,255,255,.6);line-height:1.75;padding:0 22px 18px;}

  @media(max-width:1000px){
    .hero-in{grid-template-columns:1fr;gap:40px;}
    .pain-grid{grid-template-columns:repeat(2,1fr);}
    .sol-grid,.hc-svcs-grid{grid-template-columns:repeat(2,1fr);}
    .products-grid{grid-template-columns:1fr;}
    .trust-grid{grid-template-columns:repeat(2,1fr);}
    .svcs-grid{grid-template-columns:repeat(2,1fr);}
    .other-grid{grid-template-columns:repeat(3,1fr);}
    .case-card{grid-template-columns:1fr;}
  }
  @media(max-width:600px){
    .pain-grid,.sol-grid,.hc-svcs-grid,.trust-grid,.svcs-grid{grid-template-columns:1fr;}
    .metrics{grid-template-columns:1fr 1fr;}
    .other-grid{grid-template-columns:repeat(2,1fr);}
    .hcard-metrics{grid-template-columns:1fr 1fr;}
  }
`

export default function IndustryPage({ slug, ind, prev, next, allInds }) {
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const obs = new IntersectionObserver(
      es => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }) },
      { threshold: 0.07 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [slug])

  useEffect(() => {
    track.industryView(slug)
  }, [slug])

  const isHealthcare = slug === 'healthcare'

  return (
    <Layout>
      <Head>
        <title>{ind.name} AI Software Development — CSharpTek</title>
        <meta name="description" content={ind.metaDesc} />
        <link rel="canonical" href={`https://www.csharptek.com/industries/${slug}`} />
        <meta property="og:title" content={`${ind.name} AI Software Development — CSharpTek`} />
        <meta property="og:description" content={ind.metaDesc} />
        <meta property="og:url" content={`https://www.csharptek.com/industries/${slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.csharptek.com/og-image.jpg" />
        <meta name="twitter:title" content={`${ind.name} AI Software Development — CSharpTek`} />
        <meta name="twitter:description" content={ind.metaDesc} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.csharptek.com' },
                { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.csharptek.com/industries' },
                { '@type': 'ListItem', position: 3, name: `${ind.name} AI`, item: `https://www.csharptek.com/industries/${slug}` },
              ],
            },
            {
              '@type': 'Service',
              name: `${ind.name} AI Software Development`,
              description: ind.metaDesc,
              provider: { '@type': 'Organization', name: 'CSharpTek', url: 'https://www.csharptek.com' },
              areaServed: ['IN', 'US', 'GB', 'AU', 'AE'],
              url: `https://www.csharptek.com/industries/${slug}`,
            },
            ...(ind.faqs ? [{
              '@type': 'FAQPage',
              mainEntity: ind.faqs.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }] : []),
          ],
        }) }} />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── HERO ── */}
      <section className="hero-sec" style={{ background: ind.grad }}>
        <div className="hero-in">
          <div>
            <Link href="/industries" className="hero-back rv">← All Industries</Link>
            <div className="hero-eye rv"><span style={{ width:6,height:6,borderRadius:'50%',background:'#FF6B2B',display:'inline-block' }} />{ind.tagline}</div>
            <h1 className="hero-h1 rv">
              <span>{ind.headline}</span>
              <span style={{ background:'linear-gradient(135deg,#7EC8E3,#2E9ED6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{ind.headlineAccent}</span>
            </h1>
            <p className="hero-sub rv">{ind.subline}</p>
            <div className="hero-tags rv">{ind.heroTags.map(t => <span key={t} className="hero-tag">{t}</span>)}</div>
            <div className="hero-btns rv">
              <Link href="/contact" className="btn-p" onClick={() => track.industryCta('Book a Free Consultation', slug)}>Book a Free Consultation →</Link>
              <Link href="/portfolio" className="btn-s" onClick={() => track.industryCta('See Our Work', slug)}>See Our Work</Link>
            </div>
          </div>
          <div className="hcard rv" style={{ background: `linear-gradient(135deg,rgba(0,0,0,.35),rgba(0,0,0,.2))`, border:'1px solid rgba(255,255,255,.1)' }}>
            <div className="hcard-glow" style={{ background:`radial-gradient(circle,${ind.color},transparent)` }} />
            <div className="hcard-lbl">Featured Solution</div>
            <div className="hcard-title">{ind.caseStudy.title}</div>
            <div className="hcard-sub">{ind.caseStudy.desc.substring(0,120)}…</div>
            <div className="hcard-metrics">
              {ind.caseStudy.metrics.slice(0,4).map(m => (
                <div key={m.l} className="hcard-m">
                  <div className="hcard-mv">{m.v}</div>
                  <div className="hcard-ml">{m.l}</div>
                </div>
              ))}
            </div>
            <div className="hcard-badges">{ind.caseStudy.stack.map(s => <span key={s} className="hcard-b">{s}</span>)}</div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="pain">
        <div className="in">
          <div className="rv">
            <div className="lbl" style={{ color:'#1565A8' }}><span className="ldot" />The Problem</div>
            <h2 className="sec-t" style={{ fontSize:'clamp(24px,3vw,38px)', color:'#0A1628', marginBottom:14 }}>Challenges in {ind.name}</h2>
          </div>
          <div className="pain-grid">
            {ind.painPoints.map((p, i) => (
              <div key={p.title} className={`pain-card rv d${i+1}`}>
                <div className="pain-ic">{p.icon}</div>
                <div className="pain-t">{p.title}</div>
                <div className="pain-d">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS — What We Build ── */}
      <section className="sol">
        <div className="in">
          <div className="rv" style={{ textAlign:'center' }}>
            <div className="lbl" style={{ color:'#7EC8E3', justifyContent:'center' }}><span className="ldot" />What We Build</div>
            <h2 className="sec-t" style={{ fontSize:'clamp(26px,3.5vw,42px)', color:'#fff', marginBottom:14 }}>
              {isHealthcare ? 'Core Healthcare Solutions' : `Built for ${ind.name}`}
            </h2>
            <p style={{ fontSize:16, color:'rgba(255,255,255,.5)', maxWidth:500, margin:'0 auto' }}>
              Production-grade solutions delivered for {ind.name.toLowerCase()} clients — ready to adapt to your needs.
            </p>
          </div>
          <div className="sol-grid">
            {ind.solutions.map((s, i) => (
              <div key={s.title} className={`sol-card rv d${(i%6)+1}`}>
                <div className="sol-ic">{s.icon}</div>
                <div className="sol-t">{s.title}</div>
                <div className="sol-d">{s.desc}</div>
                <div className="sol-tags">{s.tags.map(t => <span key={t} className="sol-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HEALTHCARE SERVICES (healthcare only) ── */}
      {isHealthcare && ind.healthcareServices && (
        <section className="hc-svcs">
          <div className="in">
            <div className="rv">
              <div className="lbl" style={{ color:'#1565A8' }}><span className="ldot" />Healthcare Services</div>
              <h2 className="sec-t" style={{ fontSize:'clamp(26px,3.5vw,42px)', color:'#0A1628', marginBottom:14 }}>
                Specialised Healthcare AI Services
              </h2>
              <p style={{ fontSize:16, color:'rgba(10,22,40,.5)', maxWidth:560 }}>
                Deep-domain healthcare expertise — from AI scribes to EHR integrations, medical billing and compliance.
              </p>
            </div>
            <div className="hc-svcs-grid">
              {ind.healthcareServices.map((s, i) => (
                <div key={s.title} className={`hc-svc-card rv d${(i%6)+1} ${s.highlight ? 'highlight' : ''}`}>
                  {s.highlight && <span className="hc-svc-badge">Most Popular</span>}
                  <div className="hc-svc-ic">{s.icon}</div>
                  <div className="hc-svc-t">{s.title}</div>
                  <div className="hc-svc-d">{s.desc}</div>
                  <div className="hc-svc-tags">{s.tags.map(t => <span key={t} className="hc-svc-tag">{t}</span>)}</div>
                  {s.productLink && (
                    <Link href={s.productLink} className="hc-svc-link">
                      {s.productLabel}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCTS (healthcare only) ── */}
      {isHealthcare && ind.products && (
        <section className="products-sec">
          <div className="in">
            <div className="rv" style={{ textAlign:'center' }}>
              <div className="lbl" style={{ color:'#FF6B2B', justifyContent:'center' }}><span className="ldot" />Our Products</div>
              <h2 className="sec-t" style={{ fontSize:'clamp(26px,3.5vw,42px)', color:'#fff', marginBottom:14 }}>
                AI Products Built for Healthcare
              </h2>
              <p style={{ fontSize:16, color:'rgba(255,255,255,.5)', maxWidth:500, margin:'0 auto' }}>
                Standalone AI products you can use today — built by CSharpTek, purpose-designed for the industry.
              </p>
            </div>
            <div className="products-grid">
              {ind.products.map((p, i) => (
                <div key={p.name} className={`prod-card rv d${i+1}`} style={{ background: p.grad }}>
                  <div className="prod-card-glow" style={{ background:`radial-gradient(circle,${p.color},transparent)` }} />
                  <div className="prod-icon">{p.icon}</div>
                  <div className="prod-name">{p.name}</div>
                  <div className="prod-tagline" style={{ color: p.color === '#FF6B2B' ? '#ff9a5c' : '#7EC8E3' }}>{p.tagline}</div>
                  <div className="prod-desc">{p.desc}</div>
                  <div className="prod-feats">
                    {p.features.map(f => <div key={f} className="prod-feat">{f}</div>)}
                  </div>
                  <div className="prod-btns">
                    <a href={p.externalHref} target="_blank" rel="noopener noreferrer" className="prod-btn-primary">
                      Visit {p.name} →
                    </a>
                    <Link href={p.href} className="prod-btn-ghost">Learn More</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCTS BANNER (non-healthcare) ── */}
      {!isHealthcare && (
        <section style={{ padding:'0 28px 80px', background:'#0A1628' }}>
          <div className="in">
            <div className="prod-banner rv">
              <div className="prod-banner-left">
                <h3>🚀 Explore Our AI Products</h3>
                <p>TekDial and TekSocial are purpose-built AI products that can power your {ind.name.toLowerCase()} business — available now.</p>
              </div>
              <div className="prod-banner-pills">
                <Link href="/products/tekdial" className="prod-pill">📞 TekDial — AI Voice</Link>
                <Link href="/products/teksocial" className="prod-pill">✨ TekSocial — Content AI</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── COMPLIANCE / TRUST ── */}
      <section className="trust">
        <div className="in">
          <div className="rv" style={{ textAlign:'center' }}>
            <div className="lbl" style={{ color:'#7EC8E3', justifyContent:'center' }}><span className="ldot" />Why Choose Us</div>
            <h2 className="sec-t" style={{ fontSize:'clamp(26px,3.5vw,42px)', color:'#fff', marginBottom:14 }}>Built with {ind.name} in Mind</h2>
          </div>
          <div className="trust-grid">
            {ind.compliance.map((c, i) => (
              <div key={c.title} className={`trust-card rv d${i+1}`}>
                <div className="trust-ic">{c.icon}</div>
                <div className="trust-t">{c.title}</div>
                <div className="trust-d">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="case">
        <div className="case-in">
          <div className="rv" style={{ textAlign:'center', marginBottom:44 }}>
            <div className="lbl" style={{ color:'#7EC8E3', justifyContent:'center' }}><span className="ldot" />Case Study</div>
            <h2 className="sec-t" style={{ fontSize:'clamp(26px,3.5vw,42px)', color:'#fff', marginBottom:14 }}>Real Project. Real Results.</h2>
          </div>
          <div className="case-card rv" style={{ background:`linear-gradient(135deg,#0D2B45,${ind.color}99)` }}>
            <div>
              <div className="case-badge">📁 {ind.caseStudy.client}</div>
              <h3 className="case-t">{ind.caseStudy.title}</h3>
              <p className="case-d">{ind.caseStudy.desc}</p>
              <div className="case-stk">{ind.caseStudy.stack.map(s => <span key={s} className="case-tk">{s}</span>)}</div>
              <Link href="/portfolio" className="btn-p" style={{ display:'inline-block' }} onClick={() => track.caseStudyClick(ind.caseStudy?.title || 'Case Study', slug)}>View Full Case Study →</Link>
            </div>
            <div className="metrics">
              {ind.caseStudy.metrics.map(m => (
                <div key={m.l} className="metric">
                  <div className="metric-n">{m.v}</div>
                  <div className="metric-l">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELEVANT SERVICES ── */}
      <section className="svcs">
        <div className="in">
          <div className="rv" style={{ textAlign:'center' }}>
            <div className="lbl" style={{ color:'#1565A8', justifyContent:'center' }}><span className="ldot" />How We Help</div>
            <h2 className="sec-t" style={{ fontSize:'clamp(26px,3.5vw,42px)', color:'#0A1628', marginBottom:14 }}>Services We Use for {ind.name}</h2>
          </div>
          <div className="svcs-grid">
            {ind.services.map((s, i) => (
              <Link key={s.href} href={s.href} className={`svc-card rv d${i+1}`}>
                <div className="svc-ic">{s.icon}</div>
                <div className="svc-t">{s.title}</div>
                <div className="svc-d">{s.desc}</div>
                <span className="svc-lnk">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {ind.faqs && ind.faqs.length > 0 && (
        <section className="faq-sec">
          <div className="in">
            <div style={{ textAlign:'center', marginBottom:0 }}>
              <div className="lbl" style={{ color:'#7EC8E3', justifyContent:'center' }}><span className="ldot" />FAQ</div>
              <h2 className="sec-t rv" style={{ fontSize:'clamp(22px,3vw,36px)', color:'#fff', marginBottom:8 }}>Frequently Asked Questions</h2>
              <p style={{ fontSize:15, color:'rgba(255,255,255,.45)', maxWidth:520, margin:'0 auto' }}>Common questions about our {ind.name.toLowerCase()} software services.</p>
            </div>
            <div className="faq-list">
              {ind.faqs.map((f, i) => (
                <div key={i} className={`faq-item rv d${(i%6)+1}${openFaq === i ? ' open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                    <span className="faq-qt">{f.q}</span>
                    <span className="faq-arr">+</span>
                  </button>
                  {openFaq === i && <p className="faq-a">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section className="cta-sec">
        <div className="cta-in rv">
          <div className="lbl" style={{ color:'#7EC8E3', justifyContent:'center' }}><span className="ldot" />Ready to Start?</div>
          <h2 className="cta-t">{ind.ctaHeadline}</h2>
          <p className="cta-s">{ind.ctaDesc}</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="btn-p" onClick={() => track.industryCta('Book a Free Consultation', slug)}>Book a Free Consultation →</Link>
            <Link href="/services" className="btn-s" onClick={() => track.industryCta('View All Services', slug)}>View All Services</Link>
          </div>
          <div className="trust-items">
            {['No obligation','Reply within 24 hours','HIPAA-ready','10+ years experience'].map(t => (
              <span key={t} className="ti"><span style={{ color:'#7EC8E3' }}>✓</span>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER INDUSTRIES ── */}
      <section className="other">
        <div className="in">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8, flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.32)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:4 }}>Explore More</div>
              <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, fontWeight:800, color:'#fff' }}>Other Industries We Serve</h3>
            </div>
            <Link href="/industries" style={{ fontSize:13, fontWeight:700, color:'#FF6B2B' }}>View All Industries →</Link>
          </div>
          <div className="other-grid">
            {allInds.filter(i => i.slug !== slug).map(i => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="other-card">
                <span className="other-ic">{i.icon}</span>
                <span className="other-t">{i.name}</span>
                <span className="other-arr">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT ── */}
      <nav className="pn">
        <div className="pn-in">
          {prev ? (
            <Link href={`/industries/${prev.slug}`} className="pn-btn">
              <span className="pn-arr">←</span>
              <div><div className="pn-lbl">Previous</div><div className="pn-name"><span>{prev.icon}</span>{prev.name}</div></div>
            </Link>
          ) : <div />}
          <Link href="/industries" className="pn-all">⊞ All Industries</Link>
          {next ? (
            <Link href={`/industries/${next.slug}`} className="pn-btn" style={{ justifyContent:'flex-end' }}>
              <div style={{ textAlign:'right' }}><div className="pn-lbl">Next</div><div className="pn-name" style={{ justifyContent:'flex-end' }}>{next.name}<span>{next.icon}</span></div></div>
              <span className="pn-arr">→</span>
            </Link>
          ) : <div />}
        </div>
      </nav>

      <ScrollToTop />
    </Layout>
  )
}
