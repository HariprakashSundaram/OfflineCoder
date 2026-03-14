import React from 'react'
import Message from './Message'
import './ChatWindow.css'

function ChatWindow({ messages, loading, scrollRef }) {
  return (
    <div className="chat-window" ref={scrollRef}>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Thinking...</p>
        </div>
      )}
    </div>
  )
}

export default ChatWindow
