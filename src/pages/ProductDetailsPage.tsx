import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import SuggestedProduct from "../components/Products/SuggestedProducts";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import { useGetAllEventsQuery } from "../redux/features/events/eventApi";
import ProductDetails from "../components/Products/ProductDetails";
import { IEvent } from "../types/event";
import { IProduct } from "../types/product";

const ProductDetailsPage = () => {
  const { data: productData } = useGetAllProductsQuery({});
  const { data: event } = useGetAllEventsQuery({});
  const { id } = useParams();
  const [data, setData] = useState();
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = event && event?.events.find((i: IEvent) => i._id === id);
      setData(data);
    } else {
      const data =
        productData &&
        productData?.products.find((i: IProduct) => i._id === id);
      setData(data);
    }
  }, [productData, event]);

  return (
    <div>
      <Header activeHeading={3} />
      {data !== undefined && <ProductDetails data={data} />}
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
