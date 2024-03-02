import { Cell, Column } from "react-table";

export interface ShopDataType {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  address: string;
  phoneNumber: string;
  isBlock: boolean;
  actions: any;
}

const shopColumns: Column<ShopDataType>[] = [
  {
    Header: "Shop Id",
    accessor: (data) => data._id.slice(0, 10),
  },
  {
    Header: "Shop Name",
    accessor: "name",
    Cell: ({ row }) => (
      <div className="flex flex-col flex-1 lg:flex-row items-center">
        <img
          src={
            row.original?.image
              ? row.original?.image
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
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone Number",
    accessor: "phoneNumber",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Status",
    accessor: "isBlock",
    Cell: ({ cell }: { cell: Cell<ShopDataType> }) => (
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
    Header: "Joined At",
    accessor: "createdAt",
    Cell: ({ cell }: { cell: Cell<ShopDataType> }) => (
      <span>{new Date(cell.value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Actions",
    accessor: "actions",
    // Cell: ({ row }) => (
    //   <div className="flex items-center justify-center space-x-2">
    //     <Link to={`/shop/preview/${row.original?._id}`}>
    //       <AiOutlineEye size={22} className="text-blue-500" />
    //     </Link>
    //     <button>
    //       <AiOutlineEdit size={22} className="text-green-500" />
    //     </button>
    //     <button>
    //       <AiOutlineDelete size={22} className="text-red-500" />
    //     </button>
    //   </div>
    // ),
  },
];

export default shopColumns;
