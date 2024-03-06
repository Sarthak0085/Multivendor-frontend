import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import UpdateWithdrawModal from "../../modals/UpdateWithdrawModal";
import {
  useGetAllWithdrawRequestByAdminQuery,
  useUpdateWithdrawRequestByAdminMutation,
} from "../../redux/features/withdraw/withdrawApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { setErrorOptions, setSuccessOptions } from "../options";
import {
  WithdrawDataType,
  withdrawColumns,
} from "../shared/Tables/WithdrawColumns";

const AllWithdraw = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [withdrawStatus, setWithdrawStatus] = useState<string>("PENDING");
  const [id, setId] = useState<string>("");
  const [shopId, setShopId] = useState<string>("");

  const { isLoading, data, refetch } = useGetAllWithdrawRequestByAdminQuery({
    refetchOnMountOrArgChange: true,
  });
  const [updateWithdraw, { isSuccess, isLoading: updateLoading, error }] =
    useUpdateWithdrawRequestByAdminMutation();

  console.log("data", data);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Withdraw Request Updated Successfully", {
        style: setSuccessOptions,
      });
      setOpen(false);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An Unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [isSuccess, error, refetch]);

  const handleSubmit = async () => {
    const data = { _id: id, shopId, withdrawStatus };
    console.log(data);

    await updateWithdraw(data);
  };

  const TableComponent = TableHOC<WithdrawDataType>(
    withdrawColumns.map((column) => {
      if (column?.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => {
                  setId(row?.original?._id);
                  setShopId(row.original?.seller);
                  setOpen(true);
                }}
              >
                <AiOutlineEdit
                  title="Update Withdraw Status"
                  size={22}
                  className="text-green-500"
                />
              </button>
            </div>
          ),
        };
      } else {
        return column;
      }
    }),
    data?.withdraws,
    "All Withdraws",
    data?.withdraws?.length > 10 ? true : false
  );

  return (
    <div className="w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-white">
        {isLoading ? (
          <Loader />
        ) : data?.withdraws?.length !== 0 ? (
          <TableComponent />
        ) : (
          <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4 text-red-500">
              No Sellers Have Made a Withdrawal Request 😔
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              There are currently no sellers who have made a withdrawal request
              on the platform.
            </p>
            <p className="text-lg text-gray-600 mb-2">
              Encourage sellers to make more products or make events for user
              Engagement and manage the earnings effectively.
            </p>
            <p className="text-lg text-gray-600 mb-2">
              As an admin, you can facilitate the withdrawal process and provide
              support to sellers.
            </p>
          </div>
        )}
      </div>
      {open && (
        <UpdateWithdrawModal
          setOpen={setOpen}
          withdrawStatus={withdrawStatus}
          setWithdrawStatus={setWithdrawStatus}
          handleSubmit={handleSubmit}
          updateLoading={updateLoading}
        />
      )}
    </div>
  );
};

export default AllWithdraw;
