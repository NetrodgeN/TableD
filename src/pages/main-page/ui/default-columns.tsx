import { useEffect, useState } from "react";

import { useModal } from "@/app/providers/modal-provider";
import { Button } from "@/shared/ui/buttons";
import { BUTTON_SIZE } from "@/shared/ui/buttons/button.tsx";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { AddTitleModal } from "./add-title-modal.tsx";
import { Car } from "./table-test.tsx";

const EMPTY_CELL = " ";

const CellWithAddButton = (cell: CellContext<Car, unknown>) => {
  const { openModal } = useModal();
  const { column, getValue, row, table } = cell;
  const initialValue = getValue();

  const [value, setValue] = useState(initialValue as string);
  const onBlur = () => {
    table.options.meta?.updateData(`${row.id}`, column.id, value);
  };
  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue as string);
  }, [initialValue]);

  // const addSubRowHandler = () => {
  //
  //   // table.options.meta?.updateData()
  //   //TODO: придумать логику добавления саброу в таблицу. Скорее всего должна открыться модалка и нужно её заполнить
  //   // openModal(<AddTitleModal initialValue={value} />);
  //   console.log("Должен создаваться еще один саброу");
  // };

  const addSubRowHandler = () => {
    const onSubmit = ({
      title,
      contentTitle,
      nestedTitle,
    }: {
      title: string;
      contentTitle: string;
      nestedTitle?: string;
    }) => {
      const newSubRow: Car = {
        id: `${row.id}-${Date.now()}`, // Генерируем уникальный ID
        title,
        content: contentTitle
          ? {
              id: `${row.id}-${Date.now()}`,
              title: contentTitle,
              specification: nestedTitle
                ? {
                    id: "a",
                    title: nestedTitle,
                  }
                : {},
            }
          : {},
      };
      table.options.meta?.addSubRow(row.id, newSubRow);
    };

    openModal(<AddTitleModal onSubmit={onSubmit} />);
  };
  const addRowHandler = () => {};
  return (
    <div
      style={{
        paddingLeft: `${row.depth * 2}rem`,
      }}
    >
      {row.getCanExpand() ? (
        <Button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
            size: BUTTON_SIZE.SMALL,
          }}
          icon={row.getIsExpanded() ? "👇" : "👉"}
        />
      ) : (
        "🔵"
      )}{" "}
      {/* <input */}
      {/*  onBlur={onBlur} */}
      {/*  onChange={(e) => setValue(e.target.value)} */}
      {/*  value={value as string} */}
      {/* /> */}
      {value}
      <Button
        style={{ float: "right" }}
        onClick={addSubRowHandler}
        size={BUTTON_SIZE.SMALL}
        icon="⬇️"
      />
    </div>
  );
};

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
    cell: CellWithAddButton,
    footer: (props) => props.column.id,
    header: () => <span>Title</span>,
    id: "title",
  }),

  columnHelper.accessor((row) => row.content, {
    cell: ViewSpecification,
    footer: (props) => props.column.id,
    header: () => <span>Content</span>,
    id: "Content",
  }),
];
