import { css } from '@emotion/react'
import { useCoinDetailQuery, useMarketInfoQuery } from 'api'
import { Card } from 'components/Card'
import { Container, Flex, InlineBox } from 'components/container'
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
import { Tag } from 'components/Tag'
import { usePrice } from 'providers/PriceContext'

export const Coin = () => {
  const { type } = useParams<{ type: string }>()
  const { data } = useCoinDetailQuery({ type })
  const { data: market } = useMarketInfoQuery()
  const price = usePrice(data?.move_resource_generic_type_params?.[0] || '')

  const tabs = useMemo(() => {
    if (!data) return undefined

    const count = data?.events_count.reduce((all: number, curr: any) => curr.events_count + all, 0)

    return [
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
            price={price}
          />
        ),
        hide: !data?.addresses_count,
      },
      {
        label: tabNameWithCount('Events', count),
        key: 'transfers',
        children: <Transfers key={type} type={type} count={count} />,
        hide: !count,
      },
    ].filter((item) => !item.hide) as any
  }, [data, price, type])

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
            <span
              style={{
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              Coin
            </span>
            <span
              style={{
                color: '#77838f',
                wordBreak: 'break-all',
                padding: '0px 40px 0px 10px',
              }}
            >
              {type}
              {type && <CopyButton text={type} />}
            </span>
          </InlineBox>
        }
        sub={
          <Flex>
            <Tag ml="0.25rem" address={type || ''} />
          </Flex>
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
          price={price}
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
