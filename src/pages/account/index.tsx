import { css } from '@emotion/react'
import { useAccountDetailQuery } from 'api'
import { Address } from 'components/Address'
import { Card } from 'components/Card'
import { Container, InlineBox } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { PageTitle } from 'components/PageTitle'
import { Tabs } from 'components/Tabs'
import { useTabActiveKey } from 'hooks/useTabActiveKey'
import { useCallback, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { vars } from 'theme/theme.css'
import { tabNameWithCount } from 'utils'
import { Events } from './Events'
import { Modules } from './Modules'
import { Overview } from './Overview'
import { Resources } from './Resources'
import { AccountTransactions } from './Transactions'
import { Transfers } from './Transfers'

const tabs = {
  transfers: {
    key: 'transfers',
    name: 'Transfers',
  },
  tx: {
    key: 'tx',
    name: 'Transactions',
  },
  events: {
    key: 'events',
    name: 'Events',
  },
  resources: {
    key: 'resources',
    name: 'Resources',
  },
  modules: {
    key: 'modules',
    name: 'Modules',
  },
}

export const Account = () => {
  const { id } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data } = useAccountDetailQuery(id)

  const address = useMemo(() => data?.address, [data])

  const items = useMemo(() => {
    if (!data) return []

    let result = [
      data?.transfers_count && {
        label: tabNameWithCount(tabs.transfers.name, data?.transfers_count),
        key: tabs.transfers.key,
        children: <Transfers id={data?.address} />,
      },
      data?.transactions_count && {
        label: tabNameWithCount(tabs.tx.name, data?.transactions_count),
        key: tabs.tx.key,
        children: <AccountTransactions id={data?.address} />,
      },
      data?.events_count && {
        label: tabNameWithCount(tabs.events.name, data?.events_count),
        key: tabs.events.key,
        children: <Events id={data?.address} />,
      },
      data?.resources_count && {
        label: tabNameWithCount(tabs.resources.name, data?.resources_count),
        key: tabs.resources.key,
        children: <Resources id={data?.address} />,
      },
      data?.module_count && {
        label: tabNameWithCount(tabs.modules.name, data?.module_count),
        key: tabs.modules.key,
        children: <Modules id={data?.address} />,
      },
    ].filter(Boolean) as any

    return result
  }, [data])

  const defaultActiveKey = useTabActiveKey(tabs, searchParams)

  const onActiveKeyChange = useCallback(
    (activeKey: string) => {
      const index = items.findIndex(({ key }: { key: string }) => key === activeKey)
      if (index <= 0) {
        setSearchParams({}, { replace: true })
      } else {
        setSearchParams({ tab: items[index].key }, { replace: true })
      }
    },
    [items, setSearchParams]
  )

  return (
    <Container>
      <DocumentTitle value={`Address ${address != null ? address : '-'} | Apscan`} />
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
      />
      <Card marginBottom="20px">
        <Overview data={data} />
      </Card>
      <Card>
        <Tabs onChange={onActiveKeyChange} defaultActiveKey={defaultActiveKey} size="large" items={items} />
      </Card>
    </Container>
  )
}
