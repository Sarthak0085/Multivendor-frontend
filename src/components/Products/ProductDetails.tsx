import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillHeart,
  AiOutlineHeart,
  // AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../../redux/features/cart/cartApi";
import { useGetAllShopProductsQuery } from "../../redux/features/product/productApi";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../redux/features/wishlist/wishlistApi";
import styles from "../../styles/styles";
import { IEvent } from "../../types/event";
import { IProduct, IReview } from "../../types/product";
import Loader from "../Layout/Loader";
import ProductDetailsInfo from "./ProductDetailsInfo";

const ProductDetails = ({ data }: { data: IProduct | IEvent }) => {
  const { user, seller } = useSelector((state: any) => state.auth);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const selectImage = data?.images[0]?.url;
  const [select, setSelect] = useState<string>(selectImage ?? null);
  const [colorSelect, setColorSelect] = useState<string>(data?.colors[0]);
  const [sizeSelect, setSizeSelect] = useState<string>(data?.sizes[0]);
  console.log(sizeSelect);

  const { data: productData, isLoading } = useGetAllShopProductsQuery(
    seller?._id,
    {}
  );
  const [
    addToWishlist,
    { isSuccess: addWishlistSuccess, error: addWishlistError },
  ] = useAddToWishlistMutation();
  const { refetch } = useGetCartQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });
  const [
    removeFromWishlist,
    { isSuccess: removeWishlistSuccess, error: removeWishlistError },
  ] = useRemoveFromWishlistMutation();
  // console.log(data);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data: IProduct | IEvent) => {
    const wishlistData = {
      productId: data?._id,
      shopId: data?.shop?._id,
      color: colorSelect,
      size: sizeSelect,
      category: data?.category,
      price: data?.discountPrice,
    };
    removeFromWishlist(wishlistData);
  };

  const addToWishlistHandler = (data: IProduct | IEvent) => {
    const wishlistData = {
      productId: data?._id,
      shopId: data?.shop?._id,
      color: colorSelect,
      size: sizeSelect,
      category: data?.category,
      price: data?.discountPrice,
    };
    addToWishlist(wishlistData);
  };

  const [addToCart, { isSuccess, error }] = useAddToCartMutation();

  const addToCartHandler = (data: IProduct | IEvent) => {
    if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = {
        product: data?._id,
        shop: data?.shop?._id,
        color: colorSelect,
        size: sizeSelect,
        category: data?.category,
        count,
        price: data?.discountPrice,
        gender: data?.gender,
      };
      // console.log(cartData);

      addToCart(cartData);
    }
  };

  const { data: wishlistData, refetch: wishlistRefetch } = useGetWishlistQuery(
    user?._id,
    { refetchOnMountOrArgChange: true }
  );
  console.log("Wishlist :", wishlistData);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item added to Cart successfully!");
      refetch();
    }
    if (addWishlistSuccess) {
      toast.success("Product Added to Wishlist Successfully");
      setClick(!click);
      wishlistRefetch();
    }
    if (removeWishlistSuccess) {
      toast.success("Product Removed from wishlist Successfully");
      setClick(!click);
      wishlistRefetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message);
      }
    }
    if (removeWishlistError) {
      if ("data" in removeWishlistError) {
        const errorData = removeWishlistError?.data as Error;
        toast.error(errorData?.message);
      }
    }
    if (addWishlistError) {
      if ("data" in addWishlistError) {
        const errorData = addWishlistError?.data as Error;
        toast.error(errorData?.message);
      }
    }
  }, [
    isSuccess,
    error,
    removeWishlistError,
    addWishlistError,
    addWishlistSuccess,
    removeWishlistSuccess,
  ]);

  const totalReviewsLength =
    productData?.products &&
    productData?.products.reduce(
      (acc: number, product: IProduct) => acc + product.reviews.length,
      0
    );

  const totalRatings =
    productData?.products &&
    productData?.products.reduce(
      (acc: number, product: IProduct) =>
        acc +
        product.reviews.reduce(
          (sum: number, review: IReview) => sum + review.rating,
          0
        ),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  // const handleMessageSubmit = async () => {};

  return (
    <div className="bg-white">
      {isLoading ? (
        <Loader />
      ) : data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[100%]`}>
          <div className="w-full py-5 mb-80 500px:mb-70 800px:mb-10">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <div className="flex flex-col 1300px:flex-row 1300px:gap-5">
                  <img
                    src={`${data && select}`}
                    alt={`${data}`}
                    className="w-[100%] 800px:w-[90%] h-[450px] 500px:h-[600px] 800px:h-[500px] 1100px:h-[650px]"
                  />
                  <div className="w-[100%] 800px:w-[90%] 1300px:w-[20%] 1300px:flex-col flex">
                    {data &&
                      data.images.map(
                        (
                          i: { public_id: string; url: string },
                          index: number
                        ) => (
                          <div
                            key={index}
                            className={`${
                              select === i.url
                                ? "border border-blue-500 scale-110"
                                : "null"
                            } cursor-pointer mr-5 mt-5`}
                          >
                            <img
                              src={`${i?.url}`}
                              alt={i.url}
                              className="w-[150px] h-[100px] object-cover overflow-hidden"
                              onClick={() => setSelect(i.url)}
                            />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] h-[450px] pt-5">
                <div className="w-[100%] 800px:w-[90%] 800px:pl-[20px]">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3 mb-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      &#x20B9;{data.discountPrice}
                    </h4>
                    <h3 className={`${styles.price}`}>
                      &#x20B9;{data.originalPrice ? data.originalPrice : null}
                    </h3>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Select Color:
                    </span>
                    <div className="flex items-center mt-2">
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
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-700">
                      Select Size:
                    </span>
                    <div className="flex items-center mt-2 gap-4">
                      {data?.sizes?.map((size: string, index: number) => {
                        console.log(size);

                        return (
                          <button
                            key={index}
                            onClick={() => setSizeSelect(size)}
                            className={`w-[60px] h-[60px] rounded-md font-semibold text-black bg-white border border-solid border-black ${
                              sizeSelect === size && "!bg-teal-500 !text-white"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-2 flex  flex-wrap gap-4">
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700">
                        Category:
                      </span>
                      <span className="flex items-center font-medium gap-4 text-[blue]">
                        {data?.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700">Brand:</span>
                      <span className="flex items-center font-medium gap-4 text-[blue]">
                        {data?.brand}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700">Gender:</span>
                      <span className="flex items-center font-medium gap-4 text-[blue]">
                        {data?.gender}
                      </span>
                    </div>
                  </div>
                  {/* <Ratings
                    rating={
                      data ? data?.reviews !== undefined && data?.reviews?.rating : 0
                    }
                  /> */}
                  <div className="flex items-center mt-8 justify-between w-[90%] pr-3">
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
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    onClick={() => addToCartHandler(data)}
                  >
                    <span className="text-white flex items-center">
                      Add to Cart{" "}
                      <AiOutlineShoppingCart
                        className="ml-1"
                        title="Add to Cart"
                      />
                    </span>
                  </div>
                  <div className="flex items-center pt-8">
                    <Link to={`/shop/preview/${data?.shop?._id}`}>
                      <img
                        src={`${
                          data?.shop?.avatar
                            ? data?.shop?.avatar?.url
                            : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
                        }`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>
                    <div className="pr-8">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                          {data.shop.name}
                        </h3>
                      </Link>
                      <h5 className="pb-3 text-[15px]">
                        ({averageRating}/5) Ratings
                      </h5>
                    </div>
                  </div>
                  {/* <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <br />
          <br />
          <br /> */}
          <ProductDetailsInfo
            data={data}
            products={productData?.products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
