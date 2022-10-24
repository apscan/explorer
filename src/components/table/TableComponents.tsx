import {
  Table as ChakraTable,
  Tbody as ChakraTbody,
  Td as ChakraTd,
  Th as ChakraTh,
  Thead as ChakraThead,
  Tr as ChakraTr,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { vars } from 'theme/theme.css'

export const Table = styled(ChakraTable)``

export const Tbody = styled(ChakraTbody)``

export const Td = styled(ChakraTd)`
  word-break: break-all;
  letter-spacing: inherit;
  color: ${vars.text.body};
  border-top: 1px solid ${vars.colors.border1};
  padding: 10px;
  font-weight: 400;
  text-transform: none;
  font-size: 14px;
  border-bottom: none;
`

export const Th = styled(ChakraTh)`
  letter-spacing: inherit;
  padding: 10px;
  color: ${vars.text.header};
  background-color: ${vars.colors.theadBg};
  border-bottom: 2px solid ${vars.colors.border1};
  border-top: 1px solid ${vars.colors.border1};
  font-weight: 600;
  text-transform: none;
  font-size: 14px;
`

export const Thead = styled(ChakraThead)``

export const Tr = styled(ChakraTr)``
