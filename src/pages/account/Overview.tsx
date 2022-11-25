import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FixedNumber } from '@ethersproject/bignumber'
import { useMarketInfoQuery } from 'api'
import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox } from 'components/container'
import { DateTime } from 'components/DateTime'
import { renderRow } from 'components/helpers'
import { NumberFormat } from 'components/NumberFormat'
import { Poptip } from 'components/PopTip'
import { useMemo } from 'react'
import { DateFormat } from 'state/application/slice'
import { vars } from 'theme/theme.css'
import { toFixedNumber } from 'utils/number'

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

              <Poptip>
                <Box
                  css={css`
                    font-family: 'Font Awesome 5 Pro';
                    padding: 0 16px;
                    min-width: 256px;
                  `}
                >
                  {[
                    ['Available', <AmountFormat value={data?.aptos_coin_balance} />],
                    ['Staked', <AmountFormat value={data?.aptos_coin_staked} />],
                  ].map(([label, value], index) => {
                    return (
                      <Box
                        key={index}
                        css={css`
                          margin-top: 12px;
                          border-bottom: 1px solid ${vars.colors.border1};
                          &:first-child {
                            margin-top: 16px;
                          }
                          &:last-child {
                            border-bottom: none;
                            margin-bottom: 16px;
                          }
                        `}
                      >
                        <Box
                          css={css`
                            font-size: 13px;
                            font-weight: 700;
                            color: ${vars.text.heading};
                            margin-bottom: 4px;
                          `}
                        >
                          {label}
                        </Box>
                        <Box
                          css={css`
                            font-size: 12px;
                            font-weight: 400;
                            color: ${vars.text.body};
                            margin-bottom: 12px;
                          `}
                        >
                          {value}
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </Poptip>
            </InlineBox>
          )
        )}

        {renderRow('Tokens', 'Coming Soon')}
        {renderRow(
          'Total Value',
          <NumberFormat fixed={0} separate useGrouping prefix="$" maximumFractionDigits={2} value={totalValue} />
        )}
        {renderRow(
          'Creation Time',
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
