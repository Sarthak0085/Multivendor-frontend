import AdminHeader from "../../../components/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import EditHero from "../../../components/Admin/Customization/EditHero";

const AdminDashboardEditHero = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px] fixed h-full overflow-y-auto">
            <AdminSideBar active={19} />
          </div>
          <div className="w-full overflow-x-auto ml-[80px] 800px:ml-[330px]">
            <div className="mt-[60px]">
              <EditHero />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEditHero;
