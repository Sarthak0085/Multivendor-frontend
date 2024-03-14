import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import ProfileMobileSidebar from "../../components/Profile/MobileSidebar";
import ProfileSideBar from "../../components/Profile/ProfileSidebar";
import AllRefundOrders from "../../components/Profile/RefundOrders";
import styles from "../../styles/styles";

const AllRefundOrdersPage = () => {
  const [active, setActive] = useState<number>(3);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Header activeHeading={6} />
      <div className={`${styles.section} relative flex bg-[#f5f5f5] py-12`}>
        {open && (
          <div className="fixed w-full min-h-[80vh] top-[64px] left-0 z-10">
            <ProfileMobileSidebar
              setOpen={setOpen}
              active={active}
              setActive={setActive}
            />
          </div>
        )}
        <div className="absolute top-3 right-3 text-blue-500 block sm:hidden">
          <BiMenu
            size={25}
            title="Profile Menu"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="w-auto hidden sm:block 1100px:w-[250px] sticky">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="flex w-full justify-center overflow-x-hidden">
          <AllRefundOrders />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllRefundOrdersPage;
