import React, { useState, useRef, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your offline code assistant. Ask me anything about generating code!' }
  ])
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (prompt) => {
    // Add user message
    const userMessageId = Date.now()
    setMessages(prev => [...prev, { id: userMessageId, role: 'user', content: prompt }])
    setLoading(true)

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()
      const assistantMessageId = Date.now() + 1
      
      setMessages(prev => [...prev, { 
        id: assistantMessageId, 
        role: 'assistant', 
        content: data.response 
      }])
    } catch (error) {
      const errorMessageId = Date.now() + 1
      setMessages(prev => [...prev, { 
        id: errorMessageId, 
        role: 'assistant', 
        content: `Error: ${error.message}` 
      }])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      { id: 1, role: 'assistant', content: 'Chat cleared. How can I help you?' }
    ])
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Offline Code AI</h1>
          <p>Local Copilot-style Assistant</p>
        </div>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>

      <main className="app-main">
        <ChatWindow messages={messages} loading={loading} scrollRef={scrollRef} />
      </main>

      <footer className="app-footer">
        <button className="clear-btn" onClick={clearChat}>Clear Chat</button>
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </footer>
    </div>
  )
}

export default App
