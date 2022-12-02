import { parseHeaders } from 'utils'
import { toFixedNumber } from 'utils/number'
import { emptySplitApi } from './api'

const getAccountTranscationUrl = (id?: string | void) => {
  if (!id) throw new Error('miss account id')

  const queryString = `?sender=eq.${id}`

  return `/transactions${queryString}`
}

export const accountApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    accountTransactions: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      query: ({ id, start = 0, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: getAccountTranscationUrl(id),
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
    accountEvents: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      query: ({ id, start = 0, pageSize }) => {
        if (!id) throw new Error('miss account id')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/events?address=eq.${id}`,
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
    accountTransfer: builder.query<any, { id?: string; type?: string; start?: number; pageSize?: number }>({
      query: ({ id, type, start = 0, pageSize }) => {
        if (!id && !type) throw new Error('miss account id or type')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined
        const url = type
          ? `/coin_transfers?move_resource_generic_type_params=eq.["${type}"]`
          : id
          ? `/coin_transfers_address?address=eq.${id}`
          : ''

        return {
          url,
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
    accountChanges: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: ({ id, start = 0, pageSize }) => {
        console.log('asdfafd')

        if (!id) throw new Error('miss transaction version')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/resource_changes?address=eq.${id}`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data: any[], meta: any) {
        return {
          data: data.map((item) => {
            item.data = { ...item }
            item.tx_type = item?.data?.is_write ? 'WriteResource' : 'DeleteResource'

            return item
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
    accountBalanceHistory: builder.query<
      {
        resourceType: string
        timestamp: string
        value: string
      }[],
      { id: string; start?: number; pageSize?: number }
    >({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: ({ id }) => {
        if (!id) throw new Error('miss transaction version')

        return {
          url: `/resource_changes?address=eq.${id}&move_resource_address=eq.0x1&move_resource_module=eq.coin&move_resource_name=eq.CoinStore&move_resource_generic_type_params=eq.["0x1::aptos_coin::AptosCoin"]`,
          headers: {
            'Range-Unit': 'items',
            Range: `0-${Number.MAX_SAFE_INTEGER}`,
          },
        }
      },
      transformResponse(data: any[], meta: any) {
        console.log('data')
        return data.map((item) => ({
          value: item.move_resource_data?.coin?.value,
          timestamp: item.time_microseconds,
          resourceType: (item.move_resource_generic_type_params || [])[0],
        }))
      },
    }),
    accountModules: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      query: ({ id, start = 0, pageSize }) => {
        if (!id) throw new Error('miss account id')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/account_modules?address=eq.${id}`,
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
    accountResources: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      query: ({ id, start = 0, pageSize }) => {
        if (!id) throw new Error('miss account id')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/account_resources?address=eq.${id}`,
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

    accountDetail: builder.query<any, string | void>({
      query: (id) => {
        if (!id) throw new Error('miss transaction id')

        const queryString = `?address=eq.${id}&limit=1`

        return { url: `/accounts${queryString}` }
      },
      transformResponse: (response: any[]) => {
        if (!response?.[0]) return null

        const data = response?.[0]

        return {
          ...data,
          aptos_coin_total_balance: toFixedNumber(data.aptos_coin_staked)
            .addUnsafe(toFixedNumber(data.aptos_coin_balance))
            .toHexString(),
          transfers_count: data?.coin_transfer_count
            ? (Object.values(data?.coin_transfer_count) as number[]).reduce((a, b) => a + b, 0)
            : 0,
        }
      },
    }),

    accountsCount: builder.query<any, string | void>({
      query: () => ({
        url: `/accounts?limit=20`,
        headers: {
          'Range-Unit': 'items',
          Range: '0-24',
        },
      }),
    }),

    accounts: builder.query<
      any,
      {
        pageSize: number
        offset: number | undefined
      }
    >({
      query: ({ pageSize, offset }) => {
        return {
          url: `/accounts_with_rank?limit=${pageSize}${offset ? `&offset=${offset}` : ''}`,
        }
      },
      transformResponse(data, meta: any) {
        return {
          data: (data as any[]).map((item) => {
            return {
              ...item,
              aptos_coin_total_balance: toFixedNumber(item.aptos_coin_staked)
                .addUnsafe(toFixedNumber(item.aptos_coin_balance))
                .toHexString(),
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useAccountsQuery,
  useAccountDetailQuery,
  useAccountTransferQuery,
  useAccountChangesQuery,
  useAccountTransactionsQuery,
  useAccountModulesQuery,
  useAccountResourcesQuery,
  useAccountEventsQuery,
  useAccountBalanceHistoryQuery,
} = accountApi
