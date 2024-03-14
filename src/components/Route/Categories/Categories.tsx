import Marquee from "react-fast-marquee";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import { brandingData } from "../../../static/data";
import styles from "../../../styles/styles";
import { ICategory } from "../../../types/types";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data } = useGetAllCategoryQuery({});

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

      <Marquee className="w-full flex justify-around my-4">
        {data?.getallCategory.map((i: ICategory, index: number) => (
          <Link
            to={`/products?category=${i.title}`}
            key={index}
            className="relative"
          >
            <img
              src={i?.image?.url}
              width={"200px"}
              height={"200px"}
              alt={i?.title}
              className={`md:mx-8 mx-3 h-[200px] w-[200px]`}
            />
            <h2 className="absolute top-0 opacity-100 800px:opacity-0 800px:hover:opacity-100 w-full h-[150px] font-[500] translate-y-1/3 bg-white bg-opacity-75 text-center">
              {i?.title}
            </h2>
          </Link>
        ))}
      </Marquee>
    </>
  );
};

export default Categories;
