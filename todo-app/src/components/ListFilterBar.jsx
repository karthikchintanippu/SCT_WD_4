import { useState } from 'react'
import { createList, addList } from '../store/listLogic.js'
import styles from './ListFilterBar.module.css'

export default function ListFilterBar({ lists, setLists, activeListId, onSelectList, taskCountByList }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')

  function handleAddList(e) {
    e.preventDefault()
    const trimmed = newName.trim()
    if (!trimmed) {
      setIsAdding(false)
      return
    }
    const newList = createList(trimmed, randomListColor())
    setLists((prev) => addList(prev, newList))
    setNewName('')
    setIsAdding(false)
    onSelectList(newList.id)
  }

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={`${styles.pill} ${activeListId === 'all' ? styles.pillActive : ''}`}
        onClick={() => onSelectList('all')}
      >
        All
      </button>

      {lists.map((list) => (
        <button
          key={list.id}
          type="button"
          className={`${styles.pill} ${activeListId === list.id ? styles.pillActive : ''}`}
          onClick={() => onSelectList(list.id)}
        >
          <span className={styles.dot} style={{ backgroundColor: list.color }} aria-hidden="true" />
          {list.name}
          {taskCountByList[list.id] > 0 && <span>· {taskCountByList[list.id]}</span>}
        </button>
      ))}

      {isAdding ? (
        <form onSubmit={handleAddList} className={styles.newListForm}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleAddList}
            placeholder="List name"
            className={styles.newListInput}
            autoFocus
            aria-label="New list name"
          />
        </form>
      ) : (
        <button
          type="button"
          className={`${styles.pill} ${styles.addPill}`}
          onClick={() => setIsAdding(true)}
        >
          + New list
        </button>
      )}
    </div>
  )
}

const PALETTE = ['#7B8FC1', '#C18F65', '#8F65C1', '#65A8A8', '#C16590']
function randomListColor() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)]
}
