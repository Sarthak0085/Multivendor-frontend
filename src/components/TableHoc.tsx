// import {
//   AiOutlineSortAscending,
//   AiOutlineSortDescending,
// } from "react-icons/ai";
// import {
//   Column,
//   usePagination,
//   useSortBy,
//   useTable,
//   TableOptions,
// } from "react-table";
// import styles from "../styles/styles";

// function TableHOC<T extends object>(
//   columns: Column<T>[],
//   data: T[],
//   containerClassname: string,
//   heading: string,
//   showPagination: boolean = false
// ) {
//   return function HOC() {
//     const options: TableOptions<T> = {
//       columns,
//       data,
//       initialState: {
//         pageSize: 6,
//       },
//     };

//     const {
//       getTableProps,
//       getTableBodyProps,
//       headerGroups,
//       page,
//       prepareRow,
//       nextPage,
//       pageCount,
//       state: { pageIndex },
//       previousPage,
//       canNextPage,
//       canPreviousPage,
//     } = useTable(options, useSortBy, usePagination);

//     return (
//       <div className={"overflow-x-auto"}>
//         <h2 className={styles.heading}>{heading}</h2>

//         <table className="table-auto min-w-full divide-y divide-gray-200 pt-10 w-full px-10 border-spacing-2 border-2 border-blue-500" {...getTableProps()}>
//           <thead className="p-5 w-full border border-blue-500 text-blue-500">
//             {headerGroups.map((headerGroup) => (
//               <tr className="border border-blue-500" {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th className="gap-2 text-center p-2 border border-blue-500" {...column.getHeaderProps(column.getSortByToggleProps())}>
//                     {column.render("Header")}
//                     {column.isSorted && (
//                       <span>
//                         {" "}
//                         {column.isSortedDesc ? (
//                           <AiOutlineSortDescending />
//                         ) : (
//                           <AiOutlineSortAscending />
//                         )}
//                       </span>
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);

//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {showPagination && (
//           <div className="table-pagination">
//             <button disabled={!canPreviousPage} onClick={previousPage}>
//               Prev
//             </button>
//             <span>{`${pageIndex + 1} of ${pageCount}`}</span>
//             <button disabled={!canNextPage} onClick={nextPage}>
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };
// }

// export default TableHOC;

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";
import styles from "../styles/styles";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className={"flex flex-col space-y-5 items-center overflow-x-hidden"}>
        <h2 className={styles.heading}>{heading}</h2>

        <div className="overflow-x-auto max-w-full">
          <table
            className="table-auto overflow-x-auto min-w-full divide-y divide-blue-500 pt-10 w-full px-20"
            {...getTableProps()}
          >
            <thead className="p-5 bg-blue-100 w-full border border-blue-500 text-blue-500">
              {headerGroups.map((headerGroup) => (
                <tr
                  className="border border-blue-500"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup?.headers?.map((column) => (
                    <th
                      className="gap-2 text-center p-2 border border-blue-500"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column?.render("Header")}
                      {column?.isSorted && (
                        <span>
                          {" "}
                          {column?.isSortedDesc ? (
                            <AiOutlineSortDescending />
                          ) : (
                            <AiOutlineSortAscending />
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              className="p-5 bg-blue-50 w-full border border-blue-500 text-[#6A1BDA]"
              {...getTableBodyProps()}
            >
              {page?.map((row) => {
                prepareRow(row);

                return (
                  <tr {...row?.getRowProps()}>
                    {row?.cells?.map((cell) => (
                      <td
                        className="gap-2 font-[500] text-center p-2 border border-blue-500"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showPagination && (
          <div className="table-pagination">
            <button
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!canPreviousPage}
              onClick={previousPage}
            >
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!canNextPage}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
