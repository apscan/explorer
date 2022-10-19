import { css } from '@emotion/react'
import { CopyButton } from 'components/CopyButton'
import { memo, useMemo } from 'react'
import { truncatedWithSize } from 'utils/truncated'
import { Box, BoxProps } from '../container/Box'
import { Link } from '../link'

const container = css`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`

export interface BlockHashProps extends BoxProps {
  value?: string
  timestamp?: number
  size?: 'full' | 'short' | 'long'
  success?: boolean
  fallback?: React.ReactNode
  copyable?: boolean
}

export const BlockHash = memo(
  ({ value, copyable, size, timestamp, success, fallback, as = Link, ...props }: BlockHashProps) => {
    const hash = useMemo(() => truncatedWithSize(value, size), [value, size])
    const copy = useMemo(() => (copyable !== undefined ? copyable : size === 'full'), [copyable, size])

    if (!hash) return <>{fallback}</>

    return (
      <Box css={container} {...props}>
        <Box as={as} to={`/block/${value}`} css={container}>
          {hash}
        </Box>
        {copy && value && <CopyButton text={value} />}
      </Box>
    )
  }
)

BlockHash.displayName = 'BlockHash'
