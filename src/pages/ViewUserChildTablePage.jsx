
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

    const ViewChildPage = () => {
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);

    const { dispatch } = React.useContext(GlobalContext);
    const [viewModel, setViewModel] = React.useState({});

    

    const params = useParams();

    React.useEffect(function () {
        (async function () {
        try {
            sdk.setTable("child");
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
        <h4 className="text-2xl font-medium">View Child</h4>

            
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Id</div>
                    <div className="flex-1">{viewModel?.id}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Name</div>
                    <div className="flex-1">{viewModel?.name}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Item Name</div>
                    <div className="flex-1">{viewModel?.item_name}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Project Id</div>
                    <div className="flex-1">{viewModel?.project_id}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Type</div>
                    <div className="flex-1">{viewModel?.type}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Range Start</div>
                    <div className="flex-1">{viewModel?.range_start}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Range End</div>
                    <div className="flex-1">{viewModel?.range_end}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Steps</div>
                    <div className="flex-1">{viewModel?.steps}</div>
                </div>
            </div>
           
        
            
                
        
        </div>
    );
    };

    export default ViewChildPage;

    