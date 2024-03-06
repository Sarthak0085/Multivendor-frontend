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
        <Link className="hidden sm:block" to="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
        <button className="block sm:hidden">
          <BiMenuAltLeft
            size={40}
            className="ml-4"
            onClick={() => setOpen(true)}
          />
        </button>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard-coupons" className="800px:block hidden">
            <AiOutlineGift
              title="Discount Coupons"
              color={`${active === 9 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              title="All Events"
              color={`${active === 5 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiPackage
              title="All Products"
              color={`${active === 3 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiShoppingBag
              title="All Orders"
              color={`${active === 2 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              title="Inbox"
              color={`${active === 8 ? "crimson" : "#555"}`}
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar?.url}`}
              alt={seller?.name}
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
              <FaArrowLeft size={18} title="Close" color="crimson" />
            </button>
            <div className="mt-12 flex items-center justify-center">
              <Link to="/">
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt=""
                />
              </Link>
            </div>
            <div className="w-full flex items-center justify-center p-4 pt-10">
              <Link to="/dashboard" className="w-full flex items-center">
                <RxDashboard
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
              <Link to="/dashboard-orders" className="w-full flex items-center">
                <FiShoppingBag
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
                to="/dashboard-products"
                className="w-full flex items-center"
              >
                <FiPackage
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
                to="/dashboard-create-product"
                className="w-full flex items-center"
              >
                <AiOutlineFolderAdd
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
              <Link to="/dashboard-events" className="w-full flex items-center">
                <MdOutlineLocalOffer
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
                to="/dashboard-create-event"
                className="w-full flex items-center"
              >
                <VscNewFile
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
                to="/dashboard-withdraw-money"
                className="w-full flex items-center"
              >
                <CiMoneyBill
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
                to="/dashboard-messages"
                className="w-full flex items-center"
              >
                <BiMessageSquareDetail
                  title="Inbox"
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
                to="/dashboard-coupons"
                className="w-full flex items-center"
              >
                <AiOutlineGift
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
                to="/dashboard-refunds"
                className="w-full flex items-center"
              >
                <HiOutlineReceiptRefund
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
              <Link to="/settings" className="w-full flex items-center">
                <RiLockPasswordLine
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
              <Link to="/settings" className="w-full flex items-center">
                <CiSettings
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

            {/* <button
              className={`pl-3 self-start ${
                active === 6 ? "text-[red]" : ""
              } 1100px:block hidden`}
            >
              Change Password
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
