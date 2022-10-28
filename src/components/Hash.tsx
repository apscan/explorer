import { css } from '@emotion/react'

import { memo, useMemo } from 'react'
import { truncatedWithSize } from 'utils/truncated'
import { Box, BoxProps } from './container/Box'
import { CopyButton } from './CopyButton'
import { Tooltip } from './Tooltip'

export interface HashProps extends BoxProps {
  value?: string
  size?: 'full' | 'short' | 'long'
  fallback?: React.ReactNode
  copyable?: boolean
  ellipsis?: boolean
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
`

export const Hash = memo(({ copyable, value, ellipsis, size, fallback, ...props }: HashProps) => {
  const hash = useMemo(() => truncatedWithSize(value, size), [value, size])
  const copy = useMemo(() => (copyable !== undefined ? copyable : size === 'full'), [copyable, size])

  if (!hash) return <>{fallback}</>

  return (
    <Tooltip label={value} isDisabled={!ellipsis}>
      <Box css={[container, ellipsis ? ellipsisStyle : false]} {...props}>
        {hash}
        {copy && value && <CopyButton text={value} />}
      </Box>
    </Tooltip>
  )
})

Hash.displayName = 'Hash'
