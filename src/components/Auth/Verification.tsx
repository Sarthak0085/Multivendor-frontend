import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useActivationMutation } from "../../redux/features/auth/authApi";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { setLoadingOptions } from "../options";

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state: any) => state.auth);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [activation, { isSuccess, error, isLoading }] = useActivationMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Activating...", {
        style: setLoadingOptions,
        // duration: Infinity,
      });
    }
    if (isSuccess) {
      const message =
        "Account Activated Successfully. Please Login to Continue.";
      toast.success(message);
      navigate("/login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        toast.error("An error occured");
        setInvalidError(false);
      }
    }
  }, [isSuccess, error, navigate, isLoading]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
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
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <div className="w-full flex items-center justify-center mt-2">
        <div className="h-[80px] w-[80px] rounded-full flex items-center justify-center bg-blue-500">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="1100px:w-[70%] m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            inputMode="numeric"
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center no-spin text-black justify-center outline-none text-[18px] text-center font-Poppins
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
          disabled={isLoading}
          aria-disabled={isLoading ? true : false}
          className={`${styles.btn} ${isLoading && "cursor-not-allowed"}`}
          onClick={verificationHandler}
        >
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
    </>
  );
};

export default Verification;
