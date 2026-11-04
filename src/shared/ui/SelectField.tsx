import type { ReactNode, SelectHTMLAttributes } from 'react'

import { controlClass, labelClass } from './field-styles'

export type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps = {
  id: string
  label: string
  options: readonly SelectOption[]
  /** Opsi kosong di urutan pertama (mis. "Pilih jenis kelamin"). */
  placeholder?: string
  hint?: ReactNode
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'children'>

export function SelectField({
  id,
  label,
  options,
  placeholder,
  hint,
  className = '',
  ...rest
}: SelectFieldProps) {
  return (
    <div className={className}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <select className={controlClass} id={id} name={rest.name ?? id} {...rest}>
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
    </div>
  )
}
