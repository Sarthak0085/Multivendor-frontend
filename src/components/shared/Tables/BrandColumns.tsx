import { Column } from "react-table";

export interface BrandDataType {
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

export const brandColumns: Column<BrandDataType>[] = [
  {
    Header: "Brand Id",
    accessor: (data) => data._id.slice(0, 10),
  },
  {
    Header: "Brand Name",
    accessor: "title",
  },
  {
    Header: "Brand Image",
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
  },
];
