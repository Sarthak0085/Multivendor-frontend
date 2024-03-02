import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[250px]">
          <DashboardSideBar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithDrawMoneyPage;
