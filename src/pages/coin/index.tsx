import { css } from '@emotion/react'
import { useCoinDetailQuery, useMarketInfoQuery } from 'api'
import { Card } from 'components/Card'
import { Container, InlineBox } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { PageTitle } from 'components/PageTitle'
import { Tabs } from 'components/Tabs'
import { useSearchTab } from 'hooks/useSearchTab'
import { Transfers } from 'pages/account/Transfers'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { AptosCoin, tabNameWithCount } from 'utils'
import { CopyButton } from 'components/CopyButton'
import { Box } from '@chakra-ui/react'
import { Overview } from './Overview'
import { Market } from './Market'
import { Holders } from './Holders'

export const Coin = () => {
  const { type } = useParams<{ type: string }>()
  const { data } = useCoinDetailQuery({ type })
  const { data: market } = useMarketInfoQuery()

  const tabs = useMemo(() => {
    if (!data) return undefined

    const count = data?.transactions_count

    return [
      {
        label: tabNameWithCount('Events', count),
        key: 'transfers',
        children: <Transfers key={type} type={type} count={count} />,
        hide: !count,
      },
      {
        label: tabNameWithCount('Holders', data?.addresses_count),
        key: 'holders',
        children: (
          <Holders
            type={type}
            count={data?.addresses_count}
            decimals={data?.decimals}
            symbol={data?.symbol}
            totalSupply={data?.total_supply}
            price={data.move_resource_generic_type_params[0] === AptosCoin ? market?.quotes?.USD?.price : undefined}
          />
        ),
        hide: !data?.addresses_count,
      },
    ].filter((item) => !item.hide) as any
  }, [data, market, type])

  const [activeKey, onTabChange] = useSearchTab(tabs)

  return (
    <Container>
      <DocumentTitle value={`Aptos Coin ${type || '-'} | Apscan`} />
      <PageTitle
        value={
          <InlineBox
            css={css`
              align-items: center;
              font-size: 16px;
            `}
          >
            Coin
            <span
              style={{
                margin: '0 0.5em',
                color: '#77838f',
              }}
            >
              {type}
            </span>
            {type && <CopyButton text={type} />}
          </InlineBox>
        }
      />
      <Box
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 16px;
          margin-bottom: 24px;
        `}
      >
        <Overview data={data} />
        <Market
          data={data}
          price={data?.move_resource_generic_type_params[0] === AptosCoin ? market?.quotes?.USD?.price : undefined}
          percentChange24h={
            data?.move_resource_generic_type_params[0] === AptosCoin
              ? market?.quotes?.USD?.percent_change_24h
              : undefined
          }
        />
      </Box>
      <Card>
        <Tabs onTabClick={onTabChange} activeKey={activeKey} size="large" items={tabs} />
      </Card>
    </Container>
  )
}
