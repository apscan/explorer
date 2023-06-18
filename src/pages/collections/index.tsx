import { useCollectionsQuery } from 'api/collection'
import { Card, CardFooter, CardHead } from 'components/Card'
import { Container } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { queryRangeLimitMap } from 'config/api'
import { usePageSize } from 'hooks/usePageSize'
import { useRangePagination } from 'hooks/useRangePagination'
import { CollectionsTable } from './CollectionsTable'

export const Collections = () => {
  const maxCount = queryRangeLimitMap.collections
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data, isLoading } = useCollectionsQuery({
    start: (page - 1) * pageSize,
    pageSize,
  })

  const pageProps = useRangePagination(
    page,
    pageSize,
    (data?.page.count || 0) > maxCount ? maxCount : data?.page.count || 0,
    setPage
  )

  return (
    <Container>
      <DocumentTitle value="Collections | Apscan" />
      <PageTitle value="Collections" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <TableStat
            maxCount={maxCount}
            variant="table"
            count={data?.page.count}
            object="collections"
          />
          <Pagination {...pageProps} />
        </CardHead>
        <CollectionsTable data={data?.data || []} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      </Card>
    </Container>
  )
}
