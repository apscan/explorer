import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { useMemo } from 'react'
import { FixedNumber } from '@ethersproject/bignumber'
import { toFixedNumber } from 'utils/number'
import { NumberFormat } from 'components/NumberFormat'
import { DateTime } from 'components/DateTime'
import { DateFormat } from 'state/application/slice'
import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'

export const Market = ({ data, price, percentChange24h }: { data?: any; price?: string; percentChange24h: number }) => {
  data = data || {}
  const fully = useMemo(
    () =>
      !price
        ? undefined
        : FixedNumber.from(price.toString(), 'fixed128x18').mulUnsafe(
            toFixedNumber(data.total_supply).toFormat('fixed128x18')
          ),
    [data.total_supply, price]
  )

  return (
    <Card>
      <Box padding="0 12px">
        {renderRow(
          'Price',
          <InlineBox>
            <NumberFormat maximumFractionDigits={2} prefix="$" value={price} fallback="--" />
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
                  fallback="--"
                />
                )
              </InlineBox>
            )}
          </InlineBox>
        )}
        {renderRow('Total Supply', <AmountFormat postfix={` ${data.symbol}`} value={data.total_supply} />)}
        {renderRow(
          'Fully Diluted Val.',
          <NumberFormat
            textTransform="uppercase"
            abbr
            forceAverage="billion"
            useGrouping
            maximumFractionDigits={3}
            prefix="$"
            value={fully}
            fallback="--"
          />
        )}
        {renderRow(
          'Creation',
          data?.created_at ? <DateTime format={DateFormat.FULL} value={data?.created_at.timestamp} /> : '-'
        )}
      </Box>
    </Card>
  )
}
