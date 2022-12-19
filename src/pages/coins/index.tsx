import { useCoinsQuery, useMarketInfoQuery } from 'api'
import { Card, CardFooter, CardHead } from 'components/Card'
import { Container } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { CoinsTable } from './CoinsTable'
import TableStat from 'components/TotalStat'
import { queryRangeLimitMap } from 'config/api'

export const Coins = () => {
  const maxCount = queryRangeLimitMap['coin_info']
  const [pageSize, setPageSize, page, setPage] = usePageSize()

  const { data: { data } = {}, isLoading } = useCoinsQuery({
    start: (page - 1) * pageSize,
    pageSize,
  })

  const pageProps = useRangePagination(page, pageSize, maxCount, setPage)
  const { data: market } = useMarketInfoQuery()

  return (
    <Container>
      <DocumentTitle value="Coin Tracker | Apscan" />
      <PageTitle value="Coins" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <TableStat variant="table" forceMaxCount={true} maxCount={maxCount} object="coins" count={maxCount} />
          <Pagination {...pageProps} />
        </CardHead>
        <CoinsTable price={market?.quotes?.USD?.price} data={data} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      </Card>
    </Container>
  )
}
