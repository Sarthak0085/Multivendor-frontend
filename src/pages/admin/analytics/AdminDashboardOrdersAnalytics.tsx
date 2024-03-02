import AdminHeader from "../../../components/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import OrdersAnalytics from "../../../components/Admin/Analytics/OrdersAnalytics";

const AdminDashboardOrdersAnalytics = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={3} />
          </div>
          <div className="w-full overflow-x-auto">
            <OrdersAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrdersAnalytics;
