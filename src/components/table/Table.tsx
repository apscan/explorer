import styled from '@emotion/styled'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { memo } from 'react'
import { Box, BoxProps } from '../container/Box'
import { Table, Tbody, Td, Th, Thead, Tr } from './TableComponents'

interface DataTableProps<TData extends object = {}> extends BoxProps {
  dataSource?: TData[]
  columns: ColumnDef<any, any>[]
  columnVisibility?: Record<string, boolean>
}

// const pageSizes = [
//   { value: 10, name: '10' },
//   { value: 20, name: '20' },
//   { value: 50, name: '50' },
//   { value: 100, name: '100' },
// ]

const StyledWrapper = styled(Box)`
  position: relative;
`

const rowModel = getCoreRowModel()

export const DataTable = memo(({ dataSource, columns, columnVisibility, ...props }: DataTableProps) => {
  const table = useReactTable({
    data: dataSource || [],
    columns: columns,
    state: {
      columnVisibility,
    },
    getCoreRowModel: rowModel as any,
  })

  return (
    <StyledWrapper {...props}>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </StyledWrapper>
  )
})
