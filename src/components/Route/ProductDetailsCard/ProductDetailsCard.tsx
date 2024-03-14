import { useRef, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { IProduct } from "../../../types/product";
import toast from "react-hot-toast";
import useClickOutside from "../../../hooks/useClickOutside";

interface IProductDetailsCard {
  setOpen: (open: boolean) => void;
  data: IProduct;
  addToCart: ({ data, count }: { data: IProduct; count: number }) => void;
  addToWishlist: (data: IProduct) => void;
  removeFromWishlist: (data: IProduct) => void;
  click: boolean;
}

const ProductDetailsCard = ({
  setOpen,
  data,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  click,
}: IProductDetailsCard) => {
  const [count, setCount] = useState(1);
  // const [click, setClick] = useState(false);

  const handleMessageSubmit = () => {};

  const incrementCount = () => {
    if (count === 99) {
      toast.error("You can't add more than 99 products.");
    }
    if (count < 99) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // const [
  //   addToWishlist,
  //   { isSuccess: addWishlistSuccess, error: addWishlistError },
  // ] = useAddToWishlistMutation();
  // const [
  //   removeFromWishlist,
  //   { isSuccess: removeWishlistSuccess, error: removeWishlistError },
  // ] = useRemoveFromWishlistMutation();

  // const incrementCount = () => {
  //   setCount(count + 1);
  // };

  // const removeFromWishlistHandler = (data) => {
  //   const wishlistData = {
  //     productId: data?._id,
  //     shopId: data?.shop?._id,
  //     // color: data?.colors[0],
  //     category: data?.category,
  //     price: data?.discountPrice,
  //   };
  //   removeFromWishlist(wishlistData);
  //   // setClick(!click);
  //   // dispatch(removeFromWishlist(data));
  // };

  // const addToWishlistHandler = (data) => {
  //   const wishlistData = {
  //     productId: data?._id,
  //     shopId: data?.shop?._id,
  //     color: data?.colors[0],
  //     // category: data?.category,
  //     price: data?.discountPrice,
  //   };
  //   addToWishlist(wishlistData);
  //   // setClick(!click);
  //   // dispatch(addToWishlist(data));
  // };

  // //   const {
  // //     data: cartData,
  // //     isLoading: cartLoading,
  // //     refetch,
  // //   } = useGetCartQuery({
  // //     refetchOnMountOrArgChange: true,
  // //   });
  // const [addToCart, { isSuccess, error }] = useAddToCartMutation();

  // const addToCartHandler = (data: IProduct) => {
  //   // const isItemExists =
  //   //   cartData?.cart && cartData?.cart.find((i) => i._id === id);
  //   // if (isItemExists) {
  //   //   toast.error("Item already in cart!");
  //   // } else {
  //   if (data.stock < 1) {
  //     toast.error("Product stock limited!");
  //   } else {
  //     const cartData = {
  //       product: data?._id,
  //       shop: data?.shop?._id,
  //       color: data?.colors[0],
  //       count,
  //       price: data?.discountPrice,
  //     };
  //     // console.log(cartData);

  //     addToCart(cartData);
  //   }
  // };

  // const { data: wishlistData } = useGetWishlistQuery({});
  // console.log("Wishlist :", wishlistData);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Item added to Cart successfully!");
  //     //   refetch();
  //   }
  //   if (addWishlistSuccess) {
  //     toast.success("Product Added to Wishlist Successfully");
  //     setClick(!click);
  //   }
  //   if (removeWishlistSuccess) {
  //     toast.success("Product Removed from wishlist Successfully");
  //     setClick(!click);
  //   }
  //   if (error) {
  //     if ("data" in error) {
  //       const errorData = error?.data as Error;
  //       toast.error(errorData?.message);
  //     }
  //   }
  //   if (removeWishlistError) {
  //     if ("data" in removeWishlistError) {
  //       const errorData = removeWishlistError?.data as Error;
  //       toast.error(errorData?.message);
  //     }
  //   }
  //   if (addWishlistError) {
  //     if ("data" in addWishlistError) {
  //       const errorData = addWishlistError?.data as Error;
  //       toast.error(errorData?.message);
  //     }
  //   }
  // }, [
  //   isSuccess,
  //   error,
  //   removeWishlistError,
  //   addWishlistError,
  //   addWishlistSuccess,
  //   removeWishlistSuccess,
  // ]);

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpen(false));

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen  top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div
            ref={modalRef}
            className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4"
          >
            <RxCross1
              title="Close"
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex gap-2 mt-5">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data?.images && data?.images[0]?.url}`}
                  alt={data?.name}
                  className="w-full h-[300px] object-cover"
                />
                <div className="flex mt-4">
                  <Link
                    to={`/shop/preview/${data?.shop?._id}`}
                    className="flex items-center justify-center"
                    aria-label="Shop Preview"
                    title="Shop Preview"
                  >
                    <img
                      src={`${data.images && data.images[0]?.url}`}
                      alt={data?.name}
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <h3 className={`${styles.shop_name}`}>
                        {data?.shop?.name}
                      </h3>
                      <h5 className="text-[15px]">{data?.ratings} Ratings</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" size={20} />
                  </span>
                </div>
                <h5 className="text-[16px] ml-1 text-[red] mt-5">
                  ({data?.sold_out}) Sold out
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data?.name}
                </h1>
                <p>{data?.description}</p>

                <div className="flex mt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    &#8377;. {data?.discountPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    &#8377;. {data?.originalPrice ? data?.originalPrice : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlist(data)}
                        color={click ? "red" : "#333"}
                        title="Remove From wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlist(data)}
                        title="Add To Wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCart({ data, count })}
                >
                  <span className="text-[#fff] text-[18px] flex items-center">
                    Add to Cart{" "}
                    <AiOutlineShoppingCart
                      title="Add To Cart"
                      color="white"
                      size={22}
                      className="ml-1"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
