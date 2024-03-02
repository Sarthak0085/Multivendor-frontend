import { useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "../hooks/useClickOutside";

interface IDeleteModal {
  setShow: (show: boolean) => void;
  deleteLoading: boolean;
  handleDelete: () => void;
}

const DeleteConfirmationModal = ({
  setShow,
  deleteLoading,
  handleDelete,
}: IDeleteModal) => {
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
        <h5 className="text-[30px] font-Poppins gap-2 text-center text-[red] font-bold">
          Are you Sure you want to delete?
        </h5>
        <div
          className={`w-full px-2 flex flex-col space-y-4 500px:space-y-0 500px:flex-row mt-10 mb-5 items-center justify-between`}
        >
          <button
            onClick={() => setShow(false)}
            className="w-[150px] rounded-md p-2 border border-[red] bg-[red] text-white font-medium hover:text-[red] hover:bg-white"
          >
            Cancel
          </button>
          <button
            disabled={deleteLoading}
            onClick={() => handleDelete()}
            className={`w-[150px] rounded-md p-2 border border-[red] text-[red] bg-white font-medium hover:bg-[red] hover:text-white ${
              deleteLoading && "cursor-not-allowed"
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
