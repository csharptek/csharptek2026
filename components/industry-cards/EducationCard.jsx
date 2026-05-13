export default function EducationCard() {
  return (
    <>
      <style>{`
        @keyframes ed-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes ed-shimmer{0%,100%{opacity:.12}50%{opacity:.4}}
        @keyframes ed-score{0%,100%{opacity:.8}50%{opacity:1}}
        .ed-cursor{animation:ed-blink 1.1s step-end infinite}
        .ed-sh1{animation:ed-shimmer 2.6s ease-in-out infinite}
        .ed-sh2{animation:ed-shimmer 2.6s ease-in-out infinite .45s}
        .ed-score{animation:ed-score 3s ease-in-out infinite}
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <linearGradient id="ed-bg" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0%" stopColor="#1a1500"/>
            <stop offset="100%" stopColor="#0a0900"/>
          </linearGradient>
          <linearGradient id="ed-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0900" stopOpacity="0"/>
            <stop offset="55%" stopColor="#0a0900" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#060600" stopOpacity="1"/>
          </linearGradient>
          <clipPath id="ed-clip"><rect width="340" height="460" rx="16"/></clipPath>
        </defs>
        <g clipPath="url(#ed-clip)">
          <rect width="340" height="460" fill="url(#ed-bg)"/>
          <circle cx="280" cy="90" r="140" fill="#7a5a0a" fillOpacity=".15"/>
          <circle cx="50" cy="360" r="90" fill="#d4a017" fillOpacity=".05"/>

          {/* Header */}
          <rect x="24" y="32" width="80" height="26" rx="7" fill="rgba(212,160,23,.12)" stroke="rgba(212,160,23,.3)" strokeWidth=".5"/>
          <text x="64" y="49" fontFamily="sans-serif" fontSize="9" fill="#d4a017" textAnchor="middle" fontWeight="700">AI TUTOR</text>

          {/* Student answer */}
          <rect x="24" y="72" width="292" height="60" rx="10" fill="rgba(18,14,0,.8)" stroke="rgba(212,160,23,.15)" strokeWidth=".5"/>
          <text x="38" y="91" fontFamily="sans-serif" fontSize="8" fill="rgba(240,200,80,.4)" letterSpacing="1.5">STUDENT ANSWER</text>
          <text x="38" y="109" fontFamily="sans-serif" fontSize="10.5" fill="rgba(255,255,255,.75)">&ldquo;The French Revolution began in 1789</text>
          <text x="38" y="125" fontFamily="sans-serif" fontSize="10.5" fill="rgba(255,255,255,.75)">due to financial crisis...&rdquo;</text>
          <rect className="ed-cursor" x="278" y="118" width="5" height="13" rx="2" fill="#d4a017" fillOpacity=".7"/>

          {/* AI Feedback */}
          <rect x="24" y="146" width="292" height="56" rx="10" fill="rgba(18,14,0,.8)" stroke="rgba(74,222,128,.15)" strokeWidth=".5"/>
          <text x="38" y="165" fontFamily="sans-serif" fontSize="8" fill="rgba(74,222,128,.4)" letterSpacing="1.5">AI FEEDBACK</text>
          <text x="38" y="182" fontFamily="sans-serif" fontSize="10" fill="rgba(255,255,255,.65)">&ldquo;Good start! Also mention the Estates-</text>
          <text x="38" y="196" fontFamily="sans-serif" fontSize="10" fill="rgba(255,255,255,.65)">General for full marks.&rdquo;</text>

          {/* Shimmer */}
          <rect className="ed-sh1" x="24" y="216" width="292" height="5" rx="2" fill="rgba(212,160,23,.3)"/>
          <rect className="ed-sh2" x="24" y="227" width="210" height="5" rx="2" fill="rgba(212,160,23,.2)"/>

          {/* Score + Progress */}
          <rect x="24" y="246" width="138" height="62" rx="10" fill="rgba(18,14,0,.8)" stroke="rgba(212,160,23,.15)" strokeWidth=".5"/>
          <text x="93" y="265" fontFamily="sans-serif" fontSize="8" fill="rgba(240,200,80,.35)" textAnchor="middle" letterSpacing="1">SCORE</text>
          <text className="ed-score" x="93" y="294" fontFamily="sans-serif" fontSize="30" fill="#f0d060" textAnchor="middle" fontWeight="800">78</text>
          <text x="93" y="306" fontFamily="sans-serif" fontSize="8" fill="rgba(240,200,80,.35)" textAnchor="middle">out of 100</text>

          <rect x="178" y="246" width="138" height="62" rx="10" fill="rgba(18,14,0,.8)" stroke="rgba(212,160,23,.12)" strokeWidth=".5"/>
          <text x="190" y="265" fontFamily="sans-serif" fontSize="8" fill="rgba(240,200,80,.35)" letterSpacing="1">CLASS PROGRESS</text>
          <rect x="190" y="272" width="114" height="7" rx="3" fill="rgba(212,160,23,.12)"/>
          <rect x="190" y="272" width="85" height="7" rx="3" fill="rgba(212,160,23,.65)"/>
          <text x="190" y="292" fontFamily="sans-serif" fontSize="8" fill="rgba(240,200,80,.4)">Avg score</text>
          <text x="302" y="292" fontFamily="sans-serif" fontSize="8.5" fill="#f0d060" textAnchor="end" fontWeight="600">74%</text>
          <text x="190" y="304" fontFamily="sans-serif" fontSize="8" fill="rgba(240,200,80,.35)">At-risk</text>
          <text x="302" y="304" fontFamily="sans-serif" fontSize="8.5" fill="#fb923c" textAnchor="end" fontWeight="600">3 students</text>

          <rect width="340" height="460" fill="url(#ed-fade)"/>
        </g>
      </svg>
    </>
  )
}
