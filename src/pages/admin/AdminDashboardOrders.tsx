import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllOrders from "../../components/Admin/AllOrders";

const AdminDashboardBrands = () => {
  return (
    <div>
      <AdminHeader active={2} />
      <div className="flex items-start justify-between w-full">
        <div className="w-auto fixed hidden sm:block sm:w-[80px] 1100px:w-[260px] overflow-y-auto">
          <AdminSideBar active={2} />
        </div>
        <div className="flex justify-between w-full mx-10 sm:mr-5 sm:ml-[85px] 1100px:ml-[260px] overflow-x-hidden overflow-y-auto">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBrands;
