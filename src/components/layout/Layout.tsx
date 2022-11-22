import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import Toast from '../toast'
import Tip from '../tooltipWithCopy/tip'
import { useSelector } from 'react-redux'
import { tooltipContentSelector } from '../../state/tooltip/tooltipSlice'

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
  const tooltipContent = useSelector(tooltipContentSelector)

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
      <Tip>{tooltipContent}</Tip>
      <Toast />
    </>
  )
}
