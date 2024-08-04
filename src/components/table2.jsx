import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "../db/MOCK_DATA.json";
import { columnDef, columnDefWithGrouping } from "../db/columns";
import { useMemo, useState } from "react";

const Table2 = () => {
  const [sorting, setSorting] = useState([]);

  const finalData = useMemo(() => data, []);
  const finalColumnDef = useMemo(() => columnDef, []);

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  // console.log(tableInstance.getHeaderGroups());
  // console.log(tableInstance.getRowModel().rows);

  return (
    <table className="w-[1000px] border border-slate-800">
      <thead>
        {tableInstance.getHeaderGroups().map((headerEl) => (
          <tr key={headerEl.id}>
            {headerEl.headers.map((columnEl) => (
              <th
                key={columnEl.id}
                colSpan={columnEl.colSpan}
                className="p-2 text-white bg-gray-800"
                onClick={columnEl.column.getToggleSortingHandler()}
              >
                {columnEl.isPlaceholder
                  ? null
                  : flexRender(
                      columnEl.column.columnDef.header,
                      columnEl.getContext()
                    )}
                {/* CODE FOR UP AND DOWN SORTING */}
                {
                  { asc: " -UP", desc: " -DOWN" }[
                    columnEl.column.getIsSorted() ?? null
                  ]
                }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tableInstance.getRowModel().rows.map((rowEl) => (
          <tr key={rowEl.id}>
            {rowEl.getVisibleCells().map((cellEl) => (
              <td key={cellEl.id} className="border border-slate-800">
                {flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {/* <tfoot>
        {tableInstance.getHeaderGroups().map((footerEl) => (
          <tr key={footerEl.id}>
            {footerEl.headers.map((columnEl) => (
              <th
                key={columnEl.id}
                className="p-2 text-white bg-gray-800"
                colSpan={columnEl.colSpan}
              >
                {flexRender(
                  columnEl.column.columnDef.header,
                  columnEl.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot> */}
    </table>
  );
};
export default Table2;
