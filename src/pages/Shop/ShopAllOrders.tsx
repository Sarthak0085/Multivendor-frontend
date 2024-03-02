import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";
import AllOrders from "../../components/Shop/AllOrders";

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[250px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full justify-center flex overflow-x-hidden">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
