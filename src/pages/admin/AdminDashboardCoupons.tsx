import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllCoupons from "../../components/Admin/AllCoupons";

const AdminDashboardCoupons = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={14} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllCoupons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCoupons;
