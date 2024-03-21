// import { useEffect, useState } from "react";
// import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";
// import ProductCard from "../components/Products/ProductCard";
// import styles from "../styles/styles";
// import Footer from "../components/Layout/Footer";
// import { useGetAllProductsQuery } from "../redux/features/product/productApi";
// import useWindowSize from "../hooks/useWindowSize";

// const BestSellingPage = () => {
//   const { data: productData, isLoading } = useGetAllProductsQuery({});
//   console.log(productData);

//   const { width } = useWindowSize();
//   const baseWidth = 350;
//   const gap = 10;

//   const productsPerRow = Math.floor((width - gap) / (baseWidth + gap));

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: `repeat(${productsPerRow}, ${baseWidth}px)`,
//     gap: `${gap}px`,
//     marginBottom: "20px",
//     border: "0",
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           <Header activeHeading={2} />
//           <br />
//           <br />
//           <div className={`${styles.section}`}>
//             {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12"> */}
//             <div style={gridStyle}>
//               {data &&
//                 data.map((i, index) => <ProductCard data={i} key={index} />)}
//             </div>
//           </div>
//           <Footer />
//         </div>
//       )}
//     </>
//   );
// };

// export default BestSellingPage;
import { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DisplayAllFilters from "../components/Filters/DisplayAllFilters";
import MainFilters from "../components/Filters/MainFilters";
import MobileFiltersModal from "../components/Filters/MobileFilters";
import SortDropDown from "../components/Filters/SortDropDown";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductCard from "../components/Products/ProductCard";
import useWindowSize from "../hooks/useWindowSize";
import { useGetAllBrandQuery } from "../redux/features/brand/brandApi";
import { useGetAllCategoryQuery } from "../redux/features/category/categoryApi";
import { useGetAllColorQuery } from "../redux/features/color/colorApi";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import { useGetAllSizeQuery } from "../redux/features/size/sizeApi";
import styles from "../styles/styles";
import { IProduct } from "../types/product";

const BestSellingPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [open, setOpen] = useState<boolean>(false);
  const [showColorOption, setShowColorOption] = useState<boolean>(false);
  const [showCategoryOption, setShowCategoryOption] = useState<boolean>(false);
  const [showBrandOption, setShowBrandOption] = useState<boolean>(false);
  const [showSizeOption, setShowSizeOption] = useState<boolean>(false);
  const [showGenderOption, setShowGenderOption] = useState<boolean>(false);
  const [showPricesOption, setShowPricesOption] = useState<boolean>(false);
  const [showDiscountOption, setShowDiscountOption] = useState<boolean>(false);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedDiscount, setSelectedDiscount] = useState<string>("");
  const [sort, setSort] = useState<string>("Recommended");

  const { data: colorData } = useGetAllColorQuery({});
  const { data: categoriesData } = useGetAllCategoryQuery({});
  const { data: brandData } = useGetAllBrandQuery({});
  const { data: sizeData } = useGetAllSizeQuery({});

  const {
    data: productData,
    isLoading,
    refetch,
  } = useGetAllProductsQuery({
    ...(selectedCategory.length > 0 && {
      category: selectedCategory.join(","),
    }),
    ...(selectedColors.length > 0 && { colors: selectedColors.join(",") }),
    ...(selectedBrand.length > 0 && { brand: selectedBrand.join(",") }),
    ...(selectedSizes.length > 0 && { sizes: selectedSizes.join(",") }),
    ...(selectedGender.length > 0 && { gender: selectedGender.join(",") }),
    ...(selectedPrice.length > 0 && { prices: selectedPrice }),
    ...(selectedDiscount.length > 0 && { discounts: selectedDiscount }),
    ...(setSort.length > 0 && { sort: sort === "Recommended" ? "" : sort }),
  });

  useEffect(() => {
    const allProductsData = productData?.products
      ? [...productData.products]
      : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData as any);
  }, [productData]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (selectedCategory.length > 0)
      queryParams.set("category", selectedCategory.join(","));
    if (selectedColors.length > 0)
      queryParams.set("colors", selectedColors.join(","));
    if (selectedBrand.length > 0)
      queryParams.set("brand", selectedBrand.join(","));
    if (selectedSizes.length > 0)
      queryParams.set("sizes", selectedSizes.join(","));
    if (selectedGender.length > 0)
      queryParams.set("gender", selectedGender.join(","));
    if (selectedPrice.length > 0) queryParams.set("prices", selectedPrice);
    if (selectedDiscount.length > 0)
      queryParams.set("discounts", selectedDiscount);

    console.log(queryParams);

    navigate(`?${queryParams.toString()}`);
    refetch();
    window.scroll(0, 0);
  }, [
    selectedCategory,
    selectedColors,
    selectedSizes,
    selectedBrand,
    selectedPrice,
    selectedGender,
    selectedDiscount,
    refetch,
    navigate,
  ]);

  useEffect(() => {
    const savedSelectedColors = localStorage.getItem("selectedColors");
    const savedSelectedBrand = localStorage.getItem("selectedBrands");
    const savedSelectedCategory = localStorage.getItem("selectedCategory");
    const savedSelectedSizes = localStorage.getItem("selectedSizes");
    const savedSelectedGender = localStorage.getItem("selectedGender");
    const savedSelectedPrice = localStorage.getItem("selectedPrice");
    const savedSelectedDiscount = localStorage.getItem("selectedDiscount");
    // console.log(
    //   "localstorage: ",
    //   savedSelectedColors,
    //   savedSelectedCategory,
    //   savedSelectedBrand,
    //   savedSelectedSizes,
    //   savedSelectedGender,
    //   savedSelectedPrice,
    //   savedSelectedDiscount
    // );

    if (savedSelectedColors && typeof savedSelectedColors !== "undefined") {
      setSelectedColors(JSON?.parse(savedSelectedColors));
    }
    if (savedSelectedCategory && typeof savedSelectedCategory !== "undefined") {
      setSelectedCategory(JSON?.parse(savedSelectedCategory));
    }
    if (savedSelectedBrand && typeof savedSelectedBrand !== "undefined") {
      setSelectedBrand(JSON?.parse(savedSelectedBrand));
    }
    if (savedSelectedSizes && typeof savedSelectedSizes !== "undefined") {
      setSelectedBrand(JSON?.parse(savedSelectedSizes));
    }
    if (savedSelectedGender && typeof savedSelectedGender !== "undefined") {
      setSelectedGender(JSON?.parse(savedSelectedGender));
    }
    if (savedSelectedPrice && typeof savedSelectedPrice !== "undefined") {
      setSelectedPrice(JSON?.parse(savedSelectedPrice));
    }
    if (savedSelectedDiscount && typeof savedSelectedDiscount !== "undefined") {
      setSelectedDiscount(JSON?.parse(savedSelectedDiscount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedColors", JSON.stringify(selectedColors));
    localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
    localStorage.setItem("selectedBrands", JSON.stringify(selectedBrand));
    localStorage.setItem("selectedSizes", JSON.stringify(selectedSizes));
    localStorage.setItem("selectedGender", JSON.stringify(selectedGender));
    localStorage.setItem("selectedPrice", JSON.stringify(selectedPrice));
    localStorage.setItem("selectedDiscount", JSON.stringify(selectedDiscount));
  }, [
    selectedColors,
    selectedCategory,
    selectedBrand,
    selectedSizes,
    selectedPrice,
    selectedDiscount,
    selectedGender,
  ]);

  const removeAllFilters = () => {
    setSelectedColors([]);
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedSizes([]);
    setSelectedGender([]);
    setSelectedPrice("");
    setSelectedDiscount("");
  };

  const { width } = useWindowSize();
  const baseWidth = 350;
  const gap = 10;

  const productsPerRow = Math.floor(
    (width > 1025 ? width - gap - 250 : width - gap) / (baseWidth + gap)
  );

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${productsPerRow}, ${baseWidth}px)`,
    gap: `${gap}px`,
    marginBottom: "20px",
    border: "0",
  };

  return (
    <div>
      {open && (
        <MobileFiltersModal
          brandData={brandData?.getallBrand}
          categoryData={categoriesData?.getallCategory}
          colorData={colorData?.getAllColor}
          sizeData={sizeData?.getAllSize}
          closeModal={setOpen}
          selectedBrand={selectedBrand}
          selectedCategory={selectedCategory}
          selectedColors={selectedColors}
          selectedDiscount={selectedDiscount}
          selectedGender={selectedGender}
          selectedPrice={selectedPrice}
          selectedSizes={selectedSizes}
          setSelectedBrand={setSelectedBrand}
          setSelectedCategory={setSelectedCategory}
          setSelectedColors={setSelectedColors}
          setSelectedDiscount={setSelectedDiscount}
          setSelectedGender={setSelectedGender}
          setSelectedPrice={setSelectedPrice}
          setSelectedSizes={setSelectedSizes}
          setShowBrandOption={setShowBrandOption}
          setShowCategoryOption={setShowCategoryOption}
          setShowColorOption={setShowColorOption}
          setShowDiscountOption={setShowDiscountOption}
          setShowGenderOption={setShowGenderOption}
          setShowPriceOption={setShowPricesOption}
          setShowSizeOption={setShowSizeOption}
          showBrandOption={showBrandOption}
          showCategoryOption={showCategoryOption}
          showColorOption={showColorOption}
          showDiscountOption={showDiscountOption}
          showGenderOption={showGenderOption}
          showPriceOption={showPricesOption}
          showSizeOption={showSizeOption}
          removeAllFilters={removeAllFilters}
        />
      )}
      <Header activeHeading={2} />
      <br />
      <div className={`${styles.section}`}>
        <div className="flex">
          <div className="hidden lg:block min-w-[250px]">
            <MainFilters
              brandData={brandData?.getallBrand}
              categoriesData={categoriesData?.getallCategory}
              colorData={colorData?.getAllColor}
              sizeData={sizeData?.getAllSize}
              selectedBrand={selectedBrand}
              selectedCategory={selectedCategory}
              selectedColors={selectedColors}
              selectedDiscount={selectedDiscount}
              selectedGender={selectedGender}
              selectedPrice={selectedPrice}
              selectedSizes={selectedSizes}
              setSelectedBrand={setSelectedBrand}
              setSelectedCategory={setSelectedCategory}
              setSelectedColors={setSelectedColors}
              setSelectedDiscount={setSelectedDiscount}
              setSelectedGender={setSelectedGender}
              setSelectedPrice={setSelectedPrice}
              setSelectedSizes={setSelectedSizes}
              setShowBrandOption={setShowBrandOption}
              setShowCategoryOption={setShowCategoryOption}
              setShowColorOption={setShowColorOption}
              setShowDiscountOption={setShowDiscountOption}
              setShowGenderOption={setShowGenderOption}
              setShowPricesOption={setShowPricesOption}
              setShowSizeOption={setShowSizeOption}
              showBrandOption={showBrandOption}
              showCategoryOption={showCategoryOption}
              showColorOption={showColorOption}
              showDiscountOption={showDiscountOption}
              showGenderOption={showGenderOption}
              showPricesOption={showPricesOption}
              showSizeOption={showSizeOption}
              removeAllFilters={removeAllFilters}
            />
          </div>
          <div className="w-full lg:ml-20 overflow-x-hidden">
            <div
              className={`flex ${
                width > 1024 && "!flex-row-reverse"
              } justify-between flex-col space-y-5 500px:space-y-0 500px:flex-row items-center mb-5`}
            >
              <div>
                <SortDropDown sort={sort} setSort={setSort} />
              </div>
              {width < 1024 && (
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center cursor-pointer gap-2 mr-2 text-[20px] font-medium"
                >
                  Filters <IoFilterSharp />
                </button>
              )}
            </div>

            <div className="hidden md:block">
              <DisplayAllFilters
                selectedBrand={selectedBrand}
                selectedCategory={selectedCategory}
                selectedColors={selectedColors}
                selectedDiscount={selectedDiscount}
                selectedGender={selectedGender}
                selectedPrice={selectedPrice}
                selectedSizes={selectedSizes}
                setSelectedBrand={setSelectedBrand}
                setSelectedCategory={setSelectedCategory}
                setSelectedColors={setSelectedColors}
                setSelectedDiscount={setSelectedDiscount}
                setSelectedGender={setSelectedGender}
                setSelectedPrice={setSelectedPrice}
                setSelectedSizes={setSelectedSizes}
              />
            </div>
            {!isLoading && (
              <>
                <div style={gridStyle} className="w-full ml-2">
                  {data &&
                    data.map((i: IProduct, index: number) => (
                      <ProductCard data={i} key={index} />
                    ))}
                </div>
                {data && data?.length === 0 ? (
                  <h1 className="text-center text-2xl text-[red]">
                    No products Found!
                  </h1>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
