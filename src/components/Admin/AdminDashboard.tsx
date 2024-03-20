import { AiOutlineEye, AiOutlineGift } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
import { FiPackage } from "react-icons/fi";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAdminGetAllOrdersQuery } from "../../redux/features/orders/orderApi";
import { useAdminGetAllProductsQuery } from "../../redux/features/product/productApi";
import { useGetAllWithdrawRequestByAdminQuery } from "../../redux/features/withdraw/withdrawApi";
import { IOrder } from "../../types/order";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import PieChartAnalytics from "../shared/PieChart";
import { OrderDataType, orderColumns } from "../shared/Tables/OrderColumns";
import {
  ProductDataType,
  dashboardProductColumns,
} from "../shared/Tables/ProductColumns";
import SellersAnalytics from "./Analytics/SellersAnalytics";
import UsersAnalytics from "./Analytics/UsersAnalytics";
import { useAdminGetAllCouponsQuery } from "../../redux/features/coupon/couponApi";

const northStates = ["RJ", "HP", "PB", "JK", "UP", "HR", "CH", "DL", "UK"];

const southStates = ["AP", "TG", "KA", "KL", "TN", "PY", "LD", "AN"];

const eastStates = ["WB", "JH", "OR", "BR", "SK", "AS", "MN", "ML", "TR", "NL"];

const westStates = ["GJ", "MH", "DD"];

