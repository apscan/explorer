import { createColumnHelper } from '@tanstack/react-table'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { Card, CardFooter, CardHead } from 'components/Card'
import { Container } from 'components/container'
import { DateTime } from 'components/DateTime'
import { DocumentTitle } from 'components/DocumentTitle'
import { Link } from 'components/link'
import { PageTitle } from 'components/PageTitle'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'

import { css } from '@emotion/react'
import { useProposalsQuery } from 'api'
import { ProposalStatus } from 'components/ProposalStatus'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { Votes } from 'components/Votes'
import { usePageSize } from 'hooks/usePageSize'
import { useRangePagination } from 'hooks/useRangePagination'
import { DateFormat } from 'state/application/slice'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('proposal_id', {
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
        to={`/proposal/${info.getValue()}`}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  helper.accessor('proposal_status', {
    meta: {
      nowrap: true,
    },
    header: 'Status',
    cell: (info) => (
      <ProposalStatus
        css={css`
          transform: translateY(1.5px);
        `}
        value={info.getValue()}
      />
    ),
  }),
  helper.accessor('proposer', {
    meta: {
      nowrap: true,
    },
    header: 'Proposer',
    cell: (info) => <Address value={info.getValue()} size="short" />,
  }),
  helper.accessor('creation_time', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateFormat timeLabel="Creation Time" ageLabel="Creation Age" />,
    cell: (info) => <DateTime value={info.getValue()} />,
  }),
  helper.accessor('expiration_time', {
    meta: {
      nowrap: true,
    },
    header: () => 'Voting End Time',
    cell: (info) => <DateTime format={DateFormat.LOCAL} value={info.getValue()} />,
  }),
  helper.accessor('min_vote_threshold', {
    meta: {
      nowrap: true,
    },
    header: () => 'Min Vote Threshold',
    cell: (info) => <AmountFormat value={info.getValue()} />,
  }),
  helper.accessor('early_resolution_vote_threshold', {
    meta: {
      nowrap: true,
    },
    header: 'Early Resolution Threshold',
    cell: (info) => <AmountFormat maximumFractionDigits={1} value={info.getValue()} />,
  }),
  helper.accessor('votes', {
    meta: {
      nowrap: true,
    },
    header: 'Votes',
    cell: (info) => <Votes data={info.row.original} />,
  }),
  helper.accessor('resolve_proposal_time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => 'Execution Time',
    cell: (info) => <DateTime fallback="-" format={DateFormat.LOCAL} value={info.getValue()} />,
  }),
]

export const Proposals = () => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()

  const { data: { data, page: { count } = { count: undefined } } = {}, isLoading } =
    useProposalsQuery({
      start: (page - 1) * pageSize,
      pageSize,
    })

  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <Container>
      <DocumentTitle value="Aptos Proposals | Apscan" />
      <PageTitle value="Proposals" />
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
