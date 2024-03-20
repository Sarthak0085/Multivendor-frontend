import toast from "react-hot-toast";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IProductInCart } from "../../types/cart";
import { useEffect } from "react";

interface ICartSingleCard {
  data: IProductInCart;
  quantityChangeHandler: any;
  removeFromCartHandler: (cartData: IProductInCart) => void;
  color: string;
  setColor: (color: string) => void;
  size: string;
  setSize: (size: string) => void;
  value: number;
  setValue: (value: number) => void;
}

const CartItemCard = ({
  data,
  quantityChangeHandler,
  removeFromCartHandler,
  color,
  setColor,
  size,
  setSize,
  value,
  setValue,
}: ICartSingleCard) => {
  const totalPrice = data?.price * value;
  // console.log(data.count);

  const increment = () => {
    if (data.product.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
    }
  };

  const addToCart = () => {
    const cartData = {
      productId: data?.productId,
      shopId: data?.shopId,
      price: data?.price,
      color: color || data?.color,
      count: value,
      size: size || data?.size,
      gender: data?.product?.gender,
    };
    quantityChangeHandler(cartData);
  };

  const decrement = () => {
    setValue(value === 1 ? 1 : value - 1);
  };

  useEffect(() => {
    setValue(data?.count);
    setSize(data?.size);
    setColor(data?.color);
  }, []);

  useEffect(() => {
    addToCart();
  }, [color, size, value]);

  return (
    <div className="border rounded-md border-blue-200 flex items-center justify-between bg-blue-50 p-3 mx-1">
      <div className="w-full flex items-center gap-2">
        <div className="flex flex-col items-center justify-center">
          <button
            disabled={data?.product?.stock < value}
            aria-disabled={data?.product?.stock < value}
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${
              styles.noramlFlex
            }
             justify-center cursor-pointer ${
               data?.product?.stock < value && "!cursor-not-allowed"
             }`}
            onClick={() => increment()}
          >
            <HiPlus title="Increase Count" size={18} color="#fff" />
          </button>
          <span>{value || data?.count}</span>
          <button
            disabled={value === 1}
            aria-disabled={value === 1}
            className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer ${
              value === 1 && "!cursor-not-allowed"
            }`}
            onClick={() => decrement()}
          >
            <HiOutlineMinus title="Decrease Count" size={16} color="#7d879c" />
          </button>
        </div>
        <img
          src={`${data?.product && data?.product?.images[0]?.url}`}
          alt={data?.product?.name}
          className="w-[100px] h-[150px] object-cover ml-2 mr-2 rounded-[5px]"
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
                  style={{ backgroundColor: `${color}` }}
                  className={`appearance-none text-transparent cursor-pointer w-5 h-5 rounded-full`}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
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
      <RxCross1
        title="Remove From Cart"
        size={22}
        className="cursor-pointer ml-4 flex justify-end"
        onClick={() => removeFromCartHandler(data)}
      />
    </div>
  );
};

export default CartItemCard;
