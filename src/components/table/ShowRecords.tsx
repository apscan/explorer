import styled from '@emotion/styled'
import { Box } from 'components/container'
import { Select } from 'components/Select'
import { vars } from 'theme/theme.css'

const Wrapper = styled(Box)`
  display: inline-flex;
  align-items: center;
  color: ${vars.text.secondary};
`

const StyledSelect = styled(Select)`
  margin-left: 8px;
  margin-right: 8px;
  width: 50px;
  padding: 4px 8px;
`

export const ShowRecords = ({ onSelect, pageSize }: { onSelect?: (pageSize: number) => void; pageSize: number }) => {
  return (
    <Wrapper>
      Show
      <StyledSelect value={pageSize} onChange={(e) => onSelect && onSelect(Number(e.target.value))}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </StyledSelect>
      Records
    </Wrapper>
  )
}
