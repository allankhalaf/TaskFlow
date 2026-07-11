import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderKanban, Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-950 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-sm text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to login
          </button>

          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Reset Password</h1>
            <p className="text-secondary-500 dark:text-secondary-400">Enter your email to receive reset instructions</p>
          </div>

          {sent ? (
            <div className="text-center p-4 rounded-lg bg-success-50 dark:bg-success-900/20">
              <CheckCircle className="w-8 h-8 text-success-500 mx-auto mb-2" />
              <p className="text-success-700 dark:text-success-300 font-medium">Reset link sent!</p>
              <p className="text-sm text-success-600 dark:text-success-400 mt-1">Check your email for instructions.</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate('/login')}>Back to Login</Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSent(true) }}>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary-700 dark:text-secondary-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input type="email" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" required />
                </div>
              </div>
              <Button type="submit" className="w-full">Send Reset Link</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
