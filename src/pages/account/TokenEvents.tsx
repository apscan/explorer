import { css } from '@emotion/react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Address } from 'components/Address'
import { AmountFormat } from 'components/AmountFormat'
import { CardBody, CardFooter, CardHead } from 'components/Card'
import { Box, InlineBox } from 'components/container'
import { DateTime } from 'components/DateTime'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { Version } from 'components/transaction/Version'
import { useRangePagination } from 'hooks/useRangePagination'
import { usePageSize } from 'hooks/usePageSize'
import { parseUserTransfer } from 'utils/parseUserTransfer'
import { Link } from 'components/link'
import { TypeParam } from 'components/TypeParam'
import TableStat from 'components/TotalStat'
import { useAccountTokenEventsQuery } from 'api/token'

const helper = createColumnHelper<any>()

const isIn = (type: string) => type.indexOf('DepositEvent') > -1
const isOut = (type: string) => type.indexOf('WithdrawEvent') > -1

const parseType = (data: {
  address: string
  counter_party: {
    address: string
    data: { amount: string }
  } | null
  type: string
}) => {
  if (data.address === data.counter_party?.address) {
    return 'SELF'
  }

  if (isIn(data.type)) {
    return 'IN'
  }

  return 'OUT'
}

const columns: ColumnDef<any, any>[] = [
  helper.accessor('transaction_version', {
    header: 'Tx Version',
    meta: {
      nowrap: true,
    },
    cell: (info) => <Version value={info.getValue()} />,
  }),
  helper.accessor('time_microseconds', {
    meta: {
      nowrap: true,
    },
    header: () => <SwitchDateFormat />,
    cell: (info) => <DateTime value={info.getValue()} />,
  }),
  helper.accessor('type', {
    header: 'Event',
    meta: {
      nowrap: true,
    },
    cell: (info) => (
      <Box
        sx={{
          display: 'inline-flex',
          '> div': {
            maxWidth: '190px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
      >
        <TypeParam fallback="-" value={info.getValue()} />
      </Box>
    ),
  }),
  helper.accessor('sender', {
    meta: {
      nowrap: true,
    },
    header: 'Sender',
    cell: (info) => {
      const transferType = parseType(info.row.original)
      if (transferType === 'OUT' || transferType === 'SELF') {
        return <Address size="short" as="span" value={info.row.original?.address} />
      }
      if (!info.row.original?.counter_party) {
        return '-'
      }
      return <Address size="short" value={info.row.original?.counter_party.address} />
    },
  }),
  helper.accessor('in_out', {
    meta: {
      nowrap: true,
    },
    header: '',
    cell: (info) => {
      const type = parseType(info.row.original)

      return (
        <InlineBox
          css={css`
            font-size: 12px;
            font-weight: 700;
            border-radius: 6px;
            user-select: none;
            width: 42px;
            justify-content: center;
            align-items: center;
            ${type === 'IN' &&
            css`
              background: rgba(0, 201, 167, 0.2);
              color: #02977e;
            `}
            ${type === 'OUT' &&
            css`
              background: rgba(219, 154, 4, 0.2);
              color: #b47d00;
            `}
              ${type === 'SELF' &&
            css`
              color: #77838f;
              background-color: rgba(119, 131, 143, 0.1);
            `}
              padding: 2px 8px;
          `}
        >
          {type}
        </InlineBox>
      )
    },
  }),
  helper.accessor(
    (data: any) => {
      return parseUserTransfer(data?.payload)?.receiver
    },
    {
      meta: {
        nowrap: true,
      },
      header: 'Receiver',
      cell: (info) => {
        const transferType = parseType(info.row.original)
        if (transferType === 'IN' || transferType === 'SELF') {
          return <Address size="short" as="span" value={info.row.original?.address} />
        }

        if (!info.row.original?.counter_party) {
          return '-'
        }

        return <Address size="short" value={info.row.original?.counter_party.address} />
      },
    }
  ),
  helper.accessor('tokenname', {
    meta: {
      nowrap: true,
    },
    header: 'Token',
    cell: (info) => {
      return (
        <Link to={`/token/${info.row.original?.data?.id?.token_data_id.name}`}>
          {info.row.original?.data?.id?.token_data_id.name}
        </Link>
      )
    },
  }),
  helper.accessor('amount', {
    meta: {
      nowrap: true,
    },
    header: 'Amount',
    cell: (info) => {
      return <AmountFormat minimumFractionDigits={0} decimals={0} postfix=" " value={info.row.original?.data?.amount} />
    },
  }),
]

export const TokenEvents = ({ id, count }: { id: string; count: number }) => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()
  const { data: { data } = {}, isLoading } = useAccountTokenEventsQuery(
    {
      id,
      start: (page - 1) * pageSize,
      pageSize,
    },
    {
      skip: !id || !count,
    }
  )
  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <CardBody isLoading={isLoading}>
      <CardHead variant="tabletab">
        <TableStat variant="tabletab" object="tokens" count={count} />
        {pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable
        sx={{
          '& > table td:nth-of-type(3)': {
            padding: '0px 10px',
            width: '200px',
          },
          '& > table td:nth-of-type(4)': {
            position: 'relative',
          },
          '& > table td:nth-of-type(5)': {
            padding: '0px 10px',
          },
          '& > table td:nth-of-type(6)': {
            position: 'relative',
          },
          '& > table td:nth-of-type(7)': {
            padding: '0px 10px',
          },
        }}
        dataSource={data}
        columns={columns}
      />
      {pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </CardBody>
  )
}
