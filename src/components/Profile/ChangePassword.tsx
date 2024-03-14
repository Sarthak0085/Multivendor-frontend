import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiLockPasswordLine } from "react-icons/ri";
import { useUpdatePasswordMutation } from "../../redux/features/user/userApi";
import styles from "../../styles/styles";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "../../validations/ChangePassword";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import Input from "../shared/Input";

const ChangePassword = () => {
  const [changePassword, { isSuccess, error, isLoading, data }] =
    useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Changing Password...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      const message = data?.message || "Password Changed successful";
      toast.success(message, {
        style: setSuccessOptions,
      });
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
  }, [isSuccess, error, data?.message, isLoading]);

  const passwordChangeHandler: SubmitHandler<ChangePasswordFormData> = async (
    data
  ) => {
    const { oldPassword, newPassword } = data;
    try {
      await changePassword({ oldPassword, newPassword });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(passwordChangeHandler)}
          className="flex flex-col items-center"
          id="Change Password"
          name="Change Password"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <Input
              type="password"
              name="oldPassword"
              label="Enter your old password"
              required={true}
              register={register}
              errors={errors}
              Icon={RiLockPasswordLine}
              placeholder="Enter your old password"
              inputClassName={`${styles.input} px-8 mb-4 800px:mb-0`}
            />
          </div>

          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <Input
              type="password"
              name="newPassword"
              label="Enter your new password"
              required={true}
              register={register}
              errors={errors}
              Icon={RiLockPasswordLine}
              placeholder="Enter your new password"
              inputClassName={`${styles.input} px-8 mb-4 800px:mb-0`}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <Input
              type="password"
              name="confirmPassword"
              label="Enter your confirm password"
              required={true}
              register={register}
              errors={errors}
              Icon={RiLockPasswordLine}
              placeholder="Enter your confirm password"
              inputClassName={`${styles.input} px-8 mb-4 800px:mb-0`}
            />
          </div>
          <div className="flex items-center justify-center 800px:block">
            <button
              className={`w-full 400px:w-[250px] h-[40px] border font-[500] border-[#3a24db] text-center text-[#3a24db]
             rounded-[3px] mt-8 cursor-pointer hover:text-white hover:bg-[#3a24db] ${
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

export default ChangePassword;
