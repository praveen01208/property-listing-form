import React, { useState } from 'react'

const flatIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 21h18M3 3v18h18V3H3z" />
  </svg>
)

const propertyTypes = ['Residential', 'Commercial']
const residentialOptions = ['Flat', 'House', 'Plot', 'More Options']
const areaUnits = ['Sqft', 'Sqm', 'Acre', 'Hectare']

export default function App() {
  const [username] = useState('username')
  const [city, setCity] = useState('')
  const [location, setLocation] = useState('')
  const [propertyName, setPropertyName] = useState('')
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([])
  const [residentialType, setResidentialType] = useState('')
  const [bedrooms, setBedrooms] = useState(null)
  const [moreBedrooms, setMoreBedrooms] = useState('')
  const [areaValue, setAreaValue] = useState('')
  const [areaUnit, setAreaUnit] = useState(areaUnits[0])

  // Handle checkbox toggle for property types
  const togglePropertyType = (type) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type))
      if (type === 'Residential') {
        setResidentialType('')
      }
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type])
    }
  }

  // Handle bedrooms selection
  const selectBedrooms = (num) => {
    setBedrooms(num)
    setMoreBedrooms('')
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 font-sans bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hey {username}! Let us know about your property</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="city">
            City
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="propertyName">
            Enter property/society name
          </label>
          <input
            id="propertyName"
            type="text"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter property or society name"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4 rounded-lg text-white shadow-lg">
        <p className="font-semibold mb-2 text-lg">Property Type</p>
        <div className="flex space-x-6">
          {propertyTypes.map((type) => (
            <label key={type} className="inline-flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="propertyType"
                value={type}
                checked={selectedPropertyTypes[0] === type}
                onChange={() => setSelectedPropertyTypes([type])}
                className="form-radio h-6 w-6 text-yellow-300"
              />
              <span className="text-white font-semibold">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedPropertyTypes[0] === 'Residential' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
          <p className="font-semibold mb-3 text-gray-800 text-lg">Residential Options</p>
          <div className="flex space-x-6">
            {residentialOptions.filter(opt => opt !== 'More Options').map((option) => (
              <label key={option} className="inline-flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="residentialType"
                  value={option}
                  checked={residentialType === option}
                  onChange={() => setResidentialType(option)}
                  className="form-radio h-6 w-6 text-indigo-600"
                />
                <span className="text-gray-700 font-semibold">{option}</span>
              </label>
            ))}
            <label className="inline-flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="residentialType"
                value="More Options"
                checked={residentialType === 'More Options'}
                onChange={() => setResidentialType('More Options')}
                className="form-radio h-6 w-6 text-indigo-600"
              />
              <span className="text-gray-700 font-semibold">More Options</span>
            </label>
            {residentialType === 'More Options' && (
              <select
                className="ml-4 border border-gray-300 rounded px-3 py-1"
                onChange={(e) => setResidentialType(e.target.value)}
                value={residentialType}
              >
                <option value="More Options" disabled>
                  Select an option
                </option>
                <option value="Studio">Studio</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Duplex">Duplex</option>
              </select>
            )}
          </div>

          {residentialType === 'Flat' && (
            <div className="mt-6 flex items-center space-x-6">
              {flatIcon}
              <div>
                <p className="font-semibold text-gray-800">Flat Options</p>
                {/* Add flat-specific options here */}
                <p className="text-gray-600">Options relevant to flats will appear here.</p>
              </div>
            </div>
          )}

          {residentialType && residentialType !== 'Flat' && (
            <div className="mt-6">
              <p className="font-semibold text-gray-800">{residentialType} Options</p>
              <p className="text-gray-600">Options relevant to {residentialType.toLowerCase()}s will appear here.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        <p className="font-semibold mb-2 text-gray-800">Bedrooms (BHK)</p>
        <div className="flex space-x-3 items-center">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => selectBedrooms(num)}
              className={`px-4 py-2 rounded border font-semibold ${
                bedrooms === num ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
              } focus:outline-none hover:bg-indigo-500 hover:text-white transition`}
            >
              {num}
            </button>
          ))}
          <select
            value={moreBedrooms}
            onChange={(e) => {
              setBedrooms(null)
              setMoreBedrooms(e.target.value)
            }}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">More</option>
            {[5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="font-semibold text-gray-800">Area</p>
        <div className="flex space-x-4 items-center">
          <input
            type="number"
            min="0"
            value={areaValue}
            onChange={(e) => setAreaValue(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter area"
          />
          <select
            value={areaUnit}
            onChange={(e) => setAreaUnit(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {areaUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="button"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 focus:outline-none transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}
