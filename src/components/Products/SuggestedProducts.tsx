import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import Loader from "../Layout/Loader";
import ProductCard from "./ProductCard";
import { IProduct } from "../../types/product";
import { IEvent } from "../../types/event";

const SuggestedProduct = ({ data }: { data: IProduct | IEvent }) => {
  const [productData, setProductData] = useState<IProduct[]>();
  const { data: product, isLoading } = useGetAllProductsQuery({});

  useEffect(() => {
    const d =
      product?.products &&
      product?.products.filter(
        (i: IProduct) => i.category === data.category || i.tags === data.tags
      );
    setProductData(d);
  }, [product, data]);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] !text-left font-[500] pl-[20px] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {isLoading ? (
              <Loader />
            ) : (
              productData &&
              productData.map((i: IProduct, index: number) => (
                <ProductCard data={i} key={index} />
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
