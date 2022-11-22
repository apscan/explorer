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
          },
        }
      },
      transformResponse(data, meta: any) {
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
    blocks: builder.query<
      any,
      {
        pageSize: number
        start: number | undefined
      }
    >({
      query: ({ pageSize, start }) => {
        return {
          url: `/blocks?limit=${pageSize}${start ? `&height=lte.${start}` : ''}`,
        }
      },
      transformResponse(result: any[]) {
        return { data: result, page: { max: result?.[0]?.height }, min: result?.[result.length - 1]?.height }
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
    failedProposers: builder.query<any, string | void>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: (id) => {
        if (id === undefined || id === null || id === '') throw new Error('miss block id')

        const queryString = `?height=eq.${id}&proposer_status=eq.failed`

        return { url: `/block_proposers${queryString}` }
      },
      transformResponse: (response: any[]) => {
        return response || null
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useBlocksQuery,
  useBlockMetadataQuery,
  useBlockDetailQuery,
  useFailedProposersQuery,
  useBlockTransactionsQuery,
} = blockApi
