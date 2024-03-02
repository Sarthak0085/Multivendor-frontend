import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useAdminDeleteEventByIdMutation,
  useAdminGetAllEventsQuery,
} from "../../redux/features/events/eventApi";
import Loader from "../Layout/Loader";
import TableHOC from "../TableHoc";
import { setErrorOptions, setSuccessOptions } from "../options";
import { EventDataType, eventColumns } from "../shared/Tables/EventColumns";
import DeleteConfirmationModal from "../../modals/DeleteModal";

const AllEvents = () => {
  const { data, isLoading, refetch } = useAdminGetAllEventsQuery({
    refetchOnMountArgOrChange: true,
  });
  const [id, setId] = useState("");
  const [confirm, setConfirm] = useState(false);

  const [deleteEvent, { isSuccess, error, isLoading: deleteLoading }] =
    useAdminDeleteEventByIdMutation();

  const handleDelete = async () => {
    setConfirm(false);
    await deleteEvent(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Event Deleted Successfully", {
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
  }, [isSuccess, error, refetch]);

  console.log("data:", data);

  const TableComponent = TableHOC<EventDataType>(
    eventColumns.map((column) => {
      if (column.accessor === "actions") {
        return {
          ...column,
          Cell: ({ row }) => (
            <div className="flex items-center justify-center space-x-2">
              <Link to={`/product/${row.original?._id}`}>
                <AiOutlineEye
                  title="View Event"
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
                  title="Delete Event"
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
    data?.events,
    "All Events",
    data?.events?.length > 10 ? true : false
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white overflow-x-hidden">
          {data?.events?.length !== 0 ? (
            <TableComponent />
          ) : (
            <div className="w-full h-[80vh] space-y-2 my-auto flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-4 text-red-500">
                No Events Available 😔
              </h2>
              <p className="text-lg !text-left text-gray-600 mb-2">
                Sellers haven't added any events yet.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Encourage your sellers to showcase their products through
                events.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Events are a great way to attract customers and promote
                products.
              </p>
              <p className="text-lg text-gray-600 mb-2">
                As an admin, you can help sellers organize events and manage
                their products.
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
      )}
    </>
  );
};

export default AllEvents;
