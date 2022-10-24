import { css } from '@emotion/react'
import { useAccountDetailQuery } from 'api'
import { Address } from 'components/Address'
import { Card } from 'components/Card'
import { Container, InlineBox } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { PageTitle } from 'components/PageTitle'
import { Tabs } from 'components/Tabs'
import { useSearchTab } from 'hooks/useSearchTab'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { vars } from 'theme/theme.css'
import { tabNameWithCount } from 'utils'
import { Events } from './Events'
import { Modules } from './Modules'
import { Overview } from './Overview'
import { Resources } from './Resources'
import { AccountTransactions } from './Transactions'
import { Transfers } from './Transfers'

export const Account = () => {
  const { id } = useParams<{ id: string }>()

  const { data } = useAccountDetailQuery(id)

  const address = useMemo(() => data?.address, [data])

  const tabs = useMemo(() => {
    if (!data || !address) return undefined

    return [
      {
        label: tabNameWithCount('Transfers', data?.transfers_count),
        key: 'transfers',
        children: <Transfers key={address} id={address} count={data?.transfers_count} />,
        hide: !data?.transfers_count,
      },
      {
        label: tabNameWithCount('Transactions', data?.transactions_count),
        key: 'tx',
        children: <AccountTransactions key={address} id={address} count={data?.transactions_count} />,
        hide: !data?.transactions_count,
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
        <Tabs onTabClick={onTabChange} activeKey={activeKey} size="large" items={tabs} />
      </Card>
    </Container>
  )
}
