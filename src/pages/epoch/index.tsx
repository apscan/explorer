import { css } from '@emotion/react'
import { useEpochDetailQuery } from 'api/epoch'
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
import { Overview } from './Overview'
import { Validators } from './Validators'

const tabs: Record<string, { name: string; key: string }> = {
  overview: {
    key: 'overview',
    name: 'Overview',
  },
  validators: {
    key: 'validators',
    name: 'Validators',
  },
}

const EpochTitle = ({ id, latest }: { id?: string; latest?: string }) => {
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
      Epoch
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
          toNext={!isDisableNext ? `/epoch/${Number(id) + 1}` : undefined}
          toPrev={!isDisablePrev ? `/epoch/${Number(id) - 1}` : undefined}
          nextTooltip={isDisableNext ? 'You have reached the latest epoch' : 'View next epoch'}
          prevTooltip={isDisablePrev ? 'You have reached the earliest epoch' : 'View previous epoch'}
          css={css`
            transform: translateY(-1.5px);
          `}
        />
      )}
    </InlineBox>
  )
}

export const Epoch = () => {
  const { id } = useParams<{ id: string }>()
  const { epoch: count } = useAppStats()
  const { data = {} } = useEpochDetailQuery(id)

  const latest = count

  const items = useMemo(() => {
    const totalValidators = data?.validators?.active_validators
      ? data?.validators?.pending_active + data?.validators?.active_validators + data?.validators?.pending_inactive
      : undefined

    let result = [
      {
        label: tabs.overview.name,
        key: tabs.overview.key,
        children: <Overview data={data} />,
      },
      {
        label: tabNameWithCount(tabs.validators.name, totalValidators),
        key: tabs.validators.key,
        children: <Validators id={id} />,
      },
    ]

    return result
  }, [data, id])

  const [activeKey, onTabChange] = useSearchTab(items)

  return (
    <Container>
      <DocumentTitle value={`Aptos Epoch ${data?.proposal_id !== undefined ? `#${data.proposal_id}` : '-'} | Apscan`} />
      <PageTitle value={<EpochTitle latest={String(latest)} id={data?.epoch_data?.epoch} />} />
      <Card>
        <Tabs onChange={onTabChange} activeKey={activeKey} size="large" items={items} />
      </Card>
    </Container>
  )
}
