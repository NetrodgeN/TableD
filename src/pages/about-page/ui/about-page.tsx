import { useState } from "react";

import { defaultColumns } from "@/pages/main-page/ui/default-columns.tsx";
import { Car, fakeData } from "@/pages/main-page/ui/table-test.tsx";
import { Table } from "@/shared/ui/table/table.tsx";
import { useSkipper } from "@/shared/ui/table/use-skipper.tsx";
import { Page } from "@/widgets";
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
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].id === parentId) {
              if (!rows[i].subRows) rows[i].subRows = [];
              rows?.[i]?.subRows?.push(newSubRow);

              return true;
            }
            const subrows = rows[i].subRows || [];
            if (rows[i].subRows && addSubRowRecursive(subrows)) {
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
    <Page>
      <div style={{ display: "flex", width: "100vh" }}>
        <Table
          style={{ flexGrow: 1 }}
          columns={defaultColumns}
          data={data}
          getSubRows={getSubRows}
          metaData={metaData}
          autoResetPageIndex={autoResetPageIndex}
          getRowId={getRowId}
        />
        <div style={{ flexGrow: 2 }}>{uniqContent} p[pipipi</div>
      </div>
    </Page>
  );
};

AboutPage.displayName = "AboutPage";
