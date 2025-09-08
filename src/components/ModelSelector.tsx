'use client'

import { useState } from 'react'
import { ChevronDown, Bot } from 'lucide-react'

interface Model {
  id: string
  name: string
  description: string
  provider: string
}

const models: Model[] = [
  { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model', provider: 'OpenAI' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient', provider: 'OpenAI' },
  { id: 'claude-3', name: 'Claude 3', description: 'Anthropic\'s latest model', provider: 'Anthropic' },
  { id: 'claude-2', name: 'Claude 2', description: 'Previous generation', provider: 'Anthropic' },
  { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google\'s advanced model', provider: 'Google' },
]

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const selectedModelData = models.find(m => m.id === selectedModel)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
        Model
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center space-x-3">
            <Bot className="h-4 w-4 text-primary-500" />
            <div className="text-left">
              <div className="text-sm font-medium text-surface-900 dark:text-white">
                {selectedModelData?.name}
              </div>
              <div className="text-xs text-surface-500 dark:text-surface-400">
                {selectedModelData?.provider}
              </div>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-surface-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-lg shadow-lg">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id)
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-surface-50 dark:hover:bg-surface-700 focus:outline-none focus:bg-surface-50 dark:focus:bg-surface-700 transition-colors duration-200"
                role="option"
                aria-selected={model.id === selectedModel}
              >
                <Bot className="h-4 w-4 text-primary-500" />
                <div>
                  <div className="text-sm font-medium text-surface-900 dark:text-white">
                    {model.name}
                  </div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">
                    {model.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
