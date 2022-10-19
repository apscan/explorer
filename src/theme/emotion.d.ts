import '@emotion/react'
import { CustomTheme } from './theme.css'

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
