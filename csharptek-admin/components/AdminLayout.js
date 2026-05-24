import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/posts', icon: '📝', label: 'Blog Posts' },
  { href: '/comments', icon: '💬', label: 'Comments' },
  { href: '/authors', icon: '👤', label: 'Authors' },
  { href: '/images', icon: '🖼️', label: 'Images' },
  { href: '/settings', icon: '⚙️', label: 'Settings' },
]

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,'Segoe UI',sans-serif;background:#0d1117;color:#e6edf3;overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}
  button{cursor:pointer;font-family:inherit;}
  input,textarea,select{font-family:inherit;}

  .layout{display:flex;min-height:100vh;}
  .sidebar{width:220px;background:#161b22;border-right:1px solid #21262d;display:flex;flex-direction:column;flex-shrink:0;position:fixed;top:0;left:0;height:100vh;z-index:100;}
  .sidebar-logo{padding:20px 20px 16px;border-bottom:1px solid #21262d;}
  .logo-text{font-size:15px;font-weight:700;color:#fff;}
  .logo-sub{font-size:10px;color:#8b949e;margin-top:2px;}
  .sidebar-nav{flex:1;padding:12px 8px;overflow-y:auto;}
  .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:6px;font-size:13px;font-weight:500;color:#8b949e;transition:all .15s;margin-bottom:2px;}
  .nav-item:hover{background:#21262d;color:#e6edf3;}
  .nav-item.active{background:#1f6feb22;color:#58a6ff;border:1px solid #1f6feb44;}
  .nav-icon{font-size:15px;width:18px;text-align:center;}
  .sidebar-footer{padding:12px 8px;border-top:1px solid #21262d;}
  .logout-btn{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:6px;font-size:13px;font-weight:500;color:#f85149;background:none;border:none;width:100%;transition:background .15s;}
  .logout-btn:hover{background:#f8514914;}

  .main{margin-left:220px;flex:1;display:flex;flex-direction:column;min-height:100vh;}
  .topbar{background:#161b22;border-bottom:1px solid #21262d;padding:14px 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
  .page-title{font-size:16px;font-weight:600;color:#e6edf3;}
  .topbar-right{display:flex;align-items:center;gap:12px;}
  .badge{font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px;background:#1f6feb22;color:#58a6ff;border:1px solid #1f6feb44;}
  .content{padding:28px;flex:1;}

  @media(max-width:768px){
    .sidebar{transform:translateX(-100%);transition:transform .25s;}
    .sidebar.open{transform:translateX(0);}
    .main{margin-left:0;}
  }
`

async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/login'
}

export default function AdminLayout({ children, title, actions }) {
  const router = useRouter()

  return (
    <>
      <style>{S}</style>
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-text">CSharpTek</div>
            <div className="logo-sub">Blog Admin Panel</div>
          </div>
          <nav className="sidebar-nav">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${router.pathname.startsWith(item.href) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={logout}>
              <span className="nav-icon">🚪</span> Logout
            </button>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="page-title">{title}</div>
            <div className="topbar-right">
              <span className="badge">Admin</span>
              {actions}
            </div>
          </div>
          <div className="content">{children}</div>
        </main>
      </div>
    </>
  )
}
