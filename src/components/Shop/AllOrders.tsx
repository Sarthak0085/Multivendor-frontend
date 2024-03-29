import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllOrdersBySellerQuery } from "../../redux/features/orders/orderApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { OrderDataType, orderColumns } from "../shared/Tables/OrderColumns";

const AllOrders = () => {
  const { seller } = useSelector((state: any) => state.auth);
  // console.log("seller:", seller?._id);

  const { data, isLoading } = useGetAllOrdersBySellerQuery(seller?._id, {});

  // console.log("data:", data);

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
    data?.orders,
    `All ${seller?.name}'s Orders`,
    data?.orders.length > 10 ? true : false
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white overflow-x-hidden">
          {data?.orders && data?.orders?.length !== 0 ? (
            <TableComponent />
          ) : (
            <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-2 text-red-500">
                No Orders Yet 😔
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                You haven't received any orders{" "}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                You haven't received any orders yet.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Keep promoting your products to attract orders.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Consider optimizing your product listings for better visibility.
              </p>
              <Link
                to="/dashboard-products"
                className="text-blue-500 flex items-center justify-center gap-1 font-semibold hover:underline text-lg"
              >
                Manage Your Products
                <FaArrowRight title="Manage Your Products" />
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
