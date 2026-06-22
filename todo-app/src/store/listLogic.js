/**
 * store/listLogic.js
 * Pure functions for managing task lists (Work, Personal, Shopping,
 * and any custom lists the user creates). No React, no storage.
 */

export const DEFAULT_LISTS = [
  { id: 'work', name: 'Work', color: '#6B8F71' },
  { id: 'personal', name: 'Personal', color: '#C1652F' },
  { id: 'shopping', name: 'Shopping', color: '#7B8FC1' }
]

export function createList(name, color = '#766F64') {
  const trimmed = name.trim()
  if (!trimmed) {
    throw new Error('List name cannot be empty')
  }
  return {
    id: generateListId(),
    name: trimmed,
    color
  }
}

export function addList(lists, newList) {
  return [...lists, newList]
}

export function renameList(lists, id, name) {
  const trimmed = name.trim()
  if (!trimmed) return lists
  return lists.map((l) => (l.id === id ? { ...l, name: trimmed } : l))
}

export function deleteList(lists, id) {
  return lists.filter((l) => l.id !== id)
}

export function findList(lists, id) {
  return lists.find((l) => l.id === id) || null
}

function generateListId() {
  return `list-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}
