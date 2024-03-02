import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import AllCoupons from "../../components/Shop/AllCoupons";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[250px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex overflow-x-hidden">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;
