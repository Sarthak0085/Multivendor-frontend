import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  Icon?: IconType;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  valueAsNumber?: boolean;
  className?: string;
  inputClassName?: string;
}

const Input = <T extends FieldValues>({
  name,
  type,
  placeholder,
  register,
  required,
  errors,
  Icon,
  valueAsNumber,
  label,
  className,
  inputClassName,
}: InputProps<T>) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className={`${className} mb-5`}>
      <div>
        <label
          className={`block text-sm sm:text-[16px] lg:text-[18px] font-medium pb-1 text-gray-700`}
        >
          {label} {required === true && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="mt-1 relative">
        <input
          type={
            type === "password"
              ? visible === true
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          {...register(name, {
            required: required === true ? true : false,
            valueAsNumber: valueAsNumber && valueAsNumber,
          })}
          className={`appearance-none block w-full ${
            Icon !== undefined ? "pl-10 pr-3" : "px-2"
          } py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[blue] focus:border-[blue] text-sm sm:text-[16px] lg:text-[18px] ${!inputClassName}`}
        />
        {Icon && (
          <Icon
            title={label}
            className="absolute left-2 top-2 cursor-pointer"
            size={20}
          />
        )}
        {type === "password" ? (
          visible ? (
            <AiOutlineEye
              className="absolute right-2 top-2 cursor-pointer"
              size={25}
              onClick={() => setVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-2 top-2 cursor-pointer"
              size={25}
              onClick={() => setVisible(true)}
            />
          )
        ) : null}
      </div>
      {errors[name] && (
        <span className="mt-5 text-[red]">
          {(errors[name] as Error)?.message}
        </span>
      )}
    </div>
  );
};

export default Input;
