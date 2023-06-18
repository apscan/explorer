import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'
import { deserializeNetworkAddress } from 'utils/deserializeNetworkAddress'

export const validatorApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    validators: builder.query<any, { start?: number; pageSize?: number }>({
      query: ({ start = 0, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/active_validators`,
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
              network: deserializeNetworkAddress(item.network_addresses),
              non_voting_power: (
                BigInt(item.voting_power_detail.pending_active) +
                BigInt(item.voting_power_detail.inactive)
              ).toString(),
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useValidatorsQuery } = validatorApi
