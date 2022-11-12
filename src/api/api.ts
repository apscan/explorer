import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.REACT_APP_API_HOST || 'https://api.apscan.io/'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })
const baseQueryWithErrorHandle: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 'FETCH_ERROR') {
    window.postMessage('toast:error:403')
  }
  if (!result.error) {
    window.postMessage('toast:error:clear')
  }
  return result
}

export const emptySplitApi = createApi({
  baseQuery: baseQueryWithErrorHandle,
  tagTypes: ['Blocks', 'Transactions'],
  endpoints: () => ({}),
})
