import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

const getBlockTranscationUrl = (id?: string | void) => {
  if (!id) throw new Error('miss block id')
  if (!/^\d+$/.test(id)) throw new Error('not support block hash')

  const queryString = `?order=version&block_height=eq.${id}`

  return `/transactions${queryString}`
}

export const blockApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    blockTransactions: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: ({ id, start = 0, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: getBlockTranscationUrl(id),
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
            Prefer: 'count=exact',
          },
        }
      },
      transformResponse(data, meta) {
        return { data, page: parseHeaders(meta?.response?.headers) }
      },
    }),
    blockMetadata: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: ({ id }) => {
        return {
          url: `${getBlockTranscationUrl(id)}&type=eq.block_metadata_transaction`,
        }
      },
      transformResponse(response: any[]) {
        return response?.[0] || null
      },
    }),
    blockTransactionCount: builder.query<any, string | void | undefined>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: (id) => {
        return {
          url: `${getBlockTranscationUrl(id)}&limit=1`,
          headers: {
            Prefer: 'count=exact',
          },
        }
      },
      transformResponse(data, meta) {
        const page = parseHeaders(meta?.response?.headers)
        return page.count
      },
    }),
    blocks: builder.query<
      any,
      {
        pageSize: number
        start: number | undefined
      }
    >({
      keepUnusedDataFor: 600, // keep for 10 minutes
      query: ({ pageSize, start }) => {
        return {
          url: `/blocks?limit=${pageSize}${start ? `&height=lte.${start}` : ''}`,
        }
      },
    }),
    blockDetail: builder.query<any, string | void>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: (id) => {
        if (id === undefined || id === null || id === '') throw new Error('miss block id')

        const queryString = /^\d+$/.test(id) ? `?height=eq.${id}` : `?hash=eq.${id}`

        return { url: `/blocks${queryString}` }
      },
      transformResponse: (response: any[]) => {
        return response?.[0] || null
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useBlocksQuery,
  useBlockMetadataQuery,
  useBlockDetailQuery,
  useBlockTransactionsQuery,
  useBlockTransactionCountQuery,
} = blockApi
