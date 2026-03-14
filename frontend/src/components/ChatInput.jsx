import React, { useState, useRef, useEffect } from 'react'
import { SendIcon } from './Icons'
import './ChatInput.css'

function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything... (Shift+Enter for new line)"
        disabled={disabled}
        rows="1"
      />
      <button 
        className="send-btn" 
        type="submit" 
        disabled={disabled || !input.trim()}
      >
        <SendIcon />
      </button>
    </form>
  )
}

export default ChatInput
