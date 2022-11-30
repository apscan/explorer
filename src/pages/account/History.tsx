import * as echarts from 'echarts/core'
import { Card } from 'components/Card'
import { Box } from 'components/container'
import { useEffect, useRef, useState } from 'react'
import RealBigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { lightTheme, vars } from 'theme/theme.css'

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
  const [inited, setInited] = useState(false)

  useEffect(() => {
    if (!ref.current || !coin || !history.length) {
      return
    }

    const decimals = new RealBigNumber(10).pow(coin.decimals)
    const data = [...history]
      .sort((a, b) => {
        if (a.value > b.value) {
          return -1
        }
        if (a.value < b.value) {
          return 1
        }
        return 0
      })
      .map((item) => {
        const date = new Date(Number(item.timestamp.slice(0, item.timestamp.length - 3)))

        return [dayjs(date).format('YYYY-MM-DD HH:mm:ss'), new RealBigNumber(item.value).div(decimals).toNumber()]
      })

    const current = [dayjs(new Date()).format('YYYY-MM-DD/HH:mm:ss'), data[data.length - 1][1]]
    data.push(current)

    var myChart = echarts.init(ref.current)
    const option = {
      title: {
        textStyle: {
          color: lightTheme.text.body,
          fontSize: '14px',
          fontWeight: 400,
        },
        text: 'Coin Balance',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        itemHeight: 7,
        itemWidth: 20,
        itemStyle: {
          color: vars.colors.primary,
        },
        data: ['APT'],
        left: 'center',
        top: '20px',
      },
      toolbox: {
        feature: {
          restore: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        containLabel: true,
        bottom: 60,
      },
      xAxis: [
        {
          name: 'Time',
          type: 'category',
          boundaryGap: false,
          axisLine: { onZero: false },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Balance',
        },
      ],
      series: [
        {
          name: 'APT',
          type: 'line',
          data,
          showSymbol: false,
          // showSymbol: false,
          itemStyle: {
            color: lightTheme.colors.link,
          },
          areaStyle: {
            color: lightTheme.colors.link,
          },
        },
      ],
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,
          end: 100,
          xAxisIndex: [0, 1],
        },
      ],
    }

    myChart.setOption(option)
    setInited(true)
  }, [history, inited, coin])

  return (
    <Card>
      <Box padding="12px">
        <Box height="291px" ref={ref} id="balance-history-charts"></Box>
      </Box>
    </Card>
  )
}
