import { Tooltip as ChakraTooltip } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { vars } from 'theme/theme.css'

export const Tooltip = styled(ChakraTooltip)`
  display: grid;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  background: ${vars.colors.tooltipBg};
  word-break: break-all;
  -webkit-font-smoothing: antialiased;
  --popper-arrow-size: 8px;
`

Tooltip.defaultProps = {
  hasArrow: true,
  placement: 'top',
  openDelay: 50,
}
