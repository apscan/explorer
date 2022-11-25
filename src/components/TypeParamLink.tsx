import React, { useMemo } from 'react'
import { truncated } from 'utils/truncated'
import { Link } from './link'

export const TypeParamLink = ({
  fallback,
  value,
  ellipsis,
  to,
  ...props
}: {
  fallback?: React.ReactNode
  value?: string
  ellipsis?: boolean
  to?: string
}) => {
  const parts = useMemo(() => {
    if (typeof value !== 'string') return

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
    <Link to={to} {...props}>
      {parts}
    </Link>
  )
}
