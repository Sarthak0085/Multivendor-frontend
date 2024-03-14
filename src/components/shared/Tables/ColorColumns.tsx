import { Column } from "react-table";

export interface ColorDataType {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  actions: any;
}

export const colorColumns: Column<ColorDataType>[] = [
  {
    Header: "Color Id",
    accessor: (data) => data._id.slice(0, 10),
  },
  {
    Header: "Color",
    accessor: "title",
    Cell: ({ value }) => (
      <div className="flex items-center justify-center">
        <button
          className={`w-6 h-6 rounded-full bg-[${value}] dark:bg-gray-200 mr-2`}
          style={{ backgroundColor: `${value}` }}
        ></button>
        {value}
      </div>
    ),
  },
  {
    Header: "Color Date",
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
