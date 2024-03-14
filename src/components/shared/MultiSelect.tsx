import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { IconType } from "react-icons";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface MultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  Icon?: IconType;
  label: string;
  required: boolean;
  data: any;
  className?: string;
  selectClassName?: string;
  defaultValue: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedOptions: string[];
  toggleSelect: (value: string) => void;
}

const MultiSelect = <T extends FieldValues>({
  register,
  errors,
  name,
  open,
  setOpen,
  selectedOptions,
  toggleSelect,
  Icon,
  data,
  label,
  defaultValue,
}: MultiSelectProps<T>) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpen(false));

  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm lg:text-[15px] 1300px:text-[18px] pb-1 font-medium text-gray-700`}
      >
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        ref={modalRef}
        className="relative w-full border h-[40px] rounded-[5px] flex-grow text-sm lg:text-[15px] 1300px:text-[18px]"
      >
        <div
          onClick={() => setOpen(!open)}
          className="flex pl-3 h-full items-center bg-white justify-start"
        >
          <input
            type="text"
            placeholder="Select..."
            hidden
            {...register(name)}
          />
          <div className="flex items-center gap-4 h-[40px] rounded-md pl-[32px]">
            {selectedOptions.length === 0 ? (
              <span className="text-black">{defaultValue}</span>
            ) : (
              <>
                {selectedOptions
                  .slice(0, 3)
                  .map((option: any, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-200 rounded-[5px] text-black flex px-[10px] gap-2 py-[3px] cursor-pointer"
                      onClick={() => toggleSelect(option)}
                    >
                      {option}
                      <span>&times;</span>
                    </span>
                  ))}
                {selectedOptions.length > 3 && (
                  <span className="bg-blue-200 rounded-[5px] text-black flex px-[10px] gap-2 py-[3px] cursor-pointer">
                    +{selectedOptions.length - 3} more
                  </span>
                )}
              </>
            )}
          </div>
          {Icon && (
            <Icon
              title={label}
              aria-label={label}
              size={20}
              className="absolute left-2  top-0 transform translate-y-1/2"
            />
          )}
        </div>
        {open && (
          <div className="absolute w-[100%] bg-white max-h-[225px] border border-solid border-t-0 overflow-y-auto z-10">
            {data.map((item: any, index: number) => (
              <div
                key={index}
                className={`p-[10px] border flex gap-4 hover:bg-blue-200 cursor-pointer ${
                  selectedOptions.includes(item?.symbol || item?.title) &&
                  "bg-blue-200"
                }`}
                data-value={item?.title}
                onClick={() =>
                  item?.symbol
                    ? toggleSelect(item?.symbol)
                    : toggleSelect(item?.title)
                }
              >
                {item?.image ? (
                  <img
                    src={item.image.url}
                    alt={item.title}
                    className={"w-[25px] h-[20px] rounded object-cover"}
                  />
                ) : item?.symbol ? (
                  <button className="w-[25px] h-[25px] rounded-full">
                    {item?.symbol}
                  </button>
                ) : (
                  <button
                    className="w-[25px] h-[25px] rounded-full"
                    style={{ backgroundColor: `${item?.title}` }}
                  ></button>
                )}
                <span>{item?.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {errors.name && (
        <span className="text-red-500 mt-3">
          {(errors.name as Error).message}
        </span>
      )}
    </div>
  );
};

export default MultiSelect;
