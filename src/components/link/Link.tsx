import { forwardRef, Link as CLink, LinkProps as CLinkProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Tooltip } from 'components/Tooltip'
import React, { memo, useMemo } from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps, To } from 'react-router-dom'
import { vars } from 'theme/theme.css'

export type LinkProps = Omit<CLinkProps, 'href'> &
  Omit<RouterLinkProps, 'to'> & {
    tooltip?: React.ReactNode
    disabled?: boolean
    isExternal?: boolean
    to?: To
    underline?: boolean
  }

const isValidUrl = (str: any) => {
  try {
    new URL(str)
    return true
  } catch (_) {
    return false
  }
}

export const linkStyle = css`
  color: ${vars.colors.link};
  text-decoration: none;

  &:hover {
    color: ${vars.colors.linkHover};
    text-decoration: none;
  }

  &:focus {
    box-shadow: none;
  }
`

export const linkStyleUnderLine = css`
  text-decoration: underline;

  &:hover {
    color: ${vars.colors.linkHover};
  }

  &:focus {
    box-shadow: none;
  }
`

export const Link = memo(
  styled(
    forwardRef<LinkProps, 'a'>((props, ref) => {
      const { tooltip, to: _to, href: _href, variant, isExternal, ...rest } = props

      const [as, to, href] = useMemo(() => {
        if (!_to) {
          return ['a' as const, undefined, undefined]
        } else if (typeof _to === 'string' && isValidUrl(_to)) {
          // external link
          return ['a' as const, undefined, _to]
        } else {
          return [RouterLink, _to, undefined]
        }
      }, [_to])

      return (
        <Tooltip label={tooltip} isDisabled={!tooltip}>
          <CLink
            as={as}
            href={href}
            to={to}
            css={[props.underline ? linkStyleUnderLine : linkStyle]}
            ref={ref}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            target={isExternal ? '_blank' : undefined}
            {...rest}
          />
        </Tooltip>
      )
    })
  )``
)

Link.displayName = 'Link'
