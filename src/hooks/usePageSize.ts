import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as queryString from 'query-string'
import { pageSizeSelector } from 'state/application/selectors'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { setPageSize as setPageSizeAction } from 'state/application/slice'

export const usePageSize = () => {
  const storedPageSize = useAppSelector(pageSizeSelector)
  const [page, setPage] = useState<number>(1)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const setPageSize = useCallback((pageSize: number) => dispatch(setPageSizeAction(pageSize)), [dispatch])
  const pageSize = useMemo(() => {
    const pageSizeInUrl = parseInt(queryString.parse(location.search)?.pageSize as string)

    return isNaN(pageSizeInUrl) ? storedPageSize : pageSizeInUrl
  }, [location.search, storedPageSize])

  useEffect(() => {
    const pageString = (queryString.parse(location.search)?.page as string) || '1'
    setPage(parseInt(pageString))
  }, [location.search])

  return useMemo(
    () =>
      [pageSize, setPageSize, page, setPage] as [
        number,
        (pageSize: number) => {
          payload: number
          type: string
        },
        number,
        Dispatch<SetStateAction<number>>
      ],
    [page, pageSize, setPageSize]
  )
}
