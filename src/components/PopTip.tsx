import { Popover, PopoverProps, PopoverTrigger, PopoverContent, PopoverArrow } from 'components/popover'
import { Icon } from './Icon'
import { ReactComponent as QuestionCircleIcon } from 'assets/icons/question-circle.svg'
import { vars } from 'theme/theme.css'
import { css } from '@emotion/react'
import { BoxProps } from './container'

export const Poptip = ({ children, ...props }: PopoverProps & BoxProps) => {
  return (
    <Popover trigger="hover" placement="end" {...props}>
      <PopoverTrigger>
        <Icon
          as={QuestionCircleIcon}
          css={css`
            margin-left: 4px;
            color: ${vars.text.secondary};
            width: 16px;
            height: 16px;
          `}
        />
      </PopoverTrigger>
      <PopoverContent
        css={css`
          border: none;
          box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 70%);
          padding: 0;
        `}
      >
        <PopoverArrow />
        {children}
      </PopoverContent>
    </Popover>
  )
}
