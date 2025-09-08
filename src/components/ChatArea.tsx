'use client'

import { Copy, Download, User, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatAreaProps {
  messages: Message[]
}

export function ChatArea({ messages }: ChatAreaProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadAsJSON = () => {
    const dataStr = JSON.stringify(messages, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `ai-chat-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Bot className="h-16 w-16 text-surface-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">
            Start a conversation
          </h3>
          <p className="text-surface-500 dark:text-surface-400">
            Enter a prompt below to begin chatting with the AI
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
            Conversation
          </h2>
          {messages.length > 0 && (
            <button
              onClick={downloadAsJSON}
              className="btn-secondary flex items-center space-x-2"
              aria-label="Download conversation as JSON"
            >
              <Download className="h-4 w-4" />
              <span>Download JSON</span>
            </button>
          )}
        </div>
        
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex space-x-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex space-x-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                }`}>
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div
                    className={`p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-surface-500 dark:text-surface-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200"
                      aria-label="Copy message"
                    >
                      <Copy className="h-3 w-3 text-surface-500 dark:text-surface-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
