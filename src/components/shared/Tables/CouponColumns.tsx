import { Column } from "react-table";

export interface CouponDataType {
  _id: string;
  name: string;
  value: number;
  createdAt: Date;
  actions: any;
  selectedProduct: string;
}

export const couponColumns: Column<CouponDataType>[] = [
  {
    Header: "Coupon Id",
    accessor: "_id",
  },
  {
    Header: "Coupon Code",
    accessor: "name",
  },
  {
    Header: "Value",
    accessor: "value",
    Cell: ({ value }) => <span>{value} %</span>,
  },
  {
    Header: "Product Name",
    accessor: "selectedProduct",
  },
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ cell }) => (
      <span>{new Date(cell?.value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];
