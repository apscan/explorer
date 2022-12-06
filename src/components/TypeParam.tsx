import React, { useMemo } from 'react'
import { Address } from './Address'
// import { Box } from './container'
import { Link } from './link'
import Tooltip from './tooltipWithCopy'

export const TypeParam = ({
  fallback,
  value,
}: // ...props
{
  fallback?: React.ReactNode
  value?: string
}) => {
  const rawValue = value
  const parts = useMemo(() => {
    if (typeof value !== 'string') return

    return value.split(/(::|<|,\W)/g).map((str) => {
      if (/^0x[0-9a-f]+$/.test(str)) {
        return <Address hideTooltip as={Link} size="short" value={str} />
      }

      return str
    })
  }, [value])

  if (!value) return <>{fallback}</>

  return (
    <Tooltip label={rawValue}>
      {/* <Box css={false} as="span" {...props}>
        {parts?.map((item, index) => {
          return <React.Fragment key={index}>{item}</React.Fragment>
        })}
      </Box> */}
      {parts?.map((item, index) => {
        return <React.Fragment key={index}>{item}</React.Fragment>
      })}
    </Tooltip>
  )
}
