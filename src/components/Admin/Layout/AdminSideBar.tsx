import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting, AiOutlineOrderedList } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { SiGoogleanalytics } from "react-icons/si";
import { TbBrandProducthunt, TbBrandAnsible } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { TbFileAnalytics } from "react-icons/tb";
import { IoIosAnalytics } from "react-icons/io";
import { FaQ } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { GiKnightBanner } from "react-icons/gi";
import { IoMdColorFilter } from "react-icons/io";
import { SiZendesk } from "react-icons/si";

const AdminSideBar = ({ active }: { active: number }) => {
  const { user } = useSelector((state: any) => state?.auth);
  return (
    <div className="w-full pt-4 hidden sm:block h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Admin Dashboard"
          to="/admin/dashboard"
          className="w-full flex items-center"
        >
          <RxDashboard
            aria-label="Admin Dashboard"
            title="Admin Dashboard"
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
          to="/admin-orders"
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
          aria-label="Orders Analytics"
          to="/admin-orders-analytics"
          className="w-full flex items-center"
        >
          <AiOutlineOrderedList
            aria-label="Orders Analytics"
            title="Orders Analytics"
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Orders Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Sellers"
          to="/admin-sellers"
          className="w-full flex items-center"
        >
          <GrWorkshop
            aria-label="All Sellers"
            title="All Sellers"
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Sellers Analytics"
          to="/admin-sellers-analytics"
          className="w-full flex items-center"
        >
          <SiGoogleanalytics
            aria-label="Sellers Analytics"
            title="Sellers Analytics"
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Sellers Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Users"
          to="/admin-users"
          className="w-full flex items-center"
        >
          <HiOutlineUserGroup
            aria-label="All Users"
            title="All Users"
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Users Analytics"
          to="/admin-users-analytics"
          className="w-full flex items-center"
        >
          <IoAnalytics
            aria-label="Users Analytics"
            title="Users Analytics"
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Users Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Products"
          to="/admin-products"
          className="w-full flex items-center"
        >
          <BsHandbag
            aria-label="All Products"
            title="All Products"
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Products Analytics"
          to="/admin-products-analytics"
          className="w-full flex items-center"
        >
          <TbBrandProducthunt
            aria-label="Products Analytics"
            title="Products Analytics"
            size={30}
            color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Products Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Events"
          to="/admin-events"
          className="w-full flex items-center"
        >
          <MdOutlineLocalOffer
            aria-label="All Events"
            title="All Events"
            size={30}
            color={`${active === 10 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Events Analytics"
          to="/admin-events-analytics"
          className="w-full flex items-center"
        >
          <MdEventNote
            aria-label="Events Analytics"
            title="Events Analytics"
            size={30}
            color={`${active === 11 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Events Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Categories"
          to="/admin-categories"
          className="w-full flex items-center"
        >
          <BiCategory
            aria-label="All Categories"
            title="All Categories"
            size={30}
            color={`${active === 12 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 12 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Categories
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Brands"
          to="/admin-brands"
          className="w-full flex items-center"
        >
          <TbBrandAnsible
            aria-label="All Brands"
            title="All Brands"
            size={30}
            color={`${active === 13 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 13 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Brands
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Colors"
          to="/admin-colors"
          className="w-full flex items-center"
        >
          <IoMdColorFilter
            aria-label="All Colors"
            title="All Colors"
            size={30}
            color={`${active === 14 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 14 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Colors
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Sizes"
          to="/admin-Sizes"
          className="w-full flex items-center"
        >
          <SiZendesk
            aria-label="All Sizes"
            title="All Sizes"
            size={30}
            color={`${active === 15 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 15 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Sizes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="All Coupons"
          to="/admin-coupons"
          className="w-full flex items-center"
        >
          <RiCoupon2Line
            aria-label="All Coupons"
            title="All Coupons"
            size={30}
            color={`${active === 16 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 16 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Coupons
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Coupons Analytics"
          to="/admin-coupons-analytics"
          className="w-full flex items-center"
        >
          <IoIosAnalytics
            aria-label="Coupons Analytics"
            title="Coupons Analytics"
            size={30}
            color={`${active === 17 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 17 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Coupons Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Withdraw Request"
          to="/admin-withdraw-request"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            aria-label="Withdraw Request"
            title="Withdraw Request"
            size={30}
            color={`${active === 18 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 18 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Withdraw Analytics"
          to="/admin-withdraw-analytics"
          className="w-full flex items-center"
        >
          <TbFileAnalytics
            aria-label="Withdraw Analytics"
            title="Withdraw Analytics"
            size={30}
            color={`${active === 19 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 19 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Edit FAQ"
          to="/admin-edit-faq"
          className="w-full flex items-center"
        >
          <FaQ
            aria-label="Edit FAQ"
            title="Edit FAQ"
            size={30}
            color={`${active === 20 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 20 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Edit FAQ
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Edit Banner"
          to="/admin-edit-hero"
          className="w-full flex items-center"
        >
          <GiKnightBanner
            aria-label="Edit Banner"
            title="Edit Banner"
            size={30}
            color={`${active === 21 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 21 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Edit Banner
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          aria-label="Admin Profile"
          to={`/profile/${user?._id}`}
          className="w-full flex items-center"
        >
          <AiOutlineSetting
            aria-label="Admin Profile"
            title="Admin Profile"
            size={30}
            color={`${active === 22 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 1100px:block pl-2 text-[18px] font-[400] ${
              active === 22 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
