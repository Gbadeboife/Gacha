import React from "react"
import { useState } from "react"
import { ArrowLeft, Plus, Upload, ChevronRight, ChevronDown, ChevronLeft } from "lucide-react"
import arrowLeft from "../assets/arrow-left.png";



export default function OutputsManagement({setShowOutputs}) {
  const [activeTab, setActiveTab] = useState("outputs")
  const [activeOutput, setActiveOutput] = useState("output-1")
  const [expandedRows, setExpandedRows] = useState(new Set([6]))
  const [perPage, setPerPage] = useState(10)

  const mainTableData = [
    {
      id: 1,
      itemName: "Weapon 1",
      itemWeight: 400,
      probability: "8.77%",
      amount: 1,
      totalValue: "1,000",
      ev: "98.12",
      dupeProtect: true,
    },
    {
      id: 2,
      itemName: "Weapon 1",
      itemWeight: 600,
      probability: "4.3%",
      amount: 3,
      totalValue: "3,000",
      ev: "43.26",
      dupeProtect: false,
    },
    {
      id: 3,
      itemName: "Weapon 1",
      itemWeight: 500,
      probability: "1.24%",
      amount: 6,
      totalValue: 900,
      ev: "29.45",
      dupeProtect: true,
    },
    {
      id: 4,
      itemName: "Weapon 1",
      itemWeight: 800,
      probability: "0.93%",
      amount: 1,
      totalValue: 810,
      ev: "6.24",
      dupeProtect: true,
    },
    {
      id: 5,
      itemName: "Weapon 1",
      itemWeight: 1200,
      probability: "3.21%",
      amount: 8,
      totalValue: "9,000",
      ev: "53.10",
      dupeProtect: false,
    },
    {
      id: 6,
      itemName: "Weapon 1",
      itemWeight: 300,
      probability: "1.24%",
      amount: 12,
      totalValue: 600,
      ev: "32.85",
      dupeProtect: false,
      hasSubItems: true,
    },
  ]

  const subItemsData = [
    {
      itemName: "Weapon 1",
      itemWeight: 300,
      probability: "1.24%",
      amount: 12,
      totalValue: 600,
      ev: "32.85",
      dupeProtect: false,
    },
    {
      itemName: "Weapon 1",
      itemWeight: 300,
      probability: "1.24%",
      amount: 12,
      totalValue: 600,
      ev: "32.85",
      dupeProtect: false,
    },
    {
      itemName: "Weapon 1",
      itemWeight: 300,
      probability: "1.24%",
      amount: 12,
      totalValue: 600,
      ev: "32.85",
      dupeProtect: false,
    },
  ]

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }



  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className=" text-[1rem] text-[#525252] flex items-center px-10 mb-3 font-medium">
          <button className="" onClick={()=> setShowOutputs(false)}>
            <img src= {arrowLeft} alt="arrow-left" className="inline-block w-6 mr-1" />
            Back
          </button>
        </div>

        {/* Main Navigation Tabs */}
        
        <div className="flex w-full border-t border-b grow">
          {["outputs", "unique-item-output-protection", "pity", "milestone"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm border-b-2 ml-4  rounded-[6px] my-1 shrink-0 cursor-pointer font-normal  text-[14px]  h-[30px] flex items-center justify-center ${
                activeTab === tab
                  ? "border-gray-900 text-gray-900 bg-[#00000005]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/-/g, " ")}
            </button>
          ))}
        </div>

          <div className="border-b border-gray-200 grow">
            <div className="flex items-center space-x-1">
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <Plus className="w-4 h-4 mr-1" />
              </button>
              {["output-1", "output-2", "output-3"].map((output) => (
                <button
                  key={output}
                  onClick={() => setActiveOutput(output)}
                  className={`w-[80px] shrink-0 cursor-pointer font-normal  text-[14px] bg-[#00000005] border-[#161616]/50 h-[30px] flex items-center justify-center ${
                    activeOutput === output ? "bg-gray-100 text-gray-900 border-b-2 " : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {output.charAt(0).toUpperCase() + output.slice(1).replace("-", " ")}
                </button>
              ))}
            </div>

          </div>

          {/* Breadcrumb and Controls */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Core 1</span>
              <span>/</span>
              <span>Outputs</span>
              <span>/</span>
              <span className="font-medium text-gray-900">Output 1</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                EV sum: <span className="font-medium">2,000</span>
              </div>
              <button className="flex items-center px-4 py-2 text-sm text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50">
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </button>
            </div>
          </div>
          
          {/* Table Controls */}
          <div className="flex items-center justify-between p-4">
            <div className="text-sm text-gray-600">Showing 1-10 of 50</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Per page:</span>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          
        {/* Output Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
         

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b ">
                <tr>
                  <th className="w-12 px-4 py-3 text-sm font-medium text-left text-gray-600"></th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">Item name</th>
                  <th className="px-4 py-3 text-sm font-medium text-right text-gray-600">Item weight</th>
                  <th className="px-4 py-3 text-sm font-medium text-right text-gray-600">Probability</th>
                  <th className="px-4 py-3 text-sm font-medium text-right text-gray-600 align-right">Amount</th>
                  <th className="px-4 py-3 text-sm font-medium text-right text-gray-600">Total value</th>
                  <th className="px-4 py-3 text-sm font-medium text-right text-gray-600">EV</th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">Dupe protect</th>
                </tr>
              </thead>
              <tbody>
                {mainTableData.map((row, index) => (
                  <>
                    <tr
                      key={row.id}
                      className={`border-b border-gray-100 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="px-4 py-4 text-sm text-gray-600">{row.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          {row.hasSubItems ? (
                            <button onClick={() => toggleExpanded(row.id)} className="mr-2">
                              {expandedRows.has(row.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          ) : (
                            <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                          )}
                          {row.itemName}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-right text-gray-900">{row.itemWeight}</td>
                      <td className="px-4 py-4 text-sm text-right text-gray-900">{row.probability}</td>
                      <td className="px-4 py-4 text-sm text-right text-gray-900">{row.amount}</td>
                      <td className="px-4 py-4 text-sm text-right text-gray-900">{row.totalValue}</td>
                      <td className="px-4 py-4 text-sm text-right text-gray-900">{row.ev}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => toggleDupeProtect(row.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            row.dupeProtect ? "bg-purple-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              row.dupeProtect ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                    {/* Sub-items */}
                    {expandedRows.has(row.id) && row.hasSubItems && (
                      <>
                        {subItemsData.map((subItem, subIndex) => (
                          <tr key={`${row.id}-${subIndex}`} className="border-b border-gray-100 bg-gray-25">
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3 pl-12 text-sm text-gray-700">{subItem.itemName}</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-700">{subItem.itemWeight}</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-700">{subItem.probability}</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-700">{subItem.amount}</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-700">{subItem.totalValue}</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-700">{subItem.ev}</td>
                            <td className="px-4 py-3">
                              <button
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  subItem.dupeProtect ? "bg-purple-600" : "bg-gray-300"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    subItem.dupeProtect ? "translate-x-6" : "translate-x-1"
                                  }`}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <button className="flex items-center text-purple-600 hover:text-purple-700">
              <Plus className="w-4 h-4 mr-1" />
              New
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Showing 1-10 of 50</div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Prev
                </button>
                <button className="px-3 py-1 text-sm text-white bg-purple-600 rounded">1</button>
                <button className="flex items-center px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
