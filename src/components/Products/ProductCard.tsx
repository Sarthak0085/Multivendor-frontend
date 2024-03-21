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
  const [colorSelect, setColorSelect] = useState<string>(data?.colors[0]);
  const [sizeSelect, setSizeSelect] = useState<string>(data?.sizes[0]);

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
      color: colorSelect,
      price: data?.discountPrice,
      size: sizeSelect,
    };
    await removeFromWishlist(wishlistData);
  };

  const addToWishlistHandler = async (data: IProduct) => {
    const wishlistData = {
      productId: data?._id,
      shopId: data?.shop?._id,
      color: colorSelect,
      price: data?.discountPrice,
      size: sizeSelect,
    };
    // console.log("Wishlist :", wishlistData);

    await addToWishlist(wishlistData);
  };

  const addToCartHandler = async ({
    data,
    count = 1,
  }: {
    data: IProduct;
    count: number;
  }) => {
    if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = {
        productId: data?._id,
        shopId: data?.shop?._id,
        color: colorSelect,
        count: count || 1,
        price: data?.discountPrice,
        size: sizeSelect,
        gender: data?.gender,
      };
      // console.log(cartData);

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
        className={`w-[280px] 400px:w-[300px] border border-blue-200 max-w-[300px] h-[400px]
       bg-white rounded-lg shadow-sm relative cursor-pointer mr-5`}
      >
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
          aria-label={data?._id}
          title="Product Details Page"
        >
          <img
            src={`${data?.images && data?.images[0]?.url}`}
            alt={data?.name}
            className="w-full h-[220px] object-cover mb-4"
          />
        </Link>
        <Link
          to={`/shop/preview/${data?.shop._id}`}
          aria-label={data?.shop?._id}
          title="Shop Preview Page"
        >
          <h5 className={`${styles.shop_name} px-2`}>{data?.shop?.name}</h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
          aria-label={data?.name}
          title="Product Details Page"
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
        {(windowSize.width <= 768 || show) && (
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
                aria-label="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={25}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => addToWishlistHandler(data)}
                color={click ? "red" : "#FF0000"}
                title="Add to wishlist"
                aria-label="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={25}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color="#0000FF"
              title="Quick Product Preview"
              aria-label="Quick Product Preview"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler({ data, count: 1 })}
              color="#3bc177"
              title="Add to cart"
              aria-label="Add to cart"
            />
            <div className="mb-4 absolute left-1 400px:left-5 top-[150px]">
              <div className="flex items-center bg-transparent px-2 rounded-md">
                {data?.colors?.map((item: string, index: number) => (
                  <button
                    key={index}
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${item}  0%, ${item} 60%, white 50%, white 100%)`,
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={() => setColorSelect(item)}
                    className={`w-8 h-8 rounded-full mr-2 ${
                      colorSelect === item &&
                      "!border-solid !border-[2px] !border-teal-500"
                    }`}
                  ></button>
                ))}
              </div>
              <div className="flex items-center mt-2 gap-2 bg-transparent px-2 rounded-md">
                {data?.sizes?.map((size: string, index: number) => {
                  console.log(sizeSelect);

                  return (
                    <button
                      key={index}
                      onClick={() => setSizeSelect(size)}
                      className={`w-[30px] h-[30px] rounded-md font-semibold text-black bg-white border border-solid border-black ${
                        sizeSelect === size && "!bg-teal-500 !text-white"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            {open ? (
              <ProductDetailsCard
                click={click}
                addToCart={addToCartHandler}
                addToWishlist={addToWishlistHandler}
                removeFromWishlist={removeFromWishlistHandler}
                setOpen={setOpen}
                setColorSelect={setColorSelect}
                colorSelect={colorSelect}
                sizeSelect={sizeSelect}
                setSizeSelect={setSizeSelect}
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
