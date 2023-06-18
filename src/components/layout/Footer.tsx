import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactComponent as Discord } from 'assets/brand/discord.svg'
import { ReactComponent as Email } from 'assets/brand/email.svg'
import { ReactComponent as Github } from 'assets/brand/github.svg'
import { ReactComponent as Medium } from 'assets/brand/medium.svg'
import { ReactComponent as Twitter } from 'assets/brand/twitter.svg'
import { Icon } from 'components/Icon'
import React from 'react'
import { vars } from 'theme/theme.css'
import { Box, Container } from '../container'
import { Link } from '../link'

const Wrapper = styled(Box)`
  position: relative;
  width: 100%;
  background-image: url(/images/banner2.svg);
  /* background-color: ${vars.colors.bannerBg}; */

  border-top: 1px solid ${vars.colors.border1};
`

const StyledContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled(Box)`
  font-size: 12px;
  /* color: #fff; */
  color: #fff;
`

const Brand = ({
  title,
  url,
  children,
  ...rest
}: React.PropsWithChildren<{ title: string; url: string }>) => {
  return (
    <Link
      tooltip={title}
      to={url}
      isExternal
      title={title}
      css={css`
        display: flex;
        margin-right: 32px;
        color: #fff;
        margin-right: 32px;
        :hover {
          color: #fff;
        }
        :last-of-type {
          margin-right: 0;
        }
      `}
      {...rest}
    >
      {children}
    </Link>
  )
}

const BrandWrap = styled(Box)`
  display: flex;
  align-items: center;
  color: #fff;
`

const BrandIcon = styled(Icon)`
  height: 18px;
`

export const Footer = ({ isHome }: { isHome?: boolean }) => {
  return (
    <Wrapper>
      <StyledContainer>
        <Title>©2022 APSCAN</Title>
        <BrandWrap>
          <Brand title="Email" url="mailto:jedi@apscan.io">
            <BrandIcon as={Email} />
          </Brand>

          <Brand title="Twitter" url="https://twitter.com/apscan_io">
            <BrandIcon as={Twitter} />
          </Brand>

          <Brand title="Github" url="https://github.com/Apscan">
            <BrandIcon as={Github} />
          </Brand>

          <Brand title="Discord" url="https://discord.gg/SJYuzTPMyz">
            <BrandIcon as={Discord} />
          </Brand>

          <Brand title="Medium" url="https://medium.com/@Apscan">
            <BrandIcon as={Medium} />
          </Brand>
        </BrandWrap>
      </StyledContainer>
    </Wrapper>
  )
}
