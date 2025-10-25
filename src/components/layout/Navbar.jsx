import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-subtle">
      <div className="container-lg mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-xl font-semibold text-primary-600 dark:text-primary-400">
                StructView
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-4">
              <NavLink 
                to="/sorting" 
                className={({ isActive }) => 
                  isActive 
                    ? "px-3 py-2 rounded-md text-sm font-medium text-primary-600 dark:text-primary-400" 
                    : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }
              >
                Sorting
              </NavLink>
              <NavLink 
                to="/graph" 
                className={({ isActive }) => 
                  isActive 
                    ? "px-3 py-2 rounded-md text-sm font-medium text-primary-600 dark:text-primary-400" 
                    : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }
              >
                Graph
              </NavLink>
              <NavLink 
                to="/recursion" 
                className={({ isActive }) => 
                  isActive 
                    ? "px-3 py-2 rounded-md text-sm font-medium text-primary-600 dark:text-primary-400" 
                    : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }
              >
                Recursion
              </NavLink>
              <NavLink 
                to="/data-structures" 
                className={({ isActive }) => 
                  isActive 
                    ? "px-3 py-2 rounded-md text-sm font-medium text-primary-600 dark:text-primary-400" 
                    : "px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }
              >
                Data Structures
              </NavLink>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="Main menu"
                aria-expanded="false"
              >
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/sorting" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary-600 dark:text-primary-400" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              onClick={closeMenu}
            >
              Sorting
            </NavLink>
            <NavLink 
              to="/graph" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary-600 dark:text-primary-400" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              onClick={closeMenu}
            >
              Graph
            </NavLink>
            <NavLink 
              to="/recursion" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary-600 dark:text-primary-400" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              onClick={closeMenu}
            >
              Recursion
            </NavLink>
            <NavLink 
              to="/data-structures" 
              className={({ isActive }) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary-600 dark:text-primary-400" 
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              onClick={closeMenu}
            >
              Data Structures
            </NavLink>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar


// import { useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { AnimatePresence, motion } from 'framer-motion'

// const navItems = [
//   { to: '/sorting', label: 'Sorting' },
//   { to: '/graph', label: 'Graph' },
//   { to: '/recursion', label: 'Recursion' },
//   { to: '/data-structures', label: 'Data Structures' },
// ]

// function Navbar({ darkMode, toggleDarkMode }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const toggleMenu = () => setIsMenuOpen(prev => !prev)
//   const closeMenu = () => setIsMenuOpen(false)

//   const getNavLinkClass = (isActive, mobile = false) => {
//     const base = mobile ? "block px-4 py-2 text-base" : "px-3 py-2 text-sm"
//     const activeStyle = "text-primary-600 dark:text-primary-400 font-semibold"
//     const inactiveStyle = "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
//     return `${base} rounded-md font-medium ${isActive ? activeStyle : inactiveStyle}`
//   }

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-subtle">
//       <div className="container-lg mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400" onClick={closeMenu}>
//             AlgoViz
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex space-x-4">
//             {navItems.map(({ to, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) => getNavLinkClass(isActive)}
//               >
//                 {label}
//               </NavLink>
//             ))}
//           </div>

//           {/* Right controls */}
//           <div className="flex items-center gap-2">
//             {/* Dark Mode Toggle */}
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                     d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//                 </svg>
//               )}
//             </button>

//             {/* Hamburger */}
//             <button
//               onClick={toggleMenu}
//               className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
//               aria-label="Toggle navigation menu"
//               aria-expanded={isMenuOpen}
//             >
//               <svg
//                 className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//               <svg
//                 className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             key="mobile-menu"
//             className="md:hidden px-4 pt-2 pb-4 space-y-1"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {navItems.map(({ to, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) => getNavLinkClass(isActive, true)}
//                 onClick={closeMenu}
//               >
//                 {label}
//               </NavLink>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   )
// }

// export default Navbar
