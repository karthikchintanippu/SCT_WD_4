/**
 * utils/dates.js
 * Pure date helpers — no React, no storage, easy to test standalone.
 */

export function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function isSameDay(a, b) {
  return startOfDay(a).getTime() === startOfDay(b).getTime()
}

export function isOverdue(dueDateISO, isCompleted) {
  if (!dueDateISO || isCompleted) return false
  return new Date(dueDateISO).getTime() < startOfDay(new Date()).getTime()
}

/**
 * Buckets a task's due date into one of: 'overdue', 'today',
 * 'tomorrow', 'week', 'later', 'none'.
 * A completed task with a past due date is bucketed as 'today'
 * grouping equivalent (treated as done, shown with the rest of
 * its original day rather than drifting into 'later').
 */
export function getDateBucket(dueDateISO, isCompleted) {
  if (!dueDateISO) return 'none'

  const today = startOfDay(new Date())
  const due = startOfDay(dueDateISO)
  const diffDays = Math.round((due.getTime() - today.getTime()) / 86400000)

  if (diffDays < 0) {
    return isCompleted ? 'today' : 'overdue'
  }
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'tomorrow'
  if (diffDays > 1 && diffDays <= 7) return 'week'
  return 'later'
}

export const BUCKET_ORDER = ['overdue', 'today', 'tomorrow', 'week', 'later', 'none']

export const BUCKET_LABELS = {
  overdue: 'Overdue',
  today: 'Today',
  tomorrow: 'Tomorrow',
  week: 'This week',
  later: 'Later',
  none: 'No date'
}

/**
 * Formats an ISO date string as "Jun 21" and, if a time was set,
 * appends "· 3:30 PM".
 */
export function formatDueDate(dueDateISO, dueTime) {
  if (!dueDateISO) return null
  const d = new Date(dueDateISO)
  const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  if (!dueTime) return dateLabel

  const [hours, minutes] = dueTime.split(':').map(Number)
  const timeDate = new Date()
  timeDate.setHours(hours, minutes)
  const timeLabel = timeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${dateLabel} · ${timeLabel}`
}

export function todayISO() {
  return startOfDay(new Date()).toISOString().slice(0, 10)
}
