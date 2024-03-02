import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
// import AllWithdraw from "../../components/Admin/AllWithdraw";

const AdminDashboardWithdraw = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={16} />
          </div>
          {/* <AllWithdraw /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
