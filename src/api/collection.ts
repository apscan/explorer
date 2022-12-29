import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

type PageResult<T> = {
  data: T[]
  page: {
    min?: number | undefined
    max?: number | undefined
    count?: number | undefined
  }
}

export type Collection = {
  collection_name: string
  creator_address: string
  collection_data_handle: string
  collection_data_key: string
  events_count: number
  addresses_count: number
  created_at: {
    time_microseconds: number
    transaction_version: number
  }
  collection_data: {
    uri: string
    name: string
    supply: string
    maximum: string
    description: string
    mutability_config: {
      uri: boolean
      maximum: boolean
      description: boolean
    }
  }
}

export const collectionApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    collections: builder.query<PageResult<Collection>, { start?: number; pageSize?: number }>({
      query: ({ start = 0, pageSize }) => {
        let end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/collections`,
          headers: {
            prefer: 'count=exact',
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data: any[], meta: any) {
        return {
          data,
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
    collectionDetail: builder.query<Collection, { creator: string; name: string }>({
      query: ({ creator, name }) => {
        return {
          url: `/collections?creator_address=eq.${creator}&collection_name=eq.${encodeURIComponent(name)}`,
        }
      },
      transformResponse(data: Collection[]) {
        return data[0]
      },
    }),
  }),

  overrideExisting: false,
})

export const { useCollectionsQuery, useCollectionDetailQuery } = collectionApi
