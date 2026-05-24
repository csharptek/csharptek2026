import Head from 'next/head'
import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { S_SHARED } from '../components/UI'

const SECTIONS = [
  {
    title: '☁️ Azure Blob Storage',
    desc: 'For blog image uploads',
    fields: [
      { key: 'azure_storage_account', label: 'Storage Account Name', placeholder: 'myaccount' },
      { key: 'azure_storage_key', label: 'Storage Account Key', placeholder: '••••', type: 'password' },
      { key: 'azure_container_name', label: 'Container Name', placeholder: 'blog-images' },
    ]
  },
  {
    title: '📧 Microsoft Graph (Email)',
    desc: 'For comment notification emails',
    fields: [
      { key: 'microsoft_tenant_id', label: 'Tenant ID', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
      { key: 'microsoft_client_id', label: 'Client ID', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
      { key: 'microsoft_client_secret', label: 'Client Secret', placeholder: '••••', type: 'password' },
      { key: 'microsoft_sender_email', label: 'Sender Email', placeholder: 'noreply@csharptek.com' },
    ]
  },
  {
    title: '🔔 Notifications',
    desc: 'Where to send alerts',
    fields: [
      { key: 'comment_notify_email', label: 'Comment Notification Email', placeholder: 'info@csharptek.com' },
    ]
  }
]

export default function Settings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { setSettings(d.settings || {}); setLoading(false) })
  }, [])

  function set(key, val) { setSettings(s => ({ ...s, [key]: val })) }

  async function handleSave() {
    setSaving(true)
    setError('')
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings })
    })
    if (res.ok) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError('Failed to save settings')
    }
    setSaving(false)
  }

  return (
    <AdminLayout title="Settings">
      <Head><title>Settings — CSharpTek Admin</title></Head>
      <style>{`${S_SHARED}
        .settings-grid{display:flex;flex-direction:column;gap:20px;max-width:680px;}
        .section{background:#161b22;border:1px solid #21262d;border-radius:8px;padding:24px;}
        .section-head{margin-bottom:20px;}
        .section-title{font-size:14px;font-weight:700;color:#e6edf3;margin-bottom:4px;}
        .section-desc{font-size:12px;color:#8b949e;}
        .env-note{background:#1f6feb11;border:1px solid #1f6feb33;border-radius:6px;padding:12px 14px;font-size:12px;color:#58a6ff;margin-top:8px;}
      `}</style>

      {loading ? <div style={{color:'#8b949e'}}>Loading...</div> : (
        <>
          {success && <div className="alert alert-success" style={{maxWidth:680}}>✓ Settings saved</div>}
          {error && <div className="alert alert-error" style={{maxWidth:680}}>{error}</div>}

          <div className="settings-grid">
            {SECTIONS.map(section => (
              <div key={section.title} className="section">
                <div className="section-head">
                  <div className="section-title">{section.title}</div>
                  <div className="section-desc">{section.desc}</div>
                </div>
                {section.fields.map(field => (
                  <div key={field.key} className="form-group">
                    <label className="form-label">{field.label}</label>
                    <input
                      className="form-input"
                      type={field.type || 'text'}
                      value={settings[field.key] || ''}
                      onChange={e => set(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      autoComplete="off"
                    />
                  </div>
                ))}
              </div>
            ))}

            <div className="section">
              <div className="section-head">
                <div className="section-title">🔐 Railway Environment Variables</div>
                <div className="section-desc">These must be set in Railway for the admin app</div>
              </div>
              <div className="env-note">
                <strong>Required env vars on Railway (csharptek-admin service):</strong><br /><br />
                <code>DATABASE_URL</code> — PostgreSQL connection string<br />
                <code>ADMIN_PASSWORD</code> — Your admin login password<br />
                <code>JWT_SECRET</code> — Random secret string for session tokens<br />
                <code>ADMIN_URL</code> — Full URL of this admin app (for email links)
              </div>
              <div className="env-note" style={{marginTop:10,borderColor:'#238636',background:'#23863611',color:'#2ea043'}}>
                <strong>Required env vars on Railway (csharptek2026 service):</strong><br /><br />
                <code>DATABASE_URL</code> — Same PostgreSQL connection string<br />
                <code>MICROSOFT_TENANT_ID</code>, <code>MICROSOFT_CLIENT_ID</code>,<br />
                <code>MICROSOFT_CLIENT_SECRET</code>, <code>MICROSOFT_SENDER_EMAIL</code>
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{alignSelf:'flex-start',padding:'10px 24px',fontSize:14}}>
              {saving ? 'Saving...' : '💾 Save Settings'}
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export async function getServerSideProps({ req }) {
  const { isAuthenticated } = await import('../lib/auth')
  if (!isAuthenticated(req)) return { redirect: { destination: '/login', permanent: false } }
  return { props: {} }
}
