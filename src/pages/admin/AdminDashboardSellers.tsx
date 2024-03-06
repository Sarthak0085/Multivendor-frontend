import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllSellers from "../../components/Admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader active={4} />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden 400px:block w-[80px] 800px:w-[300px]">
            <AdminSideBar active={4} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllSellers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
