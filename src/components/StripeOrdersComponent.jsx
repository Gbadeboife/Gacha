
  import React from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { AuthContext, tokenExpireError } from "../authContext";
  import { GlobalContext, showToast } from "../globalContext";
  import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
  import StripePaginationBar from "./StripePaginationBar";
  import PaginationBar from "./PaginationBar";
  
  import MkdSDK from "../utils/MkdSDK";
  
  const columns = [
    {
      header: "Product",
      accessor: "product_name",
    },
    {
      header: "Customer",
      accessor: "customer",
    },
    {
      header: "Currency",
      accessor: "currency",
    },
    {
      header: "Amount",
      accessor: "amount",
      type: "currency",
    },
    {
      header: "Created at",
      accessor: "created_at",
      type: "timestamp",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];
  const StripeChargesComponent = () => {
    const sdk = new MkdSDK();
    const { dispatch, state } = React.useContext(AuthContext);
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [data, setCurrentTableData] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageCount, setPageCount] = React.useState(0);
    const [dataTotal, setDataTotal] = React.useState(0);
    const [currentPage, setPage] = React.useState(0);
    const [canPreviousPage, setCanPreviousPage] = React.useState(false);
    const [canNextPage, setCanNextPage] = React.useState(false);
  
    const schema = yup.object({
      product_name: yup.string(),
      customer_email: yup.string(),
    });
  
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
  
    const onSubmit = (data) => {
      const customer_email = getNonNullValue(data.customer_email);
      const product_name = getNonNullValue(data.product_name);
      getData(1, pageSize, { customer_email, product_name });
    };
  
    async function getData(pageNum, limitNum, data) {
      try {
        const { list, total, limit, num_pages, page, error, message } = await sdk.getCustomerStripeOrders({ page: pageNum, limit: limitNum }, data);
  
        if (error) {
          showToast(globalDispatch, message, 5000);
          return;
        }
  
        setCurrentTableData(list);
        setPageSize(+limit);
        setPageCount(+num_pages);
        setPage(+page);
        setDataTotal(+total);
        setCanPreviousPage(+page > 1);
        setCanNextPage(+page + 1 <= +num_pages);
      } catch (error) {
        console.error("ERROR", error);
        showToast(globalDispatch, error.message, 5000);
        tokenExpireError(dispatch, error.message);
      }
    }
  
    React.useEffect(() => {
      getData(1, pageSize);
    }, []);
  
    return (
      <div className="shadow-lg rounded overflow-hidden my-2 p-5 bg-white">
        <div className="bg-white rounded p-5 shadow-md border my-4">
          <div className="overflow-x-auto">
            <div className="mb-3 text-center justify-between w-full flex  ">
              <h4 className="text-2xl font-medium">Orders </h4>
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
                            return <td key={index} className="px-6 py-4 whitespace-nowrap"></td>;
                          }
                          if (cell.mapping) {
                            return (
                              <td key={index} className="px-6 py-4 whitespace-nowrap">
                                {cell.mapping[row[cell.accessor]]}
                              </td>
                            );
                          }
                          if (cell.type === "timestamp") {
                            return (
                              <td key={index} className="px-6 py-4 whitespace-nowrap">
                                {new Date(row[cell.accessor] * 1000).toLocaleString("en-US")}
                              </td>
                            );
                          } else if (cell.type === "currency") {
                            return (
                              <td key={index} className="px-6 py-4 whitespace-nowrap">
                                ${Number(row[cell.accessor] / 100).toFixed(2)}
                              </td>
                            );
                          } else if (cell.type === "metadata") {
                            return (
                              <td key={index} className="px-6 py-4 whitespace-nowrap">
                                {row[cell.pre_accessor][cell.accessor] ?? "n/a"}
                              </td>
                            );
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
      </div>
    );
  };
  
  export default StripeChargesComponent;
  

  