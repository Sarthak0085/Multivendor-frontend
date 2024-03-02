import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import Ratings from "./Ratings";
import { useGetAllShopProductsQuery } from "../../redux/features/product/productApi";
import toast from "react-hot-toast";
import { IProduct, IReview } from "../../types/product";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { IEvent } from "../../types/event";
import { useAddToCartMutation } from "../../redux/features/cart/cartApi";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../redux/features/wishlist/wishlistApi";

const ProductDetails = ({ data }: { data: IProduct | IEvent }) => {
  const { user, seller } = useSelector((state: any) => state.auth);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const selectImage = data?.images[0]?.url;
  const [select, setSelect] = useState<string>(selectImage ?? null);

  const navigate = useNavigate();
  const { data: productData, isLoading } = useGetAllShopProductsQuery(
    seller?._id,
    {}
  );
  const [
    addToWishlist,
    { isSuccess: addWishlistSuccess, error: addWishlistError },
  ] = useAddToWishlistMutation();
  const [
    removeFromWishlist,
    { isSuccess: removeWishlistSuccess, error: removeWishlistError },
  ] = useRemoveFromWishlistMutation();
  console.log(data);

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
      color: data?.colors[0],
      // category: data?.category,
      price: data?.discountPrice,
    };
    removeFromWishlist(wishlistData);
  };

  const addToWishlistHandler = (data: IProduct | IEvent) => {
    const wishlistData = {
      productId: data?._id,
      shopId: data?.shop?._id,
      color: data?.colors[0],
      // category: data?.category,
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
        color: data?.colors[0],
        count,
        price: data?.discountPrice,
      };
      console.log(cartData);

      addToCart(cartData);
    }
  };

  const { data: wishlistData } = useGetWishlistQuery(user?._id, {});
  console.log("Wishlist :", wishlistData);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item added to Cart successfully!");
      //   refetch();
    }
    if (addWishlistSuccess) {
      toast.success("Product Added to Wishlist Successfully");
      setClick(!click);
    }
    if (removeWishlistSuccess) {
      toast.success("Product Removed from wishlist Successfully");
      setClick(!click);
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

  const handleMessageSubmit = async () => {};

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[100%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && select}`}
                  alt=""
                  className="w-[100%] 800px:w-[90%] h-[450px]"
                />
                <div className="w-[100%] 800px:w-[90%] 1300px:w-[80%] flex">
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
                  <Ratings
                    rating={
                      data ? data?.reviews !== [] && data?.reviews?.rating : 0
                    }
                  />
                  <div className="flex items-center mt-12 justify-between w-[90%] pr-3">
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
                          data?.shop?.image
                            ? data?.shop?.image?.url
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
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={productData?.products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
