import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useShopLogoutMutation } from "../../redux/features/auth/authApi";
import { useGetAllShopProductsQuery } from "../../redux/features/product/productApi";
import { useShopInfoByIdQuery } from "../../redux/features/shop/shopApi";
import styles from "../../styles/styles";
import { IProduct, IReview } from "../../types/product";
import Loader from "../Layout/Loader";
import { setErrorOptions, setSuccessOptions } from "../options";

const ShopInfo = ({ isOwner }: { isOwner: boolean }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllShopProductsQuery(id, {});
  const [logout, { isSuccess, error, isLoading: logoutLoading }] =
    useShopLogoutMutation();

  const { data: shopInfo, isLoading: shopLoading } = useShopInfoByIdQuery(
    id,
    {}
  );
  console.log("Shop: ", shopInfo, "id: ", id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged Out Successfully", {
        style: setSuccessOptions,
      });
      navigate("/shop-login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An unknown error occured.");
      }
    }
  }, [isSuccess, error, navigate]);

  const logoutHandler = async () => {
    await logout({});
  };

  const totalReviewsLength =
    data?.products &&
    data?.products.reduce(
      (acc: number, product: IProduct) => acc + product.reviews.length,
      0
    );

  const totalRatings =
    data?.products &&
    data?.products.reduce(
      (acc: number, product: IProduct) =>
        acc +
        product.reviews.reduce(
          (sum: number, review: IReview) => sum + review.rating,
          0
        ),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading && shopLoading ? (
        <Loader />
      ) : (
        shopInfo?.seller && (
          <div>
            <div className="w-full py-5">
              <div className="w-full flex item-center justify-center">
                <img
                  src={`${
                    shopInfo?.seller?.avatar
                      ? shopInfo?.seller?.avatar?.url
                      : "https:"
                  }`}
                  alt={shopInfo?.seller?.name}
                  className="w-[150px] h-[150px] object-cover rounded-full"
                />
              </div>
              <h3 className="text-center py-2 text-[20px]">
                {shopInfo?.seller?.name}
              </h3>
              <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                {shopInfo?.seller?.description}
              </p>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Address</h5>
              <h4 className="text-[#000000a6]">{shopInfo?.seller?.address}</h4>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Phone Number</h5>
              <h4 className="text-[#000000a6]">
                {shopInfo?.seller?.phoneNumber}
              </h4>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Total Products</h5>
              <h4 className="text-[#000000a6]">
                {data?.products && data?.products?.length}
              </h4>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Shop Ratings</h5>
              <h4 className="text-[#000000b0]">{averageRating}/5</h4>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Joined On</h5>
              <h4 className="text-[#000000b0]">
                {shopInfo?.seller?.createdAt?.slice(0, 10)}
              </h4>
            </div>
            {isOwner && (
              <div className="py-3 px-4">
                <Link to="/settings">
                  <div
                    className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                  >
                    <span className="text-white">Edit Shop</span>
                  </div>
                </Link>
                <button
                  className={`${
                    styles.button
                  } !w-full !h-[42px] !rounded-[5px] ${
                    logoutLoading && "cursor-not-allowed"
                  }`}
                  onClick={logoutHandler}
                  disabled={logoutLoading}
                  aria-disabled={logoutLoading ? true : false}
                >
                  <span className="text-white">Log Out</span>
                </button>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default ShopInfo;
