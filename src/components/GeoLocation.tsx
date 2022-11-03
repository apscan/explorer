import { useGeoQuery } from 'api'
import { useMemo } from 'react'
import { Hash } from './Hash'

export const GeoLocation = ({ value, fallback, ...props }: { value: number; fallback?: React.ReactNode }) => {
  const { data } = useGeoQuery()

  const location = useMemo(() => {
    if (!data || !value) return
    return (data as any[]).find((item) => item.validator_index.toString() === value.toString())
  }, [data, value])

  if (!location) return <>{fallback}</>

  return <Hash value={location?.city} ellipsis {...props} />
}
