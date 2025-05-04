import { useState, useEffect, useRef } from 'react'
import ControlPanel from '../components/ui/ControlPanel'
import AlgorithmInfo from '../components/ui/AlgorithmInfo'
import { 
  breadthFirstSearch, 
  depthFirstSearch, 
  dijkstraAlgorithm 
} from '../algorithms/graphAlgorithms'

// Algorithm information
const graphAlgorithms = [
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'BFS explores all the vertices of a graph at the current depth before moving on to vertices at the next depth level. It uses a queue data structure and is optimal for finding the shortest path in unweighted graphs.'
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'DFS explores as far as possible along each branch before backtracking. It uses a stack data structure (or recursion) and is useful for topological sorting, finding connected components, and solving puzzles like mazes.'
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra\'s Algorithm',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    description: 'Dijkstra\'s algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph. It uses a priority queue and does not work with negative weights.'
  }
]

function GraphVisualizer() {
  const [grid, setGrid] = useState([])
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [sourceNode, setSourceNode] = useState(null)
  const [targetNode, setTargetNode] = useState(null)
  const [algorithmSteps, setAlgorithmSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(3)
  const [currentAlgorithm, setCurrentAlgorithm] = useState('bfs')
  const [gridSize, setGridSize] = useState({ rows: 10, cols: 15 })
  const [isDirected, setIsDirected] = useState(false)
  const [isWeighted, setIsWeighted] = useState(false)
  
  const animationRef = useRef(null)
  const svgRef = useRef(null)

  // Initialize grid on mount
  useEffect(() => {
    generateRandomGraph()
  }, [gridSize])

  // Effect for handling the animation playback
  useEffect(() => {
    if (isPlaying && currentStepIndex < algorithmSteps.length) {
      const speedValues = {
        1: 800, // Slow
        2: 400, // Medium
        3: 200, // Fast
        4: 100, // Very Fast
        5: 50   // Super Fast
      }

      animationRef.current = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1)
      }, speedValues[speed])

      return () => {
        if (animationRef.current) {
          clearTimeout(animationRef.current)
        }
      }
    } else if (currentStepIndex >= algorithmSteps.length && algorithmSteps.length > 0) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentStepIndex, algorithmSteps, speed])

  // Generate random graph
  const generateRandomGraph = () => {
    // Create nodes
    const newNodes = []
    const nodeRadius = 15
    const svgWidth = 800
    const svgHeight = 500
    const padding = nodeRadius * 3
    
    const cols = gridSize.cols
    const rows = gridSize.rows
    
    const cellWidth = (svgWidth - padding * 2) / cols
    const cellHeight = (svgHeight - padding * 2) / rows
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const nodeId = row * cols + col
        newNodes.push({
          id: nodeId,
          x: padding + col * cellWidth + cellWidth / 2,
          y: padding + row * cellHeight + cellHeight / 2,
          row,
          col
        })
      }
    }
    
    // Create edges
    const newEdges = []
    const directions = [
      [0, 1],  // right
      [1, 0],  // down
      [0, -1], // left
      [-1, 0]  // up
    ]
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const nodeId = row * cols + col
        
        // Add edges with probability (70% for orthogonal neighbors)
        for (const [dr, dc] of directions) {
          const newRow = row + dr
          const newCol = col + dc
          
          if (
            newRow >= 0 && newRow < rows && 
            newCol >= 0 && newCol < cols && 
            Math.random() < 0.7
          ) {
            const neighborId = newRow * cols + newCol
            
            // For undirected graphs, only add edge if we haven't added the reverse
            const shouldAddEdge = isDirected || 
              (!newEdges.some(e => 
                (e.source === neighborId && e.target === nodeId)
              ))
            
            if (shouldAddEdge) {
              newEdges.push({
                id: `${nodeId}-${neighborId}`,
                source: nodeId,
                target: neighborId,
                weight: isWeighted ? Math.floor(Math.random() * 9) + 1 : 1
              })
            }
          }
        }
      }
    }
    
    // Set random source and target nodes
    const sourceIndex = Math.floor(Math.random() * newNodes.length)
    let targetIndex = Math.floor(Math.random() * newNodes.length)
    
    // Make sure target is different from source
    while (targetIndex === sourceIndex) {
      targetIndex = Math.floor(Math.random() * newNodes.length)
    }
    
    setNodes(newNodes)
    setEdges(newEdges)
    setSourceNode(sourceIndex)
    setTargetNode(targetIndex)
    setAlgorithmSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  // Handle algorithm change
  const handleAlgorithmChange = (algorithmId) => {
    setCurrentAlgorithm(algorithmId)
    setAlgorithmSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  // Start algorithm visualization
  const handlePlay = () => {
    if (algorithmSteps.length === 0) {
      let steps = []

      // Create adjacency list representation
      const adjacencyList = {}
      nodes.forEach(node => {
        adjacencyList[node.id] = []
      })
      
      edges.forEach(edge => {
        adjacencyList[edge.source].push({
          node: edge.target,
          weight: edge.weight
        })
        
        if (!isDirected) {
          adjacencyList[edge.target].push({
            node: edge.source,
            weight: edge.weight
          })
        }
      })

      switch (currentAlgorithm) {
        case 'bfs':
          steps = breadthFirstSearch(adjacencyList, sourceNode, targetNode)
          break
        case 'dfs':
          steps = depthFirstSearch(adjacencyList, sourceNode, targetNode)
          break
        case 'dijkstra':
          steps = dijkstraAlgorithm(adjacencyList, sourceNode, targetNode)
          break
        default:
          steps = breadthFirstSearch(adjacencyList, sourceNode, targetNode)
      }

      setAlgorithmSteps(steps)
    }
    setIsPlaying(true)
  }

  // Pause algorithm visualization
  const handlePause = () => {
    setIsPlaying(false)
  }

  // Reset algorithm visualization
  const handleReset = () => {
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  // Get current state for visualization
  const getCurrentState = () => {
    if (algorithmSteps.length === 0 || currentStepIndex === 0) {
      return { visited: [], path: [] }
    }
    return algorithmSteps[currentStepIndex - 1]
  }

  const currentState = getCurrentState()
  const visitedNodes = currentState.visited || []
  const pathNodes = currentState.path || []

  // Find the currently selected algorithm
  const selectedAlgorithm = graphAlgorithms.find(algo => algo.id === currentAlgorithm)

  // Handle node click
  const handleNodeClick = (nodeId) => {
    if (sourceNode === nodeId) {
      setSourceNode(null)
    } else if (targetNode === nodeId) {
      setTargetNode(null)
    } else if (sourceNode === null) {
      setSourceNode(nodeId)
    } else if (targetNode === null) {
      setTargetNode(nodeId)
    } else {
      setSourceNode(nodeId)
      setTargetNode(null)
    }
    
    setAlgorithmSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }

  return (
    <div className="container-lg py-8">
      <h1 className="text-3xl font-bold mb-6">Graph Algorithm Visualizer</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ControlPanel 
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onSpeedChange={setSpeed}
            speed={speed}
            onAlgorithmChange={handleAlgorithmChange}
            algorithms={graphAlgorithms}
            currentAlgorithm={currentAlgorithm}
            onGenerateNewArray={generateRandomGraph}
            customControls={
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="directed"
                    checked={isDirected}
                    onChange={() => setIsDirected(!isDirected)}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="directed" className="ml-2 text-sm">
                    Directed Graph
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="weighted"
                    checked={isWeighted}
                    onChange={() => setIsWeighted(!isWeighted)}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="weighted" className="ml-2 text-sm">
                    Weighted Graph
                  </label>
                </div>
                <div className="flex items-center">
                  <label htmlFor="gridSize" className="mr-2 text-sm">
                    Grid Size:
                  </label>
                  <select
                    id="gridSize"
                    value={`${gridSize.rows}x${gridSize.cols}`}
                    onChange={(e) => {
                      const [rows, cols] = e.target.value.split('x').map(Number)
                      setGridSize({ rows, cols })
                    }}
                    className="rounded-md border-gray-300 text-sm bg-white dark:bg-gray-700 py-1 px-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-gray-200"
                  >
                    <option value="5x8">Small (5x8)</option>
                    <option value="10x15">Medium (10x15)</option>
                    <option value="15x20">Large (15x20)</option>
                  </select>
                </div>
              </div>
            }
          />
        </div>
        
        <div>
          <AlgorithmInfo algorithm={selectedAlgorithm} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-6 mb-4">
        <div className="mb-4 flex justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Nodes: {nodes.length}, Edges: {edges.length}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Step: {currentStepIndex} / {algorithmSteps.length}
            </span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <svg
            ref={svgRef}
            width="100%"
            height="500"
            className="bg-gray-50 dark:bg-gray-900 rounded-lg"
            style={{ maxWidth: '800px' }}
          >
            {/* Render edges */}
            {edges.map(edge => {
              const source = nodes[edge.source]
              const target = nodes[edge.target]
              
              if (!source || !target) return null
              
              const isVisited = visitedNodes.some(visited => 
                (visited.from === edge.source && visited.to === edge.target) ||
                (!isDirected && visited.from === edge.target && visited.to === edge.source)
              )
              
              const isPath = pathNodes.some(path => 
                (path.from === edge.source && path.to === edge.target) ||
                (!isDirected && path.from === edge.target && path.to === edge.source)
              )
              
              let edgeClass = 'edge'
              if (isPath) edgeClass += ' edge-path'
              else if (isVisited) edgeClass += ' edge-visited'
              
              // Calculate direction for arrows if directed
              const dx = target.x - source.x
              const dy = target.y - source.y
              const angle = Math.atan2(dy, dx)
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              // Adjust start and end points to not overlap nodes
              const nodeRadius = 15
              const startX = source.x + nodeRadius * Math.cos(angle)
              const startY = source.y + nodeRadius * Math.sin(angle)
              const endX = target.x - nodeRadius * Math.cos(angle)
              const endY = target.y - nodeRadius * Math.sin(angle)
              
              return (
                <g key={edge.id}>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    className={edgeClass}
                  />
                  
                  {isDirected && (
                    <path
                      d={`M ${endX} ${endY} L ${
                        endX - 10 * Math.cos(angle - Math.PI / 7)
                      } ${
                        endY - 10 * Math.sin(angle - Math.PI / 7)
                      } L ${
                        endX - 10 * Math.cos(angle + Math.PI / 7)
                      } ${
                        endY - 10 * Math.sin(angle + Math.PI / 7)
                      } Z`}
                      className={edgeClass}
                      fill="currentColor"
                    />
                  )}
                  
                  {isWeighted && (
                    <text
                      x={(source.x + target.x) / 2}
                      y={(source.y + target.y) / 2 - 5}
                      className="text-xs fill-gray-700 dark:fill-gray-300"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ 
                        backgroundColor: 'white',
                        padding: '2px'
                      }}
                    >
                      {edge.weight}
                    </text>
                  )}
                </g>
              )
            })}
            
            {/* Render nodes */}
            {nodes.map(node => {
              let nodeClass = 'node'
              
              if (node.id === sourceNode) {
                nodeClass += ' node-source'
              } else if (node.id === targetNode) {
                nodeClass += ' node-target'
              } else if (pathNodes.some(p => p.node === node.id)) {
                nodeClass += ' node-path'
              } else if (visitedNodes.some(v => v.node === node.id)) {
                nodeClass += ' node-visited'
              } else {
                nodeClass += ' node-default'
              }
              
              return (
                <g key={node.id} onClick={() => handleNodeClick(node.id)}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="15"
                    className={nodeClass}
                    style={{ cursor: 'pointer' }}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium select-none"
                    style={{ cursor: 'pointer' }}
                  >
                    {node.id}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-4 flex items-center">
          <div className="node node-source w-6 h-6 mr-2 flex items-center justify-center text-xs">S</div>
          <span className="text-sm">Source Node</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-4 flex items-center">
          <div className="node node-target w-6 h-6 mr-2 flex items-center justify-center text-xs">T</div>
          <span className="text-sm">Target Node</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-4 flex items-center">
          <div className="node node-visited w-6 h-6 mr-2"></div>
          <span className="text-sm">Visited Node</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-subtle p-4 flex items-center">
          <div className="node node-path w-6 h-6 mr-2"></div>
          <span className="text-sm">Path Node</span>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="font-medium mb-2">Instructions:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
          <li>Click on a node to set it as the source node</li>
          <li>Click on another node to set it as the target node</li>
          <li>Click "Play" to visualize the selected algorithm</li>
          <li>Generate a new graph to start fresh</li>
        </ul>
      </div>
    </div>
  )
}

export default GraphVisualizer