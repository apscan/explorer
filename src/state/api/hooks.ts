import { useLatestStatsQuery, useStatsQuery } from 'api'
import { useEffect, useMemo, useRef } from 'react'
import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'

export const useAppFocused = (): boolean => {
  const appFocused = useAppSelector((state: AppState) => state.api.config.focused)

  return appFocused
}

export const useAppStatsPolling = () => {
  const appFocused = useAppFocused()

  const { data } = useStatsQuery(undefined, {
    pollingInterval: appFocused ? 3000 : 0,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  return useMemo(() => data || {}, [data])
}

export const useAppStats = () => {
  const { data } = useStatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  return useMemo(() => data || {}, [data])
}

export const useLatestStats = () => {
  const { data } = useLatestStatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  return useMemo(() => data || {}, [data])
}

export const useTotalSupply = (update?: boolean) => {
  const { data: { total_supply } = {} } = useStatsQuery()
  const totalSupplyRef = useRef<string>()

  useEffect(() => {
    if (update) {
      totalSupplyRef.current = total_supply
    } else {
      if (total_supply && !totalSupplyRef.current) {
        totalSupplyRef.current = total_supply
      }
    }
  }, [total_supply, update])

  return totalSupplyRef.current
}
