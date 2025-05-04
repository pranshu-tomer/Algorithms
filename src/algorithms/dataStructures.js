/**
 * Stack implementation
 * A stack follows the Last In First Out (LIFO) principle.
 */
export class Stack {
  constructor(items = []) {
    this.items = [...items]
    this.top = -1
  }
  
  /**
   * Add an element to the top of the stack
   * Time Complexity: O(1)
   */
  push(element) {
    this.items.push(element)
    this.top++
    return this.items
  }
  
  /**
   * Remove and return the top element from the stack
   * Time Complexity: O(1)
   */
  pop() {
    if (this.isEmpty()) {
      return null
    }
    this.top--
    return this.items.pop()
  }
  
  /**
   * Return the top element without removing it
   * Time Complexity: O(1)
   */
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[this.top]
  }
  
  /**
   * Get the current top index
   * Time Complexity: O(1)
   */
  getTop() {
    return this.top
  }
  
  /**
   * Check if the stack is empty
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.top === -1
  }
  
  /**
   * Return the size of the stack
   * Time Complexity: O(1)
   */
  size() {
    return this.top + 1
  }
  
  /**
   * Create a clone of the stack
   * Time Complexity: O(n)
   */
  clone() {
    const newStack = new Stack([...this.items])
    newStack.top = this.top
    return newStack
  }
  
  /**
   * Convert the stack to string
   * Time Complexity: O(n)
   */
  toString() {
    return this.items.toString()
  }

  /**
   * Get all items in the stack
   * Time Complexity: O(1)
   */
  getItems() {
    return [...this.items]
  }
}

/**
 * Queue implementation
 * A queue follows the First In First Out (FIFO) principle.
 */
export class Queue {
  constructor(items = []) {
    this.items = [...items]
    this.frontIndex = 0
    this.rearIndex = items.length - 1
  }
  
  /**
   * Add an element to the end of the queue
   * Time Complexity: O(1)
   */
  enqueue(element) {
    this.items.push(element)
    this.rearIndex++
    return this.items
  }
  
  /**
   * Remove and return the front element from the queue
   * Time Complexity: O(n) - due to array shift
   */
  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    const item = this.items.shift()
    this.rearIndex--
    return item
  }
  
  /**
   * Return the front element without removing it
   * Time Complexity: O(1)
   */
  front() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[0]
  }
  
  /**
   * Return the last element without removing it
   * Time Complexity: O(1)
   */
  rear() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[this.rearIndex]
  }
  
  /**
   * Get the current front index
   * Time Complexity: O(1)
   */
  getFrontIndex() {
    return this.frontIndex
  }
  
  /**
   * Get the current rear index
   * Time Complexity: O(1)
   */
  getRearIndex() {
    return this.rearIndex
  }
  
  /**
   * Check if the queue is empty
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.items.length === 0
  }
  
  /**
   * Return the size of the queue
   * Time Complexity: O(1)
   */
  size() {
    return this.items.length
  }
  
  /**
   * Create a clone of the queue
   * Time Complexity: O(n)
   */
  clone() {
    const newQueue = new Queue([...this.items])
    newQueue.frontIndex = this.frontIndex
    newQueue.rearIndex = this.rearIndex
    return newQueue
  }
  
  /**
   * Convert the queue to string
   * Time Complexity: O(n)
   */
  toString() {
    return this.items.toString()
  }

  /**
   * Get all items in the queue
   * Time Complexity: O(1)
   */
  getItems() {
    return [...this.items]
  }
}

/**
 * MinHeap implementation
 * A MinHeap is a complete binary tree where the value of each node is less than or equal to its children
 */
export class MinHeap {
  constructor() {
    this.heap = []
  }

  /**
   * Get parent index
   * Time Complexity: O(1)
   */
  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  /**
   * Get left child index
   * Time Complexity: O(1)
   */
  getLeftChildIndex(index) {
    return 2 * index + 1
  }

  /**
   * Get right child index
   * Time Complexity: O(1)
   */
  getRightChildIndex(index) {
    return 2 * index + 2
  }

  /**
   * Swap elements at two indices
   * Time Complexity: O(1)
   */
  swap(index1, index2) {
    const temp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = temp
  }

  /**
   * Insert a new element
   * Time Complexity: O(log n)
   */
  insert(element) {
    this.heap.push(element)
    this.heapifyUp(this.heap.length - 1)
    return [...this.heap]
  }

  /**
   * Remove and return the minimum element
   * Time Complexity: O(log n)
   */
  extractMin() {
    if (this.isEmpty()) {
      return null
    }

    const min = this.heap[0]
    const last = this.heap.pop()

    if (this.heap.length > 0) {
      this.heap[0] = last
      this.heapifyDown(0)
    }

    return min
  }

  /**
   * Heapify up operation
   * Time Complexity: O(log n)
   */
  heapifyUp(index) {
    let currentIndex = index
    
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex)
      
      if (this.heap[parentIndex] <= this.heap[currentIndex]) {
        break
      }
      
      this.swap(currentIndex, parentIndex)
      currentIndex = parentIndex
    }
  }

  /**
   * Heapify down operation
   * Time Complexity: O(log n)
   */
  heapifyDown(index) {
    let currentIndex = index
    let minIndex = index
    
    while (true) {
      const leftChild = this.getLeftChildIndex(currentIndex)
      const rightChild = this.getRightChildIndex(currentIndex)
      
      if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[minIndex]) {
        minIndex = leftChild
      }
      
      if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[minIndex]) {
        minIndex = rightChild
      }
      
      if (minIndex === currentIndex) {
        break
      }
      
      this.swap(currentIndex, minIndex)
      currentIndex = minIndex
    }
  }

  /**
   * Check if heap is empty
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.heap.length === 0
  }

  /**
   * Get the minimum element without removing it
   * Time Complexity: O(1)
   */
  findMin() {
    if (this.isEmpty()) {
      return null
    }
    return this.heap[0]
  }

  /**
   * Get the size of the heap
   * Time Complexity: O(1)
   */
  size() {
    return this.heap.length
  }

  /**
   * Get all items in the heap
   * Time Complexity: O(1)
   */
  getItems() {
    return [...this.heap]
  }

  /**
   * Get the heap structure for visualization
   * Time Complexity: O(n)
   */
  getHeapStructure() {
    const structure = []
    for (let i = 0; i < this.heap.length; i++) {
      structure.push({
        value: this.heap[i],
        parent: i === 0 ? null : this.getParentIndex(i),
        left: this.getLeftChildIndex(i) < this.heap.length ? this.getLeftChildIndex(i) : null,
        right: this.getRightChildIndex(i) < this.heap.length ? this.getRightChildIndex(i) : null
      })
    }
    return structure
  }
}