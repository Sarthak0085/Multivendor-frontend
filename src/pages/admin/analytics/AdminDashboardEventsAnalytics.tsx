import AdminHeader from "../../../components/Layout/AdminHeader";
import AdminSideBar from "../../../components/Admin/Layout/AdminSideBar";
import EventsAnalytics from "../../../components/Admin/Analytics/EventsAnalytics";

const AdminDashboardEventsAnalytics = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="hidden sm:block sm:w-[80px] 800px:w-[330px]">
            <AdminSideBar active={11} />
          </div>
          <div className="w-full overflow-x-auto">
            <EventsAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEventsAnalytics;
