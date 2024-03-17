import clsx from 'clsx'

interface ContainerProps {
  readonly children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  const classes = clsx('mx-auto max-w-4xl px-2.5', className)

  return <div className={classes}>{children}</div>
}
