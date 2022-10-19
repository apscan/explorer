import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Box } from 'components/container'
import { vars } from 'theme/theme.css'

const KeyWrapper = styled(Box)`
  width: 30%;
  color: ${vars.text.body};
  font-size: 14px;
  font-weight: 400;
`

const ValueWrapper = styled(Box)`
  font-weight: 400;
  width: 100%;
  color: ${vars.text.body};
`

export function renderRow(
  key: React.ReactNode,
  value: React.ReactNode,
  {
    border,
  }: {
    border?: boolean
  } = {}
) {
  return (
    <Box
      css={css`
        display: flex;
        padding: 16px 0;
        ${border &&
        css`
          border-bottom: 1px solid ${vars.colors.border1};
        `}
      `}
    >
      <KeyWrapper>{key}</KeyWrapper>
      <ValueWrapper>{value}</ValueWrapper>
    </Box>
  )
}

export function renderTableCell(
  name: string,
  accessor: string,
  render: (...args: any) => React.ReactNode,
  options?: any
) {
  return {
    Header: name,
    id: accessor,
    accessor: accessor,
    Cell: render,
    ...options,
  }
}
