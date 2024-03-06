import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CouponModal from "../../modals/CouponModal";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import {
  useCreateCouponMutation,
  useDeleteShopCouponMutation,
  useGetAllShopCouponQuery,
  useGetCouponByIdQuery,
  useUpdateCouponMutation,
} from "../../redux/features/coupon/couponApi";
import { useGetAllShopProductsQuery } from "../../redux/features/product/productApi";
import styles from "../../styles/styles";
import {
  CreateCouponFormData,
  createCouponSchema,
} from "../../validations/CreateCouponValidation";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { setErrorOptions, setSuccessOptions } from "../options";
import { CouponDataType, couponColumns } from "../shared/Tables/CouponColumns";

const AllCoupons = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [option, setOption] = useState<string>("create");
  const { seller } = useSelector((state: any) => state?.auth);
  console.log("seller: ", seller?._id, "id", id);

  const { data: productData, isLoading: productLoading } =
    useGetAllShopProductsQuery(seller?._id, {});

  const [
    deleteCoupon,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useDeleteShopCouponMutation();

  const onClick = (id: string) => {
    setShow(true);
    setId(id);
  };

  const onEditClick = (id: string) => {
    setId(id);
    setMode("update");
    couponRefetch();
  };

  const handleDelete = async () => {
    setShow(false);
    await deleteCoupon(id);
  };

  const handleUpdate: SubmitHandler<CreateCouponFormData> = async (data) => {
    setOpen(false);
    await updateCoupon({ ...data, shopId: seller?._id });
  };

  const createCoupon: SubmitHandler<CreateCouponFormData> = async (data) => {
    setOpen(false);
    await create({ ...data, shopId: seller?._id });
  };

  const { data, isLoading, refetch } = useGetAllShopCouponQuery(seller?._id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data);

  const [create, { isSuccess, error, isLoading: createLoading }] =
    useCreateCouponMutation();

  const [
    updateCoupon,
    { isLoading: updateLoading, isSuccess: updateSuccess, error: updateError },
  ] = useUpdateCouponMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Coupon Created Successfully", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (deleteSuccess) {
      toast.success("Coupon Deleted Successfully", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (updateSuccess) {
      toast.success("Coupon Updated Successfully", {
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
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError;
        toast.error((errorData?.data as Error)?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An error occured", {
          style: setErrorOptions,
        });
      }
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError;
        toast.error((errorData?.data as Error)?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [
    isSuccess,
    error,
    deleteSuccess,
    deleteError,
    refetch,
    updateError,
    updateSuccess,
  ]);

  const {
    data: couponData,
    refetch: couponRefetch,
    isLoading: couponLoading,
  } = useGetCouponByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  console.log(couponData);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCouponFormData>({
    resolver: zodResolver(createCouponSchema),
  });

  useEffect(() => {
    if (id && mode === "update" && couponData?.couponCode) {
      setValue("name", couponData?.couponCode?.name);
      setValue("value", couponData?.couponCode?.value);
      setValue("minAmount", couponData?.couponCode?.minAmount);
      setValue("maxAmount", couponData?.couponCode?.maxAmount);
      setValue("selectedProduct", couponData?.couponCode?.selectedProduct);
      setMode("");
      setOption("update");
      setOpen(true);
    }
    if (mode === "create") {
      setValue("name", "");
      setValue("maxAmount", undefined);
      setValue("minAmount", undefined);
      setValue("selectedProduct", "");
      setValue("value", 0);
      setOpen(true);
      setMode("");
      setOption("create");
    }
  }, [couponData?.couponCode, setValue, mode, id]);

  const TableComponent = TableHOC<CouponDataType>(
    couponColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <button onClick={() => onEditClick(row.original?._id)}>
                <AiOutlineEdit
                  title="Edit Coupon"
                  size={22}
                  className="text-green-500"
                />
              </button>
              <button onClick={() => onClick(row.original?._id)}>
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
    data?.couponCodes,
    "All Coupons",
    data?.couponCodes > 10 ? true : false
  );

  return (
    <>
      {isLoading || productLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white overflow-y-hidden">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setMode("create")}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          {data?.couponCodes && data?.couponCodes?.length !== 0 ? (
            <TableComponent />
          ) : (
            <div className="w-full h-full space-y-2 -mt-10 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-4 text-red-500">
                No Coupons Available 😔
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                You haven't added any coupons yet.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Start adding your coupons to offer discounts to your customers.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Consider creating special promotions or seasonal discounts.
              </p>
              <button
                onClick={() => setMode("create")}
                className="text-blue-500 font-semibold flex items-center justify-center gap-1 hover:underline text-lg"
              >
                Click here to create coupon{" "}
                <FaArrowRight title="Create a Coupon" />
              </button>
            </div>
          )}
          {open && !couponLoading && (
            <CouponModal
              setOpen={setOpen}
              handleSubmit={handleSubmit}
              createCoupon={createCoupon}
              handleUpdate={handleUpdate}
              createLoading={createLoading}
              updateLoading={updateLoading}
              register={register}
              errors={errors}
              option={option}
              title="Coupon Code"
              products={productData?.products}
              setId={setId}
            />
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
