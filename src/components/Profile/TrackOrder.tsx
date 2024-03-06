// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useGetAllOrdersByUserQuery } from "../../redux/features/orders/orderApi";
// import Loader from "../Layout/Loader";

// const TrackOrder = () => {
//   const { user } = useSelector((state: any) => state?.auth);

//   const { id } = useParams();

//   const { data, isLoading } = useGetAllOrdersByUserQuery(user?._id, {});

//   const dataInfo =
//     data?.orders && data?.orders.find((item: any) => item._id === id);

//   return (
//     <div className="w-full h-[80vh] flex justify-center items-center">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           {dataInfo && dataInfo?.status === "Processing" ? (
//             <div className="flex flex-col items-center justify-center gap-2">
//               <h1 className="text-[20px] font-semibold text-[#FFA500]">
//                 Your Order is processing in shop.
//               </h1>
//               <h1 className="text-[20px] font-semibold">
//                 You will get your order within 7 days.
//               </h1>
//             </div>
//           ) : dataInfo?.status === "Transferred to delivery partner" ? (
//             <>
//               <h1 className="text-[20px] font-semibold text-[#007bff]">
//                 Your Order is on the way for delivery partner.
//               </h1>
//               <h1 className="text-[20px] font-semibold">
//                 You will get your order within 7 days.
//               </h1>
//             </>
//           ) : dataInfo?.status === "Shipping" ? (
//             <>
//               <h1 className="text-[20px] font-semibold">
//                 Your Order is on the way with our delivery partner.
//               </h1>
//               <h1 className="text-[20px] font-semibold">
//                 You will get your order within 5 days.
//               </h1>
//             </>
//           ) : dataInfo?.status === "Received" ? (
//             <>
//               <h1 className="text-[20px]  font-semibold text-[#28a745]">
//                 Your Order is in your city. Our Delivery man will deliver it.
//               </h1>
//               <h1 className="text-[20px] font-semibold">
//                 You will get your order within 3 days.
//               </h1>
//             </>
//           ) : dataInfo?.status === "On the way" ? (
//             <>
//               <h1 className="text-[20px]  font-semibold text-[#FFA500]">
//                 Our Delivery man is going to deliver your order.
//               </h1>
//               <h1 className="text-[20px] font-semibold">
//                 You will get your order within 3 days.
//               </h1>
//             </>
//           ) : dataInfo?.status === "Delivered" ? (
//             <h1 className="text-[20px]  font-semibold text-[#00FF00]">
//               Your order is delivered!
//             </h1>
//           ) : dataInfo?.status === "Processing refund" ? (
//             <>
//               <h1 className="text-[20px]  font-semibold text-[#FFA500]">
//                 Your refund is processing!
//               </h1>
//               <h1 className="text-[20px] font-semibold">
//                 You request will be processed within 3 business days.
//               </h1>
//             </>
//           ) : dataInfo?.status === "Refund Success" ? (
//             <h1 className="text-[20px] font-semibold text-[#00FF00]">
//               Your Refund is success!
//             </h1>
//           ) : null}
//         </>
//       )}
//     </div>
//   );
// };

// export default TrackOrder;

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetAllOrdersByUserQuery } from "../../redux/features/orders/orderApi";
import Loader from "../Layout/Loader";
import { useEffect, useState } from "react";
import { IOrder } from "../../types/order";

type StringObject = Record<string, string>;

