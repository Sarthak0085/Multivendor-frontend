import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import { useSelector } from "react-redux";
// import AdminDashboardMain from "../../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  const { loading } = useSelector((state: any) => state.auth);
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={1} />
          </div>
          {/* <AdminDashboardMain /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
