import AdminHeader from "../../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import EditFaq from "../../../components/Admin/Customization/EditFaq";

const AdminDashboardEditFaq = () => {
  return (
    <div>
      <AdminHeader active={18} />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={18} />
          </div>
          <div className="w-full flex justify-center overflow-x-hidden overflow-y-auto">
            <EditFaq />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEditFaq;
