import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://api.apscan.io/'

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Blocks', 'Transactions'],
  endpoints: () => ({}),
})
