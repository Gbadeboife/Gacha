import React from "react"
import { useState } from "react"

const ViewInventoryDuplicatePage= () => {
  const [inventoryData, setInventoryData] = useState([
    {
      id: 1,
      name: "Weapon 1",
      protect: true,
      dupeReward: "Token",
      amount: 400,
      itemValue: "1,000",
      duplicateValue: 800,
    },
    {
      id: 2,
      name: "Weapon 2",
      protect: false,
      dupeReward: "Token",
      amount: 600,
      itemValue: "3,000",
      duplicateValue: "1,200",
    },
    {
      id: 3,
      name: "Character 1",
      protect: true,
      dupeReward: "Token",
      amount: 500,
      itemValue: "9,000",
      duplicateValue: "1,500",
    },
    {
      id: 4,
      name: "Character 2",
      protect: true,
      dupeReward: "Token",
      amount: 800,
      itemValue: "2,000",
      duplicateValue: "1,600",
    },
    {
      id: 5,
      name: "Banner 1",
      protect: false,
      dupeReward: "Token",
      amount: "1,200",
      itemValue: 400,
      duplicateValue: "2,400",
    },
    { id: 6, name: "Banner 2", protect: false, dupeReward: "Token", amount: 300, itemValue: 300, duplicateValue: 600 },
    { id: 7, name: "Token", protect: false, dupeReward: "Token", amount: 500, itemValue: 300, duplicateValue: "1,000" },
    {
      id: 8,
      name: "Gems",
      protect: false,
      dupeReward: "Token",
      amount: 400,
      itemValue: "1,200",
      duplicateValue: "1,200",
    },
    { id: 9, name: "Shards", protect: false, dupeReward: "Token", amount: 400, itemValue: 800, duplicateValue: 800 },
    { id: 10, name: "Shards", protect: false, dupeReward: "Token", amount: 800, itemValue: 600, duplicateValue: 600 },
  ])

  const toggleProtect = (id) => {
    setInventoryData((prev) => prev.map((item) => (item.id === id ? { ...item, protect: !item.protect } : item)))
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-medium text-gray-900">Inventory Duplicate</h1>

        <div className="overflow-hidden bg-white shadow-sm rounded-xl">
          <table className="w-full border border-gray-200">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="w-12 px-3 py-3 text-base font-normal text-left text-gray-600"></th>
                <th className="w-32 px-4 py-3 text-base font-normal tracking-wider text-left text-gray-600">
                  Item name
                </th>
                <th className="w-32 px-4 py-3 text-base font-normal text-left text-gray-600">
                  Inventory protect
                </th>
                <th className="px-4 py-3 text-base font-normal text-left text-gray-600 w-36">
                  Dupe reward name
                </th>
                <th className="w-24 px-4 py-3 text-base font-normal text-right text-gray-600">
                  Amount
                </th>
                <th className="px-4 py-3 text-base font-normal text-right text-gray-600 w-28">
                  Item value
                </th>
                <th className="w-32 px-4 py-3 text-base font-normal text-right text-gray-600">Duplicate value</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr key={item.id} className= "border-b border-gray-200 ">
                  <td className="px-3 py-4 text-sm text-center text-gray-600 border-r border-gray-200">{item.id}</td>
                  <td className="px-4 py-4 text-gray-900 border-r border-gray-200 text-md">{item.name}</td>
                  <td className="px-4 py-4 border-r border-gray-200">
                    <button
                      onClick={() => toggleProtect(item.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.protect ? "bg-purple-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.protect ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-gray-600 border-r border-gray-200 text-md">{item.dupeReward}</td>
                  <td className="px-4 py-4 text-right text-gray-900 border-r border-gray-200 text-md">{item.amount}</td>
                  <td className="px-4 py-4 text-right text-gray-500 border-r border-gray-200 text-md">
                    {item.itemValue}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-500 text-md">{item.duplicateValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


export default ViewInventoryDuplicatePage;