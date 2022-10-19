import styled from '@emotion/styled'
import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox } from 'components/container'
import { DateTime } from 'components/DateTime'
import { renderRow } from 'components/helpers'
import { DateFormat } from 'state/application/slice'

const Wrapper = styled(Box)`
  padding: 0 12px;
`

export const Overview = ({ data }: { data: any | undefined }) => {
  return (
    <Wrapper>
      <Box>
        {renderRow(
          'Coins',
          data && (
            <>
              <AmountFormat value={data?.aptos_coin_total_balance} />
              <InlineBox marginLeft="4px">
                (
                <AmountFormat prefix="Available: " value={data?.aptos_coin_balance} />,
                <AmountFormat marginLeft="4px" prefix="Staked: " value={data?.aptos_coin_staked} />)
              </InlineBox>
            </>
          )
        )}

        {renderRow('Tokens', 'Coming Soon')}
        {renderRow('Total Value', 'Coming Soon')}
        {renderRow(
          'Creation',
          data?.created_at_timestamp && data?.created_at_timestamp !== '0' ? (
            <DateTime format={DateFormat.FULL} value={data?.created_at_timestamp} />
          ) : (
            ''
          )
        )}
      </Box>
    </Wrapper>
  )
}
