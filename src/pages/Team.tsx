import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, Phone, MapPin, MoreHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { teamMembers } from '@/data/demoData'
import { cn } from '@/lib/utils'

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')

  const departments = ['all', ...Array.from(new Set(teamMembers.map(t => t.department)))]

  const filtered = teamMembers.filter(tm => {
    const matchesSearch = tm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tm.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tm.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = deptFilter === 'all' || tm.department === deptFilter
    return matchesSearch && matchesDept
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Team</h1>
        <p className="text-secondary-500 dark:text-secondary-400">{teamMembers.length} team members</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-secondary-100"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 text-sm dark:text-secondary-100"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    'w-3 h-3 rounded-full',
                    member.status === 'online' ? 'bg-success-500' : member.status === 'away' ? 'bg-warning-500' : 'bg-secondary-300 dark:bg-secondary-600'
                  )} />
                  <button className="p-1 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800">
                    <MoreHorizontal className="w-4 h-4 text-secondary-400" />
                  </button>
                </div>

                <div className="text-center mb-4">
                  <Avatar src={member.avatar} alt={member.name} size="lg" className="mx-auto mb-3" />
                  <h3 className="font-semibold text-secondary-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-secondary-500">{member.role}</p>
                  <Badge variant="secondary" className="mt-2">{member.department}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400">
                    <Mail className="w-4 h-4 text-secondary-400" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400">
                    <Phone className="w-4 h-4 text-secondary-400" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
