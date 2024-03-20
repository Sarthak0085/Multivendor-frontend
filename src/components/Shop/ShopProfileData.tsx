import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import ProductCard from "../Products/ProductCard";
import Ratings from "../Products/Ratings";
import { useGetAllShopProductsQuery } from "../../redux/features/product/productApi";
import { useGetAllShopEventsQuery } from "../../redux/features/events/eventApi";
import Loader from "../Layout/Loader";
import { IProduct, IReview } from "../../types/product";

const ShopProfileData = ({ isOwner }: { isOwner: boolean }) => {
  const { id } = useParams();

  const { data: productData, isLoading: productLoading } =
    useGetAllShopProductsQuery(id, {});
  const { data: eventData, isLoading: eventLoading } = useGetAllShopEventsQuery(
    id,
    {}
  );

  // console.log(eventData);

  const [active, setActive] = useState(1);

  const allReviews =
    productData?.products &&
    productData?.products.map((product: IProduct) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <button className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </button>
          <button className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </button>

          <button className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </button>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {active === 1 && productLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[20px] mb-12 border-0">
          {productData?.products &&
            productData?.products.map((i: IProduct, index: number) => (
              <ProductCard data={i} key={index} />
            ))}
        </div>
      )}

      {active === 2 &&
        (eventLoading ? (
          <Loader />
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[20px] mb-12 border-0">
              {eventData?.events &&
                eventData?.events.map((i: any, index: number) => (
                  <ProductCard data={i} key={index} isEvent={true} />
                ))}
            </div>
            {eventData?.events && eventData?.events.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No Events have for this shop!
              </h5>
            )}
          </div>
        ))}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item: IReview, index: number) => (
              <div key={index} className="w-full flex my-4">
                <img
                  src={`${item.user.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.fullName}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews have for this shop!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
