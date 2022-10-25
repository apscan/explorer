import styled from '@emotion/styled'
import { FixedNumber } from '@ethersproject/bignumber'
import { useMarketInfoQuery } from 'api'
import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox } from 'components/container'
import { DateTime } from 'components/DateTime'
import { renderRow } from 'components/helpers'
import { NumberFormat } from 'components/NumberFormat'
import { Tooltip } from 'components/Tooltip'
import { useMemo } from 'react'
import { DateFormat } from 'state/application/slice'
import { toFixedNumber } from 'utils/number'
import { ReactComponent as QuestionCircleIcon } from 'assets/icons/question-circle.svg'
import { Icon } from 'components/Icon'
import { css } from '@emotion/react'
import { vars } from 'theme/theme.css'

const Wrapper = styled(Box)`
  padding: 0 12px;
`

export const Overview = ({ data }: { data: any | undefined }) => {
  const { data: market } = useMarketInfoQuery()

  const totalValue = useMemo(() => {
    if (!data?.aptos_coin_total_balance || !market?.quotes?.USD?.price) return

    return toFixedNumber(data.aptos_coin_total_balance as string)
      .toFormat('fixed128x18')
      .mulUnsafe(FixedNumber.fromString(Number(market.quotes.USD.price).toFixed(18)))
  }, [data, market])

  return (
    <Wrapper>
      <Box>
        {renderRow(
          'Coins',
          data && (
            <InlineBox alignItems="center">
              <AmountFormat value={data?.aptos_coin_total_balance} />

              {/* <Tooltip value={12312}>
                <Icon
                  as={QuestionCircleIcon}
                  css={css`
                    margin-left: 4px;
                    color: ${vars.text.secondary};
                    width: 16px;
                    height: 16px;
                  `}
                />
              </Tooltip> */}
              <InlineBox marginLeft="4px">
                (
                <AmountFormat postfix={false} prefix="Available | " value={data?.aptos_coin_balance} />,
                <AmountFormat postfix={false} marginLeft="4px" prefix="Staked | " value={data?.aptos_coin_staked} />)
              </InlineBox>
            </InlineBox>
          )
        )}

        {renderRow('Tokens', 'Coming Soon')}
        {renderRow(
          'Total Value',
          <NumberFormat separate useGrouping prefix="$" maximumFractionDigits={2} value={totalValue} />
        )}
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
