import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InteractiveButton } from "../components/InteractiveButton";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";

let sdk = new MkdSDK();

const AdminLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: GlobalDispatch } = React.useContext(GlobalContext);

  const [submitLoading, setSubmitLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect_uri = searchParams.get("redirect_uri");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);
      const result = await sdk.login(data.email, data.password, "user");
      if (!result.error) {
        dispatch({
          type: "LOGIN",
          payload: result,
        });
        showToast(GlobalDispatch, "Succesfully Logged In", 4000, "success");
        navigate(redirect_uri ?? "/dashboard");
      } else {
        setSubmitLoading(false);
        if (result.validation) {
          const keys = Object.keys(result.validation);
          for (let i = 0; i < keys.length; i++) {
            const field = keys[i];
            setError(field, {
              type: "manual",
              message: result.validation[field],
            });
          }
        }
      }
    } catch (error) {
      setSubmitLoading(false);
      console.log("Error", error);
      setError("email", {
        type: "manual",
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  const socialLogin = async (type) => {
    let role = "user";
    const result = await sdk.oauthLoginApi(type, role);
    window.open(result, "_self"); //  "sharer",  "toolbar=0,status=0,width=650,height=400,"
  };

  return (
    <div className="h-screen max-h-screen min-h-screen m-auto">
      <div className="flex justify-center w-full h-full max-h-full min-h-full">
        <section className="flex flex-col items-center justify-center w-full bg-white md:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col max-w-md w-full px-6 mt-[3.375rem]"
          >
            <h1 className="mb-8 text-3xl font-semibold text-center md:font-bold md:text-4xl">
              Gacha.io
            </h1>
            <h1 className="mb-8 text-2xl font-semibold text-center md:text-2xl">
              Sign in
            </h1>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>

              <input
                type="email"
                autoComplete="off"
                placeholder="Email"
                {...register("email")}
                className={`resize-none border-2 p-2 px-4 bg-transparent mb-3 active: outline-none shadow appearance-none rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus: shadow-outline ${
                  errors && errors.email?.message ? "border-red-500" : ""
                }`}
              />
              <p className="text-xs italic text-red-500">
                {errors.email?.message}
              </p>
            </div>

            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                autoComplete="off"
                type="password"
                name="password"
                placeholder="Password"
                {...register("password")}
                className={`border-2 focus: outline-none active: outline-none flex-grow p-2 px-4 shadow appearance-none rounded w-full py-2 text-gray-700 mb-3 leading-tight focus: shadow-outline ${
                  errors && errors.password?.message ? "border-red-500" : ""
                } `}
              />
              <button type="button" className="absolute right-1 top-[20%]">
                <img src="/invisible.png" alt="" className="w-6 mr-2" />
              </button>
              <p className="text-xs italic text-red-500">
                {errors.password?.message}
              </p>
            </div>

            {/* <Link className={ `self-end mb-6 font-semibold text-sm bg-clip-text bg-gradient-to-l from-[#33d4b7_9.11 %] to-[#0d9895_69.45 %] text-transparent` } to="/user/forgot">Forgot Password</Link> */}

            <InteractiveButton
              type="submit"
              className={`flex justify-center items-center bg-gradient-to-l from-[#33d4b7_9.11%] to-[#0d9895_69.45%] text-white tracking-wide outline-none focus:outline-none rounded  py-2`}
              loading={submitLoading}
              disabled={submitLoading}
            >
              <span>Submit</span>
            </InteractiveButton>
          </form>

          <div className="my-6 text-center hr">OR</div>

          <div className="oauth flex flex-col gap-4 max-w-md w-full px-6 text-[#344054] grow">
            <button
              onClick={() => socialLogin("google")}
              className="border-2 py-[10px] flex justify-center gap-2 items-center"
            >
              <img
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALpSURBVHgBtVbNTxNBFH8zuy3QoN0YJMEQs8QQP05LAsbEg4uRxMSD4AeaeLB6xEPhpIkm4MF4IsG/oODF4Edajgahy8UDxbAcjDEc2IORCIlUhVK6u/OcKbVpaZdWxN+lkzd9v9+b9968WQK7YEnXlYPSxm0GqCMQjZtUYScASUSw+NJwGU40GXOGFwfxIg7IqX6KGEYABSqCWBmKPc2TCbOiwEpXhwaMRAFQhb+Ei/i4aXpuyFNAkBMG8eqiLoVIG2N2Z5NhWiUCyxfPqLLtznuTYxKQWIRk869wT60SuYD8ZyHZrGzk3NGkCP3r6Cy0GGYyH5CuqRL1DXKhkBd5/gRrfa0h+7MSKQ0aRhqnEwOwC1YvtOuO41jlyPMCzpRvKT3boKbeNRdsYOzw1FwP/COoPSnriKjWdKxCsO8j0GAmm0/HdQZgHyADhXM8FdtqnPzArUVIv280gsOWVc5BH9xUoWrUJkWRi7pBiAQufRmF4fIukt+N8Hh0qAYsNUoBSztHRtmCfQASVCn8Z1BCiLXT6DJbg32CzPhFKpwXv9AHkY3jOoA5Uc6B53+Mn90o2SBi0mKo2MS5RZvyVVwYFp0g3P95GpbdQNJJuy3mnVgSqsT5JxuRnQKMQYj6uhyDr5Pjm8fg3o+zsMwCQlqR66RIteT6082S6LNw7BlJ/EpX22ufp1r1DEiF2yeOXDupfH396W0lcopMZKCoG/llNYzB4LN8+tvHr8zz3JYUl48MPkHJ0OyNN2NFxJFuZb1W7pfSp8J1K3cV6jQU+aHk1+IP/At5Ae3FTVWm9ny5e5FT4uMasi8WL7RKcs+nALUboO5bGKStozl2GJl+VD+w7VaAjpfXNRTHxb09OP61Hqj53m3GH9a35cUL/5DofWU6zNfGI7RgD9g6FI1hxu4stJV99LVotyJnaJjXZAiqAPI6Aa/Thx118hTIC/G6UMjolJLL2Y+AXBMgr4coPmc2CMVYojc648XxG0ZrPRAMMnAhAAAAAElFTkSuQmCC"
                }
                className="w-[18px] h-[18px]"
              />
              <span>Sign in With Google</span>
            </button>
            <button
              onClick={() => socialLogin("facebook")}
              className="border-2 py-[10px] flex justify-center gap-2 items-center"
            >
              <img
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIoSURBVHgBtVW/a9tAFP7eSaRuKbU11QkE3LkZ6qVToR6yN/9AIVmyxqFQj7ZHe6k9B5rMLYX0P/CSpVCSJbshg5NJtiHEDZZe78mxI9lSpFbOB0J37+6+d/d+Eh5ArmznMk9UGVDvAS5okXwgoM+gM/0/Zox/XjasbhQHhQnzFbsAmIeatIRkOAKcepgiNS9Y/TwoE4zTfyAXbDMbpy/12fmFwAvylUFNi6pIBdYvydYWFMjNmehLEorXqwrZp5OjgxvGhc0YjvheBfP+VTPbmikQm4tZ9JbcQ8QbawpfPz7DuhV03d73G3z7PfYpQJ/IKYpP7nxgVOPI1y2FH7uL5GEgEi7jUMbmJGKwHXfo0+YKXmSC5Be26/2Ho9AjJQlzk2B+YDDisLFmBObzZglDZsXcU5p6Cwngv73cPI7cA3FJEfgNHg8FFefctAooXxlGOuBX5XmiqNlsX+O854auSZh2kRJR5JIPqRWc95zINZ0PZyaYOuLtsA0HJ39m0bP77j4PpDwcnNx642kuhEGX9GMqVO3caGTYiIHfH0L6tnGNeDivVLdu9fWog+XjyFeLnB3pUlgSdG71pQHJ2FPgdSKeCJYB7ZXatLvNOlqvabV0XNWQFprjqpFtT6eBlnnZzNaJnf3/MZeYRRfNsnD45Qs9WV7CcIrwGnlidBhu0X/zKcyw3Xf229G9ok5QupzTlstSFMmrW2PXS07tN+6Mbt12v2VFvvgv8gXc4hxcJLAAAAAASUVORK5CYII="
                }
                className="w-[16px] h-[16px]"
              />
              <span>Sign in With Facebook</span>
            </button>

            <div>
              <h3 className="text-sm text-center text-gray-800 normal-case">
                Don't have an account?{" "}
                <Link
                  className="self-end mb-8 text-sm font-semibold my-text-gradient"
                  to="/user/sign-up"
                >
                  Sign up
                </Link>{" "}
              </h3>
            </div>
          </div>
          {/* <div className={ `h-auto w-full` }></div> */}
          {/* <p className="h-10 my-5 text-xs text-center text-gray-500">&copy; { new Date().getFullYear() } manaknightdigital inc. All rights reserved.</p> */}
        </section>
        {/* <section className="hidden w-1/2 md:block"
          style={ { backgroundImage: "url(https://ergo.manaknightdigital.com/login-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center center" } }>
        </section> */}
      </div>
    </div>
  );
};

export default AdminLoginPage;
