import AdminHeader from "../../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import ProductAnalytics from "../../../components/Admin/Analytics/ProductsAnalytics";

const AdminDashboardProductsAnalytics = () => {
  return (
    <div>
      <AdminHeader active={5} />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={9} />
          </div>
          <div className="w-full overflow-x-auto">
            <ProductAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProductsAnalytics;
