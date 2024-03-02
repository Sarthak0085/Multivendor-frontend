import { Column } from "react-table";

export interface WithdrawDataType {
  _id: string;
  shopId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  status: string;
  image: {
    url: string;
  };
  actions: any;
}

export const withdrawColumns: Column<WithdrawDataType>[] = [
  {
    Header: "Withdraw Id",
    accessor: (data) => data?._id.slice(0, 10),
  },
  {
    Header: "Shop Id",
    accessor: (data) => data?.shopId.slice(0, 10),
  },
  {
    Header: "Shop Name",
    accessor: "name",
    Cell: ({ row }) => (
      <div className="flex flex-col flex-1 lg:flex-row items-center">
        <img
          src={
            row.original?.image
              ? row.original?.image?.url
              : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
          }
          alt={row.original.name}
          className="w-8 h-8 mr-2 rounded-full hidden 1300px:block object-cover"
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    Header: "Withdraw Amount",
    accessor: "amount",
    Cell: ({ value }) => <span>₹. {value}</span>,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ cell }) => (
      <span
        className={`${
          cell.value !== "succeeded" ? "text-[red]" : "text-emerald-500"
        } font-medium `}
      >
        {cell.value === "succeeded" ? "SUCCEEDED" : "PENDING"}
      </span>
    ),
  },
  {
    Header: "Created Date",
    accessor: "createdAt",
    Cell: ({ cell }) => (
      <span>{new Date(cell.value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Updated Date",
    accessor: "updatedAt",
    Cell: ({ cell }) => (
      <span>{new Date(cell.value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];
