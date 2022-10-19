import { css } from '@emotion/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useTransactionEventsQuery } from 'api'
import { Address } from 'components/Address'
import { CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { DateTime } from 'components/DateTime'
import { JsonView } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { SwitchDateFormat } from 'components/SwitchDateFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { usePageSize } from 'state/application/hooks'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('address', {
    header: 'Address',
    cell: (info) => <Address size="short" value={info.getValue()} />,
  }),
  helper.accessor('time_microseconds', {
    header: () => <SwitchDateFormat />,
    cell: (info) => <DateTime value={info.getValue()} />,
  }),
  helper.accessor('creation_number', {
    header: 'Creation Number',
    cell: (info) => <NumberFormat value={info.getValue()} />,
  }),
  helper.accessor('sequence_number', {
    header: 'Sequence Number',
    cell: (info) => <NumberFormat value={info.getValue()} />,
  }),
  helper.accessor('type', {
    header: 'Type',
    cell: (info) => (
      <Box
        css={css`
          word-break: break-all;
        `}
      >
        {info.getValue()}
      </Box>
    ),
  }),

  helper.accessor('data', {
    header: 'Data',
    cell: (info) => <JsonView collapsed={0} src={info.getValue()} />,
  }),
]

export const Events = ({ id }: { id: any }) => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {} } = useTransactionEventsQuery(
    {
      id: id!,
      start,
      pageSize,
    },
    {
      skip: id == null,
    }
  )

  const pageProps = useRangePagination(start, setStart, pageSize, page)

  return (
    <Box padding="12px">
      <CardHead variant="tabletab">
        <CardHeadStats variant="tabletab">
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={page?.count} /> events
        </CardHeadStats>
        {pageProps?.total && pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable dataSource={data} columns={columns} />
      {pageProps?.total && pageProps.total > 1 && (
        <CardFooter variant="tabletab">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </Box>
  )
}
