import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface IFilterDropDown {
  data: { title: string }[];
  show: boolean;
  setShow: (show: boolean) => void;
  setSelected: (selected: string) => void;
  selected: string;
  label: string;
}

const FilterSingleDropDown = ({
  data,
  setSelected,
  selected,
  show,
  setShow,
  label,
}: IFilterDropDown) => {
  return (
    <div className="border-t border-gray-200 px-2 py-6">
      <h3 className="-mx-2 -my-3">
        {/* <!-- Expand/collapse section button --> */}
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white px-1 py-3 text-gray-400 hover:text-gray-500"
          onClick={() => setShow(!show)}
        >
          <span className="font-medium text-gray-900">{label}</span>
          <span className="ml-6 flex items-center">
            {!show ? (
              <AiOutlinePlus
                aria-label="Show or Expanding"
                title="Show"
                color="black"
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineMinus
                aria-label="Hide or Collapse"
                title="Hide"
                color="black"
                onClick={() => setShow(true)}
              />
            )}
          </span>
        </button>
      </h3>
      {/* <!-- Filter section, show/hide based on section state. --> */}
      {show && (
        <div className="pt-6 overflow-y-auto max-h-[250px]">
          <div className="space-y-6">
            {data?.map((item: any, index: number) => (
              <div key={index} className="flex items-center">
                {/* <label
                  className="relative flex items-center rounded-full cursor-pointer"
                  htmlFor={`radio-${item?.title}`}
                > */}
                <input
                  type="radio"
                  id={`radio-${item?.title}`}
                  name="options"
                  onChange={() => setSelected(item?.title)}
                  checked={selected === item?.title}
                  className=""
                />
                {/* <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span> */}
                {/* </label> */}
                <label
                  htmlFor={`radio-${item?.title}`}
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  {item?.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSingleDropDown;
