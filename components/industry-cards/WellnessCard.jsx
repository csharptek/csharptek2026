export default function WellnessCard() {
  return (
    <>
      <style>{`
        @keyframes wl-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
        @keyframes wl-shimmer{0%,100%{opacity:.15}50%{opacity:.5}}
        @keyframes wl-bar{0%{width:148px}50%{width:175px}100%{width:148px}}
        .wl-dot{animation:wl-pulse 1.6s ease-in-out infinite;transform-origin:center}
        .wl-sh1{animation:wl-shimmer 2.8s ease-in-out infinite}
        .wl-sh2{animation:wl-shimmer 2.8s ease-in-out infinite .6s}
        .wl-progress{animation:wl-bar 4s ease-in-out infinite}
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <linearGradient id="wl-bg" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0%" stopColor="#0a2a1e"/>
            <stop offset="100%" stopColor="#050f0a"/>
          </linearGradient>
          <linearGradient id="wl-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050f0a" stopOpacity="0"/>
            <stop offset="55%" stopColor="#050f0a" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#030808" stopOpacity="1"/>
          </linearGradient>
          <clipPath id="wl-clip"><rect width="340" height="460" rx="16"/></clipPath>
        </defs>
        <g clipPath="url(#wl-clip)">
          <rect width="340" height="460" fill="url(#wl-bg)"/>
          <circle cx="280" cy="90" r="150" fill="#0f6e56" fillOpacity=".12"/>
          <circle cx="50" cy="340" r="100" fill="#1D9E75" fillOpacity=".06"/>

          {/* Header */}
          <rect x="24" y="32" width="90" height="26" rx="7" fill="rgba(29,158,117,.12)" stroke="rgba(29,158,117,.3)" strokeWidth=".5"/>
          <circle className="wl-dot" cx="38" cy="45" r="4" fill="#1D9E75"/>
          <text x="48" y="49" fontFamily="sans-serif" fontSize="9" fill="#1D9E75" fontWeight="700">● IVF TRACKER</text>

          {/* Cycle progress */}
          <rect x="24" y="72" width="292" height="62" rx="10" fill="rgba(6,26,16,.8)" stroke="rgba(29,158,117,.15)" strokeWidth=".5"/>
          <text x="38" y="92" fontFamily="sans-serif" fontSize="8" fill="rgba(157,220,180,.4)" letterSpacing="1.5">TREATMENT CYCLE — DAY 8</text>
          <rect x="38" y="102" width="268" height="8" rx="4" fill="rgba(29,158,117,.15)"/>
          <rect className="wl-progress" x="38" y="102" height="8" rx="4" fill="rgba(29,158,117,.75)"/>
          <text x="38" y="124" fontFamily="sans-serif" fontSize="8" fill="rgba(157,220,180,.5)">Day 8 of 14</text>
          <text x="300" y="124" fontFamily="sans-serif" fontSize="8" fill="#1D9E75" textAnchor="end" fontWeight="600">55% complete</text>

          {/* Lab results */}
          <rect x="24" y="148" width="292" height="70" rx="10" fill="rgba(6,26,16,.8)" stroke="rgba(29,158,117,.12)" strokeWidth=".5"/>
          <text x="38" y="167" fontFamily="sans-serif" fontSize="8" fill="rgba(157,220,180,.4)" letterSpacing="1.5">LAB RESULTS</text>
          <text x="38" y="185" fontFamily="sans-serif" fontSize="9" fill="rgba(157,220,180,.6)">FSH</text>
          <text x="300" y="185" fontFamily="sans-serif" fontSize="9" fill="#4ade80" textAnchor="end" fontWeight="600">6.2 mIU/mL ✓</text>
          <text x="38" y="200" fontFamily="sans-serif" fontSize="9" fill="rgba(157,220,180,.6)">LH</text>
          <text x="300" y="200" fontFamily="sans-serif" fontSize="9" fill="#4ade80" textAnchor="end" fontWeight="600">8.1 mIU/mL ✓</text>
          <text x="38" y="215" fontFamily="sans-serif" fontSize="9" fill="rgba(157,220,180,.6)">Estradiol</text>
          <text x="300" y="215" fontFamily="sans-serif" fontSize="9" fill="#fbbf24" textAnchor="end" fontWeight="600">210 pg/mL ~</text>

          {/* Shimmer lines */}
          <rect className="wl-sh1" x="24" y="232" width="292" height="5" rx="2" fill="rgba(29,158,117,.3)"/>
          <rect className="wl-sh2" x="24" y="243" width="200" height="5" rx="2" fill="rgba(29,158,117,.2)"/>

          {/* Medication + Telehealth */}
          <rect x="24" y="262" width="138" height="52" rx="10" fill="rgba(6,26,16,.8)" stroke="rgba(29,158,117,.12)" strokeWidth=".5"/>
          <text x="93" y="281" fontFamily="sans-serif" fontSize="8" fill="rgba(157,220,180,.35)" textAnchor="middle" letterSpacing="1">MEDICATION</text>
          <text x="93" y="302" fontFamily="sans-serif" fontSize="10" fill="#9edcb4" textAnchor="middle" fontWeight="600">8pm tonight</text>
          <text x="93" y="314" fontFamily="sans-serif" fontSize="8" fill="rgba(74,222,128,.5)" textAnchor="middle">✓ Reminder set</text>

          <rect x="178" y="262" width="138" height="52" rx="10" fill="rgba(6,26,16,.8)" stroke="rgba(29,158,117,.12)" strokeWidth=".5"/>
          <text x="247" y="281" fontFamily="sans-serif" fontSize="8" fill="rgba(157,220,180,.35)" textAnchor="middle" letterSpacing="1">TELEHEALTH</text>
          <text x="247" y="300" fontFamily="sans-serif" fontSize="9.5" fill="#9edcb4" textAnchor="middle" fontWeight="600">Dr. Priya</text>
          <text x="247" y="314" fontFamily="sans-serif" fontSize="8" fill="rgba(157,220,180,.45)" textAnchor="middle">Tomorrow 10am</text>

          <rect width="340" height="460" fill="url(#wl-fade)"/>
        </g>
      </svg>
    </>
  )
}
