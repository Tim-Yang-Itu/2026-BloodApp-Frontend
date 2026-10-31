import type { ReactNode } from 'react'

export type AlertVariant = 'error' | 'success' | 'info'

interface AlertProps {
  readonly variant?: AlertVariant
  readonly title?: string
  readonly children: ReactNode
}

export const Alert = ({ variant = 'info', title, children }: AlertProps) => (
  <div
    className={`alert alert--${variant}`}
    role={variant === 'error' ? 'alert' : 'status'}
  >
    {title ? <p className="alert__title">{title}</p> : null}
    <div className="alert__body">{children}</div>
  </div>
)
