import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import {
  useAdminAddSizeMutation,
  useAdminDeleteSizeMutation,
  useAdminGetAllSizeQuery,
} from "../../redux/features/size/sizeApi";
import { addSize, addSizeFormData } from "../../validations/AddSize";
import { SizeDataType, sizeColumns } from "../shared/Tables/SizeColumns";
import SizeModal from "../../modals/SizeModal";

const AllSizes = () => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState<string>("");

  const [
    deleteSize,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useAdminDeleteSizeMutation();
  const [create, { isSuccess, error, isLoading: createLoading }] =
    useAdminAddSizeMutation();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteSize(id);
  };

  const createSize: SubmitHandler<addSizeFormData> = async (data) => {
    setOpen(false);
    const { title, symbol } = data;
    await create({ title, symbol });
  };

  const { data, isLoading, refetch } = useAdminGetAllSizeQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (createLoading) {
      toast.loading("Add new Size. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (deleteLoading) {
      toast.loading("Deleting Size. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      refetch();
      toast.success("Size Created Successfully", {
        style: setSuccessOptions,
      });
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Size Deleted Successfully", {
        style: setSuccessOptions,
      });
      setId("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error((errorData?.data as Error)?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An unknown error occured", {
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
        toast.error("An unknown error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [
    isSuccess,
    error,
    deleteSuccess,
    deleteError,
    createLoading,
    deleteLoading,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addSizeFormData>({
    resolver: zodResolver(addSize),
  });

  const TableComponent = TableHOC<SizeDataType>(
    sizeColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => {
                  setId(row.original._id);
                  setConfirm(true);
                }}
              >
                <AiOutlineDelete
                  aria-label="Delete Category"
                  title="Delete Category"
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
    data?.getAllSize,
    "All Sizes",
    data?.getAllSize?.length > 6 ? true : false
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button}  !h-[45px] w-[95px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => {
                setOpen(true);
              }}
            >
              <span className="text-white">Create</span>
            </div>
          </div>

          {data?.getAllSize?.length !== 0 ? (
            <TableComponent />
          ) : (
            <p className="mt-20 text-center text-2xl text-red-500">
              No Size added yet.
            </p>
          )}
          {open && (
            <SizeModal
              title="size"
              setOpen={setOpen}
              createSize={createSize}
              createLoading={createLoading}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
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

export default AllSizes;
