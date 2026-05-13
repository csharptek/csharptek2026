export default function CRMCard() {
  return (
    <>
      <style>{`
        @keyframes cr-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        @keyframes cr-shimmer{0%,100%{opacity:.12}50%{opacity:.4}}
        @keyframes cr-blink{0%,100%{opacity:1}50%{opacity:.3}}
        .cr-dot{animation:cr-pulse 1.4s ease-in-out infinite;transform-origin:center}
        .cr-sh1{animation:cr-shimmer 2.5s ease-in-out infinite}
        .cr-sh2{animation:cr-shimmer 2.5s ease-in-out infinite .5s}
        .cr-blink{animation:cr-blink 2s ease-in-out infinite}
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <linearGradient id="cr-bg" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0%" stopColor="#1a0808"/>
            <stop offset="100%" stopColor="#080202"/>
          </linearGradient>
          <linearGradient id="cr-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#080202" stopOpacity="0"/>
            <stop offset="55%" stopColor="#080202" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#050101" stopOpacity="1"/>
          </linearGradient>
          <clipPath id="cr-clip"><rect width="340" height="460" rx="16"/></clipPath>
        </defs>
        <g clipPath="url(#cr-clip)">
          <rect width="340" height="460" fill="url(#cr-bg)"/>
          <circle cx="280" cy="90" r="140" fill="#8B2a2a" fillOpacity=".15"/>

          {/* Header */}
          <rect x="24" y="32" width="90" height="26" rx="7" fill="rgba(180,50,50,.1)" stroke="rgba(180,50,50,.3)" strokeWidth=".5"/>
          <circle className="cr-dot" cx="38" cy="45" r="4" fill="#e05050"/>
          <text x="48" y="49" fontFamily="sans-serif" fontSize="9" fill="#e05050" fontWeight="700">● CRM PIPELINE</text>

          {/* Pipeline stages */}
          <rect x="24" y="72" width="292" height="54" rx="10" fill="rgba(15,4,4,.8)" stroke="rgba(180,50,50,.15)" strokeWidth=".5"/>
          <text x="38" y="91" fontFamily="sans-serif" fontSize="8" fill="rgba(240,120,120,.4)" letterSpacing="1.5">PIPELINE STAGES</text>
          <rect x="38" y="98" width="42" height="20" rx="5" fill="rgba(180,50,50,.3)"/>
          <text x="59" y="112" fontFamily="sans-serif" fontSize="8" fill="#f08080" textAnchor="middle">Lead 48</text>
          <rect x="86" y="98" width="42" height="20" rx="5" fill="rgba(180,50,50,.2)"/>
          <text x="107" y="112" fontFamily="sans-serif" fontSize="8" fill="#f08080" textAnchor="middle">Qualify 31</text>
          <rect x="134" y="98" width="46" height="20" rx="5" fill="rgba(180,50,50,.2)"/>
          <text x="157" y="112" fontFamily="sans-serif" fontSize="8" fill="#f08080" textAnchor="middle">Proposal 19</text>
          <rect x="186" y="98" width="66" height="20" rx="5" fill="rgba(74,222,128,.12)" stroke="rgba(74,222,128,.3)" strokeWidth=".5"/>
          <text x="219" y="112" fontFamily="sans-serif" fontSize="8" fill="#4ade80" textAnchor="middle" fontWeight="600">Closed ✓  7</text>

          {/* Revenue + activity */}
          <rect x="24" y="140" width="138" height="60" rx="10" fill="rgba(15,4,4,.8)" stroke="rgba(180,50,50,.12)" strokeWidth=".5"/>
          <text x="93" y="159" fontFamily="sans-serif" fontSize="8" fill="rgba(240,120,120,.35)" textAnchor="middle" letterSpacing="1">REVENUE</text>
          <text x="93" y="182" fontFamily="sans-serif" fontSize="22" fill="#f08080" textAnchor="middle" fontWeight="800">$128k</text>
          <text x="93" y="196" fontFamily="sans-serif" fontSize="8" fill="rgba(74,222,128,.55)" textAnchor="middle">↑ 24% MoM</text>

          <rect x="178" y="140" width="138" height="60" rx="10" fill="rgba(15,4,4,.8)" stroke="rgba(180,50,50,.1)" strokeWidth=".5"/>
          <text x="190" y="159" fontFamily="sans-serif" fontSize="8" fill="rgba(240,120,120,.35)" letterSpacing="1">TEAM ACTIVITY</text>
          <text x="190" y="175" fontFamily="sans-serif" fontSize="8.5" fill="rgba(240,120,120,.55)">Calls today</text>
          <text x="302" y="175" fontFamily="sans-serif" fontSize="9" fill="#f08080" textAnchor="end" fontWeight="600">84</text>
          <text x="190" y="190" fontFamily="sans-serif" fontSize="8.5" fill="rgba(240,120,120,.55)">Emails sent</text>
          <text x="302" y="190" fontFamily="sans-serif" fontSize="9" fill="#f08080" textAnchor="end" fontWeight="600">217</text>

          {/* Shimmer */}
          <rect className="cr-sh1" x="24" y="214" width="292" height="5" rx="2" fill="rgba(180,50,50,.3)"/>
          <rect className="cr-sh2" x="24" y="225" width="210" height="5" rx="2" fill="rgba(180,50,50,.2)"/>

          {/* AI Insights */}
          <rect x="24" y="244" width="292" height="56" rx="10" fill="rgba(15,4,4,.8)" stroke="rgba(180,50,50,.12)" strokeWidth=".5"/>
          <text x="38" y="263" fontFamily="sans-serif" fontSize="8" fill="rgba(240,120,120,.35)" letterSpacing="1.5">AI INSIGHTS</text>
          <text x="38" y="280" fontFamily="sans-serif" fontSize="9.5" fill="rgba(255,255,255,.65)">&ldquo;Deal #A241 likely to close — follow up today&rdquo;</text>
          <text className="cr-blink" x="38" y="294" fontFamily="sans-serif" fontSize="9" fill="rgba(255,107,43,.7)">&ldquo;3 leads cold — AI re-engagement queued&rdquo;</text>

          <rect width="340" height="460" fill="url(#cr-fade)"/>
        </g>
      </svg>
    </>
  )
}
