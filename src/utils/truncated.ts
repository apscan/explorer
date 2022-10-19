export const truncated = (param: string, max = 8): string => {
  return param.length > max + 4
    ? `${param.substring(0, max / 2 + 2)}…${param.substring(param.length - max / 2)}`
    : param
}

export const truncatedWithSize = (value?: string, size: 'full' | 'short' | 'long' = 'short'): string | undefined => {
  if (typeof value !== 'string') return
  if (size === 'short') {
    return value.length > 13 ? `${value.substring(0, 10)}…` : value
  } else if (size === 'long') {
    return value.length > 21 ? `${value.substring(0, 18)}…` : value
  } else if (size === 'full') {
    return value
  }
}
