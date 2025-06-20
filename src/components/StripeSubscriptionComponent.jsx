
  import React from "react";
  import { AuthContext, tokenExpireError } from "../authContext";
  import MkdSDK from "../utils/MkdSDK";
  import { useNavigate } from "react-router-dom";
  import { GlobalContext } from "../globalContext";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useForm } from "react-hook-form";
  import * as yup from "yup";
  import { getNonNullValue } from "../utils/utils";
  import PaginationBar from "./PaginationBar";
  import AddButton from "./AddButton";
  
  const columns = [
    {
      header: "Plan",
      accessor: "planName",
    },
    {
      header: "Type",
      accessor: "planType",
    },
    {
      header: "Starts",
      accessor: "currentPeriodStart",
      type: "timestamp",
    },
    {
      header: "Ends",
      accessor: "currentPeriodEnd",
      type: "timestamp",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];
  const StripeSubscriptionComponent = () => {
    const sdk = new MkdSDK();
    const { dispatch, state } = React.useContext(AuthContext);
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [query, setQuery] = React.useState("");
    const [data, setCurrentTableData] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageCount, setPageCount] = React.useState(0);
    const [dataTotal, setDataTotal] = React.useState(0);
    const [currentPage, setPage] = React.useState(0);
    const [canPreviousPage, setCanPreviousPage] = React.useState(false);
    const [canNextPage, setCanNextPage] = React.useState(false);
    const navigate = useNavigate();
  
    const schema = yup.object({});
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    function updatePageSize(limit) {
      (async function () {
        setPageSize(limit);
        await getData(1, limit);
      })();
    }
  
    function previousPage() {
      (async function () {
        await getData(currentPage - 1 > 1 ? currentPage - 1 : 1, pageSize);
      })();
    }
  
    function nextPage() {
      (async function () {
        await getData(currentPage + 1 <= pageCount ? currentPage + 1 : 1, pageSize);
      })();
    }
  
    async function getData(pageNum, limitNum, data = {}) {
      try {
        console.log(state);
        data.user_id = state.user;
        const result = await sdk.getCustomerStripeSubscriptions({ page: pageNum, limit: limitNum }, data);
        const { list, total, limit, num_pages, page } = result;
  
        setCurrentTableData(list);
        setPageSize(+limit);
        setPageCount(+num_pages);
        setPage(+page);
        setDataTotal(+total);
        setCanPreviousPage(+page > 1);
        setCanNextPage(+page + 1 <= +num_pages);
      } catch (error) {
        console.error(error);
        tokenExpireError(dispatch, error.code);
      }
    }
  
    const onSubmit = (data) => {
      getData(1, pageSize, data);
    };
  
    React.useEffect(() => {
      globalDispatch({
        type: "SETPATH",
        payload: {
          path: "billing",
        },
      });
  
      (async function () {
        await getData(1, pageSize);
      })();
    }, []);
  
    return (
      <div className="bg-white rounded p-5 shadow-lg my-4">
        <div className="overflow-x-auto">
          <div className="mb-3 text-center justify-between w-full flex  ">
            <h4 className="text-2xl font-medium">Subscriptions </h4>
          </div>
          <div className="shadow overflow-x-auto border rounded-md border-gray-200 ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {column.header}
                      <span>{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, i) => {
                  return (
                    <tr key={i}>
                      {columns.map((cell, index) => {
                        if (cell.accessor == "") {
                          return (
                            <td key={index} className="px-6 py-4 whitespace-nowrap">
                              <button></button>
                            </td>
                          );
                        }
                        if (cell.mapping) {
                          return (
                            <td key={index} className="px-6 py-4 whitespace-nowrap">
                              {cell.mapping[row[cell.accessor]]}
                            </td>
                          );
                        }
                        if (row.planType === "recurring" && cell.type === "timestamp") {
                          return (
                            <td key={index} className="px-6 py-4 whitespace-nowrap">
                              {new Date(row[cell.accessor] * 1000).toLocaleDateString("en-US", { dateStyle: "medium" })}
                            </td>
                          );
                        } else if (row.planType === "lifetime" && cell.type === "timestamp") {
                          if (cell.accessor === "currentPeriodStart") {
                            return (
                              <td key={index} className="px-6 py-4 whitespace-nowrap">
                                {new Date(row.createdAt * 1000).toLocaleDateString("en-US", { dateStyle: "medium" })}
                              </td>
                            );
                          } else if (cell.accessor === "currentPeriodEnd") {
                            return (
                              <td key={index} className="px-6 py-4 whitespace-nowrap">
                                Infinity
                              </td>
                            );
                          }
                        }
                        return (
                          <td key={index} className="px-6 py-4 whitespace-nowrap">
                            {row[cell.accessor]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-5 bg-white">
          <PaginationBar
            currentPage={currentPage}
            pageCount={pageCount}
            pageSize={pageSize}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            updatePageSize={updatePageSize}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>
      </div>
    );
  };
  
  export default StripeSubscriptionComponent;
  
  