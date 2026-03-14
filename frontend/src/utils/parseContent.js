/**
 * Parse content to extract code blocks and text
 * Supports markdown-style code blocks with language identification
 */
export const parseContent = (content, isAssistant) => {
  if (!isAssistant) {
    return {
      isAssistant: false,
      parts: [{ type: 'text', content }]
    }
  }

  const parts = []
  let remaining = content
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g

  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textBefore = content.substring(lastIndex, match.index).trim()
      if (textBefore) {
        parts.push({
          type: 'text',
          content: textBefore
        })
      }
    }

    // Add code block
    const language = match[1] || 'javascript'
    const code = match[2].trim()
    
    parts.push({
      type: 'code',
      language,
      content: code
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const textAfter = content.substring(lastIndex).trim()
    if (textAfter) {
      parts.push({
        type: 'text',
        content: textAfter
      })
    }
  }

  // If no code blocks found, treat entire content as text
  if (parts.length === 0) {
    parts.push({
      type: 'text',
      content
    })
  }

  return {
    isAssistant,
    parts
  }
}
