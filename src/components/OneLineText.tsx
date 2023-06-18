import { css } from '@emotion/react'

import { memo, useMemo } from 'react'
import { Box, BoxProps } from './container/Box'
import Tooltip from './tooltipWithCopy'

export interface HashProps extends BoxProps {
  value?: string
  size?: 'full' | 'short' | 'long'
  fallback?: React.ReactNode
  copyable?: boolean
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
  vertical-align: bottom;
`

export const OneLineText = memo(
  ({ tooltip, copyable, value, ellipsis, size, fallback, ...props }: HashProps) => {
    // const text = useMemo(() => ((value?.length || 0) > 40 ? <span>{value?.slice(0, value.indexOf('<'))}&lt;<span style={{color: vars.colors.link}}>...</span>&gt;</span> : value), [value])
    const text = useMemo(
      () => ((value?.length || 0) > 50 ? `${value?.slice(0, value.indexOf('<'))}<...>` : value),
      [value]
    )

    if (!text) return <>{fallback}</>

    return (
      <Tooltip label={typeof tooltip === 'boolean' ? value : tooltip} isDisabled={!tooltip}>
        <Box css={[container, ellipsis ? ellipsisStyle : false]} {...props}>
          {text}
        </Box>
      </Tooltip>
    )
  }
)

OneLineText.displayName = 'OneLineText'
