import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ControlPanel from '../components/ui/ControlPanel'
import AlgorithmInfo from '../components/ui/AlgorithmInfo'
import { towerOfHanoi } from '../algorithms/recursionAlgorithms'

// Algorithm information
const recursionAlgorithms = [
  {
    id: 'hanoi',
    name: 'Tower of Hanoi',
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    description: 'The Tower of Hanoi is a classic puzzle where you must move all disks from the first peg to the third peg following these rules: only one disk can be moved at a time, each move consists of taking the top disk from one of the stacks and placing it on top of another stack, and no disk may be placed on top of a smaller disk.'
  }
]

function RecursionVisualizer() {
  const [disks, setDisks] = useState(3)
  const [towers, setTowers] = useState([[], [], []])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [steps, setSteps] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(3)
  const [currentAlgorithm, setCurrentAlgorithm] = useState('hanoi')
  
  const animationRef = useRef(null)
  
  // Initialize towers on mount and when disk count changes
  useEffect(() => {
    resetTowers()
  }, [disks])
  
  // Effect for handling the animation playback
  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length) {
      const speedValues = {
        1: 1200, // Slow
        2: 800,  // Medium
        3: 400,  // Fast
        4: 200,  // Very Fast
        5: 100   // Super Fast
      }

      animationRef.current = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1)
      }, speedValues[speed])

      return () => {
        if (animationRef.current) {
          clearTimeout(animationRef.current)
        }
      }
    } else if (currentStepIndex >= steps.length && steps.length > 0) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentStepIndex, steps, speed])
  
  // Reset towers to initial state
  const resetTowers = () => {
    // Initialize first tower with disks in decreasing order
    const initialTowers = [
      Array.from({ length: disks }, (_, i) => disks - i),
      [],
      []
    ]
    
    setTowers(initialTowers)
    setSteps([initialTowers]) // First step is the initial state
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }
  
  // Start Tower of Hanoi algorithm
  const handlePlay = () => {
    if (steps.length <= 1) {
      // Generate steps for Tower of Hanoi
      const initialTowers = [
        Array.from({ length: disks }, (_, i) => disks - i),
        [],
        []
      ]
      
      const hanoiSteps = [initialTowers]
      towerOfHanoi(disks, 0, 2, 1, hanoiSteps)
      
      setSteps(hanoiSteps)
    }
    setIsPlaying(true)
  }
  
  // Pause animation
  const handlePause = () => {
    setIsPlaying(false)
  }
  
  // Reset animation
  const handleReset = () => {
    resetTowers()
  }
  
  // Handle disk count change
  const handleDiskCountChange = (count) => {
    setDisks(count)
  }
  
  // Find the currently selected algorithm
  const selectedAlgorithm = recursionAlgorithms.find(algo => algo.id === currentAlgorithm)
  
  // Get current state for visualization
  const currentTowers = steps[currentStepIndex] || towers
  
  // Get max tower height for consistent rendering
  const maxHeight = disks
  
  return (
    <div className="container-lg py-8">
      <h1 className="text-3xl font-bold mb-6">Recursion Visualizer</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ControlPanel 
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onSpeedChange={setSpeed}
            speed={speed}
            customControls={
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Disks: {disks}
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={disks}
                  onChange={(e) => handleDiskCountChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            }
          />
        </div>
        
        <div>
          <AlgorithmInfo algorithm={selectedAlgorithm} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-6 mb-8">
        <div className="mb-4 flex justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Disks: {disks}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Step: {currentStepIndex} / {steps.length - 1}
            </span>
          </div>
        </div>
        
        <div className="flex justify-around items-end h-64 md:h-80">
          {currentTowers.map((tower, towerIndex) => (
            <div key={towerIndex} className="flex flex-col items-center">
              {/* Tower base */}
              <div className="bg-gray-300 dark:bg-gray-600 w-40 h-4 rounded-md"></div>
              
              {/* Tower rod */}
              <div className="bg-gray-400 dark:bg-gray-500 w-4 h-48 md:h-64 absolute z-0"></div>
              
              {/* Empty tower space for proper alignment */}
              <div className="h-48 md:h-64 w-full flex flex-col-reverse items-center justify-start relative">
                {/* Disks */}
                {tower.map((diskSize, diskIndex) => {
                  // Calculate width based on disk size
                  const width = 20 + (diskSize * 15)
                  
                  // Calculate color based on disk size
                  const colors = [
                    'bg-red-500',
                    'bg-orange-500',
                    'bg-amber-500',
                    'bg-yellow-500',
                    'bg-lime-500',
                    'bg-green-500',
                    'bg-emerald-500',
                    'bg-teal-500'
                  ]
                  const diskColor = colors[diskSize - 1] || colors[0]
                  
                  return (
                    <motion.div
                      key={diskSize}
                      className={`${diskColor} rounded-md h-6 flex items-center justify-center text-white text-xs font-bold z-10`}
                      style={{ width: `${width}px` }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {diskSize}
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Tower label */}
              <div className="mt-4 text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 font-medium flex items-center justify-center">
                  {String.fromCharCode(65 + towerIndex)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">How Tower of Hanoi Works</h2>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            The Tower of Hanoi is a classic problem in recursive thinking. The goal is to move all disks from the first peg to the last peg, following these rules:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Only one disk may be moved at a time.</li>
            <li>Each move consists of taking the top disk from one of the stacks and placing it on top of another stack.</li>
            <li>No disk may be placed on top of a smaller disk.</li>
          </ol>
          <p className="text-gray-700 dark:text-gray-300">
            The recursive solution follows a simple pattern:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Move n-1 disks from source to auxiliary peg.</li>
            <li>Move the largest disk from source to destination peg.</li>
            <li>Move n-1 disks from auxiliary to destination peg.</li>
          </ol>
          <p className="text-gray-700 dark:text-gray-300">
            The minimum number of moves required to solve the Tower of Hanoi puzzle is 2<sup>n</sup> - 1, where n is the number of disks.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecursionVisualizer