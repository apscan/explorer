import { css } from '@emotion/react'
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { CopyButton } from 'components/CopyButton'
import { Icon } from 'components/Icon'
import { Tooltip } from 'components/Tooltip'
import { memo, useMemo } from 'react'
import { vars } from 'theme/theme.css'
import { truncatedWithSize } from 'utils/truncated'
import { Box, BoxProps } from '../container/Box'
import { Link } from '../link'

const icon = css`
  width: 1em;
  height: 1em;
  margin-right: 4px;
  transform: translateY(1.8px);
`

const container = css`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-family: SF Mono, sans-serif;
`

export interface TxHashProps extends BoxProps {
  value?: string
  vmStatus?: string
  timestamp?: number
  size?: 'full' | 'short' | 'long'
  success?: boolean
  fallback?: React.ReactNode
  copyable?: boolean
}

export const TxHash = memo(
  ({ value, as = Link, copyable, vmStatus, size, timestamp, success, fallback, ...props }: TxHashProps) => {
    const hash = useMemo(() => truncatedWithSize(value, size), [value, size])
    const copy = useMemo(() => (copyable !== undefined ? copyable : size === 'full'), [copyable, size])

    if (!hash) return <>{fallback}</>

    return (
      <Box css={container} {...props}>
        <Box as={as} to={`/tx/${value}`} css={container}>
          {success !== undefined && (
            <Tooltip label={vmStatus} isDisabled={success === true || !vmStatus}>
              <Icon
                as={success ? CheckIcon : CloseIcon}
                css={[
                  icon,
                  css`
                    color: ${success ? vars.text.success : vars.text.error};
                  `,
                ]}
              />
            </Tooltip>
          )}
          {hash}
        </Box>
        {copy && value && <CopyButton text={value} />}
      </Box>
    )
  }
)

TxHash.displayName = 'TxHash'
