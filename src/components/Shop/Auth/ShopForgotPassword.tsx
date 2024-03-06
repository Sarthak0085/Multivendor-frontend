import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { setErrorOptions, setSuccessOptions } from "../../options";
import {
  ForgotPasswordDataType,
  forgotPasswordSchema,
} from "../../../validations/ForgotPassword";
import Input from "../../shared/Input";
import styles from "../../../styles/styles";
import { useShopForgotPasswordMutation } from "../../../redux/features/auth/authApi";

const ShopForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotPassword, { isSuccess, data, error, isLoading }] =
    useShopForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Please check your email for otp.";
      toast.success(message, {
        style: setSuccessOptions,
      });
      navigate("/shop-reset-password");
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
  }, [isSuccess, error, navigate, data?.message]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDataType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordDataType> = async (data) => {
    console.log(data);
    const { email } = data;
    const response = await forgotPassword({ email });
    console.log("Response", response);
  };

  return (
    <div className="bg-blue-50 py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-3xl font-extrabold text-blue-600">
          Forgot Password
        </h2>
        <Input
          name="email"
          type="email"
          Icon={MdOutlineEmail}
          label="Enter your email address"
          placeholder="john@gmail.com"
          errors={errors}
          register={register}
          required={true}
        />
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
          <h4>Don't have an seller account?</h4>
          <Link to="/shop-create" className="text-blue-600 pl-2">
            Create here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ShopForgotPassword;
