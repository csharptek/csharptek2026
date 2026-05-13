export default function HealthcareCard() {
  return (
    <>
      <style>{`
        @keyframes hc-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes hc-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.25)}}
        @keyframes hc-wave{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
        @keyframes hc-shimmer{0%,100%{opacity:.12}50%{opacity:.38}}
        .hc-cursor{animation:hc-blink 1s step-end infinite}
        .hc-dot{animation:hc-pulse 1.4s ease-in-out infinite;transform-origin:center}
        .hc-w1{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:0s}
        .hc-w2{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.1s}
        .hc-w3{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.2s}
        .hc-w4{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.15s}
        .hc-w5{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.3s}
        .hc-w6{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.05s}
        .hc-w7{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.25s}
        .hc-w8{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.35s}
        .hc-w9{animation:hc-wave 1.1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.12s}
        .hc-sh1{animation:hc-shimmer 2.5s ease-in-out infinite}
        .hc-sh2{animation:hc-shimmer 2.5s ease-in-out infinite .5s}
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <linearGradient id="hc-bg" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0%" stopColor="#0e2d4a"/>
            <stop offset="100%" stopColor="#060e1c"/>
          </linearGradient>
          <linearGradient id="hc-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#060e1c" stopOpacity="0"/>
            <stop offset="55%" stopColor="#060e1c" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#040a14" stopOpacity="1"/>
          </linearGradient>
          <clipPath id="hc-clip"><rect width="340" height="460" rx="16"/></clipPath>
        </defs>
        <g clipPath="url(#hc-clip)">
          <rect width="340" height="460" fill="url(#hc-bg)"/>
          <circle cx="280" cy="100" r="160" fill="#1565A8" fillOpacity=".1"/>
          <circle cx="60" cy="320" r="100" fill="#2E9ED6" fillOpacity=".05"/>

          {/* Live badge */}
          <rect x="24" y="32" width="90" height="26" rx="7" fill="rgba(255,107,43,.1)" stroke="rgba(255,107,43,.3)" strokeWidth=".5"/>
          <circle className="hc-dot" cx="38" cy="45" r="4" fill="#FF6B2B"/>
          <text x="48" y="49" fontFamily="sans-serif" fontSize="9" fill="#FF6B2B" fontWeight="700">● AI SCRIBE</text>

          {/* Transcript */}
          <rect x="24" y="72" width="292" height="72" rx="10" fill="rgba(11,32,55,.8)" stroke="rgba(46,158,214,.15)" strokeWidth=".5"/>
          <text x="38" y="92" fontFamily="sans-serif" fontSize="8" fill="rgba(126,200,227,.4)" letterSpacing="1.5">LIVE TRANSCRIPT</text>
          <text x="38" y="112" fontFamily="sans-serif" fontSize="11" fill="rgba(255,255,255,.8)">&ldquo;Patient reports fatigue and mild</text>
          <text x="38" y="128" fontFamily="sans-serif" fontSize="11" fill="rgba(255,255,255,.8)">shortness of breath since Monday.&rdquo;</text>
          <rect className="hc-cursor" x="272" y="122" width="5" height="14" rx="2" fill="#2E9ED6" fillOpacity=".8"/>

          {/* SOAP tabs */}
          <rect x="24" y="158" width="68" height="26" rx="7" fill="rgba(21,101,168,.5)" stroke="rgba(46,158,214,.3)" strokeWidth=".5"/>
          <text x="58" y="175" fontFamily="sans-serif" fontSize="9" fill="#7EC8E3" textAnchor="middle" fontWeight="700">S — Subjective</text>
          <rect x="100" y="158" width="40" height="26" rx="7" fill="rgba(21,101,168,.2)" stroke="rgba(46,158,214,.12)" strokeWidth=".5"/>
          <text x="120" y="175" fontFamily="sans-serif" fontSize="9" fill="rgba(126,200,227,.45)" textAnchor="middle">O</text>
          <rect x="148" y="158" width="40" height="26" rx="7" fill="rgba(21,101,168,.2)" stroke="rgba(46,158,214,.12)" strokeWidth=".5"/>
          <text x="168" y="175" fontFamily="sans-serif" fontSize="9" fill="rgba(126,200,227,.45)" textAnchor="middle">A</text>
          <rect x="196" y="158" width="40" height="26" rx="7" fill="rgba(21,101,168,.2)" stroke="rgba(46,158,214,.12)" strokeWidth=".5"/>
          <text x="216" y="175" fontFamily="sans-serif" fontSize="9" fill="rgba(126,200,227,.45)" textAnchor="middle">P</text>

          {/* Shimmer lines */}
          <rect className="hc-sh1" x="24" y="200" width="292" height="5" rx="2" fill="rgba(46,158,214,.3)"/>
          <rect className="hc-sh2" x="24" y="211" width="220" height="5" rx="2" fill="rgba(46,158,214,.2)"/>

          {/* EHR + HIPAA */}
          <rect x="24" y="228" width="138" height="52" rx="10" fill="rgba(11,32,55,.8)" stroke="rgba(46,158,214,.12)" strokeWidth=".5"/>
          <text x="93" y="248" fontFamily="sans-serif" fontSize="8" fill="rgba(126,200,227,.35)" textAnchor="middle" letterSpacing="1">EHR SYNC</text>
          <text x="93" y="268" fontFamily="sans-serif" fontSize="10" fill="#7EC8E3" textAnchor="middle" fontWeight="600">Epic · Cerner</text>
          <circle cx="132" cy="270" r="5" fill="#4ade80" fillOpacity=".85"/>
          <rect x="178" y="228" width="138" height="52" rx="10" fill="rgba(10,40,18,.8)" stroke="rgba(74,222,128,.12)" strokeWidth=".5"/>
          <text x="247" y="248" fontFamily="sans-serif" fontSize="8" fill="rgba(74,222,128,.35)" textAnchor="middle" letterSpacing="1">HIPAA</text>
          <text x="247" y="268" fontFamily="sans-serif" fontSize="10" fill="#4ade80" textAnchor="middle" fontWeight="700">✓ Encrypted</text>

          {/* Waveform */}
          <rect className="hc-w1" x="38"  y="294" width="4" height="22" rx="2" fill="#2E9ED6" fillOpacity=".5"/>
          <rect className="hc-w2" x="46"  y="294" width="4" height="22" rx="2" fill="#2E9ED6" fillOpacity=".7"/>
          <rect className="hc-w3" x="54"  y="294" width="4" height="22" rx="2" fill="#FF6B2B" fillOpacity=".75"/>
          <rect className="hc-w4" x="62"  y="294" width="4" height="22" rx="2" fill="#2E9ED6" fillOpacity=".65"/>
          <rect className="hc-w5" x="70"  y="294" width="4" height="22" rx="2" fill="#2E9ED6" fillOpacity=".85"/>
          <rect className="hc-w6" x="78"  y="294" width="4" height="22" rx="2" fill="#FF6B2B" fillOpacity=".6"/>
          <rect className="hc-w7" x="86"  y="294" width="4" height="22" rx="2" fill="#2E9ED6" fillOpacity=".5"/>
          <rect className="hc-w8" x="94"  y="294" width="4" height="22" rx="2" fill="#FF6B2B" fillOpacity=".8"/>
          <rect className="hc-w9" x="102" y="294" width="4" height="22" rx="2" fill="#2E9ED6" fillOpacity=".55"/>
          <text x="210" y="312" fontFamily="sans-serif" fontSize="9" fill="rgba(126,200,227,.28)" textAnchor="middle">Azure OpenAI · Real-time NLP</text>

          <rect width="340" height="460" fill="url(#hc-fade)"/>
        </g>
      </svg>
    </>
  )
}
