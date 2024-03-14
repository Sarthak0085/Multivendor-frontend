import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxCross1, RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { setErrorOptions, setSuccessOptions } from "../options";
import { useLogoutMutation } from "../../redux/features/auth/authApi";

const ProfileMobileSidebar = ({
  setActive,
  active,
  setOpen,
}: {
  active: number;
  setActive: (active: number) => void;
  setOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();

  const { user } = useSelector((state: any) => state?.auth);
  console.log(user);
  const [logout, { isSuccess, error, isLoading }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged Out Successfully", {
        style: setSuccessOptions,
      });
      navigate("/login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [isSuccess, error]);

  const logoutHandler = async () => {
    await logout({});
  };
  return (
    <div className="relative w-full min-h-[screen] space-y-auto mt-[18px] bg-white shadow-sm p-4 pt-[45px]">
      <button onClick={() => setOpen(false)} className="absolute top-5 right-5">
        <RxCross1 title="close" aria-label="Close" size={20} color="red" />
      </button>
      <Link
        aria-label={`${user.fullName}'s Profile`}
        to={`/profile/${user?._id}`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson
          aria-label={`${user.fullName}'s Profile`}
          title={`${user.fullName}'s Profile`}
          size={22}
          color={active === 1 ? "red" : ""}
        />
        <button className={`pl-3 ${active === 1 ? "text-[red]" : ""}`}>
          Profile
        </button>
      </Link>
      <Link
        aria-label={`${user.fullName}'s Orders`}
        to={`/profile/${user?._id}/all-orders`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag
          aria-label={`${user.fullName}'s Orders`}
          title={`${user.fullName}'s Orders`}
          size={22}
          color={active === 2 ? "red" : ""}
        />
        <button className={`pl-3 ${active === 2 ? "text-[red]" : ""}`}>
          Orders
        </button>
      </Link>
      <Link
        aria-label={`${user.fullName}'s Refund Orders`}
        to={`/profile/${user?._id}/refund-orders`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund
          aria-label={`${user.fullName}'s Refund Orders`}
          title={`${user.fullName}'s Refund Orders`}
          size={22}
          color={active === 3 ? "red" : ""}
        />
        <button className={`pl-3 ${active === 3 ? "text-[red]" : ""}`}>
          Refunds
        </button>
      </Link>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4)}
        //   || navigate("/inbox")
      >
        <AiOutlineMessage
          aria-label="Inbox"
          title={` Inbox`}
          size={22}
          color={active === 4 ? "red" : ""}
        />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : ""}`}>
          Inbox
        </span>
      </div>

      <Link
        aria-label={`Track Order`}
        to={`/profile/${user?._id}/track/order/${user?._id}`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges
          aria-label={`Track Order`}
          title={`Track Order`}
          size={22}
          color={active === 5 ? "red" : ""}
        />
        <span className={`pl-3 ${active === 5 ? "text-[red]" : ""}`}>
          Track Order
        </span>
      </Link>

      <Link
        aria-label="Change Password"
        to={`/profile/${user?._id}/password`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine
          aria-label="Change Password"
          title="Change Password"
          size={22}
          color={active === 6 ? "red" : ""}
        />
        <button
          className={`pl-3 self-start ${active === 6 ? "text-[red]" : ""}`}
        >
          Change Password
        </button>
      </Link>

      <Link
        aria-label={`${user.fullName}'s Address`}
        to={`/profile/${user?._id}/address`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook
          aria-label={`${user.fullName}'s Address`}
          title={`${user.fullName}'s Addresses`}
          size={22}
          color={active === 7 ? "red" : ""}
        />
        <button className={`pl-3  ${active === 7 ? "text-[red]" : ""}`}>
          Address
        </button>
      </Link>

      {user && user?.role === "ADMIN" && (
        <Link
          aria-label="Admin Dashboard"
          to="/admin/dashboard"
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(8)}
        >
          <MdOutlineAdminPanelSettings
            aria-label="Admin Dashboard"
            title="Admin Dashboard"
            size={22}
            color={active === 8 ? "red" : ""}
          />
          <span className={`pl-3 ${active === 8 ? "text-[red]" : ""}`}>
            Admin Dashboard
          </span>
        </Link>
      )}
      <button
        className={` ${
          isLoading && "cursor-not-allowed"
        } flex items-center cursor-pointer w-full mb-8`}
        onClick={logoutHandler}
        disabled={isLoading}
        aria-disabled={isLoading ? true : false}
      >
        <AiOutlineLogin
          aria-label="Logout"
          title={`Logout`}
          size={22}
          color={active === 9 ? "red" : ""}
        />
        <span className={`pl-3 ${active === 8 ? "text-[red]" : ""}`}>
          Log out
        </span>
      </button>
    </div>
  );
};

export default ProfileMobileSidebar;
