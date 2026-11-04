import type { InputHTMLAttributes, ReactNode } from 'react'

import { controlClass, labelClass } from './field-styles'

type TextFieldProps = {
  /** Wajib: dipakai menghubungkan `<label>` dengan `<input>`. */
  id: string
  label: string
  hint?: ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

export function TextField({ id, label, hint, className = '', ...rest }: TextFieldProps) {
  return (
    <div className={className}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input className={controlClass} id={id} name={rest.name ?? id} {...rest} />
      {hint ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
    </div>
  )
}
