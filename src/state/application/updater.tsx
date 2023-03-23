import { useGeoQuery } from 'api'
import { useEffect } from 'react'
import { useAppDispatch } from 'state/hooks'
import { setGeo } from './slice'

export const AppUpdater = () => {
  const dispatch = useAppDispatch()
  // const appFocused = useAppFocused()

  // useMarketInfoQuery(undefined, {
  //   pollingInterval: appFocused ? 60 * 1000 : 0,
  //   refetchOnFocus: true,
  // })

  // useStatsQuery(undefined, {
  //   pollingInterval: appFocused ? 5000 : 0,
  //   refetchOnFocus: true,
  // })

  const { data } = useGeoQuery()

  useEffect(() => {
    if (data) {
      dispatch(
        setGeo(
          data.map((item: any) => {
            return {
              address: item.type === 'fullnode' ? item.fullnode_addresses : item.network_addresses,
              network: item.type === 'fullnode' ? item.fullnode : item.network,
              country: item.country,
              city: item.city,
              lat: item.lat,
              lon: item.lon,
              ip: item.query,
            }
          })
        )
      )
    }
  }, [data, dispatch])

  return null
}
