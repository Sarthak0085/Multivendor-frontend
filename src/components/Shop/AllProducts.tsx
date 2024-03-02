import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../../modals/DeleteModal";
import {
  useDeleteShopProductMutation,
  useGetAllShopProductsQuery,
} from "../../redux/features/product/productApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { setErrorOptions, setSuccessOptions } from "../options";
import {
  ProductDataType,
  productColumns,
} from "../shared/Tables/ProductColumns";

const AllProducts = () => {
  const { seller } = useSelector((state: any) => state.auth);

  const [show, setShow] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const { data, isLoading, refetch } = useGetAllShopProductsQuery(seller?._id, {
    refetchOnMountOrArgChange: true,
  });

  const [
    deleteProduct,
    { isSuccess: deleteSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useDeleteShopProductMutation();

  const onClick = (id: string) => {
    setShow(true);
    setId(id);
  };
  const handleDelete = async () => {
    setShow(false);
    await deleteProduct(id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Product deleted successfully", {
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
      }
    }
  }, [deleteSuccess, deleteError, refetch]);

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
                  title="View Details"
                  size={22}
                  className="text-blue-500"
                />
              </Link>
              <Link to={`/dashboard-update-product/${row.original?._id}`}>
                <AiOutlineEdit
                  title="Edit Product"
                  size={22}
                  className="text-green-500"
                />
              </Link>
              <button onClick={() => onClick(row.original?._id)}>
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
    "Shop All Products",
    data?.products > 10 ? true : false
  );

  return (
    <>
      {isLoading || deleteLoading ? (
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
                You haven't added any products yet.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Start adding your products to attract customers.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Consider showcasing your best-selling items or new arrivals.
              </p>
              <Link
                to="/dashboard-create-product"
                className="text-blue-500 font-semibold flex items-center justify-center gap-1 hover:underline text-lg"
              >
                Create a Product here
                <FaArrowRight title="Create a Product" />
              </Link>
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

export default AllProducts;
