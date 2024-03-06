import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllEvents from "../../components/Admin/AllEvents";

const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={10} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <AllEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
