import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader active={12} />
      <div className="flex items-start justify-between w-full">
        <div className="w-auto fixed hidden sm:block 1100px:w-[300px] overflow-y-auto">
          <DashboardSideBar active={12} />
        </div>
        <div className="flex justify-between w-full mx-10 sm:mr-5 sm:ml-[85px] 1100px:ml-[250px] overflow-x-hidden overflow-y-auto">
          <ShopSettings />
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;
