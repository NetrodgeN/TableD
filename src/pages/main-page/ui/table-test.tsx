import { useCallback, useEffect, useRef } from "react";

import { Column, Table } from "@tanstack/react-table";
// TODO: нужно его отредактировать. Сама спецификация должна быть чем-то обширным, с множеством полей и картинкой?
export interface Specification {
  id?: string;
  title?: string;
}
export interface Content {
  id?: string;
  specification?: Specification;
  title?: string;
}

export interface Car {
  // TODO: определились, он не должен быть массивом, это объект
  content?: Content;
  id: string;
  subRows?: Car[];
  title: string;
}

export const fakeData: Car[] = [
  {
    content: {
      id: "1",
      title: "Описание?",
      specification: {
        id: "2",
        title: "Краткое описание",
      },
    },
    id: "123",
    subRows: [
      {
        id: "666",
        title: "AUDI",
        subRows: [
          {
            id: "669",
            title: "A3",
          },
          {
            id: "670",
            title: "A7",
          },
        ],
      },
      {
        id: "667",
        title: "SEAT",
      },
      {
        id: "668",
        title: "Bugatti",
      },
      {
        id: "671",
        title: "Ducatti",
      },
    ],
    title: "VOLKSWAGEN AUTO GROUP",
  },
  {
    id: "9909",
    subRows: [
      {
        content: {
          id: "1",
          specification: {
            id: "2",
            title: "Another Value",
          },
          title: "Another Cont",
        },

        id: "99",
        subRows: [
          {
            id: "991",
            title: "omg, what?",
          },
        ],
        title: "qwerqewr",
      },
    ],
    title: "12341234",
  },
  {
    id: "22",
    title: "Пустышка",
  },
];

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Оберните этим функцию функцию, чтобы временно пропустить сброс нумерации страниц.
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

/**
 * можно ли сделать в tanstack-table react одну колонку только с одной строкой,
 * даже если строк 10. Допустим мы нажимаем на вторую строку,
 * то во второй колонке заполняется контент посвящённый второй строке
 * Если нажали на третью строку, то во второй колонке только контент третьей строки.
 *
 * Да, в tanstack-table можно реализовать такую функциональность.
 * Вам нужно будет создать две колонки: одну для списка строк и другую для отображения контента,
 * связанного с выбранной строкой.
 *
 * Вот пример, как это можно сделать:
 *
 *     Создайте состояние для хранения выбранной строки.
 *     Обработайте событие клика на строку, чтобы обновить состояние.
 *     Отобразите контент в отдельной колонке на основе выбранной строки.
 *
 * Вот пример кода:
 * В этом примере:
 *
 *     Мы создаем таблицу с двумя колонками: одна для названия и другая для деталей.
 *     При клике на строку обновляется состояние selectedRowIndex, что позволяет отобразить
 *     детали только для выбранной строки.
 *     Вторая колонка будет отображать контент только для выбранной строки, а для
 *     остальных строк будет пусто.
 *
 * Не забудьте заменить name и details на соответствующие поля вашего объекта данных.
 * Да, вы можете изменить обработчик клика так, чтобы он срабатывал при нажатии на
 * ячейку, а не на всю строку. Для этого просто переместите обработчик клика в ячейку, а не в строку. Вот обновленный пример кода:
 * Изменения в коде:
 *
 *     Обработчик клика: Теперь обработчик onClick добавляется только для первой колонки (индекс 0). Для остальных колонок он будет undefined, что означает, что клик не будет обрабатываться.
 *
 *     Курсор: Стиль курсора также изменяется в зависимости от индекса колонки. Для первой колонки курсор будет указателем, а для остальных — обычным.
 *
 * Теперь клик будет срабатывать только на ячейках первой колонки, и вы сможете отображать детали, связанные с выбранной строкой, только при клике на ячейку в этой колонке.
 */
// const MyTable = ({ data }) => {
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//
//   const columns = [
//     {
//       header: 'Название',
//       accessorKey: 'name', // замените на ваше поле
//     },
//     {
//       header: 'Детали',
//       accessorKey: 'details', // замените на ваше поле
//       cell: ({ row }) => {
//         return selectedRowIndex === row.index ? (
//           <div>{row.original.details}</div> // отображаем детали выбранной строки
//         ) : null;
//       },
//     },
//   ];
//
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });
//
//   return (
//     <div>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(column => (
//                 <th key={column.id}>{column.columnDef.header}</th> // используем columnDef.header для заголовка
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell, index) => (
//                 <td
//                   key={cell.id}
//                   onClick={index === 0 ? () => setSelectedRowIndex(row.index) : undefined} // обработчик клика только для первой колонки
//                   style={{ cursor: index === 0 ? 'pointer' : 'default' }} // курсор только для первой колонки
//                 >
//                   {cell.getValue()} {/* используем getValue для получения значения ячейки */}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         {selectedRowIndex !== null && (
//           <div>
//             <h3>Детали выбранной строки:</h3>
//             <p>{data[selectedRowIndex].details}</p> {/* отображаем детали выбранной строки */}
//           </div>
//         )}
//       </div>
//     </

// export const MyTable = () => {
//   const [data, setData] = useState<Car[]>(fakeData);
//
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//
//   const columns = [
//     {
//       header: "Название",
//       accessorKey: "name", // замените на ваше поле
//     },
//     {
//       header: "Детали",
//       accessorKey: "details", // замените на ваше поле
//       cell: ({ row }) => {
//         return selectedRowIndex === row.index ? (
//           <div>{row.original.details}</div> // отображаем детали выбранной строки
//         ) : null;
//       },
//     },
//   ];
//
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });
//
//   return (
//     <div>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <th colSpan={header.colSpan} key={header.id}>
//                     {header.isPlaceholder ? null : (
//                       <div>
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                         {header.column.getCanFilter() ? (
//                           <div>
//                             <Filter column={header.column} table={table} />
//                           </div>
//                         ) : null}
//                       </div>
//                     )}
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr
//               key={row.id}
//               onClick={() => setSelectedRowIndex(row.index)} // обновляем выбранную строку
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>{cell.getValue()}</td> // используем getValue для получения значения ячейки
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         {selectedRowIndex !== null && (
//           <div>
//             <h3>Детали выбранной строки:</h3>
//             <p>{data[selectedRowIndex].content}</p>{" "}
//             {/* отображаем детали выбранной строки */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        className="w-24 border shadow rounded"
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder="Min"
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
      />
      <input
        className="w-24 border shadow rounded"
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder="Max"
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
      />
    </div>
  ) : (
    <input
      className="w-36 border shadow rounded"
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}
