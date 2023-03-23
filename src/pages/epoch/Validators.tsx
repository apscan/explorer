import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useEpochValidatorsQuery } from 'api/epoch'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { Box } from 'components/container'
import { GeoLocation } from 'components/GeoLocation'
import { Hash } from 'components/Hash'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { Tooltip } from 'components/Tooltip'
import TableStat from 'components/TotalStat'
import { usePageSize } from 'hooks/usePageSize'
import { useRangePagination } from 'hooks/useRangePagination'
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
    cell: (info) => <>#{info.getValue()}</>,
  }),
  helper.accessor('address', {
    meta: {
      nowrap: true,
    },
    header: 'Validator',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('network', {
    meta: {
      nowrap: true,
    },
    header: 'Network Address',
    cell: (info) => (
      <Hash tooltip={info.getValue()} ellipsis value={info.getValue()?.match(/^\/(ip4|dns)\/(.*?)\//)?.[2]} />
    ),
  }),
  helper.accessor('geo', {
    meta: {
      nowrap: true,
    },
    header: 'Location',
    cell: (info) => <GeoLocation value={info.row.original.network_addresses} />,
  }),
  helper.accessor('voting_power', {
    meta: {
      nowrap: true,
    },
    header: 'Voting Power',
    cell: (info) => <AmountFormat value={info.getValue()} />,
  }),
  helper.accessor('proposal_status', {
    meta: {
      nowrap: true,
    },
    header: 'Blocks',
    cell: (info) => (
      <Tooltip
        label={
          <Box>
            Proposed: {info.getValue()?.successful_proposals}, Failed: {info.getValue()?.failed_proposals}
          </Box>
        }
      >
        <Box>
          {info.getValue()?.successful_proposals}
          {info.getValue()?.failed_proposals !== '0' && info.getValue()?.failed_proposals ? (
            <>
              (
              <Box as="span" color={vars.text.error}>
                {info.getValue()?.failed_proposals}
              </Box>
              )
            </>
          ) : null}
        </Box>
      </Tooltip>
    ),
  }),
  helper.accessor('rewards', {
    meta: {
      nowrap: true,
    },
    header: 'Reward (APT)',
    cell: (info) => <AmountFormat postfix={false} value={info.getValue()?.rewards_amount} />,
  }),
]

export const Validators = ({ id }: { id: any }) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data, page: { count } = { count: undefined } } = {}, isLoading } = useEpochValidatorsQuery(
    {
      id: id!,
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      skip: id == null,
    }
  )

  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <CardBody isLoading={isLoading || id == null}>
      <CardHead variant="tabletab">
        <TableStat count={count} variant="tabletab" object="validators" />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable page={pageProps.page} dataSource={data} columns={columns} />
      {pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
