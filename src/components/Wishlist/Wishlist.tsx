import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { AiOutlineHeart } from "react-icons/ai";
import { CgTrashEmpty } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "../../hooks/useClickOutside";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../../redux/features/cart/cartApi";
import {
  useEmptyWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../redux/features/wishlist/wishlistApi";
import styles from "../../styles/styles";
import { IProductInWishlist } from "../../types/wishlist";
import Loader from "../Layout/Loader";
import WishlistItemCard from "./WishlistItemCard";
import { setErrorOptions, setSuccessOptions } from "../options";

const Wishlist = ({
  setOpenWishlist,
  user,
}: {
  setOpenWishlist: (openWishlist: boolean) => void;
  user: any;
}) => {
  const {
    data: wishlistData,
    isLoading,
    refetch,
  } = useGetWishlistQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });
  const [
    removeFromWishlist,
    { isSuccess: removeWishlistSuccess, error: removeWishlistError },
  ] = useRemoveFromWishlistMutation();
  const [emptyWishlist, { isSuccess: emptySuccess, error: emptyError }] =
    useEmptyWishlistMutation();
  const [addTocart, { error }] = useAddToCartMutation();

  const removeFromWishlistHandler = async (data: IProductInWishlist) => {
    const wishlistData = {
      productId: data?.product?._id,
      shopId: data?.shopId,
      color: data?.color,
      price: data?.price,
    };
    await removeFromWishlist(wishlistData);
  };

  const { refetch: cartRefetch } = useGetCartQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });

  const handleEmptyWishlist = () => {
    emptyWishlist({});
  };

  const addToCartHandler = async ({
    data,
    value,
  }: {
    data: IProductInWishlist;
    value: number;
  }) => {
    const cartData = {
      productId: data?.product?._id,
      shopId: data?.shopId,
      price: data?.price,
      color: data?.color,
      count: value,
    };
    const response = await addTocart(cartData);
    console.log(response);

    if ("data" in response) {
      const dataResponse = response?.data;
      if (dataResponse?.success === true) {
        toast.success("Item added to Cart", {
          style: setSuccessOptions,
        });
        cartRefetch();
        await removeFromWishlistHandler(data);
      }
    }
  };

  useEffect(() => {
    // if (isSuccess) {
    //   toast.success("Item added to Cart successfully!");
    //   setOpenWishlist(false);
    // }
    if (removeWishlistSuccess) {
      const wishlist = "Product Removed from wishlist Successfully";
      toast.success(wishlist, {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (emptySuccess) {
      toast.success("Wishlist Empty Successfully.", {
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
      } else {
        toast.error("An error occured.", {
          style: setErrorOptions,
        });
      }
    }
    if (removeWishlistError) {
      if ("data" in removeWishlistError) {
        const errorData = removeWishlistError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An error occured.", {
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
        toast.error("An error occured.", {
          style: setErrorOptions,
        });
      }
    }
  }, [
    error,
    removeWishlistError,
    refetch,
    removeWishlistSuccess,
    emptySuccess,
    emptyError,
  ]);

  console.log(wishlistData);

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setOpenWishlist(false));

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[70%] overflow-y-scroll 800px:w-[55%] 1100px:w-[45%] 1300px:w-[35%] bg-white flex flex-col justify-between shadow-sm">
        {isLoading ? (
          <Loader />
        ) : wishlistData?.wishlist &&
          wishlistData?.wishlist?.products.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                title="Close"
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className="text-[30px] text-red-500">
              Your Wishlist is empty!
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  title="Close"
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4 text-[red]`}>
                <AiOutlineHeart title="Your Wishlist" size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlistData?.wishlist &&
                    wishlistData?.wishlist.products.length}{" "}
                  Wishlist{" "}
                  {wishlistData?.wishlist &&
                  wishlistData?.wishlist.products.length === 1
                    ? "Item"
                    : "Items"}
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlistData?.wishlist &&
                  wishlistData?.wishlist?.products.map(
                    (i: IProductInWishlist, index: number) => (
                      <WishlistItemCard
                        key={index}
                        data={i}
                        removeFromWishlistHandler={removeFromWishlistHandler}
                        addToCartHandler={addToCartHandler}
                      />
                    )
                  )}
              </div>
            </div>

            <div className="px-5 mb-3 flex items-center justify-center">
              {/* checkout buttons */}
              <div
                className={`h-[45px] w-[100%] flex items-center justify-center 800px:w-[90%] bg-[#3ca4ff] rounded-[5px]`}
              >
                <button
                  onClick={() => handleEmptyWishlist()}
                  className="text-[#fff] flex gap-2  text-[18px] font-[600]"
                >
                  <CgTrashEmpty title="Empty Wishlist" size={25} /> Empty
                  Wishlist
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
