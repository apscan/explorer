import { forwardRef, useMemo } from 'react'
import { BaseInput, BaseInputProps } from './BaseInput'

export type InputProps = Omit<BaseInputProps, 'onChange'> & {
  onChange?: (value: string) => void
}

export const NumberInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { onChange, type, ...rest } = props

  const inputProps = useMemo(() => {
    return {
      pattern: type === 'number' ? `(^[0-9]{0,9}$)|(^[0-9]{0,9}[.][0-9]{0,4}$)` : '.*',
      inputMode: type === 'number' ? ('decimal' as const) : ('text' as const),
      ...rest,
    }
  }, [rest, type])

  const pattern = new RegExp(inputProps.pattern)

  return (
    <BaseInput
      ref={ref}
      onChange={(e) => {
        if (e.target.value === '' || pattern.test(e.target.value)) {
          onChange && onChange(e.target.value)
        }
      }}
      {...inputProps}
    />
  )
})

NumberInput.displayName = 'NumberInput'
