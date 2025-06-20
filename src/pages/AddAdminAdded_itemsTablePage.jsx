
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
    
    const AddAddedItemsPage = () => {
      const { dispatch: globalDispatch } = React.useContext(GlobalContext);
      const schema = yup
        .object({
          
        	child_id: yup.string(),
        	output_id: yup.string(),
        	linked_item_id: yup.string(),
        	item_type: yup.string(),
        	name: yup.string(),
        	amount: yup.string(),
        	weights: yup.string(),
        	dupe_protection: yup.string(),
        	output_protection: yup.string(),
        	dupe_protection_map: yup.string(),
        	output_protection_map: yup.string(),
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
    
          sdk.setTable("added_items");
    
          const result = await sdk.callRestAPI(
            {
              
        		child_id: _data.child_id,
        		output_id: _data.output_id,
        		linked_item_id: _data.linked_item_id,
        		item_type: _data.item_type,
        		name: _data.name,
        		amount: _data.amount,
        		weights: _data.weights,
        		dupe_protection: _data.dupe_protection,
        		output_protection: _data.output_protection,
        		dupe_protection_map: _data.dupe_protection_map,
        		output_protection_map: _data.output_protection_map,
            },
            "POST"
          );
          if (!result.error) {
            showToast(globalDispatch, "Added");
            navigate("/admin/added_items");
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
          setError("child_id", {
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
            path: "added_items",
          },
        });
      }, []);
    
      return (
        <div className=" shadow-md rounded  mx-auto p-5">
          <h4 className="text-2xl font-medium">Add Added Items</h4>
          <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
    
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="child_id"
            >
              Child Id
            </label>
            <input
                type="number"
              placeholder="Child Id"
              {...register("child_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.child_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.child_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="output_id"
            >
              Output Id
            </label>
            <input
                type="number"
              placeholder="Output Id"
              {...register("output_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.output_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.output_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="linked_item_id"
            >
              Linked Item Id
            </label>
            <input
                type="number"
              placeholder="Linked Item Id"
              {...register("linked_item_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.linked_item_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.linked_item_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="item_type"
            >
              Item Type
            </label>
            <input
                type="number"
              placeholder="Item Type"
              {...register("item_type")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.item_type?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.item_type?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              placeholder="Name"
              {...register("name")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.name?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
                type="number"
              placeholder="Amount"
              {...register("amount")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.amount?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.amount?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="weights"
            >
              Weights
            </label>
            <input
                type="number"
              placeholder="Weights"
              {...register("weights")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.weights?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.weights?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dupe_protection"
            >
              Dupe Protection
            </label>
            <input
                type="number"
              placeholder="Dupe Protection"
              {...register("dupe_protection")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.dupe_protection?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.dupe_protection?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="output_protection"
            >
              Output Protection
            </label>
            <input
                type="number"
              placeholder="Output Protection"
              {...register("output_protection")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.output_protection?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.output_protection?.message}
            </p>
          </div>
        
            
        <div className="mb-4  ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dupe_protection_map"
        >
          Dupe Protection Map
        </label>
        <textarea
          placeholder="Dupe Protection Map"
          {...register("dupe_protection_map")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.dupe_protection_map?.message ? "border-red-500" : ""
          }`}
          row={15}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.dupe_protection_map?.message}
        </p>
      </div>
        
            
        <div className="mb-4  ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="output_protection_map"
        >
          Output Protection Map
        </label>
        <textarea
          placeholder="Output Protection Map"
          {...register("output_protection_map")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.output_protection_map?.message ? "border-red-500" : ""
          }`}
          row={15}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.output_protection_map?.message}
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
    
    export default AddAddedItemsPage;
    
    
    