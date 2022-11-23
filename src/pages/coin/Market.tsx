import { AmountFormat } from 'components/AmountFormat'
import { Box } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { useMemo } from 'react'
import { FixedNumber } from '@ethersproject/bignumber'
import { toFixedNumber } from 'utils/number'
import { NumberFormat } from 'components/NumberFormat'

export const Market = ({ data, price }: { data?: any; price?: string }) => {
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
        {renderRow('Price', <NumberFormat maximumFractionDigits={2} prefix="$" value={price} fallback="--" />)}
        {renderRow('Total Supply', <AmountFormat value={data.total_supply} />)}
        {renderRow('Supply Limit', data.supply_limit ? <AmountFormat value={data.supply_limit} /> : '-')}
        {renderRow(
          'Fully Diluted Valuation',
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
      </Box>
    </Card>
  )
}
