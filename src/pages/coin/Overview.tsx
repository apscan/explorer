import { Address } from 'components/Address'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { renderRow } from 'components/helpers'
import { Card } from 'components/Card'
import { DateFormat } from 'state/application/slice'

export const Overview = ({ data }: { data: any | undefined }) => {
  return (
    <Card>
      <Box padding="0 12px">
        {renderRow('Decimals', data?.decimals)}
        {renderRow('Name', data?.name)}
        {renderRow('Creator', <Address value={data?.address} />)}
        {renderRow(
          'Creation',
          data?.created_at ? <DateTime format={DateFormat.FULL} value={data?.created_at.timestamp} /> : '-'
        )}
      </Box>
    </Card>
  )
}
