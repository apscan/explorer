import { css } from '@emotion/react'
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import copy from 'copy-to-clipboard'
import { memo, useState } from 'react'
import { vars } from 'theme/theme.css'
import { Box, BoxProps } from './container/Box'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'

const copyButton = css`
  cursor: pointer;
  width: 0.92em;
  height: 0.92em;
  margin-left: 0.25em;
  transform: translateY(1px);
  color: ${vars.text.secondary};
  :hover {
    color: ${vars.text.secondaryHover};
  }
`

type CopyButtonProps = {
  text: string
}

export const CopyButton = memo(({ text, ...rest }: CopyButtonProps & BoxProps) => {
  const [copied, setCopied] = useState(false)

  return (
    <Tooltip
      placement="top"
      openDelay={200}
      closeOnClick={false}
      label={copied ? 'Copied' : 'Copy to clipboard'}
      onClose={() => {
        setCopied(false)
      }}
    >
      <Box as="span">
        <Icon
          onClick={(e) => {
            copy(text)
            setCopied(true)
            e.stopPropagation()
          }}
          as={copied ? CheckCircleIcon : CopyIcon}
          css={copyButton}
          {...rest}
        />
      </Box>
    </Tooltip>
  )
})
