import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavComponent from '../components/Nav'
import dynamic from 'next/dynamic'
const ScrollToTop = dynamic(() => import('../components/ScrollToTop'), { ssr: false })

const GLOBAL_STYLES = `
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Mulish',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0A1628;overflow-x:hidden;background:#0A1628;}
  a{text-decoration:none;}
  ul{list-style:none;}
  button{cursor:pointer;font-family:'Mulish',sans-serif;}
  .rv{opacity:1;transform:translateY(18px);transition:transform .55s ease;}
  .rv.on{transform:translateY(0);}
  .d1{transition-delay:.07s;}.d2{transition-delay:.14s;}.d3{transition-delay:.21s;}
  .d4{transition-delay:.28s;}.d5{transition-delay:.35s;}.d6{transition-delay:.42s;}
  .lbl{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;}
  .lbl-dot{width:6px;height:6px;border-radius:50%;background:#FF6B2B;flex-shrink:0;display:inline-block;}
  .sec-title{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes bounce{0%,100%{transform:translateY(0);opacity:.45}50%{transform:translateY(9px);opacity:1}}
  @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes chatPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
  @keyframes waveBar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
  @keyframes pulseGlow{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
  @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}

  /* ── HERO NEW ── */
  .hero-new{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:linear-gradient(155deg,#0A1628 0%,#0D2B45 55%,#091422 100%);padding:100px 0 60px;}
  .hero-new canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
  .hero-new .h-orb1{position:absolute;top:4%;left:-8%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(21,101,168,.18) 0%,transparent 70%);pointer-events:none;animation:orbFloat 9s ease-in-out infinite;}
  .hero-new .h-orb2{position:absolute;bottom:0;right:-12%;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%);pointer-events:none;animation:orbFloat 11s ease-in-out infinite reverse;}
  .h-grid{max-width:1200px;margin:0 auto;padding:0 28px;width:100%;position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .h-left{display:flex;flex-direction:column;}
  .h-eye{display:inline-flex;align-items:center;gap:8px;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.25);border-radius:100px;padding:7px 16px;margin-bottom:24px;width:fit-content;}
  .h-eye span{font-size:12px;font-weight:700;color:#FF6B2B;letter-spacing:.1em;text-transform:uppercase;}
  .h-h1{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-weight:800;font-size:clamp(36px,4.5vw,62px);color:#fff;line-height:1.08;letter-spacing:-.03em;margin-bottom:20px;}
  .h-grad-blue{background:linear-gradient(135deg,#2E9ED6,#7EC8E3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .h-sub{font-size:clamp(14px,1.4vw,17px);color:rgba(255,255,255,.55);line-height:1.75;margin-bottom:36px;max-width:480px;}
  .h-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:32px;}
  .h-btn-p{background:linear-gradient(135deg,#FF6B2B,#e55a1f);color:#fff;padding:15px 32px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;display:inline-block;box-shadow:0 8px 28px rgba(255,107,43,.35);letter-spacing:.02em;}
  .h-btn-s{background:rgba(46,158,214,.08);color:#7EC8E3;padding:15px 32px;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;display:inline-block;border:1.5px solid rgba(46,158,214,.3);letter-spacing:.02em;}
  .h-pills{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:40px;}
  .h-pill{font-size:11px;font-weight:700;color:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.1);border-radius:100px;padding:5px 13px;letter-spacing:.06em;cursor:default;}
  .h-stats{display:flex;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.12);border-radius:16px;overflow:hidden;}
  .h-stat{flex:1;padding:20px 12px;border-right:1px solid rgba(46,158,214,.1);display:flex;flex-direction:column;align-items:center;}
  .h-stat:last-child{border-right:none;}
  .h-stat-n{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(24px,3vw,38px);font-weight:800;background:linear-gradient(135deg,#FF6B2B,#ffaa80);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;}
  .h-stat-l{font-size:10px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.1em;font-weight:700;margin-top:5px;text-align:center;}
  .h-right{position:relative;}
  .scribe-card{background:rgba(13,27,52,.92);border:1px solid rgba(46,158,214,.25);border-radius:20px;padding:22px 24px;backdrop-filter:blur(24px);box-shadow:0 32px 80px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.06);min-height:340px;position:relative;overflow:hidden;animation:heroFloat 5s ease-in-out infinite;}
  .sc-hdr{display:flex;align-items:center;gap:10px;margin-bottom:18px;border-bottom:1px solid rgba(46,158,214,.1);padding-bottom:14px;}
  .sc-dots{display:flex;gap:6px;}
  .sc-dot{width:10px;height:10px;border-radius:50%;}
  .sc-ttl{flex:1;text-align:center;font-size:13px;color:rgba(255,255,255,.85);font-weight:700;}
  .sc-live{display:flex;align-items:center;gap:5px;}
  .sc-live-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulseGlow 2s infinite;}
  .sc-live-txt{font-size:10px;color:#22c55e;font-weight:700;}
  .sc-wave{display:flex;align-items:center;gap:3px;margin-bottom:18px;height:32px;}
  .sc-wave-lbl{font-size:11px;color:rgba(255,255,255,.35);margin-right:6px;}
  .sc-bar{width:3px;border-radius:2px;}
  .sc-lines{display:flex;flex-direction:column;gap:12px;}
  .sc-line{border-radius:10px;padding:10px 13px;}
  .sc-role{font-size:10px;font-weight:700;letter-spacing:.08em;margin-bottom:4px;}
  .sc-text{font-size:12.5px;color:rgba(255,255,255,.78);line-height:1.5;}
  .sc-metrics{display:flex;gap:10px;margin-top:18px;}
  .sc-metric{flex:1;background:rgba(255,107,43,.07);border:1px solid rgba(255,107,43,.15);border-radius:8px;padding:8px 10px;text-align:center;}
  .sc-mv{font-size:15px;font-weight:800;color:#FF6B2B;font-family:'Plus Jakarta Sans',sans-serif;}
  .sc-ml{font-size:9px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.08em;margin-top:2px;}
  .sc-glow{position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(46,158,214,.12) 0%,transparent 70%);pointer-events:none;}
  .h-fbadge{position:absolute;background:rgba(10,22,40,.9);border-radius:100px;padding:6px 13px;font-size:11px;font-weight:700;white-space:nowrap;backdrop-filter:blur(12px);}
  .h-scroll{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;}
  .h-scroll-t{font-size:10px;color:rgba(255,255,255,.22);letter-spacing:.12em;text-transform:uppercase;}
  .h-scroll-d{width:4px;height:4px;border-radius:50%;background:#FF6B2B;animation:bounce 1.8s ease-in-out infinite;}
  @media(max-width:900px){.h-grid{grid-template-columns:1fr;}.h-right{display:none;}}
  @media(max-width:580px){.h-ctas{flex-direction:column;}.h-stats{flex-wrap:wrap;}.h-stat{min-width:50%;}}

  /* ── TRUST ── */
  .trust{background:#060f1d;padding:42px 0;border-bottom:1px solid rgba(46,158,214,.08);}
  .trust-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .trust-line{flex:1;height:1px;background:rgba(255,255,255,.05);}
  .tlogos{overflow:hidden;position:relative;}
  .tlogos::before,.tlogos::after{content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none;}
  .tlogos::before{left:0;background:linear-gradient(to right,#060f1d,transparent);}
  .tlogos::after{right:0;background:linear-gradient(to left,#060f1d,transparent);}
  .ttrack{display:flex;gap:12px;animation:marquee 28s linear infinite;width:max-content;}
  .lpill{display:flex;align-items:center;gap:7px;padding:9px 18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:9px;white-space:nowrap;font-size:13px;font-weight:600;color:rgba(255,255,255,.6);}
  .pbadges{display:flex;gap:14px;flex-wrap:wrap;margin-top:22px;}
  .pb{display:flex;align-items:center;gap:10px;padding:11px 18px;background:rgba(255,255,255,.03);border:1px solid rgba(46,158,214,.1);border-radius:11px;}
  .pb-ic{font-size:20px;}
  .pb-nm{font-size:12px;font-weight:700;color:#fff;}
  .pb-lv{font-size:10px;color:rgba(255,255,255,.35);font-weight:600;}

  /* ── SERVICES ── */
  .services{background:#fff;padding:96px 0;}
  .srv-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .srv-hd{text-align:center;margin-bottom:52px;}
  .srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
  .scard{background:#F8FBFF;border:1px solid rgba(21,101,168,.1);border-radius:16px;padding:28px 24px;transition:all .3s;display:block;cursor:pointer;}
  .scard:hover{transform:translateY(-6px);box-shadow:0 22px 52px rgba(21,101,168,.12);border-color:rgba(46,158,214,.3);}
  .sc-ico{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#1565A8,#2E9ED6);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:18px;}
  .sc-ttl{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:700;color:#0A1628;margin-bottom:9px;}
  .sc-dsc{font-size:13px;color:rgba(10,22,40,.52);line-height:1.67;}
  .sc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:15px;}
  .sc-tag{font-size:10px;font-weight:700;color:#1565A8;background:rgba(21,101,168,.07);border-radius:5px;padding:3px 9px;}

  /* ── INDUSTRIES ── */
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

  /* ── WHY ── */
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

  /* ── PORTFOLIO ── */
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
  .pce{font-size:52px;}
  .pct{position:absolute;top:13px;left:13px;font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:3px 10px;border-radius:100px;}
  .pcb{padding:22px 20px;flex:1;}
  .pc-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:700;color:#0A1628;margin-bottom:7px;}
  .pc-d{font-size:13px;color:rgba(10,22,40,.5);line-height:1.64;}
  .pc-stk{display:flex;flex-wrap:wrap;gap:5px;margin-top:13px;}
  .pc-tk{font-size:10px;font-weight:700;color:#1565A8;background:rgba(21,101,168,.07);border-radius:4px;padding:2px 8px;}
  .pcf{display:flex;align-items:center;justify-content:space-between;padding:13px 20px;border-top:1px solid rgba(21,101,168,.07);}
  .pco{font-size:11px;font-weight:700;color:#FF6B2B;}
  .pcl{font-size:11px;font-weight:700;color:#1565A8;}

  /* ── TECH ── */
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

  /* ── TESTIMONIALS ── */
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
  .tc-auth{display:flex;align-items:center;gap:12px;}
  .tc-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;}
  .tc-nm{font-size:13px;font-weight:700;color:#0A1628;}
  .tc-rl{font-size:11px;color:rgba(10,22,40,.45);}

  /* ── BLOG ── */
  .blog{background:#0A1628;padding:96px 0;}
  .blog-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .blog-hd{text-align:center;margin-bottom:52px;}
  .blog-feat{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-bottom:22px;}
  .blog-row{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
  .bcard{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.1);border-radius:16px;overflow:hidden;transition:all .3s;}
  .bcard:hover{border-color:rgba(46,158,214,.3);transform:translateY(-4px);}
  .bv{display:flex;align-items:center;justify-content:center;height:140px;position:relative;}
  .bv-lg{height:200px;}
  .bcat{position:absolute;top:13px;left:13px;font-size:10px;font-weight:700;color:#7EC8E3;background:rgba(46,158,214,.15);border-radius:100px;padding:3px 10px;}
  .bb{padding:20px 20px 24px;}
  .bm{font-size:10px;color:rgba(255,255,255,.3);font-weight:600;margin-bottom:8px;}
  .bt{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:#fff;line-height:1.4;margin-bottom:10px;}
  .bt-lg{font-size:19px;}
  .bex{font-size:13px;color:rgba(255,255,255,.45);line-height:1.65;margin-bottom:16px;}
  .bln{font-size:13px;font-weight:700;color:#FF6B2B;}

  /* ── QUIZ ── */
  .quiz{background:linear-gradient(135deg,#0A1628 0%,#0D2B45 100%);padding:96px 0;}
  .quiz-inner{max-width:640px;margin:0 auto;padding:0 28px;}
  .qhd{text-align:center;margin-bottom:44px;}
  .qcard{background:rgba(255,255,255,.04);border:1px solid rgba(46,158,214,.15);border-radius:20px;padding:36px 32px;}
  .qpb{height:4px;background:rgba(255,255,255,.06);border-radius:2px;margin-bottom:28px;overflow:hidden;}
  .qpbf{height:100%;background:linear-gradient(90deg,#2E9ED6,#FF6B2B);border-radius:2px;transition:width .4s ease;}
  .qq{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:700;color:#fff;margin-bottom:22px;}
  .qopts{display:flex;flex-direction:column;gap:10px;margin-bottom:28px;}
  .qopt{padding:14px 18px;border-radius:11px;border:1.5px solid rgba(46,158,214,.18);background:rgba(255,255,255,.03);font-size:14px;font-weight:600;color:rgba(255,255,255,.75);text-align:left;transition:all .2s;}
  .qopt:hover,.qopt.sel{border-color:#2E9ED6;background:rgba(46,158,214,.1);color:#fff;}
  .qnav{display:flex;align-items:center;justify-content:space-between;}
  .qbk{background:none;border:none;color:rgba(255,255,255,.4);font-size:14px;font-weight:600;cursor:pointer;}
  .qslbl{font-size:12px;color:rgba(255,255,255,.3);}
  .qnxt{background:#FF6B2B;color:#fff;border:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;}
  .qnxt:hover{background:#e55a1f;}
  .qnxt:disabled{opacity:.4;cursor:not-allowed;}
  .qres{text-align:center;}
  .qri{font-size:52px;margin-bottom:14px;}
  .qrt{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;margin-bottom:12px;}
  .qrsb{height:8px;background:rgba(255,255,255,.06);border-radius:4px;margin-bottom:18px;overflow:hidden;}
  .qrsf{height:100%;border-radius:4px;transition:width 1s ease;}
  .qrm{font-size:14px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:24px;}
  .qrcta{background:#FF6B2B;color:#fff;border:none;padding:14px 32px;border-radius:11px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:12px;display:block;width:100%;}
  .qrst{background:none;border:none;color:rgba(255,255,255,.35);font-size:13px;cursor:pointer;}

  /* ── CTA BANNER ── */
  .ctab{background:linear-gradient(135deg,#0A1628 0%,#1565A8 50%,#0D2B45 100%);padding:96px 28px;text-align:center;position:relative;overflow:hidden;}
  .ctab-c{max-width:640px;margin:0 auto;position:relative;z-index:1;}
  .ctab-ey{display:inline-block;background:rgba(255,107,43,.1);border:1px solid rgba(255,107,43,.25);border-radius:100px;padding:7px 20px;font-size:12px;font-weight:700;color:#FF6B2B;letter-spacing:.08em;margin-bottom:22px;}
  .ctab-t{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,5vw,56px);font-weight:800;color:#fff;line-height:1.1;margin-bottom:16px;}
  .ctab-ts{background:linear-gradient(135deg,#FF6B2B,#ffaa80);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .ctab-s{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px;}
  .ctab-acts{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:24px;}
  .ctab-chk{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;}
  .ctab-chk span{font-size:12px;color:rgba(255,255,255,.45);font-weight:600;}

  /* ── FOOTER ── */
  footer{background:#060f1d;padding:48px 0 0;}
  .ft-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
  .ft-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,.05);}
  .ft-logo{display:flex;align-items:center;gap:3px;margin-bottom:14px;}
  .ft-lcs{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:19px;background:linear-gradient(135deg,#2E9ED6,#7EC8E3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .ft-lre{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:19px;color:#fff;}
  .ft-desc{font-size:13px;color:rgba(255,255,255,.36);line-height:1.68;margin-bottom:20px;max-width:270px;}
  .ft-soc{display:flex;gap:9px;}
  .ft-si{width:34px;height:34px;border-radius:7px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:15px;}
  .ft-news{margin-top:22px;}
  .ft-nt{font-size:12px;font-weight:700;color:#7EC8E3;margin-bottom:4px;}
  .ft-ns{font-size:11px;color:rgba(255,255,255,.3);margin-bottom:10px;}
  .ft-nf{display:flex;gap:8px;}
  .ft-ni{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(46,158,214,.2);border-radius:8px;padding:9px 12px;font-size:13px;color:#fff;outline:none;}
  .ft-nb{background:#FF6B2B;color:#fff;border:none;border-radius:8px;padding:9px 16px;font-size:13px;font-weight:700;cursor:pointer;}
  .ft-col h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;color:#fff;margin-bottom:14px;}
  .ft-col ul{display:flex;flex-direction:column;gap:9px;}
  .ft-col a{font-size:12px;color:rgba(255,255,255,.38);font-weight:500;transition:color .2s;}
  .ft-col a:hover{color:#7EC8E3;}
  .ft-resp{margin-top:18px;background:rgba(46,158,214,.06);border:1px solid rgba(46,158,214,.12);border-radius:9px;padding:12px 14px;}
  .ft-resp-t{font-size:12px;font-weight:700;color:#7EC8E3;margin-bottom:3px;}
  .ft-resp-s{font-size:11px;color:rgba(255,255,255,.35);}
  .ft-bot{display:flex;align-items:center;justify-content:space-between;padding:20px 0;flex-wrap:wrap;gap:12px;}
  .ft-cp{font-size:12px;color:rgba(255,255,255,.25);}
  .ft-lks{display:flex;gap:18px;}
  .ft-lks a{font-size:12px;color:rgba(255,255,255,.25);transition:color .2s;}
  .ft-lks a:hover{color:#7EC8E3;}
  .ft-bdg{font-size:11px;color:rgba(255,255,255,.2);}

  /* ── CHATBOT ── */
  .chatbub{position:fixed;bottom:24px;right:24px;z-index:999;}
  .chtog{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#1565A8,#2E9ED6);border:none;color:#fff;font-size:22px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(21,101,168,.45);animation:chatPulse 3s ease-in-out infinite;position:relative;}
  .ch-dot{position:absolute;top:2px;right:2px;width:12px;height:12px;border-radius:50%;background:#FF6B2B;border:2px solid #0A1628;}
  .chwin{position:absolute;bottom:68px;right:0;width:320px;background:#0D2B45;border:1px solid rgba(46,158,214,.2);border-radius:18px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.5);}
  .chh{display:flex;align-items:center;gap:11px;padding:16px 18px;background:linear-gradient(135deg,#1565A8,#2E9ED6);}
  .chav{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:18px;}
  .ch-inf h4{font-size:13px;font-weight:700;color:#fff;}
  .ch-inf p{font-size:11px;color:rgba(255,255,255,.7);}
  .ch-on{width:8px;height:8px;border-radius:50%;background:#4ade80;margin-left:auto;}
  .chmsgs{height:200px;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:8px;}
  .cmsg{display:flex;}
  .cmsg.usr{justify-content:flex-end;}
  .cmbub{max-width:80%;padding:9px 13px;border-radius:12px;font-size:12.5px;line-height:1.55;}
  .cmsg.bot .cmbub{background:rgba(255,255,255,.07);color:rgba(255,255,255,.85);}
  .cmsg.usr .cmbub{background:#FF6B2B;color:#fff;}
  .chqk{display:flex;flex-wrap:wrap;gap:6px;padding:8px 14px;}
  .chqb{padding:5px 12px;border-radius:100px;border:1px solid rgba(46,158,214,.25);background:rgba(46,158,214,.07);font-size:11px;font-weight:600;color:#7EC8E3;cursor:pointer;transition:all .2s;}
  .chqb:hover{background:rgba(46,158,214,.18);}
  .chinr{display:flex;gap:8px;padding:10px 14px;border-top:1px solid rgba(255,255,255,.05);}
  .chin{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(46,158,214,.18);border-radius:8px;padding:9px 12px;font-size:13px;color:#fff;outline:none;}
  .chsnd{background:#FF6B2B;color:#fff;border:none;border-radius:8px;padding:9px 13px;font-size:14px;cursor:pointer;}

  /* ── SHARED BUTTONS ── */
  .btn-ol{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:10px;border:2px solid #1565A8;color:#1565A8;font-weight:700;font-size:15px;transition:all .2s;}
  .btn-ol:hover{background:#1565A8;color:#fff;}
  .btn-or{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:10px;background:#FF6B2B;color:#fff;font-weight:700;font-size:15px;transition:all .2s;}
  .btn-or:hover{background:#e55a1f;transform:translateY(-2px);}
  .btn-gh{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:10px;border:2px solid rgba(46,158,214,.35);color:#7EC8E3;font-weight:700;font-size:15px;transition:all .2s;}
  .btn-gh:hover{border-color:#FF6B2B;color:#FF6B2B;}

  /* ── RESPONSIVE ── */
  @media(max-width:1024px){.why-lay{grid-template-columns:1fr!important;gap:48px!important;}}
  @media(max-width:900px){
    .srv-grid,.tgrid,.port-grid{grid-template-columns:repeat(2,1fr)!important;}
    .ind-g1{grid-template-columns:repeat(2,1fr)!important;}
    .ind-g2{grid-template-columns:repeat(2,1fr)!important;}
    .blog-feat{grid-template-columns:1fr!important;}
    .blog-row{grid-template-columns:repeat(2,1fr)!important;}
    .ft-top{grid-template-columns:1fr 1fr!important;}
  }
  @media(max-width:580px){
    .srv-grid,.tgrid,.port-grid,.blog-row,.ind-g1,.ind-g2{grid-template-columns:1fr!important;}
    .ft-top{grid-template-columns:1fr!important;}
    .ft-bot{flex-direction:column!important;text-align:center!important;}
    .chwin{width:290px!important;}
    .ctab-acts{flex-direction:column;align-items:center;}
  }
`

