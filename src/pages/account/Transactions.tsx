import { useAccountTransactionsQuery } from 'api'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { NumberFormat } from 'components/NumberFormat'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { TransactionsTable } from 'pages/transactions/TransactionsTable'
import { usePageParams } from 'state/application/hooks'

export const AccountTransactions = ({ id, count }: { id: string; count: number }) => {
  const [pageSize, setPageSize, page, setPage] = usePageParams()

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
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={count} /> transactions
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
