import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetAllOrdersByUserQuery,
  useRefundRequestByUserMutation,
} from "../../redux/features/orders/orderApi";
import { useCreateNewReviewMutation } from "../../redux/features/product/productApi";
import styles from "../../styles/styles";
import { IProductInCart } from "../../types/cart";
import { IOrder } from "../../types/order";
import Loader from "../Layout/Loader";
import { setErrorOptions, setSuccessOptions } from "../options";

const UserOrderDetails = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>();
  const [rating, setRating] = useState(1);

  const { id } = useParams<{ id: string }>();

  const {
    data: orderData,
    isLoading,
    refetch,
  } = useGetAllOrdersByUserQuery(user?._id, {});

  console.log(orderData);

  const data =
    orderData?.orders &&
    orderData?.orders.find((item: IOrder) => item._id === id);

  console.log(data);

  //   const state =

  const [createReview, { isSuccess, error, isLoading: reviewLoading }] =
    useCreateNewReviewMutation();

  const [
    refundRequest,
    { isSuccess: refundSuccess, error: refundError, isLoading: refundLoading },
  ] = useRefundRequestByUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review Added Successfully", {
        style: setSuccessOptions,
      });
      setComment("");
      setRating(1);
      setOpen(false);
      refetch();
    }
    if (refundSuccess) {
      toast.success("Refund Request Submitted Successfully.", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      }
    }
    if (refundError) {
      if ("data" in refundError) {
        const errorData = refundError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      }
    }
  }, [isSuccess, error, refundSuccess, refundError, refetch]);

  const reviewHandler = async () => {
    await createReview({
      user,
      rating,
      comment,
      productId: selectedItem && selectedItem.map((item: any) => item?._id),
      orderId: id,
    });
  };

  const refundHandler = async () => {
    await refundRequest({ orderId: id, status: "Processing Refund" });
  };

  console.log("selected:", selectedItem);
  console.log("data cart:", data?.cart);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`py-4 min-h-screen bg-blue-50 ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item: any, index: number) => {
          return (
            <div key={index} className="w-full flex items-start mb-5">
              {item?.map((p: IProductInCart, index: number) => (
                <div className="flex items-center" key={index}>
                  <img
                    src={`${p?.product?.images[0]?.url}`}
                    alt=""
                    className="w-[100px] h-[100px]"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] text-emerald-500">
                      {p?.product?.name}
                    </h5>
                    <h5 className="pl-3 text-[20px] text-[#00000094]">
                      &#8377;. {p?.price} x {p?.count} = &#8377;.{" "}
                      {p?.price * p?.count}
                    </h5>
                  </div>
                </div>
              ))}
              {/* </div> */}
              {!item.isReviewed && data?.status === "Delivered" ? (
                <div
                  className={`${styles.button} my-auto !ml-5 text-[#fff]`}
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
                >
                  Write a review
                </div>
              ) : null}
            </div>
            // </div>
          );
        })}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            {selectedItem &&
              selectedItem?.map((item: IProductInCart, index: number) => (
                <div key={index} className="w-full flex">
                  <img
                    src={`${item?.product?.images[0]?.url}`}
                    alt={item?.product?.name}
                    className="w-[80px] h-[80px]"
                  />
                  <div>
                    <div className="pl-3 text-[20px]">
                      {item?.product?.name}
                    </div>
                    <h4 className="pl-3 text-[20px]">
                      &#8377;. {item?.product?.discountPrice} x {item?.count}
                    </h4>
                  </div>
                </div>
              ))}

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                cols={20}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <button
              className={`${styles.button} text-white text-[20px] ml-3 ${
                reviewLoading && "cursor-not-allowed"
              }`}
              onClick={() => {
                rating > 1 ? reviewHandler() : null;
              }}
              disabled={reviewLoading}
            >
              Submit
            </button>
          </div>
        </div>
      )}

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
          <br />
          {data?.status === "Delivered" && (
            <button
              className={`${styles.button} text-white ${
                refundLoading && "cursor-not-allowed"
              }`}
              onClick={refundHandler}
              disabled={refundLoading}
            >
              Give a Refund
            </button>
          )}
        </div>
      </div>
      <br />
      <Link to="/">
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;
