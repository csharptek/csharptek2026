import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,'Segoe UI',sans-serif;background:#0d1117;color:#e6edf3;min-height:100vh;display:flex;align-items:center;justify-content:center;}
  .wrap{width:100%;max-width:380px;padding:24px;}
  .logo{text-align:center;margin-bottom:32px;}
  .logo-name{font-size:20px;font-weight:700;color:#fff;}
  .logo-sub{font-size:12px;color:#8b949e;margin-top:4px;}
  .card{background:#161b22;border:1px solid #21262d;border-radius:10px;padding:28px;}
  .card-title{font-size:16px;font-weight:600;color:#e6edf3;margin-bottom:20px;text-align:center;}
  .form-group{margin-bottom:16px;}
  .form-label{display:block;font-size:12px;font-weight:600;color:#8b949e;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em;}
  .form-input{width:100%;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:10px 12px;font-size:14px;color:#e6edf3;outline:none;transition:border .15s;}
  .form-input:focus{border-color:#58a6ff;}
  .btn{width:100%;background:#238636;color:#fff;border:none;border-radius:6px;padding:11px;font-size:14px;font-weight:600;cursor:pointer;transition:background .15s;margin-top:4px;}
  .btn:hover{background:#2ea043;}
  .btn:disabled{opacity:.6;cursor:not-allowed;}
  .error{background:#da363322;border:1px solid #da3633;color:#f85149;border-radius:6px;padding:10px 12px;font-size:13px;margin-bottom:14px;text-align:center;}
`

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      const data = await res.json()
      setError(data.error || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <>
      <Head><title>Login — CSharpTek Admin</title></Head>
      <style>{S}</style>
      <div className="wrap">
        <div className="logo">
          <div className="logo-name">CSharpTek Admin</div>
          <div className="logo-sub">Blog Management Panel</div>
        </div>
        <div className="card">
          <div className="card-title">🔐 Sign In</div>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const { isAuthenticated } = await import('../lib/auth')
  if (isAuthenticated(req)) return { redirect: { destination: '/dashboard', permanent: false } }
  return { props: {} }
}
