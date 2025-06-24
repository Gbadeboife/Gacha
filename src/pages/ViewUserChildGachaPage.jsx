import React from "react";
import { useState } from "react";

import MkdSDK from "../utils/MkdSDK";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext, showToast } from "../globalContext";
import { Package } from "lucide-react"
import childGacha from "../assets/child-gacha.png";
import backpack from "../assets/backpack.png";



let sdk = new MkdSDK();

const ViewUserChildGachaPage = () => {
const { dispatch: globalDispatch } = React.useContext(GlobalContext);

const { dispatch } = React.useContext(GlobalContext);
const [viewModel, setViewModel] = React.useState({});
    

const params = useParams();

const [activeTab, setActiveTab] = useState("Child 1")
  const [pullCount, setPullCount] = useState(0)
  const [totalPaid, setTotalPaid] = useState(200)

  const tabs = ["Child 1", "Child 2", "Child 3"]

  const itemRows = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    pulled: "(value)",
    dupe: "(value)",
  }))

  const handlePull = () => {
    setPullCount((prev) => prev + 1)
    setTotalPaid((prev) => prev + 50) // Assuming each pull costs 50
  }

  const handleClear = () => {
    setPullCount(0)
    setTotalPaid(200)
  }

return (
  <div className="min-h-screen">
    {/* Header */}
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center pt-4 mx-auto max-w-7xl">
        <h1 className=" text-[1.25rem] px-10 mb-3 font-medium ">Child Gacha</h1>
      </div>
    </header>
  
    <div className="flex w-full m-auto border-t border-b grow">
      <span className="w-[70px] shrink-0 cursor-pointer font-normal border-r text-[#393939]  text-[23px] h-[30px] flex items-center justify-end pr-3 items-center"></span>
      
      {tabs.map((tab) => (
      <span
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`w-[80px] shrink-0 cursor-pointer font-normal  text-[14px] bg-[#00000005] border-[#161616]/50 border-b-2  h-[30px] flex items-center justify-center ${
          activeTab === tab ? "text-gray-900 border-b-2 border-gray-900 bg-gray-100" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        {tab}
      </span>
    ))}
    </div>
    

    {/* Main Content */}
    <div className="bg-[#FBFBFB] h-[90vh]  pb-5 flex">
      {/* Left Side - Gacha */}
      <div className=" ml-11 mr-4 mt-8 rounded-[7px]  bg-[white]  min-h-[500px] w-full ">
        <div className=" mt-16 bg-[transparent] flex flex-col items-center mx-auto">
          <img src= {childGacha} alt="Gacha Capsule" className="w-[auto] h-[280px] bg-cover" />
        </div>
        <div className="flex justify-center mt-7">
          <div className="flex cursor-pointer  justify-center w-[110px] ml-5 text-[14px] font-medium rounded-[8px_0px_8px_0px] border-2 border-[#3DDBD9] bg-gradient-to-t from-[#ECFDFD_4.11%] h-[44px] flex items-center justify-center to-[#3DDBD9_69.45%] "> 
            <span className=" h-[inherit] w-[100%] flex items-center justify-center">
              x1 Pull
            </span>
                        
          </div>
          
        </div>
      </div>

      {/* Right Side - Inventory */}

      <div className="border border-[#E6E6E6] bg-[white] mt-8 ml-4 mr-6 rounded-[6px] p-5 w-[30vw]">
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
            <span className="text-[.9rem] inline-block  text-[#818181]">You've paid: 200</span>
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
)

}

export default ViewUserChildGachaPage;