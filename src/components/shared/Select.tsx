import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IconType } from "react-icons";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  Icon?: IconType;
  label: string;
  required: boolean;
  data: any;
  valueAsNumber?: boolean;
  className?: string;
  selectClassName?: string;
  defaultOption: string;
  setState?: (state: string) => void;
}

const Select = <T extends FieldValues>({
  name,
  register,
  required,
  errors,
  Icon,
  data,
  defaultOption,
  valueAsNumber,
  label,
  className,
  setState,
  selectClassName,
}: InputProps<T>) => {
  return (
    <div className={`mb-5 ${!className}`}>
      <label
        className={`block text-sm sm:text-[16px] lg:text-[18px] pb-1 font-medium text-gray-700`}
      >
        {label} {required === true && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          {...register(name, {
            required: required === true ? true : false,
            valueAsNumber: valueAsNumber === true ? true : false,
            validate: (value) => value !== "",
          })}
          onChange={setState ? (e) => setState(e.target.value) : undefined}
          className={`w-full appearance-none  border h-[40px] rounded-[5px] pl-[40px] focus:outline-none 
          focus:ring-[blue] focus:border-[blue] text-sm sm:text-[16px] lg:text-[18px] ${!selectClassName}`}
        >
          <option
            value=""
            className="block text-[15px] font-normal bg-slate-200 "
          >
            {defaultOption}
          </option>
          {data &&
            data.map((item: any) => (
              <option
                className="block font-normal bg-slate-200 hover:text-white hover:bg-slate-700"
                key={item?.isoCode ? item?.isoCode : item?.name}
                value={
                  item?.isoCode
                    ? item?.isoCode
                    : item.name
                    ? item?.name
                    : item?.title
                }
              >
                {item.name ? item?.name : item?.title}
              </option>
            ))}
        </select>
        {Icon && (
          <Icon
            size={20}
            className="absolute left-2 top-0 transform translate-y-1/2"
          />
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

export default Select;
