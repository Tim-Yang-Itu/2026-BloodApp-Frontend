import type { InputHTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'

import { controlClass, labelClass } from './field-styles'

type PasswordFieldProps = {
  id: string
  label: string
  hint?: ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>

/**
 * Input password dengan tombol tampil/sembunyikan.
 * Nilai tombol tidak men-submit form (`type="button"`).
 */
export function PasswordField({ id, label, hint, className = '', ...rest }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleLabel = isVisible ? 'Sembunyikan password' : 'Tampilkan password'

  return (
    <div className={className}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className={`${controlClass} pr-11`}
          id={id}
          name={rest.name ?? id}
          type={isVisible ? 'text' : 'password'}
          {...rest}
        />
        <button
          aria-label={toggleLabel}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 grid w-11 cursor-pointer place-items-center rounded-r-lg text-placeholder transition-colors hover:text-label focus-visible:text-label focus-visible:outline-none"
          onClick={() => setIsVisible((visible) => !visible)}
          tabIndex={0}
          title={toggleLabel}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-4.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            viewBox="0 0 24 24"
          >
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
            <circle cx="12" cy="12" r="3.2" />
            {isVisible ? null : <path d="M4 20 20 4" />}
          </svg>
        </button>
      </div>
      {hint ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
    </div>
  )
}
