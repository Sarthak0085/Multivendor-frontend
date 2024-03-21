import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import { useGetHeroLayoutQuery } from "../redux/features/layout/layoutApi";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import { useEffect, useState } from "react";
import { IProduct } from "../types/product";
import Loader from "../components/Layout/Loader";
import { useGetAllEventsQuery } from "../redux/features/events/eventApi";

const HomePage = () => {
  const [bestProducts, setBestProducts] = useState<IProduct[]>();
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>();
  const { data, isLoading } = useGetHeroLayoutQuery("Banner", {});
  const { data: featured, isLoading: FeaturedLoading } = useGetAllProductsQuery(
    { sort: "Rating" }
  );
  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery({ sort: "Recommended" });
  const { data: eventData, isLoading: eventLoading } = useGetAllEventsQuery({});

  useEffect(() => {
    const bestFour =
      productData?.products && productData?.products?.slice(0, 4);
    setBestProducts(bestFour);
    const featuredFour = featured?.products && featured?.products.slice(0, 4);
    setFeaturedProducts(featuredFour);
  }, [productData, featured]);

  return (
    <div>
      <Header activeHeading={1} />
      {isLoading || FeaturedLoading || productLoading || eventLoading ? (
        <Loader />
      ) : (
        <>
          <Hero data={data?.layout} />
          <Categories />
          <BestDeals data={bestProducts} />
          <Events eventData={eventData?.events} />
          <FeaturedProduct data={featuredProducts} />
          <Sponsored />
        </>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
