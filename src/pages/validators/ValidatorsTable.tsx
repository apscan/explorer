import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox } from 'components/container'
import { GeoLocation } from 'components/GeoLocation'
import { Hash } from 'components/Hash'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { Tooltip } from 'components/Tooltip'
import { vars } from 'theme/theme.css'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('validator_status', {
    meta: {
      nowrap: true,
    },
    header: 'Type',
    cell: (info) => (
      <Box
        css={css`
          text-transform: capitalize;
        `}
      >
        {info.getValue()}
      </Box>
    ),
  }),
  helper.accessor('validator_index', {
    meta: {
      nowrap: true,
    },
    header: 'Index',
    cell: (info) => <Box>{`#${info.getValue()}`}</Box>,
  }),
  helper.accessor('address', {
    meta: {
      nowrap: true,
    },
    header: 'Validator',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('network_addresses', {
    meta: {
      nowrap: true,
    },
    header: 'Network Address',
    cell: (info) => (
      <Hash tooltip={info.getValue()} ellipsis value={info.getValue()?.match(/^\/(ip4|dns)\/(.*?)\//)?.[2]} />
    ),
  }),
  helper.accessor('location', {
    meta: {
      nowrap: true,
    },
    header: 'Location',
    cell: (info) => <GeoLocation value={info.row.original.validator_index} />,
  }),
  helper.accessor(
    (data) => {
      return BigInt(data.voting_power_detail.pending_active) + BigInt(data.voting_power_detail.inactive)
    },
    {
      meta: {
        nowrap: true,
      },
      header: 'Joining Power',
      cell: (info) => (
        <InlineBox alignItems="center">
          {/* <Dot marginRight="4px" background={dotBg.pending_active} /> */}
          <AmountFormat fixed={1} maximumFractionDigits={1} value={info.getValue()} />
        </InlineBox>
      ),
    }
  ),
  helper.accessor(
    (data) => {
      return BigInt(data.voting_power_detail.active) + BigInt(data.voting_power_detail.pending_inactive)
    },
    {
      meta: {
        nowrap: true,
      },
      header: 'Voting Power',
      cell: (info) => (
        <InlineBox alignItems="center">
          <AmountFormat fixed={1} maximumFractionDigits={1} value={info.getValue()} />
        </InlineBox>
      ),
    }
  ),
  helper.accessor('blocks', {
    meta: {
      nowrap: true,
      width: '45px',
    },
    header: 'Blocks',
    cell: (info) => (
      <Tooltip
        label={
          <Box>
            <Box>
              Proposed: <NumberFormat value={info.row.original?.successful_proposals_count} />
            </Box>
            <Box>
              Failed: <NumberFormat value={info.row.original?.failed_proposals_count} />
            </Box>
          </Box>
        }
      >
        <InlineBox alignItems="center">
          <NumberFormat value={info.row.original?.successful_proposals_count} />

          {info.row.original?.failed_proposals_count && info.row.original?.failed_proposals_count !== '0' && (
            <InlineBox
              css={css`
                margin-left: 4px;
                color: ${vars.text.error};
              `}
            >
              (
              <NumberFormat value={info.row.original?.failed_proposals_count} />)
            </InlineBox>
          )}
        </InlineBox>
      </Tooltip>
    ),
  }),
]

export const ValidatorsTable = ({ data }: { data?: any }) => {
  return <DataTable dataSource={data} columns={columns} />
}
