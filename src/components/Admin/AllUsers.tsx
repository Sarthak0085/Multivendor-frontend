import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { useEffect, useState } from "react";
import {
  useAdminDeleteUserMutation,
  useAdminGetUsersQuery,
  useAdminUpdateUserMutation,
} from "../../redux/features/user/userApi";
import userColumns, { UserDataType } from "../shared/Tables/UserColumns";
import toast from "react-hot-toast";
import { setErrorOptions, setSuccessOptions } from "../options";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import UpdateStatusModal from "../../modals/UpdateStatusModal";

const AllUsers = () => {
  const { data, isLoading, refetch } = useAdminGetUsersQuery({
    refetchOnMountArgOrChange: true,
  });
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  console.log("id", id, "open", open);

  console.log("data:", data, "product:-", data?.users);

  const [
    deleteUser,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useAdminDeleteUserMutation();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteUser(id);
  };

  const [
    updateUser,
    { isSuccess: updateSuccess, error: updateError, isLoading: updateLoading },
  ] = useAdminUpdateUserMutation();

  const handleUpdate = async (data: {
    userStatus: string;
    userRole?: string;
  }) => {
    setOpen(false);
    const updateddata = {
      id,
      isBlock: data.userStatus === "active" ? false : true,
      role: data.userRole,
    };
    await updateUser(updateddata);
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("User Deleted from Database successfully", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (updateSuccess) {
      toast.success("Shop Status updated Successfully.", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [deleteSuccess, deleteError, updateSuccess, updateError, refetch]);

  const TableComponent = TableHOC<UserDataType>(
    userColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ cell, row }) => (
            <div className="flex items-center justify-center space-x-2">
              {row.original?.role && row.original.role !== "ADMIN" && (
                <button
                  onClick={() => {
                    setId(cell.row.original._id);
                    setOpen(true);
                  }}
                >
                  <AiOutlineEdit
                    title="Change User Status"
                    size={22}
                    className="text-green-500"
                  />
                </button>
              )}
              {row.original?.role && row.original.role !== "ADMIN" && (
                <button
                  onClick={() => {
                    setId(cell.row.original._id);
                    setConfirm(true);
                  }}
                >
                  <AiOutlineDelete
                    title="Delete User"
                    size={22}
                    className="text-red-500"
                  />
                </button>
              )}
            </div>
          ),
        };
      } else {
        return column;
      }
    }),
    data?.users,
    "All Users",
    data?.users?.length > 10 ? true : false
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white overflow-x-hidden">
          {data?.users?.length !== 0 ? (
            <TableComponent />
          ) : (
            <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-4 text-red-500">
                No Users Have Created an Account 😔
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                There are currently no users registered on the platform.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Encourage users to sign up and join your platform community.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                As an admin, you can facilitate user engagement and provide
                support to new users.
              </p>
            </div>
          )}
          {open && (
            <UpdateStatusModal
              setShow={setOpen}
              updateLoading={updateLoading}
              handleUpdate={handleUpdate}
              title="User"
            />
          )}
          {confirm && (
            <DeleteConfirmationModal
              setShow={setConfirm}
              deleteLoading={deleteLoading}
              handleDelete={handleDelete}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllUsers;
