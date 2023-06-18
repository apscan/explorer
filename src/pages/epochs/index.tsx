import { createColumnHelper } from '@tanstack/react-table'
import { AmountFormat } from 'components/AmountFormat'
import { Card, CardFooter, CardHead } from 'components/Card'
import { Container } from 'components/container'
import { DateTime } from 'components/DateTime'
import { DocumentTitle } from 'components/DocumentTitle'
import { Link } from 'components/link'
import { PageTitle } from 'components/PageTitle'
import { DataTable } from 'components/table'

import { css } from '@emotion/react'
import { useEpochsQuery } from 'api/epoch'
import { AnnualRewardRate } from 'components/AnnualRewardRate'
import { BlockHeight } from 'components/block/BlockHeight'
import { SwitchDateBlock } from 'components/SwitchDateBlock'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { ValidatorsOverview } from 'components/ValidatorsOverview'
import { usePageSize } from 'hooks/usePageSize'
import { useRangePagination } from 'hooks/useRangePagination'
import { useAppStats } from 'state/api/hooks'
import { DateOrBlock } from 'state/application/slice'
import { useAppSelector } from 'state/hooks'

const helper = createColumnHelper<any>()

const ShowDateOrBlock = ({ date, block }: { date: string | number; block: string }) => {
  const format = useAppSelector((state) => state.application.dateOrBlock)

  return format === DateOrBlock.BLOCK ? <BlockHeight value={block} /> : <DateTime value={date} />
}

const columns = [
  helper.accessor('epoch_data.epoch', {
    meta: {
      nowrap: true,
    },
    header: 'ID',
    cell: (info) => (
      <Link
        css={css`
          display: inline-flex;
          align-items: center;
        `}
        to={`/epoch/${info.getValue()}`}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  helper.accessor('epoch_start_time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateBlock dateLabel="Start Time" blockLabel="Start Block" />,
    cell: (info) => (
      <ShowDateOrBlock date={info.getValue() / 1000} block={info.row.original.epoch_start_block_height} />
    ),
  }),
  helper.accessor('epoch_end_time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateBlock dateLabel="End Time" blockLabel="End Block" />,
    cell: (info) =>
      info.getValue() ? (
        <ShowDateOrBlock date={info.getValue() / 1000} block={info.row.original.epoch_end_block_height} />
      ) : (
        '-'
      ),
  }),
  helper.accessor('validators', {
    meta: {
      nowrap: true,
    },
    header: 'Validators',
    cell: (info) => (
      <ValidatorsOverview
        allowChange={info.row.original.staking_config_data.allow_validator_set_change}
        activeValidators={info.getValue().active_validators}
        pendingInactive={info.getValue().pending_inactive}
        pendingActive={info.getValue().pending_active}
      />
    ),
  }),
  helper.accessor('staking_config_data.minimum_stake', {
    meta: {
      nowrap: true,
    },
    header: () => 'Minimum Stake (APT)',
    cell: (info) => <AmountFormat postfix={false} value={info.getValue()} />,
  }),
  helper.accessor('staking_config_data.maximum_stake', {
    meta: {
      nowrap: true,
    },
    header: () => 'Maximum Stake (APT)',
    cell: (info) => <AmountFormat postfix={false} value={info.getValue()} />,
  }),
  helper.accessor('validators.total_voting_power', {
    meta: {
      nowrap: true,
    },
    header: () => 'Total Voting Power (APT)',
    cell: (info) => <AmountFormat fallback="-" maximumFractionDigits={1} postfix={false} value={info.getValue()} />,
  }),
  helper.accessor('annual_reward_rate', {
    meta: {
      nowrap: true,
    },
    header: () => 'Annual Reward Rate',
    cell: (info) => <AnnualRewardRate value={info.row.original} />,
  }),
]

export const Epochs = () => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { epoch: count } = useAppStats()

  const { data: { data } = {}, isLoading } = useEpochsQuery({
    start: (page - 1) * pageSize,
    pageSize,
  })

  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <Container>
      <DocumentTitle value="Aptos Epochs | Apscan" />
      <PageTitle value="Epochs" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <TableStat variant="table" object="proposals" count={count} />
          <Pagination {...pageProps} />
        </CardHead>
        <DataTable dataSource={data} columns={columns} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      </Card>
    </Container>
  )
}
