import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "../db/columns";
import data from "../db/MOCK_DATA.json";

const BasicTable = () => {
  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
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
              >
                {flexRender(
                  columnEl.column.columnDef.header,
                  columnEl.getContext()
                )}
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
export default BasicTable;
