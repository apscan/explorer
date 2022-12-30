import { createColumnHelper } from '@tanstack/react-table'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { DataTable } from 'components/table'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { Pagination } from 'components/table/Pagination'
import { useMemo } from 'react'
import TableStat from 'components/TotalStat'
import { NumberFormat } from 'components/NumberFormat'
import { Address } from 'components/Address'
import { useTokenHoldersQuery } from 'api/token'

const helper = createColumnHelper<any>()

export const Holders = ({
  creator,
  name,
  count,
  collectionName,
}: {
  creator: string
  name: string
  collectionName: string
  count: number
}) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data = [], isLoading } = useTokenHoldersQuery(
    { creator, name, collectionName, start: (page - 1) * pageSize, pageSize },
    {
      skip: !creator || !name || !collectionName,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count, setPage)

  const columns = useMemo(
    () => [
      helper.accessor('rank', {
        header: 'Rank',
        meta: {
          nowrap: true,
        },
        cell: (info: any) => <NumberFormat value={info.row.index + 1 + (page - 1) * pageSize} />,
      }),
      helper.accessor('address', {
        meta: {
          nowrap: true,
        },
        header: 'Address',
        cell: (info) => <Address value={info.getValue()} size="short" />,
      }),
      helper.accessor('token_id.id.property_version', {
        meta: {
          nowrap: true,
        },
        header: 'Property Version',
        cell: (info) => <NumberFormat fallback="-" value={info.getValue()} />,
      }),
      helper.accessor('amount', {
        meta: {
          nowrap: true,
        },
        header: 'Amount',
        cell: (info) => <NumberFormat fallback="-" useGrouping value={info.getValue()} />,
      }),
      helper.accessor('deposit_events_count', {
        meta: {
          nowrap: true,
        },
        header: 'Deposit Events',
        cell: (info) => <NumberFormat fallback="-" useGrouping value={undefined} />,
      }),
      helper.accessor('withdraw_events_count', {
        meta: {
          nowrap: true,
        },
        header: 'Withdraw Events',
        cell: (info) => <NumberFormat fallback="-" useGrouping value={undefined} />,
      }),
    ],
    [page, pageSize]
  )

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat count={count} variant="tabletab" object="holders" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable dataSource={data} columns={columns} />
      {pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
