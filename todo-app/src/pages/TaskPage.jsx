import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { createTask, addTask, updateTask, deleteTask, findTask, PRIORITY, PRIORITY_LABELS } from '../store/taskLogic.js'
import Button from '../components/Button.jsx'
import styles from './TaskPage.module.css'

export default function TaskPage({ tasks, setTasks, lists }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id

  const existingTask = isNew ? null : findTask(tasks, id)

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueTime, setDueTime] = useState('')
  const [listId, setListId] = useState('')
  const [priority, setPriority] = useState(PRIORITY.MEDIUM)
  const [error, setError] = useState('')

  // Redirect home if editing a task that doesn't exist (e.g. it was
  // deleted in another tab, or someone typed a bad URL).
  useEffect(() => {
    if (!isNew && !existingTask) {
      navigate('/', { replace: true })
    }
  }, [isNew, existingTask, navigate])

  // Populate the form once when editing an existing task.
  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title)
      setNotes(existingTask.notes || '')
      setDueDate(existingTask.dueDate || '')
      setDueTime(existingTask.dueTime || '')
      setListId(existingTask.listId || '')
      setPriority(existingTask.priority || PRIORITY.MEDIUM)
    }
  }, [existingTask])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Give the task a title before saving.')
      return
    }

    if (isNew) {
      const newTask = createTask({
        title: trimmedTitle,
        notes,
        dueDate: dueDate || null,
        dueTime: dueTime || null,
        listId: listId || null,
        priority
      })
      setTasks((prev) => addTask(prev, newTask))
    } else {
      setTasks((prev) => updateTask(prev, existingTask.id, {
        title: trimmedTitle,
        notes,
        dueDate: dueDate || null,
        dueTime: dueTime || null,
        listId: listId || null,
        priority
      }))
    }
    navigate('/')
  }

  function handleDelete() {
    if (!existingTask) return
    setTasks((prev) => deleteTask(prev, existingTask.id))
    navigate('/')
  }

  function handleClearDate() {
    setDueDate('')
    setDueTime('')
  }

  return (
    <main className={`${styles.page} bg-paper`}>
      <div className="max-w-xl mx-auto px-5 py-10 sm:py-14">

        <Link to="/" className="font-body text-xs text-ink-soft hover:text-ink transition-colors inline-block mb-8">
          ← Back to list
        </Link>

        <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta mb-2">
          {isNew ? 'New task' : 'Edit task'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError('') }}
              placeholder="What needs doing?"
              className={styles.titleInput}
              autoFocus
              aria-label="Task title"
            />
            {error && <p className="font-body text-xs text-rust mt-2">{error}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any details…"
              className={styles.textarea}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Due date &amp; time</label>
            <div className={styles.dateTimeRow}>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={styles.dateInput}
                aria-label="Due date"
              />
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className={styles.dateInput}
                aria-label="Due time"
                disabled={!dueDate}
              />
            </div>
            {(dueDate || dueTime) && (
              <button type="button" onClick={handleClearDate} className={styles.clearDateBtn}>
                Clear date &amp; time
              </button>
            )}
          </div>

          <div className={`${styles.dateTimeRow} ${styles.field}`}>
            <div>
              <label className={styles.label} htmlFor="list">List</label>
              <select
                id="list"
                value={listId}
                onChange={(e) => setListId(e.target.value)}
                className={styles.dateInput}
              >
                <option value="">No list</option>
                {lists?.map((list) => (
                  <option key={list.id} value={list.id}>{list.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={styles.label} htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={styles.dateInput}
              >
                {Object.values(PRIORITY).map((p) => (
                  <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-10">
            <div>
              {!isNew && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="font-body text-sm text-rust hover:underline"
                >
                  Delete task
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {isNew ? 'Add task' : 'Save changes'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
