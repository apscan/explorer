import { useMemo } from 'react'
import { useAppSelector } from 'state/hooks'
import { NumberFormat } from './NumberFormat'

export const AnnualRewardRate = ({ value }: { value: any }) => {
  const interval = useAppSelector((state) => (state.api.queries['stats(undefined)']?.data as any)?.epoch_interval)

  const rate = useMemo(() => {
    const config = value.staking_config_data
    return ((config.rewards_rate / config.rewards_rate_denominator) * 365 * 24 * 60 * 60 * 1000 * 1000) / interval
  }, [value, interval])

  return <NumberFormat maximumFractionDigits={4} value={rate} type="percent" />
}
