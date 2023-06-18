import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'
import { TokenEvent } from './collection'

type PageResult<T> = {
  data: T[]
  page: {
    min?: number | undefined
    max?: number | undefined
    count?: number | undefined
  }
}

export type TokenOfCollection = {
  collection_name: string
  creator_address: string
  token_name: string
  token_data_handle: string
  token_data_key: string
  created_at_version: number
  events_count: number
  addresses_count: number
  is_write: boolean
  token_data: {
    uri: string
    name: string
    supply: string
    maximum: string
    royalty?: {
      payee_address: string
      royalty_points_numerator: string
      royalty_points_denominator: string
    }
    description: string
    mutability_config: {
      uri: boolean
      maximum: boolean
      royalty: boolean
      properties: boolean
      description: boolean
    }
    argest_property_version: string
  }
}

export type TokenDetail = {
  collection_name: string
  creator_address: string
  token_name: string
  token_data_handle: string
  token_data_key: string
  created_at_version: number
  events_count: number
  addresses_count: number
  is_write: boolean
  token_data: {
    image_uri?: string
    animation_uri?: string
    image_checksum?: string
    update_block_height?: string
    uri?: string
    name?: string
    supply?: string
    maximum?: string
    royalty?: {
      payee_address: string
      royalty_points_numerator: string
      royalty_points_denominator: string
    }
    description?: string
    mutability_config?: {
      image_uri?: boolean
      maximum?: boolean
      uri?: boolean
      royalty?: boolean
      properties?: boolean
      description?: boolean
    }
    default_properties?: {
      map?: Record<string, any>
    }
    largest_property_version?: string
  }
}

type TokenByAddress = {
  address: string
  token_id: {
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
  latest_transaction_version: string
  token_info: {
    uri: string
    name: string
    supply: string
    maximum: string
    royalty: {
      payee_address: string
      royalty_points_numerator: string
      royalty_points_denominator: string
    }
    description: string
    mutability_config: {
      uri: boolean
      maximum: boolean
      royalty: boolean
      properties: boolean
      description: boolean
    }
    largest_property_version: string
  }
  token_id_handle: string
  rank: number
}

export type TokenHolder = {
  collection_name: string
  creator_address: string
  token_name: string
  token_id_handle: string
  token_id_key: string
  created_at_version: number
  address: string
  amount: number
  is_write: boolean
  token_id: {
    id: {
      token_data_id: {
        name: string
        creator: string
        collection: string
      }
      property_version: string
    }
    amount: string
    token_properties: {
      map: {
        data: any[]
      }
    }
  }
}

export const tokenApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    tokens: builder.query<PageResult<TokenByAddress>, { address?: string; start?: number; pageSize?: number }>({
      query: ({ start = 0, pageSize, address }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/tokens_by_address?address=eq.${address}`,
          headers: {
            prefer: 'count=exact',
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data: TokenByAddress[], meta: any) {
        return {
          data: (data as any[])?.map((item, index) => {
            return {
              ...item,
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
    tokenDetail: builder.query<TokenDetail, { creator: string; name: string; collectionName: string }>({
      query: ({ creator, name, collectionName }) => {
        return {
          url: `/tokens?collection_name=eq.${encodeURIComponent(
            collectionName
          )}&creator_address=eq.${creator}&token_name=eq.${encodeURIComponent(name)}`,
          headers: {
            'Range-Unit': 'items',
          },
        }
      },
      transformResponse(data: TokenDetail[], meta: any) {
        return data[0]
      },
    }),
    tokensByCollection: builder.query<
      PageResult<TokenOfCollection>,
      { creator: string; name: string; start?: number; pageSize?: number }
    >({
      query: ({ start = 0, pageSize, creator, name }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/tokens?creator_address=eq.${creator}&collection_name=eq.${encodeURIComponent(name)}`,
          headers: {
            prefer: 'count=exact',
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data: TokenOfCollection[], meta: any) {
        return {
          data,
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
    accountTokenEvents: builder.query<PageResult<{}>, { id?: string; start?: number; pageSize?: number }>({
      query: ({ start = 0, pageSize, id }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/token_events_by_address?address=eq.${id}`,
          headers: {
            prefer: 'count=exact',
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data, meta: any) {
        return {
          data: (data as any[])?.map((item, index) => {
            return {
              ...item,
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
    tokenHolders: builder.query<
      TokenHolder[],
      {
        creator: string
        name: string
        collectionName: string
        start?: number
        pageSize?: number
      }
    >({
      query: ({ creator, name, collectionName, start, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/token_holders?collection_name=eq.${encodeURIComponent(
            collectionName
          )}&creator_address=eq.${creator}&token_name=eq.${encodeURIComponent(name)}`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data: TokenHolder[]) {
        return data
      },
    }),
    tokenEvents: builder.query<
      TokenEvent[],
      {
        creator: string
        name: string
        collectionName: string
        start?: number
        pageSize?: number
      }
    >({
      query: ({ creator, name, collectionName, start, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/token_events?collection_name=eq.${encodeURIComponent(
            collectionName
          )}&creator_address=eq.${creator}&token_name=eq.${encodeURIComponent(name)}`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
          },
        }
      },
      transformResponse(data: TokenEvent[]) {
        return data
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useTokensQuery,
  useAccountTokenEventsQuery,
  useTokensByCollectionQuery,
  useTokenDetailQuery,
  useTokenHoldersQuery,
  useTokenEventsQuery,
} = tokenApi
