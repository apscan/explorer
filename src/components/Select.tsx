import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { vars } from 'theme/theme.css'

export type SelectProps = ChakraSelectProps

export const Select = styled(ChakraSelect)`
  border-radius: 8px;
  border: 1px solid ${vars.colors.border3};

  ${(props) =>
    props.size === 'lg' &&
    css`
      height: 48px;
      font-size: 16px;
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      height: 32px;
      font-size: 12px;
    `}
`

Select.defaultProps = {
  colorScheme: 'none',
  size: 'sm',
}
