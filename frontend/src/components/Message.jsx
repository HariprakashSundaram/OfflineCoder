import React from 'react'
import CodeBlock from './CodeBlock'
import { parseContent } from '../utils/parseContent'
import './Message.css'

function Message({ message }) {
  const { isAssistant, parts } = parseContent(message.content, message.role === 'assistant')

  return (
    <div className={`message message-${message.role}`}>
      <div className="message-bubble">
        {parts.map((part, idx) => (
          <div key={idx}>
            {part.type === 'text' && <p className="message-text">{part.content}</p>}
            {part.type === 'code' && (
              <CodeBlock code={part.content} language={part.language} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Message
