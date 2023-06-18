import { Popover, PopoverProps, PopoverTrigger, PopoverContent, PopoverArrow } from 'components/popover'
import { Icon } from './Icon'
import { vars } from 'theme/theme.css'
import { css } from '@emotion/react'
import { BoxProps } from './container'
import { ReactComponent as Eye } from 'assets/icons/eye.svg'

export const Poptip = ({ children, ...props }: PopoverProps & BoxProps) => {
  return (
    <Popover trigger="hover" placement="end" {...props}>
      <PopoverTrigger>
        <Icon
          as={Eye}
          sx={{
            cursor: 'pointer',
            marginLeft: '4px',
            width: '16px',
            height: '16px',
            borderRadius: '4px',
            backgroundColor: 'rgba(119, 131, 143, 0.1)',
            '&:hover': {
              backgroundColor: vars.text.secondary,
              fill: 'white',
            },
          }}
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
