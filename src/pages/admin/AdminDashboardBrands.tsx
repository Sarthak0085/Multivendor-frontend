import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllBrands from "../../components/Admin/AllBrands";

const AdminDashboardBrands = () => {
  return (
    <div>
      <AdminHeader active={13} />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={13} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllBrands />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBrands;
