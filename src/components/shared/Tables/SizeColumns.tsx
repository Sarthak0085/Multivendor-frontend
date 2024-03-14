import { Column } from "react-table";

export interface SizeDataType {
  _id: string;
  title: string;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
  actions: any;
}

export const sizeColumns: Column<SizeDataType>[] = [
  {
    Header: "Size Id",
    accessor: (data) => data._id.slice(0, 10),
  },
  {
    Header: "Size Name",
    accessor: "title",
  },
  {
    Header: "Size Symbol",
    accessor: "symbol",
  },
  {
    Header: "Size Date",
    accessor: "createdAt",
    Cell: ({ cell }) => (
      <span>{new Date(cell.value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];
