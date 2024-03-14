import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAdminGetAllOrdersQuery } from "../../redux/features/orders/orderApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { OrderDataType, orderColumns } from "../shared/Tables/OrderColumns";

const AllOrders = () => {
  const { data, isLoading } = useAdminGetAllOrdersQuery({});

  // console.log("data:", data);

  const TableComponent = TableHOC<OrderDataType>(
    orderColumns,
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
