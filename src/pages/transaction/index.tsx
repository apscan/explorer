import { css } from '@emotion/react'
import { useTransactionDetailQuery } from 'api'
import { Card } from 'components/Card'
import { Container, InlineBox } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { ForwardBackward } from 'components/ForwardBackward'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { Tabs } from 'components/Tabs'
import { useSearchTab } from 'hooks/useSearchTab'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStats } from 'state/api/hooks'
import { vars } from 'theme/theme.css'
import { tabNameWithCount } from 'utils'
import { Changes } from './Changes'
import { Events } from './Events'
import { Overview } from './Overview'

const tabs: Record<string, { name: string; key: string }> = {
  overview: {
    key: 'overview',
    name: 'Overview',
  },
  changes: {
    key: 'changes',
    name: 'Changes',
  },
  events: {
    key: 'events',
    name: 'Events',
  },
}

const TransactionTitle = ({ version, latestVersion }: { version?: string; latestVersion?: string }) => {
  const isDisableNext = useMemo(() => {
    // return Number(version) >= Number(latestVersion)
    return false
  }, [])

  const isDisablePrev = useMemo(() => {
    return Number(version) === 0
  }, [version])

  return (
    <InlineBox
      css={css`
        align-items: center;
      `}
    >
      Transaction
      {version && (
        <NumberFormat
          prefix="#"
          value={version}
          css={css`
            margin-left: 0.5em;
            font-size: 0.8em;
            color: ${vars.text.secondary};
            margin-right: 12px;
            transform: translateY(1px);
          `}
        />
      )}
      {version && latestVersion && (
        <ForwardBackward
          nextDisabled={isDisableNext}
          prevDisabled={isDisablePrev}
          toNext={!isDisableNext ? `/tx/${Number(version) + 1}` : undefined}
          toPrev={!isDisablePrev ? `/tx/${Number(version) - 1}` : undefined}
          nextTooltip={isDisableNext ? 'You have reached the latest version' : 'View next version'}
          prevTooltip={isDisablePrev ? 'You have reached the earliest version' : 'View previous version'}
          css={css`
            transform: translateY(-1.5px);
          `}
        />
      )}
    </InlineBox>
  )
}

export const Transaction = () => {
  const { id } = useParams<{ id: string }>()
  const { latest_transaction_version: latestVersion } = useAppStats()

  const { data } = useTransactionDetailQuery(id)

  const version = useMemo(() => {
    return data?.version == null ? undefined : String(data?.version)
  }, [data])

  const items = useMemo(() => {
    const result = [
      {
        label: tabs.overview.name,
        key: tabs.overview.key,
        children: <Overview data={data} />,
      },
    ]

    if (data?.changes_count > 0) {
      result.push({
        label: tabNameWithCount(tabs.changes.name, data?.changes_count) as any,
        key: tabs.changes.key,
        children: <Changes id={version} count={data?.changes_count} />,
      })
    }

    if (data?.events_count > 0) {
      result.push({
        label: tabNameWithCount(tabs.events.name, data?.events_count) as any,
        key: tabs.events.key,
        children: <Events id={version} count={data?.events_count} />,
      })
    }

    return result
  }, [data, version])
  const [activeKey, onTabChange] = useSearchTab(items)

  return (
    <Container>
      <DocumentTitle value={`Aptos Trasaction ${data?.version !== undefined ? `#${data.version}` : '-'} | Apscan`} />
      <PageTitle value={<TransactionTitle latestVersion={String(latestVersion)} version={version} />} />
      <Card>
        <Tabs onChange={onTabChange} activeKey={activeKey} size="large" items={items} />
      </Card>
    </Container>
  )
}
