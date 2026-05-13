export default function RealEstateCard() {
  return (
    <>
      <style>{`
        @keyframes re-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes re-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        @keyframes re-shimmer{0%,100%{opacity:.12}50%{opacity:.4}}
        @keyframes re-typing{0%,100%{opacity:.6}50%{opacity:1}}
        .re-cursor{animation:re-blink 1s step-end infinite}
        .re-dot{animation:re-pulse 1.5s ease-in-out infinite;transform-origin:center}
        .re-sh1{animation:re-shimmer 2.5s ease-in-out infinite}
        .re-sh2{animation:re-shimmer 2.5s ease-in-out infinite .55s}
        .re-typing{animation:re-typing 1.8s ease-in-out infinite}
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <linearGradient id="re-bg" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0%" stopColor="#0d1e30"/>
            <stop offset="100%" stopColor="#050b14"/>
          </linearGradient>
          <linearGradient id="re-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050b14" stopOpacity="0"/>
            <stop offset="55%" stopColor="#050b14" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#030810" stopOpacity="1"/>
          </linearGradient>
          <clipPath id="re-clip"><rect width="340" height="460" rx="16"/></clipPath>
        </defs>
        <g clipPath="url(#re-clip)">
          <rect width="340" height="460" fill="url(#re-bg)"/>
          <circle cx="280" cy="90" r="140" fill="#1a5276" fillOpacity=".15"/>

          {/* Header */}
          <rect x="24" y="32" width="100" height="26" rx="7" fill="rgba(46,100,160,.1)" stroke="rgba(46,100,160,.3)" strokeWidth=".5"/>
          <circle className="re-dot" cx="38" cy="45" r="4" fill="#4a80c0"/>
          <text x="48" y="49" fontFamily="sans-serif" fontSize="9" fill="#4a80c0" fontWeight="700">● REAL ESTATE AI</text>

          {/* Property listing */}
          <rect x="24" y="72" width="292" height="68" rx="10" fill="rgba(8,15,26,.8)" stroke="rgba(46,100,160,.15)" strokeWidth=".5"/>
          <text x="38" y="91" fontFamily="sans-serif" fontSize="8" fill="rgba(100,160,220,.4)" letterSpacing="1.5">FEATURED LISTING</text>
          <rect x="38" y="100" width="56" height="32" rx="6" fill="rgba(26,82,118,.2)" stroke="rgba(46,100,160,.25)" strokeWidth=".5"/>
          <polygon points="66,103 38,118 94,118" fill="rgba(46,100,160,.2)"/>
          <rect x="38" y="120" width="56" height="10" rx="2" fill="rgba(26,82,118,.3)"/>
          <text x="104" y="110" fontFamily="sans-serif" fontSize="12" fill="#80b4e0" fontWeight="700">$485,000</text>
          <text x="104" y="125" fontFamily="sans-serif" fontSize="8.5" fill="rgba(100,160,220,.55)">3 bed · 2 bath · 1,840 sqft</text>
          <text x="104" y="136" fontFamily="sans-serif" fontSize="8" fill="rgba(100,160,220,.4)">Austin, TX · Listed 2 days ago</text>

          {/* AI Lead chat */}
          <rect x="24" y="154" width="292" height="58" rx="10" fill="rgba(8,15,26,.8)" stroke="rgba(46,100,160,.12)" strokeWidth=".5"/>
          <text x="38" y="172" fontFamily="sans-serif" fontSize="8" fill="rgba(100,160,220,.4)" letterSpacing="1.5">AI LEAD QUALIFIER</text>
          <text x="38" y="189" fontFamily="sans-serif" fontSize="10" fill="rgba(255,255,255,.68)">&ldquo;Hi! I saw the Oak Drive listing —</text>
          <text x="38" y="204" fontFamily="sans-serif" fontSize="10" fill="rgba(255,255,255,.68)">best time to view?&rdquo;</text>
          <rect className="re-typing" x="232" y="197" width="76" height="13" rx="5" fill="rgba(255,107,43,.18)" stroke="rgba(255,107,43,.3)" strokeWidth=".5"/>
          <text x="270" y="207" fontFamily="sans-serif" fontSize="8" fill="#FF6B2B" textAnchor="middle" fontWeight="600">AI Responding...</text>
          <rect className="re-cursor" x="222" y="199" width="4" height="12" rx="2" fill="#FF6B2B" fillOpacity=".6"/>

          {/* Shimmer */}
          <rect className="re-sh1" x="24" y="226" width="292" height="5" rx="2" fill="rgba(46,100,160,.3)"/>
          <rect className="re-sh2" x="24" y="237" width="210" height="5" rx="2" fill="rgba(46,100,160,.2)"/>

          {/* Leads + Pipeline */}
          <rect x="24" y="256" width="138" height="56" rx="10" fill="rgba(8,15,26,.8)" stroke="rgba(46,100,160,.12)" strokeWidth=".5"/>
          <text x="93" y="275" fontFamily="sans-serif" fontSize="8" fill="rgba(100,160,220,.35)" textAnchor="middle" letterSpacing="1">LEADS TODAY</text>
          <text x="93" y="297" fontFamily="sans-serif" fontSize="24" fill="#80b4e0" textAnchor="middle" fontWeight="800">34</text>
          <text x="93" y="309" fontFamily="sans-serif" fontSize="8" fill="rgba(74,222,128,.55)" textAnchor="middle">↑ 12 qualified</text>

          <rect x="178" y="256" width="138" height="56" rx="10" fill="rgba(8,15,26,.8)" stroke="rgba(46,100,160,.1)" strokeWidth=".5"/>
          <text x="190" y="275" fontFamily="sans-serif" fontSize="8" fill="rgba(100,160,220,.35)" letterSpacing="1">PIPELINE</text>
          <text x="190" y="292" fontFamily="sans-serif" fontSize="8.5" fill="rgba(100,160,220,.55)">Active listings</text>
          <text x="302" y="292" fontFamily="sans-serif" fontSize="9" fill="#80b4e0" textAnchor="end" fontWeight="600">18</text>
          <text x="190" y="307" fontFamily="sans-serif" fontSize="8.5" fill="rgba(100,160,220,.55)">Viewings booked</text>
          <text x="302" y="307" fontFamily="sans-serif" fontSize="9" fill="#4ade80" textAnchor="end" fontWeight="600">7 today</text>

          <rect width="340" height="460" fill="url(#re-fade)"/>
        </g>
      </svg>
    </>
  )
}
