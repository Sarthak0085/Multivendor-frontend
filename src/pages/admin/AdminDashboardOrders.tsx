import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllOrders from "../../components/Admin/AllOrders";

const AdminDashboardBrands = () => {
  return (
    <div>
      <AdminHeader active={2} />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBrands;
