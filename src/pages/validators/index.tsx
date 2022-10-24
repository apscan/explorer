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
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { useAppStats } from 'state/api/hooks'
import { usePageSize } from 'state/application/hooks'

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
        <Dot marginRight="4px" background="#3b82f6" />
        <AmountFormat fixed={3} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
  }),
  helper.accessor('voting_power_detail.pending_inactive', {
    header: 'Pending Inactive',
    cell: (info) => (
      <InlineBox alignItems="center">
        <Dot marginRight="4px" background="#8BB5F9" />
        <AmountFormat fixed={3} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
  }),
  helper.accessor('voting_power_detail.pending_active', {
    header: 'Pending Active',
    cell: (info) => (
      <InlineBox alignItems="center">
        <Dot marginRight="4px" background="#777169" />
        <AmountFormat fixed={3} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
  }),
  helper.accessor('voting_power_detail.inactive', {
    header: 'Inactive',
    cell: (info) => (
      <InlineBox alignItems="center">
        <Dot marginRight="4px" background="#a8a29e" />
        <AmountFormat fixed={3} postfix={false} maximumFractionDigits={0} value={info.getValue()} />
      </InlineBox>
    ),
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
