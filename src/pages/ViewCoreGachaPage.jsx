import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate, useParams } from "react-router-dom";
import { tokenExpireError } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";
import { isImage, empty, isVideo } from "../utils/utils";
import lootBoxImage from '../assets/loot-box.png';
import backpack from "../assets/backpack.png";
import OutputsManagement from "../components/outputs"; // <-- import OutputsManagement

let sdk = new MkdSDK();

const ViewCoreGachaPage = () => {
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const { dispatch } = React.useContext(GlobalContext);
  const [viewModel, setViewModel] = React.useState({});
  const [showOutputs, setShowOutputs] = React.useState(false); // <-- add state

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

  if (showOutputs) {
    return <OutputsManagement setShowOutputs= {setShowOutputs}/>; // <-- show OutputsManagement if triggered
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center pt-4 mx-auto max-w-7xl">
          <h1 className=" text-[1.25rem] px-10 mb-3 font-medium ">Core Gacha</h1>
        </div>
      </header>

      <div className="border bg-[#FBFBFB] text-[.9rem]  text-[#525252] ">
        <span className="w-[70px] shrink-0 cursor-pointer font-normal border-r text-[#393939]  text-[23px] h-[30px] flex items-center justify-end pr-3 items-center">+</span>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="bg-[#FBFBFB] h-[90vh] pb-5 flex ">
          {/* Main Gacha Area */}
          <div className=" ml-11 mr-4 mt-8 rounded-[7px]  bg-[white]  min-h-[500px] w-full ">
            <div className=" mt-16 bg-[transparent] flex flex-col items-center mx-auto">
              {/* Loot Box */}
              <div className="flex items-center justify-center flex-1 py-12">
                <div className="relative">
                  <img
                    src={lootBoxImage}
                    alt="Golden Loot Box"
                    className="w-[265px] h-[240px] bg-cover"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowOutputs(true)} // <-- handle click
                  />
                </div>
              </div>

              {/* Pull Buttons */}
              <div className="flex justify-center">
                <div className="flex cursor-pointer  mx-3 justify-center w-[150px] text-[14px] font-medium rounded-[8px_0px_8px_0px] border-2 border-[#3DDBD9] bg-gradient-to-t from-[#ECFDFD_4.11%] h-[44px] flex items-center justify-center to-[#3DDBD9_69.45%] ">
                  <span className="border-r-2 border-[#3DDBD9] h-[inherit] w-[70%] flex items-center justify-center">
                    x1 Pull
                  </span>
                  <button className="w-[50%] bg-[transparent]">
                    200
                  </button>
                </div>


                <div className="flex cursor-pointer mx-3 relative justify-center w-[150px] text-[14px] font-medium rounded-[8px_0px_8px_0px] border-2 border-[#F1C21B] bg-gradient-to-t from-[#FCF4D680_4.11%] h-[44px] flex items-center justify-center to-[#F1C21B_69.45%]">
                  <span className="border-r-2 w-[60%] border-[#F1C21B] h-[inherit]  flex items-center justify-center">
                    x10 Pull
                  </span>
                  <button className="w-[50%] bg-[transparent]">
                    <span className="bg-[red] px-1 text-white text-[.6rem] h-[10px] flex items-center absolute top-0 left-0">
                      10% Off
                    </span>
                    1800
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="border border-[#E6E6E6] bg-[white] mt-8  ml-4 mr-6 rounded-[6px] p-5 w-[30vw]">
            {/* Backpack Section */}
            <div className="flex items-center mt-2">
              <button className="flex items-center justify-center text-[#8A3FFC] border border-[#8A3FFC] h-[32px] rounded-[2px] w-[110px] text-[.9rem] px-1">
                <img src= {backpack} alt="backpack image" className="w-4 h-4 mr-1"/>
                Backpack
              </button>
              <button className="h-[32px] rounded-[2px] text-[#6F6F6F] ml-auto w-[80px] ml-2 text-[.9rem] px-1">Clear</button>
            </div>

            {/* Items Received Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between w-full my-4">
                <span className="text-[.9rem] inline-block text-[#818181]">Items Received</span>
                <span className="text-[.9rem] inline-block  text-[#818181]">You've paid: 0</span>
              </div>

              {/* Stats Table */}
              <table className="w-full border border-collapse border-gray-200">
                <thead>
                  <tr className="border bg-[#FBFBFB] text-[.9rem]  text-[#525252] ">
                    <th className="font-normal w-[33.33%] py-1">
                      Pulled
                    </th>
                    <th className="font-normal w-[33.33%]">Dupe</th>
                    <th className="font-normal w-[33.33%]">Milestone</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(8)].map((_, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td className="p-4 text-center border-r border-gray-200"></td>
                      <td className="p-4 text-center border-r border-gray-200"></td>
                      <td className="p-4 text-center"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCoreGachaPage;