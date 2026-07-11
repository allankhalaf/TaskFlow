import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderKanban, Mail, Lock, User, Eye, EyeOff, Building } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-950 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Create Account</h1>
            <p className="text-secondary-500 dark:text-secondary-400">Join Damascus Software Solutions</p>
          </div>

          <form className="space-y-4" onSubmit={e => { e.preventDefault(); navigate('/') }}>
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary-700 dark:text-secondary-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary-700 dark:text-secondary-300">Company</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input defaultValue="Damascus Software Solutions" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary-700 dark:text-secondary-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input type="email" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary-700 dark:text-secondary-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input type={showPassword ? 'text' : 'password'} className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
          </form>

          <p className="text-center text-sm text-secondary-500 dark:text-secondary-400 mt-6">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-primary-600 hover:underline font-medium">Sign in</button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
