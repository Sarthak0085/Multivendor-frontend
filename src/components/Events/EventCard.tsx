import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../../redux/features/cart/cartApi";
import { IEvent } from "../../types/event";
import { setErrorOptions, setSuccessOptions } from "../options";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { addTocart } from "../../redux/actions/cart";

const EventCard = ({ active, data }: { active?: boolean; data: IEvent }) => {
  const { user } = useSelector((state: any) => state?.auth);
  const [addToCart, { isSuccess, error }] = useAddToCartMutation();
  const { refetch } = useGetCartQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product added to Cart successfully!", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message);
      }
    }
  }, [isSuccess, error]);

  const addToCartHandler = async ({
    data,
    count = 1,
  }: {
    data: IEvent;
    count: number;
  }) => {
    if (data?.stock < 1) {
      toast.error("Stock data limited", {
        style: setErrorOptions,
      });
    } else {
      const cartData = {
        productId: data?._id,
        shopId: data?.shop?._id,
        color: data?.colors[0],
        size: data?.sizes[0],
        gender: data?.gender,
        count,
        price: data?.discountPrice,
      };
      console.log(cartData);

      await addToCart(cartData);
    }
  };
  return (
    <div
      className={`w-full block bg-gray-100 rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex justify-between items-center mx-3`}
    >
      <div className="w-full lg:w-[50%]">
        <img src={`${data?.images[0]?.url}`} alt="" />
      </div>
      <div className="w-full lg:w-[50%] lg:mx-[30px] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler({ data, count: 1 })}
          >
            <AiOutlineShoppingCart
              size={20}
              title="Add to cart"
              className="mr-2"
            />{" "}
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
