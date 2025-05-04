import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ControlPanel from '../components/ui/ControlPanel'
import AlgorithmInfo from '../components/ui/AlgorithmInfo'
import { Stack, Queue, MinHeap } from '../algorithms/dataStructures'

const dataStructures = [
  {
    id: 'stack',
    name: 'Stack',
    timeComplexity: 'Push/Pop: O(1)',
    spaceComplexity: 'O(n)',
    description: 'A stack is a linear data structure that follows the Last In First Out (LIFO) principle. The last element added to the stack will be the first element removed.'
  },
  {
    id: 'queue',
    name: 'Queue',
    timeComplexity: 'Enqueue: O(1), Dequeue: O(n)',
    spaceComplexity: 'O(n)',
    description: 'A queue is a linear data structure that follows the First In First Out (FIFO) principle. The first element added to the queue will be the first element removed.'
  },
  {
    id: 'heap',
    name: 'Min Heap',
    timeComplexity: 'Insert/Extract: O(log n)',
    spaceComplexity: 'O(n)',
    description: 'A Min Heap is a complete binary tree where the value of each node is less than or equal to its children. The root contains the minimum element.'
  }
]

// Define gradient colors for stack elements
const stackColors = [
  'from-red-500 to-orange-500',
  'from-orange-500 to-yellow-500',
  'from-yellow-500 to-green-500',
  'from-green-500 to-teal-500',
  'from-teal-500 to-blue-500',
  'from-blue-500 to-indigo-500',
  'from-indigo-500 to-purple-500',
  'from-purple-500 to-pink-500'
]

