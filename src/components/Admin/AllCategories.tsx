import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import CommonModal from "../../modals/CommonModal";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import {
  useAdminAddCategoryMutation,
  useAdminDeleteCategoryMutation,
  useAdminGetAllCategoryQuery,
  useAdminGetCategorybyIdQuery,
  useAdminUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import styles from "../../styles/styles";
import {
  addCategory,
  addCategoryFormData,
} from "../../validations/AddCategory";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import {
  CategoryDataType,
  categoryColumns,
} from "../shared/Tables/CategoryColumns";

const AllCategories = () => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState<string>("");
  const [image, setImage] = useState("");
  const [mode, setMode] = useState("");
  const [option, setOption] = useState("");

  // console.log(confirm, id);

  const [
    deleteCategory,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useAdminDeleteCategoryMutation();
  const [create, { isSuccess, error, isLoading: createLoading }] =
    useAdminAddCategoryMutation();
  const [
    update,
    { isSuccess: updateSuccess, error: updateError, isLoading: updateLoading },
  ] = useAdminUpdateCategoryMutation();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteCategory(id);
  };

  const createCategory: SubmitHandler<addCategoryFormData> = async (data) => {
    console.log(data, image);
    setOpen(false);
    await create({ ...data, image: image });
  };

  const updateCategory: SubmitHandler<addCategoryFormData> = async (data) => {
    console.log(data, image);
    setOpen(false);
    await update({ id, ...data, image: image });
  };

  const { data, isLoading, refetch } = useAdminGetAllCategoryQuery({
    refetchOnMountOrArgChange: true,
  });
  const {
    data: categoryData,
    isLoading: categoryLoading,
    refetch: categoryRefetch,
  } = useAdminGetCategorybyIdQuery(id, { refetchOnMountOrArgChange: true });
  console.log("category :", categoryData);

  useEffect(() => {
    if (createLoading) {
      toast.loading("Create new Category. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (updateLoading) {
      toast.loading("Update Category. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (deleteLoading) {
      toast.loading("Deleting Category. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      refetch();
      toast.success("Category Created Successfully", {
        style: setSuccessOptions,
      });
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Category Deleted Successfully", {
        style: setSuccessOptions,
      });
      setId("");
    }
    if (updateSuccess) {
      toast.success("Category Updated Successfully", {
        style: setSuccessOptions,
      });
      setId("");
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
    updateSuccess,
    updateError,
    createLoading,
    updateLoading,
    deleteLoading,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addCategoryFormData>({
    resolver: zodResolver(addCategory),
  });

  useEffect(() => {
    if (id !== "" && mode === "update" && categoryData?.category) {
      setValue("title", categoryData?.category?.title);
      setImage(categoryData?.category?.image?.url);
      setMode("");
      setOpen(true);
      setOption("update");
    } else if (mode === "create") {
      setValue("title", "");
      setImage("");
      setMode("");
      setOption("create");
    }
  }, [id, mode, categoryData, setValue]);

  const TableComponent = TableHOC<CategoryDataType>(
    categoryColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => {
                  setId(row.original._id);
                  setMode("update");
                  categoryRefetch();
                }}
              >
                <AiOutlineEdit
                  title="Edit Category"
                  aria-label="Edit Category"
                  size={22}
                  className="text-green-500"
                />
              </button>
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
    data?.getallCategory,
    "All Category",
    data?.getallCategory.length > 6 ? true : false
  );

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result as string);
      }
    };

    if (e.target.files !== null) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      {isLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button}  !h-[45px] w-[95px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => {
                setOpen(true);
                setMode("create");
              }}
            >
              <span className="text-white">Create</span>
            </div>
          </div>

          {data?.category?.length !== 0 ? (
            <TableComponent />
          ) : (
            <p className="mt-20 text-center text-2xl text-red-500">
              No Category added yet.
            </p>
          )}
          {open && (
            <CommonModal
              title="category"
              setOpen={setOpen}
              setId={setId}
              option={option}
              createCategory={createCategory}
              updateCategory={updateCategory}
              createLoading={createLoading}
              updateLoading={updateLoading}
              image={image}
              handleImage={handleImage}
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

export default AllCategories;
