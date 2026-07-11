import { useState } from 'react'
import { FileText, Download, Trash2, Upload, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { files, teamMembers } from '@/data/demoData'
import { formatDate, cn } from '@/lib/utils'

const fileIcons: Record<string, string> = {
  pdf: 'bg-red-50 text-red-600',
  markdown: 'bg-secondary-100 text-secondary-600',
  figma: 'bg-purple-50 text-purple-600',
  sql: 'bg-blue-50 text-blue-600',
  word: 'bg-blue-50 text-blue-700',
  excel: 'bg-green-50 text-green-600',
}

export default function Files() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Files</h1>
          <p className="text-secondary-500 dark:text-secondary-400">Project files and documents</p>
        </div>
        <Button><Upload className="w-4 h-4 mr-2" />Upload File</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-secondary-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(file => {
          const uploader = teamMembers.find(t => t.id === file.uploadedBy)
          return (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', fileIcons[file.type] || 'bg-primary-50 text-primary-600')}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-secondary-900 dark:text-secondary-100 truncate">{file.name}</h4>
                    <p className="text-xs text-secondary-500">{uploader?.name}</p>
                    <p className="text-xs text-secondary-400">{(file.size / 1024 / 1024).toFixed(2)} MB • {formatDate(file.uploadedAt)}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-secondary-100 dark:border-secondary-800">
                  <button className="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 text-sm text-secondary-600 dark:text-secondary-400 transition-colors">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 text-danger-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
