import { css } from '@emotion/react'
import styled from '@emotion/styled'
import * as echarts from 'echarts/core'
import { FixedNumber } from '@ethersproject/bignumber'
import { useMarketInfoQuery } from 'api'
import { Card } from 'components/Card'
import { Box } from 'components/container'
import { useEffect, useRef, useState } from 'react'
import { current } from '@reduxjs/toolkit'

export const History = ({ address }: { address: string }) => {
  const { data: market } = useMarketInfoQuery()
  const ref = useRef<HTMLDivElement>(null)
  const [inited, setInited] = useState(false)

  useEffect(() => {
    console.log('init 1')
    if (!ref.current || inited) {
      return
    }

    console.log('init 2', ref.current)

    var myChart = echarts.init(ref.current)
    const option = {
      title: {
        text: 'Balance Changes',
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
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
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
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'APT',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
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
  }, [inited])

  return (
    <Card>
      <Box padding="12px">
        <Box height="291px" ref={ref} id="balance-history-charts"></Box>
      </Box>
    </Card>
  )
}
