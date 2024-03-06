import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../../redux/features/cart/cartApi";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../redux/features/wishlist/wishlistApi";
import styles from "../../styles/styles";
import { IProduct } from "../../types/product";
import { IProductInWishlist } from "../../types/wishlist";
import ProductDetailsCard from "../Route/ProductDetailsCard/ProductDetailsCard";
import { setSuccessOptions } from "../options";
import Ratings from "./Ratings";

const ProductCard = ({
  data,
  isEvent,
}: // isShop,
{
  data: IProduct;
  isEvent?: boolean;
  // isShop?: boolean;
}) => {
  const { user } = useSelector((state: any) => state?.auth);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: wishlistData, refetch } = useGetWishlistQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });
  const [addToCart, { isSuccess, error }] = useAddToCartMutation();
  const [addToWishlist, { isSuccess: addSuccess, error: addError }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isSuccess: removeSuccess, error: removeError }] =
    useRemoveFromWishlistMutation();
  const { refetch: cartRefetch } = useGetCartQuery(user?._id, {});

  useEffect(() => {
    if (wishlistData?.wishlist) {
      const isInWishlist = wishlistData?.wishlist.products.some(
        (i: IProductInWishlist) => i.product?._id === data?._id
      );
      if (isInWishlist) {
        setClick(true);
      } else {
        setClick(false);
      }
    }
  }, [wishlistData, data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product added to Cart successfully!", {
        style: setSuccessOptions,
      });
      cartRefetch();
    }
    if (addSuccess && click === false) {
      toast.success("Product Added To Wishlist Successfully.", {
        style: setSuccessOptions,
      });
      setClick(!click);
      refetch();
    }
    if (removeSuccess && click === true) {
      toast.success("Product Removed From Wishlist Successfully.", {
        style: setSuccessOptions,
      });
      setClick(!click);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message);
      }
    }
    if (addError) {
      if ("data" in addError) {
        const errorData = addError?.data as Error;
        toast.error(errorData?.message);
      }
    }
    if (removeError) {
      if ("data" in removeError) {
        const errorData = removeError?.data as Error;
        toast.error(errorData?.message);
      }
    }
  }, [
    isSuccess,
    error,
    addError,
    removeError,
    cartRefetch,
    refetch,
    addSuccess,
    removeSuccess,
  ]);

  const removeFromWishlistHandler = async (data: IProduct) => {
    const wishlistData = {
      productId: data?._id,
      shopId: data?.shop?._id,
      color: data?.colors[0],
      price: data?.discountPrice,
    };
    await removeFromWishlist(wishlistData);
  };

  const addToWishlistHandler = async (data: IProduct) => {
    const wishlistData = {
      productId: data?._id,
      shopId: data?.shop?._id,
      color: data?.colors[0],
      price: data?.discountPrice,
    };
    console.log("Wishlist :", wishlistData);

    await addToWishlist(wishlistData);
  };

  const addToCartHandler = async ({
    data,
    count = 1,
  }: {
    data: IProduct;
    count?: number;
  }) => {
    if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = {
        productId: data?._id,
        shopId: data?.shop?._id,
        color: data?.colors[0],
        count,
        price: data?.discountPrice,
      };
      console.log(cartData);

      await addToCart(cartData);
    }
  };

  const [show, setShow] = useState(false);

  const windowSize = useWindowSize();

  return (
    <>
      <div
        onMouseEnter={() => {
          if (windowSize.width > 768) {
            setShow(true);
          }
        }}
        onMouseLeave={() => setShow(false)}
        className={`w-full sm:w-[300px] border border-blue-200 max-w-[350px] h-[370px]
       bg-white rounded-lg shadow-sm relative cursor-pointer mr-5`}
      >
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[220px] object-cover mb-4"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name} px-2`}>{data.shop.name}</h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <h4 className="pb-3 px-2 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex px-2">
            <Ratings rating={data?.ratings ? data?.ratings : 0} />
          </div>

          <div className="py-2 px-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                &#8377;.{" "}
                {data.discountPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice !== data?.discountPrice
                  ? "₹. " + data.originalPrice
                  : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        {show && (
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={25}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => addToWishlistHandler(data)}
                color={click ? "red" : "#FF0000"}
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={25}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color="#0000FF"
              title="Quick Product Preview"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler({ data })}
              color="#3bc177"
              title="Add to cart"
            />
            {open ? (
              <ProductDetailsCard
                click={click}
                addToCart={addToCartHandler}
                addToWishlist={addToWishlistHandler}
                removeFromWishlist={removeFromWishlistHandler}
                setOpen={setOpen}
                data={data}
              />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
