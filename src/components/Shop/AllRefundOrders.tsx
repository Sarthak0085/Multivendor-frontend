import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllOrdersBySellerQuery } from "../../redux/features/orders/orderApi";
import { IOrder } from "../../types/order";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { OrderDataType, orderColumns } from "../shared/Tables/OrderColumns";

// interface DataType {
//   _id: string;
//   user: IUser;
//   status: string;
//   itemsQty: number;
//   total: number;
//   createdAt: Date;
//   paidAt: Date;
//   actions: any;
//   deliveredAt?: Date;
//   paymentInfo?: {
//     type: string;
//   };
// }

// const columns: Column<DataType>[] = [
//   {
//     Header: "Order Id",
//     accessor: (data) => data._id.slice(0, 10),
//   },
//   {
//     Header: "Customer Name",
//     accessor: (data) => (
//       <div className="flex flex-col flex-1 1300px:flex-row items-center">
//         <img
//           src={
//             data.user?.avatar
//               ? data.user?.avatar.url
//               : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
//           }
//           alt={data?.user?.fullName}
//           className="w-8 h-8 mr-2 rounded-full hidden 1300px:block object-cover"
//         />
//         <span>{data?.user?.fullName}</span>
//       </div>
//     ),
//   },
//   {
//     Header: "Customer Email",
//     accessor: (data) => data?.user?.email,
//   },
//   {
//     Header: "Status",
//     accessor: (data) => (
//       <div>
//         {data.status === "delivered" ? (
//           <p className="text-[green]">{data?.status}</p>
//         ) : (
//           <p className="text-[red]">{data?.status}</p>
//         )}
//       </div>
//     ),
//   },
//   {
//     Header: "Order Date",
//     accessor: "createdAt",
//     Cell: ({ cell }) => (
//       <span>{new Date(cell.value).toLocaleDateString()}</span>
//     ),
//   },
//   {
//     Header: "Deliver On",
//     accessor: "paidAt",
//     Cell: ({ cell, row }) => {
//       const orderDate = new Date(cell?.value);
//       const { status } = row.original;

//       if (status === "Processing") {
//         const newDate = new Date(orderDate.setDate(orderDate.getDate() + 7));
//         return <span>{newDate.toLocaleDateString()}</span>;
//       } else {
//         return (
//           <span>
//             {row.original?.deliveredAt
//               ? row.original?.deliveredAt.toLocaleDateString()
//               : "N/A"}
//           </span>
//         );
//       }
//     },
//   },
//   {
//     Header: "Payment Info",
//     accessor: (data) => (
//       <span
//         className={`${
//           data?.paymentInfo?.type === "Cash On Delivery"
//             ? "text-[red]"
//             : "text-emerald-500"
//         }`}
//       >
//         {data?.paymentInfo && data?.paymentInfo?.type === "Cash On Delivery"
//           ? "C.O.D"
//           : "PAID"}
//       </span>
//     ),
//   },
//   {
//     Header: "Actions",
//     accessor: "actions",
//     Cell: ({ row }) => (
//       <div className="flex items-center justify-center space-x-2">
//         <Link to={`/order/${row.original?._id}`}>
//           <FaArrowRight
//             title="Order Details"
//             size={22}
//             className="text-blue-500"
//           />
//         </Link>
//       </div>
//     ),
//   },
// ];

const AllOrders = () => {
  const { seller } = useSelector((state: any) => state.auth);

  const { data, isLoading } = useGetAllOrdersBySellerQuery(seller?._id, {});

  console.log("Order", data);

  const refundOrders = data?.orders?.filter(
    (item: IOrder) =>
      item.status === "Refund Success" || item.status === "Processing Refund"
  );

  console.log("data:", refundOrders);

  const TableComponent = TableHOC<OrderDataType>(
    orderColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <Link to={`/order/${row.original?._id}`}>
                <FaArrowRight
                  title="Order Details"
                  size={22}
                  className="text-blue-500"
                />
              </Link>
            </div>
          ),
        };
      } else {
        return column;
      }
    }),
    refundOrders,
    "All Refunds Orders",
    refundOrders > 10 ? true : false
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-3 mt-6 min-h-[400px] bg-slate-50 overflow-x-hidden">
          {refundOrders && refundOrders.length !== 0 ? (
            <TableComponent />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-2 text-red-500">
                No Refund Requests 😊
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                No one has requested any refunds for your products yet.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                If your customers encounter any issues with their orders, please
                try to resolve.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Alternatively, customers can send a direct message to you
                regarding your products.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                We're here to assist you and address any concerns your customers
                may have.
              </p>
              <Link
                to="/support"
                className="text-blue-500 flex items-center justify-center gap-1 font-semibold hover:underline text-lg"
              >
                Contact Support
                <FaArrowRight title="Contact Support" />
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
