import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";
import EditProduct from "../../components/Shop/EditProduct";

const ShopEditProductPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[250px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <EditProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopEditProductPage;
