import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  ResetFormData,
  resetPasswordSchema,
} from "../../../validations/ResetPassword";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../../options";
import Input from "../../shared/Input";
import { useResetShopPasswordMutation } from "../../../redux/features/auth/authApi";

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
};

const ShopResetPassword = () => {
  const navigate = useNavigate();
  const { shop_reset_token } = useSelector((state: any) => state.auth);
  console.log("resetToken", shop_reset_token);

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
    useResetShopPasswordMutation();

  console.log("reset_token", shop_reset_token);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Hold on a moment.Processing new Password...", {
        style: setLoadingOptions,
        duration: 13000,
      });
    }
    if (isSuccess) {
      const message = "Password Reset Successfully. Please login to continue.";
      toast.success(message, {
        style: setSuccessOptions,
      });
      navigate("/shop-login");
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
  }, [isSuccess, error, navigate, isLoading]);

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
      reset_token: shop_reset_token,
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

  return (
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
        <button
          type="submit"
          disabled={isLoading}
          aria-disabled={isLoading ? true : false}
          className={`${styles.btn} ${isLoading && "cursor-not-allowed"}`}
        >
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px]">
        <Link to={"/shop-login"} className="pl-1 cursor-pointer text-[#2190ff]">
          <span className="text-[20px]">&larr;</span> Go Back to Sign In
        </Link>
      </h5>
      <br />
    </form>
  );
};

export default ShopResetPassword;
