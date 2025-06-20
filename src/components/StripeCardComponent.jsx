
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
      header: "ID",
      accessor: "id",
    },
    {
      header: "Brand",
      accessor: "brand",
    },
    {
      header: "Last 4",
      accessor: "last4",
    },
    {
      header: "Month expiry",
      accessor: "exp_month",
    },
    {
      header: "Year expiry",
      accessor: "exp_year",
    },
    {
      header: "Default",
      compare_this: "id",
      to_this: "default_source",
      type: "custom_compare",
    },
    {
      header: "Action",
      accessor: "",
    },
  ];
  
  const StripeCardComponent = () => {
    const sdk = new MkdSDK();
    const { dispatch, state } = React.useContext(AuthContext);
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [initialId, setInitialId] = React.useState(null);
    const [cards, setCards] = React.useState({});
    const [pageSize, setPageSize] = React.useState(10);
    const [canPreviousPage, setCanPreviousPage] = React.useState(false);
    const [canNextPage, setCanNextPage] = React.useState(false);
    const stripe = useStripe();
    const elements = useElements();
  
    const schema = yup.object({
      user: yup.number(),
      token: yup.string(),
    });
  
    const {
      register,
      setValue,
      handleSubmit,
      setError,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    const setDefaultCard = async (cardId) => {
      const { error, message } = await sdk.setStripeCustomerDefaultCard(cardId);
      showToast(globalDispatch, message);
      if (error) {
        console.error(error);
        return;
      }
      getData({});
    };
  
    const deleteCard = async (cardId) => {
      const { isDeleted, error, message } = await sdk.deleteCustomerStripeCard(cardId);
      showToast(globalDispatch, message);
      if (error) {
        console.error(error);
        return;
      }
      getData({});
    };
  
    const onSubmit = async (data) => {
      stripe.createToken(elements.getElement(CardElement)).then(async (result) => {
        console.log(result);
        if (result.error) {
          showToast(globalDispatch, result.error || "Something went wrong");
          return;
        }
        const params = {
          sourceToken: result.token.id,
        };
        try {
          const result = await sdk.createCustomerStripeCard(params);
          if (!result.error) {
            showToast(globalDispatch, "Card added successfully");
          } else {
            if (result.validation) {
              const keys = Object.keys(result.validation);
              for (let i = 0; i < keys.length; i++) {
                const field = keys[i];
                showToast(globalDispatch, result.validation[field], 3000);
              }
            }
          }
          getData();
        } catch (error) {
          console.error(error);
          showToast(globalDispatch, error.message, 5000);
          tokenExpireError(dispatch, error.code);
        }
      });
    };
  
    function updatePageSize(limit) {
      (async function () {
        setPageSize(limit);
        await getData({ limit });
      })();
    }
  
    function previousPage() {
      (async function () {
        await getData({ limit: pageSize, before: cards.data[0].id });
      })();
    }
  
    function nextPage() {
      (async function () {
        await getData({ limit: pageSize, after: cards.data[cards.data.length - 1].id });
      })();
    }
  
    async function getData(paginationParams) {
      try {
        const { data: cards, limit, error, message } = await sdk.getCustomerStripeCards(paginationParams);
        console.log(cards);
        if (error) {
          showToast(globalDispatch, message, 5000);
        }
        if (!cards) {
          return;
        }
  
        if (!initialId) {
          setInitialId(cards?.data[0]?.id ?? "");
        }
        setCards(cards);
        setPageSize(+limit);
        setCanPreviousPage(initialId && initialId !== cards.data[0]?.id);
        setCanNextPage(cards.has_more);
      } catch (error) {
        console.error("ERROR", error);
        showToast(globalDispatch, error.message, 5000);
        tokenExpireError(dispatch, error.code);
      }
    }
  
    React.useEffect(() => {
      getData({});
    }, []);
  
    return (
      <div className="shadow-lg rounded overflow-hidden my-2 p-5 bg-white">
        <div className="bg-white rounded p-5 shadow-md border my-4">
          <h2 className="font-medium leading-tight text-2xl mt-0 text-black mb-3">Add a card</h2>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <CardElement
              className="p-4 rounded mb-3 shadow-inner"
              options={{ hidePostalCode: true, style: { base: { backgroundColor: "", fontSize: "14px", lineHeight: "20px" } } }}
            ></CardElement>
            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add card
            </button>
          </form>
        </div>
  
        <div className="bg-white rounded p-5 shadow-md border my-4">
          <div className="overflow-x-auto">
            <div className="mb-3 text-center justify-between w-full flex  ">
              <h4 className="text-2xl font-medium">Cards </h4>
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
                  {cards?.data?.map((row, i) => {
                    return (
                      <tr key={i}>
                        {columns.map((cell, index) => {
                          if (cell.accessor == "") {
                            return (
                              <td key={index} className="px-6 py-4 whitespace-nowrap">
                                {row.id === row.customer.default_source ? (
                                  ""
                                ) : (
                                  <button
                                    onClick={() => {
                                      setDefaultCard(row.id); //id here is stripe_id
                                    }}
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                                  >
                                    Set as Default
                                  </button>
                                )}
  
                                <button
                                  onClick={() => {
                                    deleteCard(row.id); //id here is stripe_id
                                  }}
                                  type="button"
                                  className="mx-1 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Delete
                                </button>
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
                          if (cell.type === "custom_compare") {
                            return (
                              <td key={index} className="px-6 py-4 whitespace-nowrap">
                                {row[cell.compare_this] === row.customer[cell.to_this] ? "Yes" : "No"}
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
  
  export default StripeCardComponent;
  
  