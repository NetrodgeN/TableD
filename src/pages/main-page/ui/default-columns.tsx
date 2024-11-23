import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { CellWithSubRow } from "./cell-with-sub-row";
import { MenuCell } from "./menu-cell.tsx";
import { Car } from "./table-test.tsx";

const EMPTY_CELL = " ";

const ViewSpecification = (cell: CellContext<Car, unknown>) => {
  const {
    row: {
      original: { content },
    },
    table,
  } = cell;
  const value = content?.title || EMPTY_CELL;
  const specification = content?.specification?.title;
  const isEmpty = value === EMPTY_CELL;

  const onClickCell = () => {
    if (!isEmpty) {
      table.options.meta?.setSpecification(specification || EMPTY_CELL);
    }
  };

  return (
    <div style={{ cursor: isEmpty ? "text" : "pointer" }} onClick={onClickCell}>
      {value}
    </div>
  );
};

const columnHelper = createColumnHelper<Car>();

export const defaultColumns = [
  columnHelper.accessor((row) => row.title, {
    header: () => <span style={{ paddingLeft: "58px" }}>Заголовок</span>,
    cell: CellWithSubRow,
    footer: (props) => props.column.id,
    id: "title",
    size: 518,
  }),

  columnHelper.accessor((row) => row.content, {
    header: () => <span style={{ paddingLeft: "10px" }}>Content</span>,
    cell: ViewSpecification,
    footer: (props) => props.column.id,
    id: "Content",
    size: 518,
  }),
  columnHelper.accessor((row) => row.content, {
    header: () => "",
    cell: MenuCell,
    footer: (props) => props.column.id,
    id: "System",
    size: 50,
  }),
];
