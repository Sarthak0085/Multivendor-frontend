import AllProducts from "../../components/Shop/AllProducts";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
// import AllProducts from "../../components/Shop/AllProducts";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[250px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex overflow-x-hidden">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
