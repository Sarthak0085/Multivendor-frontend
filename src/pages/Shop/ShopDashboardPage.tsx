import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardHero from "../../components/Shop/DashboardHero";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader active={1} />
      <div className="flex items-start justify-between w-full">
        <div className="w-auto fixed hidden sm:block 1100px:w-[250px] overflow-y-auto">
          <DashboardSideBar active={1} />
        </div>
        <div className="flex justify-between w-full mx-10 sm:mr-5 sm:ml-[85px] 1100px:ml-[250px] overflow-x-hidden overflow-y-auto">
          <DashboardHero />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
