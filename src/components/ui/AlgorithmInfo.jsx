import { useState } from 'react'
import { motion } from 'framer-motion'

function AlgorithmInfo({ algorithm }) {
  const [expanded, setExpanded] = useState(false)

  const timeColor = algorithm.timeComplexity.includes('O(n log n)') 
    ? 'text-success-600 dark:text-success-400'
    : algorithm.timeComplexity.includes('O(n²)') 
      ? 'text-warning-600 dark:text-warning-400'
      : 'text-error-600 dark:text-error-400'

  const variants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <h3 className="text-lg font-medium">{algorithm.name}</h3>
        <button
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <svg 
            className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
      
      <motion.div
        variants={variants}
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4">
          <div className="mb-3">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Time Complexity
            </div>
            <div className={`font-mono ${timeColor}`}>
              {algorithm.timeComplexity}
            </div>
          </div>
          
          <div className="mb-3">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Space Complexity
            </div>
            <div className="font-mono text-gray-800 dark:text-gray-200">
              {algorithm.spaceComplexity}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Description
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {algorithm.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AlgorithmInfo