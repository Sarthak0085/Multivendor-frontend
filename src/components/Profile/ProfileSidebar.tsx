import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { setErrorOptions, setSuccessOptions } from "../options";
import { useLogoutMutation } from "../../redux/features/auth/authApi";

const ProfileSidebar = ({
  setActive,
  active,
}: {
  active: number;
  setActive: (active: number) => void;
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
    <div className="w-full mt-[20px] bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <Link
        to={`/profile/${user?._id}`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson
          title={`${user.fullName}'s Profile`}
          size={22}
          color={active === 1 ? "red" : ""}
        />
        <button
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 1100px:block hidden`}
        >
          Profile
        </button>
      </Link>
      <Link
        to={`/profile/${user?._id}/all-orders`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag
          title={`All Orders`}
          size={22}
          color={active === 2 ? "red" : ""}
        />
        <button
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 1100px:block hidden`}
        >
          Orders
        </button>
      </Link>
      <Link
        to={`/profile/${user?._id}/refund-orders`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund
          title={` All Refund Orders`}
          size={22}
          color={active === 3 ? "red" : ""}
        />
        <button
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } 1100px:block hidden`}
        >
          Refunds
        </button>
      </Link>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4)}
        //   || navigate("/inbox")
      >
        <AiOutlineMessage
          title={` Inbox`}
          size={22}
          color={active === 4 ? "red" : ""}
        />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          } 1100px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <Link
        to={`/profile/${user?._id}/track/order/${user?._id}`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges
          title={`Track Order`}
          size={22}
          color={active === 5 ? "red" : ""}
        />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          } 1100px:block hidden`}
        >
          Track Order
        </span>
      </Link>

      <Link
        to={`/profile/${user?._id}/password`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine
          title="Change Password"
          size={22}
          color={active === 6 ? "red" : ""}
        />
        <button
          className={`pl-3 self-start ${
            active === 6 ? "text-[red]" : ""
          } 1100px:block hidden`}
        >
          Change Password
        </button>
      </Link>

      <Link
        to={`/profile/${user?._id}/address`}
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook
          title={`${user.fullName}'s Addresses`}
          size={22}
          color={active === 7 ? "red" : ""}
        />
        <button
          className={`pl-3  ${
            active === 7 ? "text-[red]" : ""
          } 1100px:block hidden`}
        >
          Address
        </button>
      </Link>

      {user && user?.role === "ADMIN" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              title="Admin Dashboard"
              size={22}
              color={active === 8 ? "red" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[red]" : ""
              } 1100px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
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
          title={`Logout`}
          size={22}
          color={active === 9 ? "red" : ""}
        />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          } 1100px:block hidden`}
        >
          Log out
        </span>
      </button>
    </div>
  );
};

export default ProfileSidebar;
