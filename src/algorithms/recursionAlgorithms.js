/**
 * Tower of Hanoi Implementation
 * Time Complexity: O(2^n)
 * Space Complexity: O(n)
 * 
 * @param {number} n - Number of disks
 * @param {number} source - Source peg (0-based index)
 * @param {number} destination - Destination peg (0-based index)
 * @param {number} auxiliary - Auxiliary peg (0-based index)
 * @param {Array} steps - Array to store steps of the solution
 */
export function towerOfHanoi(n, source, destination, auxiliary, steps) {
  if (n === 1) {
    // Move the top disk from source to destination
    moveDisk(source, destination, steps)
    return
  }
  
  // Move n-1 disks from source to auxiliary peg
  towerOfHanoi(n - 1, source, auxiliary, destination, steps)
  
  // Move the nth disk from source to destination
  moveDisk(source, destination, steps)
  
  // Move n-1 disks from auxiliary to destination
  towerOfHanoi(n - 1, auxiliary, destination, source, steps)
}

/**
 * Helper function to move a disk between pegs
 */
function moveDisk(from, to, steps) {
  const lastStep = steps[steps.length - 1]
  const newTowers = JSON.parse(JSON.stringify(lastStep)) // Deep copy
  
  // Get the top disk from the source tower
  const disk = newTowers[from].shift()
  
  // Move it to the destination tower
  newTowers[to].unshift(disk)
  
  // Add this step to the steps array
  steps.push(newTowers)
}