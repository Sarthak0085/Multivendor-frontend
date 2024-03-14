import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineTrackChanges } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllOrdersByUserQuery } from "../../redux/features/orders/orderApi";
import { IOrder } from "../../types/order";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { OrderDataType, orderColumns } from "../shared/Tables/OrderColumns";

const AllRefundOrders = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetAllOrdersByUserQuery(user?._id, {});
  const orderData = data?.orders.filter(
    (item: IOrder) =>
      item.status === "Refund Success" || item.status === "Processing Refund"
  );

  // console.log(data);

  const TableComponent = TableHOC<OrderDataType>(
    orderColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <Link
                aria-label="Track your Order"
                to={`/profile/${user?._id}/track/order/${row.original?._id}`}
              >
                <MdOutlineTrackChanges
                  aria-label="Track your Order"
                  title="Track your order"
                  size={20}
                  className="text-[orange]"
                />
              </Link>
              <Link
                aria-label="See Order Details"
                to={`/profile/${user?._id}/order/${row.original?._id}`}
              >
                <FaArrowRight
                  aria-label="See Order Details"
                  title="See Order Details"
                  size={20}
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
    orderData,
    `${user.fullName}'s Refund Orders`,
    orderData?.length > 10 ? true : false
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full mx-8 pt-3 mt-6 min-h-[400px] bg-white overflow-x-hidden">
      {orderData && orderData.length !== 0 ? (
        <TableComponent />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-2 text-red-500">
            No Refund Requests 😔
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            You haven't requested any refunds yet.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            If you have any issues with your orders, please contact us on email
          </p>
          <p className="text-lg text-gray-600 mb-2">
            or you can send direct message to seller regarding their product.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            We're here to assist you with any concerns you may have.
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
  );
};

export default AllRefundOrders;
