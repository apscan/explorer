import { createColumnHelper } from '@tanstack/react-table'
import { Card, CardFooter, CardHead } from 'components/Card'
import { Box, Container } from 'components/container'
import { DocumentTitle } from 'components/DocumentTitle'
import { Link } from 'components/link'
import { PageTitle } from 'components/PageTitle'
import { DataTable } from 'components/table'

import { css } from '@emotion/react'
import { useModulesQuery } from 'api'
import { CopyButton } from 'components/CopyButton'
import { JsonView, JsonViewEllipsis } from 'components/JsonView'
import { ExpandButton } from 'components/table/ExpandButton'
import { Pagination } from 'components/table/Pagination'
import { ShowRecords } from 'components/table/ShowRecords'
import TableStat from 'components/TotalStat'
import { usePageSize } from 'hooks/usePageSize'
import { useRangePagination } from 'hooks/useRangePagination'
import { formatBytes } from 'utils/formatBytes'
import { truncated } from 'utils/truncated'
import { ModuleLink } from 'components/ModuleLink'

const helper = createColumnHelper<any>()

const renderSubComponent = ({ row }: { row: any }) => {
  return <JsonView src={row.original?.abi_info?.abi} withContainer />
}

const getRowCanExpand = (row: any) => {
  return Boolean(row?.original?.abi_info?.abi)
}

const columns = [
  helper.accessor('move_module_name', {
    meta: {
      nowrap: true,
    },
    header: () => 'Name',
    cell: (info) => <ModuleLink address={info.row.original.move_module_address} module={info.getValue()} />,
  }),
  helper.accessor('address_modules_count', {
    meta: {
      nowrap: true,
    },
    header: () => 'Modules by Address',
    cell: (info) => info.getValue(),
  }),
  helper.accessor('historical_changes', {
    meta: {
      nowrap: true,
    },
    header: () => 'Historical Changes',
    cell: (info) => (
      <Link
        to={`/module/${info.row.original?.move_module_address}?module=${info.row.original?.move_module_name}&tab=historical`}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  helper.accessor('abi_info.friends_count', {
    meta: {
      nowrap: true,
    },
    header: () => 'Friends',
    cell: (info) => info.getValue(),
  }),
  helper.accessor('abi_info.structs_count', {
    meta: {
      nowrap: true,
    },
    header: () => 'Structs',
    cell: (info) => info.getValue(),
  }),
  helper.accessor('abi_info.exposed_functions_count', {
    meta: {
      nowrap: true,
    },
    header: () => 'Exposed Functions',
    cell: (info) => info.getValue(),
  }),
  helper.accessor('abi_info.move_module_bytecode_length', {
    meta: {
      nowrap: true,
    },
    header: () => 'Bytecode',
    cell: (info) => {
      return (
        <Box>
          {formatBytes(info.getValue())}
          {/* <CopyButton text={info.row.original?.move_module_bytecode} /> */}
        </Box>
      )
    },
  }),
  helper.accessor('abi_info.abi', {
    header: 'ABI',
    cell: (info) => <JsonViewEllipsis src={info.getValue()} />,
  }),
  helper.accessor('expand', {
    meta: {
      nowrap: true,
      isExpandButton: true,
    },
    header: (header) => {
      return (
        <ExpandButton
          expandAll
          expanded={header.table.getIsSomeRowsExpanded()}
          onClick={() => header.table.toggleAllRowsExpanded()}
        />
      )
    },
    cell: (info) => {
      return <ExpandButton expanded={info.row.getIsExpanded()} onClick={() => info.row.toggleExpanded()} />
    },
  }),
]

export const Modules = () => {
  const [pageSize, setPageSize, page, setPage] = usePageSize()

  const { data: { data, page: { count } = { count: undefined } } = {}, isLoading } = useModulesQuery({
    start: (page - 1) * pageSize,
    pageSize,
  })

  console.log(data)

  const pageProps = useRangePagination(page, pageSize, count, setPage)

  return (
    <Container>
      <DocumentTitle value="Aptos Modules | Apscan" />
      <PageTitle value="Modules" />
      <Card variant="table" isLoading={isLoading}>
        <CardHead variant="table">
          <TableStat variant="table" object="proposals" count={count} />
          <Pagination {...pageProps} />
        </CardHead>
        <DataTable
          renderSubComponent={renderSubComponent}
          getRowCanExpand={getRowCanExpand}
          dataSource={data}
          columns={columns}
        />
        <CardFooter variant="table">
          <ShowRecords pageSize={pageSize} onSelect={setPageSize} />
          <Pagination {...pageProps} />
        </CardFooter>
      </Card>
    </Container>
  )
}
