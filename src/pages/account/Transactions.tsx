import { useAccountTransactionsQuery } from 'api'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { TransactionsTable } from 'pages/transactions/TransactionsTable'
import TableStat from 'components/TotalStat'
import { usePageStartLimit } from 'hooks/usePageStartLimit'
import { useCallback, useMemo } from 'react'
import { useCustomSearchParams } from 'hooks/useCustomSearchParams'

export const AccountTransactions = ({ id, count }: { id: string; count: number }) => {
  const { limit: pageSize, setLimit: setPageSize, start = count - 1, setStart } = usePageStartLimit()
  const [search, setSearch] = useCustomSearchParams()

  const { data: { data } = {}, isLoading } = useAccountTransactionsQuery(
    {
      id,
      start,
      pageSize,
    },
    {
      skip: id == null || !count,
    }
  )
  const [showPage, totalPage] = useMemo(() => {
    const totalPage = Math.ceil(count / pageSize)
    const before = count - start - 1

    if (before < 0) {
      return [0, totalPage]
    }

    return [Math.ceil(before / pageSize) + 1, Math.ceil(count / pageSize)]
  }, [count, pageSize, start])

  const onSelectPageSize = useCallback(
    (pageSize: number) => {
      delete search.start
      setSearch({ ...search, limit: `${pageSize}` })
      setStart(count - 1)
      setPageSize(pageSize)
    },
    [count, search, setPageSize, setSearch, setStart]
  )
  const onNextPage = useCallback(() => {
    if (start + 1 > pageSize) {
      const start_: number = start - pageSize
      setSearch({ ...search, start: `${start_}` })
      setStart(start_)
    }
  }, [pageSize, search, setSearch, setStart, start])
  const onPrePage = useCallback(() => {
    if (start + pageSize + 1 > count) {
      return
    }
    if (showPage === 2) {
      delete search.start
      setSearch({ ...search })
      setStart(count)
    } else {
      const start_: number = start + pageSize
      setSearch({ ...search, start: `${start_}` })
      setStart(start_)
    }
  }, [start, pageSize, count, showPage, search, setSearch, setStart])
  const onFirstPage = useCallback(() => {
    delete search.start
    setSearch({ ...search })
    setStart(count)
  }, [count, search, setSearch, setStart])
  const onLastPage = useCallback(() => {
    if (pageSize) {
      setSearch({ ...search, start: `${pageSize - 1}` })
      setStart(pageSize - 1)
    }
  }, [pageSize, search, setSearch, setStart])

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat variant="tabletab" object="transactions" count={count} />
        {totalPage > 1 && (
          <Pagination
            syncUrl={false}
            page={showPage}
            total={totalPage}
            onNextPage={onNextPage}
            onFirstPage={onFirstPage}
            onLastPage={onLastPage}
            onPrePage={onPrePage}
          />
        )}
      </CardHead>
      <TransactionsTable page={showPage} variant="account" data={data} />
      {totalPage > 1 && (
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={onSelectPageSize} />
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
      )}
    </CardBody>
  )
}
