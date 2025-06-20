import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { GlobalContext, showToast } from "../globalContext";
import { tokenExpireError } from "../authContext";
import { InteractiveButton } from "../components/InteractiveButton";

let sdk = new MkdSDK();

const AdminProfilePage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required();

  const { dispatch } = React.useContext(GlobalContext);
  const [oldEmail, setOldEmail] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "profile",
      },
    });

    (async function () {
      try {
        const result = await sdk.getProfile();
        setValue("email", result.email);
        setValue("first_name", result.first_name);
        setValue("last_name", result.last_name);
        console.log(result);

        setOldEmail(result.email);
      } catch (error) {
        console.log("Error", error);
        tokenExpireError(
          dispatch,
          error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);
      // if (oldEmail !== data.email) {
      //   const emailresult = await sdk.updateEmail(data.email);
      //   if (!emailresult.error) {
      //     showToast(dispatch, "Email Updated", 1000);
      //   } else {
      //     if (emailresult.validation) {
      //       const keys = Object.keys(emailresult.validation);
      //       for (let i = 0; i < keys.length; i++) {
      //         const field = keys[i];
      //         setError(field, {
      //           type: "manual",
      //           message: emailresult.validation[field],
      //         });
      //       }
      //     }
      //   }
      // }
      if (data.password.length > 0) {
        const passwordresult = await sdk.updatePassword(data.password);
        if (!passwordresult.error) {
          // showToast(dispatch, "Password Updated", 2000);
        } else {
          if (passwordresult.validation) {
            const keys = Object.keys(passwordresult.validation);
            for (let i = 0; i < keys.length; i++) {
              const field = keys[i];
              setError(field, {
                type: "manual",
                message: passwordresult.validation[field],
              });
            }
          }
        }
      }
      sdk.setTable("user");
      const result = await sdk.callRestAPI(
        {
          id: localStorage.getItem("user"),
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          role: "admin",
          status: 1,
        },
        "PUT"
      );
      if (!result.error) {
        showToast(dispatch, "Profile Updated", 2000);
      }

      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
      console.log("Error", error);
      setError("email", {
        type: "manual",
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
      });
      tokenExpireError(
        dispatch,
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <>
      <main>
        <div className="bg-white shadow rounded p-5  ">
          <h4 className="text-2xl font-medium">Edit Profile</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                {...register("email")}
              />
              <p className="text-red-500 text-xs italic">
                {errors.email?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first_name"
                type="text"
                placeholder="first name"
                name="first_name"
                {...register("first_name")}
              />
              <p className="text-red-500 text-xs italic">
                {errors.first_name?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="last_name"
                type="text"
                placeholder="last name"
                name="last_name"
                {...register("last_name")}
              />
              <p className="text-red-500 text-xs italic">
                {errors.last_name?.message}
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                {...register("password")}
                name="password"
                className={
                  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                }
                id="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">
                {errors.password?.message}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <InteractiveButton
                className="bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                loading={submitLoading}
                disabled={submitLoading}
              >
                Submit
              </InteractiveButton>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AdminProfilePage;
