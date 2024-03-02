import { zodResolver } from "@hookform/resolvers/zod";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import AddressModal from "../../modals/AddressModal";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import {
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from "../../redux/features/user/userApi";
import styles from "../../styles/styles";
import { AddressFormData, addressSchema } from "../../validations/AddAddress";
import { setErrorOptions, setSuccessOptions } from "../options";

type IAddress = {
  _id: string;
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  addressType: string;
  pinCode: number;
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const { user } = useSelector((state: any) => state.auth);

  const [updateuserAddress, { isSuccess, error, isLoading }] =
    useUpdateAddressMutation();
  const [
    deleteUserAddress,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useDeleteAddressMutation();

  const { refetch } = useLoadUserQuery({ refetchOnMountOrArgChange: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Address updated successfully", {
        style: setSuccessOptions,
      });
      setOpen(false);
      refetch();
    }
    if (deleteSuccess) {
      toast.success("Address deleted successfully", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error((errorData?.data as Error)?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An error occured", {
          style: setErrorOptions,
        });
      }
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError;
        toast.error((errorData?.data as Error)?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [isSuccess, error, deleteError, deleteSuccess]);

  const AddNewAddress: SubmitHandler<AddressFormData> = async (data) => {
    try {
      await updateuserAddress(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (itemId: string) => {
    deleteUserAddress(itemId);
  };

  console.log(country, State.getStatesOfCountry(country));

  return (
    <div className="w-full mt-1 px-5">
      {open && (
        <AddressModal
          setCountry={setCountry}
          setState={setState}
          setOpen={setOpen}
          state={state}
          country={country}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          AddNewAddress={AddNewAddress}
          isLoading={isLoading}
        />
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user?.addresses.map((item: IAddress, index: number) => {
          console.log(item);
          const stateName = State.getStateByCodeAndCountry(
            `${item.state}`,
            `${item.country}`
          );
          const countryName = Country.getCountryByCode(`${item.country}`);
          return (
            <div
              className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
              key={index}
            >
              <div className="flex items-center">
                <h5 className="pl-5 font-bold text-[blue]">
                  {item?.addressType}
                </h5>
              </div>
              <div className="pl-5 flex items-center">
                <h6 className="text-[15px] 800px:text-[unset] ">
                  {item?.address1} {item?.address2}
                </h6>
              </div>
              <div className="pl-5 flex items-center">
                <h6 className="text-[15px] 800px:text-[unset]">
                  {item?.city}/ {stateName?.name} /{countryName?.name}
                </h6>
              </div>
              <div className="pl-8 flex items-center">
                <h6 className="text-[15px] 800px:text-[unset]">
                  {user && user?.phoneNumber}
                </h6>
              </div>
              <button
                onClick={() => handleDelete(item?._id)}
                disabled={deleteLoading}
                aria-disabled={deleteLoading ? "true" : "false"}
                className="min-w-[10%] flex items-center justify-between pl-8"
              >
                <AiOutlineDelete
                  size={25}
                  className="cursor-pointer"
                  color="red"
                  title="Delete Address"
                />
              </button>
            </div>
          );
        })}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You don't have any saved address!
        </h5>
      )}
    </div>
  );
};

export default Address;
