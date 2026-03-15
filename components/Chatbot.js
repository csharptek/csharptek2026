import { useState } from 'react'
import styles from './Chatbot.module.css'

const REPLIES = {
  'our services':   'We offer AI Integration, AI Voice Agents, Web & Mobile Development, Cloud & DevOps, MVP & Vibe Coding, Marketplace Publishing, Prompt Engineering, CRM Tools and 24/7 Support. Which interests you most?',
  'start a project':'Awesome! Tell me about your idea — what industry are you in and what are you trying to build? 🚀',
  'industries':     'We serve Healthcare (HIPAA/EHR), Wellness & Fertility, Education & EdTech, Marketing & Automation, Service Marketplaces, Pet Care and CRM & Productivity.',
  'mvp speed':      'With our Vibe Coding approach using Cursor, Lovable and Base44, we ship MVPs in 4–8 weeks. Our Spark package is designed exactly for this. 🚀',
  'default':        'Great question! Would you like to explore our services, or shall I connect you with our team for a free consultation? 😊',
}

function getReply(text) {
  const t = text.toLowerCase()
  for (const key in REPLIES) { if (t.includes(key)) return REPLIES[key] }
  return REPLIES['default']
}

const QUICK = [
  { label: 'Our Services',  msg: 'Tell me about your services' },
  { label: 'Start a Project', msg: 'I want to start a project' },
  { label: 'Industries',    msg: 'What industries do you work with?' },
  { label: 'MVP Speed',     msg: 'How fast can you build an MVP?' },
]

export default function Chatbot() {
  const [open,  setOpen]  = useState(false)
  const [msgs,  setMsgs]  = useState([{ bot: true, text: '👋 Hi! I\'m Tek, CSharpTek\'s AI assistant. I can answer questions about our services or help you kick off a project. What brings you here today?' }])
  const [input, setInput] = useState('')

  const addMsg = (text, isBot) => setMsgs(m => [...m, { bot: isBot, text }])

  const send = (text) => {
    if (!text.trim()) return
    addMsg(text, false)
    setInput('')
    setTimeout(() => addMsg(getReply(text), true), 800)
  }

  return (
    <div className={styles.bubble}>
      {open && (
        <div className={styles.window}>
          <div className={styles.header}>
            <div className={styles.avatar}>⚡</div>
            <div className={styles.info}>
              <h4>Tek — CSharpTek AI</h4>
              <p>Ask me anything or start a project</p>
            </div>
            <div className={styles.online} />
          </div>

          <div className={styles.messages}>
            {msgs.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.bot ? styles.bot : styles.usr}`}>
                <div className={styles.bubble2}>{m.text}</div>
              </div>
            ))}
          </div>

          <div className={styles.quick}>
            {QUICK.map(q => (
              <button key={q.label} className={styles.qBtn} onClick={() => send(q.msg)}>{q.label}</button>
            ))}
          </div>

          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Type a message..."
            />
            <button className={styles.sendBtn} onClick={() => send(input)}>➤</button>
          </div>
        </div>
      )}

      <button className={styles.toggle} onClick={() => setOpen(!open)} aria-label="Toggle chat">
        {open ? '✕' : '💬'}
        {!open && <span className={styles.dot} />}
      </button>
    </div>
  )
}
