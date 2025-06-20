
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

    const ViewSchedulingPage = () => {
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);

    const { dispatch } = React.useContext(GlobalContext);
    const [viewModel, setViewModel] = React.useState({});

    

    const params = useParams();

    React.useEffect(function () {
        (async function () {
        try {
            sdk.setTable("scheduling");
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
        <div className=" shadow-md rounded  mx-auto p-5">
        <h4 className="text-2xl font-medium">View Scheduling</h4>

            
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Id</div>
                    <div className="flex-1">{viewModel?.id}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Create At</div>
                    <div className="flex-1">{viewModel?.create_at}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Update At</div>
                    <div className="flex-1">{viewModel?.update_at}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Meeting Link</div>
                    <div className="flex-1">{viewModel?.meeting_link}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Meeting Password</div>
                    <div className="flex-1">{viewModel?.meeting_password}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Meeting Start</div>
                    <div className="flex-1">{viewModel?.meeting_start}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Meeting End</div>
                    <div className="flex-1">{viewModel?.meeting_end}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Meeting Details</div>
                    <div className="flex-1">{viewModel?.meeting_details}</div>
                </div>
            </div>
           
        
            
                
        
        </div>
    );
    };

    export default ViewSchedulingPage;

    