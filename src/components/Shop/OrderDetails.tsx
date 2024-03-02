import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetAllOrdersBySellerQuery,
  useOrderUpdateStatusBySellerMutation,
  useRefundSuccessBySellerMutation,
} from "../../redux/features/orders/orderApi";
import Loader from "../Layout/Loader";
import { IOrder } from "../../types/order";
import { setErrorOptions, setSuccessOptions } from "../options";
import { Country, State } from "country-state-city";
import { IProductInCart } from "../../types/cart";

const OrderDetails = () => {
  // const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state: any) => state?.auth);
  const {
    data: orderData,
    isLoading,
    refetch,
  } = useGetAllOrdersBySellerQuery(seller?._id, {
    refetchOnMountOrArgChange: true,
  });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  // const [orderUpdate, {isSuccess, error, isLoading}] =

  const [
    refund,
    { isSuccess: refundSuccess, error: refundError, isLoading: refundLoading },
  ] = useRefundSuccessBySellerMutation();

  const [
    updateStatus,
    { isSuccess: updateSuccess, error: updateError, isLoading: updateLoading },
  ] = useOrderUpdateStatusBySellerMutation();

  const data =
    orderData?.orders &&
    orderData?.orders.find((item: IOrder) => item._id === id);

  useEffect(() => {
    if (refundSuccess) {
      toast.success("Order Status updated!", {
        style: setSuccessOptions,
      });
      refetch();
      navigate("/dashboard-refunds");
    }
    if (updateSuccess) {
      toast.success("Order Status updated!", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (refundError) {
      if ("data" in refundError) {
        const errorData = refundError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [refundSuccess, refundError, updateSuccess, updateError, refetch]);

  const orderUpdateHandler = async () => {
    await updateStatus({ orderId: data?._id, status });
  };

  const refundOrderUpdateHandler = async () => {
    await refund({ orderId: data?._id, status });
  };

  console.log(data?.status);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((items: any, index: number) => (
          <div key={index} className="w-full flex items-start mb-5">
            {items.map((item: IProductInCart, i: number) => (
              <div key={i} className="w-full flex items-start mb-5">
                <img
                  src={`${item?.product?.images[0]?.url}`}
                  alt={item?.product?.name}
                  className="w-[80x] h-[80px]"
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px] text-emerald-500">
                    {item.product?.name}
                  </h5>
                  <h5 className="pl-3 text-[20px] text-[#00000091]">
                    &#8377;. {item?.price} x {item?.count} = &#8377;.{" "}
                    {item?.price * item?.count}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>&#8377;. {data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[22px]  font-bold text-blue-500">
            Shipping Address:
          </h4>
          <h4 className="pt-3 text-[18px]">
            <strong>Recipient Name:</strong> <span>{data?.user?.fullName}</span>
          </h4>
          <h4 className="pt-1 text-[18px]">
            <strong>Street Address 1:</strong>{" "}
            <span>{data?.shippingAddress?.address1}</span>
          </h4>
          <h4 className="pt-1 text-[18px]">
            <strong>Street Address 2:</strong>{" "}
            <span>{data?.shippingAddress?.address2}</span>
          </h4>
          <h4 className="pt-1 text-[18px]">
            <strong>City:</strong> <span>{data?.shippingAddress?.city}</span>
          </h4>
          <h4 className="pt-1 text-[18px]">
            <strong>Pincode:</strong>{" "}
            <span>{data?.shippingAddress?.zipCode}</span>
          </h4>
          <h4 className="pt-1 text-[18px]">
            <strong>State:</strong>{" "}
            <span>
              {
                State.getStateByCodeAndCountry(
                  `${data?.shippingAddress?.state}`,
                  `${data?.shippingAddress?.country}`
                )?.name
              }
            </span>
          </h4>
          <h4 className="pt-1 text-[18px]">
            <strong>Country:</strong>{" "}
            <span>
              {
                Country.getCountryByCode(`${data?.shippingAddress?.country}`)
                  ?.name
              }
            </span>
          </h4>
          <h4 className="pt-1 text-[18px]">
            <strong>Phone Number:</strong>{" "}
            <span>{data?.user?.phoneNumber}</span>
          </h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[22px] font-bold text-blue-500">
            Payment Info:
          </h4>
          <h4 className="pt-3 font-medium text-[18px]">
            <strong>Status: </strong>
            <span
              className={`text-emerald-500 ${
                data?.paymentInfo?.type === "Cash On Delivery" &&
                "!text-red-500"
              }`}
            >
              {data?.paymentInfo?.type !== "Cash On Delivery"
                ? "PAID"
                : "NOT PAID"}
            </span>
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== "Processing Refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
      {data?.status === "Processing Refund" ||
      data?.status === "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {["Processing Refund", "Refund Success"]
            .slice(
              ["Processing Refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}

      <button
        className={`${
          styles.button
        } mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px] ${
          updateLoading || (refundLoading && "cursor-not-allowed")
        }`}
        onClick={
          data?.status !== "Processing refund"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
        disabled={refundLoading || updateLoading}
      >
        Update Status
      </button>
    </div>
  );
};

export default OrderDetails;
