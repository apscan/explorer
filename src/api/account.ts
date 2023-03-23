import { parseHeaders } from 'utils'
import { getLimitedEnd } from 'utils/api'
import { toFixedNumber } from 'utils/number'
import { emptySplitApi } from './api'

export const accountApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    accountTransactions: builder.query<any, { id: string; start: number; pageSize: number }>({
      query: ({ id, start, pageSize }) => {
        return {
          url: `/user_transactions?sender=eq.${id}&sequence_number=lte.${start}&limit=${pageSize}`,
        }
      },
      transformResponse(
        data: {
          version: number
          payload: {
            type: string
            function: string
            arguments: any[]
            type_arguments: any[]
          }
          block_height: number
          sender: string
          sequence_number: number
          time_microseconds: string
          gas_used: number
          gas_unit_price: number
          events_count: number
          changes_count: number
        }[],
        meta: any
      ) {
        data = data.map((item) => ({
          ...item,
          type: 'user_transaction',
          user_transaction_detail: {
            gas_unit_price: item.gas_unit_price,
          },
        }))
        return { data }
      },
    }),
    accountEvents: builder.query<any, { id: string; start?: number; pageSize?: number }>({
      query: ({ id, start = 0, pageSize }) => {
        if (!id) throw new Error('miss account id')
        let end = pageSize != null && start != null ? start + pageSize - 1 : undefined
        end = getLimitedEnd('events?address', end)
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
        let end = pageSize != null && start != null ? start + pageSize - 1 : undefined
        let url = ''
        if (type) {
          end = getLimitedEnd('coin_transfers?move_resource_generic_type_params', end)
          url = `/coin_transfers?move_resource_generic_type_params=eq.["${type}"]`
        } else {
          end = getLimitedEnd('coin_transfers?address', end)
          url = `/coin_transfers?address=eq.${id}`
        }

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
        if (!id) throw new Error('miss transaction version')
        let end = pageSize != null && start != null ? start + pageSize - 1 : undefined
        end = getLimitedEnd('resource_changes?address', end)

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
        timestamp: string | undefined
        value: string | undefined
      }[],
      { id: string; start?: number; pageSize?: number }
    >({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: ({ id }) => {
        if (!id) throw new Error('miss transaction version')

        return {
          url: `coin_balance_history?address=eq.${id}&move_resource_generic_type_params=eq.[%220x1::aptos_coin::AptosCoin%22]&limit=1`,
        }
      },
      transformResponse(
        data: {
          address: string
          move_resource_generic_type_params: [string]
          coin_balance_history: {
            days_from_present: number
            resource_change: {
              transaction_version: number
              time_microseconds: string
              balance: string
            } | null
          }[]
        }[],
        meta: any
      ) {
        return (
          data[0]?.coin_balance_history.map((item) => ({
            value: item.resource_change?.balance,
            timestamp: item.resource_change?.time_microseconds,
            resourceType: data[0].move_resource_generic_type_params[0],
          })) || []
        )
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
        start: number
        pageSize: number
      }
    >({
      query: ({ start, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/accounts_with_rank`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
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
