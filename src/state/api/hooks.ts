import { useAppSelector } from 'state/hooks'
import { AppState } from 'state'
import { useStatsQuery } from 'api'
import { useEffect, useMemo, useRef } from 'react'

export const useAppFocused = (): boolean => {
  const appFocused = useAppSelector((state: AppState) => state.api.config.focused)

  return appFocused
}

export const useAppStats = () => {
  const { data } = useStatsQuery()

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
