import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface CommonProps {
  label: string
  error?: string
}

const control =
  'w-full rounded-lg border bg-bg px-3 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent'

type InputProps = CommonProps & InputHTMLAttributes<HTMLInputElement>

export const InputField = forwardRef<HTMLInputElement, InputProps>(function InputField(
  { label, error, id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium">
        {label}
      </label>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`${control} ${error ? 'border-red-500' : 'border-border'}`}
        {...rest}
      />
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
})

type TextareaProps = CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function TextareaField({ label, error, id, ...rest }, ref) {
    const fieldId = id ?? rest.name
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId} className="text-sm font-medium">
          {label}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={5}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`${control} resize-y ${error ? 'border-red-500' : 'border-border'}`}
          {...rest}
        />
        {error && (
          <p id={`${fieldId}-error`} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  },
)
