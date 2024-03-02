import { AiOutlineEye, AiOutlineMoneyCollect } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { MdBorderClear } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllOrdersBySellerQuery } from "../../redux/features/orders/orderApi";
import { useGetAllShopProductsQuery } from "../../redux/features/product/productApi";
import styles from "../../styles/styles";
import { IProduct } from "../../types/product";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { OrderDataType, orderColumns } from "../shared/Tables/OrderColumns";
import {
  ProductDataType,
  productColumns,
} from "../shared/Tables/ProductColumns";

const DashboardHero = () => {
  const { seller } = useSelector((state: any) => state?.auth);

  const { data, isLoading } = useGetAllOrdersBySellerQuery(seller?._id, {});

  const { data: productData, isLoading: productLoading } =
    useGetAllShopProductsQuery(seller?._id, {});

  console.log("data:", data);

  const orderData = data?.orders?.slice(0, 5);

  const productsData = productData?.products
    ?.sort((a: IProduct, b: IProduct) => {
      if (a?.sold_out !== undefined && b?.sold_out !== undefined) {
        return b.sold_out - a.sold_out;
      }

      return 0;
    })
    ?.slice(0, 5);

  const OrderTableComponent = TableHOC<OrderDataType>(
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
    orderData,
    `Latest Orders`,
    orderData?.length > 10 ? true : false
  );

  const ProductTablecomponent = TableHOC<ProductDataType>(
    productColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <Link to={`/product/${row.original?._id}`}>
                <AiOutlineEye
                  title="View Details"
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
    productsData,
    `Bestselling Products`,
    productsData?.length > 10 ? true : false
  );

  const availableBalance = seller?.availableBalance.toFixed(0);

  return isLoading || productLoading ? (
    <Loader />
  ) : (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex flex-wrap items-center justify-between overflow-x-hidden">
        <div className="w-full mb-4 800px:w-[47%] 1100px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <CiMoneyBill
              title="Account Balance"
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            &#8377;. {availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[47%] 1100px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear
              title="All Orders"
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {data?.orders && data?.orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[47%] 1100px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              title="All Products"
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {productData?.products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      {/* <br /> */}
      {/* <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3> */}
      <div className="w-full min-h-[45vh] 1100px:flex gap-7 space-y-6 1100px:space-y-0  justify-center bg-white rounded">
        <div className="w-full 1100px:w-[49%] ">
          {orderData && orderData?.length !== 0 && <OrderTableComponent />}
        </div>
        <div className="w-full 1100px:w-[49%] ">
          {productsData && productsData?.length !== 0 && (
            <ProductTablecomponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
