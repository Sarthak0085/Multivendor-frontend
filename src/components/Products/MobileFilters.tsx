import FilterMultiDropDown from "./FilterMultiDropDown";
import { discountPercent, genderData, priceRange } from "../../static/data";
import FilterSingleDropDown from "./FilterSingleDropDown";
import { IBrand, ICategory, IColor, ISize } from "../../types/types";
import { RiCloseFill } from "react-icons/ri";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

interface IMobileFiltersModal {
  closeModal: (modal: boolean) => void;
  categoryData: ICategory[];
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
  showPriceOption: boolean;
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
  setShowPriceOption: (showPriceOption: boolean) => void;
  setShowGenderOption: (showGenderOption: boolean) => void;
  removeAllFilters: () => void;
}

const MobileFiltersModal = ({
  closeModal,
  categoryData,
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
  showPriceOption,
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
  setShowPriceOption,
  setShowGenderOption,
  removeAllFilters,
}: IMobileFiltersModal) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => closeModal(false));

  return (
    <div
      ref={modalRef}
      className="fixed top-0 left-0 w-[90%] 400px:w-[80%] 500px:w-[65%] 800px:w-[50%] bg-black bg-opacity-50 z-[1000] flex justify-center items-center"
    >
      <div className="bg-white p-4 rounded-lg overflow-y-auto w-full h-screen max-w-screen-md">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => closeModal(false)}
            className="w-full flex justify-end text-gray-500"
          >
            <RiCloseFill size={32} />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col w-[90%] mr-4">
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
              data={categoryData}
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
              setShow={setShowPriceOption}
              show={showPriceOption}
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
          <div className="w-[60%] mt-10 mx-auto flex flex-col space-y-6">
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
                className="flex items-center justify-center p-1 gap-1 border rounded hover:bg-gray-200 border-black"
              >
                Clear Filters
              </button>
            ) : null}
            <button
              onClick={() => closeModal(false)}
              aria-label="Close"
              className="flex items-center justify-center p-1 border rounded hover:bg-[red] hover:text-white border-black"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFiltersModal;
