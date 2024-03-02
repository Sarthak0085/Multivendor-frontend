import { useEffect, useRef } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useClickOutside from "../../hooks/useClickOutside";
import {
  useAddToCartMutation,
  useEmptyCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../../redux/features/cart/cartApi";
import styles from "../../styles/styles";
import { IProductInCart } from "../../types/cart";
import Loader from "../Layout/Loader";
import CartItemCard from "./CartItemCard";
import { setErrorOptions, setSuccessOptions } from "../options";

const Cart = ({
  setOpenCart,
  userId,
}: {
  setOpenCart: (openCart: boolean) => void;
  userId: string;
}) => {
  const {
    data: cartData,
    isLoading,
    refetch,
  } = useGetCartQuery(userId, { refetchOnMountOrArgChange: true });

  console.log(cartData);

  const [addTocart, { isSuccess, error }] = useAddToCartMutation();
  const [emptyCart, { isSuccess: emptySuccess, error: emptyError }] =
    useEmptyCartMutation();

  const [removeFromCart, { isSuccess: RemoveSuccess, error: RemoveError }] =
    useRemoveFromCartMutation();
  // console.log("remove", removeData);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Cart updated Successfully", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (RemoveSuccess) {
      toast.success("Product Removed From Cart Successfully.", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (emptySuccess) {
      toast.success("Cart Empty Successfully.");
      refetch();
    }
    if (RemoveError) {
      if ("data" in RemoveError) {
        const errorData = RemoveError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
    if (emptyError) {
      if ("data" in emptyError) {
        const errorData = emptyError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [RemoveSuccess, RemoveError, emptySuccess, emptyError, isSuccess, error]);

  const handleEmptyCart = async() => {
    await emptyCart(userId);
  };

  const removeFromCartHandler = async (data: IProductInCart) => {
    console.log("cart:", data);
    const response = await removeFromCart(data);
    console.log(response);
  };

  // const totalPrice = cartData?.cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice,
  //   0
  // );

  const totalPrice = cartData?.cart?.cartTotal;

  const quantityChangeHandler = (data: IProductInCart) => {
    addTocart(data);
    // dispatch(addTocart(data));
  };

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setOpenCart(false));

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[35%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {isLoading ? (
          <Loader />
        ) : typeof cartData !== "undefined" &&
          cartData?.cart?.products?.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5 className="text-[30px] text-red-500">Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end  pt-5 px-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4 text-[#3bc177]`}>
                <IoBagHandleOutline title="Your Cart" size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cartData?.cart && cartData?.cart.products.length} Cart{" "}
                  {cartData?.cart && cartData?.cart.products.length === 1
                    ? "Item"
                    : "Items"}
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cartData?.cart &&
                  cartData?.cart?.products?.map(
                    (i: IProductInCart, index: number) => (
                      <CartItemCard
                        key={index}
                        data={i}
                        quantityChangeHandler={quantityChangeHandler}
                        removeFromCartHandler={removeFromCartHandler}
                      />
                    )
                  )}
              </div>
            </div>

            <div className="px-5 mb-3 ">
              {/* Empty Cart */}
              <button
                onClick={() => handleEmptyCart()}
                className={`h-[45px] w-[100%] my-3 flex items-center justify-center bg-[#3ca4ff] rounded-[5px]`}
              >
                <div className="text-[#fff] flex gap-2 text-[18px] font-[600]">
                  <CgTrashEmpty title="Empty Wishlist" size={25} /> Empty Cart
                </div>
              </button>
              {/* checkout button */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (&#8377;. {totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
