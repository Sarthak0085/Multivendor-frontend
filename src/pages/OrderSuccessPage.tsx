import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import animationData from "../assets/animations/107043-success.json";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  // const { user } = useSelector((state: any) => state?.auth);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const [emptyCart, { isSuccess }] = useEmptyCartMutation();

  // const { refetch } = useGetCartQuery(user?._id, {
  //   refetchOnMountOrArgChange: true,
  // });

  // async function emptyCartFunction() {
  //   await emptyCart(user?._id);
  // }

  // useEffect(() => {
  //   emptyCartFunction();
  // }, []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     // toast.success("Cart is empty");
  //     refetch();
  //     window.location.reload();
  //   }
  // }, [isSuccess]);

  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-10 text-[25px] text-[#2ac2c2]">
        Your order is successful 😍
      </h5>
      <br />
      <div className="0px:flex-col md:flex items-center justify-evenly ">
        <Link
          to={"/"}
          className="text-center flex items-center justify-center gap-2 border border-blue-500 text-[20px] rounded-md font-medium text-blue-500 p-2 hover:text-white hover:bg-blue-500"
        >
          <FaArrowLeft title="Go Back Home" /> Back to Home
        </Link>
        <Link
          to={"/"}
          className="text-center text-[20px] flex items-center justify-center gap-2 text-green-500 border border-green-500 rounded-md font-medium p-2 hover:text-white hover:bg-green-500"
        >
          Explore More Products <FaArrowRight title="Go to Products Page" />
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
