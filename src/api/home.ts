import { SearchOption } from 'components/search-group/types'
import { deserializeNetworkAddress } from 'utils/deserializeNetworkAddress'
import { toFixedNumber } from 'utils/number'
import { emptySplitApi } from './api'
export const homeApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    lastTransactions: builder.query<any, number | void>({
      query: (limit = 10) => ({ url: `/transactions?type=eq.user_transaction&limit=${limit}` }),
    }),

    marketInfo: builder.query<any, void>({
      query: () => ({
        url: 'https://api.coinpaprika.com/v1/tickers/apt-aptos',
      }),
    }),

    chainConfig: builder.query<any, number | void>({
      keepUnusedDataFor: 2592000, // keep for 30 days
      query: () => ({ url: `/chain_config?select=chain_id` }),
      transformResponse: (response: any[]) => {
        return response?.[0] ?? null
      },
    }),

    transactionsHistory: builder.query<any, number | void>({
      query: () => ({ url: `/transactions_history?order=day_count.asc` }),
    }),

    stats: builder.query<any, void>({
      query: () => ({ url: `/blockchain_stats` }),
      transformResponse: (response: any[]) => {
        if (!response?.[0]) return null

        const data = response[0]

        return {
          ...data,
          validators_count: (data.active_validators_count || 0) + (data.pending_validators_count || 0),
          staked_percent: toFixedNumber(data.actively_staked, 'fixed128x8')
            .divUnsafe(toFixedNumber(data.total_supply, 'fixed128x8'))
            .toString(),
        }
      },
    }),

    lastBlocks: builder.query<any, number | void>({
      query: (limit = 10) => ({ url: `/blocks?limit=${limit}` }),
    }),

    lastBlockHeight: builder.query<any, number | void>({
      query: () => ({ url: `/blocks?limit=1&select=height` }),
      transformResponse: (response: any[]) => {
        return response?.[0]?.height ?? null
      },
    }),

    lastVersion: builder.query<any, number | void>({
      query: () => ({ url: `/transactions?limit=1&select=version` }),
      transformResponse: (response: any[]) => {
        return response?.[0]?.version ?? null
      },
    }),

    activeValidators: builder.query<any, void>({
      query: () => ({ url: `/active_validators?limit=10` }),
      transformResponse: (response: any[]) => {
        return response?.map((item) => {
          return {
            ...item,
            network_addresses: deserializeNetworkAddress(item.network_addresses),
            non_voting_power: (
              BigInt(item.voting_power_detail.pending_active) + BigInt(item.voting_power_detail.inactive)
            ).toString(),
          }
        })
      },
    }),

    search: builder.query<
      {
        transaction: null | string
        account: null | string
        block: null | string
      },
      {
        filter: SearchOption
        value: string
      }
    >({
      async queryFn(args, _queryApi, extraOptions, baseQuery) {
        let { filter, value } = args
        const result: {
          transaction: null | string
          account: null | string
          block: null | string
        } = {
          transaction: null,
          account: null,
          block: null,
        }
        if (!value ?? typeof value !== 'string') return { data: result }

        value = value.toLowerCase().trim()

        const isNumber = /^\d+$/.test(value)
        const isHex = /^0x[0-9A-Fa-f]+$/.test(value)

        if (!isHex && !isNumber) return { data: result }

        const queryUrls = {
          transaction: `/transaction_details?${
            isNumber ? `version=eq.${value}` : `hash=eq.${value}`
          }&limit=1&select=version,hash`,
          account: `/accounts?address=eq.${value}&limit=1&select=address`,
          block: `/blocks?${isNumber ? `height=eq.${value}` : `hash=eq.${value}`}&limit=1&select=height,hash`,
        }

        if (filter === SearchOption.Addresses ?? (isHex && value.length !== 66)) {
          const account = await baseQuery({ url: queryUrls['account'] })
          result.account = (account.data as any)?.[0]?.address ?? null
        } else if (filter === SearchOption.All) {
          const [account, transaction, block] = await Promise.all([
            baseQuery({ url: queryUrls['account'] }),
            baseQuery({ url: queryUrls['transaction'] }),
            baseQuery({ url: queryUrls['block'] }),
          ])

          result.account = (account.data as any)?.[0]?.address ?? null
          if (isNumber) {
            result.transaction = (transaction.data as any)?.[0]?.version ?? null
            result.block = (block.data as any)?.[0]?.height ?? null
          } else {
            result.transaction = (transaction.data as any)?.[0]?.hash ?? null
            result.block = (block.data as any)?.[0]?.hash ?? null
          }
        } else if (filter === SearchOption.Tx) {
          const transaction = await baseQuery({ url: queryUrls['transaction'] })
          if (isNumber) {
            result.transaction = (transaction.data as any)?.[0]?.version ?? null
          } else {
            result.transaction = (transaction.data as any)?.[0]?.hash ?? null
          }
        } else if (filter === SearchOption.Block) {
          const block = await baseQuery({ url: queryUrls['block'] })
          if (isNumber) {
            result.block = (block.data as any)?.[0]?.height ?? null
          } else {
            result.block = (block.data as any)?.[0]?.hash ?? null
          }
        }

        return { data: result }
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useLastBlocksQuery,
  useMarketInfoQuery,
  useLastTransactionsQuery,
  useStatsQuery,
  useLastVersionQuery,
  useActiveValidatorsQuery,
  useTransactionsHistoryQuery,
  useLastBlockHeightQuery,
  useSearchQuery,
  useChainConfigQuery,
} = homeApi
