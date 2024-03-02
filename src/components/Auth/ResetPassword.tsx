import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import styles from "../../styles/styles";
import {
  ResetFormData,
  resetPasswordSchema,
} from "../../validations/ResetPassword";
import { setErrorOptions, setSuccessOptions } from "../options";
import Input from "../shared/Input";
import Loader from "../Layout/Loader";

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    reset_token,
    isLoading: authLoading,
    user,
  } = useSelector((state: any) => state.auth);
  console.log("resetToken", authLoading, reset_token, user);

  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });
  const [resetPassword, { isSuccess, error, isLoading }] =
    useResetPasswordMutation();

  console.log("reset_token", reset_token);

  useEffect(() => {
    if (isSuccess) {
      const message = "Password Reset Successfully. Please login to continue.";
      toast.success(message, {
        style: setSuccessOptions,
      });
      navigate("/login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message, {
          style: setErrorOptions,
        });
        setInvalidError(true);
      } else {
        toast.error("An error occured", {
          style: setErrorOptions,
        });
        setInvalidError(false);
      }
    }
  }, [isSuccess, error, navigate]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const verificationHandler: SubmitHandler<ResetFormData> = async (data) => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 6) {
      setInvalidError(true);
      return;
    }
    await resetPassword({
      reset_token: reset_token,
      reset_otp: verificationNumber,
      newPassword: data.password,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    if (+value < 0) {
      value = "";
    }
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return authLoading ? (
    <Loader />
  ) : (
    <form onSubmit={handleSubmit(verificationHandler)}>
      <h1 className={`${styles.title}`}>Reset Password</h1>
      <div className="w-full flex items-center justify-center mt-2">
        <div className="h-[80px] w-[80px] rounded-full flex items-center justify-center bg-blue-500">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <Input
        name="password"
        type="password"
        Icon={RiLockPasswordLine}
        label="Enter your New Password"
        placeholder="*********"
        errors={errors}
        register={register}
        required={true}
        className="w-full 500px:w-[80%] text-lg flex flex-col mx-auto"
      />
      <br />

      <div className="w-full m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            inputMode="numeric"
            ref={inputRefs[index]}
            className={`500px:w-[65px] 500px:h-[65px] 400px:w-[50px] 400px:h-[50px] w-[40px] h-[40px] bg-transparent border-[3px] rounded-[10px] flex items-center no-spin text-black justify-center outline-none text-[18px] text-center font-Poppins
                          ${
                            invalidError
                              ? "shake border-red-500"
                              : "border-[#0000004a]"
                          }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button type="submit" disabled={isLoading} className={styles.btn}>
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px]">
        <Link to={"/login"} className="pl-1 cursor-pointer text-[#2190ff]">
          <span className="text-[20px]">&larr;</span> Go Back to Sign In
        </Link>
      </h5>
      <br />
    </form>
  );
};

export default ResetPassword;