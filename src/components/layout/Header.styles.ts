import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'

export const logo = css`
  margin: 10px 0;
  margin-right: 40px;
  display: flex;
`

export const logoImg = css`
  height: 36px;
`

export const container = css`
  display: flex;
  justify-content: space-between;
`

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
`

export const content = css`
  display: flex;
  align-items: center;
  margin-left: auto;
`

export const divider = css`
  height: 20px;
  margin: 0 16px 0 0;
`

export const header = css`
  width: 100%;
  font-weight: 500;
  background: ${vars.colors.backgroundMain};
  box-shadow: ${vars.shadows.shadow2};
`
