import { City, Country, State } from "country-state-city";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { CiFlag1 } from "react-icons/ci";
import { FaCity, FaRegAddressCard } from "react-icons/fa6";
import { GiCapitol } from "react-icons/gi";
import { MdOutlinePassword } from "react-icons/md";
import { PiAddressBookLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import Input from "../components/shared/Input";
import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import Select from "../components/shared/Select";

interface IAddress {
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  pinCode: number;
  addressType: string;
}

interface IAddressModal {
  setOpen: (open: boolean) => void;
  AddNewAddress: SubmitHandler<IAddress>;
  register: UseFormRegister<{
    country: string;
    state: string;
    city: string;
    address1: string;
    address2: string;
    pinCode: number;
    addressType: string;
  }>;
  errors: FieldErrors<{
    country: string;
    state: string;
    city: string;
    address1: string;
    address2: string;
    pinCode: number;
    addressType: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      country: string;
      state: string;
      city: string;
      address1: string;
      address2: string;
      pinCode: number;
      addressType: string;
    },
    {
      country: string;
      state: string;
      city: string;
      address1: string;
      address2: string;
      pinCode: number;
      addressType: string;
    }
  >;
  country: string;
  state: string;
  setCountry: (country: string) => void;
  setState: (state: string) => void;
  isLoading: boolean;
}

const AddressModal = ({
  setOpen,
  handleSubmit,
  AddNewAddress,
  register,
  errors,
  setCountry,
  setState,
  country,
  state,
  isLoading,
}: IAddressModal) => {
  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setOpen(false));

  return (
    <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
      <div
        ref={modalRef}
        className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll"
      >
        <div className="w-full flex justify-end p-3">
          <RxCross1
            title="close"
            size={30}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <h1 className="text-center text-[25px] font-Poppins">
          Add New Address
        </h1>
        <div className="w-full">
          <form
            aria-required
            onSubmit={handleSubmit(AddNewAddress)}
            className="w-full"
          >
            <div className="w-full block p-4">
              <Select
                label="Country"
                required={true}
                defaultOption="Choose your country"
                register={register}
                errors={errors}
                setState={setCountry}
                Icon={CiFlag1}
                data={Country && Country.getAllCountries()}
                name="country"
              />
              <Select
                label="State"
                required={true}
                defaultOption="Choose your state"
                register={register}
                errors={errors}
                setState={setState}
                Icon={GiCapitol}
                data={State && State.getStatesOfCountry(country)}
                name="state"
              />
              <Select
                label="City"
                required={true}
                defaultOption="Choose your city"
                register={register}
                errors={errors}
                Icon={FaCity}
                data={City && City.getCitiesOfState(country, state)}
                name="city"
              />
              <Input
                type="number"
                label="Pin/Zip Code"
                name="pinCode"
                placeholder="Enter your pin/zip code"
                required={true}
                Icon={MdOutlinePassword}
                valueAsNumber={true}
                register={register}
                errors={errors}
              />
              <Input
                type="text"
                label="Street Address 1"
                name="address1"
                placeholder="Enter your street Address 1"
                required={true}
                Icon={FaRegAddressCard}
                register={register}
                errors={errors}
              />
              <Input
                type="text"
                label="Street Address 2"
                name="address2"
                placeholder="Enter your street Address 2"
                required={true}
                Icon={FaRegAddressCard}
                register={register}
                errors={errors}
              />
              <Select
                name="addressType"
                register={register}
                errors={errors}
                Icon={PiAddressBookLight}
                defaultOption="Choose your Address type"
                label="Address Type"
                required={true}
                data={addressTypeData}
              />
              <div className="flex items-center justify-center mb-4">
                <button
                  className={`w-full 400px:w-[75%] h-[40px] border font-[500] border-[#3a24db] text-center text-[#3a24db]
             rounded-[3px] mt-8 cursor-pointer hover:text-white hover:bg-[#3a24db] ${
               isLoading && "cursor-not-allowed"
             }`}
                  aria-disabled={isLoading ? true : false}
                  disabled={isLoading}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
