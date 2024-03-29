import { Flex as CFlex } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const Flex = CFlex

export const FlexCenter = styled(CFlex)`
  align-items: center;
`

export const FlexInline = styled(FlexCenter)`
  display: inline-flex;
`
