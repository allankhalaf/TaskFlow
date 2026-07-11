export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: string
  department: string
  phone?: string
  status: 'online' | 'offline' | 'away'
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'archived' | 'pending'
  progress: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate: string
  startDate: string
  budget: number
  revenue: number
  team: string[]
  manager: string
  tags: string[]
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'testing' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  projectId: string
  assignee: string
  dueDate: string
  labels: string[]
  comments: Comment[]
  attachments: Attachment[]
  checklist: ChecklistItem[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  userId: string
  text: string
  createdAt: string
}

export interface Attachment {
  id: string
  name: string
  url: string
  size: number
  type: string
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  department: string
  phone: string
  status: 'online' | 'offline' | 'away'
  joinedAt: string
}

export interface Notification {
  id: string
  type: 'task_assigned' | 'deadline' | 'project_update' | 'comment' | 'mention'
  title: string
  message: string
  read: boolean
  createdAt: string
  userId?: string
  projectId?: string
  taskId?: string
}

export interface FileItem {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedBy: string
  uploadedAt: string
  projectId?: string
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'deadline' | 'meeting' | 'milestone' | 'reminder'
  projectId?: string
  description?: string
}

export interface WorkspaceSettings {
  name: string
  currency: string
  timezone: string
  language: string
}
