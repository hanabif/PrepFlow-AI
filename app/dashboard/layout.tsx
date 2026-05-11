'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { TopNav } from '@/components/dashboard/top-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + B to toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault()
        setSidebarCollapsed((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <TopNav sidebarCollapsed={sidebarCollapsed} />
      
      <main
        className={`pt-16 transition-all duration-200 ${
          sidebarCollapsed ? 'pl-[72px]' : 'pl-[260px]'
        }`}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
