import { css } from '@emotion/react'
import { useProposalCountQuery, useProposalDetailQuery, useProposalVotesCountQuery } from 'api'
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
import { vars } from 'theme/theme.css'
import { tabNameWithCount } from 'utils'
// import { Changes } from './Changes'
// import { Events } from './Events'
import { Overview } from './Overview'
import { Votes } from './Votes'

const tabs: Record<string, { name: string; key: string }> = {
  overview: {
    key: 'overview',
    name: 'Overview',
  },
  votes: {
    key: 'votes',
    name: 'Votes',
  },
}

const ProposalTitle = ({ id, latest }: { id?: string; latest?: string }) => {
  const isDisableNext = useMemo(() => {
    return Number(id) >= Number(latest)
  }, [id, latest])

  const isDisablePrev = useMemo(() => {
    return Number(id) === 0
  }, [id])

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
          nextTooltip={isDisableNext ? 'You have reached the latest proposal' : 'View next proposal'}
          prevTooltip={isDisablePrev ? 'You have reached the earliest proposal' : 'View previous proposal'}
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
  const { data: { count: voters } = {} } = useProposalVotesCountQuery(id)

  const latest = count - 1

  const items = useMemo(() => {
    const result = [
      {
        label: tabs.overview.name,
        key: tabs.overview.key,
        children: <Overview data={data} />,
      },
      {
        label: tabNameWithCount(tabs.votes.name, voters),
        key: tabs.votes.key,
        children: <Votes detail={data} count={voters} id={id} />,
      },
    ]

    return result
  }, [data, id, voters])

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
