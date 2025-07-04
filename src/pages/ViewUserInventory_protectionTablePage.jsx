
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

    const ViewInventoryProtectionPage = () => {
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);

    const { dispatch } = React.useContext(GlobalContext);
    const [viewModel, setViewModel] = React.useState({});

    

    const params = useParams();

    React.useEffect(function () {
        (async function () {
        try {
            sdk.setTable("inventory_protection");
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
        <h4 className="text-2xl font-medium">View Inventory Protection</h4>

            
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Id</div>
                    <div className="flex-1">{viewModel?.id}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Project Id</div>
                    <div className="flex-1">{viewModel?.project_id}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Item Id</div>
                    <div className="flex-1">{viewModel?.item_id}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Replacement Item Id</div>
                    <div className="flex-1">{viewModel?.replacement_item_id}</div>
                </div>
            </div>
           
        
            
            <div className="mt-4 mb-4">
                <div className="flex mb-4">
                    <div className="flex-1">Amount</div>
                    <div className="flex-1">{viewModel?.amount}</div>
                </div>
            </div>
           
        
            
                
        
        </div>
    );
    };

    export default ViewInventoryProtectionPage;

    