/* ─── DATA ─────────────────────────────────────── */
const WORDS = ['Healthcare','Education','Wellness','Automation','Marketplaces','Pet Care','Fertility & IVF']
const LOGOS = ['☁️ Microsoft Azure','🟠 AWS','🔵 Google Cloud','🤖 OpenAI','⚡ Claude','🐙 GitHub Copilot','📞 Twilio','🎙️ ElevenLabs','📊 HubSpot','⚛️ React / Next.js','🔷 .NET Core','🐳 Docker / K8s','🗄️ Supabase','🎨 Figma']
const SERVICES = [
  {i:'🧠',t:'AI Integration & Automation',d:'Embed AI into your workflows — intelligent document processing, medical scribes and full business automation.',tags:['OpenAI','Claude','Azure AI'],href:'/services/ai-integration'},
  {i:'🎙️',t:'AI Voice Agents',d:'Inbound & outbound voice AI, SMS, appointment setters and lead qualifiers — powered by ElevenLabs, VAPI & Twilio.',tags:['ElevenLabs','VAPI','Twilio'],href:'/services/ai-voice'},
  {i:'📱',t:'Web & Mobile Development',d:'Full-stack apps using React, Next.js, React Native, .NET Core and Blazor — built for performance.',tags:['React','Next.js','.NET'],href:'/services/web-mobile'},
  {i:'☁️',t:'Cloud Infrastructure & DevOps',d:'Azure, AWS & GCP architecture, Docker, Kubernetes, CI/CD pipelines and multi-cloud deployments.',tags:['Azure','AWS','Kubernetes'],href:'/services/cloud-devops'},
  {i:'🚀',t:'MVP & Vibe Coding',d:'Launch your idea in 4–8 weeks using AI-assisted vibe coding with Cursor, Lovable and Base44.',tags:['Cursor','Lovable','Vercel'],href:'/services/mvp-vibe'},
  {i:'🛒',t:'Marketplace Publishing',d:'We publish production-ready software on Azure, AWS and Google Marketplaces — enterprise-ready.',tags:['Azure MP','AWS','GCP'],href:'/services/marketplace'},
]
const INDUSTRIES = [
  {i:'🏥',n:'Healthcare',d:'HIPAA, EHR/FHIR, Epic, Medical Scribe',bg:'linear-gradient(135deg,#0D2B45,#1565A8)'},
  {i:'🌸',n:'Wellness & Fertility',d:"IVF, Fertility Clinics, Women's Wellness",bg:'linear-gradient(135deg,#0a2a1e,#0f6e56)'},
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
  {e:'📞',t:'AI Voice Lead Qualifier',d:'24/7 inbound/outbound voice AI that qualifies leads and books appointments.',stk:['VAPI','ElevenLabs','Twilio','GoHighLevel'],out:'🤖 60% cost reduction',cat:'automation',bg:'linear-gradient(135deg,#1a0a1a,#6b2fa0)',tb:'rgba(180,80,220,.22)',tc:'#e0a0ff',tl:'Automation'},
  {e:'🐾',t:'Pet Vaccination Kiosk',d:'Self-service kiosk with RFID pet ID integration for instant check-in.',stk:['React','RFID','Azure IoT','Node.js'],out:'🐕 5 min avg check-in',cat:'other',bg:'linear-gradient(135deg,#0a1a0a,#3a6a0a)',tb:'rgba(60,160,60,.22)',tc:'#a0e0a0',tl:'Pet Care'},
  {e:'📲',t:'Social Media Automation',d:'AI content generation, scheduling and image-to-video pipeline at scale.',stk:['OpenAI','Instantly.ai','Apollo.io','LinkedIn API'],out:'📊 5x content output',cat:'automation',bg:'linear-gradient(135deg,#0a0a1a,#1a2a8a)',tb:'rgba(46,100,214,.22)',tc:'#a0b0ff',tl:'Automation'},
]
const TECH = [
  {l:'Cloud Platforms',p:[{i:'☁️',n:'Microsoft Azure',f:true},{i:'🟠',n:'AWS',f:true},{i:'🔵',n:'Google Cloud',f:true},{i:'🏪',n:'Azure Marketplace'},{i:'🏪',n:'AWS Marketplace'},{i:'🏪',n:'GCP Marketplace'},{i:'🚂',n:'Railway',f:true},{i:'▲',n:'Vercel',f:true}]},
  {l:'AI & LLMs',p:[{i:'🤖',n:'OpenAI / ChatGPT',f:true},{i:'⚡',n:'Claude (Anthropic)',f:true},{i:'🔷',n:'Azure OpenAI',f:true},{i:'🌐',n:'Google Gemini'},{i:'🐙',n:'GitHub Copilot'},{i:'🦙',n:'LLaMA / Ollama'},{i:'🔗',n:'LangChain',f:true},{i:'🦙',n:'LlamaIndex'}]},
  {l:'AI Search & Vector DB',p:[{i:'🔍',n:'pgvector',f:true},{i:'📌',n:'Pinecone',f:true},{i:'🌊',n:'Weaviate'},{i:'🔷',n:'Azure AI Search',f:true},{i:'🔎',n:'Qdrant'},{i:'📊',n:'Embeddings API'},{i:'🧠',n:'Semantic Kernel'},{i:'🔗',n:'RAG Pipelines',f:true}]},
  {l:'AI Voice & Comms',p:[{i:'🎙️',n:'ElevenLabs',f:true},{i:'📞',n:'Twilio',f:true},{i:'🎤',n:'VAPI',f:true},{i:'💬',n:'AI SMS / IVR'},{i:'📅',n:'Appointment Setter'},{i:'🔔',n:'Reminder Agent'}]},
  {l:'Automation & Workflow',p:[{i:'⚙️',n:'n8n',f:true},{i:'🔄',n:'Make (Integromat)',f:true},{i:'⚡',n:'Zapier'},{i:'🔗',n:'Azure Logic Apps',f:true},{i:'🔷',n:'Azure Functions'},{i:'🤖',n:'GoHighLevel'},{i:'📊',n:'HubSpot'},{i:'🚀',n:'Apollo.io'}]},
  {l:'Frontend & Mobile',p:[{i:'⚛️',n:'React',f:true},{i:'▲',n:'Next.js',f:true},{i:'📱',n:'React Native',f:true},{i:'📦',n:'Expo'},{i:'🔌',n:'Capacitor'},{i:'🔷',n:'Blazor'},{i:'🍎',n:'Swift / iOS'},{i:'🤖',n:'Kotlin / Android'}]},
  {l:'Backend & Database',p:[{i:'🔷',n:'.NET Core / C#',f:true},{i:'🟢',n:'Node.js',f:true},{i:'🗄️',n:'Supabase',f:true},{i:'🐘',n:'PostgreSQL',f:true},{i:'🔴',n:'Redis'},{i:'🐍',n:'Python / FastAPI'},{i:'📦',n:'BullMQ'},{i:'🔒',n:'Azure Entra ID'}]},
  {l:'DevOps & Vibe Coding',p:[{i:'🐳',n:'Docker',f:true},{i:'☸️',n:'Kubernetes'},{i:'🔄',n:'Azure DevOps'},{i:'🐙',n:'GitHub Actions',f:true},{i:'⚡',n:'Cursor',f:true},{i:'💜',n:'Lovable',f:true},{i:'🔁',n:'Replit'},{i:'4️⃣',n:'Base44'}]},
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
  services:'We offer AI Integration, AI Voice Agents, Web & Mobile Dev, Cloud & DevOps, MVP & Vibe Coding, Marketplace Publishing and 24/7 Support. Which interests you?',
  project:'Awesome! What industry and what are you looking to build? 🚀',
  industries:'We serve Healthcare (HIPAA/EHR), Wellness & Fertility, Education & EdTech, Marketing & Automation, Service Marketplaces, Pet Care and CRM & Productivity.',
  mvp:'With Vibe Coding using Cursor, Lovable and Base44, we ship MVPs in 4–8 weeks. Our Spark package is built for this. 🚀',
  default:'Great question! Would you like to explore our services or connect with our team for a free consultation? 😊',
}

