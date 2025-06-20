
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

    const EditAddedItemsPage = () => {
    const { dispatch } = React.useContext(AuthContext);
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
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [fileObj, setFileObj] = React.useState({});
    const navigate = useNavigate();
    
          	const [child_id, setChildId] = useState(0);
          	const [output_id, setOutputId] = useState(0);
          	const [linked_item_id, setLinkedItemId] = useState(0);
          	const [item_type, setItemType] = useState(0);
          	const [name, setName] = useState('');
          	const [amount, setAmount] = useState(0);
          	const [weights, setWeights] = useState(0);
          	const [dupe_protection, setDupeProtection] = useState(0);
          	const [output_protection, setOutputProtection] = useState(0);
          	const [dupe_protection_map, setDupeProtectionMap] = useState('');
          	const [output_protection_map, setOutputProtectionMap] = useState('');
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
            sdk.setTable("added_items");
            const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
            if (!result.error) {
    
        	 setValue('child_id', result.model.child_id);
        	 setValue('output_id', result.model.output_id);
        	 setValue('linked_item_id', result.model.linked_item_id);
        	 setValue('item_type', result.model.item_type);
        	 setValue('name', result.model.name);
        	 setValue('amount', result.model.amount);
        	 setValue('weights', result.model.weights);
        	 setValue('dupe_protection', result.model.dupe_protection);
        	 setValue('output_protection', result.model.output_protection);
        	 setValue('dupe_protection_map', result.model.dupe_protection_map);
        	 setValue('output_protection_map', result.model.output_protection_map);

    
      	 setChildId(result.model.child_id);
      	 setOutputId(result.model.output_id);
      	 setLinkedItemId(result.model.linked_item_id);
      	 setItemType(result.model.item_type);
      	 setName(result.model.name);
      	 setAmount(result.model.amount);
      	 setWeights(result.model.weights);
      	 setDupeProtection(result.model.dupe_protection);
      	 setOutputProtection(result.model.output_protection);
      	 setDupeProtectionMap(result.model.dupe_protection_map);
      	 setOutputProtectionMap(result.model.output_protection_map);
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
            sdk.setTable("added_items");
        for (let item in fileObj) {
            let formData = new FormData();
            formData.append('file', fileObj[item].file);
            let uploadResult = await sdk.uploadImage(formData);
            _data[item] = uploadResult.url;
        }
        const result = await sdk.callRestAPI(
            {
            id: id,
            
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
            "PUT"
        );

        if (!result.error) {
            showToast(globalDispatch, "Updated");
            navigate("/user/added_items");
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
        <div className=" shadow-md rounded   mx-auto p-5">
        <h4 className="text-2xl font-medium">Edit Added Items</h4>
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

    export default EditAddedItemsPage;

    