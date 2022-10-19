import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

export const txApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    transactions: builder.query<
      any,
      {
        pageSize: number
        start: number | undefined
      }
    >({
      keepUnusedDataFor: 600, // keep for 10 minutes
      query: ({ pageSize, start }) => {
        return {
          url: `/transactions?limit=${pageSize}${start ? `&version=lte.${start}` : ''}`,
        }
      },
    }),
    transactionDetail: builder.query<any, string | void>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: (id) => {
        if (!id) throw new Error('miss transaction id')

        const queryString = /^\d+$/.test(id) ? `?version=eq.${id}` : `?hash=eq.${id}`

        return { url: `/transaction_details${queryString}` }
      },
      transformResponse: (response: any[]) => {
        const result = response?.[0] || null

        if (result) {
          result.changes = [
            ...(result?.table_item_changes ?? []).map((item: any) => {
              item.type = item.is_write ? 'WriteTableItem' : 'DeleteTableItem'
              return item
            }),
            ...(result?.resource_changes ?? []).map((item: any) => {
              item.type = item.is_write ? 'WriteResource' : 'DeleteResource'
              item.data = item.move_resource_data
              return item
            }),
            ...(result?.module_changes ?? []).map((item: any) => {
              item.type = item.is_write ? 'WriteModule' : 'DeleteModule'
              item.data = {
                bytecode: item.move_module_bytecode,
                abi: item.move_module_abi,
              }
              return item
            }),
          ].sort((a, b) => a.transaction_index - b.transaction_index)
        }

        return result
      },
    }),
    transactionEvents: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: ({ id, start = 0, pageSize }) => {
        if (!id) throw new Error('miss transaction version')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/events?transaction_version=eq.${id}`,
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
    transactionChanges: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: ({ id, start = 0, pageSize }) => {
        if (!id) throw new Error('miss transaction version')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/changes?transaction_version=eq.${id}`,
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
  }),

  overrideExisting: false,
})

export const {
  useTransactionsQuery,
  useTransactionDetailQuery,
  useTransactionEventsQuery,
  useTransactionChangesQuery,
} = txApi
