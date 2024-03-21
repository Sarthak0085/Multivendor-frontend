import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useShopLoginMutation } from "../../../redux/features/auth/authApi";
import styles from "../../../styles/styles";
import {
  ShopLoginFormData,
  shopLoginSchema,
} from "../../../validations/ShopLoginValidation";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../../options";
import Input from "../../shared/Input";

const ShopLogin = () => {
  const navigate = useNavigate();

  const [login, { isSuccess, data, error, isLoading }] = useShopLoginMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Logging In...", {
        style: setLoadingOptions,
        duration: 13000,
      });
    }
    if (isSuccess) {
      const message = data?.message || "Logged In successful";
      toast.success(message, {
        style: setSuccessOptions,
      });
      navigate("/");
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
  } = useForm<ShopLoginFormData>({
    resolver: zodResolver(shopLoginSchema),
  });

  const onSubmit: SubmitHandler<ShopLoginFormData> = async (data) => {
    console.log(data);
    try {
      const response = await login(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-50 bg-opacity-60 backdrop-blur-lg py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-3xl font-extrabold text-blue-600">
          Login to your shop
        </h2>
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
        <div className="text-start">
          <Link
            to="/shop-forgot-password"
            className="text-[16px] underline cursor-pointer text-[blue]"
          >
            forgot-password
          </Link>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            aria-disabled={isLoading ? true : false}
            className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent 
            text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
        <div className={`${styles.noramlFlex} w-full`}>
          <h4>Don't have an account?</h4>
          <Link to="/shop-create" className="text-blue-600 pl-2">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ShopLogin;
