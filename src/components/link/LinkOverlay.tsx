import { forwardRef, LinkOverlay as CLinkOverlay } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Link, LinkProps, linkStyle } from './Link'

export const LinkOverlay = styled(
  forwardRef<LinkProps, 'a'>(({ href, disabled, ...props }, ref) => {
    return (
      <CLinkOverlay
        disabled={disabled}
        as={Link}
        css={linkStyle}
        href={href}
        ref={ref}
        {...props}
      />
    )
  })
)``

LinkOverlay.displayName = 'LinkOverlay'
