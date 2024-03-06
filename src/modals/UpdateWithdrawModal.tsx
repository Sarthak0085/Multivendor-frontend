import { RxCross1 } from "react-icons/rx";
import styles from "../styles/styles";
import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

interface IUpdateWithdraw {
  setOpen: (open: boolean) => void;
  withdrawStatus: string;
  setWithdrawStatus: (withdrawStatus: string) => void;
  handleSubmit: () => void;
  updateLoading: boolean;
}

const UpdateWithdrawModal = ({
  setOpen,
  withdrawStatus,
  setWithdrawStatus,
  handleSubmit,
  updateLoading,
}: IUpdateWithdraw) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setOpen(false));
  return (
    <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-[80%] 800px:w-[50%] min-h-[40vh] bg-white rounded shadow p-4"
      >
        <div className="flex justify-end w-full">
          <RxCross1 title="close" size={25} onClick={() => setOpen(false)} />
        </div>
        <h1 className="text-[25px] text-center font-Poppins">
          Update Withdraw status
        </h1>
        <br />
        <div className="flex flex-col items-center justify-center">
          <select
            onChange={(e) => setWithdrawStatus(e.target.value)}
            className="flex items-center w-[200px] px-4 h-[35px] appearance-none border rounded"
            value={withdrawStatus}
          >
            <option value={"PENDING"}>pending</option>
            <option value={"SUCCEEDED"}>succeed</option>
          </select>
          <button
            type="submit"
            disabled={updateLoading}
            aria-disabled={updateLoading ? true : false}
            className={`block ${
              styles.button
            } text-white !h-[42px] mt-4 text-[18px] ${
              updateLoading && "cursor-not-allowed"
            }`}
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateWithdrawModal;
