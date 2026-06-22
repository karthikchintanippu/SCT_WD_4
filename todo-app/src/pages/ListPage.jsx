import { useState, useMemo } from 'react'
import { createTask, addTask, deleteTask, toggleComplete, moveTaskToList } from '../store/taskLogic.js'
import { getDateBucket, BUCKET_ORDER, BUCKET_LABELS } from '../utils/dates.js'
import { sortTasks, SORT_MODES } from '../store/sortLogic.js'
import TaskSection from '../components/TaskSection.jsx'
import EmptyState from '../components/EmptyState.jsx'
import QuickAdd from '../components/QuickAdd.jsx'
import ListFilterBar from '../components/ListFilterBar.jsx'
import SortMenu from '../components/SortMenu.jsx'
import styles from './ListPage.module.css'

export default function ListPage({ tasks, setTasks, lists, setLists }) {
  const [activeListId, setActiveListId] = useState('all')
  const [sortMode, setSortMode] = useState(SORT_MODES.DATE)

  const tasksInScope = useMemo(() => {
    if (activeListId === 'all') return tasks
    return tasks.filter((t) => t.listId === activeListId)
  }, [tasks, activeListId])

  const taskCountByList = useMemo(() => {
    const counts = {}
    for (const task of tasks) {
      if (!task.completed && task.listId) {
        counts[task.listId] = (counts[task.listId] || 0) + 1
      }
    }
    return counts
  }, [tasks])

  const activeTasks = useMemo(() => tasksInScope.filter((t) => !t.completed), [tasksInScope])
  const completedCount = tasksInScope.length - activeTasks.length

  // Date sort keeps the planner-style bucket grouping. Priority and
  // status sort show one flat list instead — buckets and those sort
  // modes don't combine into anything meaningful together.
  const isBucketedView = sortMode === SORT_MODES.DATE

  const grouped = useMemo(() => {
    if (!isBucketedView) return null
    const buckets = {}
    for (const key of BUCKET_ORDER) buckets[key] = []

    for (const task of activeTasks) {
      const bucket = getDateBucket(task.dueDate, task.completed)
      buckets[bucket].push(task)
    }
    for (const key of BUCKET_ORDER) {
      buckets[key] = sortTasks(buckets[key], SORT_MODES.DATE)
    }
    return buckets
  }, [activeTasks, isBucketedView])

  const flatSortedActive = useMemo(() => {
    if (isBucketedView) return null
    return sortTasks(activeTasks, sortMode)
  }, [activeTasks, sortMode, isBucketedView])

  const completedTasks = useMemo(
    () => sortTasks(tasksInScope.filter((t) => t.completed), SORT_MODES.DATE),
    [tasksInScope]
  )

  function handleQuickAdd(title) {
    const newTask = createTask({
      title,
      listId: activeListId === 'all' ? null : activeListId
    })
    setTasks((prev) => addTask(prev, newTask))
  }

  function handleToggle(id) {
    setTasks((prev) => toggleComplete(prev, id))
  }

  function handleDelete(id) {
    setTasks((prev) => deleteTask(prev, id))
  }

  function handleMoveToList(taskId, listId) {
    setTasks((prev) => moveTaskToList(prev, taskId, listId))
  }

  function handleSelectList(listId) {
    setActiveListId(listId)
  }

  const hasAnyTasksInScope = tasksInScope.length > 0
  const showListBadge = activeListId === 'all'

  return (
    <main className={`${styles.page} bg-paper`}>
      <div className="max-w-2xl mx-auto px-5 py-10 sm:py-14">

        <header className={styles.header}>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta mb-2">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink mb-1">Daybook</h1>
          <p className="font-body text-sm text-ink-soft">
            {activeTasks.length === 0
              ? 'All clear.'
              : `${activeTasks.length} task${activeTasks.length === 1 ? '' : 's'} to go`}
            {completedCount > 0 && ` · ${completedCount} done`}
          </p>
        </header>

        <div className="mb-5">
          <ListFilterBar
            lists={lists}
            setLists={setLists}
            activeListId={activeListId}
            onSelectList={handleSelectList}
            taskCountByList={taskCountByList}
          />
        </div>

        <div className="mb-5">
          <QuickAdd onAdd={handleQuickAdd} />
        </div>

        <div className="flex items-center justify-end mb-6">
          <SortMenu sortMode={sortMode} onChangeSort={setSortMode} />
        </div>

        {!hasAnyTasksInScope && <EmptyState />}

        {isBucketedView ? (
          BUCKET_ORDER.map((bucket) => (
            <TaskSection
              key={bucket}
              bucket={bucket}
              label={BUCKET_LABELS[bucket]}
              tasks={grouped[bucket]}
              onToggle={handleToggle}
              onDelete={handleDelete}
              lists={lists}
              onMoveToList={handleMoveToList}
              showListBadge={showListBadge}
            />
          ))
        ) : (
          flatSortedActive.length > 0 && (
            <TaskSection
              bucket="flat"
              label={activeTasks.length === 1 ? '1 task' : `${activeTasks.length} tasks`}
              tasks={flatSortedActive}
              onToggle={handleToggle}
              onDelete={handleDelete}
              lists={lists}
              onMoveToList={handleMoveToList}
              showListBadge={showListBadge}
            />
          )
        )}

        {completedTasks.length > 0 && (
          <TaskSection
            bucket="completed"
            label="Completed"
            tasks={completedTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            lists={lists}
            onMoveToList={handleMoveToList}
            showListBadge={showListBadge}
          />
        )}
      </div>
    </main>
  )
}
