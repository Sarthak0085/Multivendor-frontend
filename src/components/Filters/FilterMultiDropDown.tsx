import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IBrand, ICategory, IColor, ISize } from "../../types/types";

interface IFilterDropDown {
  data: (ICategory | IColor | ISize | IBrand | { title: string })[];
  show: boolean;
  setShow: (show: boolean) => void;
  handleChange?: (option: string) => void;
  selected: string[];
  setSelected: any;
  label: string;
}

const FilterMultiDropDown = ({
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
                <label
                  className="relative flex items-center rounded-full cursor-pointer"
                  htmlFor={`checkbox-${item.title}`}
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id={`checkbox-${item.title}`}
                    onChange={() =>
                      setSelected((prev: string[]) =>
                        prev.includes(item?.symbol || item?.title)
                          ? prev.filter(
                              (c: string) => c !== (item?.symbol || item?.title)
                            )
                          : [...prev, item?.symbol || item?.title]
                      )
                    }
                    checked={selected.includes(
                      item?.symbol ? item?.symbol : item?.title
                    )}
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
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
                  </span>
                </label>
                {/* <label className="relative flex h-6 cursor-pointer pl-8  text-gray-400 before:absolute before:left-0 before:flex before:h-6 before:w-6 before:items-center before:justify-center before:rounded-lg before:border before:border-blue-500 before:bg-white before:transition-[background-color] before:duration-300 before:ease-in peer-checked:before:bg-blue-500 peer-checked:before:text-white peer-checked:before:content-['\2713'] peer-checked:before:font-bold peer-checked:before:transition-[background-color] peer-checked:before:duration-300 peer-checked:before:ease-in"></label> */}
                {item && item?.image ? (
                  <img
                    src={item.image.url}
                    alt={item.title}
                    className={"w-6 h-6 ml-3 rounded object-cover"}
                  />
                ) : (
                  !item?.symbol &&
                  item?.createdAt && (
                    <button
                      className="ml-3 w-5 h-5 border border-black rounded-full"
                      style={{ backgroundColor: `${item?.title}` }}
                    ></button>
                  )
                )}
                <label
                  htmlFor={`checkbox-${item.title}`}
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  {item?.symbol ? item?.symbol : item?.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMultiDropDown;
