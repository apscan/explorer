import styled from '@emotion/styled'
import { Box, Container } from 'components/container'
import { SearchGroup } from 'components/search-group'

const Wrapper = styled(Box)`
  background-image: url(/images/banner1.svg);
`

const StyledContainer = styled(Container)`
  padding-top: 52px;
  padding-bottom: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled(Box)`
  color: #fff;
  font-size: 21px;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`

export const Head = () => {
  return (
    <Wrapper>
      <StyledContainer>
        <Box>
          <Title as="h1">The Aptos Blockchain Explorer</Title>
          <SearchGroup variant="home" />
        </Box>
      </StyledContainer>
    </Wrapper>
  )
}
