import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Products/ProductCard";
import styles from "../styles/styles";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import { IProduct } from "../types/product";
import useWindowSize from "../hooks/useWindowSize";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const { data: productData, isLoading } = useGetAllProductsQuery({});

  console.log(productData?.products);

  useEffect(() => {
    if (categoryData === null) {
      const d = productData?.products;
      setData(d);
    } else {
      const d =
        productData?.products &&
        productData?.products.filter(
          (i: IProduct) => i.category === categoryData
        );
      setData(d);
    }
    window.scrollTo(0, 0);
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
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-8 xl:grid-cols-5 xl:gap-[30px] mb-12"> */}
            <div style={gridStyle}>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
