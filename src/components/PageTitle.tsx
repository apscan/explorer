import { css } from '@emotion/react'
import React from 'react'
import { vars } from 'theme/theme.css'
import { Box } from './container'

export const PageTitle = ({ value }: { value: React.ReactNode }) => {
  return (
    <Box
      css={css`
        font-size: 20px;
        font-weight: 500;
        padding: 16px 0;
        color: ${vars.text.heading};
      `}
    >
      {value}
    </Box>
  )
}
