import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Footer from "../components/Layout/Footer";
import Checkout from "../components/Checkout/Checkout";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      {/* <br />
        <br /> */}
      <CheckoutSteps active={1} />
      <Checkout />
      {/* <br />
        <br /> */}
      <Footer />
    </div>
  );
};

export default CheckoutPage;