function DataStructureVisualizer() {
  const [dataStructure, setDataStructure] = useState('stack')
  const [stack] = useState(new Stack())
  const [queue] = useState(new Queue())
  const [heap] = useState(new MinHeap())
  const [items, setItems] = useState([])
  const [heapStructure, setHeapStructure] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [animationState, setAnimationState] = useState({
    entering: null,
    exiting: null
  })

  useEffect(() => {
    setItems([])
    setHeapStructure([])
    setInputValue('')
    setAnimationState({ entering: null, exiting: null })
  }, [dataStructure])

  const handleInsert = () => {
    if (!inputValue.trim()) return
    const value = parseInt(inputValue) || inputValue

    setAnimationState({
      entering: value,
      exiting: null
    })

    if (dataStructure === 'stack') {
      stack.push(value)
      setItems(stack.getItems())
    } else if (dataStructure === 'queue') {
      queue.enqueue(value)
      setItems(queue.getItems())
    } else if (dataStructure === 'heap') {
      heap.insert(value)
      setItems(heap.getItems())
      setHeapStructure(heap.getHeapStructure())
    }

    setInputValue('')
    setTimeout(() => {
      setAnimationState({ entering: null, exiting: null })
    }, 500)
  }

  const handleRemove = () => {
    let removedItem

    if (dataStructure === 'stack') {
      if (stack.isEmpty()) return
      removedItem = stack.peek()
      setAnimationState({
        entering: null,
        exiting: removedItem
      })
      stack.pop()
      setItems(stack.getItems())
    } else if (dataStructure === 'queue') {
      if (queue.isEmpty()) return
      removedItem = queue.front()
      setAnimationState({
        entering: null,
        exiting: removedItem
      })
      queue.dequeue()
      setItems(queue.getItems())
    } else if (dataStructure === 'heap') {
      if (heap.isEmpty()) return
      removedItem = heap.findMin()
      setAnimationState({
        entering: null,
        exiting: removedItem
      })
      heap.extractMin()
      setItems(heap.getItems())
      setHeapStructure(heap.getHeapStructure())
    }

    setTimeout(() => {
      setAnimationState({ entering: null, exiting: null })
    }, 500)
  }

  const handleAlgorithmChange = (value) => {
    setDataStructure(value)
  }

  const selectedDataStructure = dataStructures.find(ds => ds.id === dataStructure)

  const renderHeap = () =>  {
    if (!heapStructure.length) return null

    const levels = []
    let level = 0
    let count = 0

    while (count < heapStructure.length) {
      const levelSize = Math.pow(2, level)
      levels.push(heapStructure.slice(count, count + levelSize))
      count += levelSize
      level++
    }

    return (
      <div className="flex flex-col items-center space-y-8">
        {levels.map((level, levelIndex) => (
          <div 
            key={levelIndex}
            className="flex justify-center space-x-4"
            style={{
              width: `${Math.pow(2, levelIndex) * 60}px`
            }}
          >
            {level.map((node, nodeIndex) => (
              <motion.div
                key={nodeIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
              >
                {node.value}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container-lg py-8">
      <h1 className="text-3xl font-bold mb-6">Data Structure Visualizer</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ControlPanel 
            onAlgorithmChange={handleAlgorithmChange}
            algorithms={dataStructures}
            currentAlgorithm={dataStructure}
            customControls={
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      dataStructure === 'stack' ? "Value to push" :
                      dataStructure === 'queue' ? "Value to enqueue" :
                      "Value to insert"
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    maxLength={10}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleInsert}
                    className="btn btn-primary flex-1"
                  >
                    {dataStructure === 'stack' ? 'Push' :
                     dataStructure === 'queue' ? 'Enqueue' :
                     'Insert'}
                  </button>
                  <button
                    onClick={handleRemove}
                    className="btn btn-outline flex-1"
                    disabled={items.length === 0}
                  >
                    {dataStructure === 'stack' ? 'Pop' :
                     dataStructure === 'queue' ? 'Dequeue' :
                     'Extract Min'}
                  </button>
                </div>
              </div>
            }
          />
        </div>
        
        <div>
          <AlgorithmInfo algorithm={selectedDataStructure} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-6">
        <h2 className="text-xl font-semibold mb-4">
          {dataStructure === 'stack' ? 'Stack' :
           dataStructure === 'queue' ? 'Queue' :
           'Min Heap'} Visualization
        </h2>
        
        <div className="flex justify-center items-center min-h-[300px]">
          {dataStructure === 'stack' ? (
            <div className="relative w-64 h-full flex flex-col-reverse items-center justify-end">
              <div className="absolute top-0 right-0 text-sm text-gray-500">
                Top: {stack.getTop()}
              </div>
              
              {animationState.entering !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 w-full"
                  style={{ zIndex: 10 }}
                >
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white p-3 m-1 rounded shadow-md text-center">
                    {animationState.entering}
                  </div>
                </motion.div>
              )}
              
              {items.map((item, index) => {
                const isExiting = animationState.exiting === item && index === items.length - 1
                const isTop = index === items.length - 1
                const colorIndex = index % stackColors.length
                
                return (
                  <motion.div 
                    key={`${index}-${item}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isExiting ? 0 : 1, 
                      scale: isExiting ? 0.8 : 1,
                      y: isExiting ? -50 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-full relative"
                  >
                    <div className={`bg-gradient-to-r ${stackColors[colorIndex]} text-white p-3 m-1 rounded shadow-md text-center`}>
                      {item}
                      {isTop && <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">← Top</span>}
                    </div>
                  </motion.div>
                )
              })}
              
              <div className="bg-gray-300 dark:bg-gray-600 w-full h-2 rounded-b-md mt-2"></div>
            </div>
          ) : dataStructure === 'queue' ? (
            <div className="relative w-full h-32 flex items-center justify-center">
              <div className="bg-gray-200 dark:bg-gray-700 w-full h-16 rounded-md relative flex items-center">
                <div className="absolute -top-8 left-0 text-sm text-gray-500">
                  Front: {queue.getFrontIndex()}
                </div>
                <div className="absolute -top-8 right-0 text-sm text-gray-500">
                  Rear: {queue.getRearIndex()}
                </div>
                
                {animationState.entering !== null && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-0"
                    style={{ zIndex: 10 }}
                  >
                    <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white p-2 m-1 rounded shadow-md text-center min-w-[40px]">
                      {animationState.entering}
                    </div>
                  </motion.div>
                )}
                
                <div className="flex justify-center w-full h-full items-center">
                  {items.length === 0 ? (
                    <span className="text-gray-400 text-sm">Empty Queue</span>
                  ) : (
                    items.map((item, index) => {
                      const isExiting = animationState.exiting === item && index === 0
                      const isFront = index === 0
                      const isRear = index === items.length - 1
                      const colorIndex = index % stackColors.length
                      
                      return (
                        <motion.div 
                          key={`${index}-${item}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: isExiting ? 0 : 1, 
                            scale: isExiting ? 0.8 : 1,
                            x: isExiting ? 50 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <div 
                            className={`bg-gradient-to-r ${stackColors[colorIndex]} text-white p-2 m-1 rounded shadow-md text-center min-w-[40px]`}
                          >
                            {item}
                            {isFront && <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">Front</div>}
                            {isRear && <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">Rear</div>}
                          </div>
                        </motion.div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          ) : (
            renderHeap()
          )}
        </div>
      </div>
    </div>
  )
}

export default DataStructureVisualizer