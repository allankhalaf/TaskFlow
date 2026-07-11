import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { tasks, projects } from '@/data/demoData'

const taskStatusData = [
  { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length },
  { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
  { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
  { name: 'Backlog', value: tasks.filter(t => t.status === 'backlog').length },
  { name: 'Review', value: tasks.filter(t => t.status === 'review').length },
  { name: 'Testing', value: tasks.filter(t => t.status === 'testing').length },
]

const projectProgressData = projects.map(p => ({ name: p.name.slice(0, 12), progress: p.progress }))

const weeklyActivity = [
  { day: 'Mon', tasks: 12, completed: 8 },
  { day: 'Tue', tasks: 15, completed: 10 },
  { day: 'Wed', tasks: 10, completed: 7 },
  { day: 'Thu', tasks: 18, completed: 14 },
  { day: 'Fri', tasks: 14, completed: 11 },
  { day: 'Sat', tasks: 6, completed: 5 },
  { day: 'Sun', tasks: 4, completed: 3 },
]

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#64748b', '#14b8a6', '#8b5cf6']

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Reports</h1>
        <p className="text-secondary-500 dark:text-secondary-400">Analytics and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Task Status Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={taskStatusData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {taskStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Project Progress</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Weekly Activity</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
