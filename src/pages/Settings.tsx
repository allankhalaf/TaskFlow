import { useState } from 'react'
import { User, Lock, Palette, Bell, Building, Camera, Mail, Phone, MapPin, Save } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { workspaceSettings } from '@/data/demoData'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'workspace', label: 'Workspace', icon: Building },
]

export default function Settings() {
  const { user, updateProfile } = useAuthStore()
  const { darkMode, toggleTheme } = useThemeStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Settings</h1>
        <p className="text-secondary-500 dark:text-secondary-400">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'text-secondary-600 hover:bg-secondary-50 dark:text-secondary-400 dark:hover:bg-secondary-800'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 max-w-2xl">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar src={user?.avatar} alt={user?.name || ''} size="xl" />
                  <div>
                    <Button variant="outline" size="sm"><Camera className="w-4 h-4 mr-2" />Change Photo</Button>
                    <p className="text-xs text-secondary-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input defaultValue={user?.name} className="w-full px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                      <input defaultValue={user?.email} className="w-full pl-10 pr-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                      <input defaultValue={user?.phone} className="w-full pl-10 pr-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                      <input defaultValue={user?.department} className="w-full pl-10 pr-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                    </div>
                  </div>
                </div>
                <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />{saved ? 'Saved!' : 'Save Changes'}</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'password' && (
            <Card>
              <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <input type="password" className="w-full px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input type="password" className="w-full px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                  <input type="password" className="w-full px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-secondary-200 dark:border-secondary-800">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-secondary-500">Toggle between light and dark themes</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={cn(
                      'w-12 h-6 rounded-full transition-colors relative',
                      darkMode ? 'bg-primary-600' : 'bg-secondary-300'
                    )}
                  >
                    <div className={cn(
                      'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform',
                      darkMode ? 'translate-x-6' : 'translate-x-0.5'
                    )} />
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'workspace' && (
            <Card>
              <CardHeader><CardTitle>Workspace Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Workspace Name</label>
                  <input defaultValue={workspaceSettings.name} className="w-full px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <input defaultValue={workspaceSettings.currency} disabled className="w-full px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-secondary-50 dark:bg-secondary-800 text-secondary-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <input defaultValue={workspaceSettings.timezone} className="w-full px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 dark:text-white text-sm" />
                </div>
                <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />{saved ? 'Saved!' : 'Save Changes'}</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
