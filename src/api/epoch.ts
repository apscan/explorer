import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

export const epochApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    epochs: builder.query<any, { start?: number; pageSize?: number }>({
      query: ({ start = 0, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/epochs`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data, meta: any) {
        return {
          data: (data as any[])?.map((item) => {
            return {
              ...item,
              epoch_number: item.sequence_number + 1,
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
    epochDetail: builder.query<any, string | void>({
      query: (id) => {
        if (!id) throw new Error('miss epoch number')

        const queryString = `?sequence_number=eq.${Number(id) - 1}`

        return {
          url: `/epochs${queryString}`,
        }
      },
      transformResponse: (response: any[], meta: any) => {
        const result = response?.[0] || null

        return result
      },
    }),
  }),

  overrideExisting: false,
})

export const { useEpochsQuery, useEpochDetailQuery } = epochApi
