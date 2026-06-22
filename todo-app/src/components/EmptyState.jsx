export default function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <p className="font-display text-2xl text-ink mb-2">A clean page</p>
      <p className="font-body text-sm text-ink-soft max-w-xs">
        Nothing on your list yet. Add a task below to get started.
      </p>
    </div>
  )
}
