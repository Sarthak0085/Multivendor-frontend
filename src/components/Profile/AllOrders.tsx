import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineTrackChanges } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllOrdersByUserQuery } from "../../redux/features/orders/orderApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { OrderDataType, orderColumns } from "../shared/Tables/OrderColumns";

const AllOrders = () => {
  const { user } = useSelector((state: any) => state.auth);

  const { data, isLoading } = useGetAllOrdersByUserQuery(user?._id, {});

  const TableComponent = TableHOC<OrderDataType>(
    orderColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <Link
                to={`/profile/${user?._id}/track/order/${row.original?._id}`}
                aria-label="Track your Order"
              >
                <MdOutlineTrackChanges
                  aria-label="Track your Order"
                  title="Track your order"
                  size={20}
                  className="text-[orange]"
                />
              </Link>
              <Link
                to={`/profile/${user?._id}/order/${row.original?._id}`}
                aria-label="See Order Details"
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
    data?.orders,
    `${user.fullName}'s All Orders`,
    data?.orders?.length > 4 ? true : false
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full mx-5 pt-3 min-h-[400px] px-5 py-4 bg-white overflow-x-hidden">
      {data?.orders && data?.orders.length !== 0 ? (
        <div className="w-full flex justify-center">
          <TableComponent />
        </div>
      ) : (
        <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-2 text-red-500">
            No Orders Yet 😔
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            You haven't placed any orders yet.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Explore our products and find something you like!
          </p>
          <p className="text-lg text-gray-600 mb-2">
            We have a variety of items waiting for you.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Start shopping today to discover great deals.
          </p>
          <Link
            to="/products"
            className="text-blue-500 flex items-center justify-center gap-1 font-semibold hover:underline text-lg"
          >
            Explore Products
            <FaArrowRight title="Explore Products" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
