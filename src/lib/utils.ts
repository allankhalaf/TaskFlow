import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function getPriorityColor(priority: string) {
  const map: Record<string, string> = {
    low: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300',
    medium: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    high: 'bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400',
    urgent: 'bg-danger-50 text-danger-600 dark:bg-danger-900/30 dark:text-danger-400',
  }
  return map[priority] || map.medium
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    active: 'bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400',
    completed: 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
    archived: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400',
    pending: 'bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400',
  }
  return map[status] || map.active
}
