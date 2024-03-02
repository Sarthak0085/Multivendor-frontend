import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllProducts from "../../components/Admin/AllProducts";

const AdminDashboardProducts = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={8} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
