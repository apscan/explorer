import { AmountFormat } from 'components/AmountFormat'
import { Box } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'

export const Market = ({ data }: { data: any }) => {
  return (
    <Card marginBottom="20px">
      <Box padding="0 12px">
        {renderRow('Price', '-')}
        {renderRow('Total Supply', <AmountFormat value={data?.total_supply} />)}
        {renderRow('Supply Limit', data?.supply_limit ? <AmountFormat value={data?.supply_limit} /> : '-')}
        {renderRow('Fully Diluted Valuation', '-')}
      </Box>
    </Card>
  )
}
