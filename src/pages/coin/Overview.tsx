import { Address } from 'components/Address'
import { Box } from 'components/container'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'

export const Overview = ({ data }: { data: any | undefined }) => {
  return (
    <Card>
      <Box padding="0 12px">
        {renderRow('Decimal', data?.decimals)}
        {renderRow('Symbol', data?.symbol)}
        {renderRow('Name', data?.name)}
        {renderRow('Creator', <Address value={data?.address} />)}
      </Box>
    </Card>
  )
}
