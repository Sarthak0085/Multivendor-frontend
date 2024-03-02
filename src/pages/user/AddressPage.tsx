import { useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProfileSideBar from "../../components/Profile/ProfileSidebar";
import { useSelector } from "react-redux";
import Loader from "../../components/Layout/Loader";
import Address from "../../components/Profile/Address";

const AddressPage = () => {
  const { isLoading } = useSelector((state: any) => state?.auth);
  console.log(isLoading);

  const [active, setActive] = useState(7);

  return (
    <div>
      <Header activeHeading={6} />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-auto 1100px:w-[250px] sticky">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="flex justify-center overflow-x-hidden w-full">
          {isLoading ? <Loader /> : <Address />}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
