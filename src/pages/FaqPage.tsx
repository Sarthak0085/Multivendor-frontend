import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Faq from "../components/Faq";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

export default FAQPage;
