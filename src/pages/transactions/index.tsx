import styled from '@emotion/styled'
import { useTransactionsQuery } from 'api'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Container } from 'components/container'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { DocumentTitle } from 'components/DocumentTitle'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { useCallback, useMemo, useState } from 'react'
import { useAppStats } from 'state/api/hooks'
import { usePageSize } from 'state/application/hooks'
import { TransactionsTable } from './TransactionsTable'

const StatsNumberFormat = styled(NumberFormat)`
  margin-left: 3.5px;
  margin-right: 3.5px;
`

export const Transactions = () => {
  const { latest_transaction_version: latestVersion } = useAppStats()

  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(latestVersion)

  const { data, isLoading } = useTransactionsQuery(
    {
      pageSize,
      start,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const [currentMin, currentMax] = useMemo(() => {
    if (!data) return []

    return [data[data.length - 1].version, data[0].version]
  }, [data])

  const [showPage, totalPage] = useMemo(() => {
    if (latestVersion && pageSize) {
      return [Math.floor((latestVersion + 1 - currentMax) / pageSize) + 1, Math.floor(latestVersion / pageSize)]
    }

    return []
  }, [latestVersion, currentMax, pageSize])

  const onSelectPageSize = useCallback(
    (pageSize: number) => {
      setPageSize(pageSize)
    },
    [setPageSize]
  )

  const onNextPage = useCallback(() => {
    if (currentMin) setStart(currentMin - 1)
  }, [currentMin])
  const onPrePage = useCallback(() => {
    if (currentMax) setStart(currentMax + pageSize)
  }, [currentMax, pageSize])
  const onFirstPage = useCallback(() => {
    setStart(latestVersion)
  }, [latestVersion])

  const onLastPage = useCallback(() => {
    if (pageSize) setStart(pageSize - 1)
  }, [pageSize])

  return (
    <Container>
      <DocumentTitle value="Aptos Transactions | Apscan" />
      <PageTitle value="Transactions" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <CardHeadStats variant="table">
            Total of <StatsNumberFormat fallback="--" useGrouping value={latestVersion} /> transactions
          </CardHeadStats>
          <Pagination
            page={showPage}
            total={totalPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            onPrePage={onPrePage}
          />
        </CardHead>
        <TransactionsTable page={showPage} data={data} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={onSelectPageSize} />
          <Pagination
            page={showPage}
            total={totalPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            onPrePage={onPrePage}
          />
        </CardFooter>
      </Card>
    </Container>
  )
}