const TrackOrder = () => {
  const { user } = useSelector((state: any) => state?.auth);
  const { id } = useParams();
  const [show, setShow] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const [dataInfo, setDataInfo] = useState<IOrder | undefined>(undefined);

  const { data, isLoading, refetch } = useGetAllOrdersByUserQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data && data.orders) {
      const orderData = data.orders.find(
        (item: any) => item._id === id || item._id === orderId
      );
      setDataInfo(orderData);
    }
  }, [data, id, orderId]);

  const handleClick = () => {
    refetch();
  };

  const getExpectedDelivery = () => {
    if (dataInfo !== undefined) {
      const processingDate = new Date(dataInfo?.createdAt as Date);
      const deliveryDate = new Date(processingDate);
      if (dataInfo?.status === "Processing") {
        deliveryDate.setDate(deliveryDate.getDate() + 7);
      } else if (dataInfo?.status === "Transferred to delivery partner") {
        deliveryDate.setDate(deliveryDate.getDate() + 7);
      } else if (dataInfo?.status === "Shipping") {
        deliveryDate.setDate(deliveryDate.getDate() + 5);
      } else if (dataInfo?.status === "Received") {
        deliveryDate.setDate(deliveryDate.getDate() + 3);
      } else if (dataInfo?.status === "On the way") {
        deliveryDate.setDate(deliveryDate.getDate() + 3);
      } else {
        deliveryDate.setDate(dataInfo?.deliveredAt);
      }

      // Get current date
      const currentDate = new Date();
      const diffTime = deliveryDate?.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let textColor = "";
      if (diffDays >= 5) {
        textColor = "text-red-500";
      } else if (diffDays >= 1) {
        textColor = "text-yellow-500";
      } else {
        textColor = "text-green-500";
      }

      const options: StringObject = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      };

      const formattedDate = deliveryDate.toLocaleDateString("en-US", options);

      return (
        <div className="font-semibold my-2">
          You will receive your order by :-
          <p>
            Date:{" "}
            <span className={`font-semibold ${textColor}`}>
              {formattedDate.slice(4)}
            </span>
          </p>{" "}
          <p>
            Day:{" "}
            <span className={`font-semibold my-1 ${textColor}`}>
              {formattedDate.slice(0, 3)}
            </span>
          </p>{" "}
        </div>
      );
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-[20px]">
      <div className="relative w-[90%] h-[65vh] bg-slate-200 bg-center flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <input
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={() => handleClick()}
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order Id"
            className="absolute top-5 right-auto text-[blue] font-medium 800px:w-[60%] w-[90%] rounded-md h-[35px] outline-none outline-blue-400 focus:outline-[blue] p-2 px-3"
          />
          {show && (
            <p className="text-[red] px-2 pt-2">
              You can get your Order Id from your email that you get from our
              team while you creating your order.
            </p>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : dataInfo ? (
          <div className="800px:max-w-[60%] mt-4 opacity-90 p-6 1300px:w-[40%] w-full backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            {dataInfo && (
              <>
                <h1 className="text-[40px] font-bold mb-4">
                  Tracking Your Order
                </h1>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-green-500 mb-2">
                    Current Status:
                  </h2>
                  <p className="text-base font-medium text-gray-800">
                    {dataInfo.status === "Processing" && (
                      <>
                        <span className="text-orange-500">Processing:</span> 🛒
                        Your Order is being processed in the shop. You will
                        receive updates soon.
                      </>
                    )}
                    {dataInfo.status === "Transferred to delivery partner" && (
                      <>
                        <span className="text-blue-500">
                          Transferred to delivery partner:
                        </span>{" "}
                        🚚 Your Order is on the way to the delivery partner.
                      </>
                    )}
                    {dataInfo?.status === "Shipping" && (
                      <>
                        <span className="text-blue-500">Shipping:</span> 🚚 Your
                        Order is on the way to the delivery partner.
                      </>
                    )}
                    {dataInfo?.status === "Received" && (
                      <>
                        <span className="text-[#28a745]">Received:</span>
                        📦 Your Order is in your city. Our Delivery man will
                        deliver it.
                      </>
                    )}
                    {dataInfo?.status === "On the way" && (
                      <>
                        <span className="text-[#FFA500]">On the way:</span>
                        🚚 Our Delivery man is going to deliver your order.
                      </>
                    )}
                    {dataInfo?.status === "Delivered" && (
                      <>
                        <span className=" text-[#00FF00]">Delivered:</span>
                        🎉 Your order is delivered!
                      </>
                    )}
                    {dataInfo?.status === "Processing Refund" && (
                      <>
                        <span className="text-[#FFA500]">
                          Processing Refund:
                        </span>
                        💸 Your refund is in processing!
                      </>
                    )}
                    {dataInfo?.status === "Refund Success" && (
                      <>
                        <span className="text-[#00FF00]">
                          Processing Refund:
                        </span>
                        💰 Your Refund is Success!
                      </>
                    )}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-[#007bff] mb-2">
                    Expected Delivery:
                  </h2>
                  <p className="text-base font-medium text-gray-800">
                    {getExpectedDelivery()}
                  </p>
                </div>
                {/* Add more sections for additional information */}
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TrackOrder;
