import { useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProfileSideBar from "../../components/Profile/ProfileSidebar";
import ProfileContent from "../../components/Profile/ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
      <Header activeHeading={1} />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-auto 1100px:w-[250px] sticky">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="flex w-full justify-center mt-5 overflow-x-hidden">
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
