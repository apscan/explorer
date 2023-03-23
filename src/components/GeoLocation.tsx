import { useGeoQuery } from 'api'
import { useMemo } from 'react'
import { Hash } from './Hash'

export const GeoLocation = ({
  value,
  address,
  fallback,
  ...props
}: {
  value: number
  address?: string
  fallback?: React.ReactNode
}) => {
  const { data } = useGeoQuery()

  const location = useMemo(() => {
    if (!data || (!value && !address)) return
    if (value) return (data as any[]).find((item) => item.validator_index.toString() === value.toString())
    if (address) return (data as any[]).find((item) => item.network_addresses.toString() === address.toString())
  }, [data, value, address])

  if (!location) return <>{fallback}</>

  return <Hash value={location?.city} ellipsis {...props} />
}
