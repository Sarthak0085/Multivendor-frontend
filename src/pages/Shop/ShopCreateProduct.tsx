import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import CreateProduct from "../../components/Shop/CreateProduct";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[250px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
