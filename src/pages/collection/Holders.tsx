import { createColumnHelper } from '@tanstack/react-table'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { DataTable } from 'components/table'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { Pagination } from 'components/table/Pagination'
import { useMemo } from 'react'
import TableStat from 'components/TotalStat'
import { CollectionHolder, useCollectionHoldersQuery } from 'api/collection'
import { NumberFormat } from 'components/NumberFormat'
import { Address } from 'components/Address'

const helper = createColumnHelper<any>()

export const Holders = ({
  creator,
  name,
  count,
  supply,
}: {
  creator: string
  name: string
  count: number
  supply?: number
}) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data = [] } = {}, isLoading } = useCollectionHoldersQuery(
    { creator, name, start: (page - 1) * pageSize, pageSize },
    {
      skip: !creator || !name,
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
      helper.accessor('holder_address', {
        meta: {
          nowrap: true,
        },
        header: 'Address',
        cell: (info) => <Address value={info.getValue()} size="short" />,
      }),
      helper.accessor('tokens_count', {
        meta: {
          nowrap: true,
        },
        header: 'Amount',
        cell: (info) => <NumberFormat minimumFractionDigits={0} postfix={false} value={info.getValue()} />,
      }),
      helper.accessor('percentage', {
        meta: {
          nowrap: true,
        },
        header: 'Percentage',
        cell: (info) => {
          const data = info.row.original as CollectionHolder

          return (
            <NumberFormat
              fallback="-"
              maximumFractionDigits={2}
              postfix="%"
              value={!supply ? undefined : (data.tokens_count / supply) * 100}
            />
          )
        },
      }),
    ],
    [page, pageSize, supply]
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
