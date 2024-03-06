import { FormEvent, useState } from "react";
import styles from "../../styles/styles";
import { City, Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useGetCartQuery } from "../../redux/features/cart/cartApi";
import { useGetCouponValueQuery } from "../../redux/features/coupon/couponApi";
import { IProductInCart } from "../../types/cart";
import { IAddress, IUser } from "../../types/user";

const Checkout = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data: cartData } = useGetCartQuery(user?._id, {});
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState<number>(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState<number | null>(null);
  // const [name, setName] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<number | null>(null);
  const navigate = useNavigate();

  console.log("cartData :", cartData);

  const cart = cartData?.cart;

  const {
    data,
    // isLoading: couponLoading,
    refetch,
  } = useGetCouponValueQuery(couponCode, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    refetch();
  }, [couponCode]);

  console.log(user);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === "" ||
      state === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        state,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      console.log("order", orderData);

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  // const subTotalPrice = CartData?.cart.products.reduce(
  //   (acc, item) => acc + item.count * item.discountPrice,
  //   0
  // );

  const subTotalPrice = cart?.cartTotal;

  // // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;
  const discountPercentage = couponCodeData ? discountPrice : 0;
  const totalPrice = couponCodeData
    ? discountPercentage &&
      (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // const name = couponCode;

    const shopId = data?.couponCode.shopId;

    // await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
    //   const shopId = res.data.couponCode?.shopId;
    const couponCodeValue = data.couponCode?.value;
    if (data.couponCode !== null) {
      const isCouponValid =
        cart && cart.filter((item: IProductInCart) => item.shopId === shopId);

      if (isCouponValid.length === 0) {
        toast.error("Coupon code is not valid for this shop");
        setCouponCode("");
      } else {
        const eligiblePrice = isCouponValid.reduce(
          (acc: number, item: IProductInCart) => acc + item.count * item.price,
          0
        );
        const discountPrice = (eligiblePrice * couponCodeValue) / 100;
        setDiscountPrice(discountPrice);
        setCouponCodeData(data.couponCode);
        setCouponCode("");
      }
    }
    if (data.couponCode === null) {
      toast.error("Coupon code doesn't exists!");
      setCouponCode("");
    }
  };

  // console.log(discountPercentenge);
  // const handleSubmit = () => {};

  // const totalPrice = 290;
  // const shipping = "svjgakgaggka";
  // const subTotalPrice = 200;
  // const discountPercentenge = 2;

  // const paymentSubmit = () => {};

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

interface IShippingInfo {
  user: IUser;
  country: string;
  setCountry: (country: string) => void;
  city: string;
  setCity: (city: string) => void;
  userInfo: boolean;
  setUserInfo: (userInfo: boolean) => void;
  address1: string;
  setAddress1: (address1: string) => void;
  address2: string;
  setAddress2: (address2: string) => void;
  state: string;
  setState: (state: string) => void;
  zipCode: number;
  setZipCode: (zipCode: number) => void;
}

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  state,
  setState,
  zipCode,
  setZipCode,
}: IShippingInfo) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user && user.fullName}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Pin/Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(parseInt(e.target.value, 10))}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">State</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your State
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="w-[50%]">
          <label className="block pb-2">City</label>
          <select
            className="w-[95%] border h-[40px] rounded-[5px]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option className="block pb-2" value="">
              Choose your City
            </option>
            {City &&
              City.getCitiesOfState(country, state).map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
      </h5>
      {userInfo && (
        <div>
          {user?.addresses &&
            user?.addresses.map((item: IAddress, index: number) => (
              <div key={index} className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() => {
                    setAddress1(item.address1);
                    setAddress2(item?.address2);
                    setZipCode(item.pinCode);
                    setCountry(item.country);
                    setState(item.state);
                    setCity(item.city);
                  }}
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

interface ICartData {
  handleSubmit: (e: FormEvent) => void;
  totalPrice: number;
  shipping: number;
  subTotalPrice: number;
  couponCode: string;
  setCouponCode: (couponCode: string) => void;
  discountPercentage: number | null;
}

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}: ICartData) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">&#8377;. {subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">
          &#8377;.
          {
            shipping.toFixed(2)
            // shipping
          }
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - &#8377;.
          {discountPercentage ? discountPercentage.toString() : 0}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        &#8377;. {totalPrice}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
