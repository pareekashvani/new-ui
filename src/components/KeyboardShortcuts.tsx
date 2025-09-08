'use client'

import { useEffect } from 'react'

interface KeyboardShortcutsProps {
  onSend: () => void
  onToggleTheme: () => void
  onFocusPrompt: () => void
}

export function KeyboardShortcuts({ onSend, onToggleTheme, onFocusPrompt }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter to send message
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        onSend()
      }
      
      // Cmd/Ctrl + K to focus prompt
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onFocusPrompt()
      }
      
      // Cmd/Ctrl + Shift + T to toggle theme
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault()
        onToggleTheme()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onSend, onToggleTheme, onFocusPrompt])

  return null
}
