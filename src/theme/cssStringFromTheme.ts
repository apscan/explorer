import { cssObjectFromTheme } from './cssObjectFromTheme'
import { Theme } from './theme.css'

export function cssStringFromTheme(
  theme: Theme | (() => Theme),
  options: { extends?: Theme | (() => Theme) } = {}
) {
  return Object.entries(cssObjectFromTheme(theme, options))
    .map(([key, value]) => `${key}:${value};`)
    .join('')
}
