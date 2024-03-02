import { Link, useNavigate } from "react-router-dom";
// import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import { ICategory } from "../../../types/types";
import Loader from "../../Layout/Loader";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const Categories = () => {
  const { isLoading, data } = useGetAllCategoryQuery({});
  console.log(data);

  const navigate = useNavigate();

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prevIndex) =>
        prevIndex === data?.getallCategory.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval);
  }, [data?.getallCategory]);

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-full my-10">
        {isLoading ? (
          <Loader />
        ) : (
          <Carousel responsive={responsive}>
            {data?.getallCategory?.map((category, index) => (
              <div key={index} className="space-x-10 relative ">
                <img
                  src={category?.image?.url}
                  alt={category?.title}
                  className="w-[200px] h-[200px] bg-cover rounded-full"
                />
                <h2 className="absolute opacity-0 hover:opacity-100 w-full h-[100px] font-[500] bg-white bg-opacity-75 text-center">
                  <span className="absolute transform translate-y-9 -translate-x-5">
                    {category?.title}
                  </span>
                </h2>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default Categories;
