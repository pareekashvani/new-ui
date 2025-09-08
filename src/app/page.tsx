'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import { ResponsiveSidebar } from '@/components/ResponsiveSidebar'
import { MainContent } from '@/components/MainContent'
import { ChatArea } from '@/components/ChatArea'
import { ParametersPanel } from '@/components/ParametersPanel'
import { PromptEditor } from '@/components/PromptEditor'
import { ModelSelector } from '@/components/ModelSelector'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts'
import { useTheme } from '@/components/ThemeProvider'

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('gpt-4')
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Array<{id: string, role: 'user' | 'assistant', content: string, timestamp: Date}>>([])
  const [parameters, setParameters] = useState({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  })
  const { toggleTheme } = useTheme()
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSendMessage = async () => {
    if (!prompt.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: prompt,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setPrompt('')

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: `This is a simulated response to: "${prompt}". In a real implementation, this would be the actual AI model response based on the selected model and parameters.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  const focusPrompt = () => {
    promptRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-900">
      <KeyboardShortcuts 
        onSend={handleSendMessage}
        onToggleTheme={toggleTheme}
        onFocusPrompt={focusPrompt}
      />
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <ResponsiveSidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        >
          <ModelSelector 
            selectedModel={selectedModel} 
            onModelChange={setSelectedModel} 
          />
          <ParametersPanel 
            parameters={parameters} 
            onParametersChange={setParameters} 
          />
        </ResponsiveSidebar>
        <MainContent>
          <ChatArea messages={messages} />
          <PromptEditor 
            ref={promptRef}
            prompt={prompt}
            onPromptChange={setPrompt}
            onSend={handleSendMessage}
          />
        </MainContent>
      </div>
    </div>
  )
}
