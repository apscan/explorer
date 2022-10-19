import { createColumnHelper } from '@tanstack/react-table'
import { useAccountResourcesQuery } from 'api'
import { CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { Hash } from 'components/Hash'
import { JsonView } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { usePageSize } from 'state/application/hooks'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('move_resource_address', {
    header: 'Module Address',
    cell: (info) => <Hash value={info.getValue()} size="short" />,
  }),
  helper.accessor('move_resource_module', {
    header: 'Module Name',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),
  helper.accessor('move_resource_name', {
    header: 'Resource Name',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),
  helper.accessor('move_resource_data', {
    header: 'Data',
    cell: (info) => <JsonView collapsed={0} src={info.getValue()} />,
  }),
]

export const Resources = ({ id }: { id: any }) => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {} } = useAccountResourcesQuery(
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
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={page?.count} /> resources
        </CardHeadStats>
        {pageProps?.total && pageProps.total > 1 && <Pagination {...pageProps} />}
      </CardHead>
      <DataTable dataSource={data} columns={columns} />
      {pageProps?.total && pageProps.total > 1 && (
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      )}
    </Box>
  )
}
