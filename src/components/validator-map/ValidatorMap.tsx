import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useGeoQuery } from 'api'
import { Box } from 'components/container'
import * as L from 'leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useState } from 'react'
import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { vars } from 'theme/theme.css'

const LegendControlItem = styled(Box)`
  display: flex;
  align-items: center;
`

const LegendIcon = styled(Box)`
  height: 12px;
  width: 12px;
  margin-right: 8px;
  border-radius: 50%;
`

export const ValidatorMap = () => {
  const { data } = useGeoQuery()

  const [map, setMap] = useState(null)

  useEffect(() => {
    try {
      L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)
    } catch (error) {
      console.error(error)
    }
  }, [map])

  const {
    mapData,
    centerLat = 13.3652,
    centerLon = 19.7165,
    bufferLat = 1.87256,
    bufferLon = 4.8004,
    minLat = -33.4488,
    maxLat = 60.1792,
    minLon = -100.2951,
    maxLon = 139.7283,
  } = useMemo(() => {
    if (!data) return {}

    let minLat = Number.MAX_SAFE_INTEGER
    let maxLat = -1 * Number.MAX_SAFE_INTEGER
    let minLon = Number.MAX_SAFE_INTEGER
    let maxLon = -1 * Number.MAX_SAFE_INTEGER

    for (const item of data) {
      minLat = Math.min(minLat, Number(item.lat))
      maxLat = Math.max(maxLat, Number(item.lat))
      minLon = Math.min(minLon, Number(item.lon))
      maxLon = Math.max(maxLon, Number(item.lon))
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
      bufferLat: distanceLat * 0.02,
      bufferLon: distanceLon * 0.02,
      mapData: data.reduce((result: any, current: any) => {
        const findCurrent = result.find((item: any) => item.city === current.city && item.type === current.type)
        if (!findCurrent) {
          result.push({
            type: current.type,
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
    <Box
      css={css`
        margin-bottom: 24px;
        border-radius: 8px;
      `}
    >
      <MapContainer
        style={{ height: '340px', width: '100%', borderRadius: '8px' }}
        // @ts-ignore
        whenCreated={setMap}
        gestureHandling={true}
        scrollWheelZoom={false}
        attributionControl={false}
        center={[centerLat, centerLon]}
        bounds={[
          [minLat - bufferLat, minLon - bufferLon],
          [maxLat + bufferLat, maxLon + bufferLon],
        ]}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
        {mapData?.map((item: any, k: any) => {
          return (
            <CircleMarker
              key={k}
              center={[item.lat, item.lon]}
              //@ts-ignore
              fillColor={item.type === 'network' ? '#176bf8' : '#01f1e3'}
              radius={item.type === 'network' ? item.count + 3 : 3}
              fillOpacity={item.type === 'network' ? 0.5 : 0.8}
              stroke={false}
            >
              <Tooltip>
                <Box>
                  {item.type === 'network' ? 'Validators' : 'Fullnodes'}: {item.count}
                </Box>
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
        <Box className="leaflet-top leaflet-right">
          <Box
            css={css`
              background: ${vars.colors.border2};
              color: ${vars.text.secondary};
              border: none !important;
              font-size: 0.875rem;
              padding: 8px 12px;
            `}
            className="leaflet-control leaflet-bar"
          >
            <LegendControlItem>
              <LegendIcon
                css={css`
                  background: rgb(23, 107, 248);
                  opacity: 0.5;
                `}
              />
              <Box>Validators</Box>
            </LegendControlItem>
            <LegendControlItem>
              <LegendIcon
                css={css`
                  background: rgb(1, 241, 227);
                  opacity: 0.5;
                `}
              />
              <Box>Fullnodes</Box>
            </LegendControlItem>
          </Box>
        </Box>
      </MapContainer>
    </Box>
  )
}
