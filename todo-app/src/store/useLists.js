import { useState, useEffect } from 'react'
import { DEFAULT_LISTS } from './listLogic.js'

const STORAGE_KEY = 'daybook-lists-v1'

function loadLists() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_LISTS
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_LISTS
  } catch {
    return DEFAULT_LISTS
  }
}

function saveLists(lists) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  } catch {
    // Storage unavailable — app still works in-memory for the session.
  }
}

/**
 * useLists — single source of truth for the set of task lists,
 * persisted to localStorage. Same shape as useState:
 *
 *   const [lists, setLists] = useLists()
 *   setLists((prev) => addList(prev, newList))
 */
export function useLists() {
  const [lists, setLists] = useState(loadLists)

  useEffect(() => {
    saveLists(lists)
  }, [lists])

  return [lists, setLists]
}
