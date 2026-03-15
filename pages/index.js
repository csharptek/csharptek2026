import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

/* ============================================================
   SINGLE-FILE HOMEPAGE — all sections, no external deps
   Fonts loaded inline, no opacity:0 traps, solid fallbacks
   ============================================================ */

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0A1628;overflow-x:hidden;background:#0A1628;}
  a{text-decoration:none;}
  ul{list-style:none;}
  button{cursor:pointer;font-family:'Mulish',sans-serif;}

  /* reveal on scroll */
  .rv{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}
  .rv.on{opacity:1;transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}
  .d4{transition-delay:.28s;}.d5{transition-delay:.35s;}.d6{transition-delay:.42s;}

  /* shared label */
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;}
  .lbl-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;flex-shrink:0;display:inline-block;}
  .sec-title{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}

  /* keyframes */
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes bounce{0%,100%{transform:translateY(0);opacity:.45}50%{transform:translateY(9px);opacity:1}}
  @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes chatPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}

  /* hero animations — use visibility not opacity so text always renders */
  @keyframes heroUp{from{transform:translateY(28px)}to{transform:translateY(0)}}

  /* nav */
  .nav{position:sticky;top:0;z-index:100;height:70px;border-bottom:1px solid transparent;transition:background .3s,border-color .3s,box-shadow .3s;}
  .nav.sc{background:rgba(10,22,40,.95);backdrop-filter:blur(20px);box-shadow:0 2px 32px rgba(0,0,0,.4);border-color:rgba(46,158,214,.12);}
  .nav-inner{max-width:1200px;margin:0 auto;height:70px;padding:0 28px;display:flex;align-items:center;gap:24px;}
  .nav-logo{display:flex;align-items:center;gap:2px;}
  .nav-logo span:first-child{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:22px;background:linear-gradient(135deg,#2E9ED6,#7EC8E3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .nav-logo span:last-child{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:22px;color:#fff;}
  .nav-links{display:flex;gap:22px;flex:1;justify-content:center;}
  .nav-links a{color:rgba(255,255,255,.78);font-size:13.5px;font-weight:600;letter-spacing:.03em;position:relative;padding-bottom:3px;transition:color .2s;}
  .nav-links a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:#FF6B2B;border-radius:2px;transition:width .25s;}
  .nav-links a:hover{color:#fff;}
  .nav-links a:hover::after{width:100%;}
  .nav-cta{background:#FF6B2B;color:#fff;padding:10px 22px;border-radius:8px;font-size:13.5px;font-weight:700;white-space:nowrap;transition:all .2s;}
  .nav-cta:hover{background:#e55a1f;box-shadow:0 4px 16px rgba(255,107,43,.4);}
  .hbg{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:4px;margin-left:auto;}
  .hbg span{display:block;width:24px;height:2px;background:#fff;border-radius:2px;transition:transform .3s,opacity .3s;}
  .mob-menu{background:rgba(10,22,40,.97);backdrop-filter:blur(20px);border-top:1px solid rgba(46,158,214,.12);padding:16px 28px 24px;flex-direction:column;gap:4px;}
  .mob-menu a{color:rgba(255,255,255,.82);font-size:16px;font-weight:600;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05);display:block;}
  .mob-cta-link{margin-top:14px!important;background:#FF6B2B;color:#fff!important;padding:14px!important;border-radius:10px;text-align:center;border-bottom:none!important;}

  /* hero */
  .hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 55%,#091422 100%);padding:20px 24px 80px;}
  .hero canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
  .orb{position:absolute;border-radius:50%;pointer-events:none;}
  .orb1{top:4%;left:-8%;width:600px;height:600px;background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);animation:orbFloat 9s ease-in-out infinite;}
  .orb2{bottom:0;right:-12%;width:720px;height:720px;background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);animation:orbFloat 11s ease-in-out infinite reverse;}
  .orb3{top:35%;right:5%;width:340px;height:340px;background:radial-gradient(circle,rgba(255,107,43,.07) 0%,transparent 70%);animation:orbFloat 13s ease-in-out infinite;}
  .hero-cnt{position:relative;z-index:2;text-align:center;max-width:900px;display:flex;flex-direction:column;align-items:center;}
  .hero-eye{display:inline-flex;align-items:center;gap:8px;background:rgba(46,158,214,.07);border:1px solid rgba(46,158,214,.2);border-radius:100px;padding:7px 18px;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#7EC8E3;margin-bottom:28px;}
  .hero-h1{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-size:clamp(34px,5.5vw,66px);font-weight:800;line-height:1.09;letter-spacing:-.025em;color:#fff;margin-bottom:18px;}
  .hero-grad{color:#2E9ED6;background:linear-gradient(90deg,#2E9ED6,#7EC8E3,#2E9ED6);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3.5s linear infinite;}
  .hero-tw{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;font-size:clamp(15px,2vw,21px);margin-bottom:24px;color:#fff;}
  .tw-muted{color:rgba(255,255,255,.45);font-weight:300;}
  .tw-word{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;color:#FF6B2B;min-width:200px;text-align:left;}
  .tw-cur{color:#FF6B2B;animation:blink .85s step-end infinite;}
  .hero-sub{font-size:clamp(14px,1.7vw,17px);color:rgba(255,255,255,.62);line-height:1.8;max-width:630px;margin:0 auto 36px;font-weight:400;}
  .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;}
  .btn-p{background:#FF6B2B;color:#fff;padding:15px 34px;border-radius:10px;font-weight:700;font-size:15px;transition:all .2s;display:inline-block;}
  .btn-p:hover{background:#e55a1f;transform:translateY(-2px);box-shadow:0 8px 28px rgba(255,107,43,.38);}
  .btn-s{background:transparent;color:#7EC8E3;padding:15px 34px;border-radius:10px;font-weight:600;font-size:15px;border:1.5px solid rgba(46,158,214,.4);transition:all .2s;display:inline-block;}
  .btn-s:hover{border-color:#FF6B2B;color:#FF6B2B;}
  .hero-badges{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}
  .hero-badge{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:5px 15px;font-size:11px;color:rgba(255,255,255,.5);font-weight:600;letter-spacing:.05em;}
  .stats-bar{position:relative;z-index:2;display:flex;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.14);border-radius:18px;margin-top:50px;width:100%;max-width:800px;overflow:hidden;}
  .stat-it{flex:1;display:flex;flex-direction:column;align-items:center;padding:26px 16px;gap:7px;border-right:1px solid rgba(46,158,214,.1);}
  .stat-it:last-child{border-right:none;}
  .stat-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#FF6B2B;}
  .stat-l{font-size:11px;color:rgba(255,255,255,.42);text-transform:uppercase;letter-spacing:.1em;font-weight:700;text-align:center;}
  .scroll-ind{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);z-index:2;width:26px;height:44px;border:2px solid rgba(46,158,214,.25);border-radius:13px;display:flex;justify-content:center;padding-top:7px;}
  .scroll-dot{width:4px;height:4px;border-radius:50%;background:#FF6B2B;animation:bounce 1.9s ease-in-out infinite;}

  /* trust */
  .trust{background:#060f1d;padding:28px 0;border-bottom:1px solid rgba(46,158,214,.08);}
  .trust-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .trust-top{display:flex;align-items:center;gap:16px;margin-bottom:18px;}
  .trust-top p{font-size:11px;color:rgba(255,255,255,.32);font-weight:700;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;}
  .trust-line{flex:1;height:1px;background:rgba(255,255,255,.07);}
  .tlogos{overflow:hidden;position:relative;}
  .tlogos::before,.tlogos::after{content:'';position:absolute;top:0;bottom:0;width:60px;z-index:2;}
  .tlogos::before{left:0;background:linear-gradient(to right,#060f1d,transparent);}
  .tlogos::after{right:0;background:linear-gradient(to left,#060f1d,transparent);}
  .ttrack{display:flex;align-items:center;gap:36px;animation:marquee 28s linear infinite;width:max-content;}
  .lpill{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:9px 14px;white-space:nowrap;}
  .lpill span:first-child{font-size:16px;}
  .lpill span:last-child{font-size:11px;font-weight:700;color:rgba(255,255,255,.55);}
  .pbadges{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.05);flex-wrap:wrap;}
  .pb{display:flex;align-items:center;gap:8px;padding:9px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:9px;}
  .pb .pb-ic{font-size:18px;}
  .pb .pb-nm{font-size:11px;font-weight:700;color:#fff;}
  .pb .pb-lv{font-size:10px;color:rgba(255,255,255,.35);}

  /* services */
  .services{background:#F0F8FF;padding:96px 0;}
  .srv-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .srv-hd{text-align:center;margin-bottom:52px;}
  .srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .scard{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:16px;padding:30px 26px;transition:all .3s;cursor:pointer;}
  .scard:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(21,101,168,.12);border-color:rgba(46,158,214,.3);}
  .sc-ico{width:50px;height:50px;border-radius:13px;background:rgba(21,101,168,.08);display:flex;align-items:center;justify-content:center;font-size:23px;margin-bottom:16px;transition:background .3s;}
  .scard:hover .sc-ico{background:linear-gradient(135deg,#1565A8,#2E9ED6);}
  .sc-ttl{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:700;color:#0A1628;margin-bottom:9px;}
  .sc-dsc{font-size:13px;color:rgba(10,22,40,.52);line-height:1.67;}
  .sc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:15px;}
  .sc-tag{font-size:10px;font-weight:700;color:#1565A8;background:rgba(21,101,168,.07);border-radius:5px;padding:3px 9px;}

  /* industries */
  .inds{background:#0D2B45;padding:96px 0;}
  .ind-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .ind-hd{text-align:center;margin-bottom:52px;}
  .ind-g1{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
  .ind-g2{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:18px;}
  .icard{border-radius:16px;overflow:hidden;cursor:pointer;aspect-ratio:3/4;position:relative;transition:transform .3s;}
  .icard:hover{transform:translateY(-6px);}
  .ibg{position:absolute;inset:0;transition:transform .4s;}
  .icard:hover .ibg{transform:scale(1.06);}
  .igrd{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,22,40,.95) 0%,rgba(10,22,40,.4) 55%,rgba(10,22,40,.15) 100%);}
  .icnt{position:absolute;bottom:0;left:0;right:0;padding:22px 18px;}
  .i-ico{width:42px;height:42px;border-radius:11px;background:rgba(46,158,214,.22);display:flex;align-items:center;justify-content:center;margin-bottom:11px;font-size:21px;transition:background .3s;}
  .icard:hover .i-ico{background:rgba(255,107,43,.9);}
  .i-nm{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:5px;}
  .i-ds{font-size:11px;color:rgba(255,255,255,.55);line-height:1.45;}

  /* why */
  .why{background:#0A1628;padding:96px 0;}
  .why-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .why-lay{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
  .wstats{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px;}
  .wst{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.1);border-radius:13px;padding:20px 18px;}
  .ws-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,3.2vw,40px);font-weight:800;color:#FF6B2B;line-height:1;margin-bottom:5px;}
  .ws-l{font-size:11px;color:rgba(255,255,255,.38);font-weight:700;text-transform:uppercase;letter-spacing:.08em;}
  .diffs{display:flex;flex-direction:column;gap:12px;}
  .dif{display:flex;align-items:flex-start;gap:13px;padding:16px 18px;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.08);border-radius:11px;transition:all .3s;}
  .dif:hover{border-color:rgba(46,158,214,.22);transform:translateX(4px);}
  .dif-i{width:38px;height:38px;border-radius:10px;background:rgba(46,158,214,.1);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
  .dif h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;}
  .dif p{font-size:13px;color:rgba(255,255,255,.45);line-height:1.55;}
  .wcard{background:linear-gradient(135deg,#0D2B45,#1565A8);border:1px solid rgba(46,158,214,.18);border-radius:18px;padding:30px 26px;margin-bottom:14px;}
  .wcard-lbl{font-size:10px;font-weight:700;color:#7EC8E3;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;}
  .wcard-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:800;color:#fff;margin-bottom:4px;}
  .wcard-s{font-size:13px;color:rgba(255,255,255,.45);margin-bottom:22px;}
  .wmet{display:flex;align-items:center;gap:13px;margin-bottom:13px;}
  .wmet-l{font-size:11px;color:rgba(255,255,255,.55);font-weight:600;min-width:90px;}
  .wmet-bw{flex:1;height:5px;background:rgba(255,255,255,.07);border-radius:3px;overflow:hidden;}
  .wmet-bf{height:100%;border-radius:3px;background:linear-gradient(90deg,#2E9ED6,#7EC8E3);transition:width 1.4s ease;}
  .wmet-p{font-size:11px;color:#7EC8E3;font-weight:700;min-width:32px;text-align:right;}
  .wsm{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.12);border-radius:13px;padding:17px;display:flex;align-items:center;gap:13px;margin-bottom:11px;}
  .wsm-ic{font-size:25px;}
  .wsm h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;color:#fff;margin-bottom:2px;}
  .wsm p{font-size:11px;color:rgba(255,255,255,.38);}
  .wsm-b{margin-left:auto;background:rgba(255,107,43,.14);border:1px solid rgba(255,107,43,.28);border-radius:5px;padding:3px 9px;font-size:10px;font-weight:700;color:#FF6B2B;white-space:nowrap;}

  /* portfolio */
  .port{background:#F0F8FF;padding:96px 0;}
  .port-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .port-hd{text-align:center;margin-bottom:44px;}
  .pfilts{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:40px;}
  .pfb{padding:9px 20px;border-radius:100px;border:1.5px solid rgba(21,101,168,.2);background:transparent;font-size:13px;font-weight:700;color:rgba(10,22,40,.5);transition:all .2s;}
  .pfb.act,.pfb:hover{background:#1565A8;color:#fff;border-color:#1565A8;}
  .port-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
  .pcard{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:16px;overflow:hidden;transition:all .3s;display:flex;flex-direction:column;}
  .pcard:hover{transform:translateY(-6px);box-shadow:0 22px 52px rgba(21,101,168,.13);border-color:rgba(46,158,214,.3);}
  .pcv{height:168px;display:flex;align-items:center;justify-content:center;position:relative;}
  .pce{font-size:50px;}
  .pct{position:absolute;top:13px;left:13px;font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:3px 10px;border-radius:100px;}
  .pcb{padding:22px 20px;flex:1;}
  .pc-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#0A1628;margin-bottom:7px;}
  .pc-d{font-size:13px;color:rgba(10,22,40,.5);line-height:1.64;}
  .pc-stk{display:flex;flex-wrap:wrap;gap:5px;margin-top:13px;}
  .pc-tk{font-size:10px;font-weight:700;color:#1565A8;background:rgba(21,101,168,.07);border-radius:4px;padding:2px 8px;}
  .pcf{display:flex;align-items:center;justify-content:space-between;padding:13px 20px;border-top:1px solid rgba(21,101,168,.07);}
  .pco{font-size:11px;font-weight:700;color:#FF6B2B;}
  .pcl{font-size:11px;font-weight:700;color:#1565A8;}

  /* tech */
  .tech{background:#0A1628;padding:96px 0;}
  .tech-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .tech-hd{text-align:center;margin-bottom:52px;}
  .tgrps{display:flex;flex-direction:column;gap:32px;}
  .tglbl{display:flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:13px;}
  .tglbl::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.05);}
  .tgpills{display:flex;flex-wrap:wrap;gap:9px;}
  .tgp{display:flex;align-items:center;gap:7px;padding:9px 15px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:9px;transition:all .22s;}
  .tgp:hover{background:rgba(46,158,214,.1);border-color:rgba(46,158,214,.28);transform:translateY(-2px);}
  .tgp.ft{background:rgba(46,158,214,.07);border-color:rgba(46,158,214,.18);}
  .tgp span:first-child{font-size:16px;}
  .tgp span:last-child{font-size:12px;font-weight:600;color:rgba(255,255,255,.65);white-space:nowrap;}

  /* testimonials */
  .testi{background:#F0F8FF;padding:96px 0;}
  .testi-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .testi-hd{text-align:center;margin-bottom:48px;}
  .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
  .tcard{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:16px;padding:30px 26px;transition:all .3s;position:relative;}
  .tcard:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(21,101,168,.1);}
  .tc-ind{position:absolute;top:18px;right:18px;font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;}
  .tc-q{font-size:38px;color:#2E9ED6;line-height:1;margin-bottom:13px;font-family:Georgia,serif;}
  .tc-stars{display:flex;gap:2px;margin-bottom:15px;}
  .tc-stars span{color:#FF6B2B;font-size:13px;}
  .tc-txt{font-size:13.5px;color:rgba(10,22,40,.6);line-height:1.72;margin-bottom:22px;font-style:italic;}
  .tc-auth{display:flex;align-items:center;gap:13px;}
  .tc-av{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:15px;color:#fff;flex-shrink:0;}
  .tc-nm{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
  .tc-rl{font-size:11px;color:rgba(10,22,40,.4);}

  /* blog */
  .blog{background:#0D2B45;padding:96px 0;}
  .blog-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .blog-hd{text-align:center;margin-bottom:48px;}
  .blog-feat{display:grid;grid-template-columns:1.4fr 1fr;gap:22px;margin-bottom:22px;}
  .blog-row{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
  .bcard{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:16px;overflow:hidden;transition:all .3s;cursor:pointer;}
  .bcard:hover{transform:translateY(-4px);border-color:rgba(46,158,214,.28);}
  .bv{display:flex;align-items:center;justify-content:center;position:relative;}
  .bv-lg{height:190px;}
  .bv-sm{height:130px;}
  .bcat{position:absolute;top:13px;left:13px;font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:3px 10px;border-radius:100px;background:rgba(46,158,214,.22);color:#7EC8E3;}
  .bb{padding:22px 22px 26px;}
  .bm{font-size:11px;color:rgba(255,255,255,.32);font-weight:600;margin-bottom:9px;}
  .bt{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.3;}
  .bt-lg{font-size:17px;}
  .bt-sm{font-size:14px;}
  .bex{font-size:13px;color:rgba(255,255,255,.45);line-height:1.64;}
  .bln{display:inline-flex;align-items:center;gap:5px;margin-top:14px;font-size:12px;font-weight:700;color:#FF6B2B;transition:gap .2s;}
  .bln:hover{gap:9px;}

  /* quiz */
  .quiz{background:#F0F8FF;padding:96px 0;}
  .quiz-inner{max-width:840px;margin:0 auto;padding:0 28px;text-align:center;}
  .qbadge{display:inline-flex;align-items:center;gap:7px;background:rgba(255,107,43,.08);border:1px solid rgba(255,107,43,.2);border-radius:100px;padding:5px 16px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#FF6B2B;margin-bottom:20px;}
  .q-card{background:#fff;border:1px solid rgba(21,101,168,.1);border-radius:18px;padding:36px;box-shadow:0 6px 32px rgba(21,101,168,.07);}
  .qprog{height:4px;background:rgba(21,101,168,.08);border-radius:2px;margin-bottom:26px;overflow:hidden;}
  .qpbar{height:100%;background:linear-gradient(90deg,#1565A8,#2E9ED6);border-radius:2px;transition:width .4s ease;}
  .qq{font-family:'Plus Jakarta Sans',sans-serif;font-size:19px;font-weight:700;color:#0A1628;margin-bottom:22px;line-height:1.3;text-align:left;}
  .qopts{display:flex;flex-direction:column;gap:10px;margin-bottom:26px;}
  .qopt{padding:13px 17px;border:1.5px solid rgba(21,101,168,.14);border-radius:9px;background:#fff;font-size:14px;font-weight:600;color:#0A1628;transition:all .2s;text-align:left;}
  .qopt:hover,.qopt.sel{border-color:#1565A8;background:rgba(21,101,168,.05);color:#1565A8;}
  .qnav{display:flex;justify-content:space-between;align-items:center;}
  .qslbl{font-size:12px;color:rgba(10,22,40,.38);font-weight:600;}
  .qnxt{background:#1565A8;color:#fff;padding:10px 26px;border-radius:8px;border:none;font-size:14px;font-weight:700;transition:background .2s;}
  .qnxt:hover{background:#0e4a80;}
  .qnxt:disabled{background:#ccc;cursor:not-allowed;}
  .qbk{background:transparent;color:rgba(10,22,40,.38);padding:10px 14px;border-radius:8px;border:1.5px solid rgba(10,22,40,.1);font-size:14px;font-weight:600;}
  .qres{text-align:center;}
  .qri{font-size:54px;margin-bottom:14px;}
  .qrt{font-family:'Plus Jakarta Sans',sans-serif;font-size:21px;font-weight:800;margin-bottom:7px;}
  .qrsb{height:7px;background:rgba(21,101,168,.09);border-radius:4px;margin:16px 0;overflow:hidden;}
  .qrsf{height:100%;border-radius:4px;transition:width 1.2s ease;}
  .qrm{font-size:15px;color:rgba(10,22,40,.55);line-height:1.6;max-width:420px;margin:0 auto 26px;}
  .qrcta{display:inline-flex;align-items:center;gap:7px;padding:14px 30px;border-radius:10px;background:#FF6B2B;color:#fff;font-weight:700;font-size:14px;border:none;}
  .qrst{display:block;margin-top:13px;font-size:12px;color:rgba(10,22,40,.38);cursor:pointer;text-decoration:underline;background:none;border:none;}

  /* cta banner */
  .ctab{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;position:relative;overflow:hidden;}
  .ctab-c{max-width:680px;margin:0 auto;position:relative;z-index:1;}
  .ctab-ey{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:100px;padding:6px 18px;font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:22px;}
  .ctab-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,5vw,56px);font-weight:800;color:#fff;margin-bottom:16px;line-height:1.08;letter-spacing:-.025em;}
  .ctab-ts{color:#FF6B2B;}
  .ctab-s{font-size:17px;color:rgba(255,255,255,.56);line-height:1.7;margin-bottom:38px;}
  .ctab-acts{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:36px;}
  .ctab-tr{display:flex;gap:22px;justify-content:center;flex-wrap:wrap;}
  .ctab-ti{display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,.45);font-weight:600;}

  /* footer */
  .footer{background:#060f1d;padding:72px 0 0;}
  .ft-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .ft-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:44px;padding-bottom:52px;border-bottom:1px solid rgba(255,255,255,.05);}
  .ft-logo{display:flex;align-items:center;gap:3px;margin-bottom:14px;}
  .ft-logo span:first-child{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:19px;background:linear-gradient(135deg,#2E9ED6,#7EC8E3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .ft-logo span:last-child{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:19px;color:#fff;}
  .ft-desc{font-size:13px;color:rgba(255,255,255,.36);line-height:1.68;margin-bottom:20px;max-width:270px;}
  .ft-soc{display:flex;gap:9px;margin-bottom:18px;}
  .ft-si{width:34px;height:34px;border-radius:7px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:15px;transition:all .2s;}
  .ft-si:hover{background:rgba(46,158,214,.14);border-color:rgba(46,158,214,.28);}
  .ft-news{background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.1);border-radius:13px;padding:18px;}
  .ft-nt{font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:700;color:#fff;margin-bottom:4px;}
  .ft-ns{font-size:11px;color:rgba(255,255,255,.36);margin-bottom:13px;}
  .ft-nf{display:flex;gap:7px;}
  .ft-ni{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);border-radius:7px;padding:9px 12px;font-size:12px;color:#fff;outline:none;}
  .ft-nb{background:#FF6B2B;color:#fff;border:none;padding:9px 14px;border-radius:7px;font-size:12px;font-weight:700;transition:background .2s;}
  .ft-nb:hover{background:#e55a1f;}
  .ft-col h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,.85);letter-spacing:.05em;text-transform:uppercase;margin-bottom:16px;}
  .ft-col ul{display:flex;flex-direction:column;gap:9px;}
  .ft-col ul li a{font-size:12px;color:rgba(255,255,255,.36);font-weight:500;transition:color .2s;}
  .ft-col ul li a:hover{color:#7EC8E3;}
  .ft-resp{margin-top:18px;padding:11px 13px;background:rgba(255,107,43,.07);border:1px solid rgba(255,107,43,.17);border-radius:9px;}
  .ft-resp-t{font-size:10px;font-weight:700;color:#FF6B2B;margin-bottom:3px;}
  .ft-resp-s{font-size:11px;color:rgba(255,255,255,.38);}
  .ft-bot{display:flex;align-items:center;justify-content:space-between;padding:22px 0;flex-wrap:wrap;gap:10px;}
  .ft-cp{font-size:11px;color:rgba(255,255,255,.28);}
  .ft-lks{display:flex;gap:18px;}
  .ft-lks a{font-size:11px;color:rgba(255,255,255,.28);transition:color .2s;}
  .ft-lks a:hover{color:#7EC8E3;}
  .ft-bdg{font-size:10px;color:rgba(255,255,255,.22);font-weight:600;}

  /* chatbot */
  .chatbub{position:fixed;bottom:26px;right:26px;z-index:999;}
  .chtog{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#1565A8,#2E9ED6);border:none;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 6px 24px rgba(21,101,168,.45);transition:all .2s;position:relative;}
  .chtog:hover{transform:scale(1.08);}
  .ch-dot{position:absolute;top:1px;right:1px;width:13px;height:13px;border-radius:50%;background:#FF6B2B;border:2px solid #fff;animation:chatPulse 2s ease-in-out infinite;}
  .chwin{position:absolute;bottom:68px;right:0;width:330px;background:#fff;border-radius:16px;box-shadow:0 20px 56px rgba(10,22,40,.2);overflow:hidden;display:flex;flex-direction:column;border:1px solid rgba(21,101,168,.1);}
  .chh{background:linear-gradient(135deg,#0A1628,#1565A8);padding:16px 18px;display:flex;align-items:center;gap:11px;}
  .chav{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
  .ch-inf h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;color:#fff;margin-bottom:1px;}
  .ch-inf p{font-size:10px;color:rgba(255,255,255,.5);}
  .ch-on{width:7px;height:7px;border-radius:50%;background:#4ade80;margin-left:auto;}
  .chmsgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;max-height:240px;background:#F8FAFC;}
  .cmsg{display:flex;flex-direction:column;max-width:85%;}
  .cmsg.bot{align-self:flex-start;}
  .cmsg.usr{align-self:flex-end;}
  .cmbub{padding:10px 13px;border-radius:11px;font-size:12px;line-height:1.5;font-weight:500;}
  .cmsg.bot .cmbub{background:#fff;color:#0A1628;border:1px solid rgba(21,101,168,.09);border-bottom-left-radius:3px;}
  .cmsg.usr .cmbub{background:linear-gradient(135deg,#1565A8,#2E9ED6);color:#fff;border-bottom-right-radius:3px;}
  .chqk{display:flex;flex-wrap:wrap;gap:5px;padding:9px 14px;border-top:1px solid rgba(21,101,168,.07);background:#fff;}
  .chqb{padding:5px 10px;border-radius:100px;border:1.5px solid rgba(21,101,168,.18);background:transparent;font-size:10px;font-weight:700;color:#1565A8;transition:all .2s;}
  .chqb:hover{background:#1565A8;color:#fff;}
  .chinr{display:flex;gap:7px;padding:10px 14px;background:#fff;border-top:1px solid rgba(21,101,168,.07);}
  .chin{flex:1;border:1.5px solid rgba(21,101,168,.14);border-radius:7px;padding:8px 11px;font-size:12px;color:#0A1628;outline:none;}
  .chin:focus{border-color:#1565A8;}
  .chsnd{background:#1565A8;color:#fff;border:none;width:32px;height:32px;border-radius:7px;font-size:14px;transition:background .2s;}
  .chsnd:hover{background:#0e4a80;}

  /* shared buttons */
  .btn-ol{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:10px;border:2px solid #1565A8;color:#1565A8;font-weight:700;font-size:15px;transition:all .2s;}
  .btn-ol:hover{background:#1565A8;color:#fff;}
  .btn-or{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:10px;background:#FF6B2B;color:#fff;font-weight:700;font-size:15px;transition:all .2s;}
  .btn-or:hover{background:#e55a1f;transform:translateY(-2px);}
  .btn-gh{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:10px;border:2px solid rgba(46,158,214,.35);color:#7EC8E3;font-weight:700;font-size:15px;transition:all .2s;}
  .btn-gh:hover{border-color:#FF6B2B;color:#FF6B2B;}
  .btn-ghw{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:10px;border:2px solid rgba(46,158,214,.35);color:#7EC8E3;font-weight:700;font-size:15px;transition:all .2s;}
  .btn-ghw:hover{border-color:#FF6B2B;color:#FF6B2B;}

  /* responsive */
  @media(max-width:1024px){.why-lay{grid-template-columns:1fr!important;gap:48px!important;}}
  @media(max-width:900px){
    .srv-grid,.tgrid,.port-grid{grid-template-columns:repeat(2,1fr)!important;}
    .ind-g1{grid-template-columns:repeat(2,1fr)!important;}
    .ind-g2{grid-template-columns:repeat(2,1fr)!important;}
    .blog-feat{grid-template-columns:1fr!important;}
    .blog-row{grid-template-columns:repeat(2,1fr)!important;}
    .ft-top{grid-template-columns:1fr 1fr!important;}
    .nav-links,.nav-cta{display:none!important;}
    .hbg{display:flex!important;}
  }
  @media(max-width:580px){
    .srv-grid,.tgrid,.port-grid,.blog-row,.ind-g1,.ind-g2{grid-template-columns:1fr!important;}
    .stats-bar,.wstats{flex-direction:column!important;}
    .stat-it{border-right:none!important;border-bottom:1px solid rgba(46,158,214,.1)!important;}
    .stat-it:last-child{border-bottom:none!important;}
    .ft-top{grid-template-columns:1fr!important;}
    .ft-bot{flex-direction:column!important;text-align:center!important;}
    .chwin{width:290px!important;}
  }
`

/* ─── DATA ─────────────────────────────────────── */
const WORDS = ['Healthcare','Education','Wellness','Automation','Marketplaces','Pet Care','Fertility & IVF']

const LOGOS = ['☁️ Microsoft Azure','🟠 AWS','🔵 Google Cloud','🤖 OpenAI','⚡ Claude','🐙 GitHub Copilot','📞 Twilio','🎙️ ElevenLabs','📊 HubSpot','⚛️ React / Next.js','🔷 .NET Core','🐳 Docker / K8s','🗄️ Supabase','🎨 Figma']

const SERVICES = [
  {i:'🧠',t:'AI Integration & Automation',d:'Embed AI into your workflows — intelligent document processing, medical scribes and full business automation.',tags:['OpenAI','Claude','Azure AI','LangChain']},
  {i:'🎙️',t:'AI Voice Agents',d:'Inbound & outbound voice AI, SMS, appointment setters and lead qualifiers — powered by ElevenLabs, VAPI & Twilio.',tags:['ElevenLabs','VAPI','Twilio']},
  {i:'📱',t:'Web & Mobile Development',d:'Full-stack apps using React, Next.js, React Native, .NET Core and Blazor — built for performance.',tags:['React','Next.js','React Native','.NET']},
  {i:'☁️',t:'Cloud Infrastructure & DevOps',d:'Azure, AWS & GCP architecture, Docker, Kubernetes, CI/CD pipelines and multi-cloud deployments.',tags:['Azure','AWS','Kubernetes','DevOps']},
  {i:'🚀',t:'MVP & Vibe Coding',d:'Launch your idea in 4–8 weeks using AI-assisted vibe coding with Cursor, Lovable and Base44.',tags:['Cursor','Lovable','Replit','Vercel']},
  {i:'🛒',t:'Marketplace Publishing',d:'We publish production-ready software on Azure, AWS and Google Marketplaces — enterprise-ready.',tags:['Azure Marketplace','AWS','GCP']},
]

const INDUSTRIES = [
  {i:'🏥',n:'Healthcare',d:'HIPAA, EHR/FHIR, Epic, Medical Scribe',bg:'linear-gradient(135deg,#0D2B45,#1565A8)'},
  {i:'🌸',n:'Wellness & Fertility',d:'IVF, Fertility Clinics, Women\'s Wellness',bg:'linear-gradient(135deg,#0a2a1e,#0f6e56)'},
  {i:'🎓',n:'Education & EdTech',d:'K-12, Internships, AI Evaluation',bg:'linear-gradient(135deg,#1a1a0a,#7a5a0a)'},
  {i:'🤖',n:'Marketing & Automation',d:'HubSpot, GoHighLevel, Apollo',bg:'linear-gradient(135deg,#1a0a1a,#6b2fa0)'},
  {i:'🛒',n:'Service Marketplaces',d:'Multi-vendor, Bookings, Payments',bg:'linear-gradient(135deg,#0a1a1a,#0a5a5a)'},
  {i:'🐾',n:'Pet Care & Wellness',d:'Vaccination Kiosk, RFID, Pet Tech',bg:'linear-gradient(135deg,#0a1a0a,#3a6a0a)'},
  {i:'⚙️',n:'CRM & Productivity',d:'Custom CRMs, Internal Tools',bg:'linear-gradient(135deg,#1a0a0a,#8B2a2a)'},
]

const PROJECTS = [
  {e:'🩺',t:'Medical Scribe AI',d:'Real-time clinical transcription with FHIR & Epic EHR integration.',stk:['Azure OpenAI','FHIR','Epic','.NET'],out:'⚡ 70% faster note-taking',cat:'healthcare',bg:'linear-gradient(135deg,#0D2B45,#1565A8)',tb:'rgba(46,158,214,.22)',tc:'#7EC8E3',tl:'Healthcare'},
  {e:'🌸',t:'IVF & Fertility Platform',d:'Patient journey management and HIPAA-compliant records for fertility clinics.',stk:['React Native','Azure','HIPAA','Supabase'],out:'📈 3x patient engagement',cat:'wellness',bg:'linear-gradient(135deg,#1a0a2a,#6b1fa0)',tb:'rgba(180,80,220,.22)',tc:'#e0a0ff',tl:'Wellness'},
  {e:'🎓',t:'Student Internship Portal',d:'AI-based matching and evaluation for students, educators and institutes.',stk:['Next.js','Claude API','PostgreSQL','Vercel'],out:'🏫 10k+ students',cat:'education',bg:'linear-gradient(135deg,#1a1a0a,#7a5a0a)',tb:'rgba(200,160,20,.22)',tc:'#f0d060',tl:'Education'},
  {e:'📞',t:'AI Voice Lead Qualifier',d:'24/7 inbound/outbound voice AI that qualifies leads and books appointments.',stk:['VAPI','ElevenLabs','Twilio','GoHighLevel'],out:'🤖 60% cost reduction',cat:'automation',bg:'linear-gradient(135deg,#1a0a0a,#8B2a0a)',tb:'rgba(255,107,43,.22)',tc:'#ffaa80',tl:'Automation'},
  {e:'🐾',t:'Pet Vaccination Kiosk',d:'Self-service kiosk with RFID pet ID integration for instant check-in.',stk:['React','RFID','Azure IoT','Node.js'],out:'🐕 5 min avg check-in',cat:'other',bg:'linear-gradient(135deg,#0a1a0a,#2a6a0a)',tb:'rgba(60,160,60,.22)',tc:'#90e090',tl:'Pet Care'},
  {e:'📲',t:'Social Media Automation',d:'AI content generation, scheduling and image-to-video pipeline at scale.',stk:['OpenAI','Instantly.ai','Apollo.io','LinkedIn API'],out:'📊 5x content output',cat:'automation',bg:'linear-gradient(135deg,#0a0a1a,#1a2a8a)',tb:'rgba(80,120,255,.22)',tc:'#a0c0ff',tl:'Automation'},
]

const TECH = [
  {l:'Cloud Platforms',p:[{i:'☁️',n:'Microsoft Azure',f:1},{i:'🟠',n:'AWS',f:1},{i:'🔵',n:'Google Cloud',f:1},{i:'🏪',n:'Azure Marketplace'},{i:'🏪',n:'AWS Marketplace'},{i:'🏪',n:'Google Marketplace'}]},
  {l:'AI & LLMs',p:[{i:'🤖',n:'OpenAI / ChatGPT',f:1},{i:'⚡',n:'Claude (Anthropic)',f:1},{i:'🔷',n:'Azure OpenAI'},{i:'🌐',n:'Google Gemini'},{i:'🐙',n:'GitHub Copilot'},{i:'🖼️',n:'AI Image Gen'},{i:'🎬',n:'AI Video Gen'},{i:'🔍',n:'Azure AI Search'}]},
  {l:'AI Voice & Comms',p:[{i:'🎙️',n:'ElevenLabs',f:1},{i:'📞',n:'Twilio',f:1},{i:'🎤',n:'VAPI'},{i:'💬',n:'AI SMS / IVR'},{i:'📅',n:'Appointment Setter'},{i:'🔔',n:'Reminder Agent'}]},
  {l:'Frontend & Mobile',p:[{i:'⚛️',n:'React',f:1},{i:'▲',n:'Next.js',f:1},{i:'📱',n:'React Native'},{i:'📦',n:'Expo'},{i:'🔌',n:'Capacitor'},{i:'🔷',n:'Blazor'},{i:'🍎',n:'Swift / iOS'},{i:'🤖',n:'Kotlin / Android'}]},
  {l:'Backend & Database',p:[{i:'🔷',n:'.NET Core / C#',f:1},{i:'🟢',n:'Node.js',f:1},{i:'🗄️',n:'Supabase'},{i:'🐘',n:'PostgreSQL'},{i:'🚂',n:'Railway'},{i:'▲',n:'Vercel'},{i:'🔷',n:'Azure Functions'},{i:'🔗',n:'Azure Logic Apps'}]},
  {l:'DevOps & Vibe Coding',p:[{i:'🐳',n:'Docker'},{i:'☸️',n:'Kubernetes'},{i:'🔄',n:'Azure DevOps'},{i:'🐙',n:'GitHub Actions'},{i:'⚡',n:'Cursor',f:1},{i:'💜',n:'Lovable',f:1},{i:'🔁',n:'Replit'},{i:'4️⃣',n:'Base44'},{i:'🎨',n:'Figma + Claude'}]},
]

const TESTI = [
  {ind:'Healthcare',ic:'#1565A8',q:'CSharpTek built our AI medical scribe in record time. The FHIR integration with Epic was flawless — our physicians save hours every day.',nm:'Dr. Rachel Simmons',rl:'CMO, NovaCare Health',av:'DR',abg:'linear-gradient(135deg,#1565A8,#2E9ED6)'},
  {ind:'Automation',ic:'#FF6B2B',q:'Their AI voice agent replaced our entire inbound call centre. From 12-hour response times to instant 24/7 AI conversations. ROI was immediate.',nm:'Marcus Klein',rl:'CEO, Elevate Marketing Group',av:'MK',abg:'linear-gradient(135deg,#FF6B2B,#ffaa80)'},
  {ind:'Education',ic:'#2a8a2a',q:'The internship portal onboarded 10,000+ students. The AI evaluation system is a game-changer. Delivered on time, on budget — no drama.',nm:'Prof. Priya Joshi',rl:'Dean of Technology, Apex University',av:'PJ',abg:'linear-gradient(135deg,#2a8a2a,#5aba5a)'},
]

const POSTS = [
  {e:'🤖',c:'AI & Automation',r:'8 min read',d:'Mar 2025',t:'How We Built a Medical Scribe AI on Azure OpenAI — From Scratch',x:'A behind-the-scenes look at architecting a real-time clinical transcription system with FHIR integration and HIPAA compliance.',bg:'linear-gradient(135deg,#0D2B45,#1565A8)',big:true},
  {e:'⚡',c:'Vibe Coding',r:'5 min read',d:'Feb 2025',t:"What is Vibe Coding and Why It's Changing MVP Development",x:'AI-assisted development with Cursor, Lovable and Base44 is letting us ship MVPs in 4 weeks that used to take 4 months.',bg:'linear-gradient(135deg,#1a0a1a,#6b1fa0)',big:true},
  {e:'🏥',c:'Healthcare',r:'6 min',d:'Jan 2025',t:'HIPAA-Compliant AI: What Healthcare Startups Need to Know',bg:'linear-gradient(135deg,#0a1a0a,#1a5a1a)'},
  {e:'🎙️',c:'AI Voice',r:'4 min',d:'Jan 2025',t:'AI Voice Agents: Replacing Phone Trees Forever',bg:'linear-gradient(135deg,#1a0a0a,#8B2a0a)'},
  {e:'☁️',c:'Cloud',r:'7 min',d:'Dec 2024',t:'From Azure Migration to AI-First: Our Company Evolution',bg:'linear-gradient(135deg,#0a0a1a,#1a2a8a)'},
]

const QSTEPS = [
  {q:'1. What industry are you in?',opts:[{l:'🏥 Healthcare / Medical',v:30},{l:'🎓 Education / EdTech',v:28},{l:'💼 Marketing / Automation',v:25},{l:'🛒 Marketplace / E-commerce',v:20},{l:'🔧 Other',v:18}]},
  {q:'2. Where are you with AI today?',opts:[{l:'🤷 Never tried it',v:5},{l:'🔍 Exploring / researching',v:10},{l:'⚙️ Using basic tools',v:18},{l:'🚀 Already integrated AI',v:25}]},
  {q:'3. Biggest operational pain point?',opts:[{l:'⏱️ Too many manual processes',v:20},{l:'💰 High operational costs',v:18},{l:'📉 Slow growth / leads',v:15},{l:'📊 Poor data insights',v:12}]},
  {q:'4. Company size?',opts:[{l:'👤 1–10 (Startup)',v:8},{l:'👥 11–50 (Growing)',v:15},{l:'🏢 51–200 (Mid-market)',v:20},{l:'🏗️ 200+ (Enterprise)',v:25}]},
  {q:'5. Timeline to act?',opts:[{l:'🔥 ASAP',v:25},{l:'📅 3–6 months',v:18},{l:'🗓️ 6–12 months',v:10},{l:'🤔 Just exploring',v:5}]},
]

const BOT_REPLIES = {
  'services':'We offer AI Integration, AI Voice Agents, Web & Mobile Dev, Cloud & DevOps, MVP & Vibe Coding, Marketplace Publishing and 24/7 Support. Which interests you?',
  'project':'Awesome! What industry and what are you looking to build? 🚀',
  'industries':'We serve Healthcare (HIPAA/EHR), Wellness & Fertility, Education & EdTech, Marketing & Automation, Service Marketplaces, Pet Care and CRM & Productivity.',
  'mvp':'With Vibe Coding using Cursor, Lovable and Base44, we ship MVPs in 4–8 weeks. Our Spark package is built for this. 🚀',
  'default':'Great question! Would you like to explore our services or connect with our team for a free consultation? 😊',
}
function getBotReply(t){
  const l=t.toLowerCase()
  if(l.includes('service'))return BOT_REPLIES.services
  if(l.includes('project')||l.includes('start')||l.includes('build'))return BOT_REPLIES.project
  if(l.includes('industry')||l.includes('industr'))return BOT_REPLIES.industries
  if(l.includes('mvp')||l.includes('fast')||l.includes('speed'))return BOT_REPLIES.mvp
  return BOT_REPLIES.default
}

/* ─── HOOKS ─────────────────────────────────────── */
function useTypewriter(words,speed=85,pause=1900){
  const [display,setDisplay]=useState('')
  const [wi,setWi]=useState(0)
  const [ci,setCi]=useState(0)
  const [del,setDel]=useState(false)
  useEffect(()=>{
    const cur=words[wi];let t
    if(!del&&ci<cur.length)t=setTimeout(()=>setCi(c=>c+1),speed)
    else if(!del&&ci===cur.length)t=setTimeout(()=>setDel(true),pause)
    else if(del&&ci>0)t=setTimeout(()=>setCi(c=>c-1),speed/2)
    else{setDel(false);setWi(w=>(w+1)%words.length)}
    setDisplay(cur.slice(0,ci));return()=>clearTimeout(t)
  },[ci,del,wi,words,speed,pause])
  return display
}

function useCountUp(target,duration=1600,start=false){
  const [count,setCount]=useState(0)
  useEffect(()=>{
    if(!start)return;let st=null
    const step=ts=>{if(!st)st=ts;const p=Math.min((ts-st)/duration,1);setCount(Math.floor((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step)
  },[target,duration,start])
  return count
}

/* ─── COMPONENTS ─────────────────────────────────── */
function Nav(){
  const [sc,setSc]=useState(false)
  const [open,setOpen]=useState(false)
  useEffect(()=>{
    const h=()=>setSc(window.scrollY>10)
    window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h)
  },[])
  return(
    <nav className={`nav${sc?' sc':''}`}>
      <div className="nav-inner">
        <a href="/" className="nav-logo"><span>C#</span><span>harpTek</span></a>
        <div className="nav-links">
          {['Services','Industries','Technologies','Portfolio','Blog','Careers','About'].map((l,i)=>(
            <a key={l} href={['#services','#industries','#tech','#portfolio','#blog','#careers','#about'][i]}>{l}</a>
          ))}
        </div>
        <a href="#contact" className="nav-cta">Free Consultation</a>
        <button className="hbg" onClick={()=>setOpen(!open)} aria-label="Menu">
          <span style={{transform:open?'translateY(7px) rotate(45deg)':''}}/>
          <span style={{opacity:open?0:1}}/>
          <span style={{transform:open?'translateY(-7px) rotate(-45deg)':''}}/>
        </button>
      </div>
      {open&&(
        <div className="mob-menu" style={{display:'flex'}}>
          {['Services','Industries','Technologies','Portfolio','Blog','Careers','About'].map((l,i)=>(
            <a key={l} href={['#services','#industries','#tech','#portfolio','#blog','#careers','#about'][i]} onClick={()=>setOpen(false)}>{l}</a>
          ))}
          <a href="#contact" className="mob-cta-link" onClick={()=>setOpen(false)}>Free Consultation</a>
        </div>
      )}
    </nav>
  )
}

function Hero(){
  const cvRef=useRef(null)
  const stRef=useRef(null)
  const [go,setGo]=useState(false)
  const word=useTypewriter(WORDS)
  const s1=useCountUp(10,1600,go),s2=useCountUp(50,1600,go),s3=useCountUp(7,1600,go),s4=useCountUp(3,1600,go)

  useEffect(()=>{
    const cv=cvRef.current;if(!cv)return
    const ctx=cv.getContext('2d');let id
    const sz=()=>{cv.width=cv.offsetWidth;cv.height=cv.offsetHeight}
    sz()
    const pts=Array.from({length:60},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.5+.4,dx:(Math.random()-.5)*.38,dy:(Math.random()-.5)*.38,a:Math.random()*.4+.1}))
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height)
      pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(46,158,214,${p.a})`;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>cv.width)p.dx*=-1;if(p.y<0||p.y>cv.height)p.dy*=-1})
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<115){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(46,158,214,${.07*(1-d/115)})`;ctx.lineWidth=.5;ctx.stroke()}}
      id=requestAnimationFrame(draw)
    }
    draw();window.addEventListener('resize',sz)
    return()=>{cancelAnimationFrame(id);window.removeEventListener('resize',sz)}
  },[])

  useEffect(()=>{
    const el=stRef.current;if(!el)return
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:.3})
    o.observe(el);return()=>o.disconnect()
  },[])

  return(
    <section className="hero" id="home">
      <canvas ref={cvRef}/>
      <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
      <div className="hero-cnt">
        <div className="hero-eye">
          <span style={{width:6,height:6,borderRadius:'50%',background:'#FF6B2B',display:'inline-block',flexShrink:0}}/>
          AI-First Software Development
        </div>
        <h1 className="hero-h1">
          We Build AI-Powered Software<br/>
          <span className="hero-grad">Your Industry Needs</span>
        </h1>
        <div className="hero-tw">
          <span className="tw-muted">Transforming</span>
          <span className="tw-word">{word||'\u00a0'}</span>
          <span className="tw-cur">|</span>
          <span className="tw-muted">with AI</span>
        </div>
        <p className="hero-sub">From Azure cloud infrastructure to cutting-edge AI integrations — we design, build and deploy intelligent software that drives real business outcomes across healthcare, education, wellness and beyond.</p>
        <div className="hero-ctas">
          <a href="#portfolio" className="btn-p">Explore Our Work →</a>
          <a href="#contact" className="btn-s">Start a Project</a>
        </div>
        <div className="hero-badges">
          {['Microsoft Azure','AWS','Google Cloud','OpenAI Partner','Anthropic Claude'].map(b=><span key={b} className="hero-badge">{b}</span>)}
        </div>
      </div>
      <div ref={stRef} className="stats-bar">
        {[[s1,'+','Years Experience'],[s2,'+','Projects Delivered'],[s3,'','Industries Served'],[s4,'','Cloud Marketplaces']].map(([n,s,l])=>(
          <div key={l} className="stat-it"><span className="stat-n">{n}{s}</span><span className="stat-l">{l}</span></div>
        ))}
      </div>
      <div className="scroll-ind"><div className="scroll-dot"/></div>
    </section>
  )
}

function TrustBar(){
  const all=[...LOGOS,...LOGOS]
  const badges=[{i:'🔷',n:'Microsoft Azure',l:'Cloud Partner'},{i:'🟠',n:'AWS Partner',l:'Network Member'},{i:'🔵',n:'Google Cloud',l:'Partner'},{i:'🤖',n:'OpenAI',l:'API Partner'},{i:'🏥',n:'HIPAA Compliant',l:'Healthcare Ready'}]
  return(
    <section className="trust">
      <div className="trust-inner">
        <div className="rv" style={{display:'flex',alignItems:'center',gap:16,marginBottom:18}}>
          <p style={{fontSize:11,color:'rgba(255,255,255,.32)',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',whiteSpace:'nowrap'}}>Trusted Technology Ecosystem</p>
          <div className="trust-line"/>
        </div>
        <div className="tlogos rv">
          <div className="ttrack">
            {all.map((l,i)=>{const[ico,...rest]=l.split(' ');return(
              <div key={i} className="lpill"><span>{ico}</span><span>{rest.join(' ')}</span></div>
            )})}
          </div>
        </div>
        <div className="pbadges rv">
          {badges.map(b=>(
            <div key={b.n} className="pb">
              <span className="pb-ic">{b.i}</span>
              <div><div className="pb-nm">{b.n}</div><div className="pb-lv">{b.l}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services(){
  return(
    <section className="services" id="services">
      <div className="srv-inner">
        <div className="rv srv-hd">
          <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="lbl-dot"/>What We Do</div>
          <h2 className="sec-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#0A1628',marginBottom:14}}>End-to-End Software &amp; AI Services</h2>
          <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:500,margin:'0 auto'}}>From MVP to enterprise — we build, integrate and scale intelligent software across every layer of your business.</p>
        </div>
        <div className="srv-grid">
          {SERVICES.map((s,i)=>(
            <div key={s.t} className={`scard rv d${(i%6)+1}`}>
              <div className="sc-ico">{s.i}</div>
              <h3 className="sc-ttl">{s.t}</h3>
              <p className="sc-dsc">{s.d}</p>
              <div className="sc-tags">{s.tags.map(t=><span key={t} className="sc-tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48}} className="rv"><a href="#" className="btn-ol">View All 9 Services →</a></div>
      </div>
    </section>
  )
}

function Industries(){
  return(
    <section className="inds" id="industries">
      <div className="ind-inner">
        <div className="rv ind-hd">
          <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Industries We Serve</div>
          <h2 className="sec-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:14}}>Built for Your Specific Industry</h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.5)',maxWidth:500,margin:'0 auto'}}>Every solution is designed around the compliance, workflows and unique challenges of your sector.</p>
        </div>
        <div className="ind-g1">
          {INDUSTRIES.slice(0,4).map((ind,i)=>(
            <div key={ind.n} className={`icard rv d${i+1}`}>
              <div className="ibg" style={{background:ind.bg}}/>
              <div className="igrd"/>
              <div className="icnt"><div className="i-ico">{ind.i}</div><div className="i-nm">{ind.n}</div><div className="i-ds">{ind.d}</div></div>
            </div>
          ))}
        </div>
        <div className="ind-g2">
          {INDUSTRIES.slice(4).map((ind,i)=>(
            <div key={ind.n} className={`icard rv d${i+3}`}>
              <div className="ibg" style={{background:ind.bg}}/>
              <div className="igrd"/>
              <div className="icnt"><div className="i-ico">{ind.i}</div><div className="i-nm">{ind.n}</div><div className="i-ds">{ind.d}</div></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:44}} className="rv"><a href="#" className="btn-gh">Explore All Industries →</a></div>
      </div>
    </section>
  )
}

function Why(){
  const ref=useRef(null);const bref=useRef(null)
  const [go,setGo]=useState(false);const [bars,setBars]=useState(false)
  const n1=useCountUp(10,1600,go),n2=useCountUp(50,1600,go),n3=useCountUp(7,1600,go),n4=useCountUp(3,1600,go)
  useEffect(()=>{
    const o1=new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:.3})
    const o2=new IntersectionObserver(([e])=>{if(e.isIntersecting)setBars(true)},{threshold:.3})
    if(ref.current)o1.observe(ref.current);if(bref.current)o2.observe(bref.current)
    return()=>{o1.disconnect();o2.disconnect()}
  },[])
  return(
    <section className="why" id="about">
      <div className="why-inner">
        <div className="why-lay">
          <div>
            <div className="rv">
              <div className="lbl" style={{color:'#7EC8E3'}}><span className="lbl-dot"/>Why CSharpTek</div>
              <h2 className="sec-title" style={{fontSize:'clamp(28px,3.5vw,48px)',color:'#fff',marginBottom:16}}>AI-First Since Before It Was Trendy</h2>
              <p style={{fontSize:16,color:'rgba(255,255,255,.5)',marginBottom:28}}>A decade of delivery, five industries, three cloud marketplaces — and counting.</p>
            </div>
            <div ref={ref} className="wstats rv d1">
              {[[n1,'+','Years Experience'],[n2,'+','Projects Delivered'],[n3,'','Industries Served'],[n4,'','Cloud Marketplaces']].map(([n,s,l])=>(
                <div key={l} className="wst"><div className="ws-n">{n}{s}</div><div className="ws-l">{l}</div></div>
              ))}
            </div>
            <div className="diffs rv d2">
              {[{i:'🧠',t:'AI-First Mindset',d:'Every solution is designed with AI at the core — not bolted on as an afterthought.'},{i:'☁️',t:'Multi-Cloud Expertise',d:'Certified across Azure, AWS and Google Cloud with Marketplace publishing on all three.'},{i:'🏥',t:'Compliance-Ready',d:'HIPAA-compliant architectures, FHIR/EHR integrations and secure data handling built-in.'},{i:'🔄',t:'End-to-End Delivery',d:'From discovery through to deployment, support and ongoing optimisation.'}].map(d=>(
                <div key={d.t} className="dif"><div className="dif-i">{d.i}</div><div><h4>{d.t}</h4><p>{d.d}</p></div></div>
              ))}
            </div>
          </div>
          <div className="rv d3">
            <div className="wcard">
              <div className="wcard-lbl">Delivery Track Record</div>
              <div className="wcard-t">Consistent. Reliable. Fast.</div>
              <div className="wcard-s">Measured across 50+ projects and 10+ years</div>
              <div ref={bref}>
                {[['On-time delivery',96],['Client retention',92],['AI integrations',100]].map(([l,p])=>(
                  <div key={l} className="wmet">
                    <span className="wmet-l">{l}</span>
                    <div className="wmet-bw"><div className="wmet-bf" style={{width:bars?`${p}%`:'0%'}}/></div>
                    <span className="wmet-p">{p}%</span>
                  </div>
                ))}
              </div>
            </div>
            {[{i:'⚡',t:'24/7 Support Available',s:'SLA-backed support across all time zones',b:'Always On'},{i:'🚀',t:'MVP in 4–8 Weeks',s:'From idea to live product at startup speed',b:'Vibe Coding'}].map(c=>(
              <div key={c.t} className="wsm"><span className="wsm-ic">{c.i}</span><div><h4>{c.t}</h4><p>{c.s}</p></div><span className="wsm-b">{c.b}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Portfolio(){
  const [f,setF]=useState('all')
  const shown=PROJECTS.filter(p=>f==='all'||p.cat===f)
  return(
    <section className="port" id="portfolio">
      <div className="port-inner">
        <div className="rv port-hd">
          <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="lbl-dot"/>Featured Work</div>
          <h2 className="sec-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#0A1628',marginBottom:14}}>Projects That Speak for Themselves</h2>
          <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:480,margin:'0 auto'}}>Real solutions built for real industries.</p>
        </div>
        <div className="pfilts rv">
          {[['all','All Projects'],['healthcare','Healthcare'],['education','Education'],['automation','Automation'],['wellness','Wellness'],['other','Other']].map(([v,l])=>(
            <button key={v} className={`pfb${f===v?' act':''}`} onClick={()=>setF(v)}>{l}</button>
          ))}
        </div>
        <div className="port-grid">
          {shown.map((p,i)=>(
            <div key={p.t} className={`pcard rv d${(i%6)+1}`}>
              <div className="pcv" style={{background:p.bg}}>
                <span className="pce">{p.e}</span>
                <span className="pct" style={{background:p.tb,color:p.tc}}>{p.tl}</span>
              </div>
              <div className="pcb">
                <div className="pc-t">{p.t}</div>
                <div className="pc-d">{p.d}</div>
                <div className="pc-stk">{p.stk.map(t=><span key={t} className="pc-tk">{t}</span>)}</div>
              </div>
              <div className="pcf"><span className="pco">{p.out}</span><a href="#" className="pcl">Case Study →</a></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:44}} className="rv"><a href="#" className="btn-or">View All 10+ Case Studies →</a></div>
      </div>
    </section>
  )
}

function Tech(){
  return(
    <section className="tech" id="tech">
      <div className="tech-inner">
        <div className="rv tech-hd">
          <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>Technology Ecosystem</div>
          <h2 className="sec-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:14}}>We Build With the Best Stack</h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.45)',maxWidth:480,margin:'0 auto'}}>Battle-tested across production projects in every industry we serve.</p>
        </div>
        <div className="tgrps">
          {TECH.map((g,gi)=>(
            <div key={g.l} className={`rv d${(gi%6)+1}`}>
              <div className="tglbl">{g.l}</div>
              <div className="tgpills">
                {g.p.map(p=><div key={p.n} className={`tgp${p.f?' ft':''}`}><span>{p.i}</span><span>{p.n}</span></div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials(){
  return(
    <section className="testi">
      <div className="testi-inner">
        <div className="rv testi-hd">
          <div className="lbl" style={{color:'#1565A8',justifyContent:'center'}}><span className="lbl-dot"/>Client Stories</div>
          <h2 className="sec-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#0A1628',marginBottom:14}}>What Our Clients Say</h2>
          <p style={{fontSize:16,color:'rgba(10,22,40,.5)',maxWidth:460,margin:'0 auto'}}>Trusted across 7 industries and counting.</p>
        </div>
        <div className="tgrid">
          {TESTI.map((t,i)=>(
            <div key={t.nm} className={`tcard rv d${i+1}`}>
              <span className="tc-ind" style={{background:`${t.ic}18`,color:t.ic}}>{t.ind}</span>
              <div className="tc-q">&ldquo;</div>
              <div className="tc-stars">{[1,2,3,4,5].map(s=><span key={s}>★</span>)}</div>
              <p className="tc-txt">{t.q}</p>
              <div className="tc-auth">
                <div className="tc-av" style={{background:t.abg}}>{t.av}</div>
                <div><div className="tc-nm">{t.nm}</div><div className="tc-rl">{t.rl}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Blog(){
  const feat=POSTS.filter(p=>p.big),rest=POSTS.filter(p=>!p.big)
  return(
    <section className="blog" id="blog">
      <div className="blog-inner">
        <div className="rv blog-hd">
          <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>The AI Edge</div>
          <h2 className="sec-title" style={{fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:14}}>Insights From Our Team</h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.45)',maxWidth:460,margin:'0 auto'}}>Practical AI, cloud and development insights for builders and decision-makers.</p>
        </div>
        <div className="blog-feat rv d1">
          {feat.map(p=>(
            <div key={p.t} className="bcard">
              <div className="bv bv-lg" style={{background:p.bg}}><span style={{fontSize:50}}>{p.e}</span><span className="bcat">{p.c}</span></div>
              <div className="bb"><div className="bm">{p.r} · {p.d}</div><div className="bt bt-lg">{p.t}</div><p className="bex">{p.x}</p><a href="#" className="bln">Read Article →</a></div>
            </div>
          ))}
        </div>
        <div className="blog-row rv d2">
          {rest.map(p=>(
            <div key={p.t} className="bcard">
              <div className="bv bv-sm" style={{background:p.bg}}><span style={{fontSize:38}}>{p.e}</span><span className="bcat">{p.c}</span></div>
              <div className="bb"><div className="bm">{p.r} · {p.d}</div><div className="bt bt-sm">{p.t}</div><a href="#" className="bln">Read →</a></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:42}} className="rv"><a href="#" className="btn-ghw">Visit The AI Edge Blog →</a></div>
      </div>
    </section>
  )
}

function Quiz(){
  const [step,setStep]=useState(0)
  const [scores,setScores]=useState([])
  const [sel,setSel]=useState(null)
  const [result,setResult]=useState(null)
  const next=()=>{
    if(sel===null)return
    const ns=[...scores,sel]
    if(step<QSTEPS.length-1){setScores(ns);setSel(null);setStep(s=>s+1)}
    else{
      const pct=Math.round(ns.reduce((a,b)=>a+b,0)/125*100)
      let tier,icon,color
      if(pct<40){tier='AI Curious';icon='🟡';color='#f59e0b'}
      else if(pct<70){tier='AI Ready';icon='🟠';color='#FF6B2B'}
      else{tier='AI Accelerator';icon='🟢';color='#22c55e'}
      setResult({pct,tier,icon,color,msg:pct<40?'You\'re at the starting line. Here\'s your AI roadmap — let\'s explore the quick wins available in your industry.':pct<70?'You\'re primed for quick wins. A few AI integrations could transform your operations in weeks.':'You\'re ready to go big. Let\'s build a comprehensive AI strategy for your business.'})
    }
  }
  const back=()=>{if(step>0){setStep(s=>s-1);setScores(scores.slice(0,-1));setSel(null)}}
  const restart=()=>{setStep(0);setScores([]);setSel(null);setResult(null)}
  return(
    <section className="quiz" id="assessment">
      <div className="quiz-inner">
        <div className="rv">
          <div className="qbadge">🧠 Free Assessment</div>
          <h2 className="sec-title" style={{fontSize:'clamp(26px,4vw,46px)',color:'#0A1628',marginBottom:13}}>Is Your Business Ready for AI?</h2>
          <p style={{fontSize:16,color:'rgba(10,22,40,.5)',lineHeight:1.65,maxWidth:540,margin:'0 auto 36px'}}>Answer 5 quick questions and get an instant AI Readiness Score.</p>
        </div>
        <div className="q-card rv d1">
          <div className="qprog"><div className="qpbar" style={{width:result?'100%':`${(step+1)/QSTEPS.length*100}%`}}/></div>
          {!result?(
            <>
              <div className="qq">{QSTEPS[step].q}</div>
              <div className="qopts">
                {QSTEPS[step].opts.map(o=>(
                  <button key={o.l} className={`qopt${sel===o.v?' sel':''}`} onClick={()=>setSel(o.v)}>{o.l}</button>
                ))}
              </div>
              <div className="qnav">
                {step>0?<button className="qbk" onClick={back}>← Back</button>:<span/>}
                <span className="qslbl">Step {step+1} of {QSTEPS.length}</span>
                <button className="qnxt" onClick={next} disabled={sel===null}>{step===QSTEPS.length-1?'Get My Score →':'Next →'}</button>
              </div>
            </>
          ):(
            <div className="qres">
              <div className="qri">{result.icon}</div>
              <div className="qrt" style={{color:result.color}}>{result.tier} — {result.pct}% Score</div>
              <div className="qrsb"><div className="qrsf" style={{background:`linear-gradient(90deg,${result.color},${result.color}88)`,width:`${result.pct}%`}}/></div>
              <p className="qrm">{result.msg}</p>
              <button className="qrcta">Book a Free Strategy Call →</button>
              <button className="qrst" onClick={restart}>Retake the assessment</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CTABanner(){
  return(
    <section className="ctab" id="contact">
      <div style={{position:'absolute',top:-80,left:'50%',transform:'translateX(-50%)',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div className="ctab-c rv">
        <div className="ctab-ey">⚡ Let&apos;s Build Something Smarter</div>
        <h2 className="ctab-t">Ready to Transform Your Business<br/>with <span className="ctab-ts">AI?</span></h2>
        <p className="ctab-s">From a quick MVP to a full enterprise AI rollout — we&apos;ll scope it, build it and support it. Your first consultation is completely free.</p>
        <div className="ctab-acts">
          <a href="mailto:hello@csharptek.com" className="btn-p">Book a Free Consultation →</a>
          <a href="#portfolio" style={{background:'rgba(255,255,255,.07)',color:'#fff',padding:'15px 34px',borderRadius:10,fontWeight:600,fontSize:15,border:'1.5px solid rgba(255,255,255,.18)',transition:'all .2s',display:'inline-block'}}>View Our Work</a>
        </div>
        <div className="ctab-tr">
          {['No obligation','Reply within 24 hours','HIPAA-ready','24/7 support'].map(t=>(
            <span key={t} className="ctab-ti"><span style={{color:'#7EC8E3'}}>✓</span>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer(){
  const [email,setEmail]=useState('')
  const [subbed,setSubbed]=useState(false)
  return(
    <footer className="footer">
      <div className="ft-inner">
        <div className="ft-top">
          <div>
            <div className="ft-logo"><span>C#</span><span>harpTek</span></div>
            <p className="ft-desc">AI-first software development across healthcare, education, wellness, automation and more. Building the future, one deployment at a time.</p>
            <div className="ft-soc">{['💼','🐙','🐦','▶️'].map(i=><a key={i} href="#" className="ft-si">{i}</a>)}</div>
            <div className="ft-news">
              <div className="ft-nt">📧 The AI Edge Newsletter</div>
              <div className="ft-ns">Bi-weekly AI insights. No spam.</div>
              {subbed?<div style={{fontSize:12,color:'#4ade80',fontWeight:600}}>✅ Subscribed! Welcome to The AI Edge.</div>:(
                <div className="ft-nf">
                  <input className="ft-ni" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"/>
                  <button className="ft-nb" onClick={()=>{if(email.includes('@')){setSubbed(true);setEmail('')}}}>Subscribe</button>
                </div>
              )}
            </div>
          </div>
          {[{t:'Services',l:['AI Integration','AI Voice Agents','Web & Mobile Dev','Cloud & DevOps','MVP & Vibe Coding','Prompt Engineering','24/7 Support']},{t:'Industries',l:['Healthcare','Wellness & Fertility','Education','Marketing','Marketplaces','Pet Care','CRM & Productivity']},{t:'Company',l:['About Us','Portfolio','Blog','Careers','Partners','Marketplace','Contact']}].map(col=>(
            <div key={col.t} className="ft-col"><h4>{col.t}</h4><ul>{col.l.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul></div>
          ))}
          <div className="ft-col">
            <h4>Contact</h4>
            <ul>{['📧 hello@csharptek.com','💬 WhatsApp Us','📅 Book a Call','🔒 HIPAA Policy','📄 Privacy Policy'].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
            <div className="ft-resp"><div className="ft-resp-t">🕐 Response Time</div><div className="ft-resp-s">We reply within 24 hours.</div></div>
          </div>
        </div>
        <div className="ft-bot">
          <span className="ft-cp">© 2025 CSharpTek. All rights reserved.</span>
          <div className="ft-lks">{['Privacy','HIPAA','Terms','Sitemap'].map(l=><a key={l} href="#">{l}</a>)}</div>
          <span className="ft-bdg">⚡ Built with AI · CSharpTek</span>
        </div>
      </div>
    </footer>
  )
}

function Chatbot(){
  const [open,setOpen]=useState(false)
  const [msgs,setMsgs]=useState([{bot:true,text:"👋 Hi! I'm Tek, CSharpTek's AI assistant. I can answer questions or help kick off a project. What brings you here today?"}])
  const [input,setInput]=useState('')
  const add=(text,bot)=>setMsgs(m=>[...m,{bot,text}])
  const send=(text)=>{if(!text.trim())return;add(text,false);setInput('');setTimeout(()=>add(getBotReply(text),true),800)}
  return(
    <div className="chatbub">
      {open&&(
        <div className="chwin">
          <div className="chh">
            <div className="chav">⚡</div>
            <div className="ch-inf"><h4>Tek — CSharpTek AI</h4><p>Ask me anything</p></div>
            <div className="ch-on"/>
          </div>
          <div className="chmsgs">
            {msgs.map((m,i)=><div key={i} className={`cmsg ${m.bot?'bot':'usr'}`}><div className="cmbub">{m.text}</div></div>)}
          </div>
          <div className="chqk">
            {[['Our Services','Tell me about your services'],['Start Project','I want to start a project'],['Industries','What industries do you work with?'],['MVP Speed','How fast can you build an MVP?']].map(([l,m])=>(
              <button key={l} className="chqb" onClick={()=>send(m)}>{l}</button>
            ))}
          </div>
          <div className="chinr">
            <input className="chin" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(input)} placeholder="Type a message..."/>
            <button className="chsnd" onClick={()=>send(input)}>➤</button>
          </div>
        </div>
      )}
      <button className="chtog" onClick={()=>setOpen(!open)}>
        {open?'✕':'💬'}
        {!open&&<span className="ch-dot"/>}
      </button>
    </div>
  )
}

/* ─── PAGE ───────────────────────────────────────── */
export default function Home(){
  useEffect(()=>{
    const els=document.querySelectorAll('.rv')
    const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')})},{threshold:0.06})
    els.forEach(el=>obs.observe(el))
    return()=>obs.disconnect()
  },[])

  return(
    <>
      <Head>
        <title>CSharpTek — AI-First Software Development</title>
        <meta name="description" content="CSharpTek — AI-First Software Development for Healthcare, Education, Wellness and more."/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet"/>
      </Head>
      <style dangerouslySetInnerHTML={{__html:GLOBAL_STYLES}}/>
      <Nav/>
      <Hero/>
      <TrustBar/>
      <Services/>
      <Industries/>
      <Why/>
      <Portfolio/>
      <Tech/>
      <Testimonials/>
      <Blog/>
      <Quiz/>
      <CTABanner/>
      <Footer/>
      <Chatbot/>
    </>
  )
}
