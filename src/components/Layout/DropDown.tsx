import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { ICategory } from "../../types/types";

const DropDown = ({
  categoriesData,
  setDropDown,
}: {
  categoriesData: ICategory[];
  setDropDown: (dropDown: boolean) => void;
}) => {
  const navigate = useNavigate();
  const submitHandle = (i: ICategory) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] h-[70vh] bg-[#fff] absolute z-30 rounded-b-md shadow-sm overflow-y-auto">
      {categoriesData &&
        categoriesData.map((i: ICategory, index: number) => (
          <div
            key={index}
            className={`${styles.noramlFlex} gap-3`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i?.image?.url}
              className="w-[40px] h-[40px] rounded-full ml-[10px] select-none"
              alt={i?.title}
            />
            <h3 className="m-3 cursor-pointer select-none">{i?.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