/* ─── HELPERS ─────────────────────────────────── */
function getBotReply(t){
  const l=t.toLowerCase()
  if(l.includes('service'))return BOT_REPLIES.services
  if(l.includes('project')||l.includes('start')||l.includes('build'))return BOT_REPLIES.project
  if(l.includes('industry')||l.includes('industr'))return BOT_REPLIES.industries
  if(l.includes('mvp')||l.includes('fast')||l.includes('speed'))return BOT_REPLIES.mvp
  return BOT_REPLIES.default
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

/* ─── HERO COMPONENTS ────────────────────────── */
const WAVE_BARS = Array.from({length:28},(_,i)=>({h:6+(i*7+13)%24,active:i<20,delay:(i%5)*0.1}))

function HeroCounter({value,suffix,label,go}){
  const [n,setN]=useState(0)
  useEffect(()=>{
    if(!go)return;let v=0;const step=Math.ceil(value/60)
    const t=setInterval(()=>{v+=step;if(v>=value){setN(value);clearInterval(t)}else setN(v)},30)
    return()=>clearInterval(t)
  },[go,value])
  return(
    <div className="h-stat">
      <div className="h-stat-n">{n}{suffix}</div>
      <div className="h-stat-l">{label}</div>
    </div>
  )
}

/* Card 1 — AI Clinical Documentation */
function CardScribe({shown}){
  const lines=[
    {role:'Patient',  color:'rgba(255,255,255,.35)',bg:'rgba(255,255,255,.04)',border:'rgba(255,255,255,.08)',text:'I have had sharp chest pain since this morning…'},
    {role:'AI Scribe',color:'#2E9ED6',             bg:'rgba(46,158,214,.08)', border:'rgba(46,158,214,.18)', text:'CC: Acute chest pain onset 0800. SOAP note generating…'},
    {role:'FHIR ✓',  color:'#22c55e',             bg:'rgba(34,197,94,.07)',  border:'rgba(34,197,94,.2)',   text:'Synced to Epic EHR — Encounter #48291'},
  ]
  return(
    <div className="scribe-card">
      <div className="sc-hdr">
        <div className="sc-dots">{['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="sc-dot" style={{background:c}}/>)}</div>
        <div className="sc-ttl" style={{color:'rgba(255,255,255,.85)',fontWeight:700}}>AI Clinical Documentation</div>
        <div className="sc-live"><div className="sc-live-dot"/><span className="sc-live-txt">LIVE</span></div>
      </div>
      <div className="sc-wave">
        <span className="sc-wave-lbl">Audio</span>
        {WAVE_BARS.map((b,i)=>(
          <div key={i} className="sc-bar" style={{height:b.h,background:b.active?'linear-gradient(to top,#1565A8,#2E9ED6)':'rgba(255,255,255,.1)',animationName:b.active?'waveBar':'none',animationDuration:`${0.4+b.delay}s`,animationIterationCount:'infinite',animationTimingFunction:'ease-in-out',animationDirection:'alternate'}}/>
        ))}
      </div>
      <div className="sc-lines">
        {lines.map((line,i)=>shown>i&&(
          <motion.div key={i} className="sc-line" style={{background:line.bg,border:`1px solid ${line.border}`}} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{duration:.4}}>
            <div className="sc-role" style={{color:line.color}}>{line.role.toUpperCase()}</div>
            <div className="sc-text">{line.text}</div>
          </motion.div>
        ))}
      </div>
      <div className="sc-metrics">
        {[{v:'70%',l:'Time Saved'},{v:'98.4%',l:'Accuracy'},{v:'< 2s',l:'EHR Sync'}].map(m=>(
          <div key={m.l} className="sc-metric"><div className="sc-mv">{m.v}</div><div className="sc-ml">{m.l}</div></div>
        ))}
      </div>
      <div className="sc-glow"/>
    </div>
  )
}

/* Card 2 — Staff & Workflow Automation */
function CardWorkflow({shown}){
  const steps=[
    {icon:'📋',label:'New Patient Registered',color:'#2E9ED6',done:shown>0},
    {icon:'⚙️',label:'n8n Workflow Triggered',color:'#FF6B2B',done:shown>1},
    {icon:'👩‍⚕️',label:'Staff Assigned Automatically',color:'#8B5CF6',done:shown>2},
    {icon:'📅',label:'Appointment Booked & Notified',color:'#22c55e',done:shown>3},
  ]
  return(
    <div className="scribe-card">
      <div className="sc-hdr">
        <div className="sc-dots">{['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="sc-dot" style={{background:c}}/>)}</div>
        <div className="sc-ttl" style={{color:'rgba(255,255,255,.85)',fontWeight:700}}>Staff & Workflow Automation</div>
        <div className="sc-live"><div style={{width:6,height:6,borderRadius:'50%',background:'#FF6B2B',animation:'pulseGlow 2s infinite'}}/><span className="sc-live-txt" style={{color:'#FF6B2B'}}>n8n</span></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16,padding:'8px 12px',background:'rgba(255,107,43,.06)',borderRadius:10,border:'1px solid rgba(255,107,43,.15)'}}>
        <span style={{fontSize:11,color:'rgba(255,255,255,.4)'}}>Powered by</span>
        {['n8n','Make','Zapier','Azure Logic Apps'].map(t=><span key={t} style={{fontSize:10,fontWeight:700,color:'#FF6B2B',background:'rgba(255,107,43,.12)',borderRadius:4,padding:'2px 7px'}}>{t}</span>)}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {steps.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-10}} animate={s.done?{opacity:1,x:0}:{opacity:0,x:-10}} transition={{duration:.35}}
            style={{display:'flex',alignItems:'center',gap:12,padding:'10px 13px',background:s.done?`${s.color}11`:'rgba(255,255,255,.03)',border:`1px solid ${s.done?s.color+'33':'rgba(255,255,255,.06)'}`,borderRadius:10}}
          >
            <span style={{fontSize:18}}>{s.icon}</span>
            <span style={{fontSize:12.5,color:s.done?'rgba(255,255,255,.85)':'rgba(255,255,255,.3)',fontWeight:600,flex:1}}>{s.label}</span>
            {s.done&&<span style={{fontSize:10,color:s.color,fontWeight:700}}>✓ Done</span>}
          </motion.div>
        ))}
      </div>
      <div className="sc-metrics" style={{marginTop:16}}>
        {[{v:'80%',l:'Manual Work Cut'},{v:'< 1s',l:'Trigger Speed'},{v:'24/7',l:'Always Running'}].map(m=>(
          <div key={m.l} className="sc-metric"><div className="sc-mv">{m.v}</div><div className="sc-ml">{m.l}</div></div>
        ))}
      </div>
      <div className="sc-glow" style={{background:'radial-gradient(circle,rgba(255,107,43,.1) 0%,transparent 70%)'}}/>
    </div>
  )
}

