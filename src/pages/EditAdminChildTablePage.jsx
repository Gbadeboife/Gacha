
    import React, { useEffect, useState } from "react";
    import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import MkdSDK from "../utils/MkdSDK";
    import { GlobalContext, showToast } from "../globalContext";
    import { useNavigate, useParams } from "react-router-dom";
    import { AuthContext, tokenExpireError } from "../authContext";
    import ReactQuill from 'react-quill';
    import 'react-quill/dist/quill.snow.css';
    import { isImage, empty, isVideo, isPdf } from "../utils/utils";

    let sdk = new MkdSDK();

    const EditChildPage = () => {
    const { dispatch } = React.useContext(AuthContext);
    const schema = yup
        .object({
    
        	name: yup.string(),
        	item_name: yup.string(),
        	project_id: yup.string(),
        	type: yup.string(),
        	range_start: yup.string(),
        	range_end: yup.string(),
        	steps: yup.string(),
        })
        .required();
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [fileObj, setFileObj] = React.useState({});
    const navigate = useNavigate();
    
          	const [name, setName] = useState('');
          	const [item_name, setItemName] = useState('');
          	const [project_id, setProjectId] = useState(0);
          	const [type, setType] = useState(0);
          	const [range_start, setRangeStart] = useState(0);
          	const [range_end, setRangeEnd] = useState(0);
          	const [steps, setSteps] = useState(0);
    const [id, setId] = useState(0);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const params = useParams();

    useEffect(function () {
        (async function () {
        try {
            sdk.setTable("child");
            const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
            if (!result.error) {
    
        	 setValue('name', result.model.name);
        	 setValue('item_name', result.model.item_name);
        	 setValue('project_id', result.model.project_id);
        	 setValue('type', result.model.type);
        	 setValue('range_start', result.model.range_start);
        	 setValue('range_end', result.model.range_end);
        	 setValue('steps', result.model.steps);

    
      	 setName(result.model.name);
      	 setItemName(result.model.item_name);
      	 setProjectId(result.model.project_id);
      	 setType(result.model.type);
      	 setRangeStart(result.model.range_start);
      	 setRangeEnd(result.model.range_end);
      	 setSteps(result.model.steps);
                setId(result.model.id);
            }
        } catch (error) {
            console.log("error", error);
            tokenExpireError(dispatch, error.message);
        }
        })();
    }, []);

    const previewImage = (field, target) => {
        let tempFileObj = fileObj;
        tempFileObj[field] = {
        file: target.files[0],
        tempURL: URL.createObjectURL(target.files[0]),
        };
        setFileObj({ ...tempFileObj });
    };


    const onSubmit = async (_data) => {
        try {
            sdk.setTable("child");
        for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
        }
        const result = await sdk.callRestAPI(
            {
            id: id,
            
        		name: _data.name,
        		item_name: _data.item_name,
        		project_id: _data.project_id,
        		type: _data.type,
        		range_start: _data.range_start,
        		range_end: _data.range_end,
        		steps: _data.steps,
            },
            "PUT"
        );

        if (!result.error) {
            showToast(globalDispatch, "Updated");
            navigate("/admin/child");
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
        setError("name", {
            type: "manual",
            message: error.message,
        });
        }
    };
    React.useEffect(() => {
        globalDispatch({
        type: "SETPATH",
        payload: {
            path: "child",
        },
        });
    }, []);

    return (
        <div className=" shadow-md rounded   mx-auto p-5">
        <h4 className="text-2xl font-medium">Edit Child</h4>
        <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            
            
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
              htmlFor="item_name"
            >
              Item Name
            </label>
            <input
              placeholder="Item Name"
              {...register("item_name")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.item_name?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.item_name?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="project_id"
            >
              Project Id
            </label>
            <input
                type="number"
              placeholder="Project Id"
              {...register("project_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.project_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.project_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
                type="number"
              placeholder="Type"
              {...register("type")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.type?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.type?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="range_start"
            >
              Range Start
            </label>
            <input
                type="number"
              placeholder="Range Start"
              {...register("range_start")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.range_start?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.range_start?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="range_end"
            >
              Range End
            </label>
            <input
                type="number"
              placeholder="Range End"
              {...register("range_end")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.range_end?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.range_end?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="steps"
            >
              Steps
            </label>
            <input
                type="number"
              placeholder="Steps"
              {...register("steps")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.steps?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.steps?.message}
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

    export default EditChildPage;

    