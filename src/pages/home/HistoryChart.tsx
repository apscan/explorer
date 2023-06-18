import { css } from '@emotion/react'
import { useTransactionsHistoryQuery } from 'api'
import { Box } from 'components/container'
import dayjs from 'dayjs'
import { memo, useMemo } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { vars } from 'theme/theme.css'

const formatFunc = new Intl.NumberFormat('en-gb', { notation: 'compact' })

const countFormatter = (value: any) => {
  if (isNaN(value)) {
    return ''
  }

  return formatFunc.format(value)?.toLowerCase()
}

const dateFormatter = (value: any) => {
  if (isNaN(value) || !value) {
    return ''
  }

  return dayjs(value * 1000).format('MMM D')
}

const CustomTooltip = memo(({ active, payload, label }: any) => {
  const date = useMemo(() => {
    if (!active || !payload || !payload[0]?.payload?.start_time_stamp) return ''

    return dayjs(payload[0]?.payload?.start_time_stamp * 1000).format('dddd, MMMM D, YYYY')
  }, [active, payload])

  if (active && payload && payload.length) {
    return (
      <Box
        css={css`
          border: 1px solid #333333;
          border-radius: 4px;
          font-size: 12px;
          color: #333333;
          padding: 8px;
          background: #99999922;
        `}
      >
        <Box as="span">{date}</Box>
        <Box
          as="span"
          css={css`
            display: block;
            font-weight: 500;
          `}
        >
          Transactions: {payload[0]?.value}
        </Box>
      </Box>
    )
  }

  return null
})

export const HistoryChart = memo(() => {
  const { data } = useTransactionsHistoryQuery()

  return (
    <Box
      css={css`
        flex: 1;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-direction: column;
      `}
    >
      <Box
        css={css`
          font-size: 12px;
          margin-bottom: 8px;
          font-weight: 500;
          color: ${vars.text.secondary};
        `}
      >
        APTOS TRANSACTION HISTORY IN 14 DAYS
      </Box>
      <Box
        css={css`
          flex: 1;
        `}
      >
        <ResponsiveContainer height="100%">
          <LineChart data={data}>
            <XAxis
              tickFormatter={dateFormatter}
              minTickGap={60}
              style={{ fontSize: 12 }}
              tickLine={false}
              dy={10}
              axisLine={false}
              dataKey="start_time_stamp"
            />
            <YAxis
              minTickGap={24}
              tickFormatter={countFormatter}
              style={{ fontSize: 12 }}
              width={36}
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" isAnimationActive={false} dataKey="transactions_count" dot={false} stroke="#333333" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
})
