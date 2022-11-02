import { css } from '@emotion/react'
import { useGeoQuery } from 'api'
import { Box } from 'components/container'
import 'leaflet/dist/leaflet.css'
import { useMemo } from 'react'
import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { vars } from 'theme/theme.css'

const Map = ({ data }: { data: any }) => {
  const { mapData, centerLat, centerLon, bufferLat, bufferLon, minLat, maxLat, minLon, maxLon } = useMemo(() => {
    let minLat = 0
    let maxLat = 0
    let minLon = 0
    let maxLon = 0

    for (const item of data) {
      minLat = Math.min(minLat, item.lat)
      maxLat = Math.max(minLat, item.lat)
      minLon = Math.min(minLat, item.lat)
      maxLon = Math.max(minLat, item.lat)
    }

    const distanceLon = maxLon - minLon
    const distanceLat = maxLat - minLat
    return {
      centerLat: (minLat + maxLat) / 2,
      centerLon: (minLon + maxLon) / 2,
      minLat,
      maxLat,
      minLon,
      maxLon,
      distanceLon,
      distanceLat,
      bufferLat: distanceLat * 0.1,
      bufferLon: distanceLon * 0.1,
      mapData: (data as any).reduce((result: any, current: any) => {
        const findCurrent = result.find((item: any) => item.city === current.city)
        if (!findCurrent) {
          result.push({
            city: current.city,
            lat: current.lat,
            lon: current.lon,
            count: 1,
          })
        } else {
          findCurrent.count += 1
        }

        return result
      }, [] as { city: string; lat: number; lon: number; count: number }[]),
    }
  }, [data])

  return (
    <MapContainer
      style={{ height: '480px', width: '100%', borderRadius: '8px' }}
      // @ts-ignore
      doubleClickZoom={false}
      touchZoom={false}
      scrollWheelZoom={false}
      zoom={2}
      center={[centerLat, centerLon]}
      bounds={[
        [minLat - bufferLat, minLon - bufferLon],
        [maxLat + bufferLat, maxLon + bufferLon],
      ]}
    >
      <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {mapData.map((item: any, k: any) => {
        return (
          <CircleMarker
            key={k}
            center={[item.lat, item.lon]}
            //@ts-ignore
            radius={item.count + 3}
            fillOpacity={0.5}
            stroke={false}
          >
            <Tooltip>
              <Box>Nodes: {item.count}</Box>
              <Box
                css={css`
                  border-bottom: 1px solid ${vars.colors.border1};
                  margin-bottom: 8px;
                  margin: 4px 0;
                `}
              />
              <Box>{item.city}</Box>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

export default function ValidatorMap() {
  const { data } = useGeoQuery()

  if (!data) return null

  return (
    <Box
      css={css`
        margin-top: 24px;
        border-radius: 8px;
      `}
    >
      <Map data={data} />
    </Box>
  )
}
