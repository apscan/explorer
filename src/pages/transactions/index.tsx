import { useLastVersionQuery, useTransactionsQuery } from 'api'
import { Card, CardFooter, CardHead } from 'components/Card'
import { Container } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { useCustomSearchParams } from 'hooks/useCustomSearchParams'
import { useMaxValue } from 'hooks/useMaxValue'
import { usePageStartLimit } from 'hooks/usePageStartLimit'
import { useCallback, useMemo } from 'react'
import { TransactionsTable } from './TransactionsTable'

export const Transactions = () => {
  const { limit: pageSize, setLimit: setPageSize, start, setStart } = usePageStartLimit()
  const [search, setSearch] = useCustomSearchParams()

  const { data: _latestVersion } = useLastVersionQuery()
  const {
    data: { data, page = {} } = {},
    isLoading,
    isFetching,
  } = useTransactionsQuery(
    {
      pageSize,
      start,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const isInitialLoading = useMemo(() => {
    if (start === undefined && isFetching) return true
    return isLoading
  }, [start, isLoading, isFetching])

  const latestVersion = useMaxValue(_latestVersion > (page?.max ?? 0) ? _latestVersion : page?.max)

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
      delete search.start
      setSearch({ ...search, limit: `${pageSize}` })
      setStart(undefined)
      setPageSize(pageSize)
    },
    [search, setPageSize, setSearch, setStart]
  )

  const onNextPage = useCallback(() => {
    if (currentMin) {
      const start: number = currentMin - 1
      setSearch({ ...search, start: `${start}` })
      setStart(start)
    }
  }, [currentMin, search, setSearch, setStart])

  const onPrePage = useCallback(() => {
    if (!currentMax) {
      return
    }
    if (showPage === 2) {
      delete search.start
      setSearch({ ...search })
      setStart(undefined)
    } else {
      const start: number = currentMax + pageSize
      setSearch({ ...search, start: `${start}` })
      setStart(start)
    }
  }, [currentMax, pageSize, search, setSearch, setStart, showPage])

  const onFirstPage = useCallback(() => {
    delete search.start
    setSearch({ ...search })
    setStart(undefined)
  }, [search, setSearch, setStart])

  const onLastPage = useCallback(() => {
    if (pageSize) {
      setSearch({ ...search, start: `${pageSize - 1}` })
      setStart(pageSize - 1)
    }
  }, [pageSize, search, setSearch, setStart])

  return (
    <Container>
      <DocumentTitle value="Aptos Transactions | Apscan" />
      <PageTitle value="Transactions" />
      <Card variant="table" isLoading={isInitialLoading}>
        <CardHead variant="table">
          <TableStat variant="table" object="transactions" count={latestVersion} />
          <Pagination
            syncUrl={false}
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
          <ShowRecords syncUrl={false} pageSize={pageSize} onSelect={onSelectPageSize} />
          <Pagination
            syncUrl={false}
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
