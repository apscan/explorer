import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Address } from 'components/Address'
import { AddressesTable } from 'components/AddressesTable'
import { AmountFormat } from 'components/AmountFormat'
import { BlockHeight } from 'components/block/BlockHeight'
import { Box, InlineBox } from 'components/container'
import { DateTime } from 'components/DateTime'
import { Divider } from 'components/Divider'
import { Hash } from 'components/Hash'
import { HashesTable } from 'components/HashesTable'
import { renderRow } from 'components/helpers'
import { JsonView } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { TxHash } from 'components/transaction/TxHash'
import { TxType } from 'components/transaction/TxType'
import { VmStatus } from 'components/VmStatus'
import { DateFormat } from 'state/application/slice'
// import { parseUserTransfer } from 'utils/parseUserTransfer'

// const renderUserTransfer = (data: any) => {
//   const transfer = parseUserTransfer(data.payload)

//   return (
//     <>
//       {renderRow('Receiver', <Address size="full" value={transfer?.receiver} />)}
//       {renderRow('Amount', <AmountFormat value={transfer?.amount} />)}
//     </>
//   )
// }

const renderUserTransactionSection = (data: any) => {
  const gasFee = BigInt(data?.gas_used || 0) * BigInt(data?.user_transaction_detail?.gas_unit_price || 0)

  const gasUsedPercentage = data?.user_transaction_detail
    ? Number(data?.gas_used) / Number(data?.user_transaction_detail?.max_gas_amount)
    : undefined

  return (
    <>
      <Divider />
      {/* {renderUserTransfer(data)} */}
      {renderRow('Sequence Number', <NumberFormat value={data?.user_transaction_detail?.sequence_number} />)}
      {renderRow(
        'Expiration Timestamp',
        <DateTime
          format={DateFormat.FULL}
          value={
            data?.user_transaction_detail?.expiration_timestamp_secs
              ? data.user_transaction_detail.expiration_timestamp_secs + '000000'
              : undefined
          }
        />
      )}
      {renderRow(
        'Max Gas & Gas Used',
        <InlineBox
          css={css`
            align-items: center;
          `}
        >
          <NumberFormat fallback="--" value={data?.user_transaction_detail?.max_gas_amount} />
          <Divider type="vertical" color="#8c98a4" margin="0 16px" />
          <NumberFormat fallback="--" value={data?.gas_used} />
          <InlineBox marginLeft="4px">
            (
            <NumberFormat maximumFractionDigits={1} fallback="--" type="percent" value={gasUsedPercentage} />)
          </InlineBox>
        </InlineBox>
      )}
      {renderRow(
        'Gas Fees & Gas Price',
        <InlineBox>
          <AmountFormat postfix=" APT 🔥" fallback="--" value={gasFee} />
          <InlineBox
            css={css`
              margin-left: 4px;
            `}
          >
            (
            <NumberFormat postfix=" Octa" fallback="--" value={data?.user_transaction_detail?.gas_unit_price} />)
          </InlineBox>
        </InlineBox>,
        { border: true }
      )}
      {renderRow(
        'Signature',
        <JsonView maxWidth="950px" withContainer src={data?.user_transaction_detail?.signature} />
      )}
      {renderRow('Payload', <JsonView maxWidth="950px" withContainer src={data?.payload} />)}
    </>
  )
}

const renderGenesisTransactionSection = (data: any) => {
  return (
    <>
      <Divider />
      {renderRow('Epoch', null)}
      {renderRow('Payload', <JsonView maxWidth="950px" withContainer src={data?.payload} />)}
    </>
  )
}

const renderBlockMetadataTransactionSection = (data: any) => {
  return (
    <>
      <Divider />
      {renderRow('ID', <Hash fallback="--" value={data?.block_metadata_transaction_detail?.id} size="full" />)}
      {renderRow('Epoch', <NumberFormat fallback="--" value={data?.block_metadata_transaction_detail?.epoch} />)}
      {renderRow('Round', <NumberFormat fallback="--" value={data?.block_metadata_transaction_detail?.round} />)}
      {renderRow(
        'Proposer',
        <AddressesTable
          key="Proposer"
          value={[
            {
              content: <Address size="full" fallback="--" value={data?.block_metadata_transaction_detail?.proposer} />,
              label: <VmStatus withPadding={false} withBg={false} value="Executed successfully" />,
            },
            ...(data?.block_metadata_transaction_detail?.failed_proposers?.map((failedProposer: any) => ({
              content: <Address size="full" fallback="-" value={failedProposer} />,
              label: <VmStatus withPadding={false} withBg={false} value="" failedText="Failed" />,
            })) || []),
          ]}
        />,
        { border: false }
      )}
      {renderRow(
        'Previous Block Votes Bitvec',
        data?.block_metadata_transaction_detail?.previous_block_votes_bitvec
          ? JSON.stringify(data?.block_metadata_transaction_detail?.previous_block_votes_bitvec)
          : '-'
      )}
    </>
  )
}

const renderMore = (data: any) => {
  return (
    <>
      {renderRow(
        'More Hashes',
        <HashesTable
          value={[
            { label: 'Event Root Hash', content: <Hash value={data?.event_root_hash} size="full" /> },
            { label: 'Accumulator Root Hash', content: <Hash value={data?.accumulator_root_hash} size="full" /> },
            { label: 'State Change Hash', content: <Hash value={data?.state_change_hash} size="full" /> },
            data?.type === 'state_checkpoint_transaction' &&
              ({
                label: 'State Checkpoint Hash',
                content: <Hash value={data?.state_checkpoint_hash} size="full" />,
              } as any),
          ]}
        />
      )}
    </>
  )
}

const Wrapper = styled(Box)`
  padding: 0 12px;
`

export const Overview = ({ data }: { data: any | undefined }) => {
  return (
    <Wrapper>
      <Box>
        {renderRow('Block', <BlockHeight value={data?.block_height} />)}
        {renderRow('Hash', <TxHash as="span" value={data?.hash} size="full" />)}
        {renderRow('Timestamp', <DateTime format={DateFormat.FULL} value={data?.time_microseconds} />)}
        {renderRow(
          <InlineBox
            css={css`
              line-height: 28px;
            `}
          >
            Status
          </InlineBox>,
          <VmStatus value={data?.vm_status} />
        )}

        {renderRow(<InlineBox>VM Status</InlineBox>, data?.vm_status && <Box>{data?.vm_status}</Box>)}

        {renderRow(
          'Sender',
          data?.sender ? <Address size="full" value={data?.sender} /> : data?.type && <TxType value={data?.type} />
        )}

        {data?.type === 'user_transaction' && renderUserTransactionSection(data)}
        {data?.type === 'genesis_transaction' && renderGenesisTransactionSection(data)}
        {data?.type === 'block_metadata_transaction' && renderBlockMetadataTransactionSection(data)}
        {data && (
          <>
            <Divider margin="8px 0" />
            {renderMore(data)}
          </>
        )}
      </Box>
    </Wrapper>
  )
}
