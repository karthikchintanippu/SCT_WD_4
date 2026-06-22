const VARIANTS = {
  primary: 'bg-ink text-paper hover:bg-ink/90',
  outline: 'bg-transparent text-ink border border-paper-line hover:border-ink-soft',
  ghost: 'bg-transparent text-ink-soft hover:text-ink'
}

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`font-body font-semibold text-sm px-5 py-2.5 rounded-md transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
