import styled from '@emotion/styled'
import { PopoverContent as ChakraPopoverContent } from '@chakra-ui/react'
import { vars } from 'theme/theme.css'

export const PopoverContent = styled(ChakraPopoverContent)`
  &:focus {
    box-shadow: ${vars.shadows.shadow1};
  }
  width: auto;
  padding: 16px 0;
  box-shadow: ${vars.shadows.shadow1};
  border-radius: 8px;
`
