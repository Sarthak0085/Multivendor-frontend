import { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../../Products/ProductCard";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi";
import useWindowSize from "../../../hooks/useWindowSize";
import Loader from "../../Layout/Loader";
import { IProduct } from "../../../types/product";

const BestDeals = () => {
  const [data, setData] = useState<IProduct[]>();
  const { data: productData, isLoading } = useGetAllProductsQuery({});
  console.log(productData);
  useEffect(() => {
    const allProductsData = productData?.products
      ? [...productData.products]
      : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstEight = sortedData && sortedData.slice(0, 8);
    setData(firstEight);
  }, [productData]);

  const { width } = useWindowSize();
  const baseWidth = 350;
  const gap = 10;

  const productsPerRow = Math.floor((width - gap) / (baseWidth + gap));

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${productsPerRow}, ${baseWidth}px)`,
    gap: `${gap}px`,
    marginBottom: "20px",
    border: "0",
  };

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>
      </div>
      {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] 2xl:grid-cols-5 2xl:gap-[35px] mb-12 border-0"> */}
      <div style={gridStyle}>
        {isLoading ? (
          <Loader />
        ) : (
          data &&
          data.length !== 0 && (
            <>
              {data &&
                data?.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default BestDeals;
