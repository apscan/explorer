import { useMarketInfoQuery, useStatsQuery } from 'api'
import { useAppFocused } from 'state/api/hooks'

export const AppUpdater = () => {
  const appFocused = useAppFocused()

  useMarketInfoQuery(undefined, {
    pollingInterval: appFocused ? 60 * 1000 : 0,
    refetchOnFocus: true,
  })

  useStatsQuery(undefined, {
    pollingInterval: appFocused ? 1000 : 0,
    refetchOnFocus: true,
  })

  return null
}
