import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import styles from "../../styles/styles";
import {
  ForgotPasswordDataType,
  forgotPasswordSchema,
} from "../../validations/ForgotPassword";
import { setErrorOptions, setSuccessOptions } from "../options";
import Input from "../shared/Input";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotPassword, { isSuccess, data, error }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Please check your email for otp.";
      toast.success(message, {
        style: setSuccessOptions,
      });
      navigate("/reset-password");
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
          label="Enter your email"
          placeholder="john@gmail.com"
          errors={errors}
          register={register}
          required={true}
        />
        <div>
          <button
            type="submit"
            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
        <div className={`${styles.noramlFlex} w-full`}>
          <h4>Don't have an account?</h4>
          <Link to="/sign-up" className="text-blue-600 pl-2">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
