'use client'

import { useTheme } from './ThemeProvider'
import { Sun, Moon, Bot } from 'lucide-react'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-16 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between px-6">
      <div className="flex items-center space-x-3">
        <Bot className="h-8 w-8 text-primary-500" />
        <h1 className="text-xl font-semibold text-surface-900 dark:text-white">
          AI Interface
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-surface-800"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-surface-600 dark:text-surface-400" />
          ) : (
            <Sun className="h-5 w-5 text-surface-600 dark:text-surface-400" />
          )}
        </button>
      </div>
    </header>
  )
}
