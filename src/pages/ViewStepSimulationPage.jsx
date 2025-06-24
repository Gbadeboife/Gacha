import React from "react";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext, showToast } from "../globalContext";
import UploadFilesModal from "../components/UploadFilesModal";
import { Plus } from "lucide-react";
import presetImg from "../assets/preset-img.png";
import { Upload } from "lucide-react";
import { PlayCircle } from 'lucide-react';
import { useState } from "react"
import { MoreHorizontal, RotateCcw, Filter, Download } from "lucide-react"

import chartImage from "../assets/chart-image.png";


let sdk = new MkdSDK();

const ViewUserStepSimulationPage = () => {
    const { dispatch: globalDispatch } = React.useContext(GlobalContext);

    const { dispatch } = React.useContext(GlobalContext);
    const [viewModel, setViewModel] = React.useState({});
        

      const [activeTab, setActiveTab] = useState("value-analysis")
  const [activeSubTab, setActiveSubTab] = useState("avg-values")
  const [activeBottomTab, setActiveBottomTab] = useState("step")
  const [activeStatsTab, setActiveStatsTab] = useState("mode")

  const chartData = [
    { name: "Total", color: "bg-blue-500", checked: true },
    { name: "Pull", color: "bg-orange-500", checked: true },
    { name: "Dupes", color: "bg-purple-500", checked: true },
    { name: "Milestone", color: "bg-green-500", checked: true },
  ]

  const tableData = [
    {
      pullNumber: 1,
      itemName: "Weapon 1",
      amount: 1,
      totalValue: "1,000",
      itemWeight: 400,
      probability: "8.77%",
      expectedValue: "98.12",
    },
    {
      pullNumber: 2,
      itemName: "Weapon 2",
      amount: 3,
      totalValue: "3,000",
      itemWeight: 600,
      probability: "4.3%",
      expectedValue: "43.26",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-white">
          <h1 className="py-3 text-[1.35rem] px-8 font-bold ">Step Simulation</h1>

        </div>

        {/* Main Content */}
        <div className="rounded-lg shadow-sm ">
          {/* Top Navigation */}
          <div className="flex px-8 py-1 bg-white border">
              <button
                onClick={() => setActiveTab("value-analysis")}
                className={`w-[120px] shrink-0 cursor-pointer font-normal  text-[14px]  border-[#161616]/50 border-b-2  h-[33px] flex items-center justify-center ${
                  activeTab === "value-analysis"
                    ? "border-gray-900 text-gray-900 bg-[#00000005]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Value analysis
              </button>
              <button
                onClick={() => setActiveTab("item-analysis")}
                className={`w-[120px] shrink-0 cursor-pointer font-normal  text-[14px] border-[#161616]/50 border-b-2  h-[33px] flex items-center justify-center ${
                  activeTab === "item-analysis"
                    ? "border-gray-900 text-gray-900 bg-[#00000005]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Item analysis
              </button>

              {/*<button className="inline-block float-right text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>*/}
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center justify-between px-8 py-2">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveSubTab("avg-values")}
                className={`text-sm font-medium pb-2 p-1 ${
                  activeSubTab === "avg-values"
                    ? " text-gray-900 bg-gray-100"
                    : " text-gray-500 hover:text-gray-700"
                }`}
              >
                Avg values
              </button>
              <button
                onClick={() => setActiveSubTab("individual-runs")}
                className={`text-sm font-medium pb-2 ${
                  activeSubTab === "individual-runs"
                    ? " text-gray-900"
                    : " text-gray-500 hover:text-gray-700"
                }`}
              >
                Individual runs
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-1 text-gray-400 bg-white border border-gray-200 hover:text-gray-100">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 text-base font-medium text-white rounded-md hover:bg-purple-700 bg-[#7F56D9]">
                <PlayCircle  className="inline-block w-5 h-5 mr-2 text-white" />
                Simulate
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-[#7F56D9] border rounded-md bg-purple-50 hover:bg-purple-50">
                <Filter className="w-4 h-4 mr-2" />
                Luck Filters
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between px-8 pb-4 space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-600">Pull range</span>
              <input type="text" className="w-12 px-2 py-2 text-sm text-center border border-gray-400 rounded" />
              <span className="text-lg text-gray-600">to</span>
              <input type="text" className="w-12 px-2 py-2 text-sm text-center border border-gray-400 rounded" />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-600">Core filter:</span>
              <select className="px-3 py-2 text-sm bg-white border border-gray-400 rounded w-28">
                <option >All cores</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-600">Output filter:</span>
              <select className="w-24 px-3 py-2 text-sm bg-white border border-gray-400 rounded">
                <option>All cores</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-600">Run ID:</span>
              <select className="w-40 px-3 py-2 text-sm bg-white border border-gray-400 rounded">
                <option>Total</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-600">Value:</span>
              <select className="w-40 px-3 py-2 text-sm bg-white border border-gray-400 rounded">
                <option>Hard currency</option>
              </select>
            </div>
          </div>

          {/* Chart Area */}
          <div className="px-8 mb-4 space-y-4">
            <div className="relative px-8 py-8 bg-white border border-gray-200 rounded-lg">
                <img src={chartImage} alt="chart image" className="block mb-4"/>
                
                {/* Chart Legend */}
                <div className="flex items-center pl-20 space-x-6">
                    {chartData.map((item) => (
                        <label key={item.name} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={item.checked}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                            readOnly
                        />
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <div className={`w-4 h-0.5 ${item.color}`}></div>
                        </label>
                    ))}
                </div>
            </div>

            
          </div>

          {/* Bottom Section */}
          <div className="px-8 space-y-6">
            {/* Bottom Navigation */}
            <div className="pb-3 border border-gray-200 rounded-lg">
            <div className="flex space-x-6 border ">
              <button
                onClick={() => setActiveBottomTab("step")}
                className={`text-md font-medium p-2 px-5 border-b-2 ${
                  activeBottomTab === "step"
                    ? "border-gray-900 text-gray-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Step
              </button>
              <button
                onClick={() => setActiveBottomTab("running-sum")}
                className={`text-md font-medium p-2 border-b-2 ${
                  activeBottomTab === "running-sum"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Running sum
              </button>
            </div>

            {/* Stats Navigation and Export */}
            <div className="flex items-center justify-between">
              <div className="flex py-2 space-x-6">
                {["median", "average", "mode", "percentile-total"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveStatsTab(tab)}
                    className={`text-sm font-medium py-2 p-3 rounded-md ${
                      activeStatsTab === tab
                        ? " text-gray-900 bg-gray-200"
                        : " text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>

              <button className="flex items-center px-4 py-2 text-sm font-medium text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </button>
            </div>

            {/* Table Section */}
            {/*<div className="space-y-4">
                <div className="text-sm font-medium text-center text-gray-600">Item name</div>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 border-r border-gray-200">
                          Pull #
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 border-r border-gray-200">
                          Item name
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 border-r border-gray-200">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 border-r border-gray-200">
                          Total value
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 border-r border-gray-200">
                          Item weight
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 border-r border-gray-200">
                          Probability
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">Expected value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-200 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{row.pullNumber}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{row.itemName}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900 border-r border-gray-200">
                            {row.amount}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900 border-r border-gray-200">
                            {row.totalValue}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900 border-r border-gray-200">
                            {row.itemWeight}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900 border-r border-gray-200">
                            {row.probability}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">{row.expectedValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default ViewUserStepSimulationPage