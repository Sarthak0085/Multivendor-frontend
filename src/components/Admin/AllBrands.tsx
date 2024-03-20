import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import CommonModal from "../../modals/CommonModal";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import {
  useAdminAddBrandMutation,
  useAdminDeleteBrandMutation,
  useAdminGetAllBrandQuery,
  useAdminGetBrandByIdQuery,
  useAdminUpdateBrandMutation,
} from "../../redux/features/brand/brandApi";
import styles from "../../styles/styles";
import { addBrand, addBrandFormData } from "../../validations/AddBrand";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import { BrandDataType, brandColumns } from "../shared/Tables/BrandColumns";

const AllBrands = () => {
  // const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState<string>("");
  const [image, setImage] = useState("");
  const [mode, setMode] = useState("");
  const [option, setOption] = useState("");

  const [
    deleteBrand,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useAdminDeleteBrandMutation();
  const [create, { isSuccess, error, isLoading: createLoading }] =
    useAdminAddBrandMutation();
  const [
    update,
    { isSuccess: updateSuccess, error: updateError, isLoading: updateLoading },
  ] = useAdminUpdateBrandMutation();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteBrand(id);
  };

  const createBrand: SubmitHandler<addBrandFormData> = async (data) => {
    setOpen(false);
    await create({ ...data, image: image });
  };

  const updateBrand: SubmitHandler<addBrandFormData> = async (data) => {
    // console.log(data, image);
    setOpen(false);
    await update({ id, ...data, image: image });
  };

  const { data, isLoading, refetch } = useAdminGetAllBrandQuery({
    refetchOnMountOrArgChange: true,
  });

  const {
    data: brandData,
    isLoading: brandLoading,
    refetch: brandRefetch,
  } = useAdminGetBrandByIdQuery(id, { refetchOnMountOrArgChange: true });
  // console.log("brand :", brandData);

  // console.log(data);
  useEffect(() => {
    if (createLoading) {
      toast.loading("Create new Brand. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (updateLoading) {
      toast.loading("Update Brand. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (deleteLoading) {
      toast.loading("Deleting Brand. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      toast.success("Brand Created Successfully", {
        style: setSuccessOptions,
      });
      refetch();
    }
    if (deleteSuccess) {
      toast.success("Brand Deleted Successfully", {
        style: setSuccessOptions,
      });
      setId("");
      refetch();
    }
    if (updateSuccess) {
      toast.success("Brand Updated Successfully", {
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
    refetch,
    createLoading,
    updateLoading,
    deleteLoading,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addBrandFormData>({
    resolver: zodResolver(addBrand),
  });

  useEffect(() => {
    if (id !== "" && mode === "update" && brandData?.getBrand) {
      setValue("title", brandData?.getBrand?.title);
      setImage(brandData?.getBrand?.image?.url);
      setMode("");
      setOpen(true);
      setOption("update");
    } else if (mode === "create") {
      setValue("title", "");
      setImage("");
      setMode("");
      setOption("create");
    }
  }, [id, mode, brandData, setValue]);

  const TableComponent = TableHOC<BrandDataType>(
    brandColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => {
                  setId(row.original._id);
                  setMode("update");
                  brandRefetch();
                }}
              >
                <AiOutlineEdit
                  title="Edit Brand"
                  aria-label="Edit Brand"
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
                  title="Delete Brand"
                  aria-label="Delete Brand"
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
    data?.getallBrand,
    "All Brands",
    data?.getallBrand.length > 6 ? true : false
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
      {isLoading || brandLoading ? (
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

          {data?.brand?.length !== 0 ? (
            <TableComponent />
          ) : (
            <p className="mt-20 text-center text-2xl text-red-500">
              No Brand added yet.
            </p>
          )}
          {open && (
            <CommonModal
              title="brand"
              setOpen={setOpen}
              setId={setId}
              option={option}
              createCategory={createBrand}
              updateCategory={updateBrand}
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

export default AllBrands;
