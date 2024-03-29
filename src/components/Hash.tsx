import { css } from '@emotion/react'

import { memo, useMemo } from 'react'
import { truncatedWithSize } from 'utils/truncated'
import { Box, BoxProps } from './container/Box'
import { CopyButton } from './CopyButton'
import Tooltip from './tooltipWithCopy'
import { formatBytes } from 'utils/formatBytes'

export interface HashProps extends BoxProps {
  value?: string
  size?: 'full' | 'short' | 'long'
  fallback?: React.ReactNode
  copyable?: boolean
  showLength?: boolean
  ellipsis?: boolean
  tooltip?: boolean | React.ReactNode
}

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
  max-width: 192px;
  vertical-align: bottom;
`

export const Hash = memo(({ tooltip, showLength, copyable, value, ellipsis, size, fallback, ...props }: HashProps) => {
  const hash = useMemo(() => (ellipsis ? value : truncatedWithSize(value, size)), [value, size, ellipsis])
  const copy = useMemo(() => (copyable !== undefined ? copyable : size === 'full'), [copyable, size])

  if (!hash) return <>{fallback}</>

  return (
    <Tooltip label={typeof tooltip === 'boolean' ? value : tooltip} isDisabled={!tooltip}>
      <Box css={[container, ellipsis ? ellipsisStyle : false]} {...props}>
        {hash}
        {showLength && `(${formatBytes(value?.length ? (value?.length - 2) / 2 : 0)})`}
        {copy && value && <CopyButton text={value} />}
      </Box>
    </Tooltip>
  )
})

Hash.displayName = 'Hash'
