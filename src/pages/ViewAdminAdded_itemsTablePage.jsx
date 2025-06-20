
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

    const ViewAddedItemsPage = () => {
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);

    const { dispatch } = React.useContext(GlobalContext);
    const [viewModel, setViewModel] = React.useState({});

    

    const params = useParams();

    React.useEffect(function () {
        (async function () {
        try {
            sdk.setTable("added_items");
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
        <h4 className="text-2xl font-medium">View Added Items</h4>

            
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Id</div>
                    <div className="flex-1">{viewModel?.id}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Child Id</div>
                    <div className="flex-1">{viewModel?.child_id}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Output Id</div>
                    <div className="flex-1">{viewModel?.output_id}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Linked Item Id</div>
                    <div className="flex-1">{viewModel?.linked_item_id}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Item Type</div>
                    <div className="flex-1">{viewModel?.item_type}</div>
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
                    <div className="flex-1">Amount</div>
                    <div className="flex-1">{viewModel?.amount}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Weights</div>
                    <div className="flex-1">{viewModel?.weights}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Dupe Protection</div>
                    <div className="flex-1">{viewModel?.dupe_protection}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Output Protection</div>
                    <div className="flex-1">{viewModel?.output_protection}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Dupe Protection Map</div>
                    <div className="flex-1">{viewModel?.dupe_protection_map}</div>
                </div>
            </div>
           
        
            
            <div className="mb-4 mt-4">
                <div className="flex mb-4">
                    <div className="flex-1">Output Protection Map</div>
                    <div className="flex-1">{viewModel?.output_protection_map}</div>
                </div>
            </div>
           
        
            
                
        
        </div>
    );
    };

    export default ViewAddedItemsPage;

    