import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { useMemo } from 'react'
import { NumberFormat } from 'components/NumberFormat'
import { DateTime } from 'components/DateTime'
import { DateFormat } from 'state/application/slice'
import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'
import RealBigNumber from 'bignumber.js'
import CoinPrice from 'components/CoinPrice'

export const Market = ({ data, percentChange24h, price }: { price?: number; data?: any; percentChange24h: number }) => {
  data = data || {}
  const fully = useMemo(
    () =>
      !price ? undefined : new RealBigNumber(price).multipliedBy(data.total_supply).div(Math.pow(10, data.decimals)),
    [data.decimals, data.total_supply, price]
  )

  console.log('data', data)

  return (
    <Card>
      <Box padding="0 12px">
        {renderRow(
          'Price',
          <InlineBox>
            <NumberFormat prefix="$" value={price} fallback="-" />
            {/* <CoinPrice price={price} /> */}
            {percentChange24h && (
              <InlineBox
                css={css`
                  color: ${percentChange24h < 0 ? vars.text.error : vars.text.success};
                `}
                fontSize="14px"
                marginLeft="4px"
              >
                (
                <NumberFormat
                  prefix={percentChange24h < 0 ? '' : '+'}
                  type="percent"
                  maximumFractionDigits={2}
                  value={percentChange24h / 100}
                  fallback="-"
                />
                )
              </InlineBox>
            )}
          </InlineBox>
        )}
        {renderRow(
          'Total Supply',
          <AmountFormat fallback="-" postfix={` ${data.symbol}`} value={data.total_supply} decimals={data.decimals} />
        )}
        {renderRow(
          'Fully Diluted Val.',
          <NumberFormat
            textTransform="uppercase"
            abbr
            forceAverage="million"
            useGrouping
            maximumFractionDigits={3}
            prefix={fully?.toNumber() ? '$' : ''}
            value={fully?.toNumber()}
            fallback="-"
          />
        )}
        {renderRow(
          'Creation Time',
          data?.created_at ? <DateTime format={DateFormat.FULL} value={data?.created_at.timestamp} /> : '-'
        )}
      </Box>
    </Card>
  )
}
