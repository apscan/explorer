import { useCoinsQuery } from 'api'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Container } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageParams } from 'state/application/hooks'
import { CoinsTable } from './CoinsTable'

export const Coins = () => {
  const [pageSize, setPageSize, page, setPage] = usePageParams()

  const { data: { data, page: pageParams = {} } = {}, isLoading } = useCoinsQuery({
    start: (page - 1) * pageSize,
    pageSize,
  })

  const pageProps = useRangePagination(page, pageSize, pageParams.count, setPage)

  return (
    <Container>
      <DocumentTitle value="Coin Tracker | Apscan" />
      <PageTitle value="Coins" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <CardHeadStats variant="table">
            Total of{' '}
            <NumberFormat useGrouping fallback="--" marginLeft="4px" marginRight="4px" value={pageParams.count} /> coins
          </CardHeadStats>
          <Pagination {...pageProps} />
        </CardHead>
        <CoinsTable data={data} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      </Card>
    </Container>
  )
}
