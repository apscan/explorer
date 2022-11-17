import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as queryString from 'query-string'

export const usePageStartLimit = () => {
  const [limit, setLimit] = useState<number>(25)
  const [start, setStart] = useState<number>()
  const location = useLocation()

  useEffect(() => {
    const limitString = (queryString.parse(location.search)?.limit as string) || '25'
    const startString = queryString.parse(location.search)?.start as string
    setLimit(parseInt(limitString))
    setStart(!startString ? undefined : parseInt(startString))
  }, [location.search])

  return useMemo(() => ({ limit, setLimit, start, setStart }), [start, limit])
}
