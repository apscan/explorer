import { css } from '@emotion/react'
import { Box, Container } from 'components/container'
import { ValidatorMap } from 'components/validator-map/ValidatorMap'
import { vars } from 'theme/theme.css'
import { CurrentValidators, LatestBlocks, LatestTransactions } from './Cards'
import { Head } from './Head'
import { Statistics } from './Statistics'

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
            @media screen and (max-width: 800px) {
              grid-template-columns: 1fr;
            }
          `}
        >
          <LatestBlocks />
          <LatestTransactions />
        </Box>
        <Box>
          <ValidatorMap />
          <CurrentValidators />
        </Box>
      </Container>
    </>
  )
}
