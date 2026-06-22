/**
 * store/taskLogic.js
 * Pure functions for task CRUD. No React, no storage side effects —
 * these just take a task list and return a new one, so they're easy
 * to unit test and reason about.
 */

export const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
}

// Lower number = higher urgency, used directly as a sort weight.
export const PRIORITY_WEIGHT = {
  [PRIORITY.HIGH]: 0,
  [PRIORITY.MEDIUM]: 1,
  [PRIORITY.LOW]: 2
}

export const PRIORITY_LABELS = {
  [PRIORITY.HIGH]: 'High',
  [PRIORITY.MEDIUM]: 'Medium',
  [PRIORITY.LOW]: 'Low'
}

export function createTask({
  title,
  notes = '',
  dueDate = null,
  dueTime = null,
  listId = null,
  priority = PRIORITY.MEDIUM
}) {
  const trimmedTitle = title.trim()
  if (!trimmedTitle) {
    throw new Error('Task title cannot be empty')
  }
  return {
    id: generateId(),
    title: trimmedTitle,
    notes: notes.trim(),
    dueDate,    // ISO date string "YYYY-MM-DD" or null
    dueTime,    // "HH:MM" 24-hour or null
    listId,     // id of a list from listLogic.js, or null = "No list"
    priority,   // 'high' | 'medium' | 'low'
    completed: false,
    createdAt: new Date().toISOString()
  }
}

export function addTask(tasks, newTask) {
  return [newTask, ...tasks]
}

export function updateTask(tasks, id, updates) {
  return tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
}

export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id)
}

export function toggleComplete(tasks, id) {
  return tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
}

export function findTask(tasks, id) {
  return tasks.find((t) => t.id === id) || null
}

/**
 * Moves a task to a different list (or to "no list" with null).
 * No-op if the task doesn't exist — safe to call without checking first.
 */
export function moveTaskToList(tasks, taskId, listId) {
  return updateTask(tasks, taskId, { listId })
}

/**
 * When a list is deleted, tasks that belonged to it fall back to
 * "no list" rather than disappearing.
 */
export function clearTasksFromList(tasks, listId) {
  return tasks.map((t) => (t.listId === listId ? { ...t, listId: null } : t))
}

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
