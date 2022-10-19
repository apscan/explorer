import styled from '@emotion/styled'
import { Tooltip } from './Tooltip'

export const PopTip = styled(Tooltip)``

PopTip.defaultProps = {
  hasArrow: true,
  openDelay: 50,
  placement: 'top',
}
