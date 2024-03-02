import { Column } from "react-table";

export interface ProductDataType {
  _id: string;
  name: string;
  category: string;
  brand: string;
  images: any[];
  originalPrice: number;
  colors: string[];
  discountPrice: number;
  stock: number;
  createdAt: Date;
  sold_out: number;
  actions: any;
}

export const productColumns: Column<ProductDataType>[] = [
  {
    Header: "Product Id",
    accessor: "_id",
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => (
      <div className="flex flex-col flex-1 lg:flex-row items-center">
        <img
          src={row.original.images[0]?.url}
          alt={row.original.name}
          className="w-8 h-8 mr-2 rounded-full hidden 1250:block object-cover"
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Brand",
    accessor: "brand",
  },
  {
    Header: "Colors",
    accessor: "colors",
  },
  {
    Header: "Original Price",
    accessor: "originalPrice",
    Cell: ({ value }) => <span>₹. {value}</span>,
  },
  {
    Header: "Discount Price",
    accessor: "discountPrice",
    Cell: ({ value }) => <span>₹. {value}</span>,
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Sold",
    accessor: "sold_out",
  },
  {
    Header: "Created Date",
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
