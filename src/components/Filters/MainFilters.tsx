import { AiOutlineClose } from "react-icons/ai";
import FilterMultiDropDown from "./FilterMultiDropDown";
import FilterSingleDropDown from "./FilterSingleDropDown";
import { IBrand, ICategory, IColor, ISize } from "../../types/types";
import { discountPercent, genderData, priceRange } from "../../static/data";

interface IMainFilters {
  categoriesData: ICategory[];
  brandData: IBrand[];
  sizeData: ISize[];
  colorData: IColor[];
  selectedGender: string[];
  setSelectedGender: (selectedGender: string[]) => void;
  selectedCategory: string[];
  setSelectedCategory: (selectedCategory: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (selectedColors: string[]) => void;
  selectedBrand: string[];
  setSelectedBrand: (selectedBrand: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (selectedSizes: string[]) => void;
  selectedPrice: string;
  setSelectedPrice: (selectedBrand: string) => void;
  selectedDiscount: string;
  setSelectedDiscount: (selectedDiscount: string) => void;
  showDiscountOption: boolean;
  showPricesOption: boolean;
  showBrandOption: boolean;
  showCategoryOption: boolean;
  showColorOption: boolean;
  showSizeOption: boolean;
  showGenderOption: boolean;
  setShowBrandOption: (showBrandOption: boolean) => void;
  setShowCategoryOption: (showCategoryOption: boolean) => void;
  setShowColorOption: (showColorOption: boolean) => void;
  setShowDiscountOption: (howDiscountOption: boolean) => void;
  setShowSizeOption: (showSizeOption: boolean) => void;
  setShowPricesOption: (showPriceOption: boolean) => void;
  setShowGenderOption: (showGenderOption: boolean) => void;
  removeAllFilters: () => void;
}

const MainFilters = ({
  categoriesData,
  colorData,
  brandData,
  sizeData,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  selectedGender,
  setSelectedGender,
  selectedPrice,
  setSelectedPrice,
  selectedDiscount,
  setSelectedDiscount,
  showDiscountOption,
  showPricesOption,
  showBrandOption,
  showCategoryOption,
  showColorOption,
  showSizeOption,
  showGenderOption,
  setShowBrandOption,
  setShowCategoryOption,
  setShowColorOption,
  setShowDiscountOption,
  setShowSizeOption,
  setShowPricesOption,
  setShowGenderOption,
  removeAllFilters,
}: IMainFilters) => {
  return (
    <div>
      {selectedColors.length > 0 ||
      selectedCategory.length > 0 ||
      selectedBrand.length > 0 ||
      selectedSizes.length > 0 ||
      selectedGender.length > 0 ||
      selectedPrice.length > 0 ||
      selectedDiscount.length > 0 ? (
        <button
          onClick={removeAllFilters}
          aria-label="Clear Filters"
          className="flex justify-center border w-auto p-1 border-black rounded-md text-[18px] font-medium gap-3 items-center text-center mb-5  mx-auto px-2 hover:bg-[blue] hover:text-white"
        >
          Clear Filters
          <AiOutlineClose
            title="clear Filters"
            aria-label="Clear Filters"
            size={18}
          />
        </button>
      ) : null}
      <FilterMultiDropDown
        setShow={setShowGenderOption}
        show={showGenderOption}
        data={genderData}
        label="Gender"
        selected={selectedGender}
        setSelected={setSelectedGender}
      />

      <FilterMultiDropDown
        setShow={setShowCategoryOption}
        show={showCategoryOption}
        data={categoriesData}
        label="Category"
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />

      <FilterMultiDropDown
        setShow={setShowColorOption}
        show={showColorOption}
        data={colorData}
        label="Color"
        selected={selectedColors}
        setSelected={setSelectedColors}
      />

      <FilterMultiDropDown
        setShow={setShowBrandOption}
        show={showBrandOption}
        data={brandData}
        label="Brand"
        selected={selectedBrand}
        setSelected={setSelectedBrand}
      />
      <FilterMultiDropDown
        setShow={setShowSizeOption}
        show={showSizeOption}
        data={sizeData}
        label="Size"
        selected={selectedSizes}
        setSelected={setSelectedSizes}
      />
      <FilterSingleDropDown
        setShow={setShowPricesOption}
        show={showPricesOption}
        data={priceRange}
        label="Price"
        selected={selectedPrice}
        setSelected={setSelectedPrice}
      />
      <FilterSingleDropDown
        setShow={setShowDiscountOption}
        show={showDiscountOption}
        data={discountPercent}
        label="Discount"
        selected={selectedDiscount}
        setSelected={setSelectedDiscount}
      />
    </div>
  );
};

export default MainFilters;
