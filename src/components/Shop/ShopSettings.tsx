import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  UpdateShopFormData,
  updateShopInfoSchema,
} from "../../validations/UpdateShopValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useUpdateShopAvatarMutation,
  useUpdateShopProfileMutation,
} from "../../redux/features/shop/shopApi";
import toast from "react-hot-toast";
import { setErrorOptions, setSuccessOptions } from "../options";

const ShopSettings = () => {
  const { seller } = useSelector((state: any) => state?.auth);
  console.log(seller);

  const [avatar, setAvatar] = useState<string>();

  const [updateAvatar, { isSuccess, error }] = useUpdateShopAvatarMutation();

  const [updateShopProfile, { isSuccess: updateSuccess, error: updateError }] =
    useUpdateShopProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateShopFormData>({
    resolver: zodResolver(updateShopInfoSchema),
  });

  useEffect(() => {
    setValue("name", seller?.name);
    setValue("description", seller?.description);
    setValue("address", seller?.address);
    setValue("email", seller?.email);
    setValue("phoneNumber", seller?.phoneNumber);
    setValue("pinCode", seller?.pinCode);
  }, [setValue, seller]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Shop Avatar Updated Successfully.", {
        style: setSuccessOptions,
      });
    }
    if (updateSuccess) {
      toast.success("Shop Profile Updated Successfully", {
        style: setSuccessOptions,
      });
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [isSuccess, error, updateError, updateSuccess]);

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        if (reader.readyState === 2 && reader.result) {
          setAvatar(reader.result as string);
          const response = await updateAvatar(avatar);
          console.log("response", response);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const updateShop: SubmitHandler<UpdateShopFormData> = async (data) => {
    console.log(data);
    await updateShopProfile(data);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={avatar ? avatar : `${seller.avatar?.url}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={handleSubmit(updateShop)}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="text"
              placeholder="Enter your Shop Name"
              {...register("name")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            {errors.name && (
              <span className="text-red-500 mt-3">{errors.name.message}</span>
            )}
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="text"
              placeholder="Enter your shop description"
              {...register("description")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
            {errors.description && (
              <span className="text-red-500 mt-3">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="text"
              placeholder="Enter your shop address."
              {...register("address")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            {errors.address && (
              <span className="text-red-500 mt-3">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder="Enter your Phone Number"
              {...register("phoneNumber")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            {errors.phoneNumber && (
              <span className="text-red-500 mt-3">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Pin/Zip Code</label>
            </div>
            <input
              type="number"
              placeholder="Enter you PinCode/ZipCode"
              {...register("pinCode")}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            {errors.pinCode && (
              <span className="text-red-500 mt-3">
                {errors.pinCode.message}
              </span>
            )}
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
