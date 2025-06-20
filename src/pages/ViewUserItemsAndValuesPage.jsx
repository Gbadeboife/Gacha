import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate, useParams } from "react-router-dom";
import { tokenExpireError } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";
import { isImage, empty, isVideo } from "../utils/utils";
import UploadFilesModal from "../components/UploadFilesModal";
import { Plus } from "lucide-react";
import presetImg from "../assets/preset-img.png";
import { Upload } from "lucide-react";


let sdk = new MkdSDK();

const ViewUserItemsAndValuesPage = () => {
const { dispatch: globalDispatch } = React.useContext(GlobalContext);

const { dispatch } = React.useContext(GlobalContext);
const [viewModel, setViewModel] = React.useState({});
    

const params = useParams();

const [uploadModalopen, setUploadModalOpen] = React.useState(false);
/*
React.useEffect(function () {
        (async function () {
        try {
            sdk.setTable("core_output");
            const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
            if (!result.error) {

                setViewModel(result.model);

            }
        } catch (error) {
            console.log("error", error);
            tokenExpireError(dispatch, error.message);
        }
        })();
    }, []);*/
    
  const inventoryItems = [
      { id: 1, name: "Weapon 1", value: "1,000", type: "Weapon", rarity: "Rare", themed: true, images: [] },
      { id: 2, name: "Weapon 2", value: "3,000", type: "Weapon", rarity: "Epic", themed: false, images: ['img', 'img', 'img', 'img'] },
      { id: 3, name: "Character 1", value: "9,000", type: "Character", rarity: "Rare", themed: false, images: [] },
      { id: 4, name: "Character 2", value: "2,000", type: "Character", rarity: "Epic", themed: false, images: [] },
      { id: 5, name: "Banner 1", value: "400", type: "Banner", rarity: "Legendary", themed: false, images: [] },
      { id: 6, name: "Banner 2", value: "300", type: "Banner", rarity: "Legendary", themed: false, images: [] },
      { id: 7, name: "Token", value: "300", type: "Consumable", rarity: "Common", themed: false, images: ['img'] },
      { id: 8, name: "Gems", value: "3", type: "Consumable", rarity: "Common", themed: false, images: ['img'] },
      { id: 9, name: "Shards", value: "2", type: "Consumable", rarity: "Common", themed: false, images: [] },
      { id: 10, name: "Shards", value: "2", type: "Consumable", rarity: "Common", themed: false, images: [] },
    ]

    const getRarityColor = (rarity) => {
      switch (rarity) {
        case "Rare":
          return "bg-red-50 text-red-800 border-red-600"
        case "Epic":
          return "bg-purple-50 text-purple-800 border-purple-600"
        case "Legendary":
          return "bg-yellow-50 text-yellow-800 border-yellow-600"
        case "Common":
          return "bg-gray-50 text-gray-800 border-gray-600"
        default:
          return "bg-gray-50 text-gray-800 border-gray-600"
      }
    }

    const getTypeColor = (type) => {
      switch (type) {
        case "Weapon":
          return "text-blue-600"
        case "Character":
          return "text-pink-600"
        case "Banner":
          return "text-teal-600"
        case "Consumable":
          return "text-orange-600"
        default:
          return "text-gray-600"
      }
    }
    
    return(
      <>
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">Inventory and values</h1>
              <p className="text-gray-600">Declare all items and item properties</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-md">Dollar/HC</span>
                <div className="flex text-gray-500">
                  <select defaultValue="$"  className="p-2 py-1 border border-r-0 border-gray-300 rounded rounded-r-none w-14">
                      <option value="$">$</option>
                      <option value="€">€</option>
                      <option value="£">£</option>
                  </select>
                  <input type="number" defaultValue="0.03" className="w-20 py-1 pr-1 m-0 text-right border border-gray-300 rounded rounded-l-none" step="0.01" />
                </div>  
                </div>
              <button className="flex items-center px-2 py-1 space-x-2 text-purple-500 border border-purple-500 rounded-md">
                <span className="flex items-center"><Upload className="inline-block w-4 h-4 mr-1"/>Upload CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 p-6">
          <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="w-12 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"></th>
                  <th className="w-1/4 px-6 py-3 text-base font-normal tracking-wider text-left text-gray-600">
                    Item name
                  </th>
                  <th className="px-6 py-3 text-base font-normal tracking-wider text-right text-gray-600">
                    HC value/unit
                  </th>
                  <th className="px-6 py-3 text-base font-normal tracking-wider text-left text-gray-600">
                    Type
                  </th>
                  <th className="w-1/4 px-6 py-3 text-base font-normal tracking-wider text-left text-gray-600">
                    Rarity
                  </th>
                  <th className="px-6 py-3 text-base font-normal tracking-wider text-center text-gray-600">
                    Image(s)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500 border-r border-gray-200 whitespace-nowrap">{index + 1}</td>
                    <td className="w-1/4 px-6 py-4 border-r border-gray-200 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-normal text-gray-900 text-md">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 border-r border-gray-200 whitespace-nowrap">{item.value}</td>
                    <td className="px-6 py-4 border-r border-gray-200 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getTypeColor(item.type)} bg-gray-100 rounded-sm px-2 pb-0.5` }>{item.type}</span>
                      {item.themed && <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-sm px-2 pb-0.5">Themed</span>}

                    </td>
                    <td className="w-1/4 px-6 py-4 border-r border-gray-200 whitespace-nowrap">
                      <span className={`${getRarityColor(item.rarity)} text-sm border-2 rounded-md px-2 pb-0.5`}>
                        {item.rarity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-start space-x-2">
                        {item.images.length > 0 || item.images.includes('img')  ? (
                          <div className="flex items-center space-x-1">
                            <div className="flex items-center justify-center w-6 h-6 bg-gray-200 border rounded">
                              <img src={presetImg}/>
                            </div>
                            {item.images.length - 1 > 0 &&
                              <span className="p-1 px-2 text-xs text-gray-500 bg-gray-200 rounded-xl">+{item.images.length - 1}</span>
                            }
                          </div>
                        ) : (
                          <button
                            onClick={() => setUploadModalOpen(true)}
                            className="flex items-center justify-center w-6 h-6 p-0 text-gray-400 border-2 border-gray-400 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            {/* Add New Row */}
            <div className="p-4 border-b border-gray-200">
              <button variant="ghost" className="flex items-center space-x-2 text-gray-500 hover:text-gray-900">
                <Plus className="w-4 h-4" />
                <span>New</span>
              </button>
            </div>
          </div>
      </div>
      <UploadFilesModal 
        isOpen={uploadModalopen}
        onClose={() => setUploadModalOpen(false)}
      />
    </>
    )
}


export default ViewUserItemsAndValuesPage