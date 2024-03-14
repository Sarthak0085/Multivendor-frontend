import Lottie from "react-lottie";
import animationData from "../../assets/animations/Animation - 1709193562996.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={400} height={400} />
    </div>
  );
};

export default Loader;
