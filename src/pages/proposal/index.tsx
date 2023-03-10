import { css } from '@emotion/react'
import { useProposalCountQuery, useProposalDetailQuery, useTransactionDetailQuery } from 'api'
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
// import { Changes } from './Changes'
// import { Events } from './Events'
import { Overview } from './Overview'

const tabs: Record<string, { name: string; key: string }> = {
  overview: {
    key: 'overview',
    name: 'Overview',
  },
  changes: {
    key: 'votes',
    name: 'Changes',
  },
  events: {
    key: 'events',
    name: 'Events',
  },
}

const ProposalTitle = ({ id, latest }: { id?: string; latest?: string }) => {
  const isDisableNext = useMemo(() => {
    return Number(id) >= Number(latest)
  }, [])

  const isDisablePrev = useMemo(() => {
    return Number(id) === 0
  }, [id])

  console.log(isDisableNext)

  return (
    <InlineBox
      css={css`
        align-items: center;
      `}
    >
      Proposal
      {id && (
        <NumberFormat
          prefix="#"
          value={id}
          css={css`
            margin-left: 0.5em;
            font-size: 0.8em;
            color: ${vars.text.secondary};
            margin-right: 12px;
            transform: translateY(1px);
          `}
        />
      )}
      {id && latest && (
        <ForwardBackward
          nextDisabled={isDisableNext}
          prevDisabled={isDisablePrev}
          toNext={!isDisableNext ? `/proposal/${Number(id) + 1}` : undefined}
          toPrev={!isDisablePrev ? `/proposal/${Number(id) - 1}` : undefined}
          nextTooltip={isDisableNext ? 'You have reached the latest id' : 'View next id'}
          prevTooltip={isDisablePrev ? 'You have reached the earliest id' : 'View previous id'}
          css={css`
            transform: translateY(-1.5px);
          `}
        />
      )}
    </InlineBox>
  )
}

export const Proposal = () => {
  const { id } = useParams<{ id: string }>()

  const { data = {} } = useProposalDetailQuery(id)
  const { data: { count } = {} } = useProposalCountQuery(id)

  const latest = count + 1
  console.log(count)

  const version = useMemo(() => {
    return data?.version == null ? undefined : String(data?.version)
  }, [data])

  const items = useMemo(() => {
    let result = [{ label: tabs.overview.name, key: tabs.overview.key, children: <Overview data={data} /> }]

    // if (data?.changes_count > 0) {
    //   result.push({
    //     label: tabNameWithCount(tabs.changes.name, data?.changes_count) as any,
    //     key: tabs.changes.key,
    //     children: <Changes id={version} count={data?.changes_count} />,
    //   })
    // }

    // if (data?.events_count > 0) {
    //   result.push({
    //     label: tabNameWithCount(tabs.events.name, data?.events_count) as any,
    //     key: tabs.events.key,
    //     children: <Events id={version} count={data?.events_count} />,
    //   })
    // }

    return result
  }, [data, version])

  const [activeKey, onTabChange] = useSearchTab(items)

  return (
    <Container>
      <DocumentTitle
        value={`Aptos Proposal ${data?.proposal_id !== undefined ? `#${data.proposal_id}` : '-'} | Apscan`}
      />
      <PageTitle value={<ProposalTitle latest={String(latest)} id={data?.proposal_id} />} />
      <Card>
        <Tabs onChange={onTabChange} activeKey={activeKey} size="large" items={items} />
      </Card>
    </Container>
  )
}
