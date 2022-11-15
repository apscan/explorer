import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'

export const useCustomSearchParams = (): [
  {
    [k: string]: string
  },
  (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined
          state?: any
        }
      | undefined
  ) => void
] => {
  const [search, setSearch] = useSearchParams()
  const searchAsObject = Object.fromEntries(new URLSearchParams(search))

  return [searchAsObject, setSearch]
}
