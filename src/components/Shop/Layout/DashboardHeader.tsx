import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMenuAltLeft, BiMessageSquareDetail } from "react-icons/bi";
import { useRef, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import useClickOutside from "../../../hooks/useClickOutside";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";

const DashboardHeader = ({ active }: { active: number }) => {
  const { seller } = useSelector((state: any) => state?.auth);

  const [open, setOpen] = useState<boolean>(false);

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpen(false));

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link aria-label="Home" className="hidden sm:block" to="/" title="Home">
          <img
            src="https://res.cloudinary.com/dkzfopuco/image/upload/v1709903777/Trend_Flex__1_-removebg-preview_era9ij.svg"
            alt="logo"
            width={110}
            height={100}
          />
        </Link>
        <button className="block sm:hidden">
          <BiMenuAltLeft
            aria-label="Open Seller Dashboard"
            title="Open Seller Dashboard"
            size={40}
            className="ml-4"
            onClick={() => setOpen(true)}
          />
        </button>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link
            aria-label="Discount Coupons"
            to="/dashboard-coupons"
            className="800px:block hidden"
          >
            <AiOutlineGift
              aria-label="Discount Coupons"
              title="Discount Coupons"
              color={`${active === 9 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            aria-label="All Events"
            to="/dashboard-events"
            className="800px:block hidden"
          >
            <MdOutlineLocalOffer
              aria-label="All Events"
              title="All Events"
              color={`${active === 5 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            aria-label="All Products"
            to="/dashboard-products"
            className="800px:block hidden"
          >
            <FiPackage
              aria-label="All Products"
              title="All Products"
              color={`${active === 3 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            aria-label="All Orders"
            to="/dashboard-orders"
            className="800px:block hidden"
          >
            <FiShoppingBag
              aria-label="All Orders"
              title="All Orders"
              color={`${active === 2 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            aria-label="Dashboard Messages"
            to="/dashboard-messages"
            className="800px:block hidden"
          >
            <BiMessageSquareDetail
              aria-label="Inbox"
              title="Inbox"
              color={`${active === 8 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            aria-label={`${seller?.name}'s Profile`}
            to={`/shop/${seller?._id}`}
          >
            <img
              src={`${seller.avatar?.url}`}
              alt={`${seller?.name}'s Profile`}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-10">
          {/* single item */}
          <div
            ref={modalRef}
            className="w-[250px] h-screen fixed top-0 left-0 bg-white rounded shadow overflow-y-scroll"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute mt-3 right-2 "
            >
              <FaArrowLeft
                aria-label="Close"
                size={18}
                title="Close"
                color="crimson"
              />
            </button>
            <div className="mt-12 flex items-center justify-center">
              <Link aria-label="Home" to="/">
                <img
                  src="https://res.cloudinary.com/dkzfopuco/image/upload/v1709903777/Trend_Flex__1_-removebg-preview_era9ij.svg"
                  alt="logo"
                  width={110}
                  height={100}
                />
              </Link>
            </div>
            <div className="w-full flex items-center justify-center p-4 pt-10">
              <Link
                aria-label={`${seller?.name}'s Dashboard`}
                to="/dashboard"
                className="w-full flex items-center"
              >
                <RxDashboard
                  aria-label={`${seller?.name}'s Dashboard`}
                  title="Seller Dashboard"
                  size={30}
                  color={`${active === 1 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 1 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Dashboard
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="All Orders"
                to="/dashboard-orders"
                className="w-full flex items-center"
              >
                <FiShoppingBag
                  aria-label="All Orders"
                  title="All Orders"
                  size={30}
                  color={`${active === 2 ? "crimson" : "#555"}`}
                />
                <h5
                  className={` pl-2 text-[18px] font-[400] ${
                    active === 2 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  All Orders
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="All Products"
                to="/dashboard-products"
                className="w-full flex items-center"
              >
                <FiPackage
                  aria-label="All Products"
                  title="All Products"
                  size={30}
                  color={`${active === 3 ? "crimson" : "#555"}`}
                />
                <h5
                  className={` pl-2 text-[18px] font-[400] ${
                    active === 3 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  All Products
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="Create Product"
                to="/dashboard-create-product"
                className="w-full flex items-center"
              >
                <AiOutlineFolderAdd
                  aria-label="Create Product"
                  title="Create Product"
                  size={30}
                  color={`${active === 4 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 4 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Create Product
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="All Events"
                to="/dashboard-events"
                className="w-full flex items-center"
              >
                <MdOutlineLocalOffer
                  aria-label="All Events"
                  title="All Events"
                  size={30}
                  color={`${active === 5 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 5 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  All Events
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="Create Event"
                to="/dashboard-create-event"
                className="w-full flex items-center"
              >
                <VscNewFile
                  aria-label="Create Event"
                  title="Create Event"
                  size={30}
                  color={`${active === 6 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 6 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Create Event
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="Withdraw Money"
                to="/dashboard-withdraw-money"
                className="w-full flex items-center"
              >
                <CiMoneyBill
                  aria-label="Withdraw Money"
                  title="Withdraw Money"
                  size={30}
                  color={`${active === 7 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 7 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Withdraw Money
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="Shop Inbox"
                to="/dashboard-messages"
                className="w-full flex items-center"
              >
                <BiMessageSquareDetail
                  title="Shop Inbox"
                  aria-label="Shop Inbox"
                  size={30}
                  color={`${active === 8 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 8 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Shop Inbox
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="Dashboard Coupons"
                to="/dashboard-coupons"
                className="w-full flex items-center"
              >
                <AiOutlineGift
                  aria-label="Discount Coupons"
                  title="Discount Coupons"
                  size={30}
                  color={`${active === 9 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 9 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Discount Codes
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="All Refund Orders"
                to="/dashboard-refunds"
                className="w-full flex items-center"
              >
                <HiOutlineReceiptRefund
                  aria-label="All Refund Orders"
                  title="All Refund Orders"
                  size={30}
                  color={`${active === 10 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 10 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Refunds
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="Change Password"
                to="/settings"
                className="w-full flex items-center"
              >
                <RiLockPasswordLine
                  aria-label="Change Password"
                  title="Change Password"
                  size={22}
                  color={`${active === 11 ? "text-[crimson]" : "text-[#555]"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 11 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Change Password
                </h5>
              </Link>
            </div>

            <div className="w-full flex items-center p-4">
              <Link
                aria-label="Seller Profile Settings"
                to="/settings"
                className="w-full flex items-center"
              >
                <CiSettings
                  aria-label="Seller Profile Settings"
                  title="Settings"
                  size={30}
                  color={`${active === 12 ? "crimson" : "#555"}`}
                />
                <h5
                  className={`pl-2 text-[18px] font-[400] ${
                    active === 12 ? "text-[crimson]" : "text-[#555]"
                  }`}
                >
                  Settings
                </h5>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
