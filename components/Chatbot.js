import { useState, useEffect, useRef } from 'react'
import styles from './Chatbot.module.css'
import { track } from '../lib/analytics'

const QUICK = [
  { label: 'Our Services',  msg: 'Tell me about your services' },
  { label: 'Start a Project', msg: 'I want to start a project' },
  { label: 'Industries',    msg: 'What industries do you work with?' },
  { label: 'MVP Speed',     msg: 'How fast can you build an MVP?' },
]

const INITIAL_MSG = { 
  bot: true, 
  text: "👋 Hi! I'm Siya, CSharpTek's AI assistant. I can answer questions about our services or help you kick off a project. What brings you here today?" 
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([INITIAL_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')

  const messagesEndRef = useRef(null)

  // Initialize session and history on mount (client-side only)
  useEffect(() => {
    let id = sessionStorage.getItem('csharptek_chat_session_id')
    if (!id) {
      id = 'csharptek_chat_' + Math.random().toString(36).substring(2, 15)
      sessionStorage.setItem('csharptek_chat_session_id', id)
    }
    setSessionId(id)

    const savedMsgs = sessionStorage.getItem('csharptek_chat_history')
    if (savedMsgs) {
      try {
        setMsgs(JSON.parse(savedMsgs))
      } catch (e) {
        console.error('Error parsing chat history:', e)
      }
    }
  }, [])

  // Persist message history when it changes
  useEffect(() => {
    if (msgs.length > 1) {
      sessionStorage.setItem('csharptek_chat_history', JSON.stringify(msgs))
    }
  }, [msgs])

  // Scroll to bottom when messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading, open])

  const send = async (text) => {
    if (!text.trim() || loading) return
    
    // Add user message to state
    const userMsg = { bot: false, text }
    const updatedMsgs = [...msgs, userMsg]
    setMsgs(updatedMsgs)
    setInput('')
    setLoading(true)

    // Track analytics message sent
    if (typeof track?.chatbotMessage === 'function') {
      track.chatbotMessage()
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_message: text,
        }),
      })

      const data = await response.json()

      if (response.ok && data.agent_message) {
        setMsgs(prev => [...prev, { bot: true, text: data.agent_message }])
      } else {
        setMsgs(prev => [...prev, { bot: true, text: data.error || "I'm sorry, I encountered an issue. Please try again." }])
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setMsgs(prev => [...prev, { bot: true, text: 'Connection error. Please check your internet and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const resetChat = () => {
    if (confirm('Are you sure you want to reset your conversation?')) {
      sessionStorage.removeItem('csharptek_chat_history')
      const newId = 'csharptek_chat_' + Math.random().toString(36).substring(2, 15)
      sessionStorage.setItem('csharptek_chat_session_id', newId)
      setSessionId(newId)
      setMsgs([INITIAL_MSG])
    }
  }

  const toggleChat = () => {
    const nextState = !open
    setOpen(nextState)
    if (nextState && typeof track?.chatbotOpen === 'function') {
      track.chatbotOpen()
    }
  }

  return (
    <div className={styles.bubble}>
      {open && (
        <div className={styles.window}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              <img src="/tek-avatar.png" alt="Siya Avatar" className={styles.avatarImg} />
              <div className={styles.onlineBadge} />
            </div>
            <div className={styles.info}>
              <h4>Siya — CSharpTek AI</h4>
              <p>Ask me anything</p>
            </div>
            <div className={styles.headerActions}>
              <button 
                className={styles.resetBtn} 
                onClick={resetChat} 
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                🔄
              </button>
              <button 
                className={styles.closeBtn} 
                onClick={toggleChat} 
                title="Close chat"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className={styles.messages}>
            {msgs.map((m, i) => (
              <div key={i} className={`${styles.msgWrapper} ${m.bot ? styles.bot : styles.usr}`}>
                {m.bot && (
                  <img src="/tek-avatar.png" alt="Siya Avatar" className={styles.msgAvatar} />
                )}
                <div className={styles.bubble2}>{m.text}</div>
              </div>
            ))}
            
            {/* Loading / Typing Indicator */}
            {loading && (
              <div className={`${styles.msgWrapper} ${styles.bot}`}>
                <img src="/tek-avatar.png" alt="Siya Avatar" className={styles.msgAvatar} />
                <div className={styles.typingContainer}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className={styles.quick}>
            {QUICK.map(q => (
              <button 
                key={q.label} 
                className={styles.qBtn} 
                onClick={() => send(q.msg)}
                disabled={loading}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder={loading ? "Siya is typing..." : "Type a message..."}
              disabled={loading}
            />
            <button 
              className={styles.sendBtn} 
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        className={styles.toggle} 
        onClick={toggleChat} 
        aria-label="Toggle chat"
      >
        {open ? (
          <span className={styles.closeIcon}>✕</span>
        ) : (
          <img src="/tek-avatar.png" alt="Siya Avatar" className={styles.toggleImg} />
        )}
        {!open && <span className={styles.dot} />}
      </button>
    </div>
  )
}
