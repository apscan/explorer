import React, { useMemo } from 'react'
import { truncated } from 'utils/truncated'
import { Link } from './link'
import Tooltip from './tooltipWithCopy'

export const TypeParamUnderLine = ({
  fallback,
  value,
  ellipsis,
  ...props
}: {
  fallback?: React.ReactNode
  value?: string
  ellipsis?: boolean
}) => {
  const rawValue = value
  const parts = useMemo(() => {
    if (typeof value !== 'string') return

    if (value.lastIndexOf('>') === value.length - 1) {
      value = value.slice(0, value.indexOf('<')) + '<...>'
    }

    return value
      .split(/(::|<|,\W)/g)
      .map((str) => {
        if (/^0x[0-9a-f]+$/.test(str)) {
          return truncated(str, 8)
        }

        return str
      })
      .join('')
  }, [value])

  if (!value) return <>{fallback}</>

  return (
    <Tooltip label={rawValue}>
      <Link underline={true} {...props}>
        {parts}
      </Link>
    </Tooltip>
  )
}
