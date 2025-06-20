
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate, useParams } from "react-router-dom";
import { tokenExpireError } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";
import { isImage, empty, isVideo } from "../utils/utils";

let sdk = new MkdSDK();

const ViewPostsPage = () => {
const { dispatch: globalDispatch } = React.useContext(GlobalContext);

const { dispatch } = React.useContext(GlobalContext);
const [viewModel, setViewModel] = React.useState({});



const params = useParams();

React.useEffect(function () {
    (async function () {
    try {
        sdk.setTable("posts");
        const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
        if (!result.error) {

            setViewModel(result.model);

        }
    } catch (error) {
        console.log("error", error);
        tokenExpireError(dispatch, error.message);
    }
    })();
}, []);
    return (
        <div className="p-5 mx-auto rounded shadow-md ">
        <h4 className="text-2xl font-medium">View Posts</h4>

            
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Id</div>
                    <div className="flex-1">{viewModel?.id}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Status</div>
                    <div className="flex-1">{viewModel?.status}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Type</div>
                    <div className="flex-1">{viewModel?.type}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Data</div>
                    <div className="flex-1">{viewModel?.data}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Links</div>
                    <div className="flex-1">{viewModel?.links}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Create At</div>
                    <div className="flex-1">{viewModel?.create_at}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Update At</div>
                    <div className="flex-1">{viewModel?.update_at}</div>
                </div>
            </div>
           
        
            
                
        
        </div>
    );
    };

    export default ViewPostsPage;

    