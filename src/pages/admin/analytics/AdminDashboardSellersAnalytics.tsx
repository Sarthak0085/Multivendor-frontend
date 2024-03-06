import AdminHeader from "../../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import SellersAnalytics from "../../../components/Admin/Analytics/SellersAnalytics";

const AdminDashboardSellersAnalytics = () => {
  return (
    <div>
      <AdminHeader active={5} />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <div className="w-full overflow-x-auto">
            <SellersAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellersAnalytics;
