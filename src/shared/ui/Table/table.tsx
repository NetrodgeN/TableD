import { useState } from "react";

import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  Row,
  RowData,
  TableMeta,
  useReactTable,
} from "@tanstack/react-table";

import classNames from "classnames/bind";

import styles from "./table.module.scss";

const cn = classNames.bind(styles);

interface TableProps<TData, TValue = any> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getSubRows?: (originalRow: TData, index: number) => undefined | TData[];
  metaData?: TableMeta<TData>;
  autoResetPageIndex?: boolean;
  uniqContent?: string;
  getRowId?: (
    originalRow: TData,
    index: number,
    parent?: Row<TData> | undefined,
  ) => string;
}

export const Table = <TData extends RowData>({
  columns,
  data,
  getSubRows,
  metaData,
  autoResetPageIndex,
  uniqContent,
  getRowId,
}: TableProps<TData>) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    autoResetPageIndex,
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSubRows,
    meta: metaData,
    onExpandedChange: setExpanded,
    getRowId,
    state: {
      expanded,
    },
  });

  return (
    <div
      className="p-2"
      style={{
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <table className={cn("table")}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th colSpan={header.colSpan} key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {/* {header.column.getCanFilter() ? ( */}
                        {/*  <div> */}
                        {/*    <Filter column={header.column} table={table} /> */}
                        {/*  </div> */}
                        {/* ) : null} */}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ width: 100, height: 300, backgroundColor: "aqua" }}>
        {uniqContent}
      </div>
      {/* <TableFooter table={table} /> */}
      {/* <div>{table.getRowModel().rows.length} Rows</div> */}
      {/* <label>Expanded State:</label> */}
      {/* <pre>{JSON.stringify(expanded, null, 2)}</pre> */}
      {/* <label>Row Selection State:</label> */}
      {/* <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre> */}
    </div>
  );
};
