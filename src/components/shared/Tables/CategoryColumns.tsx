import { Column } from "react-table";

export interface CategoryDataType {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  actions: any;
  image: {
    public_id: string;
    url: string;
  };
}

export const categoryColumns: Column<CategoryDataType>[] = [
  {
    Header: "Category Id",
    accessor: (data) => data._id.slice(0, 10),
  },
  {
    Header: "Category Name",
    accessor: "title",
  },
  {
    Header: "Category Image",
    accessor: "image",
    Cell: ({ value }) => (
      <div className="flex items-center justify-center">
        <img
          src={value?.url}
          alt={value?.url}
          className="w-[50px] h-[40px] object-cover rounded-md"
        />
      </div>
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
    // Cell: ({ row }) => (
    //   <div className="flex items-center justify-center space-x-2">
    //     <button
    //       onClick={() => {
    //         setId(row.original._id);
    //         setMode("update");
    //         categoryRefetch();
    //       }}
    //     >
    //       <AiOutlineEdit size={22} className="text-green-500" />
    //     </button>
    //     <button
    //       onClick={() => {
    //         setId(row.original._id);
    //         setConfirm(true);
    //       }}
    //     >
    //       <AiOutlineDelete size={22} className="text-red-500" />
    //     </button>
    //   </div>
    // ),
  },
];
