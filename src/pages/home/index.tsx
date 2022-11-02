import { css } from '@emotion/react'
import { Box, Container } from 'components/container'
import { Head } from './Head'
import { CurrentValidators, LatestBlocks, LatestTransactions } from './Cards'
import { Statistics } from './Statistics'
import { vars } from 'theme/theme.css'

import { lazy, Suspense } from 'react'

const ValidatorMap = lazy(() => import('components/validator-map/ValidatorMap'))

export const Home = () => {
  return (
    <>
      <Head />
      <Container
        css={css`
          margin-top: -48px;
        `}
      >
        <Statistics
          css={css`
            background: ${vars.colors.backgroundMain};
            margin-bottom: 24px;
          `}
        />
        <Box
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 16px;
            margin-bottom: 24px;
          `}
        >
          <LatestBlocks />
          <LatestTransactions />
        </Box>
        <Box>
          <Suspense fallback={null}>
            <ValidatorMap />
          </Suspense>
          <CurrentValidators />
        </Box>
      </Container>
    </>
  )
}
