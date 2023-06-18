import { useCallback } from 'react'

export const useRangePagination = (
  page: number,
  pageSize: number,
  count: number,
  setPage: (page: number) => void
) => {
  const onNextPage = useCallback(() => {
    if (page * pageSize < count) {
      setPage(page + 1)
    }
  }, [count, page, pageSize, setPage])

  const onPrePage = useCallback(() => {
    if (page > 0) {
      setPage(page - 1)
    }
  }, [page, setPage])

  const onFirstPage = useCallback(() => {
    setPage(0)
  }, [setPage])

  const onLastPage = useCallback(() => {
    if (page < Math.ceil(count / pageSize)) {
      setPage(Math.ceil(count / pageSize))
    }
  }, [count, page, pageSize, setPage])

  return {
    onNextPage,
    onPrePage,
    onFirstPage,
    onLastPage,
    total: Math.ceil(count / pageSize),
    page,
  }
}
