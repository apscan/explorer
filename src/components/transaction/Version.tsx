import { css } from '@emotion/react'
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { Icon } from 'components/Icon'
import Tooltip from 'components/tooltipWithCopy'
import { memo } from 'react'
import { vars } from 'theme/theme.css'
import { Box, BoxProps } from '../container/Box'
import { Link } from '../link'
import { NumberFormat } from '../NumberFormat'

const icon = css`
  width: 1em;
  height: 1em;
  margin-right: 4px;
  transform: translateY(1.8px);
`

const container = css`
  align-items: center;
  white-space: nowrap;
`
export interface VersionProps extends BoxProps {
  value?: number
  timestamp?: number
  vmStatus?: string
  success?: boolean
}

export const Version = memo(({ value, timestamp, success, vmStatus, ...props }: VersionProps) => {
  if (typeof value !== 'number') return null

  return (
    <Box as={Link} to={`/tx/${value}`} css={container} {...props}>
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
      <NumberFormat value={value} />
    </Box>
  )
})

Version.displayName = 'Version'
