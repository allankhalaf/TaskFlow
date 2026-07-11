import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200': variant === 'default',
          'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300': variant === 'primary',
          'bg-success-50 text-success-600 dark:bg-success-900/30 dark:text-success-400': variant === 'success',
          'bg-warning-50 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400': variant === 'warning',
          'bg-danger-50 text-danger-600 dark:bg-danger-900/30 dark:text-danger-400': variant === 'danger',
          'bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400': variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
