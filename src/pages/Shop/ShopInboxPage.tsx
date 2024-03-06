import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";
// import DashboardMessages from "../../components/Shop/DashboardMessages";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader active={8} />
      <div className="flex items-start justify-between w-full">
        <div className="w-auto fixed hidden sm:block 1100px:w-[300px] overflow-y-auto">
          <DashboardSideBar active={8} />
        </div>
        {/* <DashboardMessages /> */}
      </div>
    </div>
  );
};

export default ShopInboxPage;
