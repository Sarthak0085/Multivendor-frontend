import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAdminGetAllOrdersQuery } from "../../redux/features/orders/orderApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { OrderDataType, orderColumns } from "../shared/Tables/OrderColumns";
import { useSelector } from "react-redux";

const AllOrders = () => {
  const { isLoading: authLoading } = useSelector((state: any) => state.auth);

  console.log(authLoading);

  const { data, isLoading } = useAdminGetAllOrdersQuery({});

  console.log("data:", data);

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
    `All Orders`,
    data?.orders?.length > 10 ? true : false
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white overflow-x-hidden">
          {data?.orders?.length !== 0 ? (
            <TableComponent />
          ) : (
            <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-2 text-red-500">
                No Orders Found 😔
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                It seems there are no orders in the system at the moment.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Keep monitoring your storefront for incoming orders.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                You can also inspire sellers to create events for more reach
                towards the customer.
              </p>
              <Link
                to="/admin/orders"
                className="text-blue-500 flex items-center justify-center gap-1 font-semibold hover:underline text-lg"
              >
                View All Orders
                <FaArrowRight title="View All Orders" />
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
