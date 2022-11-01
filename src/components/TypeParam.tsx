import { css } from '@emotion/react'
import React, { useMemo } from 'react'
import { Address } from './Address'
import { Box } from './container'
import { Tooltip } from './Tooltip'

const ellipsisStyle = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  max-width: 192px;
`

export const TypeParam = ({
  fallback,
  value,
  ellipsis,
  ...props
}: {
  fallback?: React.ReactNode
  value?: string
  ellipsis?: boolean
}) => {
  const parts = useMemo(() => {
    if (typeof value !== 'string') return

    return value.split(/(::|<)/g).map((str) => {
      if (/^0x[0-9a-f]+$/.test(str)) {
        return <Address size="short" value={str} />
      }

      return str
    })
  }, [value])

  if (!value) return <>{fallback}</>

  return (
    <Tooltip label={value} isDisabled>
      <Box css={false} as="span" {...props}>
        {parts?.map((item, index) => {
          return <React.Fragment key={index}>{item}</React.Fragment>
        })}
      </Box>
    </Tooltip>
  )
}
