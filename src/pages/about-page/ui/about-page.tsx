import { useState } from "react";

import { defaultColumns } from "@/pages/main-page/ui/default-columns.tsx";
import { Car, fakeData } from "@/pages/main-page/ui/table-test.tsx";
import { Table } from "@/shared/ui/Table/table.tsx";
import { useSkipper } from "@/shared/ui/Table/use-skipper.tsx";
import { RowData, TableMeta } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    setSpecification: (value: string) => void;
    addSubRow: (parentId: string | number, newSubRow: Car) => void;
  }
}

export const AboutPage = () => {
  const [data, setData] = useState<Car[]>(fakeData);
  const [uniqContent, setUniqContent] = useState("");

  const getSubRows = (row: Car) => row?.subRows;
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const metaData = {
    updateData: (rowIndex, columnId, value) => {
      // Пропустить сброс индекса страницы до следующего повторного рендеринга
      skipAutoResetPageIndex();
      setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex]!,
              [columnId]: value,
            };
          }
          return row;
        }),
      );
    },
    setSpecification: (value) => {
      setUniqContent(value);
    },
    addSubRow: (parentId, newSubRow) => {
      setData((old) => {
        const newData = [...old];
        const addSubRowRecursive = (rows: Car[]): boolean => {
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].id === parentId) {
              if (!rows[i].subRows) rows[i].subRows = [];
              rows[i].subRows.push(newSubRow);

              return true;
            }
            if (rows[i].subRows && addSubRowRecursive(rows[i].subRows)) {
              return true;
            }
          }
          return false;
        };
        addSubRowRecursive(newData);

        return newData;
      });
    },
  } as TableMeta<Car[]>;

  const getRowId = (row: Car) => row.id;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          width: 900,
        }}
      >
        <Table
          columns={defaultColumns}
          data={data}
          getSubRows={getSubRows}
          metaData={metaData}
          autoResetPageIndex={autoResetPageIndex}
          uniqContent={uniqContent}
          getRowId={getRowId}
        />
      </div>
    </div>
  );
};

AboutPage.displayName = "AboutPage";
