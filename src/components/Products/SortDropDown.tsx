import { useRef, useState } from "react";
import { sortData } from "../../static/data";
import useClickOutside from "../../hooks/useClickOutside";

const SortDropDown = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: (sort: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpen(false));

  return (
    <div ref={modalRef} className="relative inline-block z-20">
      <select id="select" className="hidden">
        {sortData.map((item: { title: string }, index: number) => (
          <option value={item.title} key={index}>
            {item.title}
          </option>
        ))}
      </select>
      <button
        onClick={() => setOpen(!open)}
        id="select-button"
        className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 inline-flex items-center justify-between w-64"
      >
        <span id="selected-option">Sort By: {sort}</span>
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {open && (
        <div
          id="options-container"
          className="absolute bg-white border border-gray-300 rounded-md mt-1 w-64"
        >
          {sortData.map((item: { title: string }, index: number) => (
            <div
              key={index}
              onClick={() => {
                setSort(item.title);
                setOpen(false);
              }}
              className="option py-2 px-4 hover:bg-gray-100 cursor-pointer"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropDown;
