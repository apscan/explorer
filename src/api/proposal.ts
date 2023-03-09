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
              early_resolution_vote_threshold: item.proposal_content.early_resolution_vote_threshold,
            }
          }),
          page: parseHeaders(meta?.response?.headers),
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useProposalsQuery } = proposalApi
