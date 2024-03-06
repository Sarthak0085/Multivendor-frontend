import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader active={7} />
      <div className="flex items-start justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[300px] overflow-y-auto">
          <DashboardSideBar active={7} />
        </div>
        <div className="flex justify-between w-full overflow-x-hidden overflow-y-auto">
          <WithdrawMoney />
        </div>
      </div>
    </div>
  );
};

export default ShopWithDrawMoneyPage;
