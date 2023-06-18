import { css } from '@emotion/react'
import { forwardRef, memo } from 'react'
import { Box, BoxProps } from '../container/Box'
import { DateTime } from '../DateTime'
import { Link } from '../link'
import { NumberFormat } from '../NumberFormat'

const container = css`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`

const timestampContainer = css`
  display: flex;
  flex-direction: column;
`

export interface BlockHeightProps extends BoxProps {
  value?: number | string
  timestamp?: number
  fallback?: React.ReactNode
}

export const BlockHeight = memo(
  forwardRef<HTMLDivElement, BlockHeightProps>(({ value, as = Link, timestamp, fallback, ...props }, ref) => {
    if (isNaN(value as any)) return <>{fallback}</>

    return (
      <Box as={as} to={`/block/${value}`} css={container} ref={ref} {...props}>
        {timestamp ? (
          <Box css={timestampContainer}>
            <NumberFormat value={value} />
            <DateTime fontSize="12px" fontWeight="400" value={timestamp} />
          </Box>
        ) : (
          <NumberFormat value={value} />
        )}
      </Box>
    )
  })
)

BlockHeight.displayName = 'BlockHeight'
