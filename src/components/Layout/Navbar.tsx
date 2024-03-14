import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }: { active: number }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              title={i.title}
              aria-label={i.title}
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
