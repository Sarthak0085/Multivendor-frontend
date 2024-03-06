import AdminHeader from "../../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import CouponAnalytics from "../../../components/Admin/Analytics/CouponAnalytics";

const AdminDashboardCouponsAnalytics = () => {
  return (
    <div>
      <AdminHeader active={15} />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={15} />
          </div>
          <div className="w-full overflow-x-auto">
            <CouponAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCouponsAnalytics;
