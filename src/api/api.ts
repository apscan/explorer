import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.REACT_APP_API_HOST || 'https://api.apscan.io/'

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Blocks', 'Transactions'],
  endpoints: () => ({}),
})
