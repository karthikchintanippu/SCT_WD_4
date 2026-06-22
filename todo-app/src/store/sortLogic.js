/**
 * store/sortLogic.js
 * Pure comparator functions for sorting tasks. Each returns a new
 * sorted array (does not mutate input), so it's safe to use directly
 * inside useMemo.
 */

import { PRIORITY_WEIGHT } from './taskLogic.js'

export const SORT_MODES = {
  DATE: 'date',
  PRIORITY: 'priority',
  STATUS: 'status'
}

export const SORT_LABELS = {
  [SORT_MODES.DATE]: 'Date',
  [SORT_MODES.PRIORITY]: 'Priority',
  [SORT_MODES.STATUS]: 'Status'
}

// Tasks with no due date sort after tasks with one, regardless of direction.
function compareByDate(a, b) {
  const aHasDate = Boolean(a.dueDate)
  const bHasDate = Boolean(b.dueDate)
  if (aHasDate && !bHasDate) return -1
  if (!aHasDate && bHasDate) return 1
  if (!aHasDate && !bHasDate) return 0

  const dateCompare = a.dueDate.localeCompare(b.dueDate)
  if (dateCompare !== 0) return dateCompare

  // Same date — tasks with a time sort before tasks without one,
  // earliest time first.
  const aHasTime = Boolean(a.dueTime)
  const bHasTime = Boolean(b.dueTime)
  if (aHasTime && !bHasTime) return -1
  if (!aHasTime && bHasTime) return 1
  if (!aHasTime && !bHasTime) return 0
  return a.dueTime.localeCompare(b.dueTime)
}

function compareByPriority(a, b) {
  return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
}

// Incomplete tasks before completed ones.
function compareByStatus(a, b) {
  if (a.completed === b.completed) return 0
  return a.completed ? 1 : -1
}

const COMPARATORS = {
  [SORT_MODES.DATE]: compareByDate,
  [SORT_MODES.PRIORITY]: compareByPriority,
  [SORT_MODES.STATUS]: compareByStatus
}

/**
 * Sorts a copy of `tasks` by the given mode. Ties are broken by
 * createdAt (newest first) so the order stays stable and predictable.
 */
export function sortTasks(tasks, mode) {
  const comparator = COMPARATORS[mode] || compareByDate
  return [...tasks].sort((a, b) => {
    const primary = comparator(a, b)
    if (primary !== 0) return primary
    return b.createdAt.localeCompare(a.createdAt)
  })
}
