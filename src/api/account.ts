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
    accountTransfer: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      query: ({ id, start = 0, pageSize }) => {
        if (!id) throw new Error('miss account id')
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/aptos_coin_transfers?address=eq.${id}`,
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
  useAccountTransactionsQuery,
  useAccountModulesQuery,
  useAccountResourcesQuery,
  useAccountEventsQuery,
} = accountApi
