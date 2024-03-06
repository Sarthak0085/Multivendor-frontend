import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import styles from "../../styles/styles";
import { LoginFormData, loginSchema } from "../../validations/LoginValidation";
import { setErrorOptions, setSuccessOptions } from "../options";
import Input from "../shared/Input";

const Login = () => {
  const navigate = useNavigate();

  const [login, { isSuccess, data, error, isLoading }] = useLoginMutation();

  useEffect(() => {
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
  }, [isSuccess, error, navigate, data?.message]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log(data);
    const response = await login(data);
    console.log("login", response);
  };

  return (
    <div className="bg-blue-50 py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-3xl font-extrabold text-blue-600">
          Login to your account
        </h2>
        <Input
          name="email"
          type="email"
          Icon={MdOutlineEmail}
          label="Enter your email"
          placeholder="John Doe"
          errors={errors}
          register={register}
          required={true}
        />
        <Input
          name="password"
          type="password"
          Icon={RiLockPasswordLine}
          label="Enter your password"
          placeholder="**********"
          errors={errors}
          register={register}
          required={true}
        />
        <div className="text-start">
          <Link
            to="/forgot-password"
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
          <Link to="/sign-up" className="text-blue-600 pl-2">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
