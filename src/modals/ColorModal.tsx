import { useRef } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { MdOutlineTitle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Input from "../components/shared/Input";
import useClickOutside from "../hooks/useClickOutside";

interface ICreationModal {
  setOpen: (open: boolean) => void;
  createColor: SubmitHandler<{ title: string }>;
  createLoading: boolean;
  register: UseFormRegister<{ title: string }>;
  errors: FieldErrors<{ title: string }>;
  handleSubmit: UseFormHandleSubmit<{ title: string }, { title: string }>;
  title: string;
  setSelectedColor: (selectedColor: string) => void;
  selectedColor: string;
}

const ColorModal = ({
  setOpen,
  createColor,
  handleSubmit,
  register,
  errors,
  createLoading,
  title,
  setSelectedColor,
  selectedColor,
}: ICreationModal) => {
  const newTitle = title.charAt(0).toUpperCase() + title.slice(1);
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
              setOpen(false);
            }}
          />
        </div>
        <h5 className="text-[30px] font-Poppins text-center">
          {`Add ${newTitle}`}
        </h5>
        <form onSubmit={handleSubmit(createColor)} aria-required={true}>
          <br />
          <Input
            Icon={MdOutlineTitle}
            label="Title"
            type="text"
            required={true}
            name="title"
            placeholder="Enter your title here"
            register={register}
            errors={errors}
            setSelected={setSelectedColor}
          />
          <br />
          <div className="flex flex-col items-center justify-center w-full">
            {/* <label>Pick a color</label> */}
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          </div>
          <br />
          <div>
            <input
              type="submit"
              value={"Add"}
              disabled={createLoading}
              aria-disabled={createLoading ? true : false}
              className={`mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]
                         placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                          ${createLoading && "cursor-not-allowed"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorModal;
