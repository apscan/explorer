import * as echarts from 'echarts/core'
import { Card } from 'components/Card'
import { Box } from 'components/container'
import { useEffect, useRef, useState } from 'react'
import RealBigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { lightTheme, vars } from 'theme/theme.css'
var Highcharts = require('highcharts')
// Alternatively, this is how to load Highcharts Stock. The Maps and Gantt
// packages are similar.
// var Highcharts = require('highcharts/highstock');

// Load the exporting module, and initialize it.
require('highcharts/modules/exporting')(Highcharts)

export const History = ({
  address,
  coin,
  history,
}: {
  address: string
  coin: any
  history: {
    resourceType: string
    timestamp: string
    value: string
  }[]
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !coin || !history.length) {
      return
    }

    const decimals = new RealBigNumber(10).pow(coin.decimals)
    const data = [...history]
      .sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return 1
        }
        if (a.timestamp < b.timestamp) {
          return -1
        }
        return 0
      })
      .map((item) => {
        const date = new Date(Number(item.timestamp.slice(0, item.timestamp.length - 3)))

        return [date.getTime(), new RealBigNumber(item.value).div(decimals).toNumber()]
      })

    const current = [Date.now(), data[data.length - 1][1]]
    data.push(current)

    const chart = Highcharts.chart('balance-history-charts', {
      credits: {
        enabled: false,
      },
      chart: {
        zoomType: 'x',
      },
      title: {
        text: 'Coin Balance',
        style: {
          color: lightTheme.text.body,
          fontSize: '14px',
          fontWeight: 400,
        },
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'date',
        },
      },
      yAxis: {
        title: {
          text: 'balance',
        },
      },
      legend: {
        enabled: true,
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
            ],
          },
          marker: {
            radius: 2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
        },
      },
      series: [
        {
          type: 'area',
          name: 'APT (Avaliable)',
          data: data,
        },
      ],
    })
  }, [history, coin])

  return (
    <Card>
      <Box padding="12px">
        <Box height="291px" ref={ref} id="balance-history-charts"></Box>
      </Box>
    </Card>
  )
}
