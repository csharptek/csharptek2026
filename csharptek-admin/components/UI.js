// Shared small UI pieces

export const S_SHARED = `
  .btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;border:none;transition:all .15s;cursor:pointer;}
  .btn-primary{background:#238636;color:#fff;}
  .btn-primary:hover{background:#2ea043;}
  .btn-danger{background:#da3633;color:#fff;}
  .btn-danger:hover{background:#f85149;}
  .btn-secondary{background:#21262d;color:#e6edf3;border:1px solid #30363d;}
  .btn-secondary:hover{background:#30363d;}
  .btn-warning{background:#9e6a03;color:#fff;}
  .btn-warning:hover{background:#bb8009;}
  .btn-sm{padding:5px 12px;font-size:12px;}
  .btn:disabled{opacity:.5;cursor:not-allowed;}

  .card{background:#161b22;border:1px solid #21262d;border-radius:8px;padding:20px;}
  .card-title{font-size:13px;font-weight:600;color:#8b949e;text-transform:uppercase;letter-spacing:.05em;margin-bottom:16px;}

  .table{width:100%;border-collapse:collapse;}
  .table th{font-size:11px;font-weight:600;color:#8b949e;text-transform:uppercase;letter-spacing:.05em;padding:10px 12px;border-bottom:1px solid #21262d;text-align:left;}
  .table td{padding:12px;border-bottom:1px solid #21262d;font-size:13px;color:#e6edf3;vertical-align:middle;}
  .table tr:last-child td{border-bottom:none;}
  .table tr:hover td{background:#21262d22;}

  .badge-status{display:inline-block;font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;letter-spacing:.05em;}
  .badge-published{background:#238636;color:#fff;}
  .badge-draft{background:#30363d;color:#8b949e;}
  .badge-approved{background:#238636;color:#fff;}
  .badge-pending{background:#9e6a03;color:#fff;}

  .form-group{margin-bottom:18px;}
  .form-label{display:block;font-size:12px;font-weight:600;color:#8b949e;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em;}
  .form-input{width:100%;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:9px 12px;font-size:13px;color:#e6edf3;outline:none;transition:border .15s;}
  .form-input:focus{border-color:#58a6ff;}
  .form-input::placeholder{color:#6e7681;}
  .form-select{width:100%;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:9px 12px;font-size:13px;color:#e6edf3;outline:none;}
  .form-textarea{width:100%;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:9px 12px;font-size:13px;color:#e6edf3;outline:none;resize:vertical;min-height:100px;transition:border .15s;}
  .form-textarea:focus{border-color:#58a6ff;}
  .form-hint{font-size:11px;color:#6e7681;margin-top:4px;}

  .alert{padding:12px 16px;border-radius:6px;font-size:13px;margin-bottom:16px;}
  .alert-success{background:#238636;color:#fff;}
  .alert-error{background:#da363322;border:1px solid #da3633;color:#f85149;}
  .alert-info{background:#1f6feb22;border:1px solid #1f6feb44;color:#58a6ff;}

  .stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;margin-bottom:24px;}
  .stat-card{background:#161b22;border:1px solid #21262d;border-radius:8px;padding:18px;}
  .stat-val{font-size:28px;font-weight:700;color:#e6edf3;margin-bottom:4px;}
  .stat-lbl{font-size:12px;color:#8b949e;}

  .empty{text-align:center;padding:48px 24px;color:#8b949e;}
  .empty-icon{font-size:36px;margin-bottom:12px;}
  .empty-text{font-size:14px;}

  .flex{display:flex;}
  .items-center{align-items:center;}
  .gap-8{gap:8px;}
  .gap-12{gap:12px;}
  .justify-between{justify-content:space-between;}
  .mb-16{margin-bottom:16px;}
  .mb-24{margin-bottom:24px;}
  .text-muted{color:#8b949e;}
  .text-sm{font-size:12px;}
`

export function StatusBadge({ status }) {
  const map = {
    published: 'badge-published',
    draft: 'badge-draft',
    approved: 'badge-approved',
    pending: 'badge-pending',
  }
  return <span className={`badge-status ${map[status] || 'badge-draft'}`}>{status}</span>
}

export function EmptyState({ icon = '📭', text = 'Nothing here yet' }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <div className="empty-text">{text}</div>
    </div>
  )
}
