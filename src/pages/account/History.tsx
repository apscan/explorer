import * as echarts from 'echarts/core'
import { useAccountBalanceHistoryQuery, useCoinDetailQuery, useMarketInfoQuery } from 'api'
import { Card } from 'components/Card'
import { Box } from 'components/container'
import { useEffect, useRef, useState } from 'react'
import RealBigNumber from 'bignumber.js'
import dayjs from 'dayjs'

export const History = ({ address }: { address: string }) => {
  const { data: coin } = useCoinDetailQuery({ type: '0x1::aptos_coin::AptosCoin' })
  const { data: history = [] } = useAccountBalanceHistoryQuery({ id: address }, { skip: !address })
  const ref = useRef<HTMLDivElement>(null)
  const [inited, setInited] = useState(false)

  useEffect(() => {
    if (!ref.current || !coin || !history.length) {
      return
    }

    const decimals = new RealBigNumber(10).pow(coin.decimals)

    var myChart = echarts.init(ref.current)
    const option = {
      title: {
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
        data: ['APT'],
        left: 'left',
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
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
          areaStyle: {},
          data: history.map((item) => {
            const date = new Date(Number(item.timestamp.slice(0, item.timestamp.length - 3)))

            return [dayjs(date).format('YYYY-MM-DD HH:mm:ss'), new RealBigNumber(item.value).div(decimals).toNumber()]
          }),
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