/* Card 3 — AI Voice Agent */
function CardVoice({shown}){
  const industries=['Healthcare','Real Estate','Insurance','Legal','Retail']
  const [indIdx,setIndIdx]=useState(0)
  useEffect(()=>{const t=setInterval(()=>setIndIdx(i=>(i+1)%industries.length),1800);return()=>clearInterval(t)},[])
  const calls=[
    {from:'Inbound Call',status:'Answered by AI',color:'#2E9ED6',done:shown>0},
    {from:'Qualifying Lead',status:'Budget: $50k | Intent: High',color:'#FF6B2B',done:shown>1},
    {from:'CRM Updated',status:'HubSpot — Contact #8821',color:'#22c55e',done:shown>2},
  ]
  return(
    <div className="scribe-card">
      <div className="sc-hdr">
        <div className="sc-dots">{['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="sc-dot" style={{background:c}}/>)}</div>
        <div className="sc-ttl" style={{color:'rgba(255,255,255,.85)',fontWeight:700}}>AI Voice Agent</div>
        <div className="sc-live"><div className="sc-live-dot"/><span className="sc-live-txt">LIVE</span></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
        <span style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>Industry:</span>
        <AnimatePresence mode="wait">
          <motion.span key={indIdx} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.3}}
            style={{fontSize:12,fontWeight:700,color:'#7EC8E3',background:'rgba(46,158,214,.1)',borderRadius:6,padding:'3px 10px'}}
          >{industries[indIdx]}</motion.span>
        </AnimatePresence>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:16,height:28}}>
        <span style={{fontSize:11,color:'rgba(255,255,255,.35)',marginRight:4}}>Voice</span>
        {Array.from({length:32}).map((_,i)=>(
          <div key={i} style={{width:2.5,borderRadius:2,background:i%3===0?'#2E9ED6':i%3===1?'#7EC8E3':'rgba(255,255,255,.15)',height:`${6+(i*5)%20}px`,animationName:'waveBar',animationDuration:`${0.3+(i%4)*0.1}s`,animationIterationCount:'infinite',animationTimingFunction:'ease-in-out',animationDirection:'alternate'}}/>
        ))}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:9}}>
        {calls.map((c,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-10}} animate={c.done?{opacity:1,x:0}:{opacity:0,x:-10}} transition={{duration:.35}}
            style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',background:`${c.color}0d`,border:`1px solid ${c.color}33`,borderRadius:9}}
          >
            <div style={{width:7,height:7,borderRadius:'50%',background:c.color,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:'rgba(255,255,255,.4)',fontWeight:700,letterSpacing:'.06em'}}>{c.from.toUpperCase()}</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,.8)',fontWeight:600}}>{c.status}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="sc-metrics" style={{marginTop:16}}>
        {[{v:'24/7',l:'Available'},{v:'< 3s',l:'Response'},{v:'60%',l:'Cost Saved'}].map(m=>(
          <div key={m.l} className="sc-metric"><div className="sc-mv">{m.v}</div><div className="sc-ml">{m.l}</div></div>
        ))}
      </div>
      <div className="sc-glow" style={{background:'radial-gradient(circle,rgba(46,158,214,.1) 0%,transparent 70%)'}}/>
    </div>
  )
}

