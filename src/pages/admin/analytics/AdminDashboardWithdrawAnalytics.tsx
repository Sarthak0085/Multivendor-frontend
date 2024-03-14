import AdminHeader from "../../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import WithdrawAnalytics from "../../../components/Admin/Analytics/WithdrawAnalytics";

const AdminDashboardWithdrawAnalytics = () => {
  return (
    <div>
      <AdminHeader active={17} />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="w-auto fixed hidden sm:block sm:w-[80px] 1100px:w-[260px] overflow-y-auto">
            <AdminSideBar active={17} />
          </div>
          <div className="w-full overflow-x-auto mx-10 sm:mr-5 sm:ml-[85px] 1100px:ml-[260px] overflow-y-auto">
            <WithdrawAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdrawAnalytics;
