import { useCoinsQuery } from 'api'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Container } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { usePageSize } from 'state/application/hooks'
import { CoinsTable } from './CoinsTable'

export const Coins = () => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {}, isLoading } = useCoinsQuery({
    start,
    pageSize,
  })

  const pageProps = useRangePagination(start, setStart, pageSize, page)

  return (
    <Container>
      <DocumentTitle value="Coin Tracker | Apscan" />
      <PageTitle value="Coins" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <CardHeadStats variant="table">
            Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={page?.count} /> coins
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
