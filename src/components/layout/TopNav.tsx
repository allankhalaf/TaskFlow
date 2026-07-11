import { useState } from 'react'
import { Search, Bell, Moon, Sun, Menu } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'
import { notifications } from '@/data/demoData'

export function TopNav() {
  const { darkMode, toggleTheme } = useThemeStore()
  const { sidebarOpen } = useUIStore()
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className={cn(
      'fixed top-0 right-0 h-16 bg-white/80 dark:bg-secondary-950/80 backdrop-blur-md border-b border-secondary-200 dark:border-secondary-800 z-20 transition-all duration-300',
      sidebarOpen ? 'left-[260px]' : 'left-[72px]'
    )}>
      <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search projects, tasks, team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary-50 dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-secondary-100 placeholder:text-secondary-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-600 dark:text-secondary-400 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-600 dark:text-secondary-400 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-secondary-200 dark:border-secondary-800">
            <Avatar src={user?.avatar} alt={user?.name || 'User'} size="sm" />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{user?.name}</p>
              <p className="text-xs text-secondary-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
