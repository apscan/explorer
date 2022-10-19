import styled from '@emotion/styled'
import { Box } from './Box'

export const InlineBox = styled(Box)`
  display: inline-flex;
`

InlineBox.defaultProps = {
  as: 'span',
}
