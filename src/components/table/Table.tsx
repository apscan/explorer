import styled from '@emotion/styled'
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, Row, useReactTable } from '@tanstack/react-table'
import { Fragment, memo } from 'react'
import { Box, BoxProps } from '../container/Box'
import { Table, Tbody, Td, Th, Thead, Tr } from './TableComponents'

interface DataTableProps<TData extends object = {}> extends BoxProps {
  dataSource?: TData[]
  columns: ColumnDef<any, any>[]
  columnVisibility?: Record<string, boolean>
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement
  getRowCanExpand?: (row: Row<TData>) => boolean
}

const StyledWrapper = styled(Box)`
  position: relative;
`

const rowModel = getCoreRowModel()
const expandedRowModel = getExpandedRowModel()

export const DataTable = memo(
  ({ dataSource, columns, columnVisibility, renderSubComponent, getRowCanExpand, ...props }: DataTableProps) => {
    const table = useReactTable({
      data: dataSource || [],
      columns: columns,
      state: {
        columnVisibility,
      },
      getCoreRowModel: rowModel as any,
      getExpandedRowModel: expandedRowModel as any,
      getRowCanExpand: getRowCanExpand as any,
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
              const tr = (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                  })}
                </Tr>
              )

              const canExpand = row.getCanExpand()

              return renderSubComponent && canExpand ? (
                <Fragment key={row.id}>
                  {tr}
                  {row.getIsExpanded() && (
                    <Tr>
                      <Td colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</Td>
                    </Tr>
                  )}
                </Fragment>
              ) : (
                tr
              )
            })}
          </Tbody>
        </Table>
      </StyledWrapper>
    )
  }
)
