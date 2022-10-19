import { useStatsQuery } from 'api'
import { useAppFocused } from 'state/api/hooks'

export const AppUpdater = () => {
  const appFocused = useAppFocused()

  useStatsQuery(undefined, {
    pollingInterval: appFocused ? 1000 : 0,
    refetchOnFocus: true,
  })

  return null
}
