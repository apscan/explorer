import { parseHeaders } from 'utils'
import { emptySplitApi } from './api'

export const proposalApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    proposals: builder.query<any, { start?: number; pageSize?: number }>({
      query: ({ start = 0, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        return {
          url: `/proposals`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
            Prefer: 'count=exact',
          },
        }
      },
      transformResponse(data, meta: any) {
        return {
          data: (data as any[])?.map((item) => {
            return {
              ...item,
              proposer: item.proposal_content.proposer,
              creation_time: item.proposal_content.creation_time_secs * 1000,
              expiration_time: item.proposal_content.expiration_secs * 1000,
              min_vote_threshold: item.proposal_content.min_vote_threshold,
              early_resolution_vote_threshold: item.proposal_content.early_resolution_vote_threshold.vec[0],
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
    proposalVotes: builder.query<any, { id: any; start?: number; pageSize?: number }>({
      query: ({ id, start = 0, pageSize }) => {
        const end = pageSize != null && start != null ? start + pageSize - 1 : undefined

        const queryString = `?proposal_id=eq.${id}`

        return {
          url: `/voting_events${queryString}`,
          headers: {
            'Range-Unit': 'items',
            Range: `${start}-${end ?? ''}`,
            Prefer: 'count=exact',
          },
        }
      },
      transformResponse(data, meta: any) {
        return {
          data,
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
    proposalDetail: builder.query<any, string | void>({
      keepUnusedDataFor: 86400, // keep for 24 hours
      query: (id) => {
        if (!id) throw new Error('miss proposal id')

        const queryString = `?proposal_id=eq.${id}`

        return {
          url: `/proposals${queryString}`,
          headers: {
            'Range-Unit': 'items',
            Prefer: 'count=exact',
          },
        }
      },
      transformResponse: (response: any[], meta: any) => {
        const result = response?.[0] || null

        return result
      },
    }),
    proposalCount: builder.query<any, string | void>({
      query: (id) => {
        if (!id) throw new Error('miss proposal id')

        return {
          url: `/proposals`,
          headers: {
            'Range-Unit': 'items',
            Range: `0-1`,
            Prefer: 'count=exact',
          },
        }
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          count: parseHeaders(meta?.response?.headers).count,
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useProposalsQuery, useProposalDetailQuery, useProposalCountQuery, useProposalVotesQuery } = proposalApi
