import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

export const coinApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    coins: builder.query<any, { start?: number; pageSize?: number }>({
      query: ({ start = 0, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/coin_info`,
          headers: {
            prefer: 'count=exact',
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data, meta) {
        const page = parseHeaders(meta?.response?.headers)

        return {
          data: (data as any[])?.map((item, index) => {
            return {
              ...item,
              rank: (page.min || 0) + index + 1,
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useCoinsQuery } = coinApi
