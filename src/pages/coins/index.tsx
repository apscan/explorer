import { useCoinsQuery, useMarketInfoQuery } from 'api'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box, Container } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { CoinsTable } from './CoinsTable'
import { maxCount } from 'utils'

export const Coins = () => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()

  const { data: { data, page: pageParams = {} } = {}, isLoading } = useCoinsQuery({
    start: (page - 1) * pageSize,
    pageSize,
  })

  const pageProps = useRangePagination(
    page,
    pageSize,
    pageParams.count > maxCount ? maxCount : pageParams.count,
    setPage
  )
  const { data: market } = useMarketInfoQuery()

  return (
    <Container>
      <DocumentTitle value="Coin Tracker | Apscan" />
      <PageTitle value="Coins" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <CardHeadStats variant="table">
            <Box>
              Total of <NumberFormat useGrouping fallback="-" value={pageParams.count} /> coins
            </Box>
            {pageParams.count && pageParams.count > maxCount && (
              <Box>
                &nbsp;(showing the top <NumberFormat useGrouping value={maxCount} /> only)
              </Box>
            )}
          </CardHeadStats>
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
