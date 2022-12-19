import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

type PageResult<T> = {
  data: T[]
  page: {
    min?: number | undefined
    max?: number | undefined
    count?: number | undefined
  }
}

export const tokenApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    tokens: builder.query<
      PageResult<{
        address: string
        token_id: {
          id: {
            token_data_id: {
              name: string
              creator: string
              collection: string
            }
            property_version: string
          }
          amount: string
        }
        latest_transaction_version: string
        token_info: {
          uri: string
          name: string
          supply: string
          maximum: string
          royalty: {
            payee_address: string
            royalty_points_numerator: string
            royalty_points_denominator: string
          }
          description: string
          mutability_config: {
            uri: boolean
            maximum: boolean
            royalty: boolean
            properties: boolean
            description: boolean
          }
          largest_property_version: string
        }
        token_id_handle: string
        rank: number
      }>,
      { address?: string; start?: number; pageSize?: number }
    >({
      query: ({ start = 0, pageSize, address }) => {
        let end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/tokens?address=eq.${address}`,
          headers: {
            prefer: 'count=exact',
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data, meta: any) {
        return {
          data: (data as any[])?.map((item, index) => {
            return {
              ...item,
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useTokensQuery } = tokenApi
