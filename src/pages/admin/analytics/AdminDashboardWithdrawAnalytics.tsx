import AdminHeader from "../../../components/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import WithdrawAnalytics from "../../../components/Admin/Analytics/WithdrawAnalytics";

const AdminDashboardWithdrawAnalytics = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px]800px:w-[330px]">
            <AdminSideBar active={17} />
          </div>
          <div className="w-full overflow-x-auto">
            <WithdrawAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdrawAnalytics;
