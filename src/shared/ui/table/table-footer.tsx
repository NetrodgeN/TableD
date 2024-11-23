import { RowData, Table } from "@tanstack/react-table";

export const TableFooter = <TData extends RowData>({
  table,
}: {
  table: Table<TData>;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
};

TableFooter.displayName = "TableFooter";
