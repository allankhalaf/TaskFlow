import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, GripVertical, Calendar, Flag, MessageSquare, Paperclip, CheckSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { tasks, teamMembers } from '@/data/demoData'
import { getPriorityColor, formatDate, cn } from '@/lib/utils'

const columns = [
  { id: 'backlog', title: 'Backlog', color: 'bg-secondary-100 dark:bg-secondary-800' },
  { id: 'todo', title: 'To Do', color: 'bg-primary-50 dark:bg-primary-900/20' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-warning-50 dark:bg-warning-900/20' },
  { id: 'review', title: 'Review', color: 'bg-accent-50 dark:bg-accent-900/20' },
  { id: 'testing', title: 'Testing', color: 'bg-secondary-100 dark:bg-secondary-800' },
  { id: 'completed', title: 'Completed', color: 'bg-success-50 dark:bg-success-900/20' },
]

export default function Tasks() {
  const [filterPriority, setFilterPriority] = useState<string>('all')

  const filteredTasks = filterPriority === 'all' ? tasks : tasks.filter(t => t.priority === filterPriority)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Tasks</h1>
          <p className="text-secondary-500 dark:text-secondary-400">Kanban board for task management</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 text-sm dark:text-secondary-100"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(t => t.status === column.id)
          return (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className={cn('flex items-center justify-between p-3 rounded-t-lg', column.color)}>
                <h3 className="font-semibold text-sm text-secondary-900 dark:text-secondary-100">{column.title}</h3>
                <Badge variant="secondary">{columnTasks.length}</Badge>
              </div>
              <div className="bg-secondary-50/50 dark:bg-secondary-900/50 p-3 rounded-b-lg space-y-3 min-h-[200px]">
                {columnTasks.map((task, i) => {
                  const assignee = teamMembers.find(t => t.id === task.assignee)
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
                        style={{ borderLeftColor: task.priority === 'urgent' ? '#ef4444' : task.priority === 'high' ? '#f59e0b' : '#3b82f6' }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <GripVertical className="w-4 h-4 text-secondary-300 mt-0.5" />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-secondary-900 dark:text-secondary-100">{task.title}</h4>
                              <p className="text-xs text-secondary-500 mt-1 line-clamp-2">{task.description}</p>

                              <div className="flex items-center gap-3 mt-3">
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-secondary-500">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(task.dueDate)}
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-secondary-100 dark:border-secondary-800">
                                <div className="flex items-center gap-3 text-xs text-secondary-500">
                                  {task.comments.length > 0 && (
                                    <span className="flex items-center gap-1">
                                      <MessageSquare className="w-3 h-3" />
                                      {task.comments.length}
                                    </span>
                                  )}
                                  {task.attachments.length > 0 && (
                                    <span className="flex items-center gap-1">
                                      <Paperclip className="w-3 h-3" />
                                      {task.attachments.length}
                                    </span>
                                  )}
                                  {task.checklist.length > 0 && (
                                    <span className="flex items-center gap-1">
                                      <CheckSquare className="w-3 h-3" />
                                      {task.checklist.filter(c => c.completed).length}/{task.checklist.length}
                                    </span>
                                  )}
                                </div>
                                {assignee && (
                                  <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-[10px] font-medium text-primary-700 dark:text-primary-300">
                                    {assignee.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
