import useWindowSize from "../../../hooks/useWindowSize";
import styles from "../../../styles/styles";
import { IProduct } from "../../../types/product";
import ProductCard from "../../Products/ProductCard";

const BestDeals = ({ data }: { data: IProduct[] | undefined }) => {
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
        {data !== undefined && data.length !== 0 && (
          <>
            {data &&
              data?.map((i, index) => <ProductCard data={i} key={index} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
