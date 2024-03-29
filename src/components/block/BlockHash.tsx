import { css } from '@emotion/react'
import { CopyButton } from 'components/CopyButton'
import Tooltip from 'components/tooltipWithCopy'
import { memo, useMemo } from 'react'
import { truncatedWithSize } from 'utils/truncated'
import { Box, BoxProps } from '../container/Box'
import { Link } from '../link'

const container = css`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`

const ellipsisStyle = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  max-width: 120px;
`

export interface BlockHashProps extends BoxProps {
  value?: string
  timestamp?: number
  size?: 'full' | 'short' | 'long'
  ellipsis?: boolean
  success?: boolean
  fallback?: React.ReactNode
  copyable?: boolean
}

export const BlockHash = memo(
  ({ value, copyable, size, timestamp, success, ellipsis, fallback, as = Link, ...props }: BlockHashProps) => {
    const hash = useMemo(() => (ellipsis ? value : truncatedWithSize(value, size)), [value, ellipsis, size])
    const copy = useMemo(() => (copyable !== undefined ? copyable : size === 'full'), [copyable, size])

    if (!hash) return <>{fallback}</>

    return (
      <Tooltip label={value} isDisabled={size === 'full'}>
        <Box css={container} {...props}>
          <Box as={as} to={`/block/${value}`} css={[container, ellipsis ? ellipsisStyle : false]}>
            {hash}
          </Box>
          {copy && value && <CopyButton text={value} />}
        </Box>
      </Tooltip>
    )
  }
)

BlockHash.displayName = 'BlockHash'
