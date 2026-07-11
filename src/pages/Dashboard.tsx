import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  FolderKanban, CheckSquare, Users, TrendingUp, Clock, AlertCircle,
  ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Avatar } from '@/components/ui/Avatar'
import { projects, tasks, teamMembers, notifications, calendarEvents } from '@/data/demoData'
import { formatCurrency, formatDate, cn } from '@/lib/utils'

const stats = [
  { label: 'Total Projects', value: '10', icon: FolderKanban, change: '+2', changeType: 'up' as const, color: 'primary' },
  { label: 'Active Tasks', value: '24', icon: CheckSquare, change: '+5', changeType: 'up' as const, color: 'success' },
  { label: 'Team Members', value: '15', icon: Users, change: '+1', changeType: 'up' as const, color: 'accent' },
  { label: 'Revenue', value: '$268K', icon: TrendingUp, change: '+12%', changeType: 'up' as const, color: 'warning' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Dashboard() {
  const activeProjects = useMemo(() => projects.filter(p => p.status === 'active'), [])
  const pendingTasks = useMemo(() => tasks.filter(t => t.status !== 'completed').slice(0, 5), [])
  const recentNotifications = useMemo(() => notifications.slice(0, 5), [])
  const upcomingEvents = useMemo(() => calendarEvents.slice(0, 4), [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Dashboard</h1>
        <p className="text-secondary-500 dark:text-secondary-400">Welcome back, Ahmad! Here's what's happening.</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                    <stat.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className={cn(
                    'flex items-center gap-1 text-xs font-medium',
                    stat.changeType === 'up' ? 'text-success-600' : 'text-danger-600'
                  )}>
                    {stat.changeType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <Badge variant="primary">{activeProjects.length} Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <motion.div key={project.id} variants={item} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-secondary-900 dark:text-secondary-100 truncate">{project.name}</h4>
                        <Badge variant={project.priority === 'urgent' ? 'danger' : project.priority === 'high' ? 'warning' : 'secondary'}>
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-0.5">{project.description}</p>
                    </div>
                    <div className="w-32">
                      <Progress value={project.progress} size="sm" showLabel />
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{formatDate(project.dueDate)}</p>
                      <p className="text-xs text-secondary-500">Due date</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <Badge variant="warning">{tasks.filter(t => t.status !== 'completed').length} Pending</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task) => {
                  const assignee = teamMembers.find(t => t.id === task.assignee)
                  return (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border border-secondary-100 dark:border-secondary-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                      <div className={cn(
                        'w-2 h-2 rounded-full flex-shrink-0',
                        task.priority === 'urgent' ? 'bg-danger-500' : task.priority === 'high' ? 'bg-warning-500' : 'bg-primary-500'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-secondary-900 dark:text-secondary-100 text-sm">{task.title}</p>
                        <p className="text-xs text-secondary-500">{task.labels.join(', ')}</p>
                      </div>
                      <Avatar src={assignee?.avatar} alt={assignee?.name || ''} size="xs" />
                      <span className="text-xs text-secondary-500">{formatDate(task.dueDate)}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map((notif) => (
                  <div key={notif.id} className="flex gap-3">
                    <div className={cn(
                      'w-2 h-2 mt-2 rounded-full flex-shrink-0',
                      !notif.read ? 'bg-primary-500' : 'bg-secondary-300 dark:bg-secondary-700'
                    )} />
                    <div>
                      <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{notif.title}</p>
                      <p className="text-xs text-secondary-500 mt-0.5">{notif.message}</p>
                      <p className="text-xs text-secondary-400 mt-1">{formatDate(notif.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary-50 dark:bg-secondary-800/50">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">{event.title}</p>
                      <p className="text-xs text-secondary-500">{formatDate(event.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
