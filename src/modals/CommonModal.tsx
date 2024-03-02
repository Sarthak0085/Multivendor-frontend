import { ChangeEvent, useRef } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { AiOutlineCamera } from "react-icons/ai";
import { MdOutlineTitle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Input from "../components/shared/Input";
import useClickOutside from "../hooks/useClickOutside";

interface ICreationModal {
  setOpen: (open: boolean) => void;
  setId: (id: string) => void;
  option: string;
  createCategory: SubmitHandler<{ title: string }>;
  updateCategory: SubmitHandler<{ title: string }>;
  createLoading: boolean;
  updateLoading: boolean;
  image: string;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<{ title: string }>;
  errors: FieldErrors<{ title: string }>;
  handleSubmit: UseFormHandleSubmit<{ title: string }, { title: string }>;
  title: string;
}

const CommonModal = ({
  setOpen,
  option,
  createCategory,
  updateCategory,
  handleSubmit,
  register,
  errors,
  createLoading,
  updateLoading,
  image,
  handleImage,
  title,
  setId,
}: ICreationModal) => {
  const newTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const onSubmit: SubmitHandler<{ title: string }> =
    option === "create" ? createCategory : updateCategory;

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setOpen(false));

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-[90%] 800px:w-[40%] h-[60vh] bg-white rounded-md shadow p-4"
      >
        <div className="w-full flex justify-end">
          <RxCross1
            title="Close"
            size={30}
            className="cursor-pointer"
            onClick={() => {
              setId("");
              setOpen(false);
            }}
          />
        </div>
        <h5 className="text-[30px] font-Poppins text-center">
          {option === "update" ? `Update ${newTitle}` : `Create ${newTitle}`}
        </h5>
        {/* create coupoun code */}
        <form onSubmit={handleSubmit(onSubmit)} aria-required={true}>
          <br />
          {/* <div>
            <label className="pb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              {...register(title)}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your coupon code name..."
            />
            {errors.title && (
              <span className="text-[15px] mx-5 text-red-500">
                {errors.title as Error).message}
              </span>
            )}
                  </div> */}
          <Input
            Icon={MdOutlineTitle}
            label="Title"
            type="text"
            required={true}
            name="title"
            placeholder="Enter your title here"
            register={register}
            errors={errors}
          />
          <br />
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${image}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt={image}
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={(e) => handleImage(e)}
                />
                <label htmlFor="image">
                  <AiOutlineCamera title="Add Image" />
                </label>
              </div>
            </div>
          </div>
          <br />
          <div>
            <input
              type="submit"
              value={option === "update" ? "Update" : "Create"}
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]
                         placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                           createLoading ||
                           (updateLoading && "cursor-not-allowed")
                         }`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommonModal;
