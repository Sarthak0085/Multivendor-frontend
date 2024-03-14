import { Link } from "react-router-dom";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandApi";
import styles from "../../styles/styles";
import { IBrand } from "../../types/types";
import Marquee from "react-fast-marquee";

const BrandsCollaboration = () => {
  const { data } = useGetAllBrandQuery({});

  return (
    <div
      className={`${styles.section} block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <Marquee className="w-full flex justify-around overflow-y-hidden">
        {data?.getallBrand.map((brand: IBrand, index: number) => (
          <Link
            to={`/products?brand=${brand?.title}`}
            key={index}
            className="relative"
          >
            <img
              src={brand?.image?.url}
              width={200}
              height={200}
              alt={brand?.title}
              title={brand?.title}
              className={`md:mx-8 w-[200px] h-[150px] mx-3 cursor-pointer`}
            />
            <h2 className="absolute top-0 opacity-0 hover:opacity-100 w-full h-[150px] font-[500] translate-y-1/4 bg-white bg-opacity-75 text-center">
              {brand?.title}
            </h2>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandsCollaboration;
