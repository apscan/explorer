import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSearch = () => {
  const navigate = useNavigate()

  return useCallback(
    async (searchText: string) => {
      const toError = () => navigate(`/search?f=0&q=${searchText}`)

      return toError()
    },
    [navigate]
  )
}
