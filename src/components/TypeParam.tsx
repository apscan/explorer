import React, { useMemo } from 'react'
import { Address } from './Address'
import { Box } from './container'
import { Link } from './link'
import Tooltip from './tooltipWithCopy'

export const TypeParam = ({
  fallback,
  value,
  ellipsis,
  raw = false,
  ...props
}: {
  fallback?: React.ReactNode
  value?: string
  ellipsis?: boolean
  raw?: boolean
}) => {
  const rawValue = value
  const parts = useMemo(() => {
    if (typeof value !== 'string') return

    if (raw && value.lastIndexOf('>') === value.length - 1) {
      value = value.slice(0, value.indexOf('<')) + '<...>'
    }

    return value.split(/(::|<|,\W)/g).map((str) => {
      if (/^0x[0-9a-f]+$/.test(str)) {
        return <Address hideTooltip={raw} as={raw ? 'span' : Link} size="short" value={str} />
      }

      return str
    })
  }, [raw, value])

  if (!value) return <>{fallback}</>

  return (
    <Tooltip label={rawValue}>
      {raw ? (
        <Box css={false} as={Link} {...props} to={`/coin/${rawValue}`}>
          {parts?.map((item, index) => {
            return <React.Fragment key={index}>{item}</React.Fragment>
          })}
        </Box>
      ) : (
        <Box css={false} as="span" {...props}>
          {parts?.map((item, index) => {
            return <React.Fragment key={index}>{item}</React.Fragment>
          })}
        </Box>
      )}
    </Tooltip>
  )
}
