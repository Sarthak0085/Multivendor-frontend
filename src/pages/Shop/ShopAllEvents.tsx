import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import AllEvents from "../../components/Shop/AllEvents";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[250px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex overflow-x-hidden">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvents;
