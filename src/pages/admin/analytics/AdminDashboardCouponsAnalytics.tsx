import AdminHeader from "../../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import CouponAnalytics from "../../../components/Admin/Analytics/CouponAnalytics";

const AdminDashboardCouponsAnalytics = () => {
  return (
    <div>
      <AdminHeader active={15} />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="w-auto fixed hidden sm:block sm:w-[80px] 1100px:w-[260px] overflow-y-auto">
            <AdminSideBar active={15} />
          </div>
          <div className="w-full overflow-x-auto mx-10 sm:mr-5 sm:ml-[85px] 1100px:ml-[260px] overflow-y-auto">
            <CouponAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCouponsAnalytics;
