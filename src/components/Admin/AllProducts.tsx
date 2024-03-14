import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import {
  useAdminDeleteProductByIdMutation,
  useAdminGetAllProductsQuery,
} from "../../redux/features/product/productApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import {
  ProductDataType,
  productColumns,
} from "../shared/Tables/ProductColumns";

const AllProducts = () => {
  const { data, isLoading, refetch } = useAdminGetAllProductsQuery({
    refetchOnMountArgOrChange: true,
  });
  const [id, setId] = useState("");
  const [confirm, setConfirm] = useState(false);

  const [deleteProduct, { isSuccess, error, isLoading: deleteLoading }] =
    useAdminDeleteProductByIdMutation();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteProduct(id);
  };

  useEffect(() => {
    if (deleteLoading) {
      toast.loading("Deleting Product. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      toast.success("Product Deleted Successfully", {
        style: setSuccessOptions,
      });
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
  }, [isSuccess, error, refetch, deleteLoading]);

  console.log("data:", data, "product:-", data?.products);

  const TableComponent = TableHOC<ProductDataType>(
    productColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <Link to={`/product/${row.original?._id}`}>
                <AiOutlineEye
                  aria-label="View Product"
                  title="View Product"
                  size={22}
                  className="text-blue-500"
                />
              </Link>
              {/* <button
                  onClick={() => {
                    setId(row.original._id);
                    setOpen(true);
                  }}
                >
                  <AiOutlineEdit
                    title="Change Shop Status"
                    size={22}
                    className="text-green-500"
                  />
                </button> */}
              <button
                onClick={() => {
                  setId(row.original._id);
                  setConfirm(true);
                }}
              >
                <AiOutlineDelete
                  title="Delete Product"
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
    data?.products,
    "All Products",
    data?.products?.length > 10 ? true : false
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full mx-8 pt-1 mt-10 bg-white overflow-x-hidden">
      {data?.products?.length !== 0 ? (
        <TableComponent />
      ) : (
        <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4 text-red-500">
            No Products Available 😔
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Sellers haven't added any products yet.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Encourage your sellers to showcase their products.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Products are the heart of your marketplace, help your sellers list
            their items to attract customers.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            As an admin, you can assist sellers with managing their products and
            optimizing their listings.
          </p>
        </div>
      )}
      {confirm && (
        <DeleteConfirmationModal
          setShow={setConfirm}
          deleteLoading={deleteLoading}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AllProducts;
