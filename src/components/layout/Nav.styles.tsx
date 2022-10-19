import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { vars } from 'theme/theme.css'
import { ReactComponent as Arrowdown } from 'assets/icons/arrowdown.svg'

export const navItem = css`
  padding: 12px 16px;
`

export const pageNav = css`
  display: flex;
  font-size: 14px;
  user-select: none;
  color: ${vars.text.header};
`

export const icon = css`
  padding: 8px 28px;
  background: ${vars.colors.backgroundMain};
  border-radius: 8px;
  color: ${vars.text.header};
`

export const trigger = css`
  cursor: pointer;
  align-items: center;
`

export const navRouteLink = css`
  cursor: pointer;
  &:hover {
    color: ${vars.colors.link};
    text-decoration: none;
  }
`

export const StyledArrowdown = styled(Arrowdown)`
  height: 12px;
  margin-left: 4px;
  transform: translateY(1px);
`
