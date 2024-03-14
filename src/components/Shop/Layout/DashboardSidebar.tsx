import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

const DashboardSideBar = ({ active }: { active: number }) => {
  return (
    <div className="w-full h-[90vh] pt-4 space-y-2 bg-gray-50 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Seller Dashboard"
          to="/dashboard"
          className="w-full flex items-center"
        >
          <RxDashboard
            aria-label="Seller Dashboard"
            title="Seller Dashboard"
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
            aria-label="Shop Inbox"
            title="Shop Inbox"
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Discount Coupons"
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
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
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
          to="/change-password"
          className="w-full flex items-center"
        >
          <RiLockPasswordLine
            aria-label="Change Password"
            title="Change Password"
            size={22}
            color={`${active === 11 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Change Password
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Shop Profile Setting"
          to="/settings"
          className="w-full flex items-center"
        >
          <CiSettings
            aria-label="Shop Profile Setting"
            title="Settings"
            size={30}
            color={`${active === 11 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
