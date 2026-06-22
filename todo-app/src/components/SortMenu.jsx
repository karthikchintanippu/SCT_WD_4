import { useState, useRef, useEffect } from 'react'
import { SORT_MODES, SORT_LABELS } from '../store/sortLogic.js'
import styles from './SortMenu.module.css'

export default function SortMenu({ sortMode, onChangeSort }) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(mode) {
    onChangeSort(mode)
    setIsOpen(false)
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        Sort: {SORT_LABELS[sortMode]}
      </button>

      {isOpen && (
        <div className={styles.menu} role="listbox">
          {Object.values(SORT_MODES).map((mode) => (
            <button
              key={mode}
              type="button"
              role="option"
              aria-selected={sortMode === mode}
              className={`${styles.option} ${sortMode === mode ? styles.optionActive : ''}`}
              onClick={() => handleSelect(mode)}
            >
              {SORT_LABELS[mode]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
