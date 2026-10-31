import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  readonly value: string
  readonly label: string
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  readonly label: string
  readonly options: readonly SelectOption[]
  readonly placeholder?: string
  readonly error?: string
  readonly hint?: string
}

export const SelectField = ({
  label,
  options,
  placeholder,
  error,
  hint,
  required = false,
  className,
  ...rest
}: SelectFieldProps) => {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? <span className="field__required"> *</span> : null}
      </label>

      <select
        {...rest}
        id={id}
        className={['field__input', 'field__select', error ? 'field__input--invalid' : null]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
      >
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hint && !error ? (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
