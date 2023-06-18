import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { BoxProps } from 'components/container'
import { PopoverContent } from 'components/popover'
import { vars } from 'theme/theme.css'
import { LinkBox, LinkOverlay } from 'components/link'

export const linkBox = css`
  padding: 8px 28px;
  background: ${vars.colors.backgroundMain};
  border-radius: 8px;
  color: ${vars.text.header};
`

export const slideInUp = keyframes`
  0% {
      transform: translate3d(0,8px,0);
      visibility: visible
  }

  to {
      transform: translateZ(0)
  }
`

export const PopoverMenu = styled(({ isOpen, ...props }: { isOpen: boolean }) => (
  <PopoverContent {...props} />
))<
  {
    isOpen: boolean
  } & BoxProps
>`
  min-width: 230px;
  border: 0;
  border-top: 3px solid ${vars.colors.link};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  ${(props) =>
    props.isOpen &&
    css`
      animation: ${slideInUp} 100ms;
      animation-fill-mode: both;
    `}
`

export const PopoverMenuItem = ({
  isDisabled,
  isActive,
  path,
  onClose,
  children,
  ...props
}: { path?: string; onClose: () => void; isDisabled?: boolean; isActive?: boolean } & BoxProps) => {
  return (
    <LinkBox onClick={isDisabled ? undefined : onClose} css={linkBox} {...props}>
      <LinkOverlay
        to={path}
        disabled={isDisabled}
        css={css`
          color: ${isActive && !isDisabled ? vars.colors.link : 'inherit'};
          &:hover {
            ${isActive &&
            css`
              color: ${vars.colors.link};
            `}
            text-decoration: none;
          }
          &[disabled] {
            color: inherit;
            cursor: auto;
            pointer-events: none;
          }
          font-size: 14px;
        `}
      >
        {children}
      </LinkOverlay>
    </LinkBox>
  )
}