/* Card 4 — AI Vector Search */
function CardSearch({shown}){
  const results=[
    {score:'0.97',text:'HIPAA §164.312 — Access controls for ePHI systems…',color:'#22c55e',done:shown>0},
    {score:'0.94',text:'Patient record #4821 — Dr. Thompson, Cardiology…',color:'#2E9ED6',done:shown>1},
    {score:'0.91',text:'Insurance claim #IB-2291 — Approved, $12,400…',color:'#8B5CF6',done:shown>2},
  ]
  return(
    <div className="scribe-card">
      <div className="sc-hdr">
        <div className="sc-dots">{['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="sc-dot" style={{background:c}}/>)}</div>
        <div className="sc-ttl" style={{color:'rgba(255,255,255,.85)',fontWeight:700}}>AI Semantic Search</div>
        <div className="sc-live"><div style={{width:6,height:6,borderRadius:'50%',background:'#8B5CF6',animation:'pulseGlow 2s infinite'}}/><span className="sc-live-txt" style={{color:'#8B5CF6'}}>pgvector</span></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14,padding:'10px 13px',background:'rgba(139,92,246,.07)',border:'1px solid rgba(139,92,246,.2)',borderRadius:10}}>
        <span style={{fontSize:16}}>🔍</span>
        <span style={{fontSize:12.5,color:'rgba(255,255,255,.65)',flex:1}}>"show me cardiology patients with overdue follow-ups"</span>
        <span style={{fontSize:10,color:'#8B5CF6',fontWeight:700}}>NLP</span>
      </div>
      <div style={{fontSize:10,color:'rgba(255,255,255,.3)',marginBottom:10,fontWeight:700,letterSpacing:'.08em'}}>VECTOR SIMILARITY RESULTS</div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {results.map((r,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-10}} animate={r.done?{opacity:1,x:0}:{opacity:0,x:-10}} transition={{duration:.35}}
            style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',background:`${r.color}0d`,border:`1px solid ${r.color}33`,borderRadius:9}}
          >
            <span style={{fontSize:11,fontWeight:800,color:r.color,minWidth:32}}>{r.score}</span>
            <span style={{fontSize:12,color:'rgba(255,255,255,.75)',lineHeight:1.4}}>{r.text}</span>
          </motion.div>
        ))}
      </div>
      <div className="sc-metrics" style={{marginTop:16}}>
        {[{v:'< 50ms',l:'Query Speed'},{v:'1M+',l:'Vectors'},{v:'RAG',l:'Pipeline'}].map(m=>(
          <div key={m.l} className="sc-metric"><div className="sc-mv">{m.v}</div><div className="sc-ml">{m.l}</div></div>
        ))}
      </div>
      <div className="sc-glow" style={{background:'radial-gradient(circle,rgba(139,92,246,.1) 0%,transparent 70%)'}}/>
    </div>
  )
}

