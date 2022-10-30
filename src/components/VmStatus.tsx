import { css } from '@emotion/react'
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { useMemo } from 'react'
import { vars } from 'theme/theme.css'
import { Box } from './container'
import { Icon } from './Icon'

const container = css`
  display: inline-flex;
  padding: 8px 12px;
  font-size: 12px;
  border-radius: 6px;
  line-height: 1;
  align-items: center;
  font-weight: 500;
`

const icon = css`
  display: inline-flex;
  height: 1em;
  margin-right: 6px;
`

export const VmStatus = ({ value, fallback, ...props }: { value: string; fallback?: React.ReactNode }) => {
  const isSuccess = useMemo(() => {
    if (value == null) return

    return value.toLowerCase() === 'Executed successfully'.toLowerCase()
  }, [value])

  if (value == null) return <>{fallback}</>

  return (
    <Box
      css={[
        container,
        css`
          color: ${isSuccess ? vars.text.success : vars.text.error};
          background: ${isSuccess ? vars.colors.bgSuccess : vars.colors.bgError};
        `,
      ]}
      {...props}
    >
      <Icon css={icon} as={isSuccess ? CheckIcon : CloseIcon} />
      {isSuccess ? 'Success' : `Error`}
    </Box>
  )
}
