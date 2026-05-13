export default function MarketplaceCard() {
  return (
    <>
      <style>{`
        @keyframes mk-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        @keyframes mk-shimmer{0%,100%{opacity:.12}50%{opacity:.4}}
        @keyframes mk-flow{0%{stroke-dashoffset:16}100%{stroke-dashoffset:0}}
        @keyframes mk-count{0%,100%{opacity:.8}50%{opacity:1}}
        .mk-dot{animation:mk-pulse 1.5s ease-in-out infinite;transform-origin:center}
        .mk-sh1{animation:mk-shimmer 2.5s ease-in-out infinite}
        .mk-sh2{animation:mk-shimmer 2.5s ease-in-out infinite .55s}
        .mk-flow{animation:mk-flow 1.2s linear infinite;stroke-dasharray:4 3}
        .mk-count{animation:mk-count 3s ease-in-out infinite}
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <linearGradient id="mk-bg" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0%" stopColor="#071a1a"/>
            <stop offset="100%" stopColor="#030a0a"/>
          </linearGradient>
          <linearGradient id="mk-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#030a0a" stopOpacity="0"/>
            <stop offset="55%" stopColor="#030a0a" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#020707" stopOpacity="1"/>
          </linearGradient>
          <clipPath id="mk-clip"><rect width="340" height="460" rx="16"/></clipPath>
        </defs>
        <g clipPath="url(#mk-clip)">
          <rect width="340" height="460" fill="url(#mk-bg)"/>
          <circle cx="280" cy="90" r="140" fill="#0a6a6a" fillOpacity=".15"/>

          {/* Header */}
          <rect x="24" y="32" width="90" height="26" rx="7" fill="rgba(10,160,160,.1)" stroke="rgba(10,160,160,.3)" strokeWidth=".5"/>
          <circle className="mk-dot" cx="38" cy="45" r="4" fill="#0aacac"/>
          <text x="48" y="49" fontFamily="sans-serif" fontSize="9" fill="#0aacac" fontWeight="700">● MARKETPLACE</text>

          {/* Product cards */}
          <rect x="24" y="72" width="84" height="74" rx="9" fill="rgba(4,15,15,.8)" stroke="rgba(10,160,160,.2)" strokeWidth=".5"/>
          <rect x="34" y="80" width="64" height="36" rx="5" fill="rgba(10,160,160,.1)"/>
          <text x="66" y="104" fontFamily="sans-serif" fontSize="8" fill="rgba(100,220,220,.45)" textAnchor="middle">Product</text>
          <text x="40" y="134" fontFamily="sans-serif" fontSize="9.5" fill="#64dcdc" fontWeight="600">$29.99</text>

          <rect x="116" y="72" width="84" height="74" rx="9" fill="rgba(4,15,15,.8)" stroke="rgba(10,160,160,.2)" strokeWidth=".5"/>
          <rect x="126" y="80" width="64" height="36" rx="5" fill="rgba(10,160,160,.1)"/>
          <text x="158" y="104" fontFamily="sans-serif" fontSize="8" fill="rgba(100,220,220,.45)" textAnchor="middle">Service</text>
          <text x="130" y="134" fontFamily="sans-serif" fontSize="9.5" fill="#64dcdc" fontWeight="600">$149/mo</text>

          <rect x="208" y="72" width="108" height="74" rx="9" fill="rgba(4,15,15,.8)" stroke="rgba(255,107,43,.2)" strokeWidth=".5"/>
          <rect x="218" y="80" width="88" height="36" rx="5" fill="rgba(255,107,43,.08)"/>
          <text x="262" y="104" fontFamily="sans-serif" fontSize="8" fill="rgba(255,160,100,.5)" textAnchor="middle">Featured ★</text>
          <text x="218" y="134" fontFamily="sans-serif" fontSize="9.5" fill="#FF6B2B" fontWeight="600">$89.00</text>

          {/* Payment flow */}
          <rect x="24" y="160" width="292" height="46" rx="10" fill="rgba(4,15,15,.8)" stroke="rgba(10,160,160,.12)" strokeWidth=".5"/>
          <text x="38" y="178" fontFamily="sans-serif" fontSize="8" fill="rgba(100,220,220,.35)" letterSpacing="1.5">PAYMENT FLOW</text>
          <rect x="38" y="185" width="54" height="14" rx="4" fill="rgba(10,160,160,.2)"/>
          <text x="65" y="196" fontFamily="sans-serif" fontSize="8" fill="#64dcdc" textAnchor="middle">Checkout</text>
          <line className="mk-flow" x1="92" y1="192" x2="108" y2="192" stroke="rgba(10,160,160,.6)" strokeWidth="1.5"/>
          <rect x="108" y="185" width="54" height="14" rx="4" fill="rgba(10,160,160,.2)"/>
          <text x="135" y="196" fontFamily="sans-serif" fontSize="8" fill="#64dcdc" textAnchor="middle">Stripe</text>
          <line className="mk-flow" x1="162" y1="192" x2="178" y2="192" stroke="rgba(10,160,160,.6)" strokeWidth="1.5"/>
          <rect x="178" y="185" width="66" height="14" rx="4" fill="rgba(74,222,128,.15)" stroke="rgba(74,222,128,.3)" strokeWidth=".5"/>
          <text x="211" y="196" fontFamily="sans-serif" fontSize="8" fill="#4ade80" textAnchor="middle" fontWeight="600">✓ Paid</text>

          {/* Shimmer */}
          <rect className="mk-sh1" x="24" y="220" width="292" height="5" rx="2" fill="rgba(10,160,160,.3)"/>
          <rect className="mk-sh2" x="24" y="231" width="210" height="5" rx="2" fill="rgba(10,160,160,.2)"/>

          {/* Revenue + Vendors */}
          <rect x="24" y="250" width="138" height="58" rx="10" fill="rgba(4,15,15,.8)" stroke="rgba(10,160,160,.12)" strokeWidth=".5"/>
          <text x="93" y="269" fontFamily="sans-serif" fontSize="8" fill="rgba(100,220,220,.35)" textAnchor="middle" letterSpacing="1">TODAY</text>
          <text className="mk-count" x="93" y="293" fontFamily="sans-serif" fontSize="22" fill="#64dcdc" textAnchor="middle" fontWeight="800">$4,280</text>
          <text x="93" y="306" fontFamily="sans-serif" fontSize="8" fill="rgba(74,222,128,.55)" textAnchor="middle">↑ 18% vs yesterday</text>

          <rect x="178" y="250" width="138" height="58" rx="10" fill="rgba(4,15,15,.8)" stroke="rgba(10,160,160,.1)" strokeWidth=".5"/>
          <text x="190" y="269" fontFamily="sans-serif" fontSize="8" fill="rgba(100,220,220,.35)" letterSpacing="1">VENDORS</text>
          <text x="190" y="286" fontFamily="sans-serif" fontSize="8.5" fill="rgba(100,220,220,.55)">Active sellers</text>
          <text x="302" y="286" fontFamily="sans-serif" fontSize="9" fill="#64dcdc" textAnchor="end" fontWeight="600">142</text>
          <text x="190" y="300" fontFamily="sans-serif" fontSize="8.5" fill="rgba(100,220,220,.55)">Pending</text>
          <text x="302" y="300" fontFamily="sans-serif" fontSize="9" fill="#fbbf24" textAnchor="end" fontWeight="600">7</text>

          <rect width="340" height="460" fill="url(#mk-fade)"/>
        </g>
      </svg>
    </>
  )
}
