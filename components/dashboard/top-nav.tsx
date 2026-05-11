'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Bell,
  Command,
  X,
  PlayCircle,
  FileText,
  Settings,
  User,
  ChevronDown,
  LogOut,
  Loader2,
} from 'lucide-react'
import { mockUser } from '@/lib/mock-data'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface TopNavProps {
  sidebarCollapsed: boolean
}

export function TopNav({ sidebarCollapsed }: TopNavProps) {
  const router = useRouter()
  const supabase = createClient()
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userName, setUserName] = useState(mockUser.name)
  const [userEmail, setUserEmail] = useState(mockUser.email)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'User')
          setUserEmail(user.email || '')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [supabase])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
      setIsLoggingOut(false)
    }
  }

  const notifications = [
    { id: 1, title: 'Interview streak achieved!', description: 'You completed 12 days in a row', time: '2m ago', unread: true },
    { id: 2, title: 'New feedback available', description: 'Your technical interview has been analyzed', time: '1h ago', unread: true },
    { id: 3, title: 'Weekly report ready', description: 'Check your progress for this week', time: '3h ago', unread: false },
  ]

  const commandItems = [
    { icon: PlayCircle, label: 'Start Interview', href: '/dashboard/interview' },
    { icon: FileText, label: 'View History', href: '/dashboard/history' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
  ]

  const filteredCommands = commandItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <header
        className={`fixed top-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border z-30 transition-all duration-200 ${
          sidebarCollapsed ? 'left-[72px]' : 'left-[260px]'
        }`}
      >
        <div className="h-full px-6 flex items-center justify-between">
          {/* Search / Command */}
          <button
            onClick={() => setShowCommandPalette(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground text-sm transition-colors w-64"
          >
            <Search className="w-4 h-4" />
            <span>Search or command...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded bg-background border border-border text-xs">
              <Command className="w-3 h-3 inline" />K
            </kbd>
          </button>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Quick Start Interview */}
            <Link href="/dashboard/interview">
              <Button size="sm" className="bg-primary hover:bg-primary/90 gap-2">
                <PlayCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Start Interview</span>
              </Button>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowProfileMenu(false)
                }}
                className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {notifications.filter((n) => n.unread).length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-card border border-border shadow-xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                            notification.unread ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notification.unread && (
                              <span className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                            )}
                            <div className={notification.unread ? '' : 'ml-5'}>
                              <p className="text-sm font-medium text-foreground">{notification.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{notification.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <button className="w-full text-sm text-primary hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu)
                  setShowNotifications(false)
                }}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {userName.split(' ').map((n) => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-card border border-border shadow-xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-border">
                      <p className="font-medium text-foreground">{userName}</p>
                      <p className="text-sm text-muted-foreground">{userEmail}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>
                    <div className="p-2 border-t border-border">
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                      >
                        {isLoggingOut ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <LogOut className="w-4 h-4" />
                        )}
                        {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Command Palette */}
      <AnimatePresence>
        {showCommandPalette && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setShowCommandPalette(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
            >
              <div className="bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 border-b border-border">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Type a command or search..."
                    className="border-0 focus-visible:ring-0 h-14 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => setShowCommandPalette(false)}
                    className="p-1.5 rounded hover:bg-muted"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  <p className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">
                    Quick Actions
                  </p>
                  {filteredCommands.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowCommandPalette(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
