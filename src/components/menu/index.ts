import styled from '@emotion/styled'
import {
  Menu as CMenu,
  MenuButton as CMenuButton,
  MenuList as CMenuList,
  MenuItem as CMenuItem,
  MenuItemOption as CMenuItemOption,
  MenuGroup as CMenuGroup,
  MenuOptionGroup as CMenuOptionGroup,
  MenuDivider as CMenuDivider,
} from '@chakra-ui/react'
import { vars } from 'theme/theme.css'

const Menu = styled(CMenu)``

const MenuButton = styled(CMenuButton)`
  font-weight: 400;
  height: 33px;
  color: #1e2022;
  font-size: 0.875rem;
  padding: 0.3rem 0.6rem;
  background-color: ${vars.colors.backgroundMain};
  border: 1px solid #d5dae2;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: transparent;
  }
`

const MenuList = styled(CMenuList)`
  color: #1e2022;
  font-size: 0.875rem;
  padding: 0.3rem 0.6rem;
  background-color: ${vars.colors.backgroundMain};
  border: 1px solid #d5dae2;
  border-radius: 0.25rem;
  padding: 1rem 0em;
`

const MenuItem = styled(CMenuItem)`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: transparent;
  &:hover {
    color: white !important;
    span {
      color: white !important;
    }
    background-color: #3498db;
  }
`

const MenuItemOption = styled(CMenuItemOption)``

const MenuGroup = styled(CMenuGroup)``

const MenuOptionGroup = styled(CMenuOptionGroup)``

const MenuDivider = styled(CMenuDivider)``

export { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider }
