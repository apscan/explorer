import { css } from '@emotion/react'
import { useMarketInfoQuery } from 'api'
import { AmountFormat } from 'components/AmountFormat'
import { Card } from 'components/Card'
import { Box, Flex } from 'components/container'
import { DateTime } from 'components/DateTime'
import { renderRow } from 'components/helpers'
import { Poptip } from 'components/PopTip'
import { useMemo } from 'react'
import { DateFormat } from 'state/application/slice'
import { vars } from 'theme/theme.css'
import { AptosCoin } from 'utils'
import { CoinBalance, CoinList } from './CoinList'

export const Overview = ({ data }: { data: any | undefined }) => {
  const { data: market } = useMarketInfoQuery()

  const coinBalances: CoinBalance[] = useMemo(() => {
    return (
      data?.all_balances?.map(
        (coin: {
          move_resource_generic_type_params: string[]
          balance: string
          coin_info: {
            name: string
            symbol: string
            decimals: string
          }
        }) => ({
          type: coin?.move_resource_generic_type_params[0],
          symbol: coin?.coin_info?.symbol,
          name: coin?.coin_info?.name,
          decimals: parseInt(coin?.coin_info?.decimals || '8'),
          balance: coin?.balance,
          price: coin?.move_resource_generic_type_params[0] === AptosCoin ? market?.quotes?.USD.price : undefined,
        })
      ) || []
    )
  }, [data, market])

  return (
    <Card>
      <Box padding="0 12px">
        {renderRow(
          'APT',
          <Box>
            {data && (
              <Flex alignItems="center">
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
              </Flex>
            )}
          </Box>
        )}
        {renderRow('Coins', <CoinList coinBalances={coinBalances} />)}
        {renderRow('Tokens', 'Coming Soon')}
        {renderRow(
          'Creation Time',
          data?.created_at_timestamp && data?.created_at_timestamp !== '0' ? (
            <DateTime format={DateFormat.FULL} value={data?.created_at_timestamp} />
          ) : (
            ''
          )
        )}
      </Box>
    </Card>
  )
}
