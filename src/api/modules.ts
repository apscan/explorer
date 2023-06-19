import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

export const moduleApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    modules: builder.query<any, { start?: number; pageSize?: number }>({
      query: ({ start = 0, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/modules`,
          headers: {
            Prefer: 'count=exact',
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
    moduleDetail: builder.query<
      any,
      {
        move_module_address: string
        move_module_name: string
      }
    >({
      query: ({ move_module_address, move_module_name }) => {
        if (!move_module_name || !move_module_address) throw new Error('miss move_module_address or move_module_name')

        const queryString = `?move_module_address=eq.${move_module_address}&move_module_name=eq.${move_module_name}`

        return {
          url: `/module_detail${queryString}`,
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useModulesQuery, useModuleDetailQuery } = moduleApi
