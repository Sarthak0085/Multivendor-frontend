import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllUsers from "../../components/Admin/AllUsers";

const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[300px]">
            <AdminSideBar active={6} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
