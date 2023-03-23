import { createColumnHelper } from '@tanstack/react-table'
import { useProposalVotesQuery } from 'api'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { DateTime } from 'components/DateTime'
import { Hash } from 'components/Hash'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { Version } from 'components/transaction/Version'
import { usePageSize } from 'hooks/usePageSize'
import { useRangePagination } from 'hooks/useRangePagination'
import { ReactComponent as AgreeIcon } from 'assets/icons/agree.svg'
import { ReactComponent as DisagreeIcon } from 'assets/icons/disagree.svg'
import { Box } from 'components/container'
import { Icon } from 'components/Icon'
import { css } from '@emotion/react'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('transaction_version', {
    meta: {
      nowrap: true,
    },
    header: 'Tx Version',
    cell: (info) => <Version value={info.getValue()} />,
  }),
  helper.accessor('data.voter', {
    meta: {
      nowrap: true,
    },
    header: 'Voter',
    cell: (info) =>
      info.getValue() ? (
        <Address size="short" value={info.getValue()} />
      ) : (
        <Address size="short" value={info.row.original.data.proposer} />
      ),
  }),
  helper.accessor('time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateFormat />,
    cell: (info) => <DateTime value={info.getValue() / 1000} />,
  }),
  helper.accessor('data.stake_pool', {
    meta: {
      nowrap: true,
    },
    header: 'Stake Pool Owner',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('data.num_votes', {
    meta: {
      nowrap: true,
    },
    header: 'Vote',
    cell: (info) =>
      info.getValue() ? (
        <Box>
          <Icon
            css={css`
              height: 14px;
              width: 14px;
              margin-right: 4px;
              transform: translateY(2px);
            `}
            as={info.row.original.data.should_pass === false ? DisagreeIcon : AgreeIcon}
          />
          <AmountFormat maximumFractionDigits={0} postfix={false} value={info.getValue()} />
        </Box>
      ) : (
        '-'
      ),
  }),
]

export const Votes = ({ id, count = 0, detail }: { id: any; count?: number; detail: any }) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useProposalVotesQuery(
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
        <TableStat count={count} variant="tabletab" object={<>voters</>} />
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
