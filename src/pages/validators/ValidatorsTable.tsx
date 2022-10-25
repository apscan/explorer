import { Address } from 'components/Address'
import { createColumnHelper } from '@tanstack/react-table'
import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox } from 'components/container'
import { Dot } from 'components/Dot'
import { DataTable } from 'components/table'
import { css } from '@emotion/react'

const helper = createColumnHelper<any>()

const dotBg = {
  active: '#5090F7',
  pending_inactive: '#8BB5F9',
  pending_active: '#777169',
  inactive: '#a8a29e',
}

const columns = [
  helper.accessor('validator_index', {
    meta: {
      nowrap: true,
    },
    header: 'Type',
    cell: (info) => (
      <InlineBox
        css={css`
          text-transform: capitalize;
          align-items: center;
        `}
      >
        <Dot marginRight="4px" background={(dotBg as any)[info.row.original?.validator_status as any]} />
        {info.row.original.validator_status} #{info.row.original.validator_index}
      </InlineBox>
    ),
  }),
  helper.accessor('address', {
    meta: {
      nowrap: true,
    },
    header: 'Validator',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('operator_address', {
    meta: {
      nowrap: true,
    },
    header: 'Operator',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('voting_power_detail.active', {
    meta: {
      nowrap: true,
    },
    header: 'Active (APT)',
    cell: (info) => (
      <InlineBox alignItems="center">
        <Dot marginRight="4px" background={dotBg.active} />
        <AmountFormat fixed={3} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
  }),
  helper.accessor('voting_power_detail.pending_inactive', {
    meta: {
      nowrap: true,
    },
    header: 'Pending Inactive',
    cell: (info) => (
      <InlineBox alignItems="center">
        <Dot marginRight="4px" background={dotBg.pending_inactive} />
        <AmountFormat fixed={3} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
  }),
  helper.accessor('voting_power_detail.pending_active', {
    meta: {
      nowrap: true,
    },
    header: 'Pending Active',
    cell: (info) => (
      <InlineBox alignItems="center">
        <Dot marginRight="4px" background={dotBg.pending_active} />
        <AmountFormat fixed={3} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
  }),
  helper.accessor('voting_power_detail.inactive', {
    meta: {
      nowrap: true,
    },
    header: 'Inactive',
    cell: (info) => (
      <InlineBox alignItems="center">
        <Dot marginRight="4px" background={dotBg.inactive} />
        <AmountFormat fixed={3} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
  }),
  helper.accessor('voting_power', {
    meta: {
      nowrap: true,
    },
    header: 'Voting Power',
    cell: (info) => (
      <InlineBox alignItems="center">
        <AmountFormat fixed={0} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
  }),
]

export const ValidatorsTable = ({ data }: { data?: any }) => {
  return <DataTable dataSource={data} columns={columns} />
}
