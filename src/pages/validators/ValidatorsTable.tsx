import { Address } from 'components/Address'
import { createColumnHelper } from '@tanstack/react-table'
import { AmountFormat } from 'components/AmountFormat'
import { Box, InlineBox } from 'components/container'
import { Dot } from 'components/Dot'
import { DataTable } from 'components/table'
import { css } from '@emotion/react'
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { Icon } from 'components/Icon'
import { vars } from 'theme/theme.css'
import { NumberFormat } from 'components/NumberFormat'
import { Tooltip } from 'components/Tooltip'

const helper = createColumnHelper<any>()

const dotBg = {
  active: '#3b82f6',
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
  helper.accessor('blocks', {
    meta: {
      nowrap: true,
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
          <Icon
            as={CheckIcon}
            css={css`
              color: ${vars.text.success};
              margin-right: 4px;
              height: 14px;
              width: 14px;
            `}
          />
          <NumberFormat value={info.row.original?.successful_proposals_count} />
          <Icon
            as={CloseIcon}
            css={css`
              margin-left: 16px;
              margin-right: 4px;
              color: ${vars.text.error};
              height: 14px;
              width: 14px;
            `}
          />
          <NumberFormat value={info.row.original?.failed_proposals_count} />
        </InlineBox>
      </Tooltip>
    ),
  }),
]

export const ValidatorsTable = ({ data }: { data?: any }) => {
  return <DataTable dataSource={data} columns={columns} />
}
