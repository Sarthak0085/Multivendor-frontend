import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import CreateEvent from "../../components/Shop/CreateEvent";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopCreateEvents = () => {
  return (
    <div>
      <DashboardHeader active={6} />
      <div className="flex items-center justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[300px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex mt-10 sm:mt-0">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvents;
