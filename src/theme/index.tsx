import { ChakraProvider } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider, css, Global } from '@emotion/react'
import { useAppColorMode } from 'hooks/useAppColorMode'
import { useMemo } from 'react'
import { cssStringFromTheme } from './cssStringFromTheme'
import { globalCSS } from './global.styles'
import { darkTheme, lightTheme, vars } from './theme.css'

const myCache = createCache({
  key: 'aps',
  ...(process.env.NODE_ENV === 'development' && { stylisPlugins: [] }),
})

const ThemeInner = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useAppColorMode()

  const themeVars = useMemo(() => {
    return colorMode === 'dark' ? cssStringFromTheme(darkTheme) : cssStringFromTheme(lightTheme)
  }, [colorMode])

  return (
    <>
      <Global styles={globalCSS} />
      <Global
        styles={css`
          :root {
            ${themeVars}
          }

          ::selection {
            color: #fff;
            background-color: ${vars.colors.link};
          }

          body {
            color: ${vars.text.body};
            background-color: ${vars.colors.backgroundMain};
          }

          #root {
            display: flex;
            flex-flow: column;
            align-items: flex-start;
            min-height: 100%;
          }
        `}
      />
      {children}
    </>
  )
}
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={myCache}>
      <ChakraProvider resetCSS={false}>
        <ThemeInner>{children}</ThemeInner>
      </ChakraProvider>
    </CacheProvider>
  )
}
