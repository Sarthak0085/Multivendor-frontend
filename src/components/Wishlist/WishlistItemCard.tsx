import { useState } from "react";
import toast from "react-hot-toast";
import { BsCartPlus } from "react-icons/bs";
import { FaSquareFull } from "react-icons/fa6";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { IProductInWishlist } from "../../types/wishlist";
import styles from "../../styles/styles";

interface IWishlistCard {
  data: IProductInWishlist;
  removeFromWishlistHandler: (data: IProductInWishlist) => void;
  addToCartHandler: ({
    data,
    value,
  }: {
    data: IProductInWishlist;
    value: number;
  }) => void;
}

const WishlistItemCard = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
}: IWishlistCard) => {
  const [value, setValue] = useState<number>(1);
  const totalPrice = data?.price * value;

  const increment = () => {
    if (data?.product?.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    setValue(value === 1 ? 1 : value - 1);
  };

  return (
    <div className="border bg-blue-50 rounded-md flex items-center justify-between border-blue-200 p-2 mx-1">
      <div className="w-full 800px:flex items-center gap-2">
        <RxCross1
          title="Remove From Wishlist"
          size={20}
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 mr-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
        />
        <div className="flex flex-col justify-center h-[100px] space-y-1 items-center">
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[30px] h-[30px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment()}
          >
            <HiPlus title="Increase Count" size={18} color="#fff" />
          </div>
          <span className="text-[18px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement()}
          >
            <HiOutlineMinus title="Descrease Count" size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data?.product?.images[0]?.url}`}
          alt={data?.product?.name}
          className="w-[130px] h-[100px] ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px] space-y-1 ">
          <h1 className=" font-semibold text-[20px]">{data?.product?.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            &#8377;. {totalPrice}
          </h4>
          <h3 className="text-[15px] flex gap-2 items-center">
            <div className={` text-[${data?.color}] font-semibold`}>
              {" "}
              Color:
            </div>
            <div className={`pr-4 text-[${data?.color}]`}>
              <FaSquareFull size={18} title="color" />
            </div>
          </h3>
          <h3 className="text-[15px] flex items-center justify-center gap-2">
            <div className={`font-semibold`}> Category:</div>
            <div className={`text-[${data?.color}]`}>
              {data?.product?.category}
            </div>
          </h3>
        </div>
      </div>
      <div>
        <BsCartPlus
          size={25}
          className="cursor-pointer mr-2"
          title="Add to cart"
          onClick={() => addToCartHandler({ data, value })}
        />
      </div>
    </div>
  );
};

export default WishlistItemCard;
