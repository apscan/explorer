import { Progress as ChakraProgress } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Progress = styled(ChakraProgress)`
  background: #eeedf0;
  div[role='progressbar'] {
  }
  ${(props) =>
    props.size === 'sm' &&
    css`
      border-radius: 2px;
      height: 4px;
    `}
`
