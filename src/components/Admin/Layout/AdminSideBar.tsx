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

const AdminSideBar = ({ active }: { active: number }) => {
  const { user } = useSelector((state: any) => state?.auth);
  return (
    <div className="w-full hidden sm:block h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-orders-analytics" className="w-full flex items-center">
          <AiOutlineOrderedList
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Orders Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-sellers" className="w-full flex items-center">
          <GrWorkshop
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-sellers-analytics"
          className="w-full flex items-center"
        >
          <SiGoogleanalytics
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Sellers Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-users" className="w-full flex items-center">
          <HiOutlineUserGroup
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-users-analytics" className="w-full flex items-center">
          <IoAnalytics
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Users Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-products" className="w-full flex items-center">
          <BsHandbag size={30} color={`${active === 8 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-products-analytics"
          className="w-full flex items-center"
        >
          <TbBrandProducthunt
            size={30}
            color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Products Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 10 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-events-analytics" className="w-full flex items-center">
          <MdEventNote
            size={30}
            color={`${active === 11 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Events Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-categories" className="w-full flex items-center">
          <BiCategory
            size={30}
            color={`${active === 12 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 12 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Categories
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-brands" className="w-full flex items-center">
          <TbBrandAnsible
            size={30}
            color={`${active === 13 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 13 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Brands
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-coupons" className="w-full flex items-center">
          <RiCoupon2Line
            size={30}
            color={`${active === 14 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 14 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Coupons
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-coupons-analytics"
          className="w-full flex items-center"
        >
          <IoIosAnalytics
            size={30}
            color={`${active === 15 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 15 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Coupons Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-withdraw-request" className="w-full flex items-center">
          <CiMoneyBill
            size={30}
            color={`${active === 16 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 16 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-withdraw-analytics"
          className="w-full flex items-center"
        >
          <TbFileAnalytics
            size={30}
            color={`${active === 17 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 17 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Analytics
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-edit-faq" className="w-full flex items-center">
          <FaQ size={30} color={`${active === 18 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 18 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Edit FAQ
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-edit-hero" className="w-full flex items-center">
          <GiKnightBanner
            size={30}
            color={`${active === 19 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 19 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Edit Banner
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to={`/profile/${user?._id}`} className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 19 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 19 ? "text-[crimson]" : "text-[#555]"
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
