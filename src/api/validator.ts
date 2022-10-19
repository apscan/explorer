import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

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
      transformResponse(data, meta) {
        return { data, page: parseHeaders(meta?.response?.headers) }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useValidatorsQuery } = validatorApi
