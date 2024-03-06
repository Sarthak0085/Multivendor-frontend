import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import Footer from "../../components/Layout/Footer";
import OrderDetails from "../../components/Shop/OrderDetails";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader active={0} />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
