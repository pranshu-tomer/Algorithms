import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const categories = [
  {
    title: 'Sorting Algorithms',
    description: 'Visualize and compare different sorting techniques including Merge Sort, Quick Sort, Bubble Sort, and more.',
    path: '/sorting',
    color: 'bg-primary-500',
    icon: '🔄'
  },
  {
    title: 'Graph Algorithms',
    description: 'Explore graph traversal algorithms like BFS, DFS, and pathfinding algorithms like Dijkstra\'s.',
    path: '/graph',
    color: 'bg-secondary-500',
    icon: '🔍'
  },
  {
    title: 'Recursion',
    description: 'Understand recursive algorithms through visualizations like the Tower of Hanoi problem.',
    path: '/recursion',
    color: 'bg-accent-500',
    icon: '🔁'
  },
  {
    title: 'Data Structures',
    description: 'Visualize operations on data structures like Binary Search Trees, Stacks, and Queues.',
    path: '/data-structures',
    color: 'bg-success-500',
    icon: '📊'
  }
]

function Home() {
  return (
    <div className="container-lg py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Algorithm Visualizer
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Visualize and understand the inner workings of complex algorithms and data structures
          through interactive, step-by-step animations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link 
              to={category.path}
              className="block h-full bg-white dark:bg-gray-800 rounded-xl shadow-subtle hover:shadow-elevated transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{category.description}</p>
                <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium">
                  Explore
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Algorithm Efficiency</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Understand time and space complexity of different algorithms
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Visual Learning</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                See how algorithms work step-by-step with clear visualizations
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Algorithm Comparison</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Compare different approaches to solving the same problem
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Core Concepts</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Master fundamental concepts in computer science and algorithm design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home