import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { IProduct } from "../types/product";
import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

type formData = {
  name: string;
  value: number;
  selectedProduct: string;
  minAmount?: number | undefined;
  maxAmount?: number | undefined;
};

interface ICouponModal {
  setOpen: (open: boolean) => void;
  setId: (id: string) => void;
  option: string;
  createCoupon: SubmitHandler<formData>;
  handleUpdate: SubmitHandler<formData>;
  createLoading: boolean;
  updateLoading: boolean;
  register: UseFormRegister<formData>;
  errors: FieldErrors<formData>;
  handleSubmit: UseFormHandleSubmit<formData, formData>;
  title: string;
  products: IProduct[];
}

const CouponModal = ({
  setOpen,
  option,
  handleSubmit,
  title,
  createCoupon,
  handleUpdate,
  register,
  setId,
  errors,
  products,
  createLoading,
  updateLoading,
}: ICouponModal) => {
  const newTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const onSubmit: SubmitHandler<formData> =
    option === "create" ? createCoupon : handleUpdate;

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setOpen(false));

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4"
      >
        <div className="w-full flex justify-end">
          <RxCross1
            title="Close"
            size={30}
            className="cursor-pointer"
            onClick={() => {
              setOpen(false);
              setId("");
            }}
          />
        </div>
        <h5 className="text-[30px] font-Poppins text-center">
          {option === "update" ? `Update ${newTitle}` : `Create ${newTitle}`}
        </h5>
        {/* create coupoun code */}
        <form onSubmit={handleSubmit(onSubmit)} aria-required={true}>
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              {...register("name")}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your coupon code name..."
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <br />
          <div>
            <label className="pb-2">
              Discount Percentage <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("value", { valueAsNumber: true })}
              required
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your coupon code discount percentage..."
            />
            {errors.value && <span>{errors.value.message}</span>}
          </div>
          <br />
          <div>
            <label className="pb-2">Min Amount</label>
            <input
              type="number"
              {...register("minAmount", { valueAsNumber: true })}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your coupon code min amount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Max Amount</label>
            <input
              type="number"
              {...register("maxAmount", { valueAsNumber: true })}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your coupon code max amount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Selected Product</label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              {...register("selectedProduct", {
                required: true,
                validate: (value) => value !== "",
              })}
            >
              <option value="">Choose a selected product</option>
              {products &&
                products.map((i: IProduct) => (
                  <option value={i?.name} key={i?.name}>
                    {i?.name}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <input
              type="submit"
              disabled={createLoading || updateLoading}
              value={option === "create" ? "Create" : "Update"}
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                createLoading || (updateLoading && "cursor-not-allowed")
              }`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponModal;
