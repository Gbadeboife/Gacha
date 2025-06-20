import React from "react"
import { useState } from "react"
import { X, Upload, Trash2, Check } from "lucide-react"
import presetImg from "../assets/preset-img.png";




export default function UploadFilesModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [selectedPreset, setSelectedPreset] = useState(null)

  const presetImages = [
    { id: 1, src: presetImg, alt: "Character 1" },
    { id: 2, src: presetImg, alt: "Character 2" },
    { id: 3, src: presetImg, alt: "Character 3" },
  ]

  const handleFileUpload = (event) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
      }))
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
      }))
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-3 pb-1">
          <h2 className="text-base font-medium text-gray-700">Upload files</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex-1 px-4 pt-3 pb-1 text-lg font-normal border-b-2 ${
                activeTab === "upload"
                  ? "text-gray-700 border-gray-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Upload className="inline w-4 h-4 mr-2" />
              Upload image(s)
            </button>
            <button
              onClick={() => setActiveTab("presets")}
              className={`flex-1 px-4 pt-3 text-lg font-normal border-b-2 pb-1 ${
                activeTab === "presets"
                  ? "text-gray-700 border-gray-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg className="inline w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
              Presets selection
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className={`p-4 ${activeTab === 'presets' ? 'pr-0' : ''}`}>

          {activeTab === "upload" ? (
            <div className="space-y-3">
              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="p-4 text-center transition-colors border-2 border-gray-200 border-dashed rounded-lg hover:border-gray-400"
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <label
                      htmlFor="file-upload"
                      className="text-sm font-medium text-purple-600 cursor-pointer hover:text-blue-700"
                    >
                      Click to upload
                    </label>
                    <span className="text-sm text-gray-500"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        {file.preview && (
                          <img
                            src={file.preview || "/placeholder.svg"}
                            alt={file.name}
                            className="object-cover rounded w-[40px] h-[40px]"
                          />
                        )}
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preset Images */}
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-3">
                  {presetImages.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset.id)}
                      className={`flex-shrink-0 w-48 relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedPreset === preset.id ? "border-purple-500" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                    <img
                        src={preset.src}
                        alt={preset.alt}
                        className="object-cover w-full h-40"
                    />
                    <div
                      className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPreset === preset.id ? "bg-purple-500 border-purple-500" : "bg-white border-gray-300"
                      }`}
                    >
                      {selectedPreset === preset.id && <Check className="w-4 h-4 text-white" />}
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex p-4 pt-0 space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-1 font-normal text-gray-700 border border-gray-400 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-1 font-normal text-white bg-purple-600 rounded-md hover:bg-purple-700">
            Save and close
          </button>
        </div>
      </div>
    </div>
  )
}
