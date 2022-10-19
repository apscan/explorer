import { Input, InputProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { vars } from 'theme/theme.css'

export type BaseInputProps = InputProps

export const BaseInput = styled(Input)`
  border: 1px solid ${vars.colors.border3};
  border-radius: 8px;

  &:focus {
    box-shadow: 0 0 0 2px rgb(203 188 185 / 25%);
  }

  ${(props) =>
    props.size === 'lg' &&
    css`
      height: 48px;
      font-size: 16px;

      ::placeholder {
        font-size: 14px;
      }
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      height: 32px;
      font-size: 14px;
    `}
`

BaseInput.defaultProps = {
  colorScheme: 'none',
  size: 'sm',
}
