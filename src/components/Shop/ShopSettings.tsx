import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineDescription } from "react-icons/md";
import { PiAddressBook } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { TbMapPinCode } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  useUpdateShopAvatarMutation,
  useUpdateShopProfileMutation,
} from "../../redux/features/shop/shopApi";
import {
  UpdateShopFormData,
  updateShopInfoSchema,
} from "../../validations/UpdateShopValidation";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import Input from "../shared/Input";

const ShopSettings = () => {
  const { seller } = useSelector((state: any) => state?.auth);
  console.log(seller);

  const [avatar, setAvatar] = useState<string>();

  const [updateAvatar, { isSuccess, error, isLoading }] =
    useUpdateShopAvatarMutation();

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
    if (isLoading) {
      toast.loading("Updating Content...", {
        style: setLoadingOptions,
      });
    }
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
  }, [isSuccess, error, updateError, updateSuccess, isLoading]);

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
    <div className="w-full flex flex-col items-center overflow-y-auto">
      <div className="flex w-full 1300px:w-[80%] flex-col justify-center my-5">
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
          {/* <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
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
          </div> */}

          <Input
            type="text"
            register={register}
            errors={errors}
            name="name"
            label="Shop Name"
            Icon={RxPerson}
            placeholder=""
            className="w-[100%] 400px:w-[90%] 500px:w-[80%] 800px:w-[60%] 1100px:w-[50%] 1300px:w-[45%] mt-2"
            required={true}
          />

          {/* <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
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
          </div> */}

          <div className="w-[100%] 400px:w-[90%] 500px:w-[80%] 800px:w-[60%] 1100px:w-[50%] 1300px:w-[45%] mt-2">
            <label className="block text-sm lg:text-[15px] 1300px:text-[18px] font-medium text-gray-700">
              Shop description
            </label>
            <div className="mt-1 relative">
              <textarea
                placeholder="Welcome to our cozy corner, where every visit promises a delightful experience! Nestled in the heart of the community, our small shop offers
                   a charming array of handcrafted goods, artisanal treasures, and heartfelt gifts."
                {...register("description")}
                rows={8}
                cols={10}
                className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 lg:text-[15px] 1300px:text-[18px] text-sm"
              />
              <MdOutlineDescription
                className="absolute left-2 top-2 cursor-pointer"
                size={20}
              />
            </div>
            {errors.description && (
              <span className="mt-2 text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>
          <Input
            type="text"
            register={register}
            errors={errors}
            name="address"
            label="Shop Address"
            Icon={PiAddressBook}
            placeholder="Enter your shop address."
            className="w-[100%] 400px:w-[90%] 500px:w-[80%] 800px:w-[60%] 1100px:w-[50%] 1300px:w-[45%] mt-5"
            required={true}
          />

          {/* <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
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
          </div> */}

          <Input
            type="number"
            register={register}
            errors={errors}
            name="phoneNumber"
            label="Shop Phone Number"
            Icon={HiMiniDevicePhoneMobile}
            placeholder="Enter your shop Phone Number."
            className="w-[100%] 400px:w-[90%] 500px:w-[80%] 800px:w-[60%] 1100px:w-[50%] 1300px:w-[45%] mt-2"
            required={true}
          />

          {/* <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
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
          </div> */}

          <Input
            type="number"
            register={register}
            errors={errors}
            name="pinCode"
            label="Enter you Pin/Zip Code"
            valueAsNumber={true}
            Icon={TbMapPinCode}
            placeholder="Enter your Pin/Zip Code."
            className="w-[100%] 400px:w-[90%] 500px:w-[80%] 800px:w-[60%] 1100px:w-[50%] 1300px:w-[45%] mt-2"
            required={true}
          />
          {/* <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
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
          </div> */}

          {/* <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
            />
          </div> */}
          <div className="w-[100%] 400px:w-[90%] 500px:w-[80%] 800px:w-[60%] 1100px:w-[50%] 1300px:w-[45%] mt-2">
            <button
              className={`w-full h-[40px] border font-[500] border-[#3a24db] text-center text-[#3a24db]
             rounded-[3px] cursor-pointer hover:text-white hover:bg-[#3a24db] ${
               isLoading && "cursor-not-allowed"
             }`}
              aria-disabled={isLoading ? true : false}
              disabled={isLoading}
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
