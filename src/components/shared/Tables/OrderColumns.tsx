import { Column } from "react-table";
import { IUser } from "../../../types/user";

export interface OrderDataType {
  _id: string;
  user: IUser;
  status: string;
  itemsQty: number;
  total: number;
  createdAt: Date;
  paidAt: Date;
  actions: any;
  deliveredAt?: Date;
  totalPrice: number;
  paymentInfo?: {
    type: string;
  };
}

export const orderColumns: Column<OrderDataType>[] = [
  {
    Header: "Order Id",
    accessor: (data) => data._id.slice(0, 10),
  },
  {
    Header: "Customer Name",
    accessor: (data) => (
      <div className="flex flex-col flex-1 1300px:flex-row items-center">
        <img
          src={
            data.user?.avatar
              ? data.user?.avatar.url
              : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
          }
          alt={data?.user?.fullName}
          className="w-8 h-8 mr-2 rounded-full hidden 1300px:block object-cover"
        />
        <span>{data?.user?.fullName}</span>
      </div>
    ),
  },
  {
    Header: "Customer Email",
    accessor: (data) => data?.user?.email,
  },
  // {
  //   Header: "Items Qty",
  //   accessor: "count",
  // },
  {
    Header: "Total Price",
    accessor: "totalPrice",
    Cell: ({ value }) => <span className="p-2">₹. {value.toFixed(0)}</span>,
  },
  {
    Header: "Status",
    accessor: (data) => (
      <div>
        {data.status === "delivered" ? (
          <p className="text-[green]">{data?.status}</p>
        ) : (
          <p className="text-[red]">{data?.status}</p>
        )}
      </div>
    ),
  },
  {
    Header: "Order Date",
    accessor: "createdAt",
    Cell: ({ cell }) => (
      <span>{new Date(cell.value).toLocaleDateString()}</span>
    ),
  },
  {
    Header: "Deliver On",
    accessor: "paidAt",
    Cell: ({ cell, row }) => {
      const orderDate = new Date(cell?.value);
      const { status } = row.original;

      if (status === "Processing") {
        const newDate = new Date(orderDate.setDate(orderDate.getDate() + 7));
        return <span>{newDate.toLocaleDateString()}</span>;
      } else {
        return (
          <span>
            {row.original?.deliveredAt
              ? new Date(row.original?.deliveredAt).toLocaleDateString()
              : "N/A"}
          </span>
        );
      }
    },
  },
  {
    Header: "Payment Info",
    accessor: (data) => (
      <span
        className={`${
          data?.paymentInfo?.type === "Cash On Delivery"
            ? "text-[red]"
            : "text-emerald-500"
        }`}
      >
        {data?.paymentInfo && data?.paymentInfo?.type === "Cash On Delivery"
          ? "C.O.D"
          : "PAID"}
      </span>
    ),
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];
