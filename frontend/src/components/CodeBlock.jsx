import React, { useState, useEffect } from 'react'
import { CopyIcon, CheckIcon, FormatIcon } from './Icons'
import './CodeBlock.css'

function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false)
  const [formatted, setFormatted] = useState(code)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleFormat = () => {
    // Simple formatting: add line numbers mentally
    const lines = formatted.split('\n')
    const maxLineNum = lines.length.toString().length
    
    const formattedCode = lines
      .map((line, idx) => {
        const lineNum = (idx + 1).toString().padStart(maxLineNum, ' ')
        return `${lineNum} | ${line}`
      })
      .join('\n')
    
    setFormatted(formattedCode)
  }

  const handleRemoveFormat = () => {
    setFormatted(code)
  }

  const hasLineNumbers = formatted !== code && formatted.includes('|')

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="language-tag">{language}</span>
        <div className="code-actions">
          <button 
            className="code-btn" 
            onClick={hasLineNumbers ? handleRemoveFormat : handleFormat}
            title={hasLineNumbers ? "Remove line numbers" : "Add line numbers"}
          >
            <FormatIcon />
          </button>
          <button 
            className="code-btn copy-btn" 
            onClick={handleCopy}
            title="Copy code"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span className="copy-text">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
      <pre className="code-content">
        <code className={`language-${language}`}>
          {formatted}
        </code>
      </pre>
    </div>
  )
}

export default CodeBlock
