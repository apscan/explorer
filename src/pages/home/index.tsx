import { css } from '@emotion/react'
import { Box, Container } from 'components/container'
import { ValidatorMap } from 'components/validator-map/ValidatorMap'
import { vars } from 'theme/theme.css'
import { CurrentValidators, LatestBlocks, LatestTransactions } from './Cards'
import { Head } from './Head'
import { Statistics } from './Statistics'
import { useMediaQuery } from '@chakra-ui/react'
import { useEffect } from 'react'

export const Home = () => {
  // const [small] = useMediaQuery(['(min-width: 100px)']);

  // useEffect(() => alert(small), [small])

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
          <ValidatorMap />
          <CurrentValidators />
        </Box>
      </Container>
    </>
  )
}
