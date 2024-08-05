import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "../db/MOCK_DATA.json";
import { columnDefWithFilter } from "../db/columns";
import { useMemo, useState } from "react";
import Filter from "./Filter";

const Table3 = () => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const finalData = useMemo(() => data, []);
  const finalColumnDef = useMemo(() => columnDefWithFilter, []);

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      columnFilters,
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  // console.log(tableInstance.getHeaderGroups());
  // console.log(tableInstance.getRowModel().rows);

  return (
    <>
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <hr />
      <table className="w-[1000px] border border-slate-800">
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl.id}>
              {headerEl.headers.map((columnEl) => (
                <th
                  key={columnEl.id}
                  colSpan={columnEl.colSpan}
                  className="p-2 py-0 text-white bg-gray-800"
                  onClick={(e) => {
                    if (
                      e.target.tagName !== "INPUT" &&
                      e.target.tagName !== "BUTTON"
                    ) {
                      columnEl.column.getToggleSortingHandler()(e);
                    }
                  }}
                >
                  {columnEl.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        columnEl.column.columnDef.header,
                        columnEl.getContext()
                      )}
                      {/* CODE FOR UP AND DOWN SORTING */}
                      {
                        { asc: " -UP", desc: " -DOWN" }[
                          columnEl.column.getIsSorted() ?? null
                        ]
                      }
                      {columnEl.column.getCanFilter() ? (
                        <div>
                          <Filter
                            column={columnEl.column}
                            table={tableInstance}
                          />
                        </div>
                      ) : null}
                    </>
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
                  {flexRender(
                    cellEl.column.columnDef.cell,
                    cellEl.getContext()
                  )}
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
    </>
  );
};
export default Table3;
