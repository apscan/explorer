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
            // prefer: 'count=exact',
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data, meta: any) {
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
    coinDetail: builder.query<any, { type?: string }>({
      query: ({ type }) => {
        if (!type) {
          throw new Error('miss coin type')
        }

        const queryString = `?move_resource_generic_type_params=eq.["${type}"]`

        return { url: `/coin_info${queryString}` }
      },
      transformResponse(response: any[], meta: any) {
        if (!response?.[0]) return null

        const data = response?.[0]

        return data
      },
    }),
    coinHolders: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      query: ({ id, start = 0, pageSize }) => {
        if (!id) throw new Error('miss account id')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/coin_balances_rank?move_resource_generic_type_params=eq.["${id}"]`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data, meta: any) {
        return { data }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useCoinsQuery, useCoinDetailQuery, useCoinHoldersQuery } = coinApi
