import { selectGeoSelector } from 'state/application/selectors'
import { useAppSelector } from 'state/hooks'
import { Hash } from './Hash'

export const GeoLocation = ({ value, fallback, ...props }: { value: string; fallback?: React.ReactNode }) => {
  const location = useAppSelector((state) => selectGeoSelector(state, value))

  if (!location) return <>{fallback}</>

  return <Hash value={location?.city} ellipsis {...props} />
}
