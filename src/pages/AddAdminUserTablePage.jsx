
  import React from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import MkdSDK from "../utils/MkdSDK";
  import { useNavigate } from "react-router-dom";
  import { GlobalContext, showToast } from "../globalContext";
  import { tokenExpireError } from "../authContext";
  
  const AddAdminUserPage = () => {
    const schema = yup
      .object({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        role: yup.string()
      })
      .required();
    const [userRole, setUserRole] = React.useState("admin");
    const { dispatch } = React.useContext(GlobalContext);
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    });
  
    const selectRole = [
      { name: "role", value: "admin" },
      { name: "role", value: "staff" },
      { name: "role", value: "company" }
    ];
  
    /**
     *
     *
     * Use /user/put to update user remaining info after registration success
     * use /profile/put to update profile info
     */
    const onSubmit = async (data) => {
      const first_name = data.first_name;
      const last_name = data.last_name;
      let sdk = new MkdSDK();
  
      try {
        if (userRole === "staff") {
          if (data.company_id) {
            const result = await sdk.callRawAPI(
              `/v2/api/lambda/company/${data.company_id}/user-add`,
              {
                email: data.email,
                password: data.password,
                role: userRole,
                first_name,
                last_name,
                verify: 1
              },
              "POST"
            );
  
            if (!result.error) {
              showToast(dispatch, "Added");
              navigate("/admin/user");
            } else {
              if (result.validation) {
                const keys = Object.keys(result.validation);
                for (let i = 0; i < keys.length; i++) {
                  const field = keys[i];
                  setError(field, {
                    type: "manual",
                    message: result.validation[field]
                  });
                }
              }
            }
          } else {
            showToast(globalDispatch, "company id needed");
          }
        } else {
          const result = await sdk.createUser(data.email, data.password, userRole, first_name, last_name);
  
          if (!result.error) {
            showToast(dispatch, "Added");
            navigate("/admin/user");
          } else {
            if (result.validation) {
              const keys = Object.keys(result.validation);
              for (let i = 0; i < keys.length; i++) {
                const field = keys[i];
                setError(field, {
                  type: "manual",
                  message: result.validation[field]
                });
              }
            }
          }
        }
      } catch (error) {
        console.log("Error", error);
        setError("email", {
          type: "manual",
          message: error.message
        });
        tokenExpireError(dispatch, error.message);
      }
    };
    console.log(userRole);
    React.useEffect(() => {
      globalDispatch({
        type: "SETPATH",
        payload: {
          path: "users"
        }
      });
    }, []);
  
    return (
      <div className=" shadow-md rounded  mx-auto p-5">
        <h4 className="text-2xl font-medium">Add User</h4>
        <form
          className=" w-full max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name")}
              className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.first_name?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">{errors.first_name?.message}</p>
          </div>
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("last_name")}
              className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.last_name?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">{errors.last_name?.message}</p>
          </div>
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email?.message ? "border-red-500" : ""}`}
            />
            <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
            <select
              name="role"
              id="role"
              className="shadow border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              // {...register("role")}
              onChange={(e) => {
                setUserRole(e.target.value);
              }}
            >
              {selectRole.map((option) => (
                <option
                  name={option.name}
                  value={option.value}
                  key={option.value}
                  defaultValue={option.value === "client"}
                >
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          {userRole === "staff" && (
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company_id"
              >
                Company Id
              </label>
              <input
                type="number"
                placeholder="company id"
                {...register("company_id")}
                className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.company_id?.message ? "border-red-500" : ""
                }`}
              />
              <p className="text-red-500 text-xs italic">{errors.company_id?.message}</p>
            </div>
          )}
  
          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="******************"
              {...register("password")}
              className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };
  
  export default AddAdminUserPage;
  
    