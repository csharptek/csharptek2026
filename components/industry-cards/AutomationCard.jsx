export default function AutomationCard() {
  return (
    <>
      <style>{`
        @keyframes au-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        @keyframes au-wave{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
        @keyframes au-flow{0%{stroke-dashoffset:20}100%{stroke-dashoffset:0}}
        @keyframes au-shimmer{0%,100%{opacity:.12}50%{opacity:.4}}
        .au-dot{animation:au-pulse 1.4s ease-in-out infinite;transform-origin:center}
        .au-w1{animation:au-wave 1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:0s}
        .au-w2{animation:au-wave 1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.1s}
        .au-w3{animation:au-wave 1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.2s}
        .au-w4{animation:au-wave 1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.15s}
        .au-w5{animation:au-wave 1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.3s}
        .au-w6{animation:au-wave 1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.05s}
        .au-w7{animation:au-wave 1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.25s}
        .au-w8{animation:au-wave 1s ease-in-out infinite;transform-origin:50% 100%;animation-delay:.35s}
        .au-flow{animation:au-flow 1.5s linear infinite;stroke-dasharray:4 3}
        .au-sh{animation:au-shimmer 2.4s ease-in-out infinite}
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <linearGradient id="au-bg" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0%" stopColor="#18082a"/>
            <stop offset="100%" stopColor="#08030f"/>
          </linearGradient>
          <linearGradient id="au-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#08030f" stopOpacity="0"/>
            <stop offset="55%" stopColor="#08030f" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#050208" stopOpacity="1"/>
          </linearGradient>
          <clipPath id="au-clip"><rect width="340" height="460" rx="16"/></clipPath>
        </defs>
        <g clipPath="url(#au-clip)">
          <rect width="340" height="460" fill="url(#au-bg)"/>
          <circle cx="280" cy="90" r="150" fill="#6b2fa0" fillOpacity=".15"/>
          <circle cx="50" cy="360" r="90" fill="#9b4fd0" fillOpacity=".06"/>

          {/* Header */}
          <rect x="24" y="32" width="106" height="26" rx="7" fill="rgba(255,107,43,.1)" stroke="rgba(255,107,43,.3)" strokeWidth=".5"/>
          <circle className="au-dot" cx="38" cy="45" r="4" fill="#FF6B2B"/>
          <text x="48" y="49" fontFamily="sans-serif" fontSize="9" fill="#FF6B2B" fontWeight="700">● AI VOICE AGENT</text>

          {/* Waveform */}
          <rect x="24" y="72" width="292" height="48" rx="10" fill="rgba(12,4,24,.8)" stroke="rgba(155,79,208,.15)" strokeWidth=".5"/>
          <text x="38" y="91" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.4)" letterSpacing="1.5">VOICE WAVEFORM</text>
          <rect className="au-w1" x="38" y="100" width="4" height="12" rx="2" fill="#9b4fd0" fillOpacity=".5"/>
          <rect className="au-w2" x="46" y="100" width="4" height="12" rx="2" fill="#9b4fd0" fillOpacity=".7"/>
          <rect className="au-w3" x="54" y="100" width="4" height="12" rx="2" fill="#FF6B2B" fillOpacity=".8"/>
          <rect className="au-w4" x="62" y="100" width="4" height="12" rx="2" fill="#9b4fd0" fillOpacity=".65"/>
          <rect className="au-w5" x="70" y="100" width="4" height="12" rx="2" fill="#9b4fd0" fillOpacity=".9"/>
          <rect className="au-w6" x="78" y="100" width="4" height="12" rx="2" fill="#FF6B2B" fillOpacity=".6"/>
          <rect className="au-w7" x="86" y="100" width="4" height="12" rx="2" fill="#9b4fd0" fillOpacity=".5"/>
          <rect className="au-w8" x="94" y="100" width="4" height="12" rx="2" fill="#FF6B2B" fillOpacity=".85"/>
          <text x="215" y="112" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.35)" textAnchor="middle">VAPI · ElevenLabs · Twilio</text>

          {/* n8n workflow */}
          <rect x="24" y="134" width="292" height="72" rx="10" fill="rgba(12,4,24,.8)" stroke="rgba(155,79,208,.15)" strokeWidth=".5"/>
          <text x="38" y="153" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.4)" letterSpacing="1.5">n8n WORKFLOW</text>
          <rect x="38" y="160" width="48" height="20" rx="6" fill="rgba(155,79,208,.3)" stroke="rgba(155,79,208,.5)" strokeWidth=".5"/>
          <text x="62" y="174" fontFamily="sans-serif" fontSize="8" fill="#d2a0ff" textAnchor="middle" fontWeight="600">Trigger</text>
          <line className="au-flow" x1="86" y1="170" x2="106" y2="170" stroke="rgba(155,79,208,.6)" strokeWidth="1.5"/>
          <rect x="106" y="160" width="48" height="20" rx="6" fill="rgba(155,79,208,.2)" stroke="rgba(155,79,208,.3)" strokeWidth=".5"/>
          <text x="130" y="174" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.7)" textAnchor="middle">Score</text>
          <line className="au-flow" x1="154" y1="170" x2="174" y2="170" stroke="rgba(155,79,208,.6)" strokeWidth="1.5"/>
          <rect x="174" y="160" width="48" height="20" rx="6" fill="rgba(155,79,208,.2)" stroke="rgba(155,79,208,.3)" strokeWidth=".5"/>
          <text x="198" y="174" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.7)" textAnchor="middle">CRM</text>
          <line className="au-flow" x1="222" y1="170" x2="242" y2="170" stroke="rgba(155,79,208,.6)" strokeWidth="1.5"/>
          <rect x="242" y="160" width="60" height="20" rx="6" fill="rgba(255,107,43,.2)" stroke="rgba(255,107,43,.4)" strokeWidth=".5"/>
          <text x="272" y="174" fontFamily="sans-serif" fontSize="8" fill="#FF6B2B" textAnchor="middle" fontWeight="600">Book ✓</text>
          <text x="38" y="198" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.3)">80% manual work cut  ·  &lt;1s trigger  ·  24/7</text>

          {/* Shimmer */}
          <rect className="au-sh" x="24" y="220" width="292" height="5" rx="2" fill="rgba(155,79,208,.3)"/>

          {/* Lead score + CRM */}
          <rect x="24" y="238" width="138" height="52" rx="10" fill="rgba(12,4,24,.8)" stroke="rgba(155,79,208,.12)" strokeWidth=".5"/>
          <text x="93" y="257" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.35)" textAnchor="middle" letterSpacing="1">LEAD SCORE</text>
          <text x="93" y="278" fontFamily="sans-serif" fontSize="26" fill="#d2a0ff" textAnchor="middle" fontWeight="800">87</text>
          <text x="93" y="288" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.35)" textAnchor="middle">High intent</text>

          <rect x="178" y="238" width="138" height="52" rx="10" fill="rgba(12,4,24,.8)" stroke="rgba(155,79,208,.12)" strokeWidth=".5"/>
          <text x="247" y="257" fontFamily="sans-serif" fontSize="8" fill="rgba(210,160,255,.35)" textAnchor="middle" letterSpacing="1">CRM SYNC</text>
          <rect x="196" y="264" width="70" height="13" rx="4" fill="rgba(155,79,208,.2)"/>
          <text x="231" y="274" fontFamily="sans-serif" fontSize="8" fill="#d2a0ff" textAnchor="middle">GoHighLevel</text>
          <rect x="196" y="281" width="60" height="13" rx="4" fill="rgba(155,79,208,.2)"/>
          <text x="226" y="291" fontFamily="sans-serif" fontSize="8" fill="#d2a0ff" textAnchor="middle">HubSpot</text>
          <circle cx="298" cy="278" r="5" fill="#4ade80" fillOpacity=".8"/>

          <rect width="340" height="460" fill="url(#au-fade)"/>
        </g>
      </svg>
    </>
  )
}
