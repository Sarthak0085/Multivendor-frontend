import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { addTocart } from "../../redux/actions/cart";

interface IEvent {
  active?: boolean;
  data: any;
}

const EventCard = ({ active, data }: IEvent) => {
  // const { cart } = useSelector((state) => state.cart);

  const addToCartHandler = (data) => {
    // const isItemExists = cart && cart.find((i) => i._id === data._id);
    // if (isItemExists) {
    //   toast.error("Item already in cart!");
    // } else {
    //   if (data.stock < 1) {
    //     toast.error("Product stock limited!");
    //   } else {
    //     const cartData = { ...data, qty: 1 };
    //     dispatch(addTocart(cartData));
    //     toast.success("Item added to cart successfully!");
    //   }
    // }
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
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
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
