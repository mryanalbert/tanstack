import { createColumnHelper } from "@tanstack/react-table";

// export const columns = [
//   {
//     accessorKey: "id",
//     header: "ID",
//   },
//   {
//     accessorKey: "first_name",
//     header: "First name",
//   },
//   {
//     accessorKey: "last_name",
//     header: "Last name",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "gender",
//     header: "Gender",
//   },
//   {
//     accessorKey: "ip_address",
//     header: "IP Address",
//   },
//   {
//     accessorKey: "phone",
//     header: "Phone",
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//   },
// ];

const columnHelper = createColumnHelper();

// video2
export const columnDef = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  {
    accessorFn: (row) => `${row.first_name}`,
    header: "First ame",
  },
  {
    accessorKey: "last_name",
    header: "Last name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

// video2
export const columnDefWithCellMerge = [
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Name",
  },
];

export const columnDefWithGrouping = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  {
    header: "Name",
    columns: [
      {
        accessorFn: (row) => `${row.first_name}`,
        header: "First name",
      },
      {
        accessorKey: "last_name",
        header: "Last name",
      },
    ],
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "date",
    header: "Date",
    // cell: ({ getValue }) => moment(new Date(getValue())).format("MMM Do YY"),
  },
];
