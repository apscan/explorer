import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.REACT_APP_API_HOST || ''

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })
const baseQueryWithErrorHandle: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  const isApscanAPi = (result.meta?.request.url ?? '').indexOf(BASE_URL) > -1

  if (isApscanAPi) {
    if (!result.error) {
      window.postMessage('toast:error:clear')
    } else if (result.error.status === 403) {
      window.postMessage('toast:error:403')
    }
  }
  return result
}

export const emptySplitApi = createApi({
  baseQuery: baseQueryWithErrorHandle,
  tagTypes: ['Blocks', 'Transactions'],
  endpoints: () => ({}),
})
