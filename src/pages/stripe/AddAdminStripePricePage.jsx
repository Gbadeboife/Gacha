
    import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { GlobalContext, showToast } from "../../globalContext";
import { tokenExpireError } from "../../authContext";

const AddAdminStripePricePage = () => {
  const schema = yup
    .object({
      product_id: yup.string().required(),
      name: yup.string().required(),
      amount: yup.number().required(),
      trial_days: yup.string(),
      interval: yup.string(),
      interval_count: yup.string(),
      type: yup.string(),
    })
    .required();

  const { dispatch } = React.useContext(GlobalContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [selectProduct, setSelectProduct] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectInterval = [
    { key: "0", value: "" },
    { key: "1", value: "Day" },
    { key: "2", value: "Week" },
    { key: "3", value: "Month" },
    { key: "4", value: "Year" },
    { key: "5", value: "Lifetime" },
  ];

  const typeMapping = [
    { key: "recurring", value: "Recurring Payment" },
    { key: "one_time", value: "Single Payment" },
  ];

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();

    try {
      const result = await sdk.addStripePrice(data);
      if (!result.error) {
        showToast(dispatch, "Added");
        navigate("/admin/prices");
      } else {
        if (result.validation) {
          const keys = Object.keys(result.validation);
          for (let i = 0; i < keys.length; i++) {
            const field = keys[i];
            console.log(field);
            setError(field, {
              type: "manual",
              message: result.validation[field],
            });
          }
        }
      }
    } catch (error) {
      console.log("Error", error);

      showToast(dispatch, error.message);
      tokenExpireError(dispatch, error.message);
    }
  };

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "prices",
      },
    });
    (async () => {
      let sdk = new MkdSDK();
      const { list, error } = await sdk.getStripeProducts({ limit: "all" });
      if (error) {
        showToast(dispatch, "Something went wrong while fetching products list");
        return;
      }
      setSelectProduct(list);
    })();
  }, []);
  return (
    <div className=" shadow-md rounded  mx-auto p-5">
      <h4 className="text-2xl font-medium mb-4">Add a Price</h4>
      <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_id">
            Product
          </label>
          <select
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("product_id")}
          >
            {selectProduct.map((option) => (
              <option value={option.id} key={`prod_${option.id}`}>
                {option.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs italic">{errors.product_id?.message}</p>
        </div>

        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            min={1}
            step="any"
            placeholder="Amount"
            {...register("amount")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.amount?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.amount?.message}</p>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Checkout Type
          </label>
          <select
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("type")}
          >
            {typeMapping.map((option) => (
              <option value={option.value} key={option.key}>
                {option.value}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs italic">{errors.type?.message}</p>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interval">
            Interval
          </label>
          <select
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("interval")}
          >
            {selectInterval.map((option) => (
              <option value={option.value.toLowerCase()} key={`interval_${option.key}`}>
                {option.value}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs italic">{errors.interval?.message}</p>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interval_count">
            Interval Count
          </label>
          <input
            type="number"
            step="1"
            placeholder="Interval Count"
            {...register("interval_count")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.interval_count?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.interval_count?.message}</p>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trial_days">
            Trial Days
          </label>
          <input
            type="number"
            step="1"
            placeholder="7"
            {...register("trial_days")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.trial_days?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.trial_days?.message}</p>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAdminStripePricePage;

    