import TaskItem from './TaskItem.jsx'

export default function TaskSection({ label, tasks, bucket, onToggle, onDelete, lists, onMoveToList, showListBadge }) {
  if (tasks.length === 0) return null

  return (
    <section className="mb-7">
      <div className="flex items-center gap-2 mb-2 px-1">
        <h2 className={`font-body text-xs font-semibold uppercase tracking-wider ${bucket === 'overdue' ? 'text-rust' : 'text-ink-soft'}`}>
          {label}
        </h2>
        <span className="font-body text-xs text-ink-soft">{tasks.length}</span>
      </div>

      <div className="flex flex-col gap-1">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isOverdue={bucket === 'overdue'}
            onToggle={onToggle}
            onDelete={onDelete}
            lists={lists}
            onMoveToList={onMoveToList}
            showListBadge={showListBadge}
          />
        ))}
      </div>
    </section>
  )
}
