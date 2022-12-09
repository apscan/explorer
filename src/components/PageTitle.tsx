import { css } from '@emotion/react'
import React from 'react'
import { vars } from 'theme/theme.css'
import { Box } from './container'

export const PageTitle = ({ value, sub }: { value: React.ReactNode; sub?: React.ReactNode }) => {
  return (
    <Box padding="16px 0">
      <Box
        css={css`
          font-size: 20px;
          font-weight: 500;
          color: ${vars.text.heading};
        `}
      >
        {value}
      </Box>
      {sub && <Box>{sub}</Box>}
    </Box>
  )
}
