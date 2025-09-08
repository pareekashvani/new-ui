'use client'

import { useState, forwardRef } from 'react'
import { Send, Save, FolderOpen, X } from 'lucide-react'

interface PromptTemplate {
  id: string
  name: string
  content: string
  createdAt: Date
}

const mockTemplates: PromptTemplate[] = [
  {
    id: '1',
    name: 'Code Review',
    content: 'Please review the following code and provide feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance optimizations\n4. Security considerations\n\nCode:\n',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Creative Writing',
    content: 'Write a creative story about a character who discovers they have the ability to...',
    createdAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Data Analysis',
    content: 'Analyze the following dataset and provide insights on:\n1. Key trends and patterns\n2. Statistical significance\n3. Recommendations for action\n\nData:\n',
    createdAt: new Date('2024-01-13')
  }
]

interface PromptEditorProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  onSend: () => void
}

export const PromptEditor = forwardRef<HTMLTextAreaElement, PromptEditorProps>(
  ({ prompt, onPromptChange, onSend }, ref) => {
  const [showTemplates, setShowTemplates] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [templateName, setTemplateName] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onSend()
    }
  }

  const loadTemplate = (template: PromptTemplate) => {
    onPromptChange(template.content)
    setShowTemplates(false)
  }

  const saveTemplate = () => {
    if (templateName.trim() && prompt.trim()) {
      // In a real app, this would save to the backend
      console.log('Saving template:', { name: templateName, content: prompt })
      setShowSaveDialog(false)
      setTemplateName('')
    }
  }

  return (
    <div className="border-t border-surface-200 dark:border-surface-700 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="btn-secondary flex items-center space-x-2"
              aria-label="Load template"
            >
              <FolderOpen className="h-4 w-4" />
              <span>Templates</span>
            </button>
            
            {prompt.trim() && (
              <button
                onClick={() => setShowSaveDialog(true)}
                className="btn-secondary flex items-center space-x-2"
                aria-label="Save as template"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            )}
          </div>
          
          <button
            onClick={onSend}
            disabled={!prompt.trim()}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>

        {showTemplates && (
          <div className="mb-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-surface-900 dark:text-white">Templates</h3>
              <button
                onClick={() => setShowTemplates(false)}
                className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700"
                aria-label="Close templates"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {mockTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => loadTemplate(template)}
                  className="w-full text-left p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                >
                  <div className="font-medium text-surface-900 dark:text-white">
                    {template.name}
                  </div>
                  <div className="text-sm text-surface-500 dark:text-surface-400 truncate">
                    {template.content.substring(0, 100)}...
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {showSaveDialog && (
          <div className="mb-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-surface-900 dark:text-white">Save Template</h3>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700"
                aria-label="Close save dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    saveTemplate()
                  }
                }}
              />
              <div className="flex space-x-2">
                <button
                  onClick={saveTemplate}
                  disabled={!templateName.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Template
                </button>
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here... (Cmd/Ctrl + Enter to send)"
            className="w-full h-32 input-field resize-none"
            aria-label="Prompt input"
            aria-describedby="prompt-help"
          />
          <div className="absolute bottom-2 right-2 text-xs text-surface-500 dark:text-surface-400">
            {prompt.length} characters
          </div>
        </div>
        <div id="prompt-help" className="sr-only">
          Use Cmd/Ctrl + Enter to send, Cmd/Ctrl + K to focus this field
        </div>
      </div>
    </div>
  )
})

PromptEditor.displayName = 'PromptEditor'
