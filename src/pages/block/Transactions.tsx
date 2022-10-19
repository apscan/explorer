import styled from '@emotion/styled'
import { useBlockTransactionsQuery } from 'api'
import { CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { NumberFormat } from 'components/NumberFormat'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { TransactionsTable } from 'pages/transactions/TransactionsTable'
import { useMemo, useState } from 'react'
import { usePageSize } from 'state/application/hooks'

const StatsNumberFormat = styled(NumberFormat)`
  margin-left: 4px;
  margin-right: 4px;
`

export const BlockTransactions = ({ id }: { id?: string }) => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {} } = useBlockTransactionsQuery(
    {
      id: id!,
      start,
      pageSize,
    },
    {
      skip: id == null,
    }
  )
  const pageProps = useRangePagination(start, setStart, pageSize, page)

  const [minVersion, maxVersion] = useMemo(() => {
    if (!data) return []
    return [data[0]?.version, data[data.length - 1]?.version]
  }, [data])

  return (
    <Box padding="12px">
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Transactions <StatsNumberFormat fallback="--" prefix="#" value={minVersion} /> to{' '}
          <StatsNumberFormat fallback="--" prefix="#" value={maxVersion} /> (Total of
          <StatsNumberFormat fallback="--" useGrouping value={page?.count} /> transactions)
        </CardHeadStats>
        {pageProps?.total && pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <TransactionsTable variant="block" data={data} />
      {pageProps?.total && pageProps.total > 1 && (
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </Box>
  )
}
