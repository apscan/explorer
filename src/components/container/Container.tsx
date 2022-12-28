import styled from '@emotion/styled'
import { vars } from 'theme/theme.css'
import { Box } from './Box'

export const Container = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  max-width: ${vars.breakpoints.lg};
`
