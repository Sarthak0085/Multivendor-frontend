import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { useSelector } from "react-redux";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../redux/features/user/userApi";
import styles from "../../styles/styles";
import {
  UpdateProfileFormData,
  updateProfileSchema,
} from "../../validations/UpdateProfile";
import { setErrorOptions, setSuccessOptions } from "../options";
import Input from "../shared/Input";

const ProfileContent = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [avatar, setAvatar] = useState(user?.avatar?.url);
  // const dispatch = useDispatch();

  const [updateProfileContent, { isSuccess, error, isLoading }] =
    useEditProfileMutation();

  const [updateAvatar, { isSuccess: AvatarSuccess, error: AvatarError }] =
    useUpdateAvatarMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    setValue("fullName", user?.fullName);
    setValue("email", user?.email);
    setValue("phoneNumber", user?.phoneNumber);
  }, [user, setValue]);

  useEffect(() => {
    if (isSuccess || AvatarSuccess) {
      const message = isSuccess
        ? "Profile updated successfully"
        : "Avatar updated successfully";
      toast.success(message, {
        style: setSuccessOptions,
      });
      // setValue
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

    if (AvatarError) {
      if ("data" in AvatarError) {
        const errorData = AvatarError;
        toast.error((errorData?.data as Error)?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [isSuccess, error, AvatarSuccess, AvatarError]);

  const updateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
    try {
      await updateProfileContent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
        try {
          await updateAvatar(avatar);
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (e.target.files !== null) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  console.log("avatar", avatar);

  return (
    <div className="w-full">
      {/* profile */}
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={`${avatar}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt={user?.fullName}
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <br />
      <div className="w-full px-5">
        <form onSubmit={handleSubmit(updateProfile)} aria-required={true}>
          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[48%] sm:w-[70%] mx-auto 800px:mr-[4%]">
              <Input
                type="text"
                name="fullName"
                label="Full Name"
                required={false}
                register={register}
                Icon={RxPerson}
                errors={errors}
                placeholder=""
                inputClassName={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              />
            </div>
            <div className=" w-[100%] 800px:w-[48%] sm:w-[70%] mx-auto">
              <Input
                type="email"
                name="email"
                label="Email Address"
                Icon={MdOutlineEmail}
                required={false}
                register={register}
                errors={errors}
                placeholder=""
                inputClassName={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              />
            </div>
          </div>

          <div className="w-full 800px:flex block pb-3 gap-4">
            <div className=" w-[100%] 800px:w-[48%] sm:w-[70%] mx-auto 800px:mx-0">
              <Input
                type="number"
                name="phoneNumber"
                label="Phone Number"
                Icon={FaMobileAlt}
                required={false}
                register={register}
                errors={errors}
                placeholder=""
                inputClassName={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              />
            </div>
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

export default ProfileContent;
