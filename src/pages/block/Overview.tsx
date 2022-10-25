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
import { SeeMore } from 'components/SeeMore'
import { Version } from 'components/transaction/Version'
import { useMemo } from 'react'
import { DateFormat } from 'state/application/slice'

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
        {renderRow('Timestamp', <DateTime format={DateFormat.FULL} value={data?.time_microseconds} />, {
          border: true,
        })}
        {renderRow('Proposer', <Address size="full" value={data?.proposer} />, { border: true })}
        {renderRow('Epoch', <NumberFormat value={data?.epoch} />, { border: true })}
        {renderRow('Round', <NumberFormat value={data?.round} />, { border: true })}
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
          { border: true }
        )}

        {renderRow('Fees', <AmountFormat symbol={undefined} postfix="APT 🔥" value={data?.gas_fees} />, {
          border: true,
        })}
        {data && (
          <SeeMore>
            {renderRow('ID', <BlockHash as="span" value={data?.hash} size="full" />, { border: true })}
            {renderRow('Failed Proposers', data?.failed_proposers?.length, { border: true })}
            {renderRow('Validators', <BlockVotesBitvec id={data?.height} />, { border: true })}
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
          </SeeMore>
        )}
      </Box>
    </Wrapper>
  )
}
