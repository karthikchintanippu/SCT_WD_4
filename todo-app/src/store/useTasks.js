import { useState, useEffect } from 'react'

const STORAGE_KEY = 'daybook-tasks-v1'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Corrupted or inaccessible storage — fail safe to an empty list
    // rather than crashing the app.
    return []
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage may be full or unavailable (e.g. private browsing in
    // some browsers) — the app still works in-memory for the session.
  }
}

/**
 * useTasks — single source of truth for the task list, persisted
 * to localStorage. Returns [tasks, setTasks] just like useState,
 * so callers can use the pure functions from taskLogic.js with it:
 *
 *   const [tasks, setTasks] = useTasks()
 *   setTasks((prev) => addTask(prev, newTask))
 */
export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  return [tasks, setTasks]
}
