import { css } from '@emotion/react'
import React from 'react'
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
}: {
  fallback?: React.ReactNode
  value?: string
  ellipsis?: boolean
}) => {
  if (!value) return <>{fallback}</>

  return (
    <Tooltip label={value} isDisabled>
      <Box css={ellipsis ? ellipsisStyle : undefined} as="span">
        {value}
      </Box>
    </Tooltip>
  )
}
