
    import React from "react";
    import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import MkdSDK from "../utils/MkdSDK";
    import { useNavigate } from "react-router-dom";
    import { tokenExpireError } from "../authContext";
    import { GlobalContext, showToast } from "../globalContext";
    import ReactQuill from 'react-quill';
    import 'react-quill/dist/quill.snow.css';
    import { isImage, empty, isVideo, isPdf } from "../utils/utils";
    
    const AddSchedulingPage = () => {
      const { dispatch: globalDispatch } = React.useContext(GlobalContext);
      const schema = yup
        .object({
          
        	meeting_link: yup.string(),
        	meeting_password: yup.string(),
        	meeting_start: yup.string(),
        	meeting_end: yup.string(),
        	meeting_details: yup.string(),
        })
        .required();
    
      const { dispatch } = React.useContext(GlobalContext);
      const [fileObj, setFileObj] = React.useState({});
    
      const navigate = useNavigate();
      const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      
      const previewImage = (field, target) => {
        let tempFileObj = fileObj;
        tempFileObj[field] = {
          file: target.files[0],
          tempURL: URL.createObjectURL(target.files[0]),
        };
        setFileObj({ ...tempFileObj });
      };
    
      const onSubmit = async (_data) => {
        let sdk = new MkdSDK();
    
        try {
          for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
          }
    
          sdk.setTable("scheduling");
    
          const result = await sdk.callRestAPI(
            {
              
        		meeting_link: _data.meeting_link,
        		meeting_password: _data.meeting_password,
        		meeting_start: _data.meeting_start,
        		meeting_end: _data.meeting_end,
        		meeting_details: _data.meeting_details,
            },
            "POST"
          );
          if (!result.error) {
            showToast(globalDispatch, "Added");
            navigate("/admin/scheduling");
          } else {
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
          console.log("Error", error);
          setError("meeting_link", {
            type: "manual",
            message: error.message,
          });
          tokenExpireError(dispatch, error.message);
        }
      };
    
      React.useEffect(() => {
        globalDispatch({
          type: "SETPATH",
          payload: {
            path: "scheduling",
          },
        });
      }, []);
    
      return (
        <div className=" shadow-md rounded  mx-auto p-5">
          <h4 className="text-2xl font-medium">Add Scheduling</h4>
          <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
    
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meeting_link"
            >
              Meeting Link
            </label>
            <input
              placeholder="Meeting Link"
              {...register("meeting_link")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.meeting_link?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.meeting_link?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meeting_password"
            >
              Meeting Password
            </label>
            <input
              placeholder="Meeting Password"
              {...register("meeting_password")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.meeting_password?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.meeting_password?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meeting_start"
            >
              Meeting Start
            </label>
            <input
                type="datetime-local"
              placeholder="Meeting Start"
              {...register("meeting_start")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.meeting_start?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.meeting_start?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meeting_end"
            >
              Meeting End
            </label>
            <input
                type="datetime-local"
              placeholder="Meeting End"
              {...register("meeting_end")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.meeting_end?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.meeting_end?.message}
            </p>
          </div>
        
            
        <div className="mb-4  ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="meeting_details"
        >
          Meeting Details
        </label>
        <textarea
          placeholder="Meeting Details"
          {...register("meeting_details")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.meeting_details?.message ? "border-red-500" : ""
          }`}
          row={15}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.meeting_details?.message}
        </p>
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
    
    export default AddSchedulingPage;
    
    
    