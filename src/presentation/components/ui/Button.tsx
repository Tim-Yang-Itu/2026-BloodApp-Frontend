import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant
  readonly isLoading?: boolean
  readonly fullWidth?: boolean
  readonly children: ReactNode
}

export const Button = ({
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  type = 'button',
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  const classes = ['btn', `btn--${variant}`, fullWidth ? 'btn--full' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...rest}
      type={type}
      className={classes}
      disabled={disabled === true || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? <span className="spinner" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  )
}
