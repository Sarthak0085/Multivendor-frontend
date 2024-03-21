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

const HomePage = () => {
  const [bestProducts, setBestProducts] = useState<IProduct[]>();
  const { data, isLoading } = useGetHeroLayoutQuery("Banner", {});
  const { data: featuredProducts, isLoading: FeaturedLoading } =
    useGetAllProductsQuery({ sort: "Rating" });
  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery({ sort: "Recommended" });

  useEffect(() => {
    const allProductsData = productData?.products
      ? [...productData.products]
      : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFour = sortedData && sortedData.slice(0, 4);
    setBestProducts(firstFour);
  }, [productData]);

  return (
    <div>
      <Header activeHeading={1} />
      {isLoading || FeaturedLoading || productLoading ? (
        <Loader />
      ) : (
        <>
          <Hero data={data?.layout} />
          <Categories />
          <BestDeals data={bestProducts} />
          <Events />
          <FeaturedProduct data={featuredProducts?.products} />
          <Sponsored />
        </>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
