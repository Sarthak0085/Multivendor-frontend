import { Cell, Column, Row } from "react-table";

export interface UserDataType {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  role: string;
  phoneNumber: string;
  isBlock: false;
  addresses?: [
    {
      address1: string;
      address2: string;
      city: string;
      country: string;
    }
  ];
  createdAt: Date;
  actions: any;
}

const userColumns: Column<UserDataType>[] = [
  {
    Header: "User Id",
    accessor: (data) => data?._id.slice(0, 10),
  },
  {
    Header: "Name",
    accessor: "fullName",
    Cell: ({ row }: { row: Row<UserDataType> }) => (
      <div className="flex flex-col flex-1 lg:flex-row items-center">
        <img
          src={
            row.original?.image
              ? row.original?.image
              : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
          }
          alt={row.original.fullName}
          className="w-8 h-8 mr-2 rounded-full hidden 1300px:block object-cover"
        />
        <span>{row.original.fullName}</span>
      </div>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone Number",
    accessor: "phoneNumber",
  },
  {
    Header: "Place",
    accessor: "addresses",
    Cell: ({ row }: { row: Row<UserDataType> }) => (
      <div className="flex flex-col flex-1 lg:flex-row items-center">
        {row.original?.addresses && row.original.addresses.length > 0
          ? row.original.addresses[0]?.city
          : "N/A"}{" "}
        /{" "}
        {row.original?.addresses &&
          row.original.addresses.length > 0 &&
          row.original.addresses[0]?.country}
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "isBlock",
    Cell: ({ cell }: { cell: Cell<UserDataType> }) => (
      <span
        className={`${
          cell.value === true ? "text-[red]" : "text-emerald-500"
        } font-medium `}
      >
        {cell.value === true ? "BLOCKED" : "ACTIVE"}
      </span>
    ),
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Joined At",
    accessor: "createdAt",
    Cell: ({ cell }: { cell: Cell<UserDataType> }) => (
      <span>{new Date(cell.value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];

export default userColumns;
