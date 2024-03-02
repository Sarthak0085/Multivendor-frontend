import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import styles from "../../styles/styles";
import {
  RegisterFormData,
  registerSchema,
} from "../../validations/RegisterValidation";
import { setErrorOptions, setSuccessOptions } from "../options";
import Input from "../shared/Input";

const Register = () => {
  const navigate = useNavigate();

  const [registerMutation, { isSuccess, data, error }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message, {
        style: setSuccessOptions,
      });
      navigate("/verification");
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
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    console.log(data);
    const { fullName, email, password } = data;
    await registerMutation({ fullName, email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-blue-50 py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-3xl font-extrabold text-blue-600">
              Register as a new user
            </h2>
            <Input
              name="fullName"
              type="text"
              Icon={FaRegUser}
              label="Enter your Full Name"
              placeholder="John Doe"
              errors={errors}
              register={register}
              required={true}
            />

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
            <Input
              name="password"
              type="password"
              Icon={RiLockPasswordLine}
              label="Enter your Password"
              placeholder="**********"
              errors={errors}
              register={register}
              required={true}
            />
            <Input
              name="confirmPassword"
              type="password"
              Icon={RiLockPasswordLine}
              label="Enter your Confirm Password"
              placeholder="**********"
              errors={errors}
              register={register}
              required={true}
            />

            {/* <div>
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
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
