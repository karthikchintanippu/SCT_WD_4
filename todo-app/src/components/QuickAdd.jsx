import { useState } from 'react'
import styles from './QuickAdd.module.css'

export default function QuickAdd({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.quickAdd}>
      <span className={styles.plusIcon} aria-hidden="true">+</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a task and press Enter…"
        className={styles.input}
        aria-label="New task title"
      />
    </form>
  )
}
