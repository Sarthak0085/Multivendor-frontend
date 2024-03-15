import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AllSizes from "../../components/Admin/AllSizes";

const AdminDashboardSizes = () => {
  return (
    <div>
      <AdminHeader active={15} />
      <div className="flex items-start justify-between w-full">
        <div className="w-auto fixed hidden sm:block sm:w-[80px] 1100px:w-[260px] overflow-y-auto">
          <AdminSideBar active={15} />
        </div>
        <div className="flex justify-between w-full mx-10 sm:mr-5 sm:ml-[85px] 1100px:ml-[260px] overflow-x-hidden overflow-y-auto">
          <AllSizes />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSizes;