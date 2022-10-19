import { forwardRef, memo, useMemo } from 'react'
import { NumberFormat, NumberFormatProps } from './NumberFormat'

import { formatFixed } from '@ethersproject/bignumber'

export interface AmountFormatProps extends NumberFormatProps {
  decimals?: number
}

export const AmountFormat = memo(
  forwardRef<HTMLDivElement, AmountFormatProps>(({ decimals = 8, fallback, value, ...rest }, ref) => {
    const withDecimal = useMemo(() => {
      if (value == null) return
      return formatFixed(value?.toString() || 0, decimals)
    }, [value, decimals])

    if (!withDecimal) return <>{fallback}</>

    return <NumberFormat useGrouping={true} separate={true} symbol="APT" value={withDecimal} ref={ref} {...rest} />
  })
)

AmountFormat.displayName = 'AmountFormat'
