import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Calendar as CalIcon, Flag, Users } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { calendarEvents, projects } from '@/data/demoData'
import { formatDate, cn } from '@/lib/utils'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return calendarEvents.filter(e => e.date === dateStr)
  }

  const eventTypeColors = {
    deadline: 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-300',
    meeting: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    milestone: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300',
    reminder: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300',
  }

  const eventTypeIcons = {
    deadline: Flag,
    meeting: Users,
    milestone: CalIcon,
    reminder: Clock,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Calendar</h1>
          <p className="text-secondary-500 dark:text-secondary-400">Project deadlines and events</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold min-w-[180px] text-center">{monthName}</h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-secondary-200 dark:bg-secondary-800 rounded-xl overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-secondary-50 dark:bg-secondary-900 p-3 text-center text-sm font-medium text-secondary-600 dark:text-secondary-400">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white dark:bg-secondary-950 min-h-[100px]" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const dayNum = day + 1
          const events = getEventsForDate(dayNum)
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum).toDateString()

          return (
            <motion.div
              key={dayNum}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'bg-white dark:bg-secondary-950 min-h-[100px] p-2 transition-colors hover:bg-secondary-50 dark:hover:bg-secondary-900/50',
                isToday && 'ring-2 ring-primary-500 ring-inset'
              )}
            >
              <span className={cn(
                'text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full',
                isToday ? 'bg-primary-600 text-white' : 'text-secondary-700 dark:text-secondary-300'
              )}>
                {dayNum}
              </span>
              <div className="mt-1 space-y-1">
                {events.map(event => {
                  const Icon = eventTypeIcons[event.type]
                  const project = projects.find(p => p.id === event.projectId)
                  return (
                    <div key={event.id} className={cn('text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1', eventTypeColors[event.type])}>
                      <Icon className="w-3 h-3" />
                      <span className="truncate">{event.title}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {calendarEvents.map(event => {
                const Icon = eventTypeIcons[event.type]
                return (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border border-secondary-100 dark:border-secondary-800">
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', eventTypeColors[event.type])}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-secondary-900 dark:text-secondary-100">{event.title}</p>
                      <p className="text-xs text-secondary-500">{event.description}</p>
                    </div>
                    <Badge variant="secondary">{formatDate(event.date)}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
