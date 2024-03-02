import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import {
  useAdminGetAllCouponsQuery,
  useDeleteShopCouponMutation,
} from "../../redux/features/coupon/couponApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { setErrorOptions, setSuccessOptions } from "../options";
import { CouponDataType, couponColumns } from "../shared/Tables/CouponColumns";

const AllCoupons = () => {
  const [show, setShow] = useState<boolean>(false);
  const [id, setId] = useState("");

  const [deleteCoupon, { isSuccess, error, isLoading: deleteLoading }] =
    useDeleteShopCouponMutation();

  const handleDelete = async () => {
    setShow(false);
    await deleteCoupon(id);
  };

  const { data, isLoading, refetch } = useAdminGetAllCouponsQuery({
    refetchOnMountOrArgChange: true,
  });
  console.log("data", data);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Coupon Deleted Successfully", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error((errorData?.data as Error)?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [isSuccess, error, refetch]);

  const TableComponent = TableHOC<CouponDataType>(
    couponColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => {
                  setId(row.original?._id);
                  setShow(true);
                }}
              >
                <AiOutlineDelete
                  title="Delete Coupon"
                  size={22}
                  className="text-red-500"
                />
              </button>
            </div>
          ),
        };
      } else {
        return column;
      }
    }),
    data?.couponCode,
    "All Coupons",
    data?.couponCodes > 10 ? true : false
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            {/* <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setMode("create")}
            >
              <span className="text-white">Create Coupon Code</span>
            </div> */}
          </div>
          {data?.couponCode && data?.couponCode?.length !== 0 ? (
            <TableComponent />
          ) : (
            <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-4 text-red-500">
                No Coupons Available 😔
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                You haven't created any coupon yet.
              </p>
            </div>
          )}
          {show && (
            <DeleteConfirmationModal
              setShow={setShow}
              deleteLoading={deleteLoading}
              handleDelete={handleDelete}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
