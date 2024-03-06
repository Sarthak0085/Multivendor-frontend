import AllCategories from "../../components/Admin/AllCategories";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";

const AdminDashboardCategories = () => {
  return (
    <div>
      <AdminHeader active={12} />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={12} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllCategories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCategories;
