import AdminHeader from "../../../components/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import UsersAnalytics from "../../../components/Admin/Analytics/UsersAnalytics";

const AdminDashboardUsersAnalytics = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={7} />
          </div>
          <div className="w-full overflow-x-auto">
            <UsersAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsersAnalytics;
