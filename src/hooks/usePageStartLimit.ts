import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as queryString from 'query-string'
import { pageSizeSelector } from 'state/application/selectors'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { setPageSize as setPageSizeAction } from 'state/application/slice'

export const usePageStartLimit = () => {
  const storedPageSize = useAppSelector(pageSizeSelector)
  const [start, setStart] = useState<number>()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const setPageSize = useCallback((pageSize: number) => dispatch(setPageSizeAction(pageSize)), [dispatch])

  const limit = useMemo(() => {
    const limitInUrl = parseInt(queryString.parse(location.search)?.limit as string)

    return isNaN(limitInUrl) ? storedPageSize : limitInUrl
  }, [location.search, storedPageSize])

  useEffect(() => {
    const startString = queryString.parse(location.search)?.start as string
    setStart(!startString ? undefined : parseInt(startString))
  }, [location.search])

  return useMemo(() => ({ limit, setLimit: setPageSize, start, setStart }), [limit, setPageSize, start])
}
