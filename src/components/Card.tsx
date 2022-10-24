import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { vars } from 'theme/theme.css'
import { Box } from './container/Box'

export const Card = styled(Box)`
  border-radius: 8px;
  border: 1px solid ${vars.colors.border1};
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: ${vars.colors.backgroundMain};
  box-shadow: ${vars.shadows.shadow3};
  position: relative;
  padding: ${(props) => (props.variant === 'table' ? '12px' : 0)};
`

export const CardHead = styled(Box)`
  ${(props) =>
    props.variant === 'table' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    `}
  ${(props) =>
    props.variant === 'tabletab' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    `}
`

export const CardHeadStats = styled(Box)`
  ${(props) =>
    props.variant === 'table' &&
    css`
      display: flex;
      align-items: center;
      color: ${vars.text.header};
      font-size: 14px;
      line-height: 1.7;
    `}
  ${(props) =>
    props.variant === 'tabletab' &&
    css`
      display: flex;
      align-items: center;
      color: ${vars.text.header};
      font-size: 14px;
    `}
`

export const CardFooter = styled(Box)`
  ${(props) =>
    props.variant === 'table' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 0 0;
    `}
  ${(props) =>
    props.variant === 'tabletab' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 0 0;
    `}
`
