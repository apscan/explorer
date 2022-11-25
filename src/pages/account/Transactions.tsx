import { useAccountTransactionsQuery } from 'api'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { NumberFormat } from 'components/NumberFormat'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { TransactionsTable } from 'pages/transactions/TransactionsTable'
import { usePageSize } from 'hooks/usePageSize'
import { Box } from 'components/container'

export const AccountTransactions = ({ id, count }: { id: string; count: number }) => {
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
  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          <Box>
            Total of <NumberFormat useGrouping fallback="-" value={count} /> transactions
          </Box>
        </CardHeadStats>
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
