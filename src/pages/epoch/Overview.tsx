import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { Hash } from 'components/Hash'
import { HashesTable } from 'components/HashesTable'
import { renderRow } from 'components/helpers'
import { ProposalStatus } from 'components/ProposalStatus'
import { DateFormat } from 'state/application/slice'

const Wrapper = styled(Box)`
  padding: 0 12px;
`

export const Overview = ({ data }: { data: any | undefined }) => {
  return (
    <Wrapper>
      <Box>
        {renderRow('Status', <ProposalStatus size="lg" value={data?.proposal_status} />)}
        {renderRow('Proposer', <Address withAnsIcon size="full" value={data?.proposal_content?.proposer} />)}
        {renderRow('Required Stake', <AmountFormat value={undefined} />, { border: true })}
        {renderRow(
          'Creation Time',
          <DateTime format={DateFormat.FULL} value={data?.proposal_content?.creation_time_secs * 1000} />
        )}
        {renderRow(
          'Voting End Time',
          <DateTime format={DateFormat.FULL} value={data?.proposal_content?.expiration_secs * 1000} />
        )}
        {renderRow('Min Vote Threshold', <AmountFormat value={data?.proposal_content?.min_vote_threshold} />)}
        {renderRow(
          'Early Resolution Threshold',
          <AmountFormat value={data?.proposal_content?.early_resolution_vote_threshold.vec[0]} />
        )}
        {renderRow('Votes', null, { border: true })}
        {renderRow(
          'Execution Date',
          <DateTime format={DateFormat.FULL} value={data?.proposal_content?.resolution_time_secs} />
        )}
        {renderRow('Execution Hash', <Hash fallback="-" value={data?.proposal_content?.execution_hash} size="full" />)}
        {renderRow(
          'Metadata',
          <HashesTable
            value={data?.proposal_content?.metadata?.data?.map((item: any) => {
              return {
                label: item.key,
                content: (
                  <Hash
                    css={css`
                      word-break: break-all;
                      white-space: normal;
                    `}
                    value={item?.value}
                    size="full"
                  />
                ),
              }
            })}
          />
        )}
      </Box>
    </Wrapper>
  )
}
