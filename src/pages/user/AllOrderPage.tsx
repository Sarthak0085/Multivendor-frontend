import { useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProfileSideBar from "../../components/Profile/ProfileSidebar";
import { useSelector } from "react-redux";
import AllOrders from "../../components/Profile/AllOrders";
import Loader from "../../components/Layout/Loader";
import Footer from "../../components/Layout/Footer";
import { BiMenu } from "react-icons/bi";

const AllOrdersPage = () => {
  const { isLoading } = useSelector((state: any) => state?.auth);
  console.log(isLoading);

  const [active, setActive] = useState(2);

  return (
    <div>
      <Header activeHeading={1} />
      <div className={`${styles.section} relative flex bg-[#f5f5f5] py-12`}>
        <div className="absolute top-3 right-3 text-blue-500 block sm:hidden">
          <BiMenu size={23} title="Profile Menu" />
        </div>
        <div className="w-auto hidden sm:block 1100px:w-[250px] sticky">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="flex w-full justify-center overflow-x-hidden">
          {isLoading ? <Loader /> : <AllOrders />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllOrdersPage;
