import { Button, ButtonProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

export type BaseButtonProps = ButtonProps

export const BaseButton = styled(Button)`
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  padding: 0;
  position: relative;
  align-items: center;
  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;

  font-size: 14px;

  :hover {
    filter: brightness(95%) saturate(90%);
  }
  :hover[disabled] {
    filter: brightness(100%) saturate(100%);
  }

  :focus {
    box-shadow: inherit;
  }

  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${(props) =>
    props.variant === 'main' &&
    css`
      border-radius: 8px;
    `}

  ${(props) =>
    props.size === 'lg' &&
    css`
      height: 48px;
      padding-left: 20px;
      padding-right: 20px;
      font-size: 16px;
    `}
`

BaseButton.defaultProps = {
  colorScheme: 'none',
}
