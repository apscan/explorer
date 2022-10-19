import { useCallback, useMemo } from 'react'

export const useRangePagination = (
  start: undefined | number,
  setStart: (start?: number) => void,
  pageSize?: number,
  page: { min?: number; max?: number; count?: number } = {}
) => {
  const [showPage, totalPage] = useMemo(() => {
    if (page.count != null && page.max != null && pageSize) {
      const totalPage = Math.floor(page.count / pageSize) + 1
      const showPage = Math.floor(page.max / pageSize) + 1

      return [showPage, totalPage]
    }

    return []
  }, [page.count, page.max, pageSize])

  const onNextPage = useCallback(() => {
    if (page.max != null) setStart(page.max + 1)
  }, [page.max, setStart])

  const onPrePage = useCallback(() => {
    if (page.min != null && pageSize != null && page.min >= pageSize) setStart(page.min - pageSize)
  }, [page.min, pageSize, setStart])

  const onFirstPage = useCallback(() => {
    setStart(0)
  }, [setStart])

  const onLastPage = useCallback(() => {
    if (page.count != null && pageSize != null && page.count > pageSize) setStart(page.count - pageSize + 1)
  }, [page.count, pageSize, setStart])

  return {
    onNextPage,
    onPrePage,
    onFirstPage,
    onLastPage,
    page: showPage,
    total: totalPage,
  }
}
