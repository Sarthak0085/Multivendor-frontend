import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineDescription, MdOutlineEmail } from "react-icons/md";
import { PiAddressBook } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxAvatar, RxPerson } from "react-icons/rx";
import { TbMapPinCode } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  ShopRegisterFormData,
  shopRegisterSchema,
} from "../../../validations/ShopRegistrationValidation";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../../options";
import Input from "../../shared/Input";
import { useShopRegisterMutation } from "../../../redux/features/auth/authApi";

const ShopRegister = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>("");

  const [registerMutation, { isSuccess, data, error, isLoading }] =
    useShopRegisterMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Register new Shop. Please Wait. It will take time...", {
        style: setLoadingOptions,
        duration: 13000,
      });
    }
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message, {
        style: setSuccessOptions,
      });
      navigate("/verification-shop");
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
  }, [isSuccess, error, navigate, data?.message, isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopRegisterFormData>({
    resolver: zodResolver(shopRegisterSchema),
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };

    if (e.target.files !== null) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<ShopRegisterFormData> = async (data) => {
    // console.log(data);

    try {
      const {
        name,
        description,
        phoneNumber,
        address,
        pinCode,
        email,
        password,
      } = data;
      await registerMutation({
        name,
        description,
        phoneNumber,
        address,
        pinCode,
        email,
        password,
        avatar,
      });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-50 bg-opacity-60 backdrop-blur-lg py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-3xl font-extrabold text-blue-600">
          Register as a new seller
        </h2>

        <Input
          label="Enter shop's Name"
          type="text"
          placeholder="Shop O'Neil"
          register={register}
          errors={errors}
          Icon={RxPerson}
          required={true}
          name="name"
          inputClassName="!bg-blue-50"
        />
        <Input
          label="Enter shop's Email address"
          type="email"
          placeholder="john@gmail.com"
          register={register}
          errors={errors}
          Icon={MdOutlineEmail}
          required={true}
          name="email"
          inputClassName="!bg-blue-50"
        />
        <div>
          <label className="block text-sm lg:text-[15px] 1300px:text-[18px] font-medium text-gray-700">
            Enter Shop's description <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <textarea
              placeholder="Welcome to our cozy corner, where every visit promises a delightful experience! Nestled in the heart of the community, our small shop offers
                   a charming array of handcrafted goods, artisanal treasures, and heartfelt gifts."
              {...register("description")}
              rows={8}
              cols={10}
              className="appearance-none block w-full px-10 py-2 border border-gray-300 bg-blue-50 rounded-md shadow-sm 
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
          label="Enter shop's Phone Number"
          type="text"
          placeholder="62458*****"
          register={register}
          errors={errors}
          Icon={HiMiniDevicePhoneMobile}
          required={true}
          name="phoneNumber"
          inputClassName="!bg-blue-50"
        />
        <Input
          label="Enter shop's Address"
          type="text"
          placeholder="H.No.100"
          register={register}
          errors={errors}
          Icon={PiAddressBook}
          required={true}
          name="address"
          inputClassName="!bg-blue-50"
        />
        <Input
          label="Enter Pin/Zip Code"
          type="number"
          placeholder="145001"
          register={register}
          errors={errors}
          Icon={TbMapPinCode}
          required={true}
          name="pinCode"
          valueAsNumber={true}
          inputClassName="!bg-blue-50"
        />
        <Input
          label="Enter shop's Password"
          type="password"
          placeholder="**********"
          register={register}
          errors={errors}
          Icon={RiLockPasswordLine}
          required={true}
          name="password"
          inputClassName="!bg-blue-50"
        />
        <Input
          label="Enter shop's Confirm Password"
          type="password"
          placeholder="**********"
          register={register}
          errors={errors}
          Icon={RiLockPasswordLine}
          required={true}
          name="confirmPassword"
          inputClassName="!bg-blue-50"
        />
        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <div className="mt-2 flex items-center">
            <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <RxAvatar className="h-8 w-8" />
              )}
            </span>
            <label
              htmlFor="file-input"
              className="ml-5 flex items-center bg-blue-50 hover:bg-blue-100 justify-center px-4 py-2 border 
              border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 cursor-pointer"
            >
              <span>Upload a file</span>
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleImage}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            aria-disabled={isLoading ? true : false}
            className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm
             lg:text-[15px] 1300px:text-[18px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${
               isLoading && "cursor-not-allowed"
             }`}
          >
            Submit
          </button>
        </div>
        <div className={`${styles.noramlFlex} w-full`}>
          <h4>Already have an account?</h4>
          <Link to="/shop-login" className="text-blue-600 pl-2">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ShopRegister;
