import { createColumnHelper } from '@tanstack/react-table'
import { useAccountModulesQuery } from 'api'
import { CardFooter, CardHead, CardHeadStats } from 'components/Card'
import { Box } from 'components/container'
import { DataTable } from 'components/table'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import { Hash } from 'components/Hash'
import { JsonView } from 'components/JsonView'
import { NumberFormat } from 'components/NumberFormat'
import { useRangePagination } from 'hooks/useRangePagination'
import { useState } from 'react'
import { usePageSize } from 'state/application/hooks'

const helper = createColumnHelper<any>()

const columns = [
  helper.accessor('move_module_name', {
    header: 'Name',
    cell: (info) => <Box>{info.getValue()}</Box>,
  }),
  helper.accessor('move_module_abi.structs', {
    header: 'Friends',
    cell: (info) => <JsonView collapsed={0} src={info.getValue()} />,
  }),
  helper.accessor('move_module_abi.friends', {
    header: 'Structs',
    cell: (info) => <JsonView collapsed={0} src={info.getValue()} />,
  }),
  helper.accessor('move_module_abi.exposed_functions', {
    header: 'Exposed Functions',
    cell: (info) => <JsonView collapsed={0} src={info.getValue()} />,
  }),
  helper.accessor('move_module_abi', {
    header: 'ABI',
    cell: (info) => <JsonView enableClipboard={true} collapsed={0} src={info.getValue()} />,
  }),
  helper.accessor('move_module_bytecode', {
    header: 'Bytecode',
    cell: (info) => <Hash copyable={true} value={info.getValue()} size="short" />,
  }),
  helper.accessor('Source_Code', {
    header: 'Source Code',
    cell: (info) => <NumberFormat value={info.getValue()} />,
  }),
]

export const Modules = ({ id }: { id: any }) => {
  const [pageSize, setPageSize] = usePageSize()
  const [start, setStart] = useState<number | undefined>(0)

  const { data: { data, page } = {} } = useAccountModulesQuery(
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
          Total of <NumberFormat fallback="--" marginLeft="4px" marginRight="4px" value={page?.count} /> modules
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
