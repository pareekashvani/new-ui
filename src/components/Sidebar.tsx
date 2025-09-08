'use client'

import { ReactNode } from 'react'

interface SidebarProps {
  children: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-80 sidebar flex flex-col">
      <div className="p-4 space-y-6">
        {children}
      </div>
    </aside>
  )
}
