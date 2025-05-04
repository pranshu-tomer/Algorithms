import { useState } from 'react'

function ControlPanel({ 
  isPlaying, 
  onPlay, 
  onPause, 
  onReset, 
  onSpeedChange, 
  speed = 3,
  onAlgorithmChange, 
  algorithms, 
  currentAlgorithm,
  onGenerateNewArray,
  arraySize = 50,
  onArraySizeChange,
  customControls
}) {
  const [arraySizeValue, setArraySizeValue] = useState(arraySize)
  const [speedValue, setSpeedValue] = useState(speed)
  
  const handleArraySizeChange = (e) => {
    const value = parseInt(e.target.value)
    setArraySizeValue(value)
    if (onArraySizeChange) {
      onArraySizeChange(value)
    }
  }
  
  const handleSpeedChange = (e) => {
    const value = parseInt(e.target.value)
    setSpeedValue(value)
    if (onSpeedChange) {
      onSpeedChange(value)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center">
          {isPlaying ? (
            <button
              onClick={onPause}
              className="btn btn-outline flex items-center"
              aria-label="Pause visualization"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Pause
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="btn btn-primary flex items-center"
              aria-label="Start visualization"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Play
            </button>
          )}

          <button
            onClick={onReset}
            className="btn btn-outline ml-2 flex items-center"
            aria-label="Reset visualization"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Reset
          </button>
        </div>

        {onGenerateNewArray && (
          <button
            onClick={onGenerateNewArray}
            className="btn btn-outline flex items-center"
            aria-label="Generate new array"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            New Array
          </button>
        )}

        {onAlgorithmChange && algorithms && (
          <div className="flex-grow">
            <select
              value={currentAlgorithm}
              onChange={(e) => onAlgorithmChange(e.target.value)}
              className="w-full rounded-md border-gray-300 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-gray-200"
            >
              {algorithms.map((algorithm) => (
                <option key={algorithm.id} value={algorithm.id}>
                  {algorithm.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {onArraySizeChange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Array Size: {arraySizeValue}
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={arraySizeValue}
              onChange={handleArraySizeChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {onSpeedChange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Speed: {speedValue === 1 ? 'Slow' : speedValue === 2 ? 'Medium' : 'Fast'}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={speedValue}
              onChange={handleSpeedChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>

      {customControls && (
        <div className="mt-4">
          {customControls}
        </div>
      )}
    </div>
  )
}

export default ControlPanel