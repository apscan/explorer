import { useValidatorsQuery } from 'api/validator'
import { Container } from 'components/container'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { DocumentTitle } from 'components/DocumentTitle'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { useAppStats } from 'state/api/hooks'
import { usePageSize } from 'hooks/usePageSize'
import { ValidatorsTable } from './ValidatorsTable'

export const Validators = () => {
  const stats = useAppStats()
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useValidatorsQuery({
    start: (page - 1) * pageSize,
    pageSize,
  })
  const pageProps = useRangePagination(page, pageSize, stats?.validators_count, setPage)

  return (
    <Container>
      <DocumentTitle value="Aptos Validators | Apscan" />
      <PageTitle value="Validators" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <CardHeadStats variant="table">
            Total of{' '}
            <NumberFormat
              useGrouping
              fallback="--"
              marginLeft="4px"
              marginRight="4px"
              value={stats?.validators_count}
            />{' '}
            validators
          </CardHeadStats>
          <Pagination {...pageProps} />
        </CardHead>
        <ValidatorsTable data={data} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} syncUrl />
        </CardFooter>
      </Card>
    </Container>
  )
}
