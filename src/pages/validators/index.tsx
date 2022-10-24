import { useValidatorsQuery } from 'api/validator'
import { Address } from 'components/Address'
import { Container } from 'components/container'

import { createColumnHelper } from '@tanstack/react-table'
import { AmountFormat } from 'components/AmountFormat'
import { Card, CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box, InlineBox } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { Dot } from 'components/Dot'
import { NumberFormat } from 'components/NumberFormat'
import { PageTitle } from 'components/PageTitle'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { Tooltip } from 'components/Tooltip'
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { useAppStats } from 'state/api/hooks'
import { usePageSize } from 'state/application/hooks'
import { vars } from 'theme/theme.css'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('validator_index', {
    header: 'Type',
    cell: (info) => (
      <Box>
        {info.row.original.validator_status} #{info.row.original.validator_index}
      </Box>
    ),
  }),
  helper.accessor('address', {
    header: 'Owner',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('operator_address', {
    header: 'Operator',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('voting_power', {
    header: 'Voting Power (APT)',
    cell: (info) => (
      <InlineBox alignItems="center">
        <AmountFormat postfix={false} maximumFractionDigits={0} value={info.row.original?.voting_power} />
        <Tooltip
          label={
            <>
              <AmountFormat prefix="Active: " value={info.row.original?.voting_power_detail?.active} />
              <AmountFormat
                prefix="Pending Inactive: "
                value={info.row.original?.voting_power_detail?.pending_inactive}
              />
            </>
          }
        >
          <InlineBox color={vars.text.secondary} fontSize="80%" marginLeft="4px" alignItems="center">
            (
            <Dot marginLeft="4px" background="#3b82f6" />
            <AmountFormat
              postfix={false}
              maximumFractionDigits={0}
              value={info.row.original?.voting_power_detail?.active}
            />
            <Dot marginLeft="8px" background="#bfdbfe" />
            <AmountFormat
              postfix={false}
              marginRight="4px"
              maximumFractionDigits={0}
              value={info.row.original?.voting_power_detail?.pending_inactive}
            />
            )
          </InlineBox>
        </Tooltip>
      </InlineBox>
    ),
  }),
  helper.accessor('non_voting_power', {
    header: 'Non-voting Power (APT)',
    cell: (info) => (
      <InlineBox alignItems="center">
        <AmountFormat postfix={false} maximumFractionDigits={0} value={info.row.original?.non_voting_power} />
        <Tooltip
          label={
            <>
              <AmountFormat prefix="Pending Active: " value={info.row.original?.voting_power_detail?.pending_active} />
              <AmountFormat prefix="Inactive: " value={info.row.original?.voting_power_detail?.inactive} />
            </>
          }
        >
          <InlineBox color={vars.text.secondary} fontSize="80%" marginLeft="4px" alignItems="center">
            (
            <Dot marginLeft="4px" background="#44403c" />
            <AmountFormat
              postfix={false}
              maximumFractionDigits={0}
              value={info.row.original?.voting_power_detail?.pending_active}
            />
            <Dot marginLeft="8px" background="#a8a29e" />
            <AmountFormat
              postfix={false}
              marginRight="4px"
              maximumFractionDigits={0}
              value={info.row.original?.voting_power_detail?.inactive}
            />
            )
          </InlineBox>
        </Tooltip>
      </InlineBox>
    ),
  }),
  helper.accessor('rewards_stats', {
    header: 'Reward (APT)',
    cell: (info) => <AmountFormat postfix={false} maximumFractionDigits={3} value={info.getValue()?.total_rewards} />,
  }),
]

export const Validators = () => {
  const stats = useAppStats()
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {} } = useValidatorsQuery({
    start,
    pageSize,
  })

  const pageProps = useRangePagination(start, setStart, pageSize, {
    min: page?.min,
    max: page?.max,
    count: stats?.validators_count,
  })

  return (
    <Container>
      <DocumentTitle value="Aptos Validators | Apscan" />
      <PageTitle value="Validators" />
      <Card variant="table">
        <CardHead variant="table">
          <CardHeadStats variant="table">
            Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={stats?.validators_count} />{' '}
            validators
          </CardHeadStats>
          <Pagination {...pageProps} />
        </CardHead>
        <DataTable dataSource={data} columns={columns} />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      </Card>
    </Container>
  )
}
