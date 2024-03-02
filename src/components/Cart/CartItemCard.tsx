import { FaSquareFull } from "react-icons/fa6";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { IProductInCart } from "../../types/cart";
import toast from "react-hot-toast";
import { useState } from "react";
import styles from "../../styles/styles";

interface ICartSingleCard {
  data: IProductInCart;
  quantityChangeHandler: any;
  removeFromCartHandler: (cartData: IProductInCart) => void;
}

const CartItemCard = ({
  data,
  quantityChangeHandler,
  removeFromCartHandler,
}: ICartSingleCard) => {
  const [value, setValue] = useState(data?.count ?? 0);
  const totalPrice = data?.price * value;

  console.log(data?.count);

  const increment = (data: IProductInCart) => {
    if (data.product.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const cartData = {
        productId: data?.productId,
        shopId: data?.shopId,
        price: data?.price,
        color: data?.color,
        count: value,
      };
      quantityChangeHandler(cartData);
    }
  };

  const decrement = (data: IProductInCart) => {
    setValue(value === 1 ? 1 : value - 1);
    // const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    const cartData = {
      productId: data?.productId,
      shopId: data?.shopId,
      price: data?.price,
      color: data?.color,
      count: value,
    };
    console.log("Cartadded:", cartData);

    quantityChangeHandler(cartData);
  };

  return (
    <div className="border rounded-md border-blue-200 flex items-center justify-between bg-blue-50 p-3 mx-1">
      <div className="w-full flex items-center gap-2">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus title="Increase Count" size={18} color="#fff" />
          </div>
          <span>{data?.count}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus title="Decrease Count" size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data?.product && data?.product?.images[0]?.url}`}
          alt={data?.product?.name}
          className="w-[100px] h-[100px] object-cover ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1 className="text-black text-[20px] text-semibold">
            {data?.product?.name}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <h4 className="font-[400] text-[18px] text-[#00000082]">
              &#8377;. {data?.price} &times; {value} =
            </h4>
            <h4 className="font-[600] text-[18px] pt-[3px] text-[#d02222] font-Roboto">
              &#8377;. {totalPrice}
            </h4>
          </div>
          <div>
            <h1 className="text-[15px] flex items-center justify-center gap-2">
              <div className={` text-[${data?.color}] font-semibold`}>
                {" "}
                Color:
              </div>
              <div className={`pr-4 text-[${data?.color}]`}>
                <FaSquareFull title="Color" size={18} />
              </div>
            </h1>
          </div>
        </div>
      </div>
      <RxCross1
        title="Remove From Cart"
        className="cursor-pointer"
        onClick={() => removeFromCartHandler(data)}
      />
    </div>
  );
};

export default CartItemCard;
