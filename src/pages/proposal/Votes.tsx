import { createColumnHelper } from '@tanstack/react-table'
import { useProposalVotesQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { Hash } from 'components/Hash'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { Version } from 'components/transaction/Version'
import { usePageSize } from 'hooks/usePageSize'
import { useRangePagination } from 'hooks/useRangePagination'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('transaction_version', {
    meta: {
      nowrap: true,
    },
    header: 'Tx Version',
    cell: (info) => <Version value={info.getValue()} />,
  }),
  helper.accessor('data.voter', {
    meta: {
      nowrap: true,
    },
    header: 'Voter',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('data.stake_pool', {
    meta: {
      nowrap: true,
    },
    header: 'Stake Pool Owner',
    cell: (info) => <Hash size="full" value={info.getValue()} />,
  }),
  helper.accessor('data.num_votes', {
    meta: {
      nowrap: true,
    },
    header: 'Vote',
    cell: (info) => <AmountFormat value={info.getValue()} />,
  }),
]

export const Votes = ({ id }: { id: any }) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data, page: { count } = { count: undefined } } = {}, isLoading } = useProposalVotesQuery(
    {
      id: id!,
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      skip: id == null,
    }
  )

  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <CardBody isLoading={isLoading || id == null}>
      <CardHead variant="tabletab">
        <TableStat count={count} variant="tabletab" object="voters" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable page={pageProps.page} dataSource={data} columns={columns} />
      {pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
