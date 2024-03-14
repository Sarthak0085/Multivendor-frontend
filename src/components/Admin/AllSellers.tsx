import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import UpdateStatusModal from "../../modals/UpdateStatusModal";
import {
  useAdminDeleteShopMutation,
  useAdminGetSellersQuery,
  useAdminUpdateShopMutation,
} from "../../redux/features/shop/shopApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import shopColumns, { ShopDataType } from "../shared/Tables/ShopColumns";

const AllSellers = () => {
  const { data, isLoading, refetch } = useAdminGetSellersQuery({
    refetchOnMountArgOrChange: true,
  });
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  console.log("data:", data, "product:-", data?.sellers);

  const [
    deleteShop,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useAdminDeleteShopMutation();

  const [
    updateShop,
    { isSuccess: updateSuccess, error: updateError, isLoading: updateLoading },
  ] = useAdminUpdateShopMutation();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteShop(id);
  };

  const handleUpdate = async (data: { userStatus: string }) => {
    setOpen(false);
    const updateddata = {
      id,
      isBlock: data.userStatus === "active" ? false : true,
    };
    await updateShop(updateddata);
  };

  useEffect(() => {
    if (updateLoading) {
      toast.loading("Updating Shop Status. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (deleteLoading) {
      toast.loading("Deleting Shop. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (deleteSuccess) {
      toast.success("Shop Deleted from Database successfully", {
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
  }, [
    deleteSuccess,
    deleteError,
    updateSuccess,
    updateError,
    refetch,
    updateLoading,
    deleteLoading,
  ]);

  const TableComponent = TableHOC<ShopDataType>(
    shopColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              {
                <button
                  onClick={() => {
                    setId(row.original._id);
                    setOpen(true);
                  }}
                >
                  <AiOutlineEdit
                    aria-label="Change Shop Status"
                    title="Change Shop Status"
                    size={22}
                    className="text-green-500"
                  />
                </button>
              }
              {
                <button
                  onClick={() => {
                    setId(row.original._id);
                    setConfirm(true);
                  }}
                >
                  <AiOutlineDelete
                    aria-label="Delete Shop"
                    title="Delete Shop"
                    size={22}
                    className="text-red-500"
                  />
                </button>
              }
            </div>
          ),
        };
      } else {
        return column;
      }
    }),
    data?.sellers,
    "All Sellers",
    data?.sellers?.length > 10 ? true : false
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white overflow-x-hidden">
          {data?.sellers.length !== 0 ? (
            <TableComponent />
          ) : (
            <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-4 text-red-500">
                No Sellers Have Created an Account 😔
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                There are currently no sellers registered on the platform.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Encourage potential sellers to sign up and start selling on your
                platform.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                As an admin, you can provide assistance and support to sellers
                during the registration process and help them get started.
              </p>
            </div>
          )}
          {open && (
            <UpdateStatusModal
              setShow={setOpen}
              updateLoading={updateLoading}
              handleUpdate={handleUpdate}
              title="Shop"
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

export default AllSellers;
