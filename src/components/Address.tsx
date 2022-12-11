import { css } from '@emotion/react'
import { addressTagsMap } from 'config/address-tags'
import { useAns } from 'hooks/useAns'
import { memo, useMemo } from 'react'
import { truncated } from 'utils/truncated'
import { Box, BoxProps } from './container'
import { CopyButton } from './CopyButton'
import { Link } from './link'
import Tooltip from './tooltipWithCopy'

const container = css`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`

export interface AddressProps extends BoxProps {
  value?: string
  fallback?: React.ReactNode
  tooltip?: React.ReactNode
  hideTooltip?: boolean
  size?: 'full' | 'short' | 'long'
  copyable?: boolean
  replaceAddress?: boolean
}

export const Address = memo(
  ({
    as = Link,
    copyable,
    tooltip: _tooltip,
    hideTooltip,
    value,
    size = 'long',
    fallback,
    replaceAddress = true,
    ...props
  }: AddressProps) => {
    const ans = useAns(value)
    const text = useMemo(() => {
      if (!value) return

      if (size === 'long') {
        return truncated(value, 16)
      }

      if (size === 'short') {
        return truncated(value, 8)
      }

      return value
    }, [value, size])

    const copy = useMemo(() => (copyable !== undefined ? copyable : size === 'full'), [copyable, size])

    const tooltip = useMemo(() => {
      if (hideTooltip) return undefined

      if (size === 'full') return undefined

      return _tooltip || value
    }, [hideTooltip, size, _tooltip, value])

    if (!text || !value) return <>{fallback}</>

    return (
      <Tooltip label={tooltip} isDisabled={!tooltip} closeDelay={500000}>
        <Box {...props} css={container}>
          <Box as={as} css={container} to={`/account/${value}`}>
            {replaceAddress ? ans || addressTagsMap[value]?.label || text : text}
          </Box>
          {copy && value && <CopyButton text={value} />}
        </Box>
      </Tooltip>
    )
  }
)

Address.displayName = 'Address'
