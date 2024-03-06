import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";
import EditProduct from "../../components/Shop/EditProduct";

const ShopEditProductPage = () => {
  return (
    <div>
      <DashboardHeader active={3} />
      <div className="flex items-center justify-between w-full">
        <div className="w-auto hidden sm:block 1100px:w-[300px] overflow-y-auto">
          <DashboardSideBar active={3} />
        </div>
        <div className="flex justify-between w-full mx-10 sm:mr-5 sm:ml-[85px] 1100px:ml-[250px] overflow-x-hidden overflow-y-auto">
          <EditProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopEditProductPage;
