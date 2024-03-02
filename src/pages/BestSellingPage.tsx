import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Products/ProductCard";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import useWindowSize from "../hooks/useWindowSize";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { data: productData, isLoading } = useGetAllProductsQuery({});
  console.log(productData);
  useEffect(() => {
    const allProductsData = productData?.products
      ? [...productData.products]
      : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData as any);
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12"> */}
            <div style={gridStyle}>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
