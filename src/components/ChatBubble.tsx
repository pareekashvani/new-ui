'use client'

import { Copy, User, Bot } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  onCopy?: (content: string) => void
}

export function ChatBubble({ role, content, timestamp, onCopy }: ChatBubbleProps) {
  const handleCopy = () => {
    if (onCopy) {
      onCopy(content)
    } else {
      navigator.clipboard.writeText(content)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex space-x-3 ${
        role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex space-x-3 max-w-[80%] ${
          role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          role === 'user' 
            ? 'bg-primary-500 text-white' 
            : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
        }`}>
          {role === 'user' ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </div>
        
        {/* Message Content */}
        <div className="flex-1">
          <div
            className={`p-4 rounded-lg ${
              role === 'user'
                ? 'bg-primary-500 text-white'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-white'
            }`}
          >
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
          
          {/* Timestamp and Actions */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-surface-500 dark:text-surface-400">
              {timestamp.toLocaleTimeString()}
            </span>
            
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200"
              aria-label="Copy message"
            >
              <Copy className="h-3 w-3 text-surface-500 dark:text-surface-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
