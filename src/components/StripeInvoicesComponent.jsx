
  import React from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { AuthContext, tokenExpireError } from "../authContext";
  import { GlobalContext, showToast } from "../globalContext";
  import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
  import StripePaginationBar from "./StripePaginationBar";
  
  import MkdSDK from "../utils/MkdSDK";
  
  const columns = [
    {
      header: "Product",
      type: "metadata",
      pre_accessor: "metadata",
      accessor: "app_product_name",
    },
    {
      header: "Status",
      accessor: "status",
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
      header: "Amount captured",
      accessor: "amount_captured",
      type: "currency",
    },
    {
      header: "Amount refunded",
      accessor: "amount_refunded",
      type: "currency",
    },
  
    {
      header: "Created at",
      accessor: "created",
      type: "timestamp",
    },
    // {
    //   header: "Action",
    //   accessor: "",
    // },
  ];
  const StripeChargesComponent = () => {
    const sdk = new MkdSDK();
    const { dispatch, state } = React.useContext(AuthContext);
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [initialId, setInitialId] = React.useState(null);
    const [data, setData] = React.useState({});
    const [pageSize, setPageSize] = React.useState(10);
    const [canPreviousPage, setCanPreviousPage] = React.useState(false);
    const [canNextPage, setCanNextPage] = React.useState(false);
  
    function updatePageSize(limit) {
      (async function () {
        setPageSize(limit);
        await getData({ limit });
      })();
    }
  
    function previousPage() {
      (async function () {
        await getData({ limit: pageSize, before: data?.data[0].id });
      })();
    }
  
    function nextPage() {
      (async function () {
        await getData({ limit: pageSize, after: data?.data[data?.data.length - 1].id });
      })();
    }
  
    async function getData(paginationParams) {
      try {
        const { list: charges, limit, error, message } = await sdk.getCustomerStripeCharges(paginationParams);
        console.log(charges);
        if (error) {
          showToast(globalDispatch, message, 5000);
        }
        if (!charges) {
          return;
        }
  
        if (!initialId) {
          setInitialId(charges?.data[0]?.id ?? "");
        }
        setData(charges);
        setPageSize(+limit);
        setCanPreviousPage(initialId && initialId !== charges.data[0]?.id);
        setCanNextPage(charges.has_more);
      } catch (error) {
        console.error("ERROR", error);
        showToast(globalDispatch, error.message, 5000);
        tokenExpireError(dispatch, error.message);
      }
    }
  
    React.useEffect(() => {
      getData({});
    }, []);
  
    return (
      <div className="shadow-lg rounded overflow-hidden my-2 p-5 bg-white">
        <div className="bg-white rounded p-5 shadow-md border my-4">
          <div className="overflow-x-auto">
            <div className="mb-3 text-center justify-between w-full flex  ">
              <h4 className="text-2xl font-medium">Charges </h4>
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
                  {data?.data?.map((row, i) => {
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
            <StripePaginationBar
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
  
  
  