import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import ColorModal from "../../modals/ColorModal";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import {
  useAdminAddColorMutation,
  useAdminDeleteColorMutation,
  useAdminGetAllColorQuery,
} from "../../redux/features/color/colorApi";
import styles from "../../styles/styles";
import { addColor, addColorFormData } from "../../validations/AddColor";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import { ColorDataType, colorColumns } from "../shared/Tables/ColorColumns";

const AllColors = () => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("Black");

  const [
    deleteCategory,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useAdminDeleteColorMutation();
  const [create, { isSuccess, error, isLoading: createLoading }] =
    useAdminAddColorMutation();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteCategory(id);
  };

  const createColor: SubmitHandler<addColorFormData> = async (data) => {
    setOpen(false);
    const { title } = data;
    await create({ title });
  };

  const { data, isLoading, refetch } = useAdminGetAllColorQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (createLoading) {
      toast.loading("Add new Color. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (deleteLoading) {
      toast.loading("Deleting Color. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      refetch();
      toast.success("Color Created Successfully", {
        style: setSuccessOptions,
      });
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Color Deleted Successfully", {
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
    setValue,
    formState: { errors },
  } = useForm<addColorFormData>({
    resolver: zodResolver(addColor),
  });

  useEffect(() => {
    setValue("title", selectedColor);
  }, [selectedColor, setValue]);

  const TableComponent = TableHOC<ColorDataType>(
    colorColumns.map((column) => {
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
                  aria-label="Delete Color"
                  title="Delete Color"
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
    data?.getAllColor,
    "All Color",
    data?.getAllColor.length > 6 ? true : false
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

          {data?.getAllColor?.length !== 0 ? (
            <TableComponent />
          ) : (
            <p className="mt-20 text-center text-2xl text-red-500">
              No Color added yet.
            </p>
          )}
          {open && (
            <ColorModal
              title="color"
              setOpen={setOpen}
              createColor={createColor}
              createLoading={createLoading}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
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

export default AllColors;