const HERO_CARDS = [
  {id:'scribe',  label:'AI Clinical Docs',  icon:'🩺', color:'#2E9ED6', badges:[{label:'Azure OpenAI',color:'#0078D4',top:'8%',left:'-10%'},{label:'HIPAA ✓',color:'#22c55e',bottom:'30%',left:'-12%'},{label:'FHIR',color:'#8B5CF6',bottom:'14%',right:'-6%'},{label:'Epic EHR',color:'#2E9ED6',top:'18%',right:'-8%'}]},
  {id:'workflow',label:'Workflow Automation',icon:'⚙️', color:'#FF6B2B', badges:[{label:'n8n',color:'#FF6B2B',top:'8%',left:'-8%'},{label:'Make',color:'#8B5CF6',top:'22%',right:'-8%'},{label:'Azure Logic',color:'#0078D4',bottom:'28%',left:'-12%'},{label:'Zapier',color:'#FF6B2B',bottom:'12%',right:'-6%'}]},
  {id:'voice',   label:'AI Voice Agent',    icon:'🎙️', color:'#22c55e', badges:[{label:'VAPI',color:'#FF6B2B',top:'8%',left:'-8%'},{label:'ElevenLabs',color:'#2E9ED6',top:'20%',right:'-10%'},{label:'Twilio',color:'#22c55e',bottom:'28%',left:'-12%'},{label:'HubSpot',color:'#FF6B2B',bottom:'12%',right:'-6%'}]},
  {id:'search',  label:'AI Vector Search',  icon:'🔍', color:'#8B5CF6', badges:[{label:'pgvector',color:'#8B5CF6',top:'8%',left:'-10%'},{label:'LangChain',color:'#22c55e',top:'20%',right:'-10%'},{label:'RAG',color:'#2E9ED6',bottom:'28%',left:'-12%'},{label:'Pinecone',color:'#8B5CF6',bottom:'12%',right:'-6%'}]},
]

