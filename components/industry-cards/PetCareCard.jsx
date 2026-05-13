export default function PetCareCard() {
  return (
    <>
      <style>{`
        @keyframes pc-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        @keyframes pc-shimmer{0%,100%{opacity:.12}50%{opacity:.4}}
        @keyframes pc-scan{0%{opacity:.3;transform:translateY(0)}50%{opacity:.9;transform:translateY(20px)}100%{opacity:.3;transform:translateY(0)}}
        .pc-dot{animation:pc-pulse 1.5s ease-in-out infinite;transform-origin:center}
        .pc-sh1{animation:pc-shimmer 2.6s ease-in-out infinite}
        .pc-sh2{animation:pc-shimmer 2.6s ease-in-out infinite .5s}
        .pc-scan{animation:pc-scan 2.5s ease-in-out infinite}
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <linearGradient id="pc-bg" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0%" stopColor="#0a1a06"/>
            <stop offset="100%" stopColor="#040a02"/>
          </linearGradient>
          <linearGradient id="pc-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#040a02" stopOpacity="0"/>
            <stop offset="55%" stopColor="#040a02" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#030702" stopOpacity="1"/>
          </linearGradient>
          <clipPath id="pc-clip"><rect width="340" height="460" rx="16"/></clipPath>
        </defs>
        <g clipPath="url(#pc-clip)">
          <rect width="340" height="460" fill="url(#pc-bg)"/>
          <circle cx="280" cy="90" r="140" fill="#3a6a0a" fillOpacity=".15"/>

          {/* Header */}
          <rect x="24" y="32" width="100" height="26" rx="7" fill="rgba(80,160,20,.1)" stroke="rgba(80,160,20,.3)" strokeWidth=".5"/>
          <circle className="pc-dot" cx="38" cy="45" r="4" fill="#6ab420"/>
          <text x="48" y="49" fontFamily="sans-serif" fontSize="9" fill="#6ab420" fontWeight="700">● PET KIOSK</text>

          {/* RFID scan block */}
          <rect x="24" y="72" width="292" height="72" rx="10" fill="rgba(6,15,4,.8)" stroke="rgba(80,160,20,.15)" strokeWidth=".5"/>
          <text x="38" y="91" fontFamily="sans-serif" fontSize="8" fill="rgba(140,220,80,.4)" letterSpacing="1.5">RFID SCAN</text>
          <rect x="38" y="100" width="44" height="36" rx="8" fill="rgba(80,160,20,.12)" stroke="rgba(80,160,20,.25)" strokeWidth=".5"/>
          <rect className="pc-scan" x="38" y="100" width="44" height="4" rx="2" fill="rgba(106,180,32,.7)"/>
          <text x="60" y="124" fontFamily="sans-serif" fontSize="11" textAnchor="middle">🐕</text>
          <text x="94" y="108" fontFamily="sans-serif" fontSize="11" fill="#8cdc50" fontWeight="700">Max — Golden Retriever</text>
          <text x="94" y="122" fontFamily="sans-serif" fontSize="8.5" fill="rgba(140,220,80,.55)">RFID: #A4F2-9812  ·  Age: 3yr</text>
          <text x="94" y="136" fontFamily="sans-serif" fontSize="8.5" fill="rgba(140,220,80,.4)">Last visit: 14 days ago</text>

          {/* Vaccination status */}
          <rect x="24" y="158" width="292" height="56" rx="10" fill="rgba(6,15,4,.8)" stroke="rgba(80,160,20,.12)" strokeWidth=".5"/>
          <text x="38" y="176" fontFamily="sans-serif" fontSize="8" fill="rgba(140,220,80,.4)" letterSpacing="1.5">VACCINATION STATUS</text>
          <rect x="38" y="183" width="68" height="18" rx="5" fill="rgba(74,222,128,.12)" stroke="rgba(74,222,128,.3)" strokeWidth=".5"/>
          <text x="72" y="196" fontFamily="sans-serif" fontSize="8" fill="#4ade80" textAnchor="middle" fontWeight="600">Rabies ✓</text>
          <rect x="114" y="183" width="68" height="18" rx="5" fill="rgba(74,222,128,.12)" stroke="rgba(74,222,128,.3)" strokeWidth=".5"/>
          <text x="148" y="196" fontFamily="sans-serif" fontSize="8" fill="#4ade80" textAnchor="middle" fontWeight="600">DHPP ✓</text>
          <rect x="190" y="183" width="76" height="18" rx="5" fill="rgba(251,191,36,.1)" stroke="rgba(251,191,36,.3)" strokeWidth=".5"/>
          <text x="228" y="196" fontFamily="sans-serif" fontSize="8" fill="#fbbf24" textAnchor="middle" fontWeight="600">Bordetella ~</text>
          <text x="38" y="208" fontFamily="sans-serif" fontSize="8" fill="rgba(140,220,80,.35)">Next due: Bordetella — Aug 2025</text>

          {/* Shimmer */}
          <rect className="pc-sh1" x="24" y="228" width="292" height="5" rx="2" fill="rgba(80,160,20,.3)"/>
          <rect className="pc-sh2" x="24" y="239" width="200" height="5" rx="2" fill="rgba(80,160,20,.2)"/>

          {/* Stats */}
          <rect x="24" y="258" width="138" height="52" rx="10" fill="rgba(6,15,4,.8)" stroke="rgba(80,160,20,.12)" strokeWidth=".5"/>
          <text x="93" y="277" fontFamily="sans-serif" fontSize="8" fill="rgba(140,220,80,.35)" textAnchor="middle" letterSpacing="1">CHECK-IN TIME</text>
          <text x="93" y="298" fontFamily="sans-serif" fontSize="22" fill="#8cdc50" textAnchor="middle" fontWeight="800">4:32</text>
          <text x="93" y="308" fontFamily="sans-serif" fontSize="8" fill="rgba(140,220,80,.4)" textAnchor="middle">minutes avg</text>

          <rect x="178" y="258" width="138" height="52" rx="10" fill="rgba(6,15,4,.8)" stroke="rgba(80,160,20,.1)" strokeWidth=".5"/>
          <text x="190" y="277" fontFamily="sans-serif" fontSize="8" fill="rgba(140,220,80,.35)" letterSpacing="1">TODAY</text>
          <text x="190" y="294" fontFamily="sans-serif" fontSize="8.5" fill="rgba(140,220,80,.55)">Check-ins</text>
          <text x="302" y="294" fontFamily="sans-serif" fontSize="9" fill="#8cdc50" textAnchor="end" fontWeight="600">38 pets</text>
          <text x="190" y="308" fontFamily="sans-serif" fontSize="8.5" fill="rgba(140,220,80,.55)">Vaccines given</text>
          <text x="302" y="308" fontFamily="sans-serif" fontSize="9" fill="#4ade80" textAnchor="end" fontWeight="600">22</text>

          <rect width="340" height="460" fill="url(#pc-fade)"/>
        </g>
      </svg>
    </>
  )
}
