import AdminHeader from "../../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import OrdersAnalytics from "../../../components/Admin/Analytics/OrdersAnalytics";

const AdminDashboardOrdersAnalytics = () => {
  return (
    <div>
      <AdminHeader active={3} />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="w-auto fixed hidden sm:block sm:w-[80px] 1100px:w-[260px] overflow-y-auto">
            <AdminSideBar active={3} />
          </div>
          <div className="w-full overflow-x-auto mx-10 sm:mr-5 sm:ml-[85px] 1100px:ml-[260px] overflow-y-auto">
            <OrdersAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrdersAnalytics;
