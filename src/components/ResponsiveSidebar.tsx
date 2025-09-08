'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResponsiveSidebarProps {
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

export function ResponsiveSidebar({ children, isOpen, onToggle }: ResponsiveSidebarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={onToggle}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={onToggle}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={cn(
            'fixed left-0 top-0 h-full w-80 bg-surface-50 dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 z-50 transform transition-transform duration-300 ease-in-out md:hidden',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-4 space-y-6">
            {children}
          </div>
        </aside>
      </>
    )
  }

  // Desktop sidebar
  return (
    <aside className="w-80 bg-surface-50 dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 flex flex-col">
      <div className="p-4 space-y-6">
        {children}
      </div>
    </aside>
  )
}