/* ─── HERO ───────────────────────────────────── */
const INDUSTRIES_ROT = ['Healthcare','Education','Wellness','Automation','Pet Care','Marketplaces']

function Hero(){
  const [ind,setInd]=useState(0)
  const [go,setGo]=useState(false)
  const [cardIdx,setCardIdx]=useState(0)
  const [shown,setShown]=useState(0)
  const statsRef=useRef(null)
  const canvasRef=useRef(null)

  useEffect(()=>{const t=setInterval(()=>setInd(i=>(i+1)%INDUSTRIES_ROT.length),2500);return()=>clearInterval(t)},[])

  // auto-rotate cards every 7s
  useEffect(()=>{
    const t=setInterval(()=>{
      setCardIdx(i=>(i+1)%HERO_CARDS.length)
      setShown(0)
    },7000)
    return()=>clearInterval(t)
  },[])

  // animate lines within card
  useEffect(()=>{
    setShown(0)
    const delays=[700,1800,3000]
    const timers=delays.map((d,i)=>setTimeout(()=>setShown(i+1),d))
    return()=>timers.forEach(clearTimeout)
  },[cardIdx])

  useEffect(()=>{
    const el=statsRef.current;if(!el)return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setGo(true)},{threshold:.3})
    obs.observe(el);return()=>obs.disconnect()
  },[])

  useEffect(()=>{
    const cv=canvasRef.current;if(!cv)return
    const ctx=cv.getContext('2d');let id
    const sz=()=>{cv.width=cv.offsetWidth;cv.height=cv.offsetHeight};sz()
    const pts=Array.from({length:55},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+.3,dx:(Math.random()-.5)*.35,dy:(Math.random()-.5)*.35,a:Math.random()*.3+.08}))
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height)
      pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(46,158,214,${p.a})`;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>cv.width)p.dx*=-1;if(p.y<0||p.y>cv.height)p.dy*=-1})
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(46,158,214,${.06*(1-d/110)})`;ctx.lineWidth=.5;ctx.stroke()}}
      id=requestAnimationFrame(draw)
    }
    draw();window.addEventListener('resize',sz)
    return()=>{cancelAnimationFrame(id);window.removeEventListener('resize',sz)}
  },[])

  const fadeUp={hidden:{opacity:0,y:28},show:{opacity:1,y:0,transition:{duration:.65,ease:[.22,1,.36,1]}}}
  const stagger={hidden:{},show:{transition:{staggerChildren:.1}}}
  const activeCard=HERO_CARDS[cardIdx]

  return(
    <section className="hero-new" id="home">
      <canvas ref={canvasRef}/>
      <div className="h-orb1"/><div className="h-orb2"/>
      <div className="h-grid">
        {/* LEFT */}
        <motion.div className="h-left" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <div className="h-eye">
              <div style={{width:6,height:6,borderRadius:'50%',background:'#FF6B2B',animation:'pulseGlow 2s infinite',flexShrink:0}}/>
              <span>AI-First Software Development</span>
            </div>
          </motion.div>
          <motion.h1 className="h-h1" variants={fadeUp}>
            We Build <span className="h-grad-blue">AI-Powered</span>
            <br/>Software for{' '}
            <span style={{display:'inline-block',minWidth:220}}>
              <AnimatePresence mode="wait">
                <motion.span key={ind} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.4,ease:[.22,1,.36,1]}}
                  style={{display:'inline-block',background:'linear-gradient(135deg,#FF6B2B,#ffaa80)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}
                >{INDUSTRIES_ROT[ind]}</motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>
          <motion.p className="h-sub" variants={fadeUp}>
            From Azure cloud infrastructure to cutting-edge AI integrations — we design, build and deploy intelligent software that drives real business outcomes.
          </motion.p>
          <motion.div className="h-ctas" variants={fadeUp}>
            <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
              <a href="/contact" className="h-btn-p">Start a Project →</a>
            </motion.div>
            <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
              <a href="/portfolio" className="h-btn-s">View Our Work</a>
            </motion.div>
          </motion.div>
          <motion.div className="h-pills" variants={fadeUp}>
            {['Microsoft Azure','AWS','Google Cloud','OpenAI','Anthropic'].map((p,i)=>(
              <motion.span key={p} className="h-pill" initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} transition={{delay:.8+i*.08}}>{p}</motion.span>
            ))}
          </motion.div>
          <motion.div ref={statsRef} className="h-stats" variants={fadeUp}>
            {[{value:10,suffix:'+',label:'Years Experience'},{value:300,suffix:'+',label:'Projects Delivered'},{value:7,suffix:'',label:'Industries Served'},{value:3,suffix:'',label:'Cloud Marketplaces'}].map(s=>(
              <HeroCounter key={s.label} {...s} go={go}/>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — rotating cards */}
        <motion.div className="h-right" initial={{opacity:0,x:60}} animate={{opacity:1,x:0}} transition={{duration:.9,delay:.3,ease:[.22,1,.36,1]}}>
          {/* floating badges for active card */}
          {activeCard.badges.map((b,i)=>(
            <motion.div key={`${cardIdx}-${b.label}`} className="h-fbadge"
              style={{top:b.top,bottom:b.bottom,left:b.left,right:b.right,border:`1px solid ${b.color}44`,color:b.color,boxShadow:`0 4px 20px ${b.color}22`}}
              initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}} transition={{delay:i*.12,type:'spring',stiffness:160}}
              whileHover={{scale:1.1}}
            >{b.label}</motion.div>
          ))}
          <div style={{position:'absolute',inset:-2,background:`linear-gradient(135deg,${activeCard.color}22,rgba(255,107,43,.08))`,borderRadius:24,filter:'blur(20px)',zIndex:-1,transition:'background .5s'}}/>

          {/* card switcher */}
          <AnimatePresence mode="wait">
            <motion.div key={cardIdx} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.4}}>
              {cardIdx===0&&<CardScribe shown={shown}/>}
              {cardIdx===1&&<CardWorkflow shown={shown}/>}
              {cardIdx===2&&<CardVoice shown={shown}/>}
              {cardIdx===3&&<CardSearch shown={shown}/>}
            </motion.div>
          </AnimatePresence>

          {/* tab selector */}
          <div style={{display:'flex',gap:8,marginTop:14,justifyContent:'center',flexWrap:'wrap'}}>
            {HERO_CARDS.map((c,i)=>(
              <button key={c.id} onClick={()=>{setCardIdx(i);setShown(0)}}
                style={{display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:100,border:`1px solid ${cardIdx===i?c.color+'66':'rgba(255,255,255,.1)'}`,background:cardIdx===i?`${c.color}18`:'transparent',color:cardIdx===i?c.color:'rgba(255,255,255,.35)',fontSize:11,fontWeight:700,cursor:'pointer',transition:'all .2s'}}
              >{c.icon} {c.label}</button>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="h-scroll"><span className="h-scroll-t">Scroll</span><div className="h-scroll-d"/></div>
    </section>
  )
}

/* ─── REST OF SECTIONS ─────────────────────── */
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
            {all.map((l,i)=>{const[ico,...rest]=l.split(' ');return(<div key={i} className="lpill"><span>{ico}</span><span>{rest.join(' ')}</span></div>)})}
          </div>
        </div>
        <div className="pbadges rv">
          {badges.map(b=>(<div key={b.n} className="pb"><span className="pb-ic">{b.i}</span><div><div className="pb-nm">{b.n}</div><div className="pb-lv">{b.l}</div></div></div>))}
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
            <a key={s.t} href={s.href} className={`scard rv d${(i%6)+1}`} style={{textDecoration:'none',display:'block'}}>
              <div className="sc-ico">{s.i}</div>
              <h3 className="sc-ttl">{s.t}</h3>
              <p className="sc-dsc">{s.d}</p>
              <div className="sc-tags">{s.tags.map(t=><span key={t} className="sc-tag">{t}</span>)}</div>
              <div style={{display:'inline-flex',alignItems:'center',gap:5,marginTop:14,fontSize:13,fontWeight:700,color:'#FF6B2B'}}>Learn more →</div>
            </a>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48}} className="rv"><a href="/services" className="btn-ol">View All 9 Services →</a></div>
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
              <div className="ibg" style={{background:ind.bg}}/><div className="igrd"/>
              <div className="icnt"><div className="i-ico">{ind.i}</div><div className="i-nm">{ind.n}</div><div className="i-ds">{ind.d}</div></div>
            </div>
          ))}
        </div>
        <div className="ind-g2">
          {INDUSTRIES.slice(4).map((ind,i)=>(
            <div key={ind.n} className={`icard rv d${i+3}`}>
              <div className="ibg" style={{background:ind.bg}}/><div className="igrd"/>
              <div className="icnt"><div className="i-ico">{ind.i}</div><div className="i-nm">{ind.n}</div><div className="i-ds">{ind.d}</div></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:44}} className="rv"><a href="/industries" className="btn-gh">Explore All Industries →</a></div>
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
              <div className="wcard-s">Measured across 300+ projects and 10+ years</div>
              <div ref={bref}>
                {[['On-time delivery',96],['Client retention',92],['AI integrations',100]].map(([l,p])=>(
                  <div key={l} className="wmet"><span className="wmet-l">{l}</span><div className="wmet-bw"><div className="wmet-bf" style={{width:bars?`${p}%`:'0%'}}/></div><span className="wmet-p">{p}%</span></div>
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
              <div className="pcv" style={{background:p.bg}}><span className="pce">{p.e}</span><span className="pct" style={{background:p.tb,color:p.tc}}>{p.tl}</span></div>
              <div className="pcb"><div className="pc-t">{p.t}</div><div className="pc-d">{p.d}</div><div className="pc-stk">{p.stk.map(t=><span key={t} className="pc-tk">{t}</span>)}</div></div>
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
              <div className="tgpills">{g.p.map(p=><div key={p.n} className={`tgp${p.f?' ft':''}`}><span>{p.i}</span><span>{p.n}</span></div>)}</div>
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
              <div className="tc-auth"><div className="tc-av" style={{background:t.abg}}>{t.av}</div><div><div className="tc-nm">{t.nm}</div><div className="tc-rl">{t.rl}</div></div></div>
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
              <div className="bv" style={{background:p.bg}}><span style={{fontSize:36}}>{p.e}</span><span className="bcat">{p.c}</span></div>
              <div className="bb"><div className="bm">{p.r} · {p.d}</div><div className="bt">{p.t}</div><a href="#" className="bln">Read →</a></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:44}} className="rv"><a href="/blog" className="btn-gh">Visit The AI Edge Blog →</a></div>
      </div>
    </section>
  )
}

