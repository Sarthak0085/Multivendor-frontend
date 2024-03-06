import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Footer from "../components/Layout/Footer";
import Checkout from "../components/Checkout/Checkout";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <CheckoutSteps active={1} />
      <Checkout />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
