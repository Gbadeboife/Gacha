
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

    const EditInventoryProtectionPage = () => {
    const { dispatch } = React.useContext(AuthContext);
    const schema = yup
        .object({
    
        	project_id: yup.string(),
        	item_id: yup.string(),
        	replacement_item_id: yup.string(),
        	amount: yup.string(),
        })
        .required();
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [fileObj, setFileObj] = React.useState({});
    const navigate = useNavigate();
    
          	const [project_id, setProjectId] = useState(0);
          	const [item_id, setItemId] = useState(0);
          	const [replacement_item_id, setReplacementItemId] = useState(0);
          	const [amount, setAmount] = useState(0);
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
            sdk.setTable("inventory_protection");
            const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
            if (!result.error) {
    
        	 setValue('project_id', result.model.project_id);
        	 setValue('item_id', result.model.item_id);
        	 setValue('replacement_item_id', result.model.replacement_item_id);
        	 setValue('amount', result.model.amount);

    
      	 setProjectId(result.model.project_id);
      	 setItemId(result.model.item_id);
      	 setReplacementItemId(result.model.replacement_item_id);
      	 setAmount(result.model.amount);
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
            sdk.setTable("inventory_protection");
        for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
        }
        const result = await sdk.callRestAPI(
            {
            id: id,
            
        		project_id: _data.project_id,
        		item_id: _data.item_id,
        		replacement_item_id: _data.replacement_item_id,
        		amount: _data.amount,
            },
            "PUT"
        );

        if (!result.error) {
            showToast(globalDispatch, "Updated");
            navigate("/user/inventory_protection");
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
        setError("project_id", {
            type: "manual",
            message: error.message,
        });
        }
    };
    React.useEffect(() => {
        globalDispatch({
        type: "SETPATH",
        payload: {
            path: "inventory_protection",
        },
        });
    }, []);

    return (
        <div className=" shadow-md rounded   mx-auto p-5">
        <h4 className="text-2xl font-medium">Edit Inventory Protection</h4>
        <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            
            
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
              htmlFor="item_id"
            >
              Item Id
            </label>
            <input
                type="number"
              placeholder="Item Id"
              {...register("item_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.item_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.item_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4  ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="replacement_item_id"
            >
              Replacement Item Id
            </label>
            <input
                type="number"
              placeholder="Replacement Item Id"
              {...register("replacement_item_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.replacement_item_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.replacement_item_id?.message}
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

    export default EditInventoryProtectionPage;

    