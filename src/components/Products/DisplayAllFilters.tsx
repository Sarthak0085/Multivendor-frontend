import { AiOutlineClose } from "react-icons/ai";
import DisplayFilter from "./DisplayFilter";

interface IDisplayAllFilters {
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
}

const DisplayAllFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedColors,
  setSelectedColors,
  selectedGender,
  setSelectedGender,
  selectedDiscount,
  setSelectedDiscount,
  selectedPrice,
  setSelectedPrice,
  selectedSizes,
  setSelectedSizes,
}: IDisplayAllFilters) => {
  return (
    <div className="lg:ml-10 ml-0 flex flex-row flex-wrap gap-4 mb-10">
      <ul className="flex-wrap space-y-4 space-x-4">
        <DisplayFilter data={selectedGender} setSelected={setSelectedGender} />
        <DisplayFilter
          data={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <DisplayFilter data={selectedColors} setSelected={setSelectedColors} />
        <DisplayFilter data={selectedBrand} setSelected={setSelectedBrand} />
        <DisplayFilter data={selectedSizes} setSelected={setSelectedSizes} />
        {selectedPrice && (
          <li
            aria-label={`Clear ${selectedPrice}`}
            className="gap-1 pl-2 border text-[16px] cursor-pointer font-[500] rounded-md p-1 border-black hover:bg-slate-800 hover:text-white inline-flex items-center"
            onClick={() => setSelectedPrice("")}
          >
            {selectedPrice.replace("-", ",")}{" "}
            <AiOutlineClose
              aria-label={`Clear ${selectedPrice}`}
              title={`Clear ${selectedPrice}`}
            />
          </li>
        )}
        {selectedDiscount && (
          <li
            aria-label={`Clear ${selectedDiscount}`}
            className="gap-1 pl-2 border text-[16px] cursor-pointer font-[500] rounded-md p-1 border-black hover:bg-slate-800 hover:text-white inline-flex items-center"
            onClick={() => setSelectedDiscount("")}
          >
            {selectedDiscount.replace("-", ",")}{" "}
            <AiOutlineClose
              aria-label={`Clear ${selectedDiscount}`}
              title={`Clear ${selectedDiscount}`}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default DisplayAllFilters;
