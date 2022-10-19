import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export const Main = styled.div`
  width: 100%;
  flex: 1;
  padding-bottom: 56px;
`

export const Layout = ({
  isHome,
  children,
}: React.PropsWithChildren<{
  isHome?: boolean
}>) => {
  return (
    <>
      <Header isHome={isHome} />
      <Main
        css={css`
          background: ${isHome ? '#fff' : '#f8f9fa'};
        `}
      >
        {children}
      </Main>
      <Footer isHome={isHome} />
    </>
  )
}
