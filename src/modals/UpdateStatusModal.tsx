import { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "../hooks/useClickOutside";

interface IDeleteModal {
  setShow: (show: boolean) => void;
  updateLoading: boolean;
  title: string;
  handleUpdate: (data: { userStatus: string; userRole?: string }) => void;
}

const UpdateStatusModal = ({
  setShow,
  updateLoading,
  handleUpdate,
  title,
}: IDeleteModal) => {
  const [userStatus, setUserStatus] = useState<string>("active");
  const [userRole, setUserRole] = useState<string>("USER");
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setShow(false));
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-[80%] 800px:w-[60%] 1300px:w-[40%] h-auto bg-white rounded-md shadow p-4"
      >
        <div className="w-full flex justify-end">
          <RxCross1
            title="Close"
            size={30}
            className="cursor-pointer"
            onClick={() => setShow(false)}
          />
        </div>
        <h5 className="text-[30px] font-Poppins gap-2 text-center text-[blue] font-bold">
          Update {title} Status
        </h5>
        <div
          className={`w-full px-2 flex flex-col space-y-4 800px:space-y-0 800px:flex-row mt-10 mb-5 items-center justify-between`}
        >
          <select
            value={userStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            className="block h-12 w-full py-2 text-[20px] px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          {title === "User" && (
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="block h-12 w-full py-2 text-[20px]  px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="user">USER</option>
              <option value="admin">ADMIN</option>
            </select>
          )}
        </div>
        <div
          className={`w-full px-2 flex flex-col space-y-4 mt-10 mb-5 items-center justify-between`}
        >
          <button
            disabled={updateLoading}
            onClick={() => handleUpdate({ userStatus, userRole })}
            className={`w-full rounded-md p-2 border border-[blue] text-[blue] bg-white font-medium hover:bg-[blue] hover:text-white ${
              updateLoading && "cursor-not-allowed"
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
