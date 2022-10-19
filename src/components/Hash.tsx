import { css } from '@emotion/react'
import { memo, useMemo } from 'react'
import { truncatedWithSize } from 'utils/truncated'
import { Box, BoxProps } from './container/Box'
import { CopyButton } from './CopyButton'

export interface HashProps extends BoxProps {
  value?: string
  size?: 'full' | 'short' | 'long'
  fallback?: React.ReactNode
  copyable?: boolean
}

const container = css`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`

export const Hash = memo(({ copyable, value, size, fallback, ...props }: HashProps) => {
  const hash = useMemo(() => truncatedWithSize(value, size), [value, size])
  const copy = useMemo(() => (copyable !== undefined ? copyable : size === 'full'), [copyable, size])
  if (!hash) return <>{fallback}</>

  return (
    <Box css={container} {...props}>
      {hash}
      {copy && value && <CopyButton text={value} />}
    </Box>
  )
})

Hash.displayName = 'Hash'
