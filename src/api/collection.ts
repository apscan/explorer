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

export type CollectionHolder = {
  collection_name: string
  creator_address: string
  holder_address: string
  tokens_count: number
}

export type TokenEvent = {
  transaction_version: number
  transaction_index: number
  creator_address: string
  collection_name: string
  token_name: string
  address: string
  event_type: string
  data: {
    id: {
      token_data_id: {
        name: string
        creator: string
        collection: string
      }
      property_version: string
    }
    amount: string
  }
  counter_party: {
    address: string
    data: {
      id: {
        token_data_id: {
          name: string
          creator: string
          collection: string
        }
        property_version: string
      }
      amount: string
    }
    type: string
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
    collectionHolders: builder.query<
      PageResult<CollectionHolder>,
      { creator: string; name: string; start?: number; pageSize?: number }
    >({
      query: ({ creator, name, start = 0, pageSize }) => {
        let end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/collection_holders?creator_address=eq.${creator}&collection_name=eq.${encodeURIComponent(name)}`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data: CollectionHolder[], meta: any) {
        return { data, page: parseHeaders(meta?.response?.headers) }
      },
    }),
    tokenEvents: builder.query<
      PageResult<TokenEvent>,
      { creator: string; name: string; start?: number; pageSize?: number }
    >({
      query: ({ start = 0, pageSize, creator, name }) => {
        let end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/token_events?creator_address=eq.${creator}&collection_name=eq.${encodeURIComponent(name)}`,
          headers: {
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
  }),

  overrideExisting: false,
})

export const { useCollectionsQuery, useCollectionDetailQuery, useCollectionHoldersQuery, useTokenEventsQuery } =
  collectionApi
