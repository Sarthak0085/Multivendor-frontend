import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllWithdraw from "../../components/Admin/AllWithdraws";

const AdminDashboardWithdraw = () => {
  return (
    <div>
      <AdminHeader active={16} />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[300px]">
            <AdminSideBar active={16} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllWithdraw />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
