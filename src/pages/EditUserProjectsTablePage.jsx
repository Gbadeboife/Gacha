
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

    const EditProjectsPage = () => {
    const { dispatch } = React.useContext(AuthContext);
    const schema = yup
        .object({
    
        	name: yup.string(),
        	author: yup.string(),
        })
        .required();
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);
    const [fileObj, setFileObj] = React.useState({});
    const navigate = useNavigate();
    
          	const [name, setName] = useState('');
          	const [author, setAuthor] = useState(0);
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
            sdk.setTable("projects");
            const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
            if (!result.error) {
    
        	 setValue('name', result.model.name);
        	 setValue('author', result.model.author);

    
      	 setName(result.model.name);
      	 setAuthor(result.model.author);
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
            sdk.setTable("projects");
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
        		author: _data.author,
            },
            "PUT"
        );

        if (!result.error) {
            showToast(globalDispatch, "Updated");
            navigate("/user/projects");
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
            path: "projects",
        },
        });
    }, []);

    return (
        <div className=" shadow-md rounded   mx-auto p-5">
        <h4 className="text-2xl font-medium">Edit Projects</h4>
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
              htmlFor="author"
            >
              Author
            </label>
            <input
                type="number"
              placeholder="Author"
              {...register("author")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.author?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.author?.message}
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

    export default EditProjectsPage;

    