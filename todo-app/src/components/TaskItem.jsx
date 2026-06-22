import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDueDate } from '../utils/dates.js'
import { PRIORITY_LABELS } from '../store/taskLogic.js'
import styles from './TaskItem.module.css'

const PRIORITY_COLOR = {
  high: '#C1543F',
  medium: '#C1652F',
  low: '#A39C8E'
}

export default function TaskItem({ task, isOverdue, onToggle, onDelete, lists, onMoveToList, showListBadge }) {
  const navigate = useNavigate()
  const dueLabel = formatDueDate(task.dueDate, task.dueTime)
  const taskList = lists?.find((l) => l.id === task.listId) || null

  const [isMoveOpen, setIsMoveOpen] = useState(false)
  const moveRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (moveRef.current && !moveRef.current.contains(e.target)) {
        setIsMoveOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`${styles.row} ${isOverdue ? styles.overdue : ''}`}>
      <button
        type="button"
        className={`${styles.checkbox} ${task.completed ? styles.checkboxChecked : ''}`}
        onClick={() => onToggle(task.id)}
        aria-pressed={task.completed}
        aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
      >
        <svg className={styles.checkmark} viewBox="0 0 12 12" fill="none">
          <path d="M2 6.2L4.6 9 10 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div onClick={() => navigate(`/task/${task.id}`)} className="cursor-pointer">
        <div className="flex items-center gap-2">
          <span
            className={styles.priorityDot}
            style={{ backgroundColor: PRIORITY_COLOR[task.priority] || PRIORITY_COLOR.medium }}
            title={`${PRIORITY_LABELS[task.priority] || 'Medium'} priority`}
            aria-hidden="true"
          />
          <p className={`${styles.title} font-body text-ink ${task.completed ? styles.titleCompleted : ''}`}>
            {task.title}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {showListBadge && taskList && (
            <span className={styles.listBadge} style={{ color: taskList.color, borderColor: taskList.color }}>
              {taskList.name}
            </span>
          )}
          {dueLabel && (
            <span className={`font-body text-xs ${isOverdue ? 'text-rust font-semibold' : 'text-ink-soft'}`}>
              {dueLabel}
            </span>
          )}
          {task.notes && (
            <span className="font-body text-xs text-ink-soft truncate max-w-[180px]">
              · {task.notes}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {lists && lists.length > 0 && (
          <div className={styles.moveWrapper} ref={moveRef}>
            <button
              type="button"
              className={`${styles.moveBtn} font-body text-xs text-ink-soft hover:text-ink transition-colors px-1`}
              onClick={() => setIsMoveOpen((v) => !v)}
              aria-label={`Move "${task.title}" to a different list`}
              aria-haspopup="listbox"
              aria-expanded={isMoveOpen}
            >
              Move
            </button>
            {isMoveOpen && (
              <div className={styles.moveMenu} role="listbox">
                <button
                  type="button"
                  className={`${styles.moveOption} ${!task.listId ? styles.moveOptionActive : ''}`}
                  onClick={() => { onMoveToList(task.id, null); setIsMoveOpen(false) }}
                >
                  No list
                </button>
                {lists.map((list) => (
                  <button
                    key={list.id}
                    type="button"
                    className={`${styles.moveOption} ${task.listId === list.id ? styles.moveOptionActive : ''}`}
                    onClick={() => { onMoveToList(task.id, list.id); setIsMoveOpen(false) }}
                  >
                    <span className={styles.moveDot} style={{ backgroundColor: list.color }} />
                    {list.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          className={`${styles.deleteBtn} font-body text-xs text-ink-soft hover:text-rust transition-colors px-1`}
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.title}"`}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
