import { queryRangeLimitMap } from 'config/api'

export function getLimitedEnd(
  url: keyof typeof queryRangeLimitMap,
  end?: number
): number | undefined {
  if (!end) {
    return end
  }

  const max: number | undefined = queryRangeLimitMap[url]

  if (max === undefined) {
    return end
  }

  return end > max ? max : end
}
