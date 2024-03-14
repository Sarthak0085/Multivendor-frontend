import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useGetHeroLayoutQuery } from "../../../redux/features/layout/layoutApi";
import Loader from "../../Layout/Loader";

const Hero = () => {
  const { data, isLoading } = useGetHeroLayoutQuery("Banner", {});
  console.log("banner", data);

  return isLoading ? (
    <Loader />
  ) : (
    <div
      className={`relative min-h-[70vh] flex 800px:min-h-[70vh] w-full bg-slate-300 bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url('${data?.layout?.banner?.image?.url}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "500px",
      }}
    >
      <div
        className={`${styles.section} w-[90%] lg:mx-[50px] 800px:w-[80%] lg:w-[60%]`}
      >
        <h1
          className={`text-[35px] p-2 bg-[#00000034] leading-[1.2] 800px:text-[60px] text-white font-[600] capitalize`}
        >
          {data?.layout?.banner?.title}
        </h1>
        <p className="mt-5 leading-[1.5] pt-5 p-2 bg-[#00000075] text-[18px] font-[Poppins] font-[400] text-emerald-50">
          {data?.layout?.banner?.subTitle}
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-8`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
      {/* <img
        src={data?.layout?.banner?.image?.url}
        alt={data?.layout?.banner?.title}
        title="Main Layout"
        className="hidden 800px:block 800px:w-[50%] rounded-md xl:w-[40%] mx-[20px]"
      /> */}
    </div>
  );
};

export default Hero;
