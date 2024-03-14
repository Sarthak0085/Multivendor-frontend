import { useState } from "react";
import toast from "react-hot-toast";
import { BsCartPlus } from "react-icons/bs";
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
    color,
    size,
  }: {
    data: IProductInWishlist;
    value: number;
    color: string;
    size: string;
  }) => void;
  color: string;
  setColor: (color: string) => void;
  size: string;
  setSize: (size: string) => void;
  isLoading: boolean;
}

const WishlistItemCard = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
  color,
  setColor,
  size,
  isLoading,
  setSize,
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
          aria-label="Remove From Wishlist"
          title="Remove From Wishlist"
          size={30}
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 mr-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
        />
        <div className="flex flex-col justify-center h-[100px] space-y-1 items-center">
          <button
            aria-label="Increase Count"
            disabled={data?.product?.stock < value}
            aria-disabled={data?.product?.stock < value}
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[30px] h-[30px] ${
              styles.noramlFlex
            } ${
              value === data?.product?.stock && "!cursor-not-allowed"
            } justify-center cursor-pointer`}
            onClick={() => increment()}
          >
            <HiPlus title="Increase Count" size={18} color="#fff" />
          </button>
          <span className="text-[18px]">{value}</span>
          <button
            disabled={value === 1}
            aria-disabled={value === 1 ? true : false}
            className={`bg-[#a7abb14f] rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer ${
              value === 1 && "!cursor-not-allowed"
            }`}
            onClick={() => decrement()}
          >
            <HiOutlineMinus
              aria-label="Decrease Count"
              title="Descrease Count"
              size={16}
              color="#7d879c"
            />
          </button>
        </div>
        <img
          src={`${data?.product?.images[0]?.url}`}
          alt={data?.product?.name}
          className="w-[130px] h-[150px] ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1 className="text-black text-[20px] text-semibold">
            {data?.product?.name}
          </h1>
          <div className="flex items-center gap-2">
            <h4 className="font-[400] text-[18px] text-[#00000082]">
              &#8377;. {data?.price} &times; {value} =
            </h4>
            <h4 className="font-[600] text-[18px] pt-[3px] text-[#d02222] font-Roboto">
              &#8377;. {totalPrice}
            </h4>
          </div>
          <div className="space-y-1 mt-2">
            <div className="flex flex-wrap gap-4">
              <div className="text-[15px] flex items-center gap-2">
                <div className={` text-[${data?.color}] font-semibold`}>
                  {" "}
                  Color:
                </div>
                <select
                  style={{ color: `${color}` }}
                  className={`appearance-none cursor-pointer border p-[1px] px-[8px] font-medium border-[blue] rounded-md`}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value={data?.color} className="font-medium">
                    {color || data?.color}
                  </option>
                  {data?.product?.colors.length > 1 &&
                    data?.product?.colors?.map((item: any, index: number) => (
                      <option
                        key={index}
                        value={item}
                        style={{ color: `${item}` }}
                        className={`block font-medium text-black bg-slate-200`}
                      >
                        {item}
                      </option>
                    ))}
                </select>
              </div>
              <div className="text-[15px] flex items-center gap-2">
                <div className={` text-[${data?.color}] font-semibold`}>
                  {" "}
                  Size:
                </div>
                <select
                  className={`appearance-none cursor-pointer border p-[1px] px-[8px] font-medium text-white bg-black border-black rounded-md`}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option
                    value={data?.size}
                    className="block text-[15px] font-normal bg-slate-200 "
                  >
                    {size || data?.size}
                  </option>
                  {data?.product &&
                    data?.product?.sizes?.map((item: any, index: number) => (
                      <option
                        className="block font-normal text-black bg-slate-200 hover:text-white hover:bg-slate-700"
                        key={index}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex gap-2">
                <div className={`font-semibold`}> Gender:</div>
                <div className={`font-medium text-[blue] rounded-md`}>
                  {data?.product?.gender}
                </div>
              </div>
              <div className="flex gap-2">
                <div className={`font-semibold`}>Category:</div>
                <div className={`font-medium text-[blue] rounded-md`}>
                  {data?.product?.category}
                </div>
              </div>
              <div className="flex gap-2">
                <div className={`font-semibold`}>Brand:</div>
                <div className={`font-medium text-[blue] rounded-md`}>
                  {data?.product?.brand}
                </div>
              </div>
            </div>
            <div className="text-[15px] flex flex-wrap items-center gap-2"></div>
          </div>
        </div>
      </div>
      <button
        onClick={() => addToCartHandler({ data, value, color, size })}
        aria-label="Add to Cart"
        disabled={isLoading}
        aria-disabled={isLoading}
      >
        <BsCartPlus
          size={25}
          className="cursor-pointer mr-2"
          title="Add to cart"
        />
      </button>
    </div>
  );
};

export default WishlistItemCard;