const AdminDashboard = () => {
  const { data, isLoading } = useAdminGetAllOrdersQuery({});

  const { data: productData, isLoading: productLoading } =
    useAdminGetAllProductsQuery({ sort: "" });

  const { data: withdrawData, isLoading: withdrawLoading } =
    useGetAllWithdrawRequestByAdminQuery({});
  const { data: couponData, isLoading: couponLoading } =
    useAdminGetAllCouponsQuery({});

  // console.log("data:", data);

  const orderData = data?.orders?.slice(0, 6);

  const productsData = productData?.products?.slice(0, 5);

  const withdrawRequestToday = withdrawData?.withdraws?.filter(
    (item: any) =>
      item?.createdAt?.slice(0, 10) === new Date().toISOString().slice(0, 10)
  );

  // Filter orders for North region
  const northRegionOrders = data?.orders?.filter((item: any) => {
    return northStates.includes(
      item?.shippingAddress && item?.shippingAddress?.state
    );
  });

  const southRegionsOrders = data?.orders?.filter((item: any) => {
    return southStates.includes(
      item?.shippingAddress && item?.shippingAddress?.state
    );
  });

  const eastRegionsOrders = data?.orders?.filter((item: any) => {
    return eastStates.includes(
      item?.shippingAddress && item?.shippingAddress?.state
    );
  });

  const westRegionOrders = data?.orders?.filter((item: any) => {
    return westStates.includes(
      item?.shippingAddress && item?.shippingAddress?.state
    );
  });

  const pieChartData = [
    { name: "North", value: northRegionOrders?.length },
    { name: "South", value: southRegionsOrders?.length },
    { name: "East", value: eastRegionsOrders?.length },
    { name: "West", value: westRegionOrders?.length },
  ];

  const OrderTableComponent = TableHOC<OrderDataType>(
    orderColumns,
    orderData,
    "",
    orderData?.length > 10 ? true : false
  );

  const paymentStatus = data?.orders?.filter(
    (item: IOrder) => item?.paymentInfo?.type === "Cash On Delivery"
  );

  const paymentStatusData = [
    { name: "C.O.D", value: paymentStatus?.length },
    { name: "PAID", value: data?.orders?.length - paymentStatus?.length },
  ];

  const processing = data?.orders?.filter(
    (item: any) => item?.status === "Processing"
  );
  const transferredToDelivery = data?.orders?.filter(
    (item: IOrder) => item?.status === "Transferred to delivery partner"
  );
  const received = data?.orders?.filter(
    (item: IOrder) => item?.status === "Received"
  );
  const delivered = data?.orders?.filter(
    (item: IOrder) => item?.status === "Delivered"
  );
  const onTheWay = data?.orders?.filter(
    (item: IOrder) => item?.status === "On the way"
  );
  const shipping = data?.orders?.filter(
    (item: IOrder) => item?.status === "Shipping"
  );
  const refundProcess = data?.orders?.filter(
    (item: IOrder) => item?.status === "Processing Refund"
  );
  const refundSuccess = data?.orders?.filter(
    (item: IOrder) => item?.status === "Refund Success"
  );

  const statusData = [
    {
      name: "Processing",
      value: ((processing?.length / data?.orders?.length) * 100).toFixed(0),
      color: "#87CEEB",
    },
    {
      name: "Transferred to Delivery partner",
      value: (
        (transferredToDelivery?.length / data?.orders?.length) *
        100
      ).toFixed(0),
      color: "#008000",
    },
    {
      name: "Shipping",
      value: ((shipping?.length / data?.orders?.length) * 100).toFixed(0),
      color: "#FFA500",
    },
    {
      name: "Received",
      value: ((received?.length / data?.orders?.length) * 100).toFixed(0),
      color: "#00008B",
    },
    {
      name: "On the Way",
      value: ((onTheWay?.length / data?.orders?.length) * 100).toFixed(0),
      color: "#FFD700",
    },
    {
      name: "Delivered",
      value: ((delivered?.length / data?.orders?.length) * 100).toFixed(0),
      color: "#32CD32",
    },
    {
      name: "Refund Processing",
      value: ((refundProcess?.length / data?.orders?.length) * 100).toFixed(0),
      color: "#FF0000",
    },
    {
      name: "Refund Success",
      value: ((refundSuccess?.length / data?.orders?.length) * 100).toFixed(0),
      color: "#00FF00",
    },
  ];

  const refundOrdersToday = data?.orders?.filter(
    (order: any) =>
      order?.status === "Processing Refund" &&
      order?.updatedAt &&
      order?.updatedAt?.slice(0, 10) === new Date().toISOString()?.slice(0, 10)
  );

  const ProductTablecomponent = TableHOC<ProductDataType>(
    dashboardProductColumns?.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <Link
                to={`/product/${row?.original?._id}`}
                aria-label="View Details"
              >
                <AiOutlineEye
                  aria-label="View Details"
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
    ``,
    productsData?.length > 10 ? true : false
  );

  const adminEarning =
    data?.orders &&
    data?.orders
      ?.reduce((acc: number, item: IOrder) => acc + item?.totalPrice * 0.1, 0)
      ?.toFixed(0);

  return isLoading || productLoading || couponLoading || withdrawLoading ? (
    <Loader />
  ) : (
    <div className="w-full p-1 pt-10 500px:p-8">
      <h3 className="text-[22px] font-Poppins pb-2 font-bold">Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 1100px:grid-cols-3 1300px:grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
        <div className="h-[100px] w-full shadow rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease">
          <div>
            <h2 className="text-[#8589DF] text-[14px] font-bold leading-[17px]">
              Account Balance
            </h2>
            <h3 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              &#8377;. {adminEarning}
            </h3>
            <Link to="/dashboard-withdraw-money">
              <h5 className="text-[#077f9c] underline text-[13px]">
                Withdraw Money
              </h5>
            </Link>
          </div>
          <CiMoneyBill title="Account Balance" size={35} fill="blue" />
        </div>
        <div className="h-[100px] shadow rounded-[8px] bg-white border-l-[4px] border-[#cfe816] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease">
          <div>
            <h2 className="text-[#1cc88a] text-[14px] font-bold leading-[17px]">
              All Orders
            </h2>
            <h3 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {data?.orders && data?.orders?.length}
            </h3>
            <Link to="/dashboard-orders">
              <h5 className="text-[#077f9c] underline text-[13px]">
                View Orders
              </h5>
            </Link>
          </div>
          <MdBorderClear title="All Orders" size={35} fill="#cfe816" />
        </div>
        <div className="h-[100px] shadow rounded-[8px] bg-white border-l-[4px] border-[#4bc708] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease">
          <div>
            <h2 className="text-[#33f08b] text-[14px] font-bold leading-[17px]">
              All Products
            </h2>
            <h3 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {productData?.products?.length}
            </h3>
            <Link to="/dashboard-products">
              <h5 className="text-[#077f9c] underline text-[13px]">
                View Products
              </h5>
            </Link>
          </div>
          <FiPackage title="All Products" size={35} color="#4bc708" />
        </div>
        <div className="h-[100px] shadow rounded-[8px] bg-white border-l-[4px] border-[#f416ec] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease">
          <div>
            <h2 className="text-[#f03378] text-[14px] font-bold leading-[17px]">
              All Coupons
            </h2>
            <h3 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {couponData?.couponCodes?.length}
            </h3>
            <Link to="/dashboard-coupons">
              <h5 className="text-[#077f9c] underline text-[13px]">
                View Coupons
              </h5>
            </Link>
          </div>
          <AiOutlineGift title="All Coupons" size={35} fill="#f416ec" />
        </div>
      </div>

      <div className="flex flex-col mt-[22px] w-full gap-[30px]">
        <div className="basis-[100%] 1300px:basis[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Latest Orders</h2>
          </div>
          <div className="px-4 pb-4">
            {orderData && orderData?.length !== 0 && <OrderTableComponent />}
          </div>
        </div>
      </div>

      <div className="1300px:flex-row flex flex-col mt-[22px] w-full gap-[30px]">
        <div className="basis-[100%] 1300px:basis[60%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Order Status</h2>
          </div>
          {statusData?.map(
            (
              item: { name: string; value: string; color: string },
              index: number
            ) => {
              const value = Number(item?.value);

              return (
                <div
                  key={index}
                  style={{ color: `${item?.color}` }}
                  className={`px-4 pb-4 flex flex-col text-[${item?.color}] `}
                >
                  <div className="font-semibold mb-2">{item?.name}</div>
                  <div className="flex items-center">
                    <div
                      style={{ borderColor: `${item?.color}` }}
                      className={`h-[10px] w-full bg-white rounded-md border border-[${item.color}] mr-2`}
                    >
                      <div
                        className={`h-[9px] bg-[${item?.color}]`}
                        style={{
                          width: `${value}%`,
                          backgroundColor: `${item?.color}`,
                        }}
                      ></div>
                    </div>
                    {value}%
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className="1300px:basis-[40%] basis-[100%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Payment Status</h2>
          </div>
          <div className="flex items-center justify-center">
            <PieChartAnalytics data={paymentStatusData} />
          </div>
        </div>
      </div>

      <div className="1300px:flex-row flex flex-col mt-[22px] w-full gap-[30px]">
        <div className="basis-[100%] 1300px:w-[60%]  border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Sellers Analytics</h2>
          </div>
          <div className="px-4 pb-4">
            <SellersAnalytics isDashboard={true} />
          </div>
        </div>
        <div className="13300px:basis-[40%] basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Withdraw Requests (Today)</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            {withdrawRequestToday?.length !== 0 ? (
              withdrawRequestToday?.map((item: IOrder, index: number) => (
                <div key={index} className="flex items-center justify-around">
                  <h3 className="text-[14px]">{item?._id?.slice(0, 6)}</h3>
                  <h2 className="text-[14px]">{item?.user?.fullName}</h2>
                  <h3 className="text-[14px]">{item?.status}</h3>
                </div>
              ))
            ) : (
              <div className="text-emerald-500 text-[25px] py-auto text-center font-bold">
                No Withdraw Request Today
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="1300px:flex-row flex flex-col mt-[22px] w-full gap-[30px]">
        <div className="basis-[100%] 1300px:w-[60%]  border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">User Analytics</h2>
          </div>
          <div className="px-4 pb-4">
            <UsersAnalytics isDashboard={true} />
          </div>
        </div>
        <div className="13300px:basis-[40%] basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Orders Cancelled (Today)</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            {refundOrdersToday?.length !== 0 ? (
              refundOrdersToday?.map((item: IOrder, index: number) => (
                <div key={index} className="flex items-center justify-around">
                  <h3 className="text-[14px]">{item?._id.slice(0, 6)}</h3>
                  <h2 className="text-[14px]">{item?.user?.fullName}</h2>
                  <h3 className="text-[14px]">{item?.status}</h3>
                </div>
              ))
            ) : (
              <div className="text-emerald-500 text-[25px] py-auto text-center font-bold">
                No Order Cancelled today
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="1300px:flex-row flex flex-col mt-[22px] w-full gap-[30px]">
        <div className="basis-[100%] 1300px:w-[60%]  border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Popular Products</h2>
          </div>
          <div className="px-4 pb-4">
            {productData && productData?.length !== 0 && (
              <ProductTablecomponent />
            )}
          </div>
        </div>
        <div className="13300px:basis-[30%] basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Sales by Regions</h2>
          </div>
          <div className="flex items-center justify-center">
            <PieChartAnalytics data={pieChartData} />
          </div>
        </div>
      </div>
      {/* <div className="1300px:flex-row flex flex-col mt-[22px] w-full gap-[30px]">
        <div className="basis-[100%] 1300px:basis[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Popular Products</h2>
          </div>
          <div className="px-4 pb-4">
            {productData && productData?.length !== 0 && (
              <ProductTablecomponent />
            )}
          </div>
        </div>
        <div className="13300px:basis-[30%] basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F9F8FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[16px] font-bold">Sales by Regions</h2>
          </div>
          <div className="flex items-center justify-center">
            <PieChartAnalytics data={pieChartData} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
