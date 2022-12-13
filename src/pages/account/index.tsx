import { css } from '@emotion/react'
import { useAccountBalanceHistoryQuery, useAccountDetailQuery, useCoinDetailQuery } from 'api'
import { Address } from 'components/Address'
import { Ans } from 'components/Ans'
import { Card } from 'components/Card'
import { Box, Container, Flex, InlineBox } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { Tag } from 'components/Tag'
import { PageTitle } from 'components/PageTitle'
import { Tabs } from 'components/Tabs'
import { useSearchTab } from 'hooks/useSearchTab'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { vars } from 'theme/theme.css'
import { tabNameWithCount } from 'utils'
import { Changes } from './Changes'
import { Events } from './Events'
import { History } from './History'
import { Modules } from './Modules'
import { Overview } from './Overview'
import { Resources } from './Resources'
import { AccountTransactions } from './Transactions'
import { Transfers } from './Transfers'

export const Account = () => {
  const { id } = useParams<{ id: string }>()

  const { data } = useAccountDetailQuery(id)
  const address = useMemo(() => data?.address, [data])
  const { data: coin } = useCoinDetailQuery({ type: '0x1::aptos_coin::AptosCoin' })
  const { data: history = [] } = useAccountBalanceHistoryQuery({ id: address }, { skip: !address })
  const showHistory = useMemo(
    () => !!coin && !!history.filter((item) => item.timestamp && item.value !== undefined).length,
    [coin, history]
  )
  const tabs = useMemo(() => {
    if (!data || !address) return undefined

    const count = data?.coin_events_count?.reduce((all: any, curr: any) => all + curr.events_count, 0) || 0

    return [
      {
        label: tabNameWithCount('Coin Events', count),
        key: 'transfers',
        children: <Transfers key={address} id={address} count={count} />,
        hide: !count,
      },
      {
        label: tabNameWithCount('Transactions', data?.transactions_count),
        key: 'tx',
        children: <AccountTransactions key={address} id={address} count={data?.transactions_count} />,
        hide: !data?.transactions_count,
      },
      {
        label: tabNameWithCount('Changes', data?.resource_changes_count),
        key: 'changes',
        children: <Changes id={data?.address} count={data.resource_changes_count || 100} />,
        hide: !(data.resource_changes_count || 100),
      },
      {
        label: tabNameWithCount('Events', data?.events_count),
        key: 'events',
        children: <Events key={address} id={address} count={data?.events_count} />,
        hide: !data?.events_count,
      },
      {
        label: tabNameWithCount('Resources', data?.resources_count),
        key: 'resources',
        children: <Resources key={address} id={address} count={data?.resources_count} />,
        hide: !data?.resources_count,
      },
      {
        label: tabNameWithCount('Modules', data?.module_count),
        key: 'modules',
        children: <Modules key={address} id={address} count={data?.module_count} />,
        hide: !data?.module_count,
      },
    ].filter((item) => !item.hide) as any
  }, [data, address])

  const [activeKey, onTabChange] = useSearchTab(tabs)

  return (
    <Container>
      <DocumentTitle value={`Aptos Account ${address != null ? address : '-'} | Apscan`} />
      <PageTitle
        value={
          <InlineBox
            css={css`
              align-items: center;
            `}
          >
            Account
            {address && (
              <Address
                replaceAddress={false}
                size="full"
                as="span"
                value={address}
                css={css`
                  margin-left: 0.5em;
                  font-size: 0.8em;
                  color: ${vars.text.secondary};
                  transform: translateY(1px);
                `}
              />
            )}
          </InlineBox>
        }
        sub={
          address && (
            <Flex>
              <Ans ml="0.25rem" address={address} />
              <Tag ml="0.25rem" address={address} />
            </Flex>
          )
        }
      />
      <Box
        css={css`
          display: grid;
          grid-template-columns: ${showHistory ? '1fr 1fr' : '1fr'};
          grid-gap: 16px;
          margin-bottom: 24px;
        `}
      >
        <Overview data={data} />
        {showHistory && <History coin={coin} history={history} address={address} />}
      </Box>
      <Card>
        <Tabs onTabClick={onTabChange} activeKey={activeKey} size="large" items={tabs} />
      </Card>
    </Container>
  )
}
