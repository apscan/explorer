import { useValidatorsQuery } from 'api/validator'
import { Container } from 'components/container'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { DocumentTitle } from 'components/DocumentTitle'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { useAppStats } from 'state/api/hooks'
import { usePageNumberFromUrl, usePageSize } from 'state/application/hooks'
import { ValidatorsTable } from './ValidatorsTable'

export const Validators = () => {
  const stats = useAppStats()
  const pageNumber = usePageNumberFromUrl()
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>((pageNumber - 1) * pageSize)

  const { data: { data, page } = {}, isLoading } = useValidatorsQuery({
    start,
    pageSize,
  })

  const pageProps = useRangePagination(start, setStart, pageSize, {
    min: page?.min,
    max: page?.max,
    count: stats?.validators_count,
  })

  return (
    <Container>
      <DocumentTitle value="Aptos Validators | Apscan" />
      <PageTitle value="Validators" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <CardHeadStats variant="table">
            Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={stats?.validators_count} />{' '}
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
