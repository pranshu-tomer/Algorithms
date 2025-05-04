/**
 * Breadth-First Search Implementation
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function breadthFirstSearch(adjacencyList, startNode, targetNode) {
  const steps = []
  const visited = new Set()
  const queue = [startNode]
  const predecessors = {}
  
  // Add initial state
  steps.push({
    visited: [{ node: startNode, from: null, to: null }],
    path: []
  })
  
  visited.add(startNode)
  
  while (queue.length > 0) {
    const currentNode = queue.shift()
    
    // Check if we found the target
    if (currentNode === targetNode) {
      // Reconstruct the path
      const path = []
      let current = targetNode
      
      while (current !== startNode) {
        const prev = predecessors[current]
        path.unshift({ from: prev, to: current, node: current })
        current = prev
      }
      path.unshift({ from: null, to: startNode, node: startNode })
      
      // Add final step with the path
      steps.push({
        visited: [...steps[steps.length - 1].visited],
        path
      })
      
      break
    }
    
    // Process all neighbors
    for (const edge of adjacencyList[currentNode]) {
      const neighbor = edge.node
      
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
        predecessors[neighbor] = currentNode
        
        // Add this step to visualization
        const visitedCopy = [...steps[steps.length - 1].visited]
        visitedCopy.push({ 
          node: neighbor, 
          from: currentNode, 
          to: neighbor 
        })
        
        steps.push({
          visited: visitedCopy,
          path: []
        })
      }
    }
  }
  
  // If no path was found
  if (steps[steps.length - 1].path.length === 0 && targetNode !== null) {
    steps.push({
      visited: [...steps[steps.length - 1].visited],
      path: []
    })
  }
  
  return steps
}

/**
 * Depth-First Search Implementation
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function depthFirstSearch(adjacencyList, startNode, targetNode) {
  const steps = []
  const visited = new Set()
  const predecessors = {}
  let foundTarget = false
  
  // Add initial state
  steps.push({
    visited: [{ node: startNode, from: null, to: null }],
    path: []
  })
  
  function dfs(node) {
    visited.add(node)
    
    if (node === targetNode) {
      foundTarget = true
      return true
    }
    
    for (const edge of adjacencyList[node]) {
      const neighbor = edge.node
      
      if (!visited.has(neighbor)) {
        predecessors[neighbor] = node
        
        // Add this step to visualization
        const visitedCopy = [...steps[steps.length - 1].visited]
        visitedCopy.push({ 
          node: neighbor, 
          from: node, 
          to: neighbor 
        })
        
        steps.push({
          visited: visitedCopy,
          path: []
        })
        
        if (dfs(neighbor)) {
          return true
        }
      }
    }
    
    return false
  }
  
  dfs(startNode)
  
  // If target was found, reconstruct the path
  if (foundTarget) {
    const path = []
    let current = targetNode
    
    while (current !== startNode) {
      const prev = predecessors[current]
      path.unshift({ from: prev, to: current, node: current })
      current = prev
    }
    path.unshift({ from: null, to: startNode, node: startNode })
    
    // Add final step with the path
    steps.push({
      visited: [...steps[steps.length - 1].visited],
      path
    })
  } else if (targetNode !== null) {
    // Target not found
    steps.push({
      visited: [...steps[steps.length - 1].visited],
      path: []
    })
  }
  
  return steps
}

/**
 * Dijkstra's Algorithm Implementation
 * Time Complexity: O((V + E) log V)
 * Space Complexity: O(V)
 */
export function dijkstraAlgorithm(adjacencyList, startNode, targetNode) {
  const steps = []
  const distances = {}
  const visited = new Set()
  const predecessors = {}
  const priorityQueue = []
  
  // Initialize distances
  Object.keys(adjacencyList).forEach(node => {
    distances[node] = Infinity
  })
  distances[startNode] = 0
  
  // Add start node to priority queue
  priorityQueue.push({ node: startNode, distance: 0 })
  
  // Add initial state
  steps.push({
    visited: [{ node: startNode, from: null, to: null }],
    path: []
  })
  
  while (priorityQueue.length > 0) {
    // Sort priority queue and get node with minimum distance
    priorityQueue.sort((a, b) => a.distance - b.distance)
    const { node: currentNode } = priorityQueue.shift()
    
    // Skip if already visited
    if (visited.has(currentNode)) continue
    
    // Mark as visited
    visited.add(currentNode)
    
    // Stop if we reached the target
    if (currentNode === targetNode) {
      break
    }
    
    // Check all neighbors
    for (const edge of adjacencyList[currentNode]) {
      const neighbor = edge.node
      const weight = edge.weight
      
      if (!visited.has(neighbor)) {
        const distance = distances[currentNode] + weight
        
        // If we found a shorter path
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance
          predecessors[neighbor] = currentNode
          priorityQueue.push({ node: neighbor, distance })
          
          // Add this step to visualization
          const visitedCopy = [...steps[steps.length - 1].visited]
          visitedCopy.push({ 
            node: neighbor, 
            from: currentNode, 
            to: neighbor 
          })
          
          steps.push({
            visited: visitedCopy,
            path: []
          })
        }
      }
    }
  }
  
  // Reconstruct path if target was found
  if (visited.has(targetNode)) {
    const path = []
    let current = targetNode
    
    while (current !== startNode) {
      const prev = predecessors[current]
      path.unshift({ from: prev, to: current, node: current })
      current = prev
    }
    path.unshift({ from: null, to: startNode, node: startNode })
    
    // Add final step with the path
    steps.push({
      visited: [...steps[steps.length - 1].visited],
      path
    })
  } else if (targetNode !== null) {
    // Target not found
    steps.push({
      visited: [...steps[steps.length - 1].visited],
      path: []
    })
  }
  
  return steps
}