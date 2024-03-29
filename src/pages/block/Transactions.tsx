import styled from '@emotion/styled'
import { useBlockTransactionsQuery } from 'api'
import { CardBody, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { NumberFormat } from 'components/NumberFormat'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { TransactionsTable } from 'pages/transactions/TransactionsTable'
import { useMemo } from 'react'
import { usePageSize } from 'hooks/usePageSize'

const StatsNumberFormat = styled(NumberFormat)`
  margin-left: 4px;
  margin-right: 4px;
`

export const BlockTransactions = ({ id, count }: { id?: string; count: number }) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useBlockTransactionsQuery(
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

  const [minVersion, maxVersion] = useMemo(() => {
    if (!data) return []
    return [data[0]?.version, data[data.length - 1]?.version]
  }, [data])

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Transactions <StatsNumberFormat fallback="-" prefix="#" value={minVersion} /> to{' '}
          <StatsNumberFormat fallback="-" prefix="#" value={maxVersion} /> (Total of
          <StatsNumberFormat fallback="-" useGrouping value={count} /> transactions)
        </CardHeadStats>
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <TransactionsTable page={pageProps.page} variant="block" data={data} />
      {pageProps.total > 1 && (
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
