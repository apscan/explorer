import { css } from '@emotion/react'
import { Box, BoxProps, Flex } from 'components/container'
import { Link } from 'components/link'
import { Popover, PopoverTrigger } from 'components/popover'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { vars } from 'theme/theme.css'
import { navItem, navRouteLink, pageNav, StyledArrowdown, trigger } from './Nav.styles'
import { findPath, INavItem, navConfig } from './navConfig'
import { PopoverMenu, PopoverMenuItem } from './PopoverMenu'

const NavDropdown = ({ nav, ...props }: { nav: INavItem }) => {
  const { t } = useTranslation()

  const { pathname } = useLocation()

  return (
    <Popover trigger="hover" placement="bottom-start" offset={[0, 0]}>
      {({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        <>
          <PopoverTrigger>
            <Flex
              tabIndex={0}
              css={css`
                ${trigger}
                color: ${findPath(nav, pathname) || isOpen ? vars.colors.link : 'inherit'};
              `}
              {...props}
            >
              {t(nav.name)}
              <StyledArrowdown />
            </Flex>
          </PopoverTrigger>
          <PopoverMenu isOpen={isOpen}>
            {nav.sub?.map((item, index) => {
              return (
                <PopoverMenuItem
                  key={index}
                  isDisabled={item.isDisabled}
                  isActive={findPath(item, pathname)}
                  path={item.path!}
                  onClose={onClose}
                >
                  {t(item.name)}
                  {item.isDisabled && (
                    <Box as="span" marginLeft="4px">
                      (Coming Soon)
                    </Box>
                  )}
                </PopoverMenuItem>
              )
            })}
          </PopoverMenu>
        </>
      )}
    </Popover>
  )
}

const NavRoute = ({ nav, ...props }: { nav: INavItem }) => {
  const { t } = useTranslation()

  const { pathname } = useLocation()

  return (
    <Link
      to={nav.path!}
      css={[navRouteLink, `color: ${findPath(nav, pathname) ? vars.colors.link : 'inherit'}`]}
      {...props}
    >
      {t(nav.name)}
    </Link>
  )
}

export const NavItem = memo(({ nav, ...props }: { nav: INavItem } & BoxProps) => {
  if (nav.path && !nav.sub) {
    return <NavRoute nav={nav} {...props} />
  }

  return <NavDropdown nav={nav} {...props} />
})

export const PageNav = ({ ...rest }) => {
  return (
    <Box as="nav" css={pageNav} {...rest}>
      {navConfig.map((item, index) => (
        <NavItem key={index} nav={item} css={navItem} />
      ))}
    </Box>
  )
}
