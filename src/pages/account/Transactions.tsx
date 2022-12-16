import { useAccountTransactionsQuery } from 'api'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { TransactionsTable } from 'pages/transactions/TransactionsTable'
import { usePageSize } from 'hooks/usePageSize'
import TableStat from 'components/TotalStat'
import { queryRangeLimitMap } from 'config/api'

export const AccountTransactions = ({ id, count }: { id: string; count: number }) => {
  const maxCount = queryRangeLimitMap['transactions?sender']
  const [pageSize, setPageSize, page, setPage] = usePageSize()

  const { data: { data } = {}, isLoading } = useAccountTransactionsQuery(
    {
      id: id!,
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      skip: id == null || !count,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count > maxCount ? maxCount : count, setPage)

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat variant="tabletab" maxCount={maxCount} object="transactions" count={count} />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <TransactionsTable page={pageProps.page} variant="account" data={data} />
      {pageProps.total > 1 && (
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
