import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Settings2 } from 'lucide-react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(25);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [speed, setSpeed] = useState(25);
  const [darkMode, setDarkMode] = useState(false);
  const animationRef = useRef(null);
  
  // Generate random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    setArray(newArray);
    setCompleted(false);
    setComparisons(0);
    setSwaps(0);
    setCurrentStep(0);
    setTotalSteps(0);
    setAnimationSteps([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setSorting(false);
  };

  // Initialize array on component mount and when array size changes
  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // Bubble Sort Algorithm
  const bubbleSort = (arr) => {
    const steps = [];
    const arrayCopy = [...arr];
    let comparisonCount = 0;
    let swapCount = 0;
    
    for (let i = 0; i < arrayCopy.length; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        steps.push({
          type: 'comparison',
          indices: [j, j + 1],
          array: [...arrayCopy]
        });
        comparisonCount++;
        
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          swapCount++;
          
          steps.push({
            type: 'swap',
            indices: [j, j + 1],
            array: [...arrayCopy]
          });
        }
      }
      
      steps.push({
        type: 'sorted',
        index: arrayCopy.length - i - 1,
        array: [...arrayCopy]
      });
    }
    
    return { steps, comparisonCount, swapCount, sortedArray: arrayCopy };
  };

  // Selection Sort Algorithm
  const selectionSort = (arr) => {
    const steps = [];
    const arrayCopy = [...arr];
    let comparisonCount = 0;
    let swapCount = 0;
    
    for (let i = 0; i < arrayCopy.length; i++) {
      let minIndex = i;
      
      steps.push({
        type: 'position',
        index: i,
        array: [...arrayCopy]
      });
      
      for (let j = i + 1; j < arrayCopy.length; j++) {
        steps.push({
          type: 'comparison',
          indices: [minIndex, j],
          array: [...arrayCopy]
        });
        comparisonCount++;
        
        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
        }
      }
      
      if (minIndex !== i) {
        [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
        swapCount++;
        
        steps.push({
          type: 'swap',
          indices: [i, minIndex],
          array: [...arrayCopy]
        });
      }
      
      steps.push({
        type: 'sorted',
        index: i,
        array: [...arrayCopy]
      });
    }
    
    return { steps, comparisonCount, swapCount, sortedArray: arrayCopy };
  };

  // Insertion Sort Algorithm
  const insertionSort = (arr) => {
    const steps = [];
    const arrayCopy = [...arr];
    let comparisonCount = 0;
    let swapCount = 0;
    
    for (let i = 1; i < arrayCopy.length; i++) {
      const key = arrayCopy[i];
      let j = i - 1;
      
      steps.push({
        type: 'key',
        index: i,
        array: [...arrayCopy]
      });
      
      while (j >= 0 && arrayCopy[j] > key) {
        steps.push({
          type: 'comparison',
          indices: [j, j + 1],
          array: [...arrayCopy]
        });
        comparisonCount++;
        
        arrayCopy[j + 1] = arrayCopy[j];
        swapCount++;
        
        steps.push({
          type: 'shift',
          indices: [j, j + 1],
          array: [...arrayCopy]
        });
        
        j--;
      }
      
      arrayCopy[j + 1] = key;
      
      steps.push({
        type: 'insert',
        index: j + 1,
        array: [...arrayCopy]
      });
    }
    
    return { steps, comparisonCount, swapCount, sortedArray: arrayCopy };
  };

  // Quick Sort Algorithm
  const quickSort = (arr) => {
    const steps = [];
    const arrayCopy = [...arr];
    let comparisonCount = 0;
    let swapCount = 0;
    
    const partition = (arr, low, high) => {
      const pivot = arr[high];
      
      steps.push({
        type: 'pivot',
        index: high,
        array: [...arr]
      });
      
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        steps.push({
          type: 'comparison',
          indices: [j, high],
          array: [...arr]
        });
        comparisonCount++;
        
        if (arr[j] <= pivot) {
          i++;
          
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swapCount++;
          
          steps.push({
            type: 'swap',
            indices: [i, j],
            array: [...arr]
          });
        }
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swapCount++;
      
      steps.push({
        type: 'swap',
        indices: [i + 1, high],
        array: [...arr]
      });
      
      return i + 1;
    };
    
    const quickSortHelper = (arr, low, high) => {
      if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
      }
    };
    
    quickSortHelper(arrayCopy, 0, arrayCopy.length - 1);
    
    return { steps, comparisonCount, swapCount, sortedArray: arrayCopy };
  };

  // Merge Sort Algorithm
  const mergeSort = (arr) => {
    const steps = [];
    const arrayCopy = [...arr];
    let comparisonCount = 0;
    let swapCount = 0;
    
    const merge = (arr, left, mid, right) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      
      const L = arr.slice(left, mid + 1);
      const R = arr.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      
      while (i < n1 && j < n2) {
        steps.push({
          type: 'comparison',
          indices: [left + i, mid + 1 + j],
          array: [...arr]
        });
        comparisonCount++;
        
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        
        steps.push({
          type: 'merge',
          index: k,
          value: arr[k],
          array: [...arr]
        });
        swapCount++;
        
        k++;
      }
      
      while (i < n1) {
        arr[k] = L[i];
        
        steps.push({
          type: 'merge',
          index: k,
          value: arr[k],
          array: [...arr]
        });
        swapCount++;
        
        i++;
        k++;
      }
      
      while (j < n2) {
        arr[k] = R[j];
        
        steps.push({
          type: 'merge',
          index: k,
          value: arr[k],
          array: [...arr]
        });
        swapCount++;
        
        j++;
        k++;
      }
    };
    
    const mergeSortHelper = (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        mergeSortHelper(arr, left, mid);
        mergeSortHelper(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
      }
    };
    
    mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1);
    
    return { steps, comparisonCount, swapCount, sortedArray: arrayCopy };
  };

  // Start sorting animation
  const startSorting = () => {
    if (sorting || completed) return;
    
    setSorting(true);
    setCompleted(false);
    
    let result;
    switch (algorithm) {
      case 'bubble':
        result = bubbleSort([...array]);
        break;
      case 'selection':
        result = selectionSort([...array]);
        break;
      case 'insertion':
        result = insertionSort([...array]);
        break;
      case 'quick':
        result = quickSort([...array]);
        break;
      case 'merge':
        result = mergeSort([...array]);
        break;
      default:
        result = bubbleSort([...array]);
    }
    
    setAnimationSteps(result.steps);
    setTotalSteps(result.steps.length);
    setComparisons(result.comparisonCount);
    setSwaps(result.swapCount);
    
    let step = 0;
    
    const animate = () => {
      if (step < result.steps.length) {
        setCurrentStep(step);
        setArray(result.steps[step].array);
        step++;
        animationRef.current = requestAnimationFrame(() => {
          // Speed is inversely proportional to delay
          setTimeout(animate, 101 - speed);
        });
      } else {
        setArray(result.sortedArray);
        setSorting(false);
        setCompleted(true);
        animationRef.current = null;
      }
    };
    
    animate();
  };

  // Pause sorting animation
  const pauseSorting = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      setSorting(false);
    }
  };

  // Reset sorting
  const resetSorting = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    generateArray();
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="px-6 py-4 ">
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-9">Sorting Algorithm Visualizer</h1>
        <div className="flex items-center space-x-4 mb-11">
          <div className="flex space-x-3 ">
            <button
              onClick={sorting ? pauseSorting : startSorting}
              className="flex items-center justify-center h-10 w-20 bg-indigo-600 hover:bg-indigo-700 text-white border-gray-300 font-medium rounded transition-colors"
            >
              {sorting ? <Pause size={18} /> : <Play size={18} />}
              <span className="ml-1">{sorting ? "Pause" : "Play"}</span>
            </button>
            
            <button
              onClick={resetSorting}
              className="flex items-center justify-center h-10 w-20 bg-white dark:bg-gray-800  hover:bg-gray-300 text-gray-700 dark:text-white border-gray-300 font-medium rounded transition-colors"
            >
              <RefreshCw size={18} />
              <span className="ml-1">Reset</span>
            </button>
            
            <button
              onClick={() => generateArray()}
              className="flex items-center justify-center h-10 px-4 bg-white dark:bg-gray-800  hover:bg-gray-300 text-gray-700 dark:text-white  border-gray-300 font-medium rounded transition-colors"
            >
              <span>New Array</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-[150px]">
              <select
                value={algorithm}
                onChange={(e) => {
                  setAlgorithm(e.target.value);
                  resetSorting();
                }}
                disabled={sorting}
                className="h-10 px-3 w-full bg-white dark:bg-gray-800  border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="merge">Merge Sort</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-5">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Speed: {speed < 25 ? 'Slow' : speed < 75 ? 'Medium' : 'Fast'}</span>
          </div>
          <div className="flex-1">
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={sorting}
              className="w-101 accent-indigo-600"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm mr-2">Size:</span>
            <input
              type="range"
              min="5"
              max="25"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={sorting}
              className="w-101 accent-indigo-600"
            />
            <span className="text-sm">{arraySize}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-7 flex justify-between items-center text-smbg-white dark:bg-gray-800 p-2 rounded">
        <div>Elements: {array.length}</div>
        <div>Comparisons: {comparisons}</div>
        <div>Swaps: {swaps}</div>
        <div>Step: {currentStep} / {totalSteps}</div>
      </div>
      
      <div className="relative h-80 border bg-white dark:bg-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <div className="absolute inset-0 flex items-end justify-center">
          {array.map((value, idx) => {
            const isComparing = animationSteps[currentStep]?.type === 'comparison' && 
                              animationSteps[currentStep]?.indices.includes(idx);
            const isSwapping = animationSteps[currentStep]?.type === 'swap' && 
                             animationSteps[currentStep]?.indices.includes(idx);
            const isSorted = completed || (animationSteps[currentStep]?.type === 'sorted' && 
                            animationSteps[currentStep]?.index === idx);
            const isPivot = animationSteps[currentStep]?.type === 'pivot' && 
                          animationSteps[currentStep]?.index === idx;
            
            let barColor = 'bg-indigo-500';
            if (isSorted) barColor = 'bg-green-500';
            else if (isSwapping) barColor = 'bg-pink-500';
            else if (isComparing) barColor = 'bg-amber-500';
            else if (isPivot) barColor = 'bg-purple-500';
            
            return (
              <div
                key={idx}
                className={`${barColor} mx-[1px] transition-all duration-100`}
                style={{
                  height: `${value}%`,
                  width: `${Math.max(2, 98 / arraySize)}%`
                }}
              />
            );
          })}
        </div>
      </div>
      
      <div className="mt-6 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-500 rounded-sm mr-2"></div>
            <span className="text-sm">Unsorted</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-500 rounded-sm mr-2"></div>
            <span className="text-sm">Comparing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-pink-500 rounded-sm mr-2"></div>
            <span className="text-sm">Swapping</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
            <span className="text-sm">Sorted</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      {/* class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4" */}
        <h3 className="text-lg font-medium mb-2">Algorithm Info</h3>
        {algorithm === 'bubble' && (
          <div>
            <p className="font-semibold">Bubble Sort</p>
            <p className="text-sm">Time Complexity: O(n²)</p>
            <p className="text-sm">Space Complexity: O(1)</p>
            <p className="text-sm mt-2">
              Bubble sort repeatedly steps through the list, compares adjacent elements, 
              and swaps them if they are in the wrong order.
            </p>
          </div>
        )}
        {algorithm === 'selection' && (
          <div>
            <p className="font-semibold">Selection Sort</p>
            <p className="text-sm">Time Complexity: O(n²)</p>
            <p className="text-sm">Space Complexity: O(1)</p>
            <p className="text-sm mt-2">
              Selection sort divides the array into a sorted and an unsorted region, 
              repeatedly finding the minimum element from the unsorted region.
            </p>
          </div>
        )}
        {algorithm === 'insertion' && (
          <div>
            <p className="font-semibold">Insertion Sort</p>
            <p className="text-sm">Time Complexity: O(n²)</p>
            <p className="text-sm">Space Complexity: O(1)</p>
            <p className="text-sm mt-2">
              Insertion sort builds the sorted array one item at a time, taking each 
              element and inserting it into its correct position.
            </p>
          </div>
        )}
        {algorithm === 'quick' && (
          <div>
            <p className="font-semibold">Quick Sort</p>
            <p className="text-sm">Time Complexity: O(n log n) average, O(n²) worst case</p>
            <p className="text-sm">Space Complexity: O(log n)</p>
            <p className="text-sm mt-2">
              Quick sort selects a pivot element and partitions the array around it, 
              with smaller elements before and larger elements after.
            </p>
          </div>
        )}
        {algorithm === 'merge' && (
          <div>
            <p className="font-semibold">Merge Sort</p>
            <p className="text-sm">Time Complexity: O(n log n)</p>
            <p className="text-sm">Space Complexity: O(n)</p>
            <p className="text-sm mt-2">
              Merge sort divides the array into two halves, recursively sorts them, 
              and then merges the sorted halves.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingVisualizer;