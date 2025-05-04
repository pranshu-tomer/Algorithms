/**
 * Bubble Sort Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function bubbleSort(arr) {
  const steps = []
  const array = [...arr]
  const sorted = []
  
  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: []
  })
  
  for (let i = 0; i < array.length; i++) {
    let swapped = false
    
    for (let j = 0; j < array.length - i - 1; j++) {
      // Add step showing what we're comparing
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted]
      })
      
      if (array[j] > array[j + 1]) {
        // Add step showing what we're swapping
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted]
        })
        
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
        swapped = true
      }
    }
    
    // Mark the largest element as sorted
    sorted.unshift(array.length - i - 1)
    
    // Add step showing the updated array with newly sorted element
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [...sorted]
    })
    
    // If no swapping occurred in this pass, the array is sorted
    if (!swapped) break
  }
  
  // Make sure all elements are marked as sorted in the final step
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: array.length }, (_, i) => i)
  })
  
  return steps
}

/**
 * Selection Sort Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function selectionSort(arr) {
  const steps = []
  const array = [...arr]
  const sorted = []
  
  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: []
  })
  
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i
    
    // Find the minimum element in the unsorted portion
    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        array: [...array],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted]
      })
      
      if (array[j] < array[minIdx]) {
        minIdx = j
      }
    }
    
    // Swap if minimum is not at current position
    if (minIdx !== i) {
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted]
      })
      
      [array[i], array[minIdx]] = [array[minIdx], array[i]]
    }
    
    sorted.push(i)
    
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [...sorted]
    })
  }
  
  // Add the last element to sorted
  sorted.push(array.length - 1)
  
  // Final state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: [...sorted]
  })
  
  return steps
}

/**
 * Heap Sort Implementation
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
export function heapSort(arr) {
  const steps = []
  const array = [...arr]
  const sorted = []
  
  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: []
  })
  
  // Build max heap
  const heapify = (n, i) => {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2
    
    steps.push({
      array: [...array],
      comparing: [largest, left, right].filter(x => x < n),
      swapping: [],
      sorted: [...sorted]
    })
    
    if (left < n && array[left] > array[largest]) {
      largest = left
    }
    
    if (right < n && array[right] > array[largest]) {
      largest = right
    }
    
    if (largest !== i) {
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i, largest],
        sorted: [...sorted]
      })
      
      [array[i], array[largest]] = [array[largest], array[i]]
      heapify(n, largest)
    }
  }
  
  // Build heap
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array.length, i)
  }
  
  // Extract elements from heap one by one
  for (let i = array.length - 1; i > 0; i--) {
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [0, i],
      sorted: [...sorted]
    })
    
    [array[0], array[i]] = [array[i], array[0]]
    sorted.unshift(i)
    
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [...sorted]
    })
    
    heapify(i, 0)
  }
  
  sorted.unshift(0)
  
  // Final state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: [...sorted]
  })
  
  return steps
}

/**
 * Insertion Sort Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function insertionSort(arr) {
  const steps = []
  const array = [...arr]
  const sorted = [0]
  
  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: [...sorted]
  })
  
  for (let i = 1; i < array.length; i++) {
    const key = array[i]
    let j = i - 1
    
    steps.push({
      array: [...array],
      comparing: [i, j],
      swapping: [],
      sorted: [...sorted]
    })
    
    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        comparing: [i, j],
        swapping: [j + 1, j],
        sorted: [...sorted]
      })
      
      array[j + 1] = array[j]
      j--
    }
    
    array[j + 1] = key
    sorted.push(i)
    
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [...sorted]
    })
  }
  
  // Final state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: array.length }, (_, i) => i)
  })
  
  return steps
}

/**
 * Merge Sort Implementation
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export function mergeSort(arr) {
  const steps = []
  const array = [...arr]
  const sorted = []
  
  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: []
  })
  
  const merge = (arr, left, mid, right) => {
    const leftArray = arr.slice(left, mid + 1)
    const rightArray = arr.slice(mid + 1, right + 1)
    let i = 0
    let j = 0
    let k = left
    
    while (i < leftArray.length && j < rightArray.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [...sorted]
      })
      
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i]
        i++
      } else {
        arr[k] = rightArray[j]
        j++
      }
      
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [...sorted]
      })
      
      k++
    }
    
    while (i < leftArray.length) {
      arr[k] = leftArray[i]
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [...sorted]
      })
      i++
      k++
    }
    
    while (j < rightArray.length) {
      arr[k] = rightArray[j]
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [...sorted]
      })
      j++
      k++
    }
    
    // Mark merged section as sorted
    for (let m = left; m <= right; m++) {
      if (!sorted.includes(m)) {
        sorted.push(m)
      }
    }
    
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted]
    })
  }
  
  const mergeSortHelper = (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      mergeSortHelper(arr, left, mid)
      mergeSortHelper(arr, mid + 1, right)
      merge(arr, left, mid, right)
    }
  }
  
  mergeSortHelper(array, 0, array.length - 1)
  
  // Final step with all elements sorted
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: array.length }, (_, i) => i)
  })
  
  return steps
}

/**
 * Quick Sort Implementation
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n)
 */
export function quickSort(arr) {
  const steps = []
  const array = [...arr]
  const sorted = []
  
  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: []
  })
  
  const partition = (arr, low, high) => {
    const pivot = arr[high]
    let i = low - 1
    
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapping: [],
        sorted: [...sorted]
      })
      
      if (arr[j] < pivot) {
        i++
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [i, j],
          sorted: [...sorted]
        })
        
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
    
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [...sorted]
    })
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    
    if (!sorted.includes(i + 1)) {
      sorted.push(i + 1)
    }
    
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted]
    })
    
    return i + 1
  }
  
  const quickSortHelper = (arr, low, high) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high)
      quickSortHelper(arr, low, pivotIndex - 1)
      quickSortHelper(arr, pivotIndex + 1, high)
    } else if (low === high && !sorted.includes(low)) {
      sorted.push(low)
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [...sorted]
      })
    }
  }
  
  quickSortHelper(array, 0, array.length - 1)
  
  // Final step with all elements sorted
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: array.length }, (_, i) => i)
  })
  
  return steps
}