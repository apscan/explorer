import { css } from '@emotion/react'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { useBlockDetailQuery, useBlockMetadataQuery, useFailedProposersQuery } from 'api'
import { Card } from 'components/Card'
import { Container, InlineBox } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { ForwardBackward } from 'components/ForwardBackward'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { Tabs } from 'components/Tabs'
import { useSearchTab } from 'hooks/useSearchTab'
import { ReactNode, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStats } from 'state/api/hooks'
import { vars } from 'theme/theme.css'
import { tabNameWithCount } from 'utils'
import { Overview } from './Overview'
import { BlockTransactions } from './Transactions'

const tabs: Record<string, { name: string; key: string }> = {
  overview: {
    key: 'overview',
    name: 'Overview',
  },
  tx: {
    key: 'tx',
    name: 'Transactions',
  },
}

const BlockTitle = ({ blockHeight, latestBlockHeight }: { blockHeight?: string; latestBlockHeight?: string }) => {
  const isDisableNext = useMemo(() => {
    // return Number(blockHeight) >= Number(latestBlockHeight)
    return false
  }, [])

  const isDisablePrev = useMemo(() => {
    return Number(blockHeight) === 0
  }, [blockHeight])

  return (
    <InlineBox
      css={css`
        align-items: center;
      `}
    >
      Block
      {blockHeight && (
        <NumberFormat
          prefix="#"
          value={blockHeight}
          css={css`
            margin-left: 0.5em;
            font-size: 0.8em;
            color: ${vars.text.secondary};
            margin-right: 12px;
            transform: translateY(1px);
          `}
        />
      )}
      {blockHeight && latestBlockHeight && (
        <ForwardBackward
          nextDisabled={isDisableNext}
          prevDisabled={isDisablePrev}
          toNext={!isDisableNext ? `/block/${Number(blockHeight) + 1}` : undefined}
          toPrev={!isDisablePrev ? `/block/${Number(blockHeight) - 1}` : undefined}
          nextTooltip={isDisableNext ? 'You have reached the latest block' : 'View next block'}
          prevTooltip={isDisablePrev ? 'You have reached the earliest block' : 'View previous block'}
          css={css`
            transform: translateY(-1.5px);
          `}
        />
      )}
    </InlineBox>
  )
}

export const Block = () => {
  const { id } = useParams<{ id: string }>()
  const { latest_block_height: latestBlockHeight } = useAppStats()

  const { data } = useBlockDetailQuery(id)
  const { data: failedProposers } = useFailedProposersQuery(id)

  const { data: blockMetadata } = useBlockMetadataQuery({
    id: id!,
  })

  const blockHeight = useMemo(() => {
    return data?.height == null ? undefined : String(data?.height)
  }, [data])

  const items = useMemo(
    () =>
      [
        {
          label: tabs.overview.name,
          key: tabs.overview.key,
          children: <Overview blockMeta={blockMetadata} data={{ ...data, failedProposers }} />,
        },
        id && {
          label: tabNameWithCount(tabs.tx.name, data?.transactions_count),
          key: tabs.tx.key,
          children: <BlockTransactions id={blockHeight} count={data?.transactions_count} />,
        },
      ].filter(Boolean) as {
        label: ReactNode
        key: string
        children: EmotionJSX.Element
      }[],
    [data, id, blockHeight, blockMetadata, failedProposers]
  )
  const [activeKey, onTabChange] = useSearchTab(items)

  return (
    <Container>
      <DocumentTitle value={`Aptos Block ${blockHeight !== undefined ? `#${data?.height}` : '-'} | Apscan`} />
      <PageTitle value={<BlockTitle latestBlockHeight={String(latestBlockHeight)} blockHeight={blockHeight} />} />
      <Card>
        <Tabs onChange={onTabChange} activeKey={activeKey} size="large" items={items} />
      </Card>
    </Container>
  )
}
