import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/features/orders/orderApi";
import { usePaymentProcessMutation } from "../../redux/features/payment/paymentApi";
import styles from "../../styles/styles";
import { IProductInCart } from "../../types/cart";
import { IUser } from "../../types/user";
import { useEmptyCartMutation } from "../../redux/features/cart/cartApi";
import { setLoadingOptions } from "../options";

interface ICreateOrder {
  paymentInfo: { type: string };
  cart: IProductInCart;
  shippingAddress: {
    country: string;
    city: string;
    address1: string;
    address2?: string;
    pinCode: number;
    addressType: string;
  };
  user: IUser;
  userId: string;
  totalPrice: number;
}

const Payment = () => {
  const [orderData, setOrderData] = useState<any>();
  // const [open, setOpen] = useState(false);
  const { user } = useSelector((state: any) => state?.auth);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [orderCreation, { isSuccess, error, isLoading }] =
    useCreateOrderMutation();
  const [processPayment, { error: paymentError, isLoading: paymentLoading }] =
    usePaymentProcessMutation();
  const [emptyCart] = useEmptyCartMutation();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder") as string);
    setOrderData(orderData);
  }, []);

  console.log(orderData);

  async function emptyCartFunction() {
    await emptyCart(user?._id);
  }

  useEffect(() => {
    if (isLoading || paymentLoading) {
      toast.loading("Processing...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      // setOpen(false);
      emptyCartFunction();
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    }
    if (paymentError) {
      if ("data" in paymentError) {
        const errorData = paymentError?.data as Error;
        toast.error(errorData.message);
      }
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message);
      } else {
        toast.error("An error occurred while processing the order.");
      }
    }
  }, [isSuccess, error, paymentLoading, isLoading]);

  // const createOrder = (data, actions) => {
  //   return actions.order
  //     .create({
  //       purchase_units: [
  //         {
  //           description: "Sunflower",
  //           amount: {
  //             currency_code: "inr",
  //             value: orderData?.totalPrice,
  //           },
  //         },
  //       ],
  //       application_context: {
  //         shipping_preference: "NO_SHIPPING",
  //       },
  //     })
  //     .then((orderID) => {
  //       return orderID;
  //     });
  // };

  const order: ICreateOrder = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    userId: user && user?._id,
    totalPrice: orderData?.totalPrice,
    paymentInfo: {
      type: "",
    },
  };

  // const onApprove = async (data, actions) => {
  //   return actions.order.capture().then(function (details) {
  //     const { payer } = details;

  //     const paymentInfo = payer;

  //     if (paymentInfo !== undefined) {
  //       paypalPaymentHandler(paymentInfo);
  //     }
  //   });
  // };

  // const paypalPaymentHandler = async (paymentInfo) => {
  //   // Define the order object with necessary data
  //   const orderData = {
  //     paymentInfo: {
  //       id: paymentInfo.payer_id,
  //       status: "succeeded",
  //       type: "Paypal",
  //     },
  //     // Include other properties like cart, shippingAddress, etc.
  //   };

  //   await orderCreation(orderData).unwrap();

  //   // try {
  //   //   // Call the createOrder mutation using the mutate function
  //   //   await orderCreation(orderData).unwrap();

  //   //   // Handle successful response
  //   // } catch (error) {
  //   //   // Handle error
  //   //   console.error(error);
  //   //   // Handle error message or other actions
  //   // }
  // };

  //   const paypalPaymentHandler = async (paymentInfo) => {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     order.paymentInfo = {
  //       id: paymentInfo.payer_id,
  //       status: "succeeded",
  //       type: "Paypal",
  //     };

  //     await axios
  //       .post(`${server}/order/create-order`, order, config)
  //       .then((res) => {
  //         setOpen(false);
  //         navigate("/order/success");
  //         toast.success("Order successful!");
  //         // localStorage.setItem("cartItems", JSON.stringify([]));
  //         localStorage.setItem("latestOrder", JSON.stringify([]));
  //         window.location.reload();
  //       });
  //   };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice as number),
  };

  console.log(paymentData);

  const paymentHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const paymentResponse = await processPayment({
        amount: Math.round(orderData?.totalPrice as number),
      });

      if (paymentError) {
        return;
      }

      // console.log("payment Response:", paymentResponse?.data);

      if ("data" in paymentResponse) {
        const client_secret: string = paymentResponse?.data?.client_secret;

        if (!stripe || !elements) return;
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement) as any,
          },
        });

        if (result.error) {
          toast.error((result.error as any).message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              type: "succeeded",
            };
            await orderCreation(order); // Pass the order data here

            //     if (orderError) {
            //       toast.error(orderError.message); // Handle order creation error
            //       return;
            //     }

            //     setOpen(false);
            //     navigate("/order/success");
            //     toast.success("Order successful!");
            //     localStorage.setItem("cartItems", JSON.stringify([]));
            //     localStorage.setItem("latestOrder", JSON.stringify([]));
            //     window.location.reload();
          }
        }
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  //   const paymentHandler = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };

  //       const { data } = await axios.post(
  //         `${server}/payment/process`,
  //         paymentData,
  //         config
  //       );

  //       const client_secret = data.client_secret;

  //       if (!stripe || !elements) return;
  //       const result = await stripe.confirmCardPayment(client_secret, {
  //         payment_method: {
  //           card: elements.getElement(CardNumberElement),
  //         },
  //       });

  //       if (result.error) {
  //         toast.error(result.error.message);
  //       } else {
  //         if (result.paymentIntent.status === "succeeded") {
  //           order.paymnentInfo = {
  //             id: result.paymentIntent.id,
  //             status: result.paymentIntent.status,
  //             type: "Credit Card",
  //           };

  //           await axios
  //             .post(`${server}/order/create-order`, order, config)
  //             .then((res) => {
  //               setOpen(false);
  //               navigate("/order/success");
  //               toast.success("Order successful!");
  //               localStorage.setItem("cartItems", JSON.stringify([]));
  //               localStorage.setItem("latestOrder", JSON.stringify([]));
  //               window.location.reload();
  //             });
  //         }
  //       }
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   };

  //   const cashOnDeliveryHandler = async (e) => {
  //     e.preventDefault();

  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     order.paymentInfo = {
  //       type: "Cash On Delivery",
  //     };

  //     await axios
  //       .post(`${server}/order/create-order`, order, config)
  //       .then((res) => {
  //         setOpen(false);
  //         navigate("/order/success");
  //         toast.success("Order successful!");
  //         localStorage.setItem("cartItems", JSON.stringify([]));
  //         localStorage.setItem("latestOrder", JSON.stringify([]));
  //         window.location.reload();
  //       });
  //   };

  const cashOnDeliveryHandler = async (e: FormEvent) => {
    e.preventDefault();

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await orderCreation(order);
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            // open={open}
            // setOpen={setOpen}
            // onApprove={onApprove}
            // createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

interface IPaymentInfo {
  user: any;
  paymentHandler: any;
  cashOnDeliveryHandler: any;
}

const PaymentInfo = ({
  user,
  // open,
  // setOpen,
  // onApprove,
  // createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}: IPaymentInfo) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`${styles.input} !w-[95%] font-semibold text-[#444]`}
                    value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: "24px",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: "24px",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: "24px",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal payment */}
      {/* <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
      {/* {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      //   "client-id":
                      //     "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                      clientId:
                        "ARFjhtFETatXngCRXvIxXXefO9OJlQcODCC6MkvR0qUJecbCoAABtOPcx3HAXbodT6eOCTz43j7ieW0I",
                      currency: "inr",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>  */}

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }: { orderData: any }) => {
  const shipping = Number(orderData?.shipping).toFixed(0);
  const totalPrice = Number(orderData?.totalPrice).toFixed(0);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          &#8377;. {orderData?.subTotalPrice}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">&#8377;. {shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          &#8377;. {orderData?.discountPrice ? orderData.discountPrice : 0}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        &#8377;. {totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
