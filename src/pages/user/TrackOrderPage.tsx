import { useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProfileSideBar from "../../components/Profile/ProfileSidebar";
import TrackOrder from "../../components/Profile/TrackOrder";

const TrackOrderPage = () => {
  const [active, setActive] = useState(5);

  return (
    <div>
      <Header activeHeading={6} />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-auto 1100px:w-[250px] sticky">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="flex justify-center overflow-x-hidden w-full">
          <TrackOrder />
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
