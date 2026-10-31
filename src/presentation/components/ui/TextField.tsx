import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  readonly label: string
  readonly error?: string
  readonly hint?: string
  readonly trailing?: ReactNode
}

export const TextField = ({
  label,
  error,
  hint,
  trailing,
  required = false,
  className,
  ...rest
}: TextFieldProps) => {
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

      <div className={['field__control', trailing ? 'field__control--with-trailing' : null]
        .filter(Boolean)
        .join(' ')}
      >
        <input
          {...rest}
          id={id}
          className={['field__input', error ? 'field__input--invalid' : null]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
        />
        {trailing ? <div className="field__trailing">{trailing}</div> : null}
      </div>

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
