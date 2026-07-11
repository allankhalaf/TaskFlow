import { Bell, Check, Clock, UserCheck, AlertTriangle, MessageSquare, AtSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { notifications } from '@/data/demoData'
import { formatDate, cn } from '@/lib/utils'

const typeIcons = {
  task_assigned: UserCheck,
  deadline: AlertTriangle,
  project_update: Bell,
  comment: MessageSquare,
  mention: AtSign,
}

const typeColors = {
  task_assigned: 'bg-primary-100 text-primary-700',
  deadline: 'bg-warning-100 text-warning-700',
  project_update: 'bg-accent-100 text-accent-700',
  comment: 'bg-secondary-100 text-secondary-700',
  mention: 'bg-success-100 text-success-700',
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Notifications</h1>
          <p className="text-secondary-500 dark:text-secondary-400">Stay updated with your projects</p>
        </div>
        <button className="text-sm text-primary-600 hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => {
          const Icon = typeIcons[n.type]
          return (
            <Card key={n.id} className={cn(!n.read && 'border-l-4 border-l-primary-500')}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', typeColors[n.type])}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-secondary-900 dark:text-white">{n.title}</h4>
                    {!n.read && <Badge variant="primary">New</Badge>}
                  </div>
                  <p className="text-sm text-secondary-500 mt-1">{n.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-3 h-3 text-secondary-400" />
                    <span className="text-xs text-secondary-400">{formatDate(n.createdAt)}</span>
                  </div>
                </div>
                {!n.read && (
                  <button className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-400">
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
