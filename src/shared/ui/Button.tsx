import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary shadow-field hover:bg-primary-hover active:bg-primary-active',
  outline: 'border border-primary text-primary hover:bg-primary-50',
  ghost: 'text-label hover:bg-surface-muted',
}

type ButtonProps = {
  variant?: ButtonVariant
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors',
        'focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANT_CLASS[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      type={type}
      {...rest}
    />
  )
}
