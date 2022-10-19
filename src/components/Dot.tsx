import styled from '@emotion/styled'
import { Box } from './container'

export const Dot = styled(Box)`
  border-radius: 50%;
  width: 6px;
  height: 6px;
  margin-right: 4px;
`

Dot.defaultProps = {
  as: 'span',
}
