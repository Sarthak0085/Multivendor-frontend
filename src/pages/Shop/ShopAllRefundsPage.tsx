import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import AllRefundOrders from "../../components/Shop/AllRefundOrders";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopAllRefunds = () => {
  return (
    <div>
      <DashboardHeader active={10} />
      <div className="flex justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[300px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
