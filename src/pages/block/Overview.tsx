import styled from '@emotion/styled'
import { useBlockDetailQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { BlockHash } from 'components/block/BlockHash'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { Hash } from 'components/Hash'
import { HashesTable } from 'components/HashesTable'
import { renderRow } from 'components/helpers'
import { NumberFormat } from 'components/NumberFormat'
import { Version } from 'components/transaction/Version'
import { VmStatus } from 'components/VmStatus'
import { useMemo } from 'react'
import { DateFormat } from 'state/application/slice'
import { AddressesTable } from '../../components/AddressesTable'

const Wrapper = styled(Box)`
  padding: 0 12px;
`

const BlockVotesBitvec = ({ id }: { id: string }) => {
  const nextId = useMemo(() => {
    if (id !== undefined && id !== null && id !== '') {
      return String(Number(id) + 1)
    }
    return undefined
  }, [id])

  const { data, isLoading } = useBlockDetailQuery(nextId, {
    skip: !nextId,
  })

  const show = useMemo(() => {
    if (nextId && !data && !isLoading) return '-'
    if (data?.previous_block_votes_bitvec) {
      return JSON.stringify(data?.previous_block_votes_bitvec)
    }
    return ''
  }, [nextId, data, isLoading])

  return <Box>{show}</Box>
}

export const Overview = ({ data, blockMeta }: { data: any | undefined; blockMeta?: any | undefined }) => {
  return (
    <Wrapper>
      <Box>
        {renderRow('Hash', data ? <BlockHash fallback="-" as="span" value={data?.hash} size="full" /> : '', {
          border: false,
        })}
        {renderRow('Timestamp', <DateTime format={DateFormat.FULL} value={data?.time_microseconds} />, {
          border: false,
        })}
        {renderRow('Epoch', <NumberFormat value={data?.epoch} />, {
          border: false,
        })}
        {renderRow('Round', <NumberFormat value={data?.round} />, {
          border: true,
        })}
        {renderRow(
          'Proposer',
          <AddressesTable
            key="Proposer"
            value={[
              {
                content: <Address withAnsIcon size="full" value={data?.proposer} />,
                label: <VmStatus withPadding={false} withBg={false} value="Executed successfully" />,
              },
              ...(data?.failedProposers?.map((failedProposer: any) => ({
                content: <Address withAnsIcon size="full" value={failedProposer?.proposer_address} />,
                label: <VmStatus withPadding={false} withBg={false} value="" failedText="Failed" />,
              })) || []),
            ]}
          />,
          { border: false }
        )}
        {renderRow('Validators', <BlockVotesBitvec id={data?.height} />, {
          border: true,
        })}
        {renderRow(
          'Transactions',
          data?.transactions_count ? (
            data?.transactions_count === 1 ? (
              <Version value={data?.transaction_version} />
            ) : (
              <>
                <Version value={data?.transaction_version} /> -{' '}
                <Version
                  value={
                    data?.transaction_version &&
                    Number(data?.transaction_version) + Number(data?.transactions_count) - 1
                  }
                />
              </>
            )
          ) : null,
          { border: false }
        )}
        {renderRow('Fees', <AmountFormat symbol={undefined} postfix=" APT 🔥" value={data?.gas_fees} />, {
          border: true,
        })}
        {renderRow(
          'More Hashes',
          blockMeta && (
            <HashesTable
              value={[
                {
                  label: 'Event Root Hash',
                  content: <Hash value={blockMeta?.event_root_hash} size="full" />,
                },
                {
                  label: 'Accumulator Root Hash',
                  content: <Hash value={blockMeta?.accumulator_root_hash} size="full" />,
                },
                {
                  label: 'State Change Hash',
                  content: <Hash value={blockMeta?.state_change_hash} size="full" />,
                },
              ]}
            />
          ),
          { border: true }
        )}
      </Box>
    </Wrapper>
  )
}