function Quiz(){
  const [step,setStep]=useState(0);const [sel,setSel]=useState(null);const [scores,setScores]=useState([]);const [result,setResult]=useState(null)
  const next=()=>{if(sel===null)return;const ns=[...scores,sel];if(step<QSTEPS.length-1){setScores(ns);setStep(s=>s+1);setSel(null)}else{const tot=ns.reduce((a,b)=>a+b,0);const pct=Math.round((tot/125)*100);setResult(pct>=70?{tier:'AI-Ready',pct,icon:'🚀',color:'#22c55e',msg:'Your business is primed for AI transformation. Letʼs build something exceptional together.'}:pct>=40?{tier:'AI-Curious',pct,icon:'🔍',color:'#FF6B2B',msg:'Youʼre on the right track. A focused AI integration could unlock major gains.'}:{tier:'AI-Starter',pct,icon:'💡',color:'#2E9ED6',msg:'Great time to start. Weʼll guide you from zero to AI-powered step by step.'})}}
  const back=()=>{if(step>0){setStep(s=>s-1);setSel(scores[step-1]);setScores(s=>s.slice(0,-1))}}
  const restart=()=>{setStep(0);setSel(null);setScores([]);setResult(null)}
  return(
    <section className="quiz">
      <div className="quiz-inner">
        <div className="rv qhd">
          <div className="lbl" style={{color:'#7EC8E3',justifyContent:'center'}}><span className="lbl-dot"/>🧠 Free Assessment</div>
          <h2 className="sec-title" style={{fontSize:'clamp(26px,3.5vw,44px)',color:'#fff',marginBottom:12}}>Is Your Business Ready for AI?</h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.45)'}}>Answer 5 quick questions and get an instant AI Readiness Score.</p>
        </div>
        <div className="qcard rv">
          <div className="qpb"><div className="qpbf" style={{width:result?'100%':`${(step+1)/QSTEPS.length*100}%`}}/></div>
          {!result?(
            <>
              <div className="qq">{QSTEPS[step].q}</div>
              <div className="qopts">{QSTEPS[step].opts.map(o=>(<button key={o.l} className={`qopt${sel===o.v?' sel':''}`} onClick={()=>setSel(o.v)}>{o.l}</button>))}</div>
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
          <a href="mailto:hello@csharptek.com" className="btn-or">Book a Free Consultation →</a>
          <a href="#portfolio" className="btn-gh">View Our Work</a>
        </div>
        <div className="ctab-chk">
          {['✓No obligation','✓Reply within 24 hours','✓HIPAA-ready','✓24/7 support'].map(c=><span key={c}>{c}</span>)}
        </div>
      </div>
    </section>
  )
}

function Footer(){
  const [email,setEmail]=useState('');const [subbed,setSubbed]=useState(false)
  return(
    <footer>
      <div className="ft-inner">
        <div className="ft-top">
          <div>
            <div className="ft-logo"><span className="ft-lcs">C#</span><span className="ft-lre">harpTek</span></div>
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
          <div className="chmsgs">{msgs.map((m,i)=><div key={i} className={`cmsg ${m.bot?'bot':'usr'}`}><div className="cmbub">{m.text}</div></div>)}</div>
          <div className="chqk">
            {[['Our Services','Tell me about your services'],['Start Project','I want to start a project'],['Industries','What industries do you work with?'],['MVP Speed','How fast can you build an MVP?']].map(([l,m])=>(<button key={l} className="chqb" onClick={()=>send(m)}>{l}</button>))}
          </div>
          <div className="chinr">
            <input className="chin" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(input)} placeholder="Type a message..."/>
            <button className="chsnd" onClick={()=>send(input)}>➤</button>
          </div>
        </div>
      )}
      <button className="chtog" onClick={()=>setOpen(!open)}>{open?'✕':'💬'}{!open&&<span className="ch-dot"/>}</button>
    </div>
  )
}

/* ─── PAGE ───────────────────────────────────── */
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
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet"/>
      </Head>
      <style dangerouslySetInnerHTML={{__html:GLOBAL_STYLES}}/>
      <NavComponent/>
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
      <ScrollToTop/>
    </>
  )
}
