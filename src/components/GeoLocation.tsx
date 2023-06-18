import { useLocationQuery } from 'api'
import { selectGeoSelector } from 'state/application/selectors'
import { useAppSelector } from 'state/hooks'
import { Hash } from './Hash'

export const GeoLocation = ({
  value,
  fallback,
  ...props
}: {
  value: string
  fallback?: React.ReactNode
}) => {
  const data = useAppSelector((state) => state.api.queries['stats(undefined)']?.data)
  const location = useAppSelector((state) => selectGeoSelector(state, value))

  const { data: location2 } = useLocationQuery(value, {
    skip: !data || !!location,
  })

  if (!location) return <>{fallback}</>

  return <Hash value={location?.city || location2?.city} ellipsis {...props} />
}
