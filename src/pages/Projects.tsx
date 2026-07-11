import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, MoreHorizontal, Calendar, Users, DollarSign } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { projects, teamMembers } from '@/data/demoData'
import { formatCurrency, formatDate, getStatusColor, getPriorityColor, cn } from '@/lib/utils'

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Projects</h1>
          <p className="text-secondary-500 dark:text-secondary-400">Manage and track all your projects</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-secondary-100"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'completed', 'archived', 'pending'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                statusFilter === status
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'bg-white dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800'
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <button className="p-1 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800">
                    <MoreHorizontal className="w-4 h-4 text-secondary-400" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">{project.name}</h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4 line-clamp-2">{project.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                    <Calendar className="w-4 h-4" />
                    <span>Due {formatDate(project.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                    <DollarSign className="w-4 h-4" />
                    <span>Budget: {formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-secondary-400" />
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 4).map((tmId) => {
                        const member = teamMembers.find(t => t.id === tmId)
                        return (
                          <div key={tmId} className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 border-2 border-white dark:border-secondary-900 flex items-center justify-center text-[10px] font-medium text-primary-700 dark:text-primary-300">
                            {member?.name.charAt(0)}
                          </div>
                        )
                      })}
                      {project.team.length > 4 && (
                        <div className="w-6 h-6 rounded-full bg-secondary-100 dark:bg-secondary-800 border-2 border-white dark:border-secondary-900 flex items-center justify-center text-[10px] font-medium text-secondary-600">
                          +{project.team.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Progress</span>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} size="sm" />
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